import { A, Bullet, H2, H3, Table } from "../ui";

const ECFR_15_109 = "https://www.ecfr.gov/current/title-47/chapter-I/subchapter-A/part-15/subpart-B/section-15.109";

const NOT_COVERED = [
  "Other clauses of FCC Part 15 Subpart B, including conducted emissions.",
  "CISPR 32 / EN 55032.",
  "IEC 61000 immunity standards and MIL-STD-461.",
];

const GLOSSARY: [string, string][] = [
  ["Revision", "A specific physical configuration of a product, including board, firmware, enclosure, cables and operating mode as tested."],
  ["Evidence", "A measurement together with its test conditions and a reference to where it came from."],
  ["Provenance", "The record of where a value came from and who confirmed it."],
  ["Confirmed value", "A value an engineer has checked against its source and accepted."],
  ["Reported margin", "The margin stated in the lab's test report, kept exactly as reported."],
  ["Evaluated result", "The result of the evaluation engine applying a published rule to confirmed values."],
  ["Blocked comparison", "A comparison the engine will not make because a condition is missing, incompatible or unsupported."],
  ["Suggested test", "A proposed next step, awaiting an engineer's review."],
  ["Confirmed cause", "An explanation an engineer has accepted on the basis of completed tests."],
  [
    "Evidence package",
    "The record that gathers the revision, requirement, confirmed inputs, conditions, result, missing items and review decisions for one finding.",
  ],
];

export default function Reference() {
  return (
    <>
      {/* The design sets this opening paragraph at body size, not lead size. */}
      <p className="m-0 mt-1 text-base leading-[1.65] text-pretty text-fg-4">
        Coverage is listed per clause and condition. The regulatory text is published in the Electronic Code of Federal Regulations at{" "}
        <A to={ECFR_15_109}>47 CFR 15.109</A>, Radiated emission limits. Implementation in source, availability in production and independent validation are
        separate states and are reported separately.
      </p>
      <span className="flex items-center gap-2 text-sm text-fg-6">
        Evaluated by: <span className="text-fg">Crado evaluation engine (versioned rules)</span>
      </span>
      <Table
        label="Regulatory coverage"
        minWidth={720}
        monoFirst
        minWidths={[undefined, 260]}
        head={["Clause", "Conditions", "Implemented", "Availability", "Independent validation"]}
        rows={[
          [
            "47 CFR 15.109(a)",
            <span key="c">
              Class B radiated emission limits. Bounded checks for supported inputs: stated frequency, level, unit, detector and a 3 m measurement distance, for
              an unintentional radiator of stated class.
            </span>,
            <span key="i" className="text-fg-3">Bounded checks</span>,
            <span key="a" className="text-fg-3">Pilot workspaces</span>,
            <span key="v" className="text-fg-3">None claimed</span>,
          ],
        ]}
      />
      <H3>Not covered</H3>
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-base leading-[1.6] text-fg-4">
        {NOT_COVERED.map((item) => (
          <Bullet key={item} className="[&>span:first-child]:mt-[9px]">
            {item}
          </Bullet>
        ))}
      </ul>

      <H2 id="glossary">Glossary</H2>
      <dl className="m-0 flex flex-col border-b border-line-1">
        {GLOSSARY.map(([term, def]) => (
          <div key={term} className="grid grid-cols-1 gap-x-6 gap-y-1.5 border-t border-line-1 py-4 sm:grid-cols-[180px_minmax(0,1fr)]">
            <dt className="text-[15px] font-medium text-fg">{term}</dt>
            <dd className="m-0 text-[15px] leading-[1.6] text-pretty text-fg-4">{def}</dd>
          </div>
        ))}
      </dl>
    </>
  );
}
