import type { ReactNode } from "react";

const SPECS: { param: string; value: ReactNode }[] = [
  { param: "target_standard", value: "FCC Part 15 Subpart B" },
  {
    param: "logic_framework",
    value: <span className="bg-ink px-1 text-paper">Deterministic Neuro-Symbolic</span>,
  },
  { param: "traceability_mode", value: "Direct Source Citation" },
  {
    param: "history_model",
    value: (
      <>
        <span className="bg-mint px-1 text-ink">Workspace-Isolated</span> Revision Graphs
      </>
    ),
  },
];

const STATS = [
  { value: "3x", label: "Faster compliance cycle times." },
  { value: "0%", label: "Probabilistic hallucination rate." },
];

export default function Specifications() {
  return (
    <section
      id="specifications"
      aria-labelledby="specs-title"
      className="relative flex scroll-mt-32 w-full flex-col items-center overflow-hidden border-t border-ink bg-night px-8 py-32"
    >
      <div aria-hidden="true" className="dot-halo pointer-events-none absolute top-1/2 -left-20 size-[600px] -translate-y-1/2" />
      <div aria-hidden="true" className="dot-halo pointer-events-none absolute top-1/2 -right-20 size-[600px] -translate-y-1/2" />

      <div className="relative z-10 mx-auto flex w-full max-w-[896px] flex-col items-center">
        <h2
          id="specs-title"
          className="m-0 mb-4 inline-block border border-steel bg-ink px-2 py-1 font-mono text-xs leading-4 font-normal text-paper"
        >
          Crado.Core_Specs
        </h2>
        <div
          role="table"
          aria-label="Crado system specifications"
          className="w-full border border-ink bg-paper font-mono text-[13px] leading-5 text-ink"
        >
          <div
            role="row"
            className="grid grid-cols-2 border-b border-ink bg-ink tracking-[-0.025em] text-paper uppercase"
          >
            <span role="columnheader" className="border-r border-steel p-3">
              System_Parameter
            </span>
            <span role="columnheader" className="p-3">
              Evaluation_Output
            </span>
          </div>
          {SPECS.map(({ param, value }, i) => {
            const bg = i % 2 === 0 ? "bg-paper" : "bg-white";
            const last = i === SPECS.length - 1;
            return (
              <div role="row" key={param} className={`grid grid-cols-2 ${last ? "" : "border-b border-ink"}`}>
                <span role="rowheader" className={`border-r border-ink p-3 ${bg}`}>
                  {param}
                </span>
                <span role="cell" className={`p-3 ${bg}`}>
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative z-10 mt-16 flex flex-wrap items-center justify-center gap-x-[clamp(64px,10vw,128px)] gap-y-16 text-center">
        {STATS.map(({ value, label }) => (
          <div key={value}>
            <div className="font-display text-[clamp(96px,11vw,128px)] leading-none font-bold tracking-[-0.05em] text-paper">
              {value}
            </div>
            <div className="mt-3 text-lg leading-7 text-fog">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
