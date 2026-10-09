"use client";

import { useEffect, useRef } from "react";
import { AGENTS_PALETTE, AGENTS_TIME, HERO_PALETTE, STILL_PALETTE, drawRecordBlock, seedParticles } from "./recordBlock";

interface RecordBlockCanvasProps {
  /** hero: animated, with streams. agents: the design's still frame on the forest band. still: that frame on the page. */
  variant: "hero" | "agents" | "still";
  className?: string;
}

/**
 * Decorative canvas (aria-hidden). The hero block turns and its streams flow only while the canvas is on screen
 * and the tab is visible; with reduced motion it holds the first frame. The agents block is a still frame,
 * redrawn only on resize. The box size comes from CSS, so nothing shifts when it draws.
 */
export default function RecordBlockCanvas({ variant, className }: RecordBlockCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const hero = variant === "hero";
    const pal = hero ? HERO_PALETTE : variant === "agents" ? AGENTS_PALETTE : STILL_PALETTE;
    const parts = seedParticles();
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let onScreen = false;
    // Time advances only while running, so the block resumes where it paused.
    let elapsed = 0;
    let last = 0;

    const still = () => drawRecordBlock(cv, hero ? 0 : AGENTS_TIME, pal, parts);
    const frame = (now: number) => {
      elapsed += last ? now - last : 0;
      last = now;
      drawRecordBlock(cv, elapsed, pal, parts);
      raf = requestAnimationFrame(frame);
    };
    const update = () => {
      const run = hero && onScreen && !reduced.matches && document.visibilityState === "visible";
      if (run && !raf) {
        last = 0;
        raf = requestAnimationFrame(frame);
      } else if (!run && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
      if (!run && reduced.matches) elapsed = 0;
      if (raf) return;
      if (hero) drawRecordBlock(cv, elapsed, pal, parts);
      else still();
    };

    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      update();
    });
    io.observe(cv);
    const ro = new ResizeObserver(() => {
      if (!raf) update();
    });
    ro.observe(cv);
    document.addEventListener("visibilitychange", update);
    reduced.addEventListener("change", update);
    update();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", update);
      reduced.removeEventListener("change", update);
    };
  }, [variant]);

  return <canvas ref={ref} aria-hidden="true" data-record-block={variant} className={className} />;
}
