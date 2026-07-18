"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Bot, Loader2, Send, Trash2 } from "lucide-react";
import { suggestedQuestions } from "@/data/portfolio";
import MagneticButton from "@/components/ui/MagneticButton";
import type { ChatAction } from "@/lib/actions";
import { executeChatAction } from "@/lib/actions";
import {
  clearChatSession,
  loadHistory,
  saveHistory,
  streamChat,
  type ChatMessage,
} from "@/lib/chat";
import { isPanelNearBottom, scrollPanelToBottom } from "@/lib/scrollPanel";

export default function AIChatCard() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickToBottomRef = useRef(true);

  useEffect(() => {
    setMessages(loadHistory());
  }, []);

  useEffect(() => {
    if (!stickToBottomRef.current) return;
    scrollPanelToBottom(scrollRef.current, "auto");
  }, [messages, typing]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const userMsg: ChatMessage = { id: crypto.randomUUID(), role: "user", content: trimmed };
    const assistantId = crypto.randomUUID();
    const next: ChatMessage[] = [...messages, userMsg, { id: assistantId, role: "assistant", content: "" }];
    setMessages(next);
    setInput("");
    stickToBottomRef.current = true;
    setStreaming(true);
    setTyping(true);

    let content = "";
    let action: ChatAction | null = null;

    await streamChat({
      message: trimmed,
      onToken: (token) => {
        setTyping(false);
        content += token;
        setMessages((prev) => prev.map((m) => (m.id === assistantId ? { ...m, content } : m)));
      },
      onAction: (a) => {
        action = a;
      },
      onDone: () => {
        setStreaming(false);
        setTyping(false);
        setMessages((prev) => {
          const updated = prev.map((m) => (m.id === assistantId ? { ...m, content, action } : m));
          saveHistory(updated.filter((m) => m.content));
          return updated;
        });
        executeChatAction(action);
      },
      onError: (error) => {
        setStreaming(false);
        setTyping(false);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId ? { ...m, content: `${error}\n\nStart the API: \`npm run dev:api\`` } : m,
          ),
        );
      },
    });
  };

  return (
    <article id="ai-assistant" className="card flex h-[520px] max-h-[520px] flex-col overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/5 px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/20 bg-gradient-to-br from-surface-2 to-surface text-accent shadow-[0_0_20px_rgba(217,58,47,0.15)]">
            <Bot size={18} />
          </div>
          <div>
            <p className="text-sm font-semibold">Ask Rohith AI</p>
            <p className="text-[10px] text-muted">Real RAG · streaming</p>
          </div>
        </div>
        <button type="button" onClick={() => clearChatSession().then(() => setMessages([]))} className="pill text-[10px]">
          <Trash2 size={11} /> Clear
        </button>
      </div>

      <div
        ref={scrollRef}
        data-scroll-panel
        onScroll={() => {
          const el = scrollRef.current;
          if (!el) return;
          stickToBottomRef.current = isPanelNearBottom(el);
        }}
        className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-y-contain p-4 [scrollbar-color:rgba(255,255,255,0.12)_transparent] [scrollbar-width:thin]"
      >
        {messages.length === 0 && (
          <p className="rounded-xl border border-white/5 bg-surface-2/50 p-3 text-xs leading-6 text-muted">
            Hi! I&apos;m Rohith AI. Ask about experience, projects, skills, Gopafy, or how to contact Rohith.
          </p>
        )}
        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[95%] rounded-xl px-3 py-2 text-xs leading-6 ${
              m.role === "user" ? "ml-auto bg-accent/15 text-cream" : "border border-white/5 bg-surface-2 text-secondary"
            }`}
          >
            {m.role === "assistant" ? (
              <div className="markdown-body">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || "");
                      return match ? (
                        <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div">
                          {String(children).replace(/\n$/, "")}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>{children}</code>
                      );
                    },
                  }}
                >
                  {m.content || "…"}
                </ReactMarkdown>
              </div>
            ) : (
              m.content
            )}
          </div>
        ))}
        {typing && (
          <div className="inline-flex items-center gap-2 text-[11px] text-muted">
            <Loader2 size={12} className="animate-spin" /> Thinking…
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5 border-t border-white/5 px-4 py-2">
        {suggestedQuestions.slice(0, 3).map((q) => (
          <button key={q} type="button" onClick={() => send(q)} className="pill text-[10px] transition hover:text-cream">
            {q}
          </button>
        ))}
      </div>

      <div className="flex gap-2 border-t border-white/5 p-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything…"
          disabled={streaming}
          className="flex-1 rounded-full border border-white/5 bg-surface-2 px-3 py-2 text-xs outline-none focus:border-accent/30"
          onKeyDown={(e) => e.key === "Enter" && send(input)}
        />
        <MagneticButton className="btn-accent px-3 py-2" onClick={() => send(input)}>
          <Send size={14} />
        </MagneticButton>
      </div>
    </article>
  );
}
