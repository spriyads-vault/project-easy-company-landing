import type { ReactNode } from "react";
import { STATUS_TONE, statusOf, type CapabilityId, type StatusTone } from "@/content/capability-status";

/** 1200px content column with the 40 / 32 / 20 gutters. */
export const CONTAINER = "mx-auto w-full max-w-[calc(var(--container-v6)+2*var(--v6-gutter))] px-(--v6-gutter)";

/** Mono 500 12/16, as the design sets notes, captions and numbers. */
export const MONO = "font-v6-mono text-[12px] leading-4 font-medium";
/** Mono label with 0.06em tracking (tags, eyebrows, column heads). */
export const LABEL = `${MONO} tracking-[.06em]`;

export const H2 = "m-0 font-v6-serif text-[length:var(--v6-h2)] leading-(--v6-h2-lh) font-normal tracking-[-.02em] text-balance";
export const H3 = "m-0 font-v6-serif text-[length:var(--v6-h3)] leading-(--v6-h3-lh) font-normal";
export const INTRO = "m-0 font-v6-sans text-[length:var(--v6-intro)] leading-(--v6-intro-lh) text-pretty";
export const SMALL = "font-v6-sans text-[14px] leading-[21px]";

const BUTTON_BASE =
  "inline-flex h-11 items-center rounded-v6-button px-5 font-v6-sans text-[15px] leading-none font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-150 ease-v6-ui active:translate-y-px";

/** Filled primary, white text (design: Primary button states). */
export const BUTTON_PRIMARY = `${BUTTON_BASE} bg-v6-primary text-v6-on-primary hover:bg-v6-primary-hover hover:text-v6-on-primary`;
/** Hairline outline that darkens to Ink on hover. */
export const BUTTON_SECONDARY = `${BUTTON_BASE} border border-v6-line-strong text-v6-ink hover:border-v6-ink hover:text-v6-ink`;
/** Outline on a dark band; fills on hover. */
export const BUTTON_ON_DARK = `${BUTTON_BASE} border border-v6-on-dark text-v6-on-dark hover:bg-v6-on-dark hover:text-v6-rust`;

export type Tone = "sky" | "mint" | "sun" | "lilac";

const TONE_BG: Record<Tone, string> = {
  sky: "bg-v6-sky",
  mint: "bg-v6-mint",
  sun: "bg-v6-sun",
  lilac: "bg-v6-lilac",
};

interface PillProps {
  tone: Tone;
  children: ReactNode;
  /** Section tags are uppercase; evidence tags are already uppercase text. */
  className?: string;
}

/** Rounded tag on a bright colour; text is always Ink. */
export function Pill({ tone, children, className = "" }: PillProps) {
  return <span className={`${LABEL} self-start rounded-full px-3 py-1 text-v6-ink uppercase ${TONE_BG[tone]} ${className}`}>{children}</span>;
}

const STATUS_CLASS: Record<StatusTone, string> = {
  mint: "bg-v6-mint text-v6-ink",
  sun: "bg-v6-sun text-v6-ink",
  grey: "bg-v6-tag-grey text-v6-muted",
};

interface StatusTagProps {
  capability: CapabilityId;
}

/** The status of one capability, read from src/content/capability-status.ts. */
export function StatusTag({ capability }: StatusTagProps) {
  const status = statusOf(capability);
  return (
    <span data-status={status} className={`${LABEL} inline-block rounded-full px-3 py-1 whitespace-nowrap ${STATUS_CLASS[STATUS_TONE[status]]}`}>
      {status}
    </span>
  );
}
