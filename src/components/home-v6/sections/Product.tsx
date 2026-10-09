import type { ReactNode } from "react";
import { CONTAINER, H3, MONO, Pill, SMALL } from "../ui";
import LegacyAnchors from "./LegacyAnchors";

/*
 * "In the product": three product views rebuilt as HTML from the design's sample values (no screenshots), each
 * marked as an example by the "Example workspace" caption. Each view is one labelled image for assistive tech.
 */

const M9 = "font-v6-mono text-[9px] leading-3 font-medium";
const M10 = "font-v6-mono text-[10px] leading-[14px] font-medium";
const TAG = `${M9} rounded-v6-button bg-v6-alt px-1.5 py-0.5 text-v6-muted`;
const STATE: Record<"KNOWN" | "OBSERVED" | "INFERRED", string> = {
  KNOWN: "bg-v6-mint",
  OBSERVED: "bg-v6-sky",
  INFERRED: "bg-v6-sun",
};

function State({ s, className = "" }: { s: keyof typeof STATE; className?: string }) {
  return <span className={`${M9} rounded-full px-2 py-0.5 text-v6-ink ${STATE[s]} ${className}`}>{s}</span>;
}

function Panel({ label, head, badge, children }: { label: string; head: string; badge: string; children: ReactNode }) {
  return (
    <div role="img" aria-label={label} className="flex h-[324px] flex-none flex-col overflow-hidden rounded-v6-card bg-v6-card font-v6-sans text-v6-ink">
      <div className="flex items-center justify-between gap-2 border-b border-v6-line px-4 py-3">
        <span className={`${M10} tracking-[.06em] text-v6-muted`}>{head}</span>
        <span className={`${M10} rounded-full border border-v6-line px-2 py-0.5`}>{badge}</span>
      </div>
      {children}
    </div>
  );
}

const EXTRACTED: { k: string; v: string; s: "KNOWN" | "OBSERVED" }[] = [
  { k: "REGULATION", v: "47 CFR 15.109(a)", s: "KNOWN" },
  { k: "SCOPE", v: "Class B, 3 m", s: "KNOWN" },
  { k: "DETECTOR", v: "Quasi-peak", s: "OBSERVED" },
  { k: "FREQUENCY", v: "144.2 MHz", s: "OBSERVED" },
];

function LabReport() {
  return (
    <Panel
      head="LAB REPORT · PDF"
      badge="Rev D"
      label="Example: values extracted from a Rev D lab report, each linked to its page and marked known or observed, with View page and Confirm actions"
    >
      <div className="px-4 pt-3 pb-1 text-[13px] leading-[18px] font-medium">Extracted values</div>
      <div className="flex flex-col px-4">
        {EXTRACTED.map((r, i) => (
          <div key={r.k} className={`grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 py-2 ${i < EXTRACTED.length - 1 ? "border-b border-v6-line" : ""}`}>
            <span className="flex flex-col">
              <span className={`${M9} tracking-[.06em] text-v6-muted`}>{r.k}</span>
              <span className="text-[12px] leading-[17px]">{r.v}</span>
            </span>
            <span className={TAG}>↗ PAGE</span>
            <State s={r.s} />
          </div>
        ))}
      </div>
      <div className="mt-auto flex justify-end gap-2 border-t border-v6-line bg-v6-page px-4 py-3">
        <span className="inline-flex h-[26px] items-center rounded-v6-button border border-v6-line-strong px-3 text-[11px] leading-none font-medium">View page</span>
        <span className="inline-flex h-[26px] items-center rounded-v6-button bg-v6-primary px-3 text-[11px] leading-none font-medium text-v6-on-primary">Confirm</span>
      </div>
    </Panel>
  );
}

function RulesEngine() {
  return (
    <Panel
      head="RULES ENGINE"
      badge="Versioned rule set"
      label="Example: the rules engine compares the measured value at 144.2 MHz with the 47 CFR 15.109(a) Class B limit; margin is measured minus limit"
    >
      <div className="flex flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1">
          {["47 CFR 15.109(a)", "CLASS B, 3 M", "QUASI-PEAK"].map((c) => (
            <span key={c} className={`${M9} rounded-full bg-v6-alt px-2 py-[3px]`}>
              {c}
            </span>
          ))}
        </div>
        <div className="flex items-baseline justify-between">
          <span className="font-v6-serif text-[22px] leading-7">144.2 MHz</span>
          <span className={`${M9} text-v6-muted`}>REV D</span>
        </div>
        <div className="relative mt-1 h-14">
          <div className="absolute top-[26px] right-0 left-0 h-1 rounded-full bg-v6-alt" />
          <div className="absolute top-[26px] left-0 h-1 w-[58%] rounded-full bg-v6-ink" />
          <div className="absolute top-[18px] left-[58%] h-5 w-0.5 bg-v6-ink" />
          <div className="absolute top-3 left-[78%] h-8 w-0.5 bg-v6-muted" />
          <div className="absolute top-11 left-[58%] h-1.5 w-[20%] border border-t-0 border-v6-muted" />
          <span className={`${M9} absolute top-0 left-[58%] -translate-x-1/2`}>MEASURED</span>
          <span className={`${M9} absolute top-0 left-[78%] -translate-x-1/2 text-v6-muted`}>LIMIT</span>
        </div>
        <div className="flex items-center justify-between gap-2 rounded-v6-button border border-v6-line bg-v6-page px-3 py-2">
          <span className="font-v6-mono text-[11px] leading-4 font-medium">Margin = measured − limit</span>
          <span className={`${M9} text-v6-muted`}>SAME INPUT, SAME RESULT</span>
        </div>
      </div>
      <div className="mt-auto flex items-center gap-2 border-t border-v6-line bg-v6-page px-4 py-3">
        <State s="OBSERVED" />
        <span className="text-[11px] leading-4 text-v6-muted">not a compliance determination</span>
      </div>
    </Panel>
  );
}

function LikelyCauses() {
  return (
    <Panel
      head="LIKELY CAUSES · 144.2 MHz"
      badge="Rev D"
      label="Example: two inferred likely causes for the Rev D finding at 144.2 MHz, each citing the lab report, and the facts still missing: test distance and detector"
    >
      <div className="flex flex-col px-4 pt-2">
        {[
          { n: "01", t: "Likely cause A", page: true },
          { n: "02", t: "Likely cause B", page: false },
        ].map((r, i) => (
          <div key={r.n} className={`grid grid-cols-[20px_minmax(0,1fr)_auto] items-start gap-2 py-2 ${i === 0 ? "border-b border-v6-line" : ""}`}>
            <span className="font-v6-mono text-[10px] leading-[18px] font-medium text-v6-muted">{r.n}</span>
            <span className="flex flex-col gap-1">
              <span className="text-[12px] leading-[18px] font-medium">{r.t}</span>
              <span className="flex flex-wrap gap-1">
                <span className={TAG}>EVIDENCE · LAB REPORT</span>
                {r.page && <span className={TAG}>↗ PAGE</span>}
              </span>
            </span>
            <State s="INFERRED" className="mt-[3px]" />
          </div>
        ))}
      </div>
      <div className="mx-4 mt-1 mb-4 flex flex-col gap-2 rounded-v6-button bg-v6-lilac p-3">
        <span className={`${M9} tracking-[.06em]`}>MISSING · STILL NEEDED</span>
        {["Test distance", "Detector"].map((f) => (
          <span key={f} className="flex items-center gap-2 text-[12px] leading-4">
            <span className="h-2.5 w-2.5 rounded-[2px] border border-v6-ink" />
            {f}
          </span>
        ))}
      </div>
    </Panel>
  );
}

const CARDS = [
  {
    view: <LabReport />,
    title: "Confirm what was read.",
    body: "Every value Crado reads from a report shows its page. Nothing counts as known until you confirm it.",
    box: "border-v6-sun bg-v6-sun hover:border-v6-ink",
  },
  {
    view: <RulesEngine />,
    title: "Numbers from rules, not prose.",
    body: "Margin is measured minus limit, from a versioned rule set.",
    box: "border-v6-lilac bg-v6-lilac hover:border-v6-ink",
  },
  {
    view: <LikelyCauses />,
    title: "See what is still missing.",
    body: "Each likely cause lists the evidence for it and the facts it still needs.",
    box: "border-v6-rust bg-v6-rust text-v6-on-primary hover:border-v6-on-dark v6t:col-[1/-1] v6d:col-auto",
    dark: true,
  },
];

export default function Product() {
  return (
    <section id="product" data-screen-label="In the product" className="relative py-(--v6-section)">
      <LegacyAnchors section="product" />
      <div className={`${CONTAINER} flex flex-col gap-10`}>
        <Pill tone="mint">In the product</Pill>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-6 v6t:grid-cols-2 v6d:grid-cols-3">
            {CARDS.map((c) => (
              <div
                key={c.title}
                data-band={c.dark ? "dark" : undefined}
                className={`flex flex-col gap-7 rounded-v6-card border px-6 pt-6 pb-8 transition-colors duration-150 ease-v6-ui ${c.box}`}
              >
                {c.view}
                <div className="flex flex-col gap-2">
                  <h3 className={`${H3} text-balance`}>{c.title}</h3>
                  <p className={`m-0 ${SMALL} text-pretty`}>{c.body}</p>
                </div>
              </div>
            ))}
          </div>
          <div className={`${MONO} text-v6-muted`}>Example workspace</div>
        </div>
      </div>
    </section>
  );
}
