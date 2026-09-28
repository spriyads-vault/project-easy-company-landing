import { Article, Callout, DocLink, ECFR_15_109, H1, H2, H2_SUB, H3, LEAD, LIST, P, Section } from "../ui";

const LAYERS = [
  {
    color: "bg-lilac",
    name: "Model-assisted interpretation",
    text: "Models help interpret source material and propose candidate explanations during an investigation. Their output is treated as a proposal until confirmed. Report values are proposed from the report text and confirmed by an engineer before use.",
  },
  {
    color: "bg-slate-mid",
    name: "Deterministic evaluation",
    text: "Versioned rules evaluate confirmed inputs. The same inputs and rule version produce the same result. A rule runs only when its required inputs are present.",
  },
  {
    color: "bg-lime",
    name: "Engineering review",
    text: "Engineers confirm extracted values, challenge interpretations and decide the physical next step.",
  },
];

const STEPS: [string, React.ReactNode][] = [
  [
    "Identify the product and revision",
    "Name the product and the revision that was tested. Evidence is recorded against this revision and does not transfer automatically to others.",
  ],
  [
    "Provide an authorized report",
    "Supply a test report you are permitted to share. During a pilot, the reports and data in scope are agreed in advance.",
  ],
  [
    "Confirm extracted values",
    <>
      Check the frequency, level, detector, distance, polarization and reported limit and margin against the source.
      Correct or reject anything that does not match. See <DocLink to="report-confirmation">Report confirmation</DocLink>.
    </>,
  ],
  [
    "Inspect the investigation",
    "Review what is observed, what is known about the product, what is inferred and what is missing. Candidate explanations are labelled as inferred.",
  ],
  [
    "Review the next test",
    "A next-test plan is a proposal. An engineer accepts, changes or rejects it and decides what is run on the bench or in the chamber.",
  ],
  [
    "Record results when available",
    <>
      Record each result against the revision that was actually tested, with its conditions. A completed test is not a
      confirmed cause; see <DocLink to="observations-and-hypotheses">Observations and hypotheses</DocLink>.
    </>,
  ],
];

export default function GetStarted() {
  return (
    <Article kicker="GET STARTED">
      <Section id="introduction" title="Introduction">
        <h1 className={H1}>Introduction</h1>
        <p className={LEAD}>
          Crado connects a product revision, its applicable requirements and the evidence used to review an engineering
          finding. Its initial workflow supports radiated-emissions investigation, from report confirmation to a
          reviewed next-test plan and revision-specific results.
        </p>
        <p className={P}>
          A test report states what was measured on one device, in one configuration, under recorded conditions. Crado
          keeps those facts attached to each other, so that a later reader can see which revision a result concerns,
          which requirement it was evaluated against, and what the evaluation relied on.
        </p>
        <h2 id="radiated-emissions-investigation" className={H2_SUB}>
          What a radiated-emissions investigation is
        </h2>
        <p className={P}>
          Connected electronics radiate unintended electromagnetic energy, often from clocks, switching regulators and
          cables. A radiated-emissions test measures that energy at set distances and frequencies and compares it with
          the limits in the applicable rule. For unintentional radiators sold in the United States, these limits are set
          out in{" "}
          <a href={ECFR_15_109} rel="noopener">
            47 CFR 15.109
          </a>
          .
        </p>
        <p className={P}>
          An investigation begins when a test reports an emission above or close to a limit. The engineering questions
          that follow are practical: is the reported value right, which part of the design is a plausible source, what
          should be tested next, and does a later measurement on a changed revision actually show improvement?
        </p>
        <h2 id="how-crado-works" className={H2_SUB}>
          How the work is divided
        </h2>
        <p className={P}>Crado uses three layers, each with a defined responsibility.</p>
        <div className="border-t border-ink">
          {LAYERS.map((l) => (
            <div
              key={l.name}
              className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-x-6 gap-y-1.5 border-b border-line py-4"
            >
              <span className="flex items-center gap-2.5 text-base font-semibold">
                <span aria-hidden="true" className={`size-3 flex-none border border-ink ${l.color}`} />
                {l.name}
              </span>
              <span className="text-base leading-[1.6]">{l.text}</span>
            </div>
          ))}
        </div>
        <p className="m-0 mt-6 text-[17px] leading-[1.7]">
          Models do not produce pass or fail results. Evaluation results come from rules applied to confirmed values,
          and the decisions that follow belong to engineers.
        </p>
      </Section>

      <Section id="first-investigation" title="First investigation">
        <h2 className={H2}>First investigation</h2>
        <p className="m-0 mb-6 text-[17px] leading-[1.7]">
          An investigation starts from a reported radiated-emissions finding. The sequence below describes the workflow.
          Screen names in the product may differ.
        </p>
        <ol className="m-0 list-none p-0">
          {STEPS.map(([title, text], i) => (
            <li
              key={title}
              className={`grid grid-cols-[48px_minmax(0,1fr)] gap-x-3 border-t border-line py-[18px] ${
                i === STEPS.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="pt-[3px] font-mono text-sm">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="m-0 mb-1.5 text-lg font-semibold">{title}</h3>
                <p className="m-0 text-base leading-[1.65]">{text}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="scope-and-limitations" title="Scope and limitations">
        <h2 className={H2}>Scope and limitations</h2>
        <h3 className={`${H3} text-lg`}>In scope today</h3>
        <ul className={LIST}>
          <li>Radiated-emissions investigation for connected electronics.</li>
          <li>
            Bounded checks under 47 CFR 15.109 for supported inputs. The exact clause and conditions are listed in{" "}
            <DocLink to="regulatory-coverage">Regulatory coverage</DocLink>.
          </li>
          <li>Revision-specific recording of findings, next-test plans and results.</li>
        </ul>
        <h3 className={`${H3} text-lg`}>Not in scope</h3>
        <ul className={LIST}>
          <li>Certification, test-lab services or lab booking.</li>
          <li>Replacing an accredited test report or a regulatory determination.</li>
          <li>All of FCC Part 15 Subpart B. Only the checks listed under coverage are supported.</li>
          <li>CISPR 32 / EN 55032, immunity standards and military standards.</li>
        </ul>
        <Callout label="LIMITATION">
          Extraction quality depends on the source. Scanned or incomplete reports produce more values that need
          correction, and some checks cannot run until missing conditions are supplied.
        </Callout>
      </Section>
    </Article>
  );
}
