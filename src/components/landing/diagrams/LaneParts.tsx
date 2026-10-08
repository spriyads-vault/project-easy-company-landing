import type { ReactNode } from "react";

/** Shared static pieces of the lanes diagram: provenance tags and line icons. */

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
