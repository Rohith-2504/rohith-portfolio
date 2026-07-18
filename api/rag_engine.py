import json
import math
import os
import re
from collections import Counter
from pathlib import Path
from typing import Any

import httpx
from dotenv import load_dotenv

load_dotenv()

KNOWLEDGE_DIR = Path(os.getenv("KNOWLEDGE_DIR", "../knowledge")).resolve()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")


def tokenize(text: str) -> list[str]:
    return re.findall(r"[a-z0-9]+", text.lower())


class RagEngine:
    """Lightweight RAG — no PyTorch/ChromaDB. Works on Windows out of the box."""

    def __init__(self) -> None:
        self.sessions: dict[str, list[dict[str, str]]] = {}
        self.chunks: list[dict[str, Any]] = self._read_chunks()
        self._build_index()

    def _read_chunks(self) -> list[dict[str, Any]]:
        chunks: list[dict[str, Any]] = []

        def add(text: str, meta: dict[str, str]) -> None:
            text = re.sub(r"\s+", " ", text).strip()
            if len(text) < 20:
                return
            chunks.append({"text": text, **meta})

        profile = json.loads((KNOWLEDGE_DIR / "profile.json").read_text(encoding="utf-8"))
        add(
            f"{profile['short_name']} is an {' and '.join(profile['role'])} at {profile['company']} in {profile['location']}. "
            f"{profile['summary']} Contact: {profile['email']}. Focus: {', '.join(profile['focus_areas'])}.",
            {"source": "profile", "topic": "about"},
        )

        for item in json.loads((KNOWLEDGE_DIR / "experience.json").read_text(encoding="utf-8")):
            label = "Education" if item.get("id") == "education" else "Experience"
            add(
                f"{label}: {item['title']} ({item['period']}). {item['summary']} Details: {' '.join(item['details'])}",
                {"source": "experience" if label == "Experience" else "education", "topic": item["id"]},
            )

        for project in json.loads((KNOWLEDGE_DIR / "projects.json").read_text(encoding="utf-8")):
            add(
                f"Project: {project['name']} [{project['category']}]. Problem: {project['problem']} "
                f"Solution: {project['solution']} Stack: {', '.join(project['stack'])} Tags: {', '.join(project['tags'])}",
                {"source": "projects", "topic": project["id"], "tags": ",".join(project["tags"])},
            )

        skills = json.loads((KNOWLEDGE_DIR / "skills.json").read_text(encoding="utf-8"))
        for group, items in skills.items():
            add(f"{group.title()} skills: {', '.join(items)}.", {"source": "skills", "topic": group})

        for cert in json.loads((KNOWLEDGE_DIR / "certifications.json").read_text(encoding="utf-8")):
            add(
                f"Certification: {cert['title']} by {cert['issuer']} ({cert['year']}).",
                {"source": "certifications", "topic": "certifications"},
            )

        faqs = (KNOWLEDGE_DIR / "faqs.md").read_text(encoding="utf-8")
        for block in re.split(r"\n## ", faqs):
            if not block.strip():
                continue
            lines = block.strip().split("\n", 1)
            heading = lines[0]
            body = lines[1] if len(lines) > 1 else ""
            add(f"{heading}. {body}", {"source": "faqs", "topic": heading.lower()})

        return chunks

    def _build_index(self) -> None:
        self.doc_freq: Counter[str] = Counter()
        self.chunk_tokens: list[list[str]] = []

        for chunk in self.chunks:
            tokens = tokenize(chunk["text"])
            self.chunk_tokens.append(tokens)
            for token in set(tokens):
                self.doc_freq[token] += 1

        self.num_docs = max(len(self.chunks), 1)

    def retrieve(self, query: str, k: int = 3, min_score: float = 1.5) -> list[str]:
        query_tokens = tokenize(query)
        if not query_tokens:
            return []

        scores: list[tuple[float, int]] = []
        for idx, tokens in enumerate(self.chunk_tokens):
            tf = Counter(tokens)
            score = 0.0
            for token in query_tokens:
                if token not in tf:
                    continue
                idf = math.log(1 + self.num_docs / (1 + self.doc_freq[token]))
                score += (1 + math.log(1 + tf[token])) * idf
            if score >= min_score:
                scores.append((score, idx))

        scores.sort(reverse=True)
        if not scores:
            return []

        return [self.chunks[idx]["text"] for _, idx in scores[:k]]

    def _explicit_nav(self, query: str) -> bool:
        hints = ("show me", "take me", "go to", "scroll to", "open the", "view the", "see the", "navigate to")
        return any(h in query for h in hints)

    def detect_action(self, query: str) -> dict[str, Any] | None:
        q = query.lower()
        nav = self._explicit_nav(q)

        if "resume" in q or "cv" in q:
            return {"type": "download", "url": "/resume.pdf"}

        if nav and "github" in q and "project" not in q:
            return {"type": "open_url", "url": "https://github.com/Rohith-2504"}

        if nav:
            if any(x in q for x in ["contact", "email", "reach", "hire", "phone"]):
                return {"type": "scroll", "target": "#contact"}
            if any(x in q for x in ["experience", "internship", "gopafy", "journey", "timeline"]):
                return {"type": "scroll", "target": "#experience"}
            if any(x in q for x in ["certification", "certificate", "certified"]):
                return {"type": "scroll", "target": "#skills"}
            if any(x in q for x in ["skill", "technolog", "stack", "framework", "database"]):
                return {"type": "scroll", "target": "#skills"}
            if any(x in q for x in ["project", "portfolio", "work", "built"]):
                return {"type": "scroll", "target": "#projects"}

        if any(x in q for x in ["show ai", "ai project", "ml project", "highlight ai", "show rag"]):
            return {"type": "highlight_projects", "filter": "ai"}
        if nav and "frontend" in q and "project" in q:
            return {"type": "highlight_projects", "filter": "frontend"}
        if nav and "backend" in q and "project" in q:
            return {"type": "highlight_projects", "filter": "backend"}

        return None

    def is_small_talk(self, query: str) -> bool:
        q = query.lower().strip()
        if re.match(r"^(hi|hello|hey|hiya|yo|sup|howdy)[!.?\s]*$", q):
            return True
        if re.match(r"^(thanks|thank you|thx|ty)[!.?\s]*$", q):
            return True
        if q in {"bye", "goodbye", "see you", "cya"}:
            return True
        if q in {"how are you", "how are you?", "what's up", "whats up", "who are you", "who are you?"}:
            return True
        return False

    def small_talk_reply(self, query: str) -> str | None:
        q = query.lower().strip()
        if re.match(r"^(hi|hello|hey|hiya|yo|sup|howdy)[!.?\s]*$", q):
            return "Hey! I'm Rohith AI. Ask me about his experience, projects, skills, or how to get in touch."
        if re.match(r"^(thanks|thank you|thx|ty)[!.?\s]*$", q):
            return "You're welcome! Happy to help with anything else about Rohith's work."
        if q in {"bye", "goodbye", "see you", "cya"}:
            return "Goodbye! Feel free to come back if you have more questions."
        if q in {"how are you", "how are you?", "what's up", "whats up"}:
            return "Doing great — ready to help. What would you like to know about Rohith?"
        if q in {"who are you", "who are you?"}:
            return (
                "I'm the AI assistant on Rohith's portfolio. I answer questions about his background, "
                "projects, and skills — just what's relevant to your question."
            )
        return None

    def intent_context(self, query: str) -> list[str]:
        q = query.lower()
        if any(w in q for w in ["experience", "internship", "intern", "gopafy", "learnersbyte", "vtu habba", "career", "journey", "work history"]):
            return ["experience"]
        if any(w in q for w in ["project", "built", "portfolio site", "rag", "bliss", "habba", "floor plan", "restoration"]):
            return ["projects"]
        if any(w in q for w in ["skill", "technolog", "stack", "framework", "database", "tool", "know"]):
            return ["skills", "faqs"]
        if any(w in q for w in ["certification", "certificate", "certified", "course"]):
            return ["certifications"]
        if any(w in q for w in ["contact", "email", "phone", "reach", "hire", "linkedin"]):
            return ["faqs"]
        if any(w in q for w in ["who is", "about rohith", "introduce", "tell me about rohith"]):
            return ["profile", "faqs"]
        return []

    def _score_chunks(self, query: str, source: str, limit: int = 2) -> list[str]:
        query_tokens = set(tokenize(query))
        scored: list[tuple[float, str]] = []

        for chunk in self.chunks:
            if chunk.get("source") != source:
                continue
            text = chunk["text"]
            text_tokens = set(tokenize(text))
            overlap = query_tokens & text_tokens
            if not overlap:
                continue
            score = sum(1 + math.log(1 + self.doc_freq.get(token, 0)) for token in overlap)
            scored.append((score, text))

        scored.sort(reverse=True)
        if scored:
            return [text for _, text in scored[:limit]]

        fallback = [c["text"] for c in self.chunks if c.get("source") == source]
        return fallback[:limit]

    def _lookup_by_intent(self, query: str) -> list[str]:
        intents = self.intent_context(query)
        if not intents:
            return []

        if "skills" in intents:
            skill_chunks = [c["text"] for c in self.chunks if c.get("source") == "skills"]
            if skill_chunks:
                return skill_chunks[:3]

        if "projects" in intents:
            return self._score_chunks(query, "projects", limit=2)

        if "experience" in intents:
            return self._score_chunks(query, "experience", limit=2)

        matches: list[str] = []
        for chunk in self.chunks:
            source = chunk.get("source", "")
            if source in intents:
                matches.append(chunk["text"])
        return matches[:2]

    def filter_context(self, query: str, context: list[str]) -> list[str]:
        intents = self.intent_context(query)
        if not intents:
            return context[:2]

        filtered: list[str] = []
        for chunk in context:
            lowered = chunk.lower()
            if "experience:" in lowered and "experience" in intents:
                if "education:" in lowered or "b.e." in lowered:
                    continue
                filtered.append(chunk)
            elif "project:" in lowered and "projects" in intents:
                filtered.append(chunk)
            elif " skills:" in lowered and ("skills" in intents or "faqs" in intents):
                filtered.append(chunk)
            elif "certification:" in lowered and "certifications" in intents:
                filtered.append(chunk)
            elif ("contact" in lowered or "email" in lowered) and ("faqs" in intents or "profile" in intents):
                filtered.append(chunk)
            elif "is an" in lowered and "profile" in intents:
                filtered.append(chunk)

        return filtered[:2] if filtered else context[:1]

    def chunk_to_reply(self, chunk: str, max_sentences: int = 3) -> str:
        text = re.sub(r"^(Experience:|Project:|Certification:)\s*", "", chunk).strip()
        sentences = re.split(r"(?<=[.!?])\s+", text)
        return " ".join(sentences[:max_sentences]).strip()

    def build_messages(self, query: str, context: list[str], history: list[dict[str, str]]) -> list[dict[str, str]]:
        context_text = "\n".join(context) if context else "No specific context retrieved."
        system = (
            "You are Rohith AI, a friendly assistant on Rohith Reddy's portfolio (Full Stack Developer & AI Engineer at Gopafy). "
            "Answer ONLY the user's specific question using the provided context. "
            "Keep replies natural and concise — usually 1-3 sentences unless they explicitly ask for detail. "
            "Do NOT dump unrelated portfolio sections. Do NOT list everything you know. "
            "For greetings, reply briefly and ask what they'd like to know. "
            "If context is empty or insufficient, say so honestly and suggest one relevant topic to ask about."
        )
        messages: list[dict[str, str]] = [{"role": "system", "content": f"{system}\n\nCONTEXT:\n{context_text}"}]
        for msg in history[-6:]:
            messages.append({"role": msg["role"], "content": msg["content"]})
        messages.append({"role": "user", "content": query})
        return messages

    def generate_fallback(self, query: str, context: list[str]) -> str:
        small = self.small_talk_reply(query)
        if small:
            return small

        q = query.lower().strip()

        if any(w in q for w in ["contact", "email", "phone", "reach", "hire"]):
            return (
                "You can reach Rohith at rohithreddy.ai.dev@gmail.com or +91 7022347647. "
                "He's open to full-time roles and collaborations — Bengaluru or remote."
            )

        if not context:
            return (
                "I'm not sure about that from the portfolio data. "
                "Try asking about his Gopafy internship, AI projects, tech stack, or contact info."
            )

        focused = self.filter_context(query, context)
        if len(focused) == 1:
            return self.chunk_to_reply(focused[0])

        if any(w in q for w in ["experience", "internship", "career", "journey"]):
            lines = [self.chunk_to_reply(c, max_sentences=2) for c in focused[:2]]
            return " ".join(lines)

        if any(w in q for w in ["project", "built", "rag", "bliss", "habba"]):
            return self.chunk_to_reply(focused[0], max_sentences=2)

        if any(w in q for w in ["skill", "technolog", "stack", "framework", "database"]):
            skill_chunks = [c for c in focused if " skills:" in c.lower()]
            if skill_chunks:
                return " ".join(self.chunk_to_reply(c, max_sentences=1) for c in skill_chunks[:3])
            return self.chunk_to_reply(focused[0], max_sentences=2)

        return self.chunk_to_reply(focused[0])

    def stream_openai(self, messages: list[dict[str, str]]):
        with httpx.Client(timeout=60.0) as client:
            with client.stream(
                "POST",
                "https://api.openai.com/v1/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENAI_API_KEY}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": OPENAI_MODEL,
                    "messages": messages,
                    "temperature": 0.35,
                    "stream": True,
                },
            ) as response:
                response.raise_for_status()
                for line in response.iter_lines():
                    if not line or not line.startswith("data: "):
                        continue
                    payload = line[6:]
                    if payload.strip() == "[DONE]":
                        break
                    data = json.loads(payload)
                    delta = data.get("choices", [{}])[0].get("delta", {})
                    token = delta.get("content")
                    if token:
                        yield token

    def stream_answer(self, session_id: str, query: str):
        history = self.sessions.setdefault(session_id, [])
        query = query.strip()
        action = self.detect_action(query)

        if self.is_small_talk(query):
            answer = self.small_talk_reply(query) or "Hey! What would you like to know about Rohith?"
            history.extend([{"role": "user", "content": query}, {"role": "assistant", "content": answer}])
            step = 12
            for i in range(0, len(answer), step):
                yield ("token", answer[i : i + step])
            return

        context = self.retrieve(query)
        intents = self.intent_context(query)
        if intents:
            intent_chunks = self._lookup_by_intent(query)
            context = intent_chunks or context
        elif not context:
            context = self._lookup_by_intent(query)

        if action:
            yield ("action", action)

        if OPENAI_API_KEY:
            try:
                messages = self.build_messages(query, context, history)
                content = ""
                for token in self.stream_openai(messages):
                    content += token
                    yield ("token", token)
                history.extend([{"role": "user", "content": query}, {"role": "assistant", "content": content}])
                return
            except Exception:
                pass

        answer = self.generate_fallback(query, context)
        history.extend([{"role": "user", "content": query}, {"role": "assistant", "content": answer}])
        step = 10
        for i in range(0, len(answer), step):
            yield ("token", answer[i : i + step])

    def clear_session(self, session_id: str) -> None:
        self.sessions.pop(session_id, None)

    def reload_knowledge(self) -> int:
        self.chunks = self._read_chunks()
        self._build_index()
        return len(self.chunks)


rag = RagEngine()
