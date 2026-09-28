// Cal.com popup booking, ported from the approved design's cal-booking.js.
//
// This module is the only owner of the page scroll lock while booking is open.
// Close detection relies on the "close" event each <cal-modal-box> dispatches,
// which fires for Cal's close button, a backdrop click, Cal's own Escape
// handler and the closeModal instruction. Earlier versions waited for
// state="closed", which a backdrop click never sets, and left the page locked.

import type { MouseEvent as ReactMouseEvent } from "react";

export const CAL_LINK = "crado-a7dbr4/30min";
export const CAL_URL = `https://cal.com/${CAL_LINK}`;
const NAMESPACE = "crado30";
const EMBED_SRC = "https://app.cal.com/embed/embed.js";
const LOAD_TIMEOUT_MS = 10_000;

type CalApi = ((...args: unknown[]) => void) & {
  q?: unknown[];
  ns?: Record<string, CalApi>;
  loaded?: boolean;
};

type CalWindow = Window & { Cal?: CalApi };

type BoxElement = HTMLElement & { __cradoWatched?: boolean };

let installed = false;
let inited = false;
let failed = false;
let open = false;
let trigger: HTMLElement | null = null;
let overlay: HTMLDivElement | null = null;
let lastBox: BoxElement | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;
let saved: { overflow: string; y: number } | null = null;

function cal(...args: unknown[]) {
  const api = (window as CalWindow).Cal?.ns?.[NAMESPACE];
  if (api) api(...args);
}

// Official Cal.com embed loader, run once when the page is idle or on first open.
function ensureInit() {
  if (inited) return;
  inited = true;
  const w = window as CalWindow;
  const d = w.document;
  if (!w.Cal) {
    const push = (api: CalApi, args: unknown) => api.q!.push(args);
    const Cal = function (...args: unknown[]) {
      const c = Cal as CalApi;
      if (!c.loaded) {
        c.ns = {};
        c.q = c.q || [];
        const s = d.createElement("script");
        s.src = EMBED_SRC;
        s.async = true;
        s.addEventListener("error", onLoadFailed);
        d.head.appendChild(s);
        c.loaded = true;
      }
      if (args[0] === "init") {
        const api = function (...a: unknown[]) {
          push(api as CalApi, a);
        } as CalApi;
        api.q = api.q || [];
        const namespace = args[1];
        if (typeof namespace === "string") {
          c.ns![namespace] = c.ns![namespace] || api;
          push(c.ns![namespace], args);
          push(c, ["initNamespace", namespace]);
        } else push(c, args);
        return;
      }
      push(c, args);
    } as CalApi;
    w.Cal = Cal;
  }
  w.Cal!("init", NAMESPACE, { origin: "https://cal.com" });
  cal("ui", { layout: "month_view", hideEventTypeDetails: false, styles: { branding: { brandColor: "#2A3441" } } });
  cal("on", { action: "linkReady", callback: holdY });
  cal("on", { action: "linkFailed", callback: onLoadFailed });
}

function onLoadFailed() {
  failed = true;
  if (open) showFallback();
}

function lock() {
  const html = document.documentElement;
  // Only <html>: Cal locks and restores <body> itself, asynchronously after closeModal. Locking <body>
  // here too would let Cal "restore" our hidden value after we had already released it.
  saved = { overflow: html.style.overflow, y: window.scrollY };
  html.style.overflow = "hidden";
  restoreY(saved.y);
}

function restoreY(y: number) {
  if (Math.abs(window.scrollY - y) > 1) window.scrollTo({ top: y, left: 0, behavior: "instant" });
}

// Inserting Cal's modal box and iframe can reset the document scroll; hold the
// visitor's position while locked.
function holdY() {
  if (!saved) return;
  const y = saved.y;
  restoreY(y);
  requestAnimationFrame(() => {
    if (saved) restoreY(y);
  });
}

function unlock() {
  if (!saved) return null;
  const y = saved.y;
  document.documentElement.style.overflow = saved.overflow;
  saved = null;
  return y;
}

/** Release everything. `restoreScroll` is false when leaving the page, so the next page keeps its own position. */
function finish(restoreScroll = true) {
  if (!open) return;
  open = false;
  clearTimeout(timer);
  removeOverlay();
  const y = unlock();
  let t = trigger;
  trigger = null;
  // A trigger inside the closed mobile menu no longer exists; return focus to the menu button.
  if (!t || !document.contains(t)) t = document.querySelector<HTMLElement>('[aria-controls="site-menu"]');
  t?.focus({ preventScroll: true });
  if (y !== null && restoreScroll) {
    restoreY(y);
    requestAnimationFrame(() => restoreY(y));
  }
}

function removeOverlay() {
  overlay?.remove();
  overlay = null;
}

const BUTTON =
  "min-height:44px;padding:0 16px;background:transparent;border:1px solid #2A3441;border-radius:3px;color:#2A3441;font:500 15px var(--font-plex-sans),system-ui,sans-serif;cursor:pointer;margin-left:auto";

function buildOverlay(fallback: boolean) {
  removeOverlay();
  const o = document.createElement("div");
  o.setAttribute("role", "dialog");
  o.setAttribute("aria-modal", "true");
  o.setAttribute("aria-label", "Book a pilot call");
  o.dataset.booking = fallback ? "fallback" : "loading";
  o.style.cssText =
    "position:fixed;inset:0;z-index:2147483000;background:rgba(42,52,65,0.55);display:flex;align-items:center;justify-content:center;padding:20px;font-family:var(--font-plex-sans),system-ui,sans-serif";
  const box = document.createElement("div");
  box.style.cssText =
    "background:#F4F2EC;color:#2A3441;border:1.5px solid #2A3441;box-shadow:8px 8px 0 #2A3441;padding:24px;max-width:420px;width:100%;display:flex;flex-direction:column;gap:16px";
  const msg = document.createElement("p");
  msg.style.cssText = "margin:0;font-size:17px;line-height:1.5";
  msg.setAttribute("aria-live", "polite");
  msg.textContent = fallback
    ? "The booking calendar could not be loaded here. You can book directly on Cal.com."
    : "Loading the booking calendar.";
  const row = document.createElement("div");
  row.style.cssText = "display:flex;flex-wrap:wrap;gap:12px;align-items:center";
  const link = document.createElement("a");
  link.href = CAL_URL;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = fallback ? "Open booking page" : "Open on Cal.com instead";
  link.style.cssText = fallback
    ? "padding:12px 18px;background:#2A3441;color:#F4F2EC;text-decoration:none;font-weight:500;border-radius:3px"
    : "color:#2A3441;font-size:15px;padding:10px 0";
  const close = document.createElement("button");
  close.type = "button";
  close.textContent = "Close";
  close.style.cssText = BUTTON;
  close.addEventListener("click", () => dismissBooking());
  o.addEventListener("click", (e) => {
    if (e.target === o) dismissBooking();
  });
  // Keep Tab inside the dialog: it only holds the link and the Close button.
  o.addEventListener("keydown", (e) => {
    if (e.key !== "Tab") return;
    const next = document.activeElement === link ? close : link;
    e.preventDefault();
    next.focus();
  });
  row.append(link, close);
  box.append(msg, row);
  o.appendChild(box);
  document.body.appendChild(o);
  overlay = o;
  (fallback ? link : close).focus({ preventScroll: true });
}

function showFallback() {
  buildOverlay(true);
}

/** Close booking from our own UI, Escape or a route change (`restoreScroll` false). */
export function dismissBooking(restoreScroll = true) {
  if (!open) return;
  try {
    cal("closeModal");
  } catch {
    // No modal yet.
  }
  finish(restoreScroll);
}

function watchBox(el: BoxElement) {
  if (el.__cradoWatched) return;
  el.__cradoWatched = true;
  lastBox = el;
  holdY();
  el.addEventListener("close", () => finish());
  // Cal reopens a box dismissed while still loading once loading completes; close it again.
  el.addEventListener("open", () => {
    if (!open && el === lastBox) cal("closeModal");
    else holdY();
  });
  if (overlay?.dataset.booking === "loading") removeOverlay();
}

/** Open the booking modal. Pass the click event from a CTA so modified clicks keep default link behaviour. */
export function openBooking(e?: ReactMouseEvent<HTMLElement> | MouseEvent) {
  if (e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return;
    e.preventDefault();
  }
  if (open) return;
  trigger = (e?.currentTarget as HTMLElement | null) ?? (document.activeElement as HTMLElement | null);
  open = true;
  ensureInit();
  lock();
  if (failed) return showFallback();
  buildOverlay(false);
  cal("modal", { calLink: CAL_LINK, config: { layout: "month_view" } });
  clearTimeout(timer);
  timer = setTimeout(() => {
    if (open && overlay?.dataset.booking === "loading") showFallback();
  }, LOAD_TIMEOUT_MS);
}

/** Install observers and listeners once per page lifetime. Returns a teardown. */
export function installBooking() {
  if (installed) return () => {};
  installed = true;

  const observer = new MutationObserver((records) => {
    for (const r of records)
      r.addedNodes.forEach((n) => {
        if (n.nodeName === "CAL-MODAL-BOX") watchBox(n as BoxElement);
      });
  });
  observer.observe(document.body, { childList: true });

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape" && open) dismissBooking();
  };
  document.addEventListener("keydown", onKey);
  const onPageHide = () => finish(false);
  window.addEventListener("pagehide", onPageHide);

  // Load Cal after the page is idle so it never delays primary content.
  let idleId: number | undefined;
  let idleTimer: ReturnType<typeof setTimeout> | undefined;
  const idleInit = () => {
    if ("requestIdleCallback" in window) idleId = window.requestIdleCallback(ensureInit, { timeout: 4000 });
    else idleTimer = setTimeout(ensureInit, 2000);
  };
  if (document.readyState === "complete") idleInit();
  else window.addEventListener("load", idleInit, { once: true });

  return () => {
    installed = false;
    dismissBooking();
    observer.disconnect();
    document.removeEventListener("keydown", onKey);
    window.removeEventListener("pagehide", onPageHide);
    window.removeEventListener("load", idleInit);
    if (idleId !== undefined) window.cancelIdleCallback(idleId);
    clearTimeout(idleTimer);
  };
}
