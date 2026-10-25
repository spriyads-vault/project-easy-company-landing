"use client";

import { useEffect } from "react";

/**
 * Scroll motion for the v8 homepage, without an animation library (the design used GSAP, ScrollTrigger and Lenis).
 *
 * - [data-anim-root]: when a root is 20% in view it gets .v8-play, which runs the CSS keyframes of its [data-a]
 *   children (src/home/v8/v8.css), cycles its [data-status] text and types its [data-type] text.
 * - [data-reveal] and the children of [data-stagger]: below the fold they start hidden and rise in once their top
 *   passes 88% of the viewport. Anything already on screen is left alone.
 * - Clicking a link to #get-started focuses the waitlist email field after the scroll, and records which call to action
 *   was used (data-wl-source) for the form's attribution.
 *
 * The inline script in src/home/v8/HomePage.tsx sets html[data-v8-motion] before first paint unless the visitor
 * prefers reduced motion; with it unset every element shows its final state and nothing here animates.
 */
export const WL_SOURCE_EVENT = "crado:wl-source";

export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.v8Ready = "";
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, ms));
    const motion = "v8Motion" in root.dataset && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // #get-started links: focus the email field once the smooth scroll has landed; tell the form where the click came from.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href="#get-started"]');
      if (!a) return;
      const source = a.dataset.wlSource;
      if (source) window.dispatchEvent(new CustomEvent(WL_SOURCE_EVENT, { detail: source }));
      const focus = () => document.getElementById("wl-email")?.focus({ preventScroll: true });
      // After the browser's own jump to #get-started, which would otherwise take focus back to the page.
      later(focus, motion ? 700 : 50);
    };
    document.addEventListener("click", onClick);

    let io: IntersectionObserver | undefined;
    let reveal: IntersectionObserver | undefined;
    if (motion) {
      const play = (el: Element) => {
        el.classList.add("v8-play");
        el.querySelectorAll<HTMLElement>("[data-status]").forEach((s) => {
          const steps = (s.dataset.status ?? "").split("|");
          const t0 = Number(s.dataset.t ?? 0);
          const step = Number(s.dataset.step ?? 600);
          s.textContent = "";
          steps.forEach((text, i) => later(() => (s.textContent = i < steps.length - 1 ? `${text}…` : text), t0 + i * step));
        });
        el.querySelectorAll<HTMLElement>("[data-type]").forEach((s) => {
          const full = s.dataset.type || s.textContent || "";
          const d = Number(s.dataset.d ?? 400);
          s.dataset.type = full;
          s.textContent = "";
          later(() => {
            const start = performance.now();
            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / d);
              s.textContent = full.slice(0, Math.round(full.length * p));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }, Number(s.dataset.t ?? 0));
        });
      };
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            io?.unobserve(e.target);
            play(e.target);
          }),
        { threshold: 0.2 },
      );
      document.querySelectorAll("[data-anim-root]").forEach((el) => io?.observe(el));

      const targets = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
      document.querySelectorAll<HTMLElement>("[data-stagger]").forEach((el) => {
        [...el.children].forEach((child, i) => {
          (child as HTMLElement).style.transitionDelay = `${i * 60}ms`;
          targets.push(child as HTMLElement);
        });
      });
      reveal = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            reveal?.unobserve(e.target);
            e.target.classList.add("v8-in");
          }),
        { rootMargin: "0px 0px -12% 0px" },
      );
      for (const el of targets) {
        if (el.getBoundingClientRect().top < window.innerHeight) continue;
        el.classList.add("v8-pre");
        reveal.observe(el);
      }
    }

    return () => {
      document.removeEventListener("click", onClick);
      io?.disconnect();
      reveal?.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return null;
}
