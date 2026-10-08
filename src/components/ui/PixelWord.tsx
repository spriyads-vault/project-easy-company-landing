"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useMotion";

interface PixelWordProps {
  children: string;
}

const STEPS = [3, 2, 1] as const;
const STEP_DELAY_MS = 140;

/**
 * Serif accent word drawn as a thresholded, pixelated canvas over the real text (design: [data-px]).
 * The text stays in the DOM, selectable and indexable; it is only made transparent once a canvas is drawn.
 * Each sharpness step is its own pre-drawn canvas, revealed by switching opacity (no per-frame redraws).
 * The size is fixed at 1.12em (the design's fallback ratio) so nothing shifts when fonts load.
 */
export default function PixelWord({ children }: PixelWordProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const timers: number[] = [];
    let io: IntersectionObserver | null = null;
    let cancelled = false;
    let settled = false;

    const draw = () => {
      if (cancelled) return;
      el.querySelectorAll("canvas").forEach((c) => c.remove());
      const style = getComputedStyle(el);
      const fs = parseFloat(style.fontSize);
      const color = getComputedStyle(el.parentElement ?? el).color;
      const family = style.fontFamily;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      const pad = Math.ceil(fs * 0.14);
      const canvases = STEPS.map((s) => {
        const k = Math.max(1, Math.round(fs / 32)) * s;
        const cv = document.createElement("canvas");
        cv.setAttribute("aria-hidden", "true");
        const W = Math.ceil((w + 2 * pad) / k);
        const H = Math.ceil((h + 2 * pad) / k);
        cv.width = W;
        cv.height = H;
        Object.assign(cv.style, {
          position: "absolute",
          left: `${-pad}px`,
          top: `${-pad}px`,
          width: `${W * k}px`,
          height: `${H * k}px`,
          imageRendering: "pixelated",
          pointerEvents: "none",
          opacity: "0",
        });
        const ctx = cv.getContext("2d");
        if (!ctx) return cv;
        ctx.font = `400 ${fs / k}px ${family}`;
        ctx.textBaseline = "alphabetic";
        ctx.fillStyle = color;
        const m = ctx.measureText(children);
        const A = m.fontBoundingBoxAscent * k;
        const D = m.fontBoundingBoxDescent * k;
        const base = (h - (A + D)) / 2 + A;
        ctx.fillText(children, pad / k, (base + pad) / k);
        const img = ctx.getImageData(0, 0, W, H);
        for (let i = 3; i < img.data.length; i += 4) img.data[i] = img.data[i] > 100 ? 255 : 0;
        ctx.putImageData(img, 0, 0);
        el.appendChild(cv);
        return cv;
      });
      const show = (i: number) => canvases.forEach((c, j) => (c.style.opacity = j === i ? "1" : "0"));
      el.style.color = "transparent";

      if (settled || reduced || !("IntersectionObserver" in window)) {
        show(STEPS.length - 1);
        return;
      }
      show(0);
      const heading = el.closest("h1, h2") ?? el;
      io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          io?.disconnect();
          [1, 2].forEach((i) => timers.push(window.setTimeout(() => show(i), STEP_DELAY_MS * i)));
          settled = true;
        },
        { threshold: 0.4 },
      );
      io.observe(heading);
    };

    const family = getComputedStyle(el).fontFamily;
    document.fonts.load(`400 100px ${family}`).then(draw, draw);

    // Breakpoints change the heading size; redraw at full sharpness once resizing stops.
    let lastWidth = el.offsetWidth;
    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      if (el.offsetWidth === lastWidth) return;
      lastWidth = el.offsetWidth;
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        settled = true;
        draw();
      }, 150);
    });
    ro.observe(el);

    return () => {
      cancelled = true;
      ro.disconnect();
      clearTimeout(resizeTimer);
      io?.disconnect();
      timers.forEach(clearTimeout);
      el.querySelectorAll("canvas").forEach((c) => c.remove());
      el.style.color = "";
    };
  }, [children, reduced]);

  return (
    <span ref={ref} className="relative inline-block font-serif text-[1.12em] font-normal tracking-normal">
      {children}
    </span>
  );
}
