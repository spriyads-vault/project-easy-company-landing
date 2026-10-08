import type { ReactNode } from "react";
import { CodeBlock, H2, H3, Lead, Mono, P, Pill, Table } from "../ui";

const ACTIONS: { label: string; icon: ReactNode; body: string }[] = [
  {
    label: "Confirm",
    icon: <path d="M20 6 9 17l-5-5" />,
    body: "a value that matches the source.",
  },
  {
    label: "Correct",
    icon: <path d="M4 20h4L19 9l-4-4L4 16z" />,
    body: "a value that was misread, keeping the source reference.",
  },
  {
    label: "Reject",
    icon: <path d="M6 6l12 12M18 6 6 18" />,
    body: "a value that cannot be supported by the source.",
  },
];
const ACTION_TONE = ["text-ok", "text-warn", "text-danger"];

const RECORDS = [
  { label: "INPUTS", body: "The confirmed values used, each with its source reference." },
  { label: "RULE VERSION", body: "The version of the rule that was applied." },
  { label: "REVISION", body: "The product revision the result concerns." },
  { label: "SOURCES", body: "The documents and locations the inputs came from." },
];

const BLOCKED = [
  {
    tone: "muted",
    label: "Missing",
    body: "A required input is not recorded, for example the detector is not stated in the report. The check does not run. The missing item is listed so it can be supplied.",
  },
  {
    tone: "danger",
    label: "Incompatible",
    body: "Inputs are recorded but differ in a way that invalidates the comparison, for example a peak reading compared with a quasi-peak reading. The comparison is blocked and both values remain visible.",
  },
  {
    tone: "neutral",
    label: "Unsupported",
    body: "The requirement or condition falls outside the supported checks. No result is produced, and the reason is stated.",
  },
] as const;

const MARGIN_FORMULA = "margin (dB) = measured level (dBµV/m) − limit (dBµV/m)";

export default function Evaluation() {
  return (
    <>
      <Lead>
        Values are proposed from the report text and presented for confirmation beside their source reference. Only confirmed values are used by evaluation.
      </Lead>
      <P>
        What the report itself states, including its own limit, margin and pass or fail verdict, is kept as reported. It is stored separately from any result
        Crado evaluates, so the two can be compared rather than merged.
      </P>
      <ul className="m-0 mt-1 flex list-none flex-col rounded-card border border-line-2 p-0 text-[15px]">
        {ACTIONS.map((a, i) => (
          <li key={a.label} className={`flex items-center gap-4 px-4 py-3.5 ${i > 0 ? "border-t border-line-2" : ""}`}>
            <span className="inline-flex h-7 w-20 flex-none items-center justify-center gap-1.5 rounded-sm border border-line-5 bg-surface-4 font-sans text-[12.5px] font-medium text-fg">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={ACTION_TONE[i]} aria-hidden="true">
                {a.icon}
              </svg>
              {a.label}
            </span>
            <span className="text-fg-4">{a.body}</span>
          </li>
        ))}
      </ul>

      <H2 id="rule-evaluation">Supported rule evaluation</H2>
      <P>
        Each supported check is a published, versioned rule, applied by the evaluation engine to confirmed values only. The same confirmed inputs and the same rule
        version always give the same result.
      </P>
      <Mono className="mt-1 text-fg-faint">EVERY RESULT RECORDS</Mono>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {RECORDS.map((r) => (
          <div key={r.label} className="flex flex-col gap-2 rounded-card border border-line-4 bg-surface-2 p-4">
            <Mono className="text-accent-text">{r.label}</Mono>
            <p className="m-0 text-sm leading-[1.55] text-pretty text-fg-4">{r.body}</p>
          </div>
        ))}
      </div>
      <H3>Margin convention</H3>
      <CodeBlock label="MARGIN" text={MARGIN_FORMULA}>
        <span className="text-accent-text">margin</span> (dB) = measured level (dBµV/m) − limit (dBµV/m)
      </CodeBlock>
      <P>
        A positive margin means the level exceeds the limit. A negative margin means the level is below it. All examples in this documentation use this
        convention.
      </P>

      <H2 id="comparisons">Measurement comparisons</H2>
      <P>
        A numeric difference alone does not prove improvement. Two readings can only be compared when the conditions that affect the reading were the same, or
        when their differences are known not to matter.
      </P>
      <H3>Conditions that must be recorded</H3>
      <Table
        label="Conditions that must be recorded"
        minWidth={540}
        firstCol="40%"
        head={["Condition", "Why it matters"]}
        rows={[
          ["Revision and configuration", "A different device is a different question"],
          ["Detector", "Peak, quasi-peak and average readings of the same emission differ"],
          ["Measurement distance", "Field strength and the applicable limit both depend on distance"],
          ["Resolution bandwidth", "Changes the measured level for broadband emissions"],
          ["Antenna polarization and height search", "The maximum may appear at a different orientation or height"],
          ["Operating mode and firmware", "Clock activity and load change emissions"],
          ["Cable arrangement and peripherals", "Cables often dominate radiated emissions"],
          ["Test site", "Chamber or site differences affect absolute levels"],
        ]}
      />
      <P>
        Crado checks frequency, detector, measurement distance, polarization, operating mode, equipment class and units before it compares two readings.
        Resolution bandwidth, height search, cable arrangement and test site are not yet checked automatically, so record them and review them as part of the
        comparison.
      </P>
      <H3>Reported margin and evaluated result</H3>
      <P>
        A reported margin is the lab&apos;s statement. An evaluated result is Crado applying a supported rule to confirmed values. Both are shown. When they
        disagree, the difference is surfaced for review; neither silently replaces the other.
      </P>
      <P>If a condition is missing or differs, the comparison is blocked and the reason is stated.</P>

      <H2 id="missing-conditions">Missing and incompatible conditions</H2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {BLOCKED.map((b) => (
          <div key={b.label} className="flex flex-col items-start gap-3 rounded-card border border-line-2 bg-surface-1 p-5">
            <Pill tone={b.tone}>{b.label}</Pill>
            <p className="m-0 text-[14.5px] leading-[1.6] text-pretty text-fg-4">{b.body}</p>
          </div>
        ))}
      </div>
      <p className="m-0 mt-3 border-t border-line-1 pt-6 text-xl leading-[1.45] font-medium tracking-[-0.01em] text-pretty text-fg">
        A blocked check is not a failure. It records that the available evidence does not yet support a conclusion.
      </p>
    </>
  );
}
