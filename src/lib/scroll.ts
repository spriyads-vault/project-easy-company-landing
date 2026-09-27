export const SCROLL_TARGET_KEY = "crado:scroll-target";

export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(id);
  if (!el) return false;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : behavior, block: "start" });
  return true;
}

/** Drop the #fragment from the address bar without adding a history entry. */
export function clearHash() {
  if (window.location.hash) {
    window.history.replaceState(window.history.state, "", window.location.pathname + window.location.search);
  }
}
