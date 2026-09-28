import CodeBlock from "../CodeBlock";
import { Article, DataTable, DocLink, ECFR_15_109, H1, H2, P, Section } from "../ui";

const EXAMPLE_A = `revision      Rev B, as tested
requirement   47 CFR 15.109(a), Class B
frequency     216.8 MHz
level         47.0 dBµV/m   confirmed
detector      quasi-peak
distance      3 m
polarization  horizontal
source        test report, table 4.2, p. 4

limit         46.0 dBµV/m   200 µV/m, 216–960 MHz at 3 m, quasi-peak
margin        47.0 − 46.0 = +1.0 dB
result        level exceeds limit by 1.0 dB`;

const RESULT = "font-semibold";

export default function Reference() {
  return (
    <Article kicker="REFERENCE">
      <Section id="regulatory-coverage" title="Regulatory coverage">
        <h1 className={H1}>Regulatory coverage</h1>
        <p className={P}>
          Coverage is listed per clause and condition. The regulatory text is published in the Electronic Code of
          Federal Regulations at{" "}
          <a href={ECFR_15_109} rel="noopener">
            47 CFR 15.109, Radiated emission limits
          </a>
          . Implementation in source, availability in production and independent validation are separate states and are
          reported separately.
        </p>
        <div className="mb-6 overflow-x-auto border border-ink">
          <table className="w-full min-w-[680px] border-collapse text-[15px] leading-[1.5]">
            <thead>
              <tr className="bg-oat-hover text-left">
                {["Clause", "Conditions", "Implemented", "Availability", "Independent validation"].map((h) => (
                  <th key={h} scope="col" className="border-b border-ink px-3.5 py-2.5 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-3.5 py-3 align-top font-mono text-sm">47 CFR 15.109(a)</td>
                <td className="px-3.5 py-3 align-top">
                  Class B radiated emission limits. Bounded checks for supported inputs: stated frequency, level, unit,
                  detector and a 3 m measurement distance, for an unintentional radiator of stated class.
                </td>
                <td className="px-3.5 py-3 align-top">Bounded checks</td>
                <td className="px-3.5 py-3 align-top">Pilot workspaces</td>
                <td className="px-3.5 py-3 align-top">None claimed</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h3 className="m-0 mb-2.5 text-lg font-semibold">Not covered</h3>
        <ul className="m-0 pl-[22px] text-[17px] leading-[1.7]">
          <li>Other clauses of FCC Part 15 Subpart B, including conducted emissions.</li>
          <li>CISPR 32 / EN 55032.</li>
          <li>IEC 61000 immunity standards and MIL-STD-461.</li>
        </ul>
      </Section>

      <Section id="evidence-packages" title="Evidence packages">
        <h2 className={H2}>Evidence packages</h2>
        <p className={P}>
          An evidence package gathers what is needed to review a finding on one revision. It is a record for engineering
          review, not a certification document or a public data format.
        </p>
        <DataTable
          minWidth={520}
          head={["Contents", "Description"]}
          rows={[
            ["Revision", "The product and revision the evidence concerns"],
            ["Requirement", "Clause, version and basis for applying it"],
            ["Confirmed inputs", "Values used, each with its source reference"],
            ["Conditions", "Recorded test conditions"],
            ["Result", "Evaluated result and margin, with the rule version, alongside the reported values"],
            ["Missing items", "What prevented a check or comparison"],
            ["Review record", "Decisions, the next-test plan and recorded results"],
          ]}
        />
      </Section>

      <Section id="worked-examples" title="Worked examples">
        <h2 className="m-0 mb-3 font-display text-[34px] font-medium tracking-[-0.02em]">Worked examples</h2>
        <p className="m-0 mb-6 inline-flex border border-dashed border-ink px-2.5 py-1.5 font-mono text-[13px]">
          Illustrative · fictional product and measurements
        </p>
        <h3 id="example-supported" className="m-0 mb-3 text-[22px] font-semibold">
          A · Supported evaluation
        </h3>
        <p className="m-0 mb-4 text-[17px] leading-[1.7]">
          A Rev B report lists an emission at 216.8 MHz. All required inputs are present and confirmed.
        </p>
        <div className="mb-4">
          <CodeBlock id="code-exa" label="INPUTS AND RESULT · EXAMPLE A" size="text-sm leading-[1.7]">
            {EXAMPLE_A}
          </CodeBlock>
        </div>
        <p className="m-0 mb-3 text-[17px] leading-[1.7]">
          <strong className={RESULT}>Result.</strong> On Rev B, under the recorded conditions, the emission exceeds the
          limit by 1.0 dB. The margin is positive under the convention in{" "}
          <DocLink to="margin-convention">Supported rule evaluation</DocLink>.
        </p>
        <p className="m-0 mb-10 text-[17px] leading-[1.7]">
          <strong className={RESULT}>Limitation.</strong> The result describes Rev B only. It does not identify the
          cause, and it says nothing about other revisions.
        </p>

        <h3 id="example-blocked" className="m-0 mb-3 text-[22px] font-semibold">
          B · Blocked comparison
        </h3>
        <p className="m-0 mb-4 text-[17px] leading-[1.7]">
          After a layout change, a Rev C bench reading at 216.8 MHz is 44.8 dBµV/m. The question is whether Rev C
          improved on Rev B.
        </p>
        <DataTable
          className="mb-4"
          minWidth={520}
          head={["Condition", "Rev B", "Rev C", "Status"]}
          rows={[
            ["Level", "47.0 dBµV/m", "44.8 dBµV/m", "Recorded"],
            ["Detector", "Quasi-peak", "Peak", "Incompatible"],
            ["Distance", "3 m", "3 m", "Matches"],
            ["Polarization", "Horizontal", "Horizontal", "Matches"],
            ["Operating mode", "Recorded", "Not recorded", "Missing"],
          ]}
        />
        <p className="m-0 mb-3 text-[17px] leading-[1.7]">
          <strong className={RESULT}>Result.</strong> Comparison blocked. The detectors differ and the Rev C operating
          mode is not recorded. The 2.2 dB difference is shown but not treated as an improvement.
        </p>
        <p className="m-0 mb-3 text-[17px] leading-[1.7]">
          <strong className={RESULT}>To unblock.</strong> Retest Rev C with a quasi-peak detector and record the
          operating mode, or document why the difference does not affect the reading.
        </p>
        <p className="m-0 text-[17px] leading-[1.7]">
          <strong className={RESULT}>Limitation.</strong> Even a valid comparison showing a lower level on Rev C would
          not by itself confirm the cause of the original emission.
        </p>
      </Section>
    </Article>
  );
}
