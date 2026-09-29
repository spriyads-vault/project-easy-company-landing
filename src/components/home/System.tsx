"use client";

import { useState, type ReactNode } from "react";

type BlockId = "rev" | "req" | "evi" | "dec";

const MONO = "font-mono";

const BLOCKS: {
  id: BlockId;
  n: string;
  name: string;
  line: string;
  detail: string;
  side: "left" | "right";
  area: string;
  bg: string;
  art: ReactNode;
}[] = [
  {
    id: "rev",
    n: "01",
    name: "Revision",
    line: "Which version was tested?",
    detail: "Rev B, as tested with the recorded cable set.",
    side: "left",
    area: "[grid-area:rev]",
    bg: "bg-sky",
    art: (
      <svg viewBox="0 0 240 120" aria-hidden="true" className="block h-auto w-full max-w-[280px]">
        <rect x="52" y="20" width="160" height="56" fill="#6D85AD" stroke="#2A3441" />
        <rect x="36" y="36" width="160" height="56" fill="#9AB0D3" stroke="#2A3441" />
        <rect x="20" y="52" width="160" height="56" fill="#F4F2EC" stroke="#2A3441" />
        <rect x="64" y="6" width="24" height="14" fill="#F4F2EC" stroke="#2A3441" />
        <text x="72" y="17" className={`${MONO} text-[10px]`} fill="#2A3441">A</text>
        <rect x="104" y="22" width="24" height="14" fill="#2A3441" stroke="#2A3441" />
        <text x="112" y="33" className={`${MONO} text-[10px]`} fill="#F4F2EC">B</text>
        <rect x="144" y="38" width="24" height="14" fill="#F4F2EC" stroke="#2A3441" />
        <text x="152" y="49" className={`${MONO} text-[10px]`} fill="#2A3441">C</text>
        <polyline points="34,72 80,72 92,84 150,84" fill="none" stroke="#2A3441" strokeWidth="1.25" />
        <polyline points="34,96 118,96" fill="none" stroke="#2A3441" strokeWidth="1.25" />
        <rect x="128" y="62" width="22" height="14" fill="#CDDDF2" stroke="#2A3441" />
      </svg>
    ),
  },
  {
    id: "req",
    n: "02",
    name: "Requirement",
    line: "Which requirement is being evaluated?",
    detail: "47 CFR 15.109(a), Class B, applied because of the product’s stated class.",
    side: "right",
    area: "[grid-area:req]",
    bg: "bg-butter",
    art: (
      <svg viewBox="0 0 240 120" aria-hidden="true" className="block h-auto w-full max-w-[280px]">
        <rect x="30" y="6" width="150" height="108" fill="#F4F2EC" stroke="#2A3441" />
        <rect x="30" y="6" width="150" height="20" fill="#2A3441" />
        <text x="40" y="20" className={`${MONO} text-[11px]`} fill="#F4F2EC">15.109(a)</text>
        <rect x="38" y="46" width="134" height="40" fill="#F6E39E" stroke="#2A3441" strokeDasharray="3 3" />
        <rect x="44" y="38" width="110" height="3" fill="#7C8594" />
        <rect x="44" y="52" width="120" height="3" fill="#2A3441" />
        <rect x="44" y="64" width="96" height="3" fill="#2A3441" />
        <rect x="44" y="76" width="108" height="3" fill="#2A3441" />
        <rect x="44" y="96" width="90" height="3" fill="#7C8594" />
        <polyline points="188,46 196,46 196,86 188,86" fill="none" stroke="#2A3441" strokeWidth="2" />
        <text x="202" y="70" className={`${MONO} text-[10px]`} fill="#2A3441">SCOPE</text>
      </svg>
    ),
  },
  {
    id: "evi",
    n: "03",
    name: "Evidence",
    line: "What was measured, and where is the source?",
    detail: "216.8 MHz, quasi-peak, 3 m, from table 4.2 of the test report.",
    side: "left",
    area: "[grid-area:evi]",
    bg: "bg-slate",
    art: (
      <svg viewBox="0 0 250 120" aria-hidden="true" className="block h-auto w-full max-w-[280px]">
        <rect x="12" y="8" width="130" height="104" fill="#FFFFFF" stroke="#2A3441" />
        <text x="22" y="26" className={`${MONO} text-[10px]`} fill="#2A3441">TABLE 4.2</text>
        <rect x="22" y="38" width="100" height="3" fill="#7C8594" />
        <rect x="22" y="48" width="84" height="3" fill="#7C8594" />
        <rect x="18" y="58" width="118" height="16" fill="#CDDDF2" stroke="#2A3441" />
        <rect x="24" y="64" width="80" height="3" fill="#2A3441" />
        <rect x="22" y="84" width="96" height="3" fill="#7C8594" />
        <rect x="22" y="94" width="70" height="3" fill="#7C8594" />
        <line x1="136" y1="66" x2="164" y2="66" stroke="#2A3441" strokeWidth="1.5" />
        <circle cx="136" cy="66" r="3" fill="#2A3441" />
        <rect x="164" y="53" width="80" height="26" fill="#2A3441" />
        <text x="172" y="70" className={`${MONO} text-[11px]`} fill="#F4F2EC">216.8 MHz</text>
      </svg>
    ),
  },
  {
    id: "dec",
    n: "04",
    name: "Decision",
    line: "What was concluded, and what needs to happen next?",
    detail: "Near-field scan along the clock net, awaiting engineering review.",
    side: "right",
    area: "[grid-area:dec]",
    bg: "bg-lilac",
    art: (
      <svg viewBox="0 0 240 120" aria-hidden="true" className="block h-auto w-full max-w-[280px]">
        <rect x="16" y="8" width="150" height="104" fill="#F4F2EC" stroke="#2A3441" />
        <text x="26" y="26" className={`${MONO} text-[10px]`} fill="#2A3441">NEXT TEST</text>
        <rect x="26" y="38" width="10" height="10" fill="none" stroke="#2A3441" />
        <rect x="44" y="41" width="100" height="3" fill="#2A3441" />
        <rect x="26" y="60" width="10" height="10" fill="none" stroke="#2A3441" />
        <rect x="44" y="63" width="84" height="3" fill="#7C8594" />
        <rect x="26" y="82" width="10" height="10" fill="none" stroke="#2A3441" />
        <rect x="44" y="85" width="92" height="3" fill="#7C8594" />
        <line x1="150" y1="42" x2="186" y2="42" stroke="#2A3441" strokeDasharray="2 3" />
        <polygon points="198,30 210,42 198,54 186,42" fill="#2A3441" />
        <text x="176" y="74" className={`${MONO} text-[10px]`} fill="#2A3441">REVIEW</text>
      </svg>
    ),
  },
];

// Connector from each block toward the finding: 50px across the wide gap, 30px to the left rail when stacked.
const STUB = {
  left: "left-[-30px] w-[30px] min-[900px]:left-auto min-[900px]:right-[-50px] min-[900px]:w-[50px]",
  right: "left-[-30px] w-[30px] min-[900px]:left-[-50px] min-[900px]:w-[50px]",
};

export default function System() {
  const [sel, setSel] = useState<BlockId>("rev");
  const selName = BLOCKS.find((b) => b.id === sel)!.name;

  return (
    <section id="system" aria-labelledby="system-h" className="bg-oat">
      <div className="mx-auto box-content max-w-[1280px] px-gutter py-[clamp(80px,11vw,144px)]">
        <div className="mb-[clamp(40px,6vw,64px)] flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <h2
            id="system-h"
            className="m-0 font-display text-[clamp(34px,4.6vw,62px)] leading-[1.02] font-medium tracking-[-0.03em]"
          >
            Know what each finding belongs to.
          </h2>
          <p className="m-0 font-mono text-[13px] text-muted">Select a block</p>
        </div>

        <div className="relative grid grid-cols-1 gap-y-7 pl-7 [grid-template-areas:'fin'_'rev'_'req'_'evi'_'dec'] min-[900px]:grid-cols-[minmax(0,1fr)_minmax(240px,0.8fr)_minmax(0,1fr)] min-[900px]:gap-x-12 min-[900px]:pl-0 min-[900px]:[grid-template-areas:'rev_fin_req'_'evi_fin_dec']">
          <span aria-hidden="true" className="absolute top-0 bottom-0 left-0 w-[3px] bg-ink min-[900px]:hidden" />

          <div className="box-content flex min-h-[200px] flex-col justify-center gap-2.5 border-[1.5px] border-ink bg-ink px-6 py-7 text-oat shadow-[8px_8px_0_#6D85AD] [grid-area:fin]">
            <span className="font-mono text-xs tracking-[0.08em] text-fog">FINDING</span>
            <span className="font-display text-[30px] leading-[1.1] font-medium">Emission above limit</span>
            <span className="font-mono text-[13px] text-fog">Rev B · 216.8 MHz</span>
            <span aria-hidden="true" className="my-2.5 h-px bg-night-line" />
            <span className="text-sm text-fog">Tracing to</span>
            <span aria-live="polite" className="flex items-center gap-2.5 text-lg font-medium">
              <span aria-hidden="true" className="size-3 flex-none bg-lime" />
              {selName}
            </span>
          </div>

          {BLOCKS.map((b) => {
            const on = b.id === sel;
            const head = (
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-display text-[28px] font-medium tracking-[-0.01em]">{b.name}</span>
                <span className="font-mono text-xs">{b.n}</span>
              </span>
            );
            const body = (
              <>
                {head}
                {b.art}
                <span className="text-[17px] leading-[1.5]">{b.line}</span>
                {on && (
                  <span className="block border-t border-ink pt-3 text-[15px] leading-[1.5]">{b.detail}</span>
                )}
              </>
            );
            return (
              <button
                key={b.id}
                type="button"
                aria-pressed={on}
                onClick={() => setSel(b.id)}
                className={`relative flex cursor-pointer flex-col gap-3.5 border-[1.5px] border-ink text-left font-sans text-ink transition-[box-shadow,transform] duration-150 ${b.area} ${b.bg} ${
                  b.id === "evi" ? "p-3" : "p-6"
                } ${on ? "-translate-x-0.5 -translate-y-0.5 shadow-[8px_8px_0_#2A3441]" : "shadow-[4px_4px_0_#2A3441]"}`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute top-1/2 -translate-y-1/2 bg-ink transition-[height] duration-150 ${STUB[b.side]} ${
                    on ? "h-1" : "h-[1.5px]"
                  }`}
                />
                {b.id === "evi" ? (
                  <span className="flex flex-col gap-3.5 border border-ink bg-oat p-5">{body}</span>
                ) : (
                  body
                )}
              </button>
            );
          })}
        </div>

        <p className="mt-[clamp(40px,5vw,56px)] mb-0 font-display text-[clamp(22px,2.2vw,28px)] leading-[1.3] tracking-[-0.01em]">
          Follow the connections from a finding back to its source and forward to the next reviewed step.
        </p>
      </div>
    </section>
  );
}
