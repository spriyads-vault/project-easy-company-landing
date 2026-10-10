"use client";

import { useEffect } from "react";
import { HASH_PATHS, ROUTE_EVENT, SECTION_DOM_IDS, canonicalPath, sectionForPath, type SectionId } from "./links";

/** The sticky header's height (--v6-nav-height); sections land just below it. */
const HEADER_OFFSET = 64;

/** Key in the history entry's state for the scroll position saved when the visitor leaves the homepage. */
const SAVED_Y = "cradoScrollY";

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** The element a path scrolls to: the FAQ row for /faq?q=<slug>, otherwise the section. */
function targetFor(id: SectionId, search: string): HTMLElement | null {
  if (id === "faq") {
    const q = new URLSearchParams(search).get("q");
    const row = q ? document.querySelector<HTMLElement>(`[data-faq-slug="${CSS.escape(q)}"]`) : null;
    if (row) return row;
  }
  return document.getElementById(SECTION_DOM_IDS[id]);
}

/** What takes focus once there: the email field for the waitlist, the answer's question, or the section heading. */
function focusFor(id: SectionId, target: HTMLElement): HTMLElement | null {
  if (id === "waitlist") return target.querySelector<HTMLElement>('input[type="email"]');
  if (target.dataset.faqSlug) return target.querySelector<HTMLElement>("button");
  const heading = target.querySelector<HTMLElement>("h2");
  // Headings are not focusable by default; tabindex -1 lets script focus them without adding a Tab stop.
  if (heading && !heading.hasAttribute("tabindex")) heading.setAttribute("tabindex", "-1");
  return heading;
}

/** Scrolls so the target sits just below the header. Instant on first load, on Back/Forward and with reduced motion. */
function scrollToTarget(target: HTMLElement, smooth: boolean): number {
  const top = Math.max(0, Math.round(target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET));
  window.scrollTo({ top, behavior: smooth && !reducedMotion() ? "smooth" : "instant" });
  return top;
}

/** Goes to the section the current URL names (or the top for "/"). Returns where it scrolled to. */
function goToCurrent({ smooth, focus }: { smooth: boolean; focus: boolean }): number | undefined {
  // An old path (/how-it-works) lands on its section with the current one (/product) in the address bar.
  const current = canonicalPath(window.location.pathname);
  if (current !== window.location.pathname) history.replaceState(null, "", current + window.location.search);
  const id = sectionForPath(current);
  window.dispatchEvent(new Event(ROUTE_EVENT));
  if (!id) {
    if (window.location.pathname !== "/" || window.location.hash) return undefined;
    window.scrollTo({ top: 0, behavior: smooth && !reducedMotion() ? "smooth" : "instant" });
    return 0;
  }
  const target = targetFor(id, window.location.search);
  if (!target) return undefined;
  const top = scrollToTarget(target, smooth);
  if (focus) focusFor(id, target)?.focus({ preventScroll: true });
  return top;
}

/** A link to a homepage section (or to "/") that the router should take over, or null for anything else. */
function sectionLinkFrom(e: MouseEvent): { anchor: HTMLAnchorElement; url: URL } | null {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return null;
  const anchor = (e.target as Element | null)?.closest?.("a[href]");
  if (!(anchor instanceof HTMLAnchorElement) || (anchor.target && anchor.target !== "_self") || anchor.hasAttribute("download")) return null;
  // Only path links ("/agents", "/faq?q=…", "/"): in-page "#…" links (the skip link, step 2) keep their own behaviour.
  if (!anchor.getAttribute("href")?.startsWith("/")) return null;
  const url = new URL(anchor.href, window.location.href);
  if (url.origin !== window.location.origin || url.hash) return null;
  if (url.pathname !== "/" && !sectionForPath(url.pathname)) return null;
  return { anchor, url };
}

/**
 * One scrolling homepage with clean section URLs (SCRUM-314, rendered only while SCROLL_SECTIONS is on).
 * - /product, /agents, /coverage, /faq and /waitlist are rewrites of "/" (next.config.ts); on arrival the page
 *   jumps to that section (the old /how-it-works too, shown as /product) (/waitlist also focuses the email field, /faq?q=<slug> opens that answer).
 * - On the page, a click on any section link (nav, mobile menu, footer, announcement, calls to action) scrolls
 *   instead of navigating and pushes the path; the mobile menu closes first. The section heading then takes focus.
 * - Back and Forward scroll to the section of the entry; Back from another page returns to where the visitor was. Scrolling never changes the URL (the header's scrollspy
 *   only moves the underline).
 * - Old hashes (/#agents, /#book, the v3 #change-review…) become their path without a new history entry.
 */
export default function ScrollRouter() {
  useEffect(() => {
    // The router places every entry itself; the browser restoring old offsets would fight it.
    const restoration = history.scrollRestoration;
    history.scrollRestoration = "manual";

    // URL changes go through Next's patched history methods with fresh state (null), so the app router copies its
    // own state in and keeps usePathname in step; passing history.state (which carries Next's marker) would skip that.
    const legacy = HASH_PATHS[decodeURIComponent(window.location.hash.slice(1))];
    if (legacy) history.replaceState(null, "", legacy);

    // Back to the homepage from another page: the reading position saved when the visitor left that entry.
    const saved = (history.state as { [SAVED_Y]?: unknown } | null)?.[SAVED_Y];
    const land = (focus: boolean) => {
      if (typeof saved !== "number") return goToCurrent({ smooth: false, focus });
      window.scrollTo({ top: saved, behavior: "instant" });
      return saved;
    };
    const savePosition = () => history.replaceState({ ...history.state, [SAVED_Y]: window.scrollY }, "");

    // First load (or arrival from another page): jump, then settle again once the fonts and images have laid the
    // page out (the browser may also re-apply an old hash), unless the visitor has started scrolling.
    const first = land(sectionForPath(window.location.pathname) === "waitlist");
    let settled = first === undefined;
    let raf = 0;
    const intent = () => (settled = true);
    const settle = () => {
      if (!settled) land(false);
    };
    const INTENT = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    for (const t of INTENT) window.addEventListener(t, intent, { passive: true, once: true });
    document.fonts?.ready.then(settle);
    if (document.readyState === "complete") raf = requestAnimationFrame(settle);
    else window.addEventListener("load", settle, { once: true });
    document.documentElement.dataset.scrollRouter = "ready";

    const onClick = (e: MouseEvent) => {
      const link = sectionLinkFrom(e);
      if (!link) {
        // Leaving for another page (docs, legal): remember where the visitor was, for Back.
        if ((e.target as Element | null)?.closest?.("a[href]")) savePosition();
        return;
      }
      e.preventDefault();
      settled = true;
      const next = canonicalPath(link.url.pathname) + link.url.search;
      if (next !== window.location.pathname + window.location.search || window.location.hash) history.pushState(null, "", next);
      // The mobile menu is a modal <dialog>: close it first, then scroll once the page is back.
      const menu = link.anchor.closest("dialog");
      if (menu?.open) {
        menu.close();
        requestAnimationFrame(() => goToCurrent({ smooth: true, focus: true }));
      } else {
        goToCurrent({ smooth: true, focus: true });
      }
    };

    const onPop = () => {
      settled = true;
      goToCurrent({ smooth: false, focus: false });
    };

    const onHash = () => {
      const path = HASH_PATHS[decodeURIComponent(window.location.hash.slice(1))];
      if (!path) return;
      history.replaceState(null, "", path);
      goToCurrent({ smooth: false, focus: false });
    };

    // Capture phase, so the click is handled before next/link would start a navigation.
    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onHash);
    window.addEventListener("pagehide", savePosition);
    return () => {
      // A settle still pending (fonts, next frame) must not move a page this instance no longer owns.
      settled = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("pagehide", savePosition);
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onHash);
      window.removeEventListener("load", settle);
      for (const t of INTENT) window.removeEventListener(t, intent);
      delete document.documentElement.dataset.scrollRouter;
      history.scrollRestoration = restoration;
    };
  }, []);
  return null;
}
