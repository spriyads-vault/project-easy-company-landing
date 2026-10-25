import type { CSSProperties, ReactNode } from "react";
import { STATE_GLYPH, type EvidenceState } from "@/content/home-v8";

/** Shared v8 class lists (design: Crado_Landing_v8). Tokens live in src/styles/design-system.css (v8-*). */
export const MONO = "font-v8-mono tabular-nums tracking-normal";
export const H2 = "m-0 text-[clamp(30px,2.9vw,42px)] leading-[1.04] font-normal tracking-[-0.01em] text-balance";
export const LEAD = "m-0 text-[18px] leading-[29px] text-pretty text-v8-muted";
export const SECTION = "px-6 pt-[clamp(96px,11vw,160px)]";
export const CARD = "rounded-v8-card border border-v8-line bg-v8-card";
export const PILL_LIGHT =
  "inline-flex items-center gap-2 rounded-full bg-v8-button font-medium whitespace-nowrap text-v8-page transition-[background-color,transform] duration-200 ease-v8-ui hover:bg-v8-white hover:text-v8-page active:scale-[0.98]";
export const PILL_GHOST =
  "inline-flex items-center rounded-full font-medium whitespace-nowrap text-v8-white shadow-[0_0_0_1px_var(--color-v8-ring-button)] transition-[background-color,transform] duration-200 ease-v8-ui hover:bg-white/4 hover:text-v8-white active:scale-[0.98]";

const GLYPH_COLOR: Record<EvidenceState, string> = {
  observed: "text-v8-ink",
  known: "text-v8-known",
  inferred: "text-v8-inferred",
  missing: "text-v8-missing",
};

/** One evidence-state glyph (● ✓ ≈ ○) in its colour. */
export function Glyph({ state, className = "" }: { state: EvidenceState; className?: string }) {
  return <span className={`flex-none ${GLYPH_COLOR[state]} ${className}`}>{STATE_GLYPH[state]}</span>;
}

export type AnimKind =
  | "draw-r"
  | "draw-l"
  | "draw-d"
  | "draw-u"
  | "fade"
  | "pulse"
  | "rise"
  | "rise-up"
  | "ring"
  | "hl"
  | "skel"
  | "shimmer"
  | "trace";

/**
 * Props for one timed element inside a [data-anim-root]: kind, delay and duration in ms (design: data-a, data-t,
 * data-d). The keyframes are in src/home/v8/v8.css; they only run when motion is allowed and the root scrolls in.
 */
export function anim(kind: AnimKind, t: number, d: number, style?: CSSProperties) {
  return { "data-a": kind, style: { ...style, "--t": `${t}ms`, "--d": `${d}ms` } as CSSProperties };
}

/** Mono chip with an optional evidence glyph (design: the 12px chips in the diagram and the sample case). */
export function Chip({
  state,
  children,
  nowrap = false,
  className = "",
  ...rest
}: {
  state?: EvidenceState;
  children: ReactNode;
  nowrap?: boolean;
  className?: string;
  "data-a"?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      {...rest}
      className={`flex min-w-0 items-start gap-2 rounded-v8-chip border border-v8-line bg-v8-chip px-[9px] py-[5px] text-left ${MONO} text-[12px] leading-[18px] text-v8-ink [overflow-wrap:anywhere] ${nowrap ? "whitespace-nowrap" : ""} ${className}`}
    >
      {state && <Glyph state={state} />}
      <span>{children}</span>
    </span>
  );
}

/** Small arrow icons drawn inline (the design's Material Symbols "south", "north_east", "expand_more", "check_circle", "error"). */
export function Icon({ name, size = 20, className = "" }: { name: "south" | "north_east" | "expand_more" | "check_circle" | "error"; size?: number; className?: string }) {
  const paths: Record<typeof name, ReactNode> = {
    south: <path d="M12 4v15M6 13l6 6 6-6" />,
    north_east: <path d="M7 17 17 7M8 7h9v9" />,
    expand_more: <path d="m6 9 6 6 6-6" />,
    check_circle: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12.5 2.8 2.8L16.5 9.5" />
      </>
    ),
    error: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7.5v5.5M12 16.2v.1" />
      </>
    ),
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`flex-none ${className}`}>
      {paths[name]}
    </svg>
  );
}
