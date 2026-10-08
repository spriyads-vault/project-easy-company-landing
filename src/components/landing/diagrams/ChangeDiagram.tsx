"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { useMotion } from "@/hooks/useMotion";

const LABEL = "Diagram: engineering change ECO-214 traced to five evidence items; four are flagged at risk and one still holds";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const PERIOD = 9000;
const RESET_AT = 8600;

interface Change {
  name: string;
  detail: string;
}

interface EvidenceRow {
  label: string;
  /** Index of the change that flips this row to "At risk"; -1 = still valid. */
  flip: number;
}

const CHANGES: Change[] = [
  { name: "Buck regulator", detail: "1.2 → 2.1 MHz" },
  { name: "USB cable", detail: "shielded → unshielded" },
  { name: "fw 3.4", detail: "power table +1 dB" },
  { name: "Clock trace", detail: "rerouted on L2" },
];

const EVIDENCE: EvidenceRow[] = [
  { label: "Radiated 30–230 MHz", flip: 0 },
  { label: "Conducted, DC input", flip: 0 },
  { label: "Radiated 230 MHz–1 GHz", flip: 1 },
  { label: "Radio output power", flip: 2 },
  { label: "ESD immunity", flip: -1 },
];

const LINES: { from: number; d: string }[] = [
  { from: 0, d: "M240 70 C285 70 285 68 330 68" },
  { from: 0, d: "M240 70 C285 70 285 116 330 116" },
  { from: 1, d: "M240 122 C285 122 285 164 330 164" },
  { from: 2, d: "M240 174 C285 174 285 212 330 212" },
  { from: 3, d: "M240 226 C285 226 285 68 330 68" },
];

function PanelHeader({ title, meta }: { title: string; meta: string }) {
  return (
    <div className="flex h-10 items-center gap-2 border-b border-line-3 px-3.5">
      <span className="text-[12.5px] font-semibold">{title}</span>
      <span className="ml-auto font-mono text-[10px] tracking-[0.1em] text-fg-faint">{meta}</span>
    </div>
  );
}

function ChangeRow({ change, index, className, style }: { change: Change; index: number; className: string; style?: CSSProperties }) {
  return (
    <div data-cd={index} style={style} className={`flex h-11 flex-col justify-center gap-0.5 rounded-[7px] bg-surface-4 px-2.5 ${className}`}>
      <span className="text-[12px] font-medium text-fg-2">{change.name}</span>
      <span className="font-mono text-[10.5px] text-fg-6">{change.detail}</span>
      <span data-cu className="absolute right-2.5 bottom-1 left-2.5 block h-px origin-left bg-accent-text" />
    </div>
  );
}

function Status({ flip }: { flip: number }) {
  const atRisk = flip >= 0;
  return (
    <span className="grid flex-none justify-items-end">
      <span data-s0 className={`flex items-center gap-1.5 text-[11px] text-fg-6 [grid-area:1/1] ${atRisk ? "opacity-0" : ""}`}>
        <span className="block size-1.5 rounded-full bg-fg-faint" />
        Still valid
      </span>
      {atRisk && (
        <span data-s1 className="flex items-center gap-1.5 text-[11px] text-warn-2 [grid-area:1/1]">
          <span className="block size-1.5 rounded-full bg-warn" />
          At risk
        </span>
      )}
    </span>
  );
}

interface EvidenceItemProps {
  row: EvidenceRow;
  index: number;
  last: boolean;
  className?: string;
  style?: CSSProperties;
}

function EvidenceItem({ row, index, last, className = "", style }: EvidenceItemProps) {
  return (
    <div
      style={style}
      data-ev={index}
      data-flip={row.flip}
      className={`flex h-10 items-center justify-between gap-2 px-2.5 text-[12px] text-fg-3 ${last ? "" : "border-b border-surface-7"} ${className}`}
    >
      <span className="whitespace-nowrap">{row.label}</span>
      <Status flip={row.flip} />
    </div>
  );
}

function Pill({ className }: { className: string }) {
  return (
    <div
      data-cpill
      className={`inline-flex h-[30px] items-center gap-2 rounded-full bg-accent-soft px-3 text-[12px] font-medium whitespace-nowrap text-accent-text ${className}`}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="flex-none" aria-hidden="true">
        <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
      </svg>
      Suggested check · near-field scan at 144 MHz
    </div>
  );
}

/** One 9 s cycle of the design's buildChange(): underline each change, draw its curves, flip the rows it puts at risk, show the check, then reset. */
function buildCycle(root: HTMLElement): Animation[] {
  const q = <E extends Element>(s: string) => [...root.querySelectorAll<E>(s)];
  const A = (el: Element, kf: Keyframe[], o: KeyframeAnimationOptions) => el.animate(kf, { easing: EASE, fill: "both", ...o });
  const out: Animation[] = [];
  const rows = q<HTMLElement>("[data-cd]");
  const lines = q<SVGPathElement>("[data-cl]");
  const evs = q<HTMLElement>("[data-ev]");
  const pills = q<HTMLElement>("[data-cpill]");

  rows.forEach((r) => {
    const k = Number(r.dataset.cd);
    const t = 300 + k * 1500;
    const u = r.querySelector("[data-cu]");
    if (u) out.push(A(u, [{ transform: "scaleX(0)" }, { transform: "scaleX(1)" }], { duration: 300, delay: t }));
  });
  CHANGES.forEach((_, k) => {
    const t = 300 + k * 1500;
    lines
      .filter((l) => Number(l.dataset.from) === k)
      .forEach((l) => out.push(A(l, [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }], { duration: 400, delay: t + 300, easing: "ease-in-out" })));
    evs
      .filter((e) => Number(e.dataset.flip) === k)
      .forEach((e) => {
        const s0 = e.querySelector("[data-s0]");
        const s1 = e.querySelector("[data-s1]");
        if (s0) out.push(A(s0, [{ opacity: 1 }, { opacity: 0 }], { duration: 180, delay: t + 700, easing: "ease-in-out" }));
        if (s1) out.push(A(s1, [{ opacity: 0 }, { opacity: 1 }], { duration: 180, delay: t + 700, easing: "ease-in-out" }));
      });
  });
  pills.forEach((p) => out.push(A(p, [{ opacity: 0, transform: "translateY(4px)" }, { opacity: 1, transform: "none" }], { duration: 300, delay: 6300 })));

  const fade = (el: Element | null, a: number, b: number) => {
    if (el) out.push(A(el, [{ opacity: a }, { opacity: b }], { duration: 400, delay: RESET_AT, easing: "ease-in-out", fill: "forwards" }));
  };
  q("[data-cu]").forEach((el) => fade(el, 1, 0));
  lines.forEach((el) => fade(el, 1, 0));
  pills.forEach((el) => fade(el, 1, 0));
  evs
    .filter((e) => Number(e.dataset.flip) >= 0)
    .forEach((e) => {
      fade(e.querySelector("[data-s0]"), 0, 1);
      fade(e.querySelector("[data-s1]"), 1, 0);
    });
  return out;
}

export default function ChangeDiagram() {
  const { ref, reduced, running } = useMotion<HTMLDivElement>({ threshold: 0.3 });
  const runningRef = useRef(running);
  const ctl = useRef<{ play: () => void; pause: () => void } | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    let anims: Animation[] = [];
    let clock: Animation | null = null;

    const build = () => {
      anims.forEach((a) => a.cancel());
      anims = buildCycle(root);
      // Empty-keyframe clock: pauses and resumes with the cycle, then starts the next one.
      clock = root.animate(null, { duration: PERIOD });
      clock.onfinish = () => {
        build();
        if (runningRef.current) play();
      };
      if (!runningRef.current) pause();
    };
    const play = () => {
      anims.forEach((a) => a.play());
      clock?.play();
    };
    const pause = () => {
      anims.forEach((a) => a.pause());
      clock?.pause();
    };

    build();
    ctl.current = { play, pause };
    return () => {
      ctl.current = null;
      if (clock) {
        clock.onfinish = null;
        clock.cancel();
      }
      anims.forEach((a) => a.cancel());
    };
  }, [ref, reduced]);

  useEffect(() => {
    runningRef.current = running;
    if (running) ctl.current?.play();
    else ctl.current?.pause();
  }, [running]);

  return (
    <div ref={ref} data-motion data-diagram="change" className="flex min-w-0 justify-center">
      {/* Wide (≥1100px) */}
      <div role="img" aria-label={LABEL} data-change className="relative hidden h-[340px] w-[580px] font-sans lg:block">
        <div className="absolute top-0 left-0 h-[268px] w-[240px] rounded-card border border-line-3 bg-surface-2">
          <PanelHeader title="ECO-214" meta="4 CHANGES" />
        </div>
        <div className="absolute top-0 left-[330px] h-[290px] w-[250px] rounded-card border border-line-3 bg-surface-2">
          <PanelHeader title="Evidence · Rev D" meta="5 RESULTS" />
        </div>
        <svg width="580" height="340" className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
          {LINES.map((l, i) => (
            <path
              key={i}
              data-cl
              data-from={l.from}
              d={l.d}
              fill="none"
              pathLength={1}
              strokeDasharray={1}
              className="stroke-accent-text"
              strokeOpacity={0.7}
              strokeWidth={1}
            />
          ))}
        </svg>
        {CHANGES.map((c, i) => (
          <ChangeRow key={c.name} change={c} index={i} className="absolute left-2 w-[224px]" style={{ top: 48 + i * 52 }} />
        ))}
        {EVIDENCE.map((r, i) => (
          <EvidenceItem
            key={r.label}
            row={r}
            index={i}
            last={i === EVIDENCE.length - 1}
            className="absolute left-[338px] w-[234px]"
            style={{ top: 48 + i * 48 }}
          />
        ))}
        <Pill className="absolute top-[308px] left-[330px]" />
      </div>

      {/* Narrow (<1100px) */}
      <div role="img" aria-label={LABEL} data-change className="flex flex-col font-sans lg:hidden">
        <div className="rounded-card border border-line-3 bg-surface-2 pb-2">
          <PanelHeader title="ECO-214" meta="4 CHANGES" />
          <div className="flex flex-col gap-2 px-2 pt-2">
            {CHANGES.map((c, i) => (
              <ChangeRow key={c.name} change={c} index={i} className="relative" />
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center py-1.5" aria-hidden="true">
          <span className="block h-5 w-px bg-line-7" />
          <svg width="9" height="6" viewBox="0 0 9 6">
            <path d="M.5 .5 4.5 5 8.5 .5" fill="none" className="stroke-line-7" />
          </svg>
        </div>
        <div className="rounded-card border border-line-3 bg-surface-2">
          <PanelHeader title="Evidence · Rev D" meta="5 RESULTS" />
          <div className="pb-1">
            {EVIDENCE.map((r, i) => (
              <EvidenceItem key={r.label} row={r} index={i} last={i === EVIDENCE.length - 1} />
            ))}
          </div>
        </div>
        <Pill className="mt-3 self-start" />
      </div>
    </div>
  );
}
