import { ECFR_15_109, LIMITS_15_109, NOT_COVERED, PIPELINE, POST_CHECKS, REFUSALS } from "@/content/docs-spec";
import { CAPABILITIES, statusOf } from "@/content/capability-status";
import { A, Bullet, H2, H3, Lead, P, Table } from "../ui";
import StatusLabel from "./StatusLabel";

const GLOSSARY: [string, string][] = [
  ["Revision", "A specific physical configuration of a product, including board, firmware, enclosure, cables and operating mode as tested."],
  ["Evidence", "A measurement together with its test conditions and a reference to where it came from."],
  ["Margin", "The limit minus the reading, in dB. A negative margin is over the limit."],
  ["Derived result", "The result the engine derives for a revision from confirmed inputs, signed by an engineer. It is not a certification."],
  ["Blocked comparison", "A comparison the engine will not make because a condition is missing, incompatible or unsupported."],
];

/** /docs/reference with NEXT_PUBLIC_FF_DOCS_SPEC on: the engine pipeline, its checks and replay, coverage and refusals. */
export default function ArithmeticCoverage() {
  return (
    <>
      <Lead>
        Probabilistic models should never calculate regulatory limits or invent compliance verdicts. Crado separates deterministic regulatory arithmetic from
        investigation drafting, and checks every number, sign and citation before it reaches the screen.
      </Lead>

      <P>Each step below runs in deterministic code: the same inputs and rule versions always give the same result.</P>

      <H2 id="pipeline">The engine pipeline</H2>
      <ol className="m-0 flex list-none flex-col gap-5 p-0">
        {PIPELINE.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-1.5">
            <H3 variant="step">{`${String(i + 1).padStart(2, "0")} · ${step.title}`}</H3>
            <P>{step.body}</P>
          </li>
        ))}
      </ol>

      <H2 id="post-checks">Post-generation checks</H2>
      <P>
        The AI step writes investigation notes and next-test options, constrained to the candidate sources the engine matched. Before anything is shown, code
        checks:
      </P>
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-base leading-[1.6] text-fg-4">
        {POST_CHECKS.map((c) => (
          <Bullet key={c} filled className="[&>span:first-child]:mt-[9px]">
            {c}
          </Bullet>
        ))}
      </ul>

      <H2 id="replay">Rule versions and replay</H2>
      <P>Every run records its rule versions and an input hash so an old run can be replayed and give the same result months later.</P>

      <H2 id="coverage">Coverage: 47 CFR 15.109</H2>
      <P>
        The regulatory text is published in the Electronic Code of Federal Regulations at <A to={ECFR_15_109}>47 CFR 15.109</A>, Radiated emission limits.
        Quasi-peak limits in dBµV/m:
      </P>
      <Table
        label="47 CFR 15.109 radiated emission limits"
        minWidth={560}
        monoFirst
        head={["Frequency", "Class B at 3 m, 15.109(a)", "Class A at 10 m, 15.109(b)"]}
        rows={LIMITS_15_109.map((r) => [r.band, <span key="b" className="font-mono text-fg">{r.classB}</span>, <span key="a" className="font-mono">{r.classA}</span>])}
      />
      <P>
        Class B at 3 m, 30 to 1000 MHz, is evaluated today. Class A at 10 m is listed for reference: <StatusLabel capability="fcc15109b" />. At a band edge the
        lower of the two limits applies.
      </P>

      <H2 id="refusals">Refusal rules</H2>
      <P>When an input falls outside the evaluated scope, Crado refuses with a reason rather than guessing.</P>
      <Table
        label="Refusal rules"
        minWidth={560}
        head={["Input", "Why Crado refuses", "Status"]}
        rows={REFUSALS.map((r) => [r.input, r.reason, r.capability ? <span key="s" className="font-mono text-[12px]">{statusOf(r.capability)}</span> : <span key="s">n/a</span>])}
      />

      <H2 id="not-covered">Not covered yet</H2>
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-base leading-[1.6] text-fg-4">
        {NOT_COVERED.map((id) => (
          <Bullet key={id} className="[&>span:first-child]:mt-[9px]">
            {CAPABILITIES[id].name}
            <StatusLabel capability={id} />
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
