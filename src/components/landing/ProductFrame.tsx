"use client";

import { useEffect, useRef, type ReactNode } from "react";
import s from "./ProductFrame.module.css";

/**
 * Drives the statement's product frame (design: [data-pframe]):
 * - sets --s0, the starting scale: 82% of the content width (at most 1040px) over the frame's width,
 * - without CSS scroll-driven animations, writes the eased progress --p from scroll (rAF-throttled),
 * - marks the frame data-played once it reaches the viewport centre, so the Finding rows play once.
 * The frame keeps a fixed aspect ratio (16:9 from 1100px; content height below) so scaling never shifts layout.
 */
export default function ProductFrame({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      frame.setAttribute("data-played", "");
      return;
    }

    const setS0 = () => {
      const content = Math.min(window.innerWidth - 48, 1040);
      const s0 = Math.min(1, (0.82 * content) / (frame.offsetWidth || content));
      frame.style.setProperty("--s0", s0.toFixed(4));
    };

    // Progress the design uses: 0 when the frame's top meets the viewport bottom, 1 when it is centred.
    let raf = 0;
    const progress = () => {
      raf = 0;
      const vh = window.innerHeight;
      const top = frame.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, (vh - top) / (vh / 2 + frame.offsetHeight / 2)));
      frame.style.setProperty("--p", (1 - Math.pow(1 - p, 3)).toFixed(4));
      if (p >= 0.98) frame.setAttribute("data-played", "");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(progress);
    };

    const native = CSS.supports("animation-timeline: view()");
    const onResize = () => {
      setS0();
      if (!native) onScroll();
    };
    setS0();
    window.addEventListener("resize", onResize);

    let io: IntersectionObserver | null = null;
    if (native) {
      // A 1px sentinel at the frame's vertical centre reaches just below the viewport centre as p reaches 0.98.
      const sentinel = frame.querySelector<HTMLElement>("[data-pframe-mid]");
      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            frame.setAttribute("data-played", "");
            io?.disconnect();
          }
        },
        { rootMargin: "0px 0px -48% 0px" },
      );
      if (sentinel) io.observe(sentinel);
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
      progress();
    }

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      data-pframe
      data-diagram="product-frame"
      className={`${s.frame} relative flex flex-col overflow-hidden rounded-2xl border border-line-3 bg-surface-1b text-left font-sans text-[13px] text-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.04),0_40px_120px_-40px_rgb(0_0_0/0.8)] will-change-transform lg:aspect-video`}
    >
      <span data-pframe-mid aria-hidden="true" className="pointer-events-none absolute top-1/2 left-0 h-px w-px" />
      {children}
    </div>
  );
}
