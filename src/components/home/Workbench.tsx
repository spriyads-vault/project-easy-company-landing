"use client";

import type { KeyboardEvent, ReactNode } from "react";
import { useAutoAdvance } from "@/hooks/useAutoAdvance";
import PlayToggle from "./PlayToggle";

const TABS = ["Report", "Investigation", "Test plan", "Retest record"];
const TITLES = [
  "Confirm the finding against the original report.",
  "Examine possible explanations and the evidence behind them.",
  "Prepare a next test for engineering review.",
  "Record the outcome alongside the change and test conditions.",
];

const DT = "font-mono text-xs tracking-[0.04em] text-fog";
const TD = "border-b border-line p-2";
const STUB =
  "absolute top-1/2 hidden h-0.5 w-7 bg-fog min-[820px]:block min-[820px]:right-[-30px]";

function ReportStage() {
  return (
    <div className="grid grid-cols-1 items-start gap-x-10 gap-y-8 min-[1000px]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
      <div className="flex min-w-0 flex-col gap-3.5 border-[1.5px] border-ink bg-oat p-6 text-ink shadow-[10px_10px_0_#6D85AD]">
        <div className="flex justify-between gap-3 font-mono text-xs">
          <span>TEST REPORT · REV B · p. 4</span>
          <span className="border border-ink px-1.5 py-0.5">SAMPLE DATA</span>
        </div>
        <span className="font-display text-[22px] font-medium">4.2 Radiated emissions</span>
        <span className="font-mono text-xs text-muted">Quasi-peak · 3 m</span>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="text-left">
                {["MHz", "dBµV/m", "Pol", "As reported"].map((h) => (
                  <th key={h} scope="col" className="border-b-[1.5px] border-ink p-2 font-semibold">
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
              <tr className="bg-butter outline-2 -outline-offset-2 outline-ink">
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
        <span className="flex items-center gap-2 self-start bg-ink px-2.5 py-1.5 font-mono text-xs text-oat">
          SOURCE · Table 4.2, page 4
        </span>
      </div>
      <dl className="m-0 flex flex-col gap-[22px]">
        <div>
          <dt className={`flex items-center gap-2.5 ${DT}`}>
            <span aria-hidden="true" className="size-3 bg-butter" />
            HIGHLIGHTED FINDING
          </dt>
          <dd className="mt-1.5 ml-0 text-[17px] leading-[1.5]">216.8 MHz, horizontal. Reported above the limit on Rev B.</dd>
        </div>
        <div>
          <dt className={DT}>SOURCE REFERENCE</dt>
          <dd className="mt-1.5 ml-0 text-[17px] leading-[1.5]">Table 4.2, page 4 of the report.</dd>
        </div>
        <div>
          <dt className={DT}>BEFORE USE</dt>
          <dd className="mt-1.5 ml-0 text-[17px] leading-[1.5]">
            An engineer confirms each extracted value against the source.
          </dd>
        </div>
      </dl>
    </div>
  );
}

function Fact({ kicker, title, sub, source, bg }: { kicker: string; title: string; sub?: string; source: string; bg: string }) {
  return (
    <div className={`relative flex flex-col gap-1 border-[1.5px] border-ink px-4 py-3.5 text-ink ${bg}`}>
      <span className="font-mono text-[11px]">{kicker}</span>
      <span className="text-[17px] font-semibold">{title}</span>
      {sub && <span className="text-[15px]">{sub}</span>}
      <span className="font-mono text-[11px] text-muted-2">Source: {source}</span>
      <span aria-hidden="true" className={STUB} />
    </div>
  );
}

function InvestigationStage() {
  return (
    <div className="grid grid-cols-1 items-center min-[820px]:grid-cols-[minmax(0,1fr)_56px_minmax(0,1.1fr)]">
      <div className="flex flex-col gap-3.5">
        <Fact kicker="KNOWN · REV B" title="CLK_54M routing" sub="38 mm, unterminated" source="layout record" bg="bg-sky" />
        <Fact kicker="KNOWN" title="Oscillator Y1" sub="54.2 MHz" source="component datasheet" bg="bg-sky" />
        <Fact kicker="OBSERVED · REV B" title="216.8 MHz above limit" source="report, table 4.2" bg="bg-oat" />
      </div>
      <div aria-hidden="true" className="relative min-h-10 self-stretch min-[820px]:min-h-0">
        <span className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-fog min-[820px]:top-[16%] min-[820px]:bottom-[16%] min-[820px]:left-7" />
        <span className="absolute top-1/2 right-0 left-7 hidden h-0.5 bg-fog min-[820px]:block" />
      </div>
      <div className="flex flex-col gap-3 border-[1.5px] border-ink bg-lilac p-6 text-ink shadow-[10px_10px_0_#56627A]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-xs">INFERRED · CANDIDATE EXPLANATION</span>
          <span className="bg-ink px-2.5 py-1 font-mono text-xs tracking-[0.06em] text-oat">UNCONFIRMED</span>
        </div>
        <span className="font-display text-[26px] leading-[1.15] font-medium">Fourth harmonic of the Y1 clock</span>
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
      <div className="flex min-w-0 flex-col gap-4 border-[1.5px] border-ink bg-butter p-6 text-ink shadow-[10px_10px_0_#6D85AD]">
        <div className="flex flex-wrap items-center justify-between gap-2.5">
          <span className="font-mono text-xs">NEXT-TEST PLAN · DRAFT · REV B</span>
          <span className="flex items-center gap-2 border border-ink bg-lilac px-2.5 py-[5px] text-[13px] font-medium">
            <span aria-hidden="true" className="size-[9px] rotate-45 bg-ink" />
            Awaiting engineering review
          </span>
        </div>
        <dl className="m-0 flex flex-col">
          {PLAN.map(([k, v], i) => (
            <div
              key={k}
              className={`grid grid-cols-[minmax(0,7rem)_minmax(0,1fr)] gap-3 border-t border-ink py-2.5 ${
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
const REV_B = ["216.8 MHz", "47.0 dBµV/m", "Quasi-peak", "3 m", "Recorded"];
const CHECKS = ["Frequency", "Detector", "Distance", "Polarization", "Operating mode"];

function RevCard({ name, tag, values, planned }: { name: string; tag: string; values: string[]; planned?: boolean }) {
  return (
    <div
      className={`flex flex-col gap-2.5 border-[1.5px] border-ink p-5 text-ink ${
        planned ? "border-dashed bg-sky" : "bg-oat"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-display text-[22px] font-medium">{name}</span>
        <span
          className={`border border-ink px-2 py-[3px] font-mono text-[11px] ${
            planned ? "border-dashed bg-oat" : "bg-sky"
          }`}
        >
          {tag}
        </span>
      </div>
      <dl className="m-0 grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-x-3 gap-y-1.5 text-[15px]">
        {MEASURES.map((m, i) => (
          <div key={m} className="contents">
            <dt className={planned ? "text-muted-2" : "text-muted"}>{m}</dt>
            <dd className="m-0">{values[i]}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function RetestStage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
        <RevCard name="Rev B" tag="RECORDED" values={REV_B} />
        <RevCard
          name="Rev C"
          tag="RETEST PLANNED"
          planned
          values={["216.8 MHz", "Not yet recorded", "Not yet recorded", "Not yet recorded", "Not yet recorded"]}
        />
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-8 gap-y-4 border-[1.5px] border-butter p-5">
        <div className="flex flex-col gap-2">
          <span className="self-start bg-butter px-2.5 py-1 font-mono text-xs text-ink">
            COMPARISON · AWAITING CONDITION CHECKS
          </span>
          <p className="m-0 text-base leading-[1.55] text-fog-light">
            The comparison runs only when these conditions match, or when a difference is documented as not affecting
            the reading. A lower number alone does not show improvement.
          </p>
        </div>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-2 p-0">
          {CHECKS.map((c) => (
            <li key={c} className="flex justify-between gap-2 border border-night-line px-2.5 py-2 text-sm">
              <span>{c}</span>
              <span className="font-mono text-[11px] whitespace-nowrap text-butter">TO CHECK</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const STAGES: ReactNode[] = [
  <ReportStage key="0" />,
  <InvestigationStage key="1" />,
  <PlanStage key="2" />,
  <RetestStage key="3" />,
];

export default function Workbench() {
  const { index, select, playing, toggle, sectionRef, holdProps } = useAutoAdvance<HTMLElement>(TABS.length);

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const n =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (index + 1) % TABS.length
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (index + TABS.length - 1) % TABS.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? TABS.length - 1
              : null;
    if (n === null) return;
    e.preventDefault();
    select(n);
    // Roving focus follows the visitor's own arrow-key selection.
    document.getElementById(`bench-tab-${n}`)?.focus();
  };

  return (
    <section
      ref={sectionRef}
      id="application"
      aria-labelledby="app-h"
      className="bg-oat px-[clamp(12px,3vw,40px)] pb-[clamp(80px,10vw,136px)]"
    >
      <div className="mx-auto box-content max-w-[1280px] rounded-[4px] bg-ink px-[clamp(20px,4vw,64px)] py-[clamp(28px,5vw,72px)] text-oat">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-end gap-x-[clamp(32px,6vw,96px)] gap-y-6">
          <h2
            id="app-h"
            className="m-0 font-display text-[clamp(34px,4.4vw,58px)] leading-[1.04] font-medium tracking-[-0.03em]"
          >
            A failed test needs
            <br />
            a clear next step.
          </h2>
          <p className="m-0 max-w-[30rem] text-[19px] leading-[1.6] text-fog-light">
            Work through the reported finding, possible explanations and a proposed retest in one investigation.
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
                  className={`focus-lime flex min-h-14 cursor-pointer items-center gap-3 rounded-[3px] border-[1.5px] px-4 py-3 text-left font-sans text-base font-medium transition-colors duration-150 ${
                    on ? "border-lime bg-lime text-ink" : "border-night-edge bg-transparent text-oat"
                  }`}
                >
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
            className="focus-lime mt-3 box-content flex min-h-[460px] flex-col gap-7 rounded-[3px] border border-night-line bg-night bg-[linear-gradient(#2E3947_1px,transparent_1px),linear-gradient(90deg,#2E3947_1px,transparent_1px)] bg-size-[32px_32px] p-[clamp(20px,3.4vw,44px)]"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
              <h3 className="m-0 font-display text-[26px] font-medium">{TITLES[index]}</h3>
              <PlayToggle
                playing={playing}
                onToggle={toggle}
                label="stage sequence"
                className="focus-lime min-h-9 border border-night-edge text-oat"
              />
            </div>

            <div className="grid">
              {STAGES.map((stage, i) => {
                const on = i === index;
                return (
                  <div
                    key={i}
                    aria-hidden={!on}
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
      </div>
    </section>
  );
}
