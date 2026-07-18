"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Loader2, Send, Sparkles, Trash2 } from "lucide-react";
import { suggestedQuestions } from "@/data/portfolio";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
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

export default function AISection() {
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
    const assistantPlaceholder: ChatMessage = { id: assistantId, role: "assistant", content: "" };
    const next: ChatMessage[] = [...messages, userMsg, assistantPlaceholder];
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
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content } : m)),
        );
      },
      onAction: (a) => {
        action = a;
      },
      onDone: () => {
        setStreaming(false);
        setTyping(false);
        setMessages((prev) => {
          const updated = prev.map((m) =>
            m.id === assistantId ? { ...m, content, action } : m,
          );
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
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    `${error}\n\nYou can still explore the site — try **Projects**, **Experience**, or **Contact**.`,
                }
              : m,
          ),
        );
      },
    });
  };

  const clear = async () => {
    await clearChatSession();
    setMessages([]);
  };

  return (
    <section id="ai-assistant" className="section border-t border-border">
      <div className="wrap">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="section-label">AI Assistant</p>
              <h2 className="display-lg">
                Ask <span className="text-accent italic">Rohith AI</span>
              </h2>
              <p className="body-lg mt-6 max-w-md">
                A real retrieval-augmented assistant trained on my resume, projects, skills, and experience.
                Ask naturally — it remembers context within your session.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, 4).map((q) => (
                  <button key={q} type="button" onClick={() => send(q)} className="pill text-left text-[11px] transition hover:text-cream">
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <div className="card flex h-[560px] max-h-[560px] flex-col overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-2 text-sm text-secondary">
                  <Sparkles size={16} className="text-ai" />
                  Rohith AI · RAG
                </div>
                <button type="button" onClick={clear} className="pill text-[11px] transition hover:text-cream" aria-label="Clear chat">
                  <Trash2 size={12} /> Clear
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
                className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-y-contain p-5"
              >
                {messages.length === 0 && (
                  <p className="text-sm text-muted">
                    Try: &quot;Explain the RAG project&quot;, &quot;Show AI projects&quot;, or &quot;Tell me about Gopafy&quot;
                  </p>
                )}
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                      m.role === "user"
                        ? "ml-auto bg-accent/15 text-cream"
                        : "border border-border bg-surface-2 text-secondary"
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
                                <code className={className} {...props}>
                                  {children}
                                </code>
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
                  <div className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-2 text-xs text-muted">
                    <Loader2 size={14} className="animate-spin" /> Rohith AI is thinking
                  </div>
                )}
              </div>

              <div className="flex gap-2 border-t border-border p-4">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about experience, projects, stack, contact…"
                  className="flex-1 rounded-full border border-border bg-surface-2 px-4 py-2.5 text-sm outline-none transition focus:border-accent/40"
                  onKeyDown={(e) => e.key === "Enter" && send(input)}
                  disabled={streaming}
                />
                <MagneticButton className="btn-accent px-4 py-2.5" onClick={() => send(input)}>
                  <Send size={16} />
                </MagneticButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
