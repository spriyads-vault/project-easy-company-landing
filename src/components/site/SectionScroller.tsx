"use client";

import { useEffect } from "react";
import { SCROLL_TARGET_KEY, clearHash, scrollToSection } from "@/lib/scroll";

// Anchors from earlier home pages, mapped to their closest replacement.
const LEGACY: Record<string, string> = {
  thesis: "approach",
  pipeline: "system",
  specifications: "investigate",
  application: "investigate",
  mechanism: "evaluate",
  architecture: "maintain",
  evidence: "maintain",
  direction: "maintain",
  faq: "pilot",
};

/**
 * Mounted on the home page. Finishes a section jump that started on another
 * page (see SectionLink), and tidies "/#section" URLs opened directly so the
 * address bar stays clean once the browser has scrolled.
 */
export default function SectionScroller() {
  useEffect(() => {
    let target: string | null = null;
    try {
      target = sessionStorage.getItem(SCROLL_TARGET_KEY);
      sessionStorage.removeItem(SCROLL_TARGET_KEY);
    } catch {}

    if (!target && window.location.hash) target = decodeURIComponent(window.location.hash.slice(1));
    if (target) {
      const id = LEGACY[target] ?? target;
      requestAnimationFrame(() => scrollToSection(id, "auto"));
    }
    clearHash();
  }, []);

  return null;
}
