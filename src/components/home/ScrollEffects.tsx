"use client";

import { useEffect } from "react";

/**
 * Scroll-linked effects for the home page, all on native scrolling:
 * - [data-rv] elements fade and rise into place once 15% visible.
 * - [data-draw] SVGs draw their paths once 30% visible.
 * - [data-par="0.035"] elements drift by that fraction of their distance from the viewport centre.
 * With reduced motion none of this runs and everything stays in its finished state.
 */
export default function ScrollEffects() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    const vh = window.innerHeight;

    // Anything already on screen is shown straight away so nothing above the fold blinks.
    const reveal = Array.from(document.querySelectorAll<HTMLElement>("[data-rv], [data-draw]"));
    const pending = reveal.filter((el) => {
      const r = el.getBoundingClientRect();
      const onScreen = r.top < vh && r.bottom > 0;
      if (onScreen) el.classList.add("is-in");
      return !onScreen;
    });
    root.classList.add("fx");

    const show = (threshold: number, rootMargin = "0px") =>
      new IntersectionObserver(
        (entries, io) =>
          entries.forEach((en) => {
            if (!en.isIntersecting) return;
            en.target.classList.add("is-in");
            io.unobserve(en.target);
          }),
        { threshold, rootMargin },
      );
    const rio = show(0.15, "0px 0px -6% 0px");
    const dio = show(0.3);
    pending.forEach((el) => (el.hasAttribute("data-draw") ? dio : rio).observe(el));

    // Parallax, only for elements near the viewport.
    const fine = window.matchMedia("(pointer: fine)").matches;
    const near = new Set<HTMLElement>();
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      near.forEach((el) => {
        const r = el.getBoundingClientRect();
        const current = Number(el.dataset.py ?? 0);
        const offset = (r.top + current + r.height / 2 - mid) * Number(el.dataset.par);
        el.dataset.py = offset.toFixed(1);
        el.style.transform = `translate3d(0, ${(-offset).toFixed(1)}px, 0)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const pio = new IntersectionObserver(
      (entries) => entries.forEach((en) => (en.isIntersecting ? near.add(en.target as HTMLElement) : near.delete(en.target as HTMLElement))),
      { rootMargin: "120px 0px" },
    );
    if (fine) {
      document.querySelectorAll<HTMLElement>("[data-par]").forEach((el) => pio.observe(el));
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      rio.disconnect();
      dio.disconnect();
      pio.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
      root.classList.remove("fx");
    };
  }, []);

  return null;
}
