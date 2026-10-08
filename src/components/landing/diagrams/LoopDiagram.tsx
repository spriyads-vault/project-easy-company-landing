"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMotion } from "@/hooks/useMotion";
import Label from "@/components/ui/Label";
import { ApprovalPill, EngineChip, LoopNode, RankCard } from "./LoopParts";
import PcbCanvas from "./PcbCanvas";

interface LoopDiagramProps {
  /** Section copy, placed bottom-left inside the 720px stage as in the design. */
  children: ReactNode;
}

const PERIOD = 6000;
const BUMP = 0.083;
/** Node positions on the 1040x720 stage (left, top), in loop order. */
const NODE_POS: [number, number][] = [
  [535, 38],
  [755, 258],
  [535, 478],
  [315, 258],
];
/** Loop circle: centre (620, 280), radius 220. The dot starts at the top and runs clockwise. */
const CX = 620;
const CY = 280;
const R = 220;

type Props = Record<string, string | number>;

/** Highlight around loop position p (0..1) as the dot passes; prototype `bump`. */
function bump(p: number, on: Props, off: Props): Keyframe[] {
  return p === 0
    ? [
        { offset: 0, ...on },
        { offset: BUMP, ...off },
        { offset: 1 - BUMP * 0.4, ...off },
        { offset: 1, ...on },
      ]
    : [
        { offset: 0, ...off },
        { offset: p - BUMP * 0.4, ...off },
        { offset: p, ...on },
        { offset: p + BUMP, ...off },
        { offset: 1, ...off },
      ];
}

/**
 * Wide failure-investigation loop (design: [data-loop]). A dot circles the four steps every 6s; each node lifts
 * and outlines as it passes, the ranked causes show after Investigation and "+1 measured result" rises at Evidence.
 * The design moves the dot with offset-distance; here a 0x0 pivot at the circle centre rotates (transform only).
 */
export default function LoopDiagram({ children }: LoopDiagramProps) {
  const { ref, reduced, running } = useMotion<HTMLDivElement>({ threshold: 0.3 });
  const anims = useRef<Animation[]>([]);

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    const opts: KeyframeAnimationOptions = { duration: PERIOD, iterations: Infinity };
    const out: Animation[] = [];

    const pivot = root.querySelector<HTMLElement>("[data-lp]");
    if (pivot) {
      const turn = [0, 90, 180, 270, 360].map((deg) => ({ transform: `rotate(${deg}deg)`, opacity: 1, easing: "ease-in-out" }));
      out.push(pivot.animate(turn, opts));
    }
    root.querySelectorAll<HTMLElement>("[data-ln]").forEach((n) => {
      const p = Number(n.dataset.ln) / 4;
      out.push(n.animate(bump(p, { transform: "translateY(-2px)" }, { transform: "none" }), opts));
      const b = n.querySelector<HTMLElement>("[data-nb]");
      if (b) out.push(b.animate(bump(p, { opacity: 1 }, { opacity: 0 }), opts));
    });
    const rank = root.querySelector<HTMLElement>("[data-rank]");
    const hid = { opacity: 0, transform: "translateY(-4px)" };
    const shown = { opacity: 1, transform: "none" };
    if (rank) {
      const steps = [
        [0, hid],
        [0.5, hid],
        [0.55, shown],
        [0.68, shown],
        [0.73, hid],
        [1, hid],
      ] as const;
      out.push(rank.animate(steps.map(([offset, s]) => ({ offset, ...s })), opts));
    }
    const plus = root.querySelector<HTMLElement>("[data-plus]");
    if (plus)
      out.push(
        plus.animate(
          [
            { offset: 0, opacity: 0, transform: "none" },
            { offset: 0.75, opacity: 0, transform: "none" },
            { offset: 0.77, opacity: 1, transform: "none" },
            { offset: 0.87, opacity: 0, transform: "translateY(-8px)" },
            { offset: 1, opacity: 0, transform: "translateY(-8px)" },
          ],
          opts,
        ),
      );
    out.forEach((a) => a.pause());
    anims.current = out;
    return () => {
      out.forEach((a) => a.cancel());
      anims.current = [];
    };
  }, [ref, reduced]);

  useEffect(() => {
    anims.current.forEach((a) => (running ? a.play() : a.pause()));
  }, [running, reduced]);

  return (
    <div ref={ref} data-motion data-loop data-diagram="loop" className="relative h-[720px]">
      <svg
        role="img"
        aria-label="Diagram: a loop from change review to targeted check, investigation and evidence updated, around Crado"
        width="1040"
        height="720"
        className="pointer-events-none absolute inset-0 overflow-visible"
      >
        <defs>
          <marker id="loop-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0.5 0.5 L7 4 L0.5 7.5" fill="none" className="stroke-line-8" strokeWidth="1.2" />
          </marker>
        </defs>
        {[
          "M702.4 76.0 A220 220 0 0 1 824.0 197.6",
          "M824.0 362.4 A220 220 0 0 1 702.4 484.0",
          "M537.6 484.0 A220 220 0 0 1 416.0 362.4",
          "M416.0 197.6 A220 220 0 0 1 537.6 76.0",
        ].map((d) => (
          <path key={d} d={d} fill="none" className="stroke-line-7" strokeWidth="1" markerEnd="url(#loop-arrow)" />
        ))}
      </svg>

      {NODE_POS.map(([left, top], i) => (
        <LoopNode key={i} index={i} className="absolute w-[170px]" style={{ left, top }} />
      ))}
      <EngineChip className="absolute" style={{ left: 345, top: 310 }} />
      {/* Labels the Change review step, which is the early-access part of the loop. */}
      <Label className="absolute top-[54px] left-[715px]">EARLY ACCESS</Label>
      <div className="absolute" style={{ left: 771.6, top: 112.4 }}>
        <ApprovalPill />
      </div>
      <RankCard className="absolute w-[220px]" style={{ left: 716, top: 458 }} />

      <span
        data-plus
        data-transient
        className="absolute w-[110px] text-center font-mono text-[10.5px] text-accent-text opacity-0"
        style={{ left: 345, top: 226 }}
      >
        +1 measured result
      </span>
      <div className="absolute flex h-32 w-40 flex-col items-center justify-center gap-3" style={{ left: 540, top: 216 }}>
        <PcbCanvas height={72} />
        <span className="text-[13px] font-semibold">Crado</span>
      </div>

      <span data-lp aria-hidden="true" className="absolute block size-0 opacity-0" style={{ left: CX, top: CY }}>
        <span
          className="absolute block size-2 rounded-full bg-accent-text shadow-[0_0_12px_var(--color-accent),0_0_0_3px_var(--color-accent-soft)]"
          style={{ left: -4, top: -R - 4 }}
        />
      </span>

      <div className="absolute bottom-14 left-0 flex max-w-[340px] flex-col items-start font-display">{children}</div>
    </div>
  );
}
