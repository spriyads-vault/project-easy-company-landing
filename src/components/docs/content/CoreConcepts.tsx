import { Article, Callout, DataTable, H1, H2, P, Section } from "../ui";
import SectionLink from "@/components/site/SectionLink";

const STATES: [string, string, string][] = [
  ["Observed", "bg-observed border-solid", "Recorded measurements and physical test results."],
  ["Known", "bg-known border-solid", "Confirmed product facts with supporting sources."],
  ["Inferred", "bg-inferred border-solid", "Candidate explanations requiring investigation."],
  ["Missing", "bg-missing border-dashed", "Information needed before a check or decision can proceed."],
];

export default function CoreConcepts() {
  return (
    <Article kicker="CORE CONCEPTS">
      <Section id="products-and-revisions" title="Products and revisions">
        <h1 className={H1}>Products and revisions</h1>
        <p className={P}>
          A product is the device under investigation. A revision is a specific physical configuration of it: the board
          revision, and where relevant the firmware, enclosure, cables and operating mode used during the test.
        </p>
        <p className={P}>
          Evidence belongs to the revision it was produced on. A new revision does not inherit earlier results. Where a
          later revision shares facts with an earlier one, the shared facts are recorded explicitly rather than assumed.
        </p>
        <Callout label="WHY IT MATTERS">
          A pass on Rev B says nothing about Rev C until someone establishes which differences between them could affect
          the result.
        </Callout>
      </Section>

      <Section id="requirements-and-applicability" title="Requirements and applicability">
        <h2 className={H2}>Requirements and applicability</h2>
        <p className={P}>
          A requirement is a rule, the version of that rule, and the basis for applying it to this product. For radiated
          emissions the basis typically includes the equipment class, the frequency range, the measurement distance and
          the detector the limit is defined for.
        </p>
        <p className="m-0 text-[17px] leading-[1.7]">
          Applicability is recorded, not implied. If the basis for applying a requirement is unknown, for example the
          equipment class has not been stated, it is shown as missing and the check does not run.
        </p>
      </Section>

      <Section id="evidence-and-provenance" title="Evidence and provenance">
        <h2 className={H2}>Evidence and provenance</h2>
        <p className={P}>
          Evidence is a measurement together with its test conditions and a reference to where it came from. A value
          without its source is not used for evaluation.
        </p>
        <DataTable
          className="mb-5"
          minWidth={520}
          shadedHead={false}
          caption="TYPICAL RADIATED-EMISSIONS EVIDENCE"
          head={["Field", "Meaning"]}
          rows={[
            ["Frequency", "Frequency of the recorded emission, in MHz"],
            ["Level", "Field strength as reported, in dBµV/m"],
            ["Detector", "Quasi-peak, peak or average"],
            ["Distance", "Antenna measurement distance, in metres"],
            ["Polarization", "Horizontal or vertical"],
            ["Source", "The document the value came from and its location, such as page or table"],
          ]}
        />
        <p className="m-0 text-[17px] leading-[1.7]">
          Provenance is recorded at the level the source supports. A confirmed value keeps both its source reference and
          a record that it was confirmed.
        </p>
      </Section>

      <Section id="observations-and-hypotheses" title="Observations and hypotheses">
        <h2 className={H2}>Observations and hypotheses</h2>
        <p className={P}>
          Every item in an investigation carries one of four states. The states describe how something is known. They
          are not a verdict.
        </p>
        <dl className="m-0 mb-8 border-t border-ink">
          {STATES.map(([name, swatch, text]) => (
            <div
              key={name}
              className="grid grid-cols-[minmax(0,9rem)_minmax(0,1fr)] gap-3 border-b border-line py-3.5"
            >
              <dt className="flex items-center gap-2.5 font-semibold">
                <span aria-hidden="true" className={`size-3 flex-none border border-ink ${swatch}`} />
                {name}
              </dt>
              <dd className="m-0 text-base leading-[1.6]">{text}</dd>
            </div>
          ))}
        </dl>
        <h3 id="tests-and-causes" className="m-0 mb-3 text-xl font-semibold">
          Suggested tests, completed tests and confirmed causes
        </h3>
        <p className={P}>These three are kept separate throughout.</p>
        <DataTable
          minWidth={560}
          head={["Item", "What it means", "What it does not mean"]}
          rows={[
            [
              <span key="s" className="font-medium">Suggested test</span>,
              "A proposed next step, awaiting review",
              "That anything has been measured",
            ],
            [
              <span key="c" className="font-medium">Completed test</span>,
              "A test that was run, with a recorded result and conditions",
              "That the hypothesis it tested is true",
            ],
            [
              <span key="k" className="font-medium">Confirmed cause</span>,
              "An explanation an engineer has accepted on the basis of completed tests",
              "That the fix holds on other revisions",
            ],
          ]}
        />
      </Section>

      <Section id="reviews-and-historical-decisions" title="Reviews and historical decisions">
        <h2 className={H2}>Reviews and historical decisions</h2>
        <p className={P}>
          A review records a decision, the evidence it relied on and the revision it concerns. Earlier decisions are
          preserved when new evidence arrives, so the reasoning behind a past next step can still be read.
        </p>
        <p className="m-0 mb-6 text-[17px] leading-[1.7]">
          A historical result stays attached to the revision it was measured on. It is not overwritten by a later retest
          on a different revision.
        </p>
        <Callout label="PRODUCT DIRECTION" dashed>
          Automatically returning affected evidence to review when a revision changes is part of where Crado is heading.
          It is not described here as current functionality. The{" "}
          <SectionLink section="direction">illustrative concept</SectionLink> on the homepage shows the intended
          behaviour.
        </Callout>
      </Section>
    </Article>
  );
}
