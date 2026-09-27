import type { ReactNode } from "react";
import BookPilotButton from "./BookPilotButton";

const RAW_LINES: ReactNode[] = [
  "------------------------------------",
  "EMC TEST RPT  TR-0412  rev C",
  "4.2 RADIATED EMISS.  47 CFR 15.1O9",
  "EUT CR-GW-220  12VDC  SN 0042",
  "ant bilog @3m  H/V  tbl 0-360",
  "RBW 120k  QP  amb OK 09:40",
  " ",
  "freq       lvl          det  v",
  "48.02 MHz  31.4 dBuV/m  QP   pass",
  "96.1O MHz  34.9 dBuV/m  QP   pass",
  "144.3 MHz  38.2 dBuV/m  QP   pass",
  <span key="fail" className="bg-blush px-1 font-bold text-ink">
    216.8 MHz 47.0 dBuV/m FAIL
  </span>,
  "288.5 MHz  40.7 dBuV/m  QP   pass",
  "432.0 MHz  44.1 dBuV/m  QP   clse",
  " ",
  "notes: spike trks Y1 clk.. 4th h??",
  "ferrite J3 -> no chg (~0.3dB)",
  "ECO-117 shield GND pend.",
  "[ illegible margin ] retest Fri",
  "ds Y1 f0 54.2MHz CMOS 3.3V",
  "pcb CLK_54M -> U7.12 38mm unterm",
  "signed ______  lab ch.2",
];

const Key = ({ children }: { children: string }) => (
  <span className="text-butter">&quot;{children}&quot;</span>
);
const Str = ({ children }: { children: string }) => (
  <span className="text-lilac">&quot;{children}&quot;</span>
);

const JSON_LINES: ReactNode[] = [
  "{",
  <>  <Key>standard</Key>: <Str>FCC Part 15</Str>,</>,
  <>  <Key>clause</Key>: <Str>15.109(a)</Str>,</>,
  <>  <Key>class</Key>: <Str>B</Str>,</>,
  <>  <Key>source</Key>: {"{"}</>,
  <>    <Key>file</Key>: <Str>ds_rev_c.pdf</Str>,</>,
  <>    <Key>page</Key>: 4,</>,
  <>    <Key>ocr_conf</Key>: 0.92</>,
  "  },",
  <>  <Key>measurement</Key>: {"{"}</>,
  <>    <Key>freq_mhz</Key>: 216.8,</>,
  <>    <Key>level_dbuv_m</Key>: 47.0,</>,
  <>    <Key>detector</Key>: <Str>QP</Str>,</>,
  <>    <Key>distance_m</Key>: 3</>,
  "  },",
  <>  <Key>limit_dbuv_m</Key>: 46.0,</>,
  <>  <Key>margin_db</Key>: -1.0,</>,
  <>  <Key>root_cause</Key>: {"{"}</>,
  <>    <Key>net</Key>: <Str>CLK_54M</Str>,</>,
  <>    <Key>harmonic</Key>: 4</>,
  "  },",
  <>
    {"  "}
    <span className="bg-mint px-1 font-bold text-ink">&quot;result&quot;: &quot;RULE_FAILED&quot;</span>
  </>,
  "}",
];

function TerminalPreview() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full max-w-[672px] overflow-hidden rounded-md border border-steel bg-night-2 font-mono tabular-nums shadow-[0_25px_50px_-12px_rgba(8,12,18,0.6)] [font-variant-ligatures:none]"
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-steel bg-night-3 px-4 py-2 text-xs leading-4 text-fog">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-blush" />
          <span className="size-2.5 rounded-full bg-butter" />
          <span className="size-2.5 rounded-full bg-mint" />
        </div>
        <span className="whitespace-nowrap">ds_rev_c.pdf → assessment.json</span>
        <span className="justify-self-end text-mint">ONLINE</span>
      </div>
      <div className="grid h-[400px] grid-cols-2">
        <div className="overflow-hidden border-r border-steel bg-night-3 p-4 text-[10px] leading-4 text-dim">
          <div className="whitespace-pre text-mist">ds_rev_c.pdf · p.4/18 · [OCR 0.92]</div>
          {RAW_LINES.map((line, i) => (
            <div key={i} className="whitespace-pre">
              {line}
            </div>
          ))}
        </div>
        <div className="overflow-hidden bg-night p-4 text-[10px] leading-4 text-paper">
          {JSON_LINES.map((line, i) => (
            <div key={i} className="whitespace-pre">
              {line}
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-steel bg-night-3 p-2 text-[10px] leading-[14px] text-mint">
        ✓ 1 source parsed · 1 deterministic mapping completed
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="flex min-h-[85vh] w-full flex-wrap border-b border-ink"
    >
      <div className="relative flex min-w-0 flex-[1_1_520px] flex-col justify-center border-r border-ink bg-paper px-[clamp(48px,7vw,96px)] py-20">
        <div
          aria-hidden="true"
          className="absolute top-10 left-[clamp(48px,7vw,96px)] border border-ink bg-blush px-3 py-1 font-mono text-xs leading-4 tracking-[0.04em] text-ink uppercase shadow-[2px_2px_0_#2A3441]"
        >
          Deterministic Engine v2.0
        </div>
        <h1
          id="hero-title"
          className="m-0 max-w-[11ch] font-display text-[clamp(52px,5.6vw,72px)] leading-[1.05] font-bold tracking-[-0.05em] text-balance text-ink"
        >
          Hardware compliance in engineering loops.
        </h1>
        <p className="mt-6 max-w-[32rem] text-lg leading-7 text-pretty text-muted">
          We abstract the regulatory layer so your team can focus on physical architecture. Crado
          parses unstructured chamber logs and maps them rigidly to hard regulatory
          clauses—compressing EMC cycles by 3x.
        </p>
        <div className="mt-10 flex">
          <BookPilotButton
            aria-label="Book a compliance pilot scoping call"
            className="inline-flex cursor-pointer items-center rounded border border-solid border-ink bg-mint px-6 py-3 text-sm leading-5 font-medium text-ink shadow-[2px_2px_0_#2A3441] transition-all duration-150 hover:translate-y-px hover:shadow-[1px_1px_0_#2A3441] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[0_0_0_#2A3441]"
          >
            Book a pilot →
          </BookPilotButton>
        </div>
      </div>

      <div className="relative flex min-w-0 flex-[1_1_520px] flex-col items-center justify-center overflow-hidden bg-ink p-[clamp(32px,4.5vw,64px)]">
        <div
          aria-hidden="true"
          className="grid-lines pointer-events-none absolute inset-0 bg-[length:40px_40px] bg-[position:-1px_-1px] [--grid-color:#354353]"
        />
        <TerminalPreview />
      </div>
    </section>
  );
}
