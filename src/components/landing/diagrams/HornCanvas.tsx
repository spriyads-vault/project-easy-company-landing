"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "@/hooks/useMotion";

interface HornCanvasProps {
  /** Sizing and positioning classes. Give it a height; width follows the 36:26 pixel grid. */
  className?: string;
}

type Pixel = { v: number } | { c: "b" } | null;

const W = 36;
const H = 26;
/** 4x4 Bayer matrix used for both the shade dither and the reveal order. */
const B4 = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
];
/** Reveal steps: the design redraws 16 coverage levels over 900ms; we pre-draw 8 and switch opacity. */
const STEPS = 8;
const STEP_MS = 112;

/** Pixel horn antenna from the design (horn(x, y)): v is a 0..1 shade, c: "b" is the accent aperture. */
function horn(x: number, y: number): Pixel {
  const cy = 12.5;
  if (x >= 0 && x <= 2 && y >= 11 && y <= 14) return { v: 0.9 };
  if (x >= 3 && x <= 10 && y >= 9 && y <= 16) return { v: [0.8, 0.6, 0.5, 0.45, 0.4, 0.3, 0.22, 0.12][y - 9] };
  if (x >= 11 && x <= 34) {
    const h = 3.5 + ((x - 11) * 9) / 23;
    const dy = y - cy;
    if (Math.abs(dy) <= h) {
      if (x >= 33) return Math.abs(dy) > h - 1.5 ? { v: 1 } : { c: "b" };
      if (Math.abs(dy) > h - 1) return { v: dy < 0 ? 0.95 : 0.4 };
      return { v: 0.12 + ((0.5 * (x - 11)) / 23) * (1 - ((dy + h) / (2 * h)) * 0.7) };
    }
  }
  if (x >= 19 && x <= 20 && y >= 19 && y <= 23) return { v: 0.5 };
  if (y >= 24 && y <= 25 && x >= 15 && x <= 24) return { v: y === 24 ? 0.65 : 0.3 };
  return null;
}

function draw(cv: HTMLCanvasElement, p: number, greys: string[], accent: string) {
  const ctx = cv.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const r = horn(x, y);
      if (!r) continue;
      if ((B4[(y + 1) % 4][(x + 2) % 4] + 0.5) / 16 > p) continue;
      let col: string;
      if ("c" in r) col = accent;
      else {
        const th = (B4[y % 4][x % 4] + 0.5) / 16;
        const l = Math.max(0, Math.min(1, r.v)) * (greys.length - 1);
        const lo = Math.floor(l);
        col = greys[Math.min(greys.length - 1, l - lo > th ? lo + 1 : lo)];
      }
      ctx.fillStyle = col;
      ctx.fillRect(x, y, 1, 1);
    }
}

/**
 * Dithered pixel horn antenna in the hero collage (design: canvas[data-obj="horn"]). Each reveal step is drawn
 * once onto its own stacked canvas and shown by opacity once the horn is 30% visible.
 */
export default function HornCanvas({ className }: HornCanvasProps) {
  const { ref, reduced, entered } = useMotion<HTMLSpanElement>({ threshold: 0.3 });
  const canvases = useRef<(HTMLCanvasElement | null)[]>([]);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const css = getComputedStyle(document.documentElement);
    const token = (n: string) => css.getPropertyValue(n).trim();
    const greys = [token("--color-dither-1"), token("--color-dither-2"), token("--color-dither-3")];
    const accent = token("--color-accent");
    canvases.current.forEach((cv, i) => cv && draw(cv, (i + 1) / STEPS, greys, accent));
  }, []);

  useEffect(() => {
    if (reduced || !entered) return;
    const timers: number[] = [];
    for (let i = 0; i < STEPS; i++) timers.push(window.setTimeout(() => setStep(i), STEP_MS * (i + 1)));
    return () => timers.forEach(clearTimeout);
  }, [reduced, entered]);

  const shown = reduced ? STEPS - 1 : step;

  return (
    <span ref={ref} data-motion aria-hidden="true" className={`block aspect-[36/26] ${className ?? ""}`}>
      <span className="relative block size-full">
        {Array.from({ length: STEPS }, (_, i) => (
          <canvas
            key={i}
            ref={(el) => {
              canvases.current[i] = el;
            }}
            width={W}
            height={H}
            className={`absolute inset-0 size-full [image-rendering:pixelated] ${i === shown ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </span>
    </span>
  );
}
