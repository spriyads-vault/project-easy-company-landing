import CodeBlock from "../CodeBlock";
import { Article, DataTable, DocLink, H1, H2, H3, LEAD, P, Section } from "../ui";

const GATES: [string, string][] = [
  ["1 RESOLVE", "Select the limit for the stated class, frequency band, distance and detector."],
  ["2 CHECK", "Confirm every required input is present and supported. If not, stop and list what is missing."],
  ["3 COMPARE", "Bring measurement and limit to the same units and compute the margin."],
  ["4 RECORD", "Store the result with its inputs, rule version, revision and source references."],
];

const CONDITIONS: [string, string][] = [
  ["Revision and configuration", "A different device is a different question"],
  ["Detector", "Peak, quasi-peak and average readings of the same emission differ"],
  ["Measurement distance", "Field strength and the applicable limit both depend on distance"],
  ["Resolution bandwidth", "Changes the measured level for broadband emissions"],
  ["Antenna polarization and height search", "The maximum may appear at a different orientation or height"],
  ["Operating mode and firmware", "Clock activity and load change emissions"],
  ["Cable arrangement and peripherals", "Cables often dominate radiated emissions"],
  ["Test site", "Chamber or site differences affect absolute levels"],
];

const BLOCKERS: [string, string][] = [
  [
    "Missing",
    "A required input is not recorded, for example the detector is not stated in the report. The check does not run. The missing item is listed so it can be supplied.",
  ],
  [
    "Incompatible",
    "Inputs are recorded but differ in a way that invalidates the comparison, for example a peak reading compared with a quasi-peak reading. The comparison is blocked and both values remain visible.",
  ],
  [
    "Unsupported",
    "The requirement or condition falls outside the supported checks. No result is produced, and the reason is stated.",
  ],
];

export default function Evaluation() {
  return (
    <Article kicker="EVALUATION">
      <Section id="report-confirmation" title="Report confirmation">
        <h1 className={H1}>Report confirmation</h1>
        <p className={P}>
          Values are proposed from the report text and presented for confirmation beside their source reference. Only
          confirmed values are used by evaluation.
        </p>
        <p className={P}>
          What the report itself states, including its own limit, margin and pass or fail verdict, is kept as reported.
          It is stored separately from any result Crado evaluates, so the two can be compared rather than merged.
        </p>
        <ul className="m-0 pl-[22px] text-[17px] leading-[1.7]">
          <li>
            <strong className="font-semibold">Confirm</strong> a value that matches the source.
          </li>
          <li>
            <strong className="font-semibold">Correct</strong> a value that was misread, keeping the source reference.
          </li>
          <li>
            <strong className="font-semibold">Reject</strong> a value that cannot be supported by the source.
          </li>
        </ul>
      </Section>

      <Section id="supported-rule-evaluation" title="Supported rule evaluation">
        <h2 className={H2}>Supported rule evaluation</h2>
        <p className={P}>
          Each supported check is a fixed, versioned rule. It holds no learned weights, so a result can be reproduced
          from its inputs and rule version.
        </p>
        <ol className="m-0 mb-8 list-none border-t border-ink p-0">
          {GATES.map(([step, text]) => (
            <li
              key={step}
              className="grid grid-cols-[110px_minmax(0,1fr)] gap-3 border-b border-line py-3.5"
            >
              <span className="pt-0.5 font-mono text-[13px]">{step}</span>
              <span className="text-base leading-[1.6]">{text}</span>
            </li>
          ))}
        </ol>
        <h3 id="margin-convention" className={H3}>
          Margin convention
        </h3>
        <CodeBlock id="code-margin" label="MARGIN">
          margin (dB) = measured level (dBµV/m) − limit (dBµV/m)
        </CodeBlock>
        <p className="m-0 mt-4 text-[17px] leading-[1.7]">
          A positive margin means the level exceeds the limit. A negative margin means the level is below it. All
          examples in this documentation use this convention.
        </p>
      </Section>

      <Section id="measurement-comparisons" title="Measurement comparisons">
        <h2 className={H2}>Measurement comparisons</h2>
        <p className={LEAD}>
          A numeric difference alone does not prove improvement. Two readings can only be compared when the conditions
          that affect the reading were the same, or when their differences are known not to matter.
        </p>
        <h3 className={`${H3} mt-8`}>Conditions that must be recorded</h3>
        <DataTable
          className="mb-4"
          minWidth={560}
          head={["Condition", "Why it matters"]}
          rows={CONDITIONS.map(([c, w]) => [c, w])}
        />
        <p className="m-0 mb-7 text-base leading-[1.65]">
          Crado checks frequency, detector, measurement distance, polarization, operating mode, equipment class and
          units before it compares two readings. Resolution bandwidth, height search, cable arrangement and test site are
          not yet checked automatically, so record them and review them as part of the comparison.
        </p>
        <h3 className={H3}>Reported margin and evaluated result</h3>
        <p className={P}>
          A reported margin is the lab&apos;s statement. An evaluated result is Crado applying a supported rule to
          confirmed values. Both are shown. When they disagree, the difference is surfaced for review; neither silently
          replaces the other.
        </p>
        <p className="m-0 text-[17px] leading-[1.7]">
          If a condition is missing or differs, the comparison is blocked and the reason is stated. See{" "}
          <DocLink to="missing-and-incompatible-conditions">Missing and incompatible conditions</DocLink> and the{" "}
          <DocLink to="example-blocked">blocked comparison example</DocLink>.
        </p>
      </Section>

      <Section id="missing-and-incompatible-conditions" title="Missing and incompatible conditions">
        <h2 className={H2}>Missing and incompatible conditions</h2>
        <dl className="m-0 mb-6 border-t border-ink">
          {BLOCKERS.map(([term, text]) => (
            <div key={term} className="border-b border-line py-4">
              <dt className="mb-1.5 text-[17px] font-semibold">{term}</dt>
              <dd className="m-0 text-base leading-[1.65]">{text}</dd>
            </div>
          ))}
        </dl>
        <p className="m-0 text-[17px] leading-[1.7]">
          A blocked check is not a failure. It records that the available evidence does not yet support a conclusion.
        </p>
      </Section>
    </Article>
  );
}
