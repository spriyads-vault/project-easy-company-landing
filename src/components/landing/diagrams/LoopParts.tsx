import type { CSSProperties, ReactNode } from "react";

/** Shared, static pieces of the failure-investigation loop, used by the wide diagram and the narrow stack. */

export interface LoopStep {
  label: string;
  icon: string;
}

export const LOOP_STEPS: LoopStep[] = [
  { label: "Change review", icon: "M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7" },
  { label: "Targeted check", icon: "M3 6l2 2 3-3M3 13l2 2 3-3M11 7h10M11 14h10" },
  { label: "Investigation", icon: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.3-4.3" },
  { label: "Evidence updated", icon: "M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2" },
];

const CAUSES = ["Buck regulator harmonics", "Unshielded USB cable", "Clock trace near seam"];

interface LoopNodeProps {
  index: number;
  className?: string;
  style?: CSSProperties;
}

export function LoopNode({ index, className, style }: LoopNodeProps) {
  const step = LOOP_STEPS[index];
  return (
    <div
      data-ln={index}
      style={style}
      className={`flex h-11 items-center gap-[9px] rounded-card border border-line-4 bg-surface-2 px-3.5 text-[12.5px] font-medium whitespace-nowrap text-fg-2 ${className ?? ""}`}
    >
      <span data-nb className="pointer-events-none absolute -inset-px block rounded-card border border-accent-text opacity-0" />
      <Icon d={step.icon} size={14} className="stroke-fg-6" />
      <span>{step.label}</span>
    </div>
  );
}

export function ApprovalPill() {
  return (
    <span className="inline-flex h-6 items-center gap-1.5 rounded-sm border border-warn/35 bg-warn-ink px-[9px] text-[11px] font-medium whitespace-nowrap text-warn-2">
      <Icon d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" size={12} className="stroke-warn-2" />
      Approval required
    </span>
  );
}

export function EngineChip({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <span
      style={style}
      className={`inline-flex h-[22px] items-center gap-1.5 rounded-[5px] border border-line-4 bg-white/6 px-2 font-mono text-[9.5px] tracking-[0.06em] whitespace-nowrap text-fg-4 ${className ?? ""}`}
    >
      EVALUATED BY ENGINE
    </span>
  );
}

export function RankCard({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <div
      data-rank
      style={style}
      className={`flex flex-col gap-2 rounded-card border border-line-4 bg-surface-3 px-3 py-2.5 ${className ?? ""}`}
    >
      <span className="font-mono text-[10px] tracking-[0.1em] text-fg-faint">LIKELY CAUSES · RANKED</span>
      {CAUSES.map((cause, i) => (
        <div key={cause} className="flex items-center gap-2 text-[11.5px] text-fg-3">
          <span className="font-mono text-[10px] text-fg-faint">{i + 1}</span>
          <span className="flex-1 whitespace-nowrap">{cause}</span>
          <Tag tone="inferred">INFERRED</Tag>
        </div>
      ))}
    </div>
  );
}

const TAG_TONES = {
  inferred: "text-warn border-warn/50",
  confirmed: "text-ok border-ok/50",
  missing: "text-fg-muted border-fg-muted/50",
} as const;

/** Mono provenance tag: INFERRED, CONFIRMED, MISSING. */
export function Tag({ tone, children }: { tone: keyof typeof TAG_TONES; children: ReactNode }) {
  return (
    <span
      className={`inline-flex h-[18px] flex-none items-center rounded-xs border px-[5px] font-mono text-[9.5px] tracking-[0.06em] ${TAG_TONES[tone]}`}
    >
      {children}
    </span>
  );
}

/** 24-unit line icon drawn at the design's 1.6 stroke. */
export function Icon({ d, size, className }: { d: string; size: number; className?: string }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`flex-none ${className ?? ""}`}
    >
      <path d={d} />
    </svg>
  );
}
