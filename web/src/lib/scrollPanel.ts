export function scrollPanelToBottom(el: HTMLDivElement | null, behavior: ScrollBehavior = "auto") {
  if (!el) return;
  el.scrollTo({ top: el.scrollHeight, behavior });
}

export function isPanelNearBottom(el: HTMLDivElement, threshold = 56) {
  return el.scrollHeight - el.scrollTop - el.clientHeight <= threshold;
}
