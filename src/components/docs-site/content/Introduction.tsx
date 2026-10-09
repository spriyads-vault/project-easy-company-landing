import { A, Bullet, Callout, H2, H3, Lead, Mono, P } from "../ui";

const ECFR_15_109 = "https://www.ecfr.gov/current/title-47/chapter-I/subchapter-A/part-15/subpart-B/section-15.109";

const ROLES = [
  {
    label: "AGENTS",
    title: "Agents",
    // Approved copy change: live capability only (no email/Slack gathering).
    body: "Agents read reports, propose likely causes and suggest next tests. Everything they propose is labelled Inferred until a person confirms it.",
  },
  {
    label: "ENGINE",
    title: "Evaluation engine",
    body: "The evaluation engine applies published, versioned rules to confirmed values only. The same inputs and the same rule version always give the same result. If a required input is missing or two readings are not comparable, it stops and says why instead of guessing. Every result records its inputs, rule version, revision and sources. Agents can request an evaluation but cannot change its result.",
  },
  {
    label: "ENGINEERS",
    title: "Engineers",
    body: "Engineers confirm values, review findings and decide the physical next step. Crado never issues a certification decision.",
  },
];

const STEPS = [
  {
    title: "Identify the product and revision",
    body: <>Name the product and the revision that was tested. Evidence is recorded against this revision and does not transfer automatically to others.</>,
  },
  {
    title: "Provide an authorized report",
    body: <>Supply a test report you are permitted to share. During a pilot, the reports and data in scope are agreed in advance.</>,
  },
  {
    title: "Confirm extracted values",
    body: (
      <>
        Check the frequency, level, detector, distance, polarization and reported limit and margin against the source. Correct or reject anything that does
        not match. See <A to="report-confirmation">Report confirmation</A>.
      </>
    ),
  },
  {
    title: "Inspect the investigation",
    body: <>Review what is observed, what is known about the product, what is inferred and what is missing. Likely causes are labelled as inferred.</>,
  },
  {
    title: "Review the next test",
    body: <>A next-test plan is a proposal. An engineer accepts, changes or rejects it and decides what is run on the bench or in the chamber.</>,
  },
  {
    title: "Record results when available",
    body: (
      <>
        Record each result against the revision that was actually tested, with its conditions. A completed test is not a confirmed cause; see{" "}
        <A to="observations">Observations and hypotheses</A>.
      </>
    ),
  },
];

const IN_SCOPE = [
  <>Radiated-emissions investigation for connected electronics.</>,
  <>
    Bounded checks under 47 CFR 15.109 for supported inputs. The exact clause and conditions are listed in <A to="coverage">Regulatory coverage</A>.
  </>,
  <>Revision-specific recording of findings, next-test plans and results.</>,
];

const NOT_IN_SCOPE = [
  "Certification, test-lab services or lab booking.",
  "Replacing an accredited test report or a regulatory determination.",
  "All of FCC Part 15 Subpart B. Only the checks listed under coverage are supported.",
  "CISPR 32 / EN 55032, immunity standards and military standards.",
];

export default function Introduction() {
  return (
    <>
      <Lead>
        Crado connects a product revision, its applicable requirements and the evidence used to review an engineering finding. Its initial workflow supports
        radiated-emissions investigation, from report confirmation to a reviewed next-test plan and revision-specific results.
      </Lead>
      <P>
        A test report states what was measured on one device, in one configuration, under recorded conditions. Crado keeps those facts attached to each other,
        so that a later reader can see which revision a result concerns, which requirement it was evaluated against, and what the evaluation relied on.
      </P>

      <H2 id="what-is">What a radiated-emissions investigation is</H2>
      <P>
        Connected electronics radiate unintended electromagnetic energy, often from clocks, switching regulators and cables. A radiated-emissions test measures
        that energy at set distances and frequencies and compares it with the limits in the applicable rule. For unintentional radiators sold in the United
        States, these limits are set out in <A to={ECFR_15_109}>47 CFR 15.109</A>.
      </P>
      <P>
        An investigation begins when a test reports an emission above or close to a limit. The engineering questions that follow are practical: is the reported
        value right, which part of the design is a plausible source, what should be tested next, and does a later measurement on a changed revision actually
        show improvement?
      </P>

      <H2 id="how-it-works">How Crado reaches a result</H2>
      <blockquote className="m-0 mt-2 mb-1 border-y border-line-2 py-7 font-display text-[26px] leading-[1.2] font-medium tracking-[-0.025em] text-balance text-fg sm:text-[34px]">
        Agents investigate. Rules evaluate. Engineers decide.
      </blockquote>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {ROLES.map((r) => (
          <div key={r.label} className="flex flex-col gap-2.5 rounded-card border border-line-2 bg-surface-1 p-5">
            <Mono className="text-accent-text">{r.label}</Mono>
            <H3 variant="card">{r.title}</H3>
            <p className="m-0 text-[14.5px] leading-[1.6] text-pretty text-fg-6">{r.body}</p>
          </div>
        ))}
      </div>
      <P>
        Today the evaluation engine covers 47 CFR 15.109(a) Class B radiated-emission limits for supported inputs. See <A to="coverage">Regulatory coverage</A>.
      </P>

      <H2 id="first-investigation">First investigation</H2>
      <P>An investigation starts from a reported radiated-emissions finding. The sequence below describes the workflow. Screen names in the product may differ.</P>
      <ol className="m-0 flex list-none flex-col border-b border-line-1 p-0">
        {STEPS.map((s, i) => (
          <li key={s.title} className="grid grid-cols-[20px_minmax(0,1fr)] gap-3 border-t border-line-1 py-5">
            <span aria-hidden="true" className="text-right text-base leading-[1.6] text-fg-muted">
              {i + 1}.
            </span>
            <div className="flex flex-col gap-1.5">
              <H3 variant="step">{s.title}</H3>
              <P>{s.body}</P>
            </div>
          </li>
        ))}
      </ol>

      <H2 id="scope">Scope and limitations</H2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-3.5 rounded-card border border-line-2 p-5">
          <Mono className="text-accent-text">IN SCOPE TODAY</Mono>
          <ul className="m-0 flex list-none flex-col gap-3.5 p-0 text-[15px] leading-[1.55] text-fg-3">
            {IN_SCOPE.map((item, i) => (
              <Bullet key={i} filled>
                {item}
              </Bullet>
            ))}
          </ul>
        </div>
        <div className="flex flex-col gap-3.5 rounded-card border border-line-2 p-5">
          <Mono className="text-fg-muted">NOT IN SCOPE</Mono>
          <ul className="m-0 flex list-none flex-col gap-3.5 p-0 text-[15px] leading-[1.55] text-fg-4">
            {NOT_IN_SCOPE.map((item) => (
              <Bullet key={item}>{item}</Bullet>
            ))}
          </ul>
        </div>
      </div>
      <Callout tone="warn" label="LIMITATION">
        Extraction quality depends on the source. Scanned or incomplete reports produce more values that need correction, and some checks cannot run until
        missing conditions are supplied.
      </Callout>
    </>
  );
}
