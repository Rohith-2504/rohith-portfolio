import type { ChatAction } from "./actions";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  action?: ChatAction | null;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export function getSessionId() {
  if (typeof window === "undefined") return "server";
  const key = "rohith-ai-session";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

export function loadHistory(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(sessionStorage.getItem("rohith-ai-history") ?? "[]");
  } catch {
    return [];
  }
}

export function saveHistory(messages: ChatMessage[]) {
  sessionStorage.setItem("rohith-ai-history", JSON.stringify(messages.slice(-40)));
}

export async function streamChat({
  message,
  onToken,
  onAction,
  onDone,
  onError,
}: {
  message: string;
  onToken: (token: string) => void;
  onAction: (action: ChatAction | null) => void;
  onDone: () => void;
  onError: (error: string) => void;
}) {
  const response = await fetch(`${API_URL}/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, session_id: getSessionId() }),
  });

  if (!response.ok || !response.body) {
    onError("Assistant is offline. Start the API with: npm run dev:api");
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n\n");
    buffer = parts.pop() ?? "";

    for (const part of parts) {
      const lines = part.split("\n");
      let event = "message";
      let data = "";
      for (const line of lines) {
        if (line.startsWith("event:")) event = line.slice(6).trim();
        if (line.startsWith("data:")) data += line.slice(5).trim();
      }
      if (!data) continue;
      if (event === "token") {
        const parsed = JSON.parse(data) as { content?: string };
        if (parsed.content) onToken(parsed.content);
      }
      if (event === "action") {
        const parsed = JSON.parse(data) as ChatAction;
        onAction(parsed);
      }
      if (event === "error") {
        const parsed = JSON.parse(data) as { message?: string };
        onError(parsed.message ?? "Something went wrong");
      }
      if (event === "done") onDone();
    }
  }
}

export async function clearChatSession() {
  sessionStorage.removeItem("rohith-ai-history");
  await fetch(`${API_URL}/chat/clear`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: getSessionId() }),
  }).catch(() => undefined);
  sessionStorage.removeItem("rohith-ai-session");
}
