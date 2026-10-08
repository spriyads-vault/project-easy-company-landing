"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useMotion } from "@/hooks/useMotion";
import { Icon, Tag } from "./LoopParts";
import { EASE_OUT_EXPO, track, type Stop } from "./timeline";

const T = 12000;
/** Reset point: everything fades back to the start state, then the cycle repeats. */
const RESET = 11400;

/** Opacity reveal at `at` over `dur`, held until the reset fade. */
function reveal(at: number, dur: number, from: Record<string, string | number> = {}, to: Record<string, string | number> = {}): Stop[] {
  return [
    [0, { opacity: 0, ...from }],
    [at, { opacity: 0, ...from }, EASE_OUT_EXPO],
    [at + dur, { opacity: 1, ...to }],
    [RESET, { opacity: 1, ...to }, "ease-in-out"],
    [RESET + 400, { opacity: 0, ...to }],
    [T, { opacity: 0, ...to }],
  ];
}

function Lane({ label, last, children }: { label: string; last?: boolean; children: ReactNode }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-[96px_minmax(0,1fr)] ${last ? "" : "border-b border-line-2"}`}>
      <div className="px-4 pt-3.5 sm:border-r sm:border-line-2 sm:py-5">
        <span className="font-mono text-[10px] tracking-[0.1em] text-fg-faint">{label}</span>
      </div>
      <div className="relative flex min-w-0 flex-col items-start gap-2.5 p-4">{children}</div>
    </div>
  );
}

/**
 * Agent / engine / engineer swimlanes (design: [data-lanes]), a 12s cycle: the agent's proposed value drops into
 * the engine lane, the engineer confirms it (INFERRED → CONFIRMED), the rule result appears, a second reading with
 * no detector is blocked at the boundary, and the reviewer line lands. Each element runs one infinite, pausable
 * animation. The drop distance is measured from the DOM; it is a transform, so it never moves layout.
 */
export default function LanesDiagram() {
  const { ref, reduced, running } = useMotion<HTMLDivElement>({ threshold: 0.3 });
  const anims = useRef<Animation[]>([]);
  const runningRef = useRef(running);

  useEffect(() => {
    runningRef.current = running;
  }, [running]);

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    const one = (s: string) => root.querySelector<HTMLElement>(s);
    const opts: KeyframeAnimationOptions = { duration: T, iterations: Infinity };

    const build = (time: number) => {
      anims.current.forEach((a) => a.cancel());
      const p1 = one("[data-p1]");
      const slot = one("[data-slot1]");
      if (!p1 || !slot) return;
      const dy = Math.round(slot.getBoundingClientRect().top - p1.getBoundingClientRect().top);
      const at = `translateY(${dy}px)`;
      const out: Animation[] = [];
      const add = (el: HTMLElement | null, stops: Stop[]) => el && out.push(el.animate(track(T, stops), opts));

      add(p1, reveal(300, 300));
      add(p1, [
        [0, { transform: at }],
        [1900, { transform: at }, EASE_OUT_EXPO],
        [2300, { transform: "none" }],
        [T, { transform: "none" }],
      ]);
      add(one("[data-slotnote]"), reveal(2300, 300));
      add(one("[data-cbtn]"), [
        [0, { transform: "scale(1)" }],
        [1150, { transform: "scale(1)" }, "ease-in-out"],
        [1260, { transform: "scale(0.94)" }, "ease-in-out"],
        [1370, { transform: "scale(1)" }],
        [T, { transform: "scale(1)" }],
      ]);
      add(one("[data-l0]"), [
        [0, { opacity: 1 }],
        [1350, { opacity: 1 }, "ease-in-out"],
        [1530, { opacity: 0 }],
        [RESET, { opacity: 0 }, "ease-in-out"],
        [RESET + 400, { opacity: 1 }],
        [T, { opacity: 1 }],
      ]);
      add(one("[data-l1]"), reveal(1350, 180).map(([ms, p, e]) => [ms, p, ms === 1350 ? "ease-in-out" : e] as Stop));
      add(one("[data-res]"), reveal(2450, 300, { transform: "translateY(4px)" }, { transform: "none" }));
      add(one("[data-bound]"), reveal(3400, 200));
      add(one("[data-p2]"), reveal(3600, 500, { transform: "translateX(-48px)" }, { transform: "none" }));
      add(one("[data-blk]"), reveal(4150, 250));
      add(one("[data-rev]"), reveal(5200, 300, { transform: "translateY(4px)" }, { transform: "none" }));

      out.forEach((a) => {
        a.currentTime = time;
        if (!runningRef.current) a.pause();
      });
      anims.current = out;
    };

    build(0);
    // Lane layout changes with width (labels stack under 760px), so re-measure the drop and keep the cycle's place.
    let lastWidth = root.offsetWidth;
    const ro = new ResizeObserver(() => {
      if (root.offsetWidth === lastWidth) return;
      lastWidth = root.offsetWidth;
      const t = Number(anims.current[0]?.currentTime ?? 0);
      build(t);
    });
    ro.observe(root);
    return () => {
      ro.disconnect();
      anims.current.forEach((a) => a.cancel());
      anims.current = [];
    };
  }, [ref, reduced]);

  useEffect(() => {
    anims.current.forEach((a) => (running ? a.play() : a.pause()));
  }, [running, reduced]);

  return (
    <div
      ref={ref}
      data-motion
      data-lanes
      data-diagram="lanes"
      role="img"
      aria-label="Diagram: an agent proposes a measured value, an engineer confirms it, the evaluation engine applies 47 CFR 15.109(a) and blocks a second reading with no detector recorded"
      className="w-full max-w-[600px] overflow-hidden rounded-lg border border-line-3 bg-surface-2 font-sans text-[12.5px] shadow-[inset_0_1px_0_var(--hairline-white-4),0_40px_100px_-40px_rgb(0_0_0/0.8)]"
    >
      <Lane label="AGENT">
        <span className="font-mono text-[10.5px] text-fg-muted">Read lab report · proposed 1 value</span>
        <div data-slot1 className="flex min-h-[34px] items-center rounded-md border border-dashed border-line-6 px-2.5">
          <span data-slotnote className="font-mono text-[10px] tracking-[0.06em] text-fg-faint">
            SENT FOR EVALUATION ↓
          </span>
        </div>
      </Lane>

      <Lane label="ENGINE">
        <div
          data-p1
          className="relative z-2 inline-flex min-h-[34px] flex-wrap items-center gap-2 rounded-md border border-line-5 bg-surface-5 px-2.5 py-1.5"
        >
          <span className="font-mono text-[11.5px] text-fg-2">144.2 MHz · 47.7 dBµV/m · QP · 3 m</span>
          <span className="grid">
            <span data-l0 className="[grid-area:1/1] opacity-0">
              <Tag tone="inferred">INFERRED</Tag>
            </span>
            <span data-l1 className="[grid-area:1/1]">
              <Tag tone="confirmed">CONFIRMED</Tag>
            </span>
          </span>
          <span className="font-mono text-[10px] text-fg-muted">[report p.4]</span>
        </div>
        <div data-res className="flex flex-col gap-1 rounded-md border border-danger/25 bg-danger/6 px-3 py-2.5">
          <span className="text-[12.5px] text-fg-2">
            Limit 43.5 dBµV/m · Margin +4.2 dB · <span className="font-medium text-danger">Exceeds limit</span>
          </span>
          <span className="font-mono text-[10px] text-fg-muted">Rule 47 CFR 15.109(a) · version recorded · reproducible</span>
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-0 gap-y-2.5">
          <div data-p2 className="inline-flex min-h-[34px] items-center gap-2 rounded-md border border-line-5 bg-surface-5 px-2.5 py-1.5">
            <span className="text-xs text-fg-3">Rev E reading · detector not stated</span>
            <Tag tone="missing">MISSING</Tag>
          </div>
          <span data-bound className="mx-3 block h-[34px] w-0 border-l border-dashed border-fg-faint" />
          <span data-blk className="inline-flex items-center gap-1.5 text-[11.5px] text-danger">
            <Icon d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM5.6 5.6l12.8 12.8" size={12} className="stroke-danger" />
            Blocked: detector not recorded
          </span>
        </div>
      </Lane>

      <Lane label="ENGINEER" last>
        <div className="flex flex-wrap items-center gap-3">
          <span data-cbtn className="inline-flex h-7 items-center gap-1.5 rounded-sm bg-fg px-3 text-xs font-medium text-bg">
            <Icon d="M20 6 9 17l-5-5" size={12} className="stroke-bg" />
            Confirm
          </span>
          <span data-rev className="inline-flex items-center gap-1.5 text-xs text-fg-4">
            <Icon d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0" size={13} className="stroke-fg-muted" />
            Reviewed by EMC engineer
          </span>
        </div>
      </Lane>
    </div>
  );
}
