import json
import os
from typing import Any

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

from rag_engine import OPENAI_API_KEY, rag

load_dotenv()

app = FastAPI(title="Rohith AI API", version="2.0.0")

origins = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://localhost:5173").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[o.strip() for o in origins if o.strip()],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str
    session_id: str


class ClearRequest(BaseModel):
    session_id: str


def sse(event: str, data: Any) -> str:
    return f"event: {event}\ndata: {json.dumps(data)}\n\n"


@app.get("/health")
def health():
    return {
        "status": "ok",
        "chunks": len(rag.chunks),
        "openai": bool(OPENAI_API_KEY),
        "engine": "bm25-lite",
    }


@app.post("/chat/stream")
def chat_stream(body: ChatRequest):
    def generator():
        try:
            for kind, payload in rag.stream_answer(body.session_id, body.message.strip()):
                if kind == "token":
                    yield sse("token", {"content": payload})
                elif kind == "action":
                    yield sse("action", payload)
            yield sse("done", {})
        except Exception as exc:
            yield sse("error", {"message": str(exc)})
            yield sse("done", {})

    return StreamingResponse(
        generator(),
        media_type="text/event-stream",
        headers={"Cache-Control": "no-cache", "Connection": "keep-alive"},
    )


@app.post("/chat/clear")
def clear_chat(body: ClearRequest):
    rag.clear_session(body.session_id)
    return {"ok": True}


@app.post("/chat/reindex")
def reindex():
    count = rag.reload_knowledge()
    return {"ok": True, "chunks": count}
