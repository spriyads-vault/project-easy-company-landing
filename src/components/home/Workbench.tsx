"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";
import PlayToggle from "./PlayToggle";

const TABS = ["Report", "Investigation", "Test plan", "Retest record"];
const TITLES = [
  "Confirm the reported finding",
  "Connect facts to a candidate explanation",
  "Propose the next test",
  "Prepare a revision-specific comparison",
];

const DT = "font-mono text-xs tracking-[0.06em] text-fog";
const TD = "border-b border-[#D6D3CA] p-2";
const CARD_SHADOW = "shadow-[0_1px_2px_rgba(0,0,0,0.25),0_28px_56px_-32px_rgba(0,0,0,0.7)]";

function ReportStage() {
  return (
    <div className="grid grid-cols-1 items-start gap-x-10 gap-y-8 min-[1000px]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div className="flex min-w-0 flex-col gap-3.5 rounded-lg bg-oat-light p-7 text-ink shadow-[0_0_0_1px_#2A3441,0_28px_56px_-28px_rgba(0,0,0,0.75)]">
        <div className="flex justify-between gap-3 font-mono text-xs">
          <span>TEST REPORT · REV B · p. 4</span>
          <span className="rounded border border-dashed border-ink/50 px-2 py-0.5">SAMPLE DATA</span>
        </div>
        <span className="text-[19px] font-semibold">4.2 Radiated emissions</span>
        <span className="font-mono text-xs text-muted">Quasi-peak · 3 m</span>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse font-mono text-[15px]">
            <thead>
              <tr className="text-left">
                {["MHz", "dBµV/m", "Pol", "As reported"].map((h) => (
                  <th key={h} scope="col" className="border-b border-ink/50 p-2 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={TD}>144.3</td>
                <td className={TD}>38.2</td>
                <td className={TD}>V</td>
                <td className={TD}>Within limit</td>
              </tr>
              <tr className="bg-butter outline -outline-offset-1 outline-ink/45">
                <td className="p-2 font-semibold">216.8</td>
                <td className="p-2 font-semibold">47.0</td>
                <td className="p-2">H</td>
                <td className="p-2 font-semibold">Above limit</td>
              </tr>
              <tr>
                <td className={TD}>288.5</td>
                <td className={TD}>40.7</td>
                <td className={TD}>V</td>
                <td className={TD}>Within limit</td>
              </tr>
            </tbody>
          </table>
        </div>
        <span className="flex items-center gap-2 self-start rounded bg-ink px-3 py-1.5 font-mono text-[13px] text-oat">
          SOURCE · Table 4.2, page 4
        </span>
      </div>
      <dl className="m-0 flex flex-col gap-7">
        <div>
          <dt className={`flex items-center gap-2.5 ${DT}`}>
            <span aria-hidden="true" className="size-3 rounded-[2px] bg-butter" />
            HIGHLIGHTED FINDING
          </dt>
          <dd className="mt-2.5 ml-0">
            <span className="block font-mono text-[clamp(34px,3.4vw,46px)] leading-[1.02] font-medium tracking-[-0.02em] text-butter">
              216.8 MHz
            </span>
            <span className="mt-2 block font-mono text-[15px] text-fog-light">47.0 dBµV/m · H · quasi-peak · 3 m</span>
            <span className="mt-2.5 block text-[17px] leading-[1.5]">Reported above the limit on Rev B.</span>
          </dd>
        </div>
        <div>
          <dt className={DT}>SOURCE REFERENCE</dt>
          <dd className="mt-2 ml-0 text-[17px] leading-[1.5]">Table 4.2, page 4 of the report.</dd>
        </div>
        <div>
          <dt className={DT}>BEFORE USE</dt>
          <dd className="mt-2 ml-0 flex flex-col items-start gap-2.5 text-[17px] leading-[1.5]">
            <span>An engineer confirms each extracted value against the source.</span>
            <span className="rounded border border-dashed border-butter px-2.5 py-[3px] font-mono text-xs tracking-[0.06em] text-butter">
              TO CONFIRM
            </span>
          </dd>
        </div>
      </dl>
    </div>
  );
}

const FACTS: { tone: string; kicker: string; title: string; detail?: string; source: string }[] = [
  { tone: "bg-known", kicker: "KNOWN · REV B", title: "CLK_54M routing", detail: "38 mm, unterminated", source: "Source: layout record" },
  { tone: "bg-known", kicker: "KNOWN", title: "Oscillator Y1", detail: "54.2 MHz", source: "Source: component datasheet" },
  { tone: "bg-observed", kicker: "OBSERVED · REV B", title: "216.8 MHz above limit", source: "Source: report, table 4.2" },
];

function InvestigationStage() {
  return (
    <div className="grid grid-cols-1 items-center min-[820px]:grid-cols-[minmax(0,1fr)_56px_minmax(0,1.1fr)]">
      <div className="flex flex-col gap-3.5">
        {FACTS.map((f) => (
          <div
            key={f.title}
            className={`relative flex flex-col gap-1 rounded-md border border-ink/20 px-4 py-3.5 text-ink ${f.tone}`}
          >
            <span className="font-mono text-xs">{f.kicker}</span>
            <span className="text-[17px] font-semibold">{f.title}</span>
            {f.detail && <span className="text-[15px]">{f.detail}</span>}
            <span className="font-mono text-xs text-muted-2">{f.source}</span>
            <span
              aria-hidden="true"
              className="absolute top-1/2 -right-[30px] hidden h-0.5 w-7 bg-fog min-[820px]:block"
            />
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="relative min-h-10 self-stretch min-[820px]:min-h-0">
        <span className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-fog min-[820px]:top-[16%] min-[820px]:bottom-[16%] min-[820px]:left-7" />
        <span className="absolute top-1/2 right-0 left-7 hidden h-0.5 bg-fog min-[820px]:block" />
      </div>
      <div className={`flex flex-col gap-3 rounded-lg border border-ink/20 bg-inferred p-6 text-ink ${CARD_SHADOW}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs">INFERRED · CANDIDATE EXPLANATION</span>
          <span className="rounded bg-ink px-2.5 py-1 font-mono text-xs tracking-[0.06em] text-oat">UNCONFIRMED</span>
        </div>
        <span className="text-[21px] leading-[1.25] font-semibold">Fourth harmonic of the Y1 clock</span>
        <span className="text-base leading-[1.55]">
          216.8 MHz is four times 54.2 MHz, and the clock net is unterminated. This is a candidate to test, not a
          confirmed cause.
        </span>
      </div>
    </div>
  );
}

const PLAN: [string, string][] = [
  ["OBJECTIVE", "Find out whether CLK_54M is the source of the emission at 216.8 MHz."],
  ["RATIONALE", "The frequency matches the fourth harmonic of Y1. This is an inferred link."],
  ["METHOD", "Near-field probe scan along CLK_54M, then repeat with series termination fitted."],
  ["STATUS", "Not run. No measurements taken."],
];

function PlanStage() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-start gap-x-10 gap-y-8">
      <div className={`flex min-w-0 flex-col gap-4 rounded-lg border border-ink/20 bg-oat-light p-6 text-ink ${CARD_SHADOW}`}>
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <span className="font-mono text-xs">NEXT-TEST PLAN · DRAFT · REV B</span>
          <span className="flex items-center gap-2 rounded border border-violet bg-lilac-pale px-2.5 py-[5px] text-[13px] font-medium">
            <span aria-hidden="true" className="size-[9px] rotate-45 bg-ink" />
            Awaiting engineering review
          </span>
        </div>
        <dl className="m-0 flex flex-col">
          {PLAN.map(([k, v], i) => (
            <div
              key={k}
              className={`grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] gap-3 border-t border-ink/20 py-2.5 ${
                i === PLAN.length - 1 ? "border-b" : ""
              }`}
            >
              <dt className="pt-[3px] font-mono text-xs">{k}</dt>
              <dd className="m-0 text-base leading-[1.5]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="flex flex-col gap-4 text-[17px] leading-[1.55] text-fog-light">
        <p className="m-0">
          The plan is a proposal. An engineer accepts, changes or rejects it and decides what is run on the bench.
        </p>
        <p className="m-0">
          A completed scan would be recorded as a result. A cause is confirmed only when engineers accept it on the
          basis of completed tests.
        </p>
      </div>
    </div>
  );
}

const MEASURES = ["Frequency", "Level", "Detector", "Distance", "Cables"];
const REV_B: Record<string, string> = {
  Frequency: "216.8 MHz",
  Level: "47.0 dBµV/m",
  Detector: "Quasi-peak",
  Distance: "3 m",
  Cables: "Recorded",
};
// The conditions the product's comparison-eligibility check gates on (see docs/site-design-handoff.md).
const CHECKS = ["Frequency", "Detector", "Distance", "Polarization", "Operating mode"];

function RetestStage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
        <div className="flex flex-col gap-2.5 rounded-lg border border-ink/20 bg-oat p-5 text-ink">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[19px] font-semibold">Rev B</span>
            <span className="rounded border border-ink/20 bg-sky-pale px-2 py-[3px] font-mono text-[11px]">RECORDED</span>
          </div>
          <dl className="m-0 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[15px]">
            {MEASURES.map((m) => (
              <div key={m} className="contents">
                <dt className="text-muted">{m}</dt>
                <dd className="m-0">{REV_B[m]}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-col gap-2.5 rounded-lg border border-dashed border-ink/50 bg-oat-light p-5 text-ink">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[19px] font-semibold">Rev C</span>
            <span className="rounded border border-dashed border-ink/50 bg-oat px-2 py-[3px] font-mono text-[11px]">
              RETEST PLANNED
            </span>
          </div>
          <dl className="m-0 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[15px]">
            {MEASURES.map((m) => (
              <div key={m} className="contents">
                <dt className="text-muted-2">{m}</dt>
                <dd className="m-0">{m === "Frequency" ? "216.8 MHz" : "Not yet recorded"}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-8 gap-y-4 rounded-lg border border-butter p-5">
        <div className="flex flex-col gap-2">
          <span className="self-start rounded bg-butter px-2.5 py-1 font-mono text-xs text-ink">
            COMPARISON · AWAITING CONDITION CHECKS
          </span>
          <p className="m-0 text-base leading-[1.55] text-fog-light">
            The comparison runs only when these conditions match, or when a difference is documented as not affecting
            the reading. A lower number alone does not show improvement.
          </p>
        </div>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-2 p-0">
          {CHECKS.map((c) => (
            <li key={c} className="flex justify-between gap-2 rounded-md border border-[#46526A] px-3 py-2.5 text-[15px]">
              <span>{c}</span>
              <span className="font-mono text-xs whitespace-nowrap text-butter">TO CHECK</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const STAGES: ReactNode[] = [
  <ReportStage key="report" />,
  <InvestigationStage key="investigation" />,
  <PlanStage key="plan" />,
  <RetestStage key="retest" />,
];

export default function Workbench() {
  const { index, select, playing, toggle, sectionRef, holdProps } = useAutoAdvance<HTMLElement>(TABS.length);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const n = TABS.length;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (index + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (index + n - 1) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next === null) return;
    e.preventDefault();
    select(next);
    document.getElementById(`bench-tab-${next}`)?.focus();
  };

  return (
    <section
      ref={sectionRef}
      id="application"
      aria-labelledby="app-h"
      className="bg-oat px-[clamp(12px,3vw,40px)] pb-[clamp(80px,10vw,136px)]"
    >
      <div className="mx-auto box-content max-w-[1280px] rounded-[14px] bg-ink px-[clamp(20px,4vw,64px)] py-[clamp(28px,5vw,72px)] text-oat">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-end gap-x-[clamp(32px,6vw,96px)] gap-y-6">
          <h2
            id="app-h"
            className="m-0 font-display text-[clamp(34px,4.4vw,58px)] leading-[1.06] font-medium tracking-[-0.025em]"
          >
            From failed finding
            <br />
            to reviewed next test.
          </h2>
          <p className="m-0 max-w-[30rem] text-[19px] leading-[1.6] text-fog-light">
            Confirm the evidence. Investigate in context. Decide what to test next.
          </p>
        </div>

        <div {...holdProps}>
          <div
            role="tablist"
            aria-label="Investigation stages"
            onKeyDown={onKey}
            className="mt-[clamp(40px,5vw,56px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-2"
          >
            {TABS.map((label, i) => {
              const on = i === index;
              return (
                <button
                  key={label}
                  type="button"
                  role="tab"
                  id={`bench-tab-${i}`}
                  aria-selected={on}
                  aria-controls="bench-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(i)}
                  className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-md border px-4 py-3 text-left font-sans text-base font-medium transition-[background-color,color,border-color] duration-200 hover:border-lime ${
                    on ? "border-lime bg-lime text-ink" : "border-[#46526A] bg-[#2F3A48] text-[#E9ECEF]"
                  }`}
                >
                  <span className="font-mono text-xs tracking-[0.04em]">0{i + 1}</span>
                  <span>{label}</span>
                </button>
              );
            })}
          </div>

          <div
            id="bench-panel"
            role="tabpanel"
            aria-labelledby={`bench-tab-${index}`}
            tabIndex={0}
            className="mt-3 flex min-h-[460px] flex-col gap-7 rounded-[10px] border border-[#3A4557] bg-[#232B36] p-[clamp(20px,3.4vw,44px)]"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="m-0 font-display text-[26px] font-medium">{TITLES[index]}</h3>
              <PlayToggle
                playing={playing}
                onToggle={toggle}
                label="stage sequence"
                className="min-h-9 rounded-md border border-night-edge text-oat"
              />
            </div>

            <div className="grid">
              {STAGES.map((stage, i) => {
                const on = i === index;
                return (
                  <div
                    key={i}
                    aria-hidden={!on}
                    inert={!on}
                    className={`min-w-0 transition-[opacity,visibility] duration-300 [grid-area:1/1] ${
                      on ? "visible opacity-100" : "invisible opacity-0"
                    }`}
                  >
                    {stage}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <p className="mt-6 mb-0 flex items-center gap-3 text-lg">
          <span aria-hidden="true" className="size-3 flex-none bg-butter" />
          Comparisons depend on compatible test conditions.
        </p>
      </div>
    </section>
  );
}
