export type ChatAction = {
  type: "scroll" | "open_url" | "highlight_projects" | "download";
  target?: string;
  filter?: string;
  url?: string;
};

function scrollToSection(selector: string) {
  const el = document.querySelector(selector);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function executeChatAction(action?: ChatAction | null) {
  if (!action) return;

  if (action.type === "scroll" && action.target) {
    setTimeout(() => scrollToSection(action.target!), 300);
  }

  if (action.type === "highlight_projects" && action.filter) {
    document.querySelectorAll("[data-project-tags]").forEach((el) => {
      const tags = el.getAttribute("data-project-tags") ?? "";
      el.classList.toggle("project-highlight", tags.includes(action.filter!));
    });
    setTimeout(() => {
      document.querySelectorAll(".project-highlight").forEach((el) => el.classList.remove("project-highlight"));
    }, 4000);
  }

  if (action.type === "open_url" && action.url) {
    window.open(action.url, "_blank", "noopener,noreferrer");
  }

  if (action.type === "download" && action.url) {
    const a = document.createElement("a");
    a.href = action.url;
    a.download = "";
    a.click();
  }
}
