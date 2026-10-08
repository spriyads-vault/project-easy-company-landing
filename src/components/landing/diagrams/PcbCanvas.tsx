"use client";

import { useEffect, useRef, useState } from "react";
import { useMotion } from "@/hooks/useMotion";

interface PcbCanvasProps {
  /** Rendered height in px; width follows the 38:24 pixel grid. */
  height: number;
  className?: string;
}

type Pixel = { v: number } | { c: "b" } | null;

const W = 38;
const H = 24;
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

/** Pixel circuit board from the design (pcb(x, y)): v is a 0..1 shade, c: "b" is an accent trace. */
function pcb(x: number, y: number): Pixel {
  if (x < 1 || x > 36 || y < 2 || y > 21) return null;
  if ((x === 1 || x === 36) && (y === 2 || y === 21)) return null;
  for (const [hx, hy] of [
    [4, 5],
    [33, 5],
    [4, 18],
    [33, 18],
  ]) {
    const d = Math.hypot(x - hx, y - hy);
    if (d < 1.2) return null;
    if (d < 2.2) return { v: 0.9 };
  }
  if (
    (y === 11 && x >= 2 && x <= 12) ||
    (y === 11 && x >= 25 && x <= 30) ||
    (x === 30 && y >= 11 && y <= 16) ||
    (y === 16 && x >= 30 && x <= 36)
  )
    return { c: "b" };
  if (x >= 14 && x <= 23 && y >= 7 && y <= 16) return { v: x === 14 || y === 7 ? 0.35 : 0 };
  if (
    ((x === 12 || x === 13) && y >= 8 && y <= 15 && y % 2 === 0) ||
    ((x === 24 || x === 25) && y >= 8 && y <= 15 && y % 2 === 0)
  )
    return { v: 0.9 };
  if ((y === 5 || y === 6 || y === 17 || y === 18) && x >= 15 && x <= 22 && x % 2 === 1) return { v: 0.9 };
  if (x >= 26 && x <= 29 && y >= 3 && y <= 5) return { v: 0.75 };
  if (x >= 6 && x <= 9 && y >= 13 && y <= 15) return { v: 0.7 };
  if (y === 19 && x >= 8 && x <= 28) return { v: 0.62 };
  if (x === 8 && y >= 7 && y <= 12) return { v: 0.62 };
  if (
    (Math.abs(y - 11) === 1 && ((x >= 2 && x <= 11) || (x >= 26 && x <= 29))) ||
    (Math.abs(y - 16) === 1 && x >= 31) ||
    (Math.abs(x - 30) === 1 && y > 11 && y < 16)
  )
    return { v: 0.72 };
  let v = 0.3 + 0.2 * (1 - (x + y) / 58);
  if (y === 2) v = 0.6;
  if (y === 21) v = 0.1;
  return { v };
}

function draw(cv: HTMLCanvasElement, p: number, greys: string[], accent: string) {
  const ctx = cv.getContext("2d");
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);
  for (let y = 0; y < H; y++)
    for (let x = 0; x < W; x++) {
      const r = pcb(x, y);
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
 * Dithered pixel PCB (design: canvas[data-obj="pcb"]). The design redraws the canvas every frame while it
 * "resolves"; here each coverage step is drawn once onto its own stacked canvas and revealed by opacity.
 */
export default function PcbCanvas({ height, className }: PcbCanvasProps) {
  const { ref, reduced, entered } = useMotion<HTMLSpanElement>({ threshold: 0.3 });
  const canvases = useRef<(HTMLCanvasElement | null)[]>([]);
  const [step, setStep] = useState(-1);

  useEffect(() => {
    const root = document.documentElement;
    const css = getComputedStyle(root);
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
  const width = (height * W) / H;

  return (
    <span
      ref={ref}
      data-motion
      aria-hidden="true"
      className={`relative inline-block shrink-0 ${className ?? ""}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    >
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
  );
}
