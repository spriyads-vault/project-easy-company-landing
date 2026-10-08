import type { CSSProperties, ReactNode } from "react";
import PdfBadge from "@/components/ui/PdfBadge";
import HornCanvas from "./HornCanvas";
import MotionRegion from "./MotionRegion";
import s from "./HeroCollage.module.css";

const COLLAGE_LABEL =
  "Product illustration: the Change reviewer agent set to trace changes to Sense Hub against Rev C and Rev D evidence";

/** Inline style carrying CSS custom properties for the motion module. */
const vars = (v: Record<string, string | number>) => v as CSSProperties;

function Icon({ d, size, className }: { d: string; size: number; className?: string }) {
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
      aria-hidden="true"
      className={`flex-none ${className ?? ""}`}
    >
      <path d={d} />
    </svg>
  );
}

export const ICON_PATH = {
  change: "M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  chat: "M20 12a7.5 7.5 0 0 1-10.9 6.7L4 20l1.3-4.6A7.5 7.5 0 1 1 20 12z",
} as const;

/* ---- Pixel stairs at the band's bottom corners (design: stairs(sz)) ---- */

type Square = { x: number; y: number; band: boolean };

function stairs(): Square[] {
  const H = [5, 5, 4, 4, 4, 3, 3, 2, 2, 2, 1, 1, 0, 1];
  const L = [
    [0, 7],
    [2, 6],
    [4, 6],
    [6, 5],
    [9, 4],
    [12, 2],
    [14, 1],
  ];
  const sq: Square[] = [];
  H.forEach((h, c) => {
    for (let k = 0; k < h; k++) sq.push({ x: c, y: -(k + 1), band: false });
  });
  L.forEach(([c, k]) => sq.push({ x: c, y: -(k + 1), band: false }));
  [
    [13, 0],
    [16, 1],
    [11, 2],
  ].forEach(([c, k]) => sq.push({ x: c, y: k, band: true }));
  return sq;
}

const STAIRS = stairs();

function Stairs({ className }: { className: string }) {
  return (
    <div aria-hidden="true" className={`absolute top-[calc(100%+80px)] z-[-1] h-0 w-[360px] [--sz:12px] sm:[--sz:24px] ${className}`}>
      {STAIRS.map((q, i) => (
        <span
          key={i}
          className={`absolute size-(--sz) ${q.band ? "bg-accent-band" : "bg-bg"}`}
          style={{ left: `calc(${q.x} * var(--sz))`, top: `calc(${q.y} * var(--sz))` }}
        />
      ))}
    </div>
  );
}

/* ---- Main window ---- */

const TRIGGERS: { label: string; d: string }[] = [
  { label: "New lab report", d: "M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8zM14 3v5h5M9 13h6M9 17h6" },
  { label: "Firmware release", d: "M6 6h12v12H6zM9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" },
  { label: "On demand", d: "M7 4.5v15l12-7.5z" },
  { label: "Scheduled", d: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2" },
];

function Chip({ children }: { children: ReactNode }) {
  return <span className="rounded-xs bg-accent-soft px-[3px] text-accent-text">{children}</span>;
}

function Window() {
  return (
    <div
      className={`${s.settle} relative z-[2] mx-auto max-w-[640px] overflow-hidden rounded-lg border border-line-4 bg-surface-4 text-[13px] shadow-[inset_0_1px_0_var(--hairline-white-4),0_40px_100px_-30px_rgb(0_0_0/0.7)]`}
      style={vars({ "--i": 0 })}
    >
      <div className="flex h-12 items-center gap-2.5 border-b border-line-4 px-4">
        <span className="flex size-[22px] items-center justify-center rounded-sm bg-accent text-on-accent">
          <Icon d={ICON_PATH.change} size={12} />
        </span>
        <span className="font-medium">Change reviewer</span>
        <span className="font-mono text-[9.5px] tracking-[0.1em] text-fg-faint">EARLY ACCESS</span>
        <span className="ml-auto text-fg-muted">
          <Icon d="M5 12h.01M12 12h.01M19 12h.01" size={16} />
        </span>
      </div>
      <div className="flex flex-col gap-5 p-4 sm:px-6 sm:pt-5 sm:pb-6">
        <div className="flex flex-col gap-2.5">
          <span className="text-[12px] font-medium text-fg-6">Trigger</span>
          <div className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
            <div className="relative flex h-[72px] w-[104px] flex-none flex-col justify-between rounded-md border border-fg bg-surface-7 p-2.5 text-[11.5px] text-fg">
              <Icon d="M6 3v12M18 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM18 9a9 9 0 0 1-9 9" size={15} />
              <span>New change</span>
              <span
                className={`${s.pulse} pointer-events-none absolute -inset-1 rounded-[11px] border border-accent-text opacity-0 shadow-[0_0_0_3px_var(--color-accent-soft)]`}
              />
            </div>
            {TRIGGERS.map((t) => (
              <div
                key={t.label}
                className="flex h-[72px] w-[104px] flex-none flex-col justify-between rounded-md border border-line-4 bg-surface-6 p-2.5 text-[11.5px] text-fg-4"
              >
                <Icon d={t.d} size={15} className="text-fg-muted" />
                <span>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="text-[12px] font-medium text-fg-6">Context and instructions</span>
          <div className="rounded-md border border-line-4 bg-surface-2 px-3.5 py-3 text-[13px] leading-[1.65] text-pretty text-fg-3">
            When a change to <Chip>Sense Hub</Chip> lands, trace it to <Chip>Rev C</Chip> and <Chip>Rev D</Chip> evidence, flag
            anything at risk and post a summary to <Chip>#hw-compliance</Chip>. Ask before sending.
          </div>
          <div className="flex items-center gap-2 text-[12px] text-fg-6">
            <Icon d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6zM9 12l2 2 4-4" size={13} />
            <span>
              Results checked by Crado&apos;s evaluation engine ·{" "}
              <span className="font-mono text-[11px] text-fg-4">47 CFR 15.109(a)</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Floating cards ---- */

const CARD = "rounded-card border border-line-5 bg-surface-6 shadow-[0_12px_32px_rgb(0_0_0/0.5)]";

/**
 * Hero collage (design: the block below the hero CTAs). Server-rendered markup; motion is CSS keyed off the
 * MotionRegion's data-paused attribute. The accent band behind the hero, banner and nav lives here, as in the design.
 */
export default function HeroCollage() {
  return (
    <div className="relative mt-24 font-sans text-fg sm:mt-[136px]">
      {/* Accent band: full-bleed, extends up behind the banner and nav. */}
      <div aria-hidden="true" className="absolute top-[-3000px] bottom-[-80px] left-1/2 z-[-1] -ml-[50vw] w-screen bg-accent-band" />
      <Stairs className="left-[calc(50%-50vw)]" />
      <Stairs className="right-[calc(50%-50vw)] origin-right [transform:scaleX(-1)]" />

      <MotionRegion threshold={0} data-diagram="hero-collage" role="img" aria-label={COLLAGE_LABEL} className="relative">
        <div aria-hidden="true">
          <Window />

          {/* f1: lab report snippet */}
          <div
            className={`${s.settle} absolute top-[-74px] left-[-4px] z-[3] sm:top-[-96px] sm:left-[max(0px,calc(50%-516px))]`}
            style={vars({ "--i": 1 })}
          >
            <div className="origin-top-left [transform:rotate(-4deg)_scale(0.8)] sm:[transform:rotate(-4deg)]">
              <div className={`${s.drift} ${CARD} flex w-[212px] flex-col gap-[7px] p-[11px]`} style={vars({ "--dur": "4000ms", "--delay": "900ms" })}>
                <div className="flex items-center gap-2">
                  <PdfBadge size={18} radius={5} />
                  <span className="font-mono text-[9.5px] tracking-[0.08em] text-fg-3">RADIATED EMISSIONS · REV D</span>
                </div>
                <div className="flex items-center gap-[7px] rounded-sm bg-line-3 px-2 py-[5px] font-mono text-[10px]">
                  <span className="block size-1.5 rounded-full bg-danger-strong" />
                  FAIL · 144.2 MHz · +4.2 dB
                </div>
              </div>
            </div>
          </div>

          {/* f2: chat notification (wide only) */}
          <div
            className={`${s.settle} absolute top-[236px] left-[max(0px,calc(50%-360px))] z-[3] hidden md:block`}
            style={vars({ "--i": 2 })}
          >
            <div className="[transform:rotate(4deg)]">
              <span
                className={`${s.drift} relative flex size-12 items-center justify-center rounded-lg border border-line-5 bg-surface-6 text-fg-4 shadow-[0_12px_32px_rgb(0_0_0/0.5)]`}
                style={vars({ "--dur": "4500ms", "--delay": "-400ms" })}
              >
                <Icon d={ICON_PATH.chat} size={22} />
                <span className="absolute -top-1.5 -right-1.5 flex size-[18px] items-center justify-center rounded-full bg-danger-strong text-[10px] font-semibold text-white">
                  1
                </span>
              </span>
            </div>
          </div>

          {/* f3: lab email (wide only) */}
          <div
            className={`${s.settle} absolute top-9 right-[max(0px,calc(50%-534px))] z-[3] hidden md:block`}
            style={vars({ "--i": 3 })}
          >
            <div className="[transform:rotate(3deg)]">
              <div className={`${s.drift} flex items-start gap-2.5`} style={vars({ "--dur": "5000ms", "--delay": "-1700ms" })}>
                <span
                  className={`flex size-10 flex-none items-center justify-center rounded-card border border-line-5 bg-surface-6 text-fg-4 shadow-[0_12px_32px_rgb(0_0_0/0.5)]`}
                >
                  <Icon d={ICON_PATH.mail} size={20} />
                </span>
                <div className={`${CARD} mt-5 flex w-[184px] flex-col gap-[3px] px-[11px] py-2.5`}>
                  <span className="text-[11.5px] font-semibold">Re: Rev E samples</span>
                  <span className="text-[11px] text-fg-muted">Halden EMC Lab · 9:16 AM</span>
                </div>
              </div>
            </div>
          </div>

          {/* f4: change review summary */}
          <div
            className={`${s.settle} absolute right-[-4px] bottom-[-44px] z-[3] [--i:2] sm:right-[max(0px,calc(50%-440px))] sm:bottom-[-36px] md:[--i:4]`}
          >
            <div className="origin-bottom-right [transform:rotate(-3deg)_scale(0.8)] sm:[transform:rotate(-3deg)]">
              <div
                className={`${s.drift} ${CARD} flex w-[212px] flex-col gap-1.5 px-3 py-[11px] [--delay:-400ms] [--dur:4500ms] md:[--delay:-3000ms] md:[--dur:4000ms]`}
              >
                <div className="flex items-center gap-[7px] text-[11.5px] font-semibold">
                  <Icon d="M3 6l2 2 3-3M3 13l2 2 3-3M11 7h10M11 14h10" size={13} className="text-fg-4" />
                  Change review · Rev E
                </div>
                <div className="flex items-center gap-[7px] text-[11px] text-fg-4">
                  <span className="block size-1.5 rounded-full bg-warn" />3 items at risk
                </div>
              </div>
            </div>
          </div>

          <div className={`${s.float} absolute bottom-[-30px] left-[-6px] z-[4] sm:bottom-[-34px] sm:left-[calc(50%-366px)]`}>
            <HornCanvas className="h-14 sm:h-[84px]" />
          </div>
        </div>
      </MotionRegion>
    </div>
  );
}
