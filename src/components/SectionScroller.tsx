"use client";

import { useEffect } from "react";
import { SCROLL_TARGET_KEY, clearHash, scrollToSection } from "@/lib/scroll";

/**
 * Mounted on the home page. Finishes a section jump that started on another
 * page (see NavLinks), and tidies "/#section" URLs opened directly so the
 * address bar stays clean once the browser has scrolled.
 */
export default function SectionScroller() {
  useEffect(() => {
    let target: string | null = null;
    try {
      target = sessionStorage.getItem(SCROLL_TARGET_KEY);
      sessionStorage.removeItem(SCROLL_TARGET_KEY);
    } catch {}

    if (target) {
      requestAnimationFrame(() => scrollToSection(target, "auto"));
    } else if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.slice(1));
      requestAnimationFrame(() => scrollToSection(id, "auto"));
    }
    clearHash();
  }, []);

  return null;
}
