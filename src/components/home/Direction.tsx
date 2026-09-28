"use client";

import { useState, type KeyboardEvent } from "react";
import { DASH, FILL, POS, borderStyle, nodeData, type NodeId, type Rev } from "./evidenceMap";

const LEGEND: [string, string][] = [
  ["Observed", "bg-observed border-solid"],
  ["Known", "bg-known border-solid"],
  ["Inferred", "bg-inferred border-solid"],
  ["Missing", "bg-missing border-dashed"],
  ["Suggested test", "bg-white border-dotted"],
  ["Historical", "bg-historical border-dashed"],
];

const GROUPS: { label: string; ids: (rev: Rev) => NodeId[] }[] = [
  { label: "REVISION FACTS", ids: () => ["k1", "k3", "k2"] },
  { label: "EVIDENCE", ids: () => ["f1", "src", "e2"] },
  { label: "INVESTIGATION", ids: (rev) => (rev === "C" ? ["rm", "h1", "t1", "c1"] : ["h1", "t1", "c1"]) },
];

const NODE_FOCUS = "cursor-pointer outline-none focus-visible:[&>rect]:stroke-violet";

export default function Direction() {
  const [rev, setRev] = useState<Rev>("B");
  const [sel, setSel] = useState<NodeId>("f1");
  const cur: NodeId = rev === "C" || sel !== "rm" ? sel : "f1";
  const d = nodeData(cur, rev);

  const nodeProps = (id: NodeId) => {
    const n = nodeData(id, rev);
    return {
      role: "button",
      tabIndex: 0,
      "aria-pressed": id === cur,
      "aria-label": `${n.kicker}: ${n.title}${n.sub ? `, ${n.sub}` : ""}`,
      onClick: () => setSel(id),
      onKeyDown: (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setSel(id);
        }
      },
    };
  };

  const revButton = (r: Rev, label: string, sub: string, last = false) => (
    <button
      type="button"
      aria-pressed={rev === r}
      onClick={() => {
        setRev(r);
        if (r === "C") setSel("rm");
      }}
      className={`flex min-h-11 cursor-pointer flex-col items-start gap-0.5 border-0 px-4 py-2 font-sans text-[15px] font-medium text-ink ${
        last ? "" : "border-r border-r-ink"
      } ${rev === r ? "bg-lime" : "bg-transparent"}`}
    >
      <span>{label}</span>
      <span className="text-[13px] font-normal">{sub}</span>
    </button>
  );

  return (
    <section id="direction" aria-labelledby="dir-h">
      <div className="mx-auto box-content max-w-[1280px] px-gutter py-[clamp(72px,10vw,136px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[clamp(32px,6vw,96px)]">
          <h2
            id="dir-h"
            className="m-0 font-display text-[clamp(34px,4.6vw,62px)] leading-[1.02] font-medium tracking-[-0.03em] text-balance"
          >
            Engineering changes. The record should keep up.
          </h2>
          <div className="flex max-w-[36rem] flex-col gap-5 pt-2">
            <p className="m-0 text-[19px] leading-[1.65] text-pretty">
              We are building toward compliance evidence that stays current across hardware revisions and programs,
              preserving earlier decisions and bringing affected evidence back into review.
            </p>
            <p className="m-0 flex items-center gap-2.5 self-start border border-dashed border-ink px-3 py-2 font-mono text-[13px] leading-[1.4]">
              <span aria-hidden="true" className="size-2.5 flex-none border border-ink bg-lilac" />
              <span>Product direction. Not a description of current functionality.</span>
            </p>
          </div>
        </div>

        <div
          role="region"
          aria-labelledby="ex-h"
          className="mt-[clamp(56px,8vw,96px)] border border-ink bg-oat-light"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-b border-ink px-[clamp(16px,2.4vw,28px)] py-5">
            <h3 id="ex-h" className="m-0 font-display text-[22px] font-medium">
              A revision changes
            </h3>
            <div role="group" aria-label="Select revision" className="flex border border-ink">
              {revButton("B", "Rev B", "as tested")}
              {revButton("C", "Rev C", "CLK_54M changed", true)}
            </div>
          </div>

          <div className="grid grid-cols-1 min-[900px]:grid-cols-[minmax(0,2fr)_minmax(280px,1fr)]">
            <div className="border-b border-ink p-[clamp(12px,2vw,24px)] min-[900px]:border-r min-[900px]:border-b-0">
              <div className="hidden min-[900px]:block">
                <svg
                  role="group"
                  viewBox="0 0 800 400"
                  className="block h-auto w-full"
                  aria-label={`Evidence map for Rev ${rev}. Use the buttons to inspect each item.`}
                >
                  <g className="font-mono text-[12px] tracking-[0.06em]" fill="#4A5463">
                    <text x="20" y="28">REVISION FACTS</text>
                    <text x="300" y="28">EVIDENCE</text>
                    <text x="580" y="28">INVESTIGATION</text>
                  </g>
                  <g fill="none" strokeWidth="1.25" stroke="#2A3441">
                    <line x1="120" y1="180" x2="120" y2="126" />
                    <line x1="400" y1="180" x2="400" y2="126" />
                    <line x1="400" y1="256" x2="400" y2="310" />
                    <line x1="220" y1="348" x2="300" y2="348" />
                    <line x1="500" y1="88" x2="580" y2="88" />
                    <line x1="680" y1="126" x2="680" y2="180" />
                    <line x1="680" y1="256" x2="680" y2="310" strokeDasharray="3 4" />
                    <line
                      x1="220"
                      y1="88"
                      x2="300"
                      y2="88"
                      stroke={rev === "C" ? "#6E4FB0" : "#2A3441"}
                      strokeWidth={rev === "C" ? 2.5 : 1.25}
                      strokeDasharray={rev === "C" ? "6 4" : undefined}
                    />
                  </g>
                  {(Object.keys(POS) as (keyof typeof POS)[]).map((id) => {
                    const n = nodeData(id, rev);
                    const [x, y] = POS[id];
                    return (
                      <g key={id} {...nodeProps(id)} className={NODE_FOCUS}>
                        <rect
                          x={x}
                          y={y}
                          width="200"
                          height="76"
                          fill={FILL[n.state]}
                          stroke="#2A3441"
                          strokeWidth={id === cur ? 3 : 1.25}
                          strokeDasharray={DASH[n.state]}
                        />
                        <foreignObject x={x + 14} y={y + 9} width="180" height="62" className="pointer-events-none">
                          <div className="flex flex-col gap-[3px] font-sans leading-[1.2] text-ink">
                            <span className="font-mono text-[11px] whitespace-nowrap text-muted-2">{n.kicker}</span>
                            <span className="text-base font-semibold whitespace-nowrap">{n.title}</span>
                            <span className="text-[13px] whitespace-nowrap text-muted-2">{n.sub}</span>
                          </div>
                        </foreignObject>
                      </g>
                    );
                  })}
                  {rev === "C" && (
                    <g {...nodeProps("rm")} className="cursor-pointer outline-none focus-visible:[&>polygon]:stroke-violet">
                      <rect x="236" y="64" width="48" height="48" fill="transparent" />
                      <polygon
                        points="260,72 276,88 260,104 244,88"
                        fill="#BFA3E6"
                        stroke="#2A3441"
                        strokeWidth={cur === "rm" ? 3 : 1.25}
                      />
                      <text
                        x="260"
                        y="92"
                        textAnchor="middle"
                        className="font-mono text-[12px] font-medium"
                        fill="#2A3441"
                      >
                        !
                      </text>
                    </g>
                  )}
                </svg>
                <p className="mt-3 mb-0 text-sm text-muted">
                  Select any item to inspect it. Items are keyboard focusable; press Enter to select.
                </p>
              </div>

              <div className="flex flex-col gap-5 min-[900px]:hidden">
                {GROUPS.map((g) => (
                  <div key={g.label} className="flex flex-col gap-2">
                    <span className="font-mono text-xs tracking-[0.06em] text-muted">{g.label}</span>
                    {g.ids(rev).map((id) => {
                      const n = nodeData(id, rev);
                      const on = id === cur;
                      return (
                        <button
                          key={id}
                          type="button"
                          aria-pressed={on}
                          onClick={() => setSel(id)}
                          className="flex min-h-14 cursor-pointer flex-col gap-0.5 px-3.5 py-2.5 text-left font-sans text-ink"
                          style={{
                            background: FILL[n.state],
                            border: `${on ? 3 : 1}px ${borderStyle(n.state)} #2A3441`,
                          }}
                        >
                          <span className="font-mono text-[11px] text-muted-2">{n.kicker}</span>
                          <span className="text-base font-semibold">{n.title}</span>
                          {n.sub && <span className="text-sm text-muted-2">{n.sub}</span>}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div aria-live="polite" className="flex flex-col gap-4 p-[clamp(20px,2.4vw,28px)]">
              <span
                className="self-start px-2.5 py-1 font-mono text-xs tracking-[0.04em]"
                style={{ background: FILL[d.state], border: `1px ${DASH[d.state] ? "dashed" : "solid"} #2A3441` }}
              >
                {d.state === "Suggested" ? "SUGGESTED TEST" : d.state.toUpperCase()}
              </span>
              <h4 className="m-0 font-display text-2xl leading-[1.2] font-medium">{d.title}</h4>
              <p className="m-0 text-base leading-[1.6]">{d.body}</p>
              <dl className="m-0 flex flex-col border-t border-line">
                {d.meta.map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] gap-3 border-b border-line py-2.5"
                  >
                    <dt className="pt-0.5 font-mono text-xs text-muted">{k}</dt>
                    <dd className="m-0 text-[15px] leading-[1.45]">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-[22px] gap-y-2.5 border-t border-ink px-[clamp(16px,2.4vw,28px)] py-4 text-sm">
            {LEGEND.map(([label, cls]) => (
              <span key={label} className="flex items-center gap-2">
                <span aria-hidden="true" className={`size-3.5 border border-ink ${cls}`} />
                {label}
              </span>
            ))}
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="size-3 rotate-45 border border-ink bg-lilac" />
              Review marker
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
