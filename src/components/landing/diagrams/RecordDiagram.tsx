"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import PdfBadge from "@/components/ui/PdfBadge";
import { useMotion } from "@/hooks/useMotion";

const LABEL = "Diagram: emails, Slack messages, tickets and lab reports filed into Case 0042 for Sense Hub Rev D";
const TRIP_MS = 2400;
const GAP_MS = 600;

type IconKind = "mail" | "chat" | "ticket" | "pdf";

interface Source {
  label: string;
  icon: IconKind;
  count: number;
  unit: string;
  left: number;
  top: number;
  /** Curve from the chip into the case card (design coordinates). */
  d: string;
  /** Timeline row highlighted when this source's dot lands; -1 = none. */
  row: number;
}

const SOURCES: Source[] = [
  { label: "Gmail", icon: "mail", count: 12, unit: " threads", left: 17, top: 70, d: "M95 110 C95 220 410 136 410 236", row: 0 },
  { label: "Outlook", icon: "mail", count: 4, unit: " threads", left: 187, top: 24, d: "M265 64 C265 174 454 136 454 236", row: 0 },
  { label: "Slack", icon: "chat", count: 31, unit: " messages", left: 357, top: 0, d: "M435 40 C435 150 498 136 498 236", row: 1 },
  { label: "Microsoft Teams", icon: "chat", count: 6, unit: " messages", left: 527, top: 0, d: "M605 40 C605 150 542 136 542 236", row: 1 },
  { label: "Jira", icon: "ticket", count: 3, unit: " tickets", left: 697, top: 24, d: "M775 64 C775 174 586 136 586 236", row: -1 },
  { label: "PDF reports", icon: "pdf", count: 14, unit: "", left: 867, top: 70, d: "M945 110 C945 220 630 136 630 236", row: 2 },
];

const TIMELINE: { icon: IconKind; text: string; date: string }[] = [
  { icon: "mail", text: "Halden EMC Lab · Rev E samples", date: "12 SEP" },
  { icon: "chat", text: "#hw-compliance · regulator decision", date: "3 SEP" },
  { icon: "pdf", text: "Rev D radiated emissions report", date: "9 SEP" },
];

/** Neutral line icons in place of third-party favicons. */
function SourceIcon({ kind, size }: { kind: IconKind; size: number }) {
  if (kind === "pdf") {
    return (
      <PdfBadge size={size} />
    );
  }
  const paths: Record<Exclude<IconKind, "pdf">, ReactNode> = {
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3.5 6.5 8.5 6.5 8.5-6.5" />
      </>
    ),
    chat: <path d="M4 5h16v11H10l-5 4v-4H4z" />,
    ticket: <path d="M4 6.5 5.5 8 8 5.5M4 12.5 5.5 14 8 11.5M4 18.5 5.5 20 8 17.5M11 7h9M11 13h9M11 19h9" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="relative block flex-none text-fg-4"
      aria-hidden="true"
    >
      {paths[kind]}
    </svg>
  );
}

function Chip({ source, count, className = "", style }: { source: Source; count: number; className?: string; style?: CSSProperties }) {
  return (
    <div
      style={style}
      className={`flex h-10 items-center gap-2 rounded-card border border-line-3 bg-surface-2 px-2.5 text-[12px] whitespace-nowrap text-fg-2 ${className}`}
    >
      <SourceIcon kind={source.icon} size={16} />
      <span className="truncate">{source.label}</span>
      <span className="ml-auto rounded-[5px] bg-white/7 px-1.5 py-px text-[10.5px] text-fg-4">
        <span data-cnt>{count}</span>
        {source.unit}
      </span>
    </div>
  );
}

function CaseCard({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-1 rounded-lg border border-line-6 bg-surface-4 p-3 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.8)] ${className}`}>
      <div className="flex items-center gap-2 px-1 pt-0.5 pb-2">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="flex-none text-fg-4" aria-hidden="true">
          <path d="M3 13h5l2 3h4l2-3h5M5 5h14l2 8v6H3v-6z" />
        </svg>
        <span className="text-[12.5px] font-semibold">Case 0042</span>
        <span className="text-[12px] text-fg-6">· Sense Hub Rev D</span>
      </div>
      {TIMELINE.map((t, i) => (
        <div key={t.text} data-tl={i} className="relative flex h-10 items-center gap-2.5 rounded-[7px] px-2.5 text-[12px] text-fg-3">
          <span data-hl className="absolute inset-0 block rounded-[7px] bg-white/7 opacity-0 shadow-[inset_0_0_0_1px_var(--color-line-7)]" />
          <SourceIcon kind={t.icon} size={14} />
          <span className="relative min-w-0 flex-1 truncate">{t.text}</span>
          <span className="relative font-mono text-[10.5px] whitespace-nowrap text-fg-muted">{t.date}</span>
        </div>
      ))}
    </div>
  );
}

export default function RecordDiagram() {
  // Observe the wide diagram only: it is display:none below 1100px, so the loop never runs there (the design's narrow version is static).
  const { ref, reduced, running } = useMotion<HTMLDivElement>({ threshold: 0.3 });
  const [counts, setCounts] = useState(() => SOURCES.map((s) => s.count));
  const runningRef = useRef(running);
  const ctl = useRef<{ resume: () => void; pause: () => void } | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    const dots = [...root.querySelectorAll<SVGPathElement>("[data-dot]")];
    const rows = [...root.querySelectorAll<HTMLElement>("[data-tl]")];
    let i = 0;
    let anim: Animation | null = null;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const trip = () => {
      timer = undefined;
      if (!runningRef.current) return;
      const k = i++ % dots.length;
      // A zero-length round-capped dash is the dot; dashoffset carries it along the curve.
      anim = dots[k].animate(
        [
          { strokeDashoffset: 0, opacity: 0 },
          { opacity: 1, offset: 0.1 },
          { opacity: 1, offset: 0.9 },
          { strokeDashoffset: -1, opacity: 0 },
        ],
        { duration: TRIP_MS, easing: "ease-in-out" },
      );
      anim.onfinish = () => {
        anim = null;
        const hl = rows[SOURCES[k].row]?.querySelector("[data-hl]");
        hl?.animate([{ opacity: 0 }, { opacity: 1, offset: 0.3 }, { opacity: 0 }], { duration: 400, easing: "ease-in-out" });
        setCounts((c) => c.map((n, j) => (j === k ? n + 1 : n)));
        timer = setTimeout(trip, GAP_MS);
      };
    };

    ctl.current = {
      resume: () => {
        if (anim) anim.play();
        else if (timer === undefined) trip();
      },
      pause: () => {
        anim?.pause();
        if (timer !== undefined) {
          clearTimeout(timer);
          timer = undefined;
        }
      },
    };
    if (runningRef.current) ctl.current.resume();

    return () => {
      ctl.current = null;
      clearTimeout(timer);
      if (anim) {
        anim.onfinish = null;
        anim.cancel();
      }
    };
  }, [ref, reduced]);

  useEffect(() => {
    runningRef.current = running;
    if (running) ctl.current?.resume();
    else ctl.current?.pause();
  }, [running]);

  return (
    <div data-diagram="record" className="mt-12 font-sans">
      {/* Wide (≥1100px) */}
      <div ref={ref} data-motion role="img" aria-label={LABEL} data-record className="relative mx-auto hidden h-[420px] w-[1040px] lg:block">
        <svg width="1040" height="420" className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
          {SOURCES.map((s) => (
            <path key={s.label} d={s.d} fill="none" className="stroke-line-6" strokeWidth={1} />
          ))}
        </svg>
        {SOURCES.map((s, i) => (
          <Chip key={s.label} source={s} count={counts[i]} className="absolute w-[156px]" style={{ left: s.left, top: s.top }} />
        ))}
        <CaseCard className="absolute top-[236px] left-[370px] w-[300px]" />
        <svg width="1040" height="420" className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden="true">
          {SOURCES.map((s, i) => (
            <path
              key={s.label}
              data-dot={i}
              d={s.d}
              fill="none"
              pathLength={1}
              strokeDasharray="0 2"
              strokeLinecap="round"
              strokeWidth={4}
              opacity={0}
              className="stroke-accent-text drop-shadow-[0_0_4px_var(--color-accent)]"
            />
          ))}
        </svg>
      </div>

      {/* Narrow (<1100px): static, as in the design */}
      <div className="mx-auto flex max-w-[420px] flex-col lg:hidden">
        <div className="grid grid-cols-2 gap-2">
          {SOURCES.map((s) => (
            <Chip key={s.label} source={s} count={s.count} />
          ))}
        </div>
        <div className="flex flex-col items-center py-1.5" aria-hidden="true">
          <span className="block h-5 w-px bg-line-7" />
          <svg width="9" height="6" viewBox="0 0 9 6">
            <path d="M.5 .5 4.5 5 8.5 .5" fill="none" className="stroke-line-7" />
          </svg>
        </div>
        <CaseCard />
      </div>
    </div>
  );
}
