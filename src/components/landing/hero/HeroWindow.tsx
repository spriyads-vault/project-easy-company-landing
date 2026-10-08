import type { CSSProperties, ReactNode } from "react";
import MotionRegion from "../diagrams/MotionRegion";
import s from "./Hero.module.css";

const SPARK = "M12 3C12.8 8.5 15.5 11.2 21 12C15.5 12.8 12.8 15.5 12 21C11.2 15.5 8.5 12.8 3 12C8.5 11.2 11.2 8.5 12 3Z";

/**
 * Pixel stairs where the hero band meets the page (design: stairs()). Each square is [column, row]; rows count up
 * from the band's bottom edge, so dark squares bite into the band and blue ones drop below it.
 * The square size is --stair (12px below 760px, 24px above).
 */
const STAIR_HEIGHTS = [5, 5, 4, 4, 4, 3, 3, 2, 2, 2, 1, 1, 0, 1];
const STAIR_LOOSE: [number, number][] = [[0, 7], [2, 6], [4, 6], [6, 5], [9, 4], [12, 2], [14, 1]];
const STAIRS: { c: number; k: number; band: boolean }[] = [
  ...STAIR_HEIGHTS.flatMap((h, c) => Array.from({ length: h }, (_, k) => ({ c, k, band: false }))),
  ...STAIR_LOOSE.map(([c, k]) => ({ c, k, band: false })),
  ...[[13, 0], [16, 1], [11, 2]].map(([c, k]) => ({ c, k: -k - 1, band: true })),
];

function Stairs({ side }: { side: "left" | "right" }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute top-[calc(100%-var(--band-cut))] z-[-1] h-0 w-[360px] ${
        side === "left" ? "left-[calc(50%-50vw)]" : "right-[calc(50%-50vw)] origin-right -scale-x-100"
      }`}
    >
      {STAIRS.map(({ c, k, band }, i) => (
        <span
          key={i}
          className={`absolute block size-(--stair) ${band ? "bg-hero-band" : "bg-bg"}`}
          style={{ left: `calc(${c} * var(--stair))`, top: `calc(${-(k + 1)} * var(--stair))` }}
        />
      ))}
    </div>
  );
}

function Spark({ size, className }: { size: number; className: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d={SPARK} />
    </svg>
  );
}

function Line({ d, size = 16, className = "stroke-fg-muted" }: { d: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={`flex-none ${className}`}>
      <path d={d} />
    </svg>
  );
}

const CHIP = "inline-flex h-5 flex-none items-center rounded-xs px-1.5 font-mono whitespace-nowrap";

function Cause({ n, title, page, i }: { n: number; title: string; page: string; i: number }) {
  return (
    <div className={`${s.stream} flex flex-wrap items-center gap-2 rounded-md border border-surface-7 bg-surface-2b px-3 py-[9px]`} style={{ "--i": i } as CSSProperties}>
      <span className="font-mono text-[11px] text-fg-faint">{n}</span>
      <span className="min-w-[120px] flex-1 text-[13px] text-fg-2">{title}</span>
      <span className={`${CHIP} border border-warn/50 text-[10px] tracking-[.06em] text-warn`}>INFERRED</span>
      <span className={`${CHIP} border border-line-4 bg-line-1 text-[10.5px] text-fg-4`}>{page}</span>
    </div>
  );
}

interface FileCardProps {
  i: number;
  tile: ReactNode;
  title: string;
  meta: string;
  /** Desktop position inside the 264×190 card stack. */
  place: string;
  z: number;
}

function FileCard({ i, tile, title, meta, place, z }: FileCardProps) {
  return (
    <div
      className={`${s.drift} relative flex items-center gap-3 rounded-lg border border-line-5 bg-surface-4 p-2.5 text-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.05),0_18px_40px_-8px_rgb(0_0_0/0.55)] sm:absolute sm:w-[236px] sm:p-3 ${place}`}
      style={{ "--dur": `${[4000, 4500][i]}ms`, "--delay": `${900 - i * 1300}ms`, zIndex: z } as CSSProperties}
    >
      <span className="flex size-9 flex-none items-center justify-center rounded-[9px] border border-line-3 bg-surface-0b sm:size-11">{tile}</span>
      <span className="flex min-w-0 flex-col gap-0.5">
        <span className="truncate text-[14px] font-medium">{title}</span>
        <span className="text-[12px] text-fg-muted">{meta}</span>
      </span>
    </div>
  );
}

function PdfGlyph() {
  // Original artwork from the design; gradient stops are illustration colours.
  return (
    <svg width="26" height="32" viewBox="0 0 26 32" aria-hidden="true" className="block flex-none overflow-visible">
      <defs>
        <linearGradient id="pdf-sh" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FF8A96" />
          <stop offset=".55" stopColor="#F0525F" />
          <stop offset="1" stopColor="#C9303D" />
        </linearGradient>
      </defs>
      <path d="M5 4h12l7 7v19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" className="fill-black" opacity=".35" transform="translate(1.5 1.5)" />
      <path d="M4 1h12l7 7v19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z" fill="url(#pdf-sh)" />
      <path d="M16 1v5a2 2 0 0 0 2 2h5z" fill="#FFC2C8" />
      <path d="M3 2.5h12" className="stroke-white" strokeOpacity=".45" strokeWidth="1" />
      <rect x="6" y="15" width="11" height="2" rx="1" className="fill-white" opacity=".9" />
      <rect x="6" y="19.5" width="8" height="2" rx="1" className="fill-white" opacity=".7" />
    </svg>
  );
}

/**
 * The hero product window (Case 0042 thread) with the floating report and case cards, the band edge and its
 * pixel stairs. Fixed heights (460px, 500px below 760px) so nothing shifts while it animates.
 */
export default function HeroWindow() {
  return (
    <MotionRegion
      threshold={0}
      data-diagram="hero-window"
      className="relative mt-12 [--band-cut:160px] [--stair:12px] [container-type:inline-size] sm:mt-[72px] sm:[--band-cut:200px] sm:[--stair:24px]"
    >
      {/* The band runs from above the page top (behind the banner and nav) to --band-cut above the window's foot. */}
      <div aria-hidden="true" className="absolute top-[-3000px] bottom-(--band-cut) left-1/2 z-[-1] -ml-[50vw] w-screen bg-hero-band" />
      <Stairs side="left" />
      <Stairs side="right" />

      <div
        role="img"
        aria-label="Product illustration: Case 0042, a thread where Crado drafts a finding for the Rev D radiated-emissions failure"
        className={`${s.settle} relative z-[2] flex h-[500px] w-full max-w-[860px] flex-col overflow-hidden rounded-lg border border-line-3 bg-surface-1b font-sans text-[13px] text-fg shadow-[inset_0_1px_0_rgb(255_255_255/0.04),0_40px_100px_-30px_rgb(0_0_0/0.6)] sm:h-[460px]`}
        style={{ "--i": 0 } as CSSProperties}
      >
        <div className="flex h-11 flex-none items-center gap-3 border-b border-line-3 px-3.5">
          <Line d="M4 7h16M4 12h16M4 17h10" />
          <Spark size={14} className="flex-none fill-fg-4" />
          <span className="min-w-0 truncate text-[13px] font-medium">Case 0042 · Rev D radiated emissions</span>
          <span className="ml-auto flex gap-3.5">
            <Line d="M12 3v12M8 7l4-4 4 4M5 13v6h14v-6" />
            <Line d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
          </span>
        </div>
        <div className="flex min-h-0 flex-1">
          <div className="hidden w-[200px] flex-none flex-col gap-1 border-r border-surface-7 p-3 sm:flex">
            <span className="flex h-8 items-center gap-2 rounded-md border border-line-4 px-2.5 text-[13px] text-fg-2">
              <Line d="M12 5v14M5 12h14" size={14} className="stroke-fg-4" />
              New case
            </span>
            <span className="mt-3.5 mb-1 px-2 text-[11.5px] text-fg-faint">Today</span>
            <span className="flex h-[30px] items-center rounded-sm bg-surface-6 px-2 text-[13px] text-fg">Case 0042</span>
            <span className="mt-3.5 mb-1 px-2 text-[11.5px] text-fg-faint">Past 30 days</span>
            <span className="flex h-[30px] items-center px-2">
              <span className="block h-2 w-[72%] rounded-xs bg-surface-7" />
            </span>
            <span className="flex h-[30px] items-center px-2">
              <span className="block h-2 w-[52%] rounded-xs bg-surface-7" />
            </span>
          </div>
          {/* Right padding clears the floating cards: 28px + the cards' overlap (design: threadPad). */}
          <div className="flex min-w-0 flex-1 flex-col gap-[18px] px-4 py-[18px] [mask-image:linear-gradient(to_bottom,black_58%,transparent_97%)] sm:py-6 sm:pr-[calc(28px+max(0px,252px-max(0px,100cqw-860px)))] sm:pl-7">
            <div className="flex max-w-[min(440px,88%)] flex-col items-end gap-2 self-end rounded-[12px_12px_4px_12px] border border-line-4 bg-surface-6 px-3.5 py-[11px]">
              <span className="text-[13.5px] leading-[1.5] text-fg">Rev D failed radiated emissions at the lab, can you look?</span>
              <span className="inline-flex h-[26px] items-center gap-[7px] rounded-sm bg-line-3 pr-[9px] pl-1.5 text-[12px] text-fg-3">
                <span aria-hidden="true" className="flex size-4 flex-none items-center justify-center rounded-xs bg-danger-strong font-mono text-[5.5px] text-white before:content-['PDF']" />
                Rev D report.pdf
              </span>
            </div>
            <div className="flex items-start gap-3">
              <span className="flex size-6 flex-none items-center justify-center rounded-sm bg-hero-band">
                <Spark size={12} className="fill-white" />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                <div className={`${s.stream} flex min-h-6 flex-wrap items-center gap-1.5 text-[13px] text-fg-6`} style={{ "--i": 0 } as CSSProperties}>
                  <span className="font-medium text-fg">Finding</span>
                  <span>·</span>
                  <span>Sensor hub Rev D</span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1.5 text-warn">
                    <span className="block size-1.5 rounded-full bg-warn" />
                    Draft, awaiting engineer review
                  </span>
                </div>
                <div
                  className={`${s.stream} flex items-center gap-2.5 rounded-md border border-line-3 bg-surface-4 px-3 py-2.5 font-mono text-[12px] leading-[1.5] text-fg-2`}
                  style={{ "--i": 1 } as CSSProperties}
                >
                  <span className="block size-1.5 flex-none rounded-full bg-danger-strong" />
                  <span className="min-w-0">144.2 MHz · 47.7 dBµV/m · limit 43.5 · margin +4.2 dB · 47 CFR 15.109(a)</span>
                </div>
                <Cause n={1} title="Buck regulator harmonics" page="report p.4" i={2} />
                <Cause n={2} title="Unshielded USB cable" page="report p.6" i={3} />
                <div className={`${s.stream} flex items-center gap-2.5 px-0.5 pt-0.5 text-[13px] text-fg-muted`} style={{ "--i": 4 } as CSSProperties}>
                  <span className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className={`${s.wdot} block size-[5px] rounded-full bg-fg-4`} style={{ "--i": i } as CSSProperties} />
                    ))}
                  </span>
                  Reading report, page 4
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className={`${s.settle} relative z-[3] mt-3 grid grid-cols-2 gap-3 font-sans sm:absolute sm:top-16 sm:-right-3 sm:mt-0 sm:block sm:h-[190px] sm:w-[264px]`}
        style={{ "--i": 1 } as CSSProperties}
      >
        <FileCard i={0} tile={<PdfGlyph />} title="Rev D report" meta="PDF · 6m ago" place="sm:top-0 sm:left-0" z={2} />
        <FileCard
          i={1}
          tile={<Spark size={18} className="fill-fg-4" />}
          title="Case 0042"
          meta="Likely causes · 30m ago"
          place="sm:top-[88px] sm:left-7"
          z={1}
        />
      </div>
    </MotionRegion>
  );
}
