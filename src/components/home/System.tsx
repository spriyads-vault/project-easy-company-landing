"use client";

import { useState, type ComponentType } from "react";
import { BoardIcon, DecisionIcon, ReportIcon, RuleIcon } from "./art";

type CardId = "rev" | "evi" | "req" | "dec";

const CARDS: {
  id: CardId;
  kicker: string;
  title: string;
  more: string;
  Icon: ComponentType<{ className?: string }>;
  area: string;
  /** Which side the connector to the finding leaves from, on wide screens. */
  stub: "right" | "left";
}[] = [
  { id: "rev", kicker: "Hardware tested", title: "Rev B", more: "The configuration the test describes.", Icon: BoardIcon, area: "[grid-area:rev]", stub: "right" },
  { id: "req", kicker: "Applicable rule", title: "Emissions limit", more: "47 CFR 15.109(a), Class B.", Icon: RuleIcon, area: "[grid-area:req]", stub: "left" },
  { id: "evi", kicker: "Original source", title: "Test report", more: "216.8 MHz, quasi-peak, 3 m. Table 4.2.", Icon: ReportIcon, area: "[grid-area:evi]", stub: "right" },
  {
    id: "dec",
    kicker: "Engineering decision",
    title: "Next test proposed",
    more: "Near-field scan along the clock net. Awaiting engineering review.",
    Icon: DecisionIcon,
    area: "[grid-area:dec]",
    stub: "left",
  },
];

const GRID =
  "grid grid-cols-1 items-stretch gap-x-4 gap-y-4 [grid-template-areas:'fin'_'rev'_'req'_'evi'_'dec'] min-[640px]:grid-cols-2 min-[640px]:[grid-template-areas:'fin_fin'_'rev_req'_'evi_dec'] min-[1080px]:grid-cols-[minmax(0,1fr)_minmax(240px,0.72fr)_minmax(0,1fr)] min-[1080px]:gap-x-14 min-[1080px]:[grid-template-areas:'rev_fin_req'_'evi_fin_dec']";

export default function System() {
  const [hovered, setHovered] = useState<CardId | null>(null);
  const [selected, setSelected] = useState<CardId | null>(null);
  const active = hovered ?? selected;

  return (
    <section id="system" aria-labelledby="system-h" className="bg-oat">
      <div className="mx-auto box-content max-w-[1280px] px-gutter py-[clamp(64px,8vw,112px)]">
        <h2
          id="system-h"
          className="m-0 mb-[clamp(32px,4.5vw,56px)] font-display text-[clamp(34px,4.6vw,62px)] leading-[1.04] font-medium tracking-[-0.025em]"
        >
          Every finding needs context.
        </h2>
        <div className={`relative ${GRID}`}>
          <div className="relative z-[1] box-border flex flex-col justify-center gap-3 self-center rounded-xl bg-navy p-7 text-oat shadow-[0_1px_2px_rgba(31,39,50,0.2),0_20px_40px_-28px_rgba(31,39,50,0.55)] [grid-area:fin] min-[1080px]:min-h-[200px]">
            <span className="flex items-center gap-2.5 font-mono text-xs tracking-[0.1em] text-fog">
              <span aria-hidden="true" className="size-2 flex-none rotate-45 bg-butter" />
              FINDING
            </span>
            <span className="font-display text-[clamp(26px,2.4vw,32px)] leading-[1.1] font-medium tracking-[-0.015em]">
              Emission above limit
            </span>
            <span className="self-start rounded border border-oat/30 px-[9px] py-[3px] font-mono text-[13px]">Rev B</span>
          </div>

          {CARDS.map(({ id, kicker, title, more, Icon, area, stub }) => {
            const on = active === id;
            return (
              <button
                key={id}
                type="button"
                aria-expanded={on}
                onClick={() => setSelected((s) => (s === id ? null : id))}
                onMouseEnter={() => setHovered(id)}
                onMouseLeave={() => setHovered((h) => (h === id ? null : h))}
                onFocus={() => setHovered(id)}
                onBlur={() => setHovered((h) => (h === id ? null : h))}
                className={`relative box-border flex min-h-[104px] cursor-pointer items-center gap-4 rounded-[10px] border bg-oat-light py-3.5 pr-[18px] pl-3.5 text-left font-sans text-navy transition-[border-color,box-shadow] duration-150 ${area} ${
                  on
                    ? "border-navy shadow-[0_1px_2px_rgba(31,39,50,0.06),0_14px_28px_-20px_rgba(31,39,50,0.4)]"
                    : "border-ink/15 shadow-[0_1px_2px_rgba(31,39,50,0.04)]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-1/2 hidden w-[57px] -translate-y-1/2 transition-colors duration-150 min-[1080px]:block ${
                    stub === "right" ? "-right-[57px]" : "-left-[57px]"
                  } ${on ? "h-0.5 bg-navy" : "h-px bg-[#9AA3B0]"}`}
                />
                <Icon className="block h-[60px] w-20 flex-none" />
                <span className="flex min-w-0 flex-col gap-[3px]">
                  <span className="text-[13px] leading-[1.3] text-muted">{kicker}</span>
                  <span className="text-lg leading-[1.3] font-semibold tracking-[-0.005em]">{title}</span>
                  <span
                    className={`overflow-hidden text-sm leading-[1.45] text-[#3A4556] transition-opacity duration-150 ${
                      on ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {more}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-[clamp(28px,3.5vw,40px)] mb-0 text-[17px] leading-[1.5] text-[#3A4556]">
          Keep the hardware, rule, source and decision connected.
        </p>
      </div>
    </section>
  );
}
