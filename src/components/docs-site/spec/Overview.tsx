import { TEST_COUNT, BENCHMARK, TRUTH_STATES } from "@/content/docs-spec";
import { STATE_GLYPH } from "@/content/home-v8";
import { A, H2, Lead, P } from "../ui";

/**
 * /docs with NEXT_PUBLIC_FF_DOCS_SPEC on: the overview index. One short section per part of the specification, with
 * the anchors the homepage footer links to (#epistemic-model, #observed … #missing, #deterministic-arithmetic,
 * #coverage, #validation, #security), each pointing on to the page with the full text.
 */
export default function Overview() {
  return (
    <>
      <Lead>
        Crado is the daily system of record for hardware and regulatory engineers: product facts, component changes, bench and lab measurements and
        regulatory limits, connected across every board revision. This specification says how it labels values, how it does the arithmetic, what it covers,
        how it is validated and how your data is isolated.
      </Lead>

      <H2 id="epistemic-model">The four truth states</H2>
      <P>Every value in Crado carries one of four states. The state is enforced in code, so an estimate can never pass as a measurement.</P>
      <dl className="m-0 flex flex-col border-b border-line-1">
        {TRUTH_STATES.map((t) => (
          <div key={t.state} id={t.overviewId} className="grid scroll-mt-4 grid-cols-1 gap-x-6 gap-y-1.5 border-t border-line-1 py-4 max-sm:scroll-mt-16 sm:grid-cols-[160px_minmax(0,1fr)]">
            <dt className="font-mono text-[13px] text-fg">
              {STATE_GLYPH[t.state]} {t.label}
            </dt>
            <dd className="m-0 text-[15px] leading-[1.6] text-pretty text-fg-4">{t.definition}</dd>
          </div>
        ))}
      </dl>
      <P>
        Full rules, including the no-silent-defaults guarantee and the confirmation boundary: <A to="/docs/concepts">The four truth states</A>.
      </P>

      <H2 id="deterministic-arithmetic">Deterministic arithmetic</H2>
      <P>
        Code does the math. Peak selection, limit evaluation, margins, harmonic correlation and before/after comparisons run in deterministic functions. The AI
        step only writes investigation notes, constrained to the sources the engine matched, and post-generation checks verify every number, sign, harmonic
        ordinal and citation before display. Every run records its rule versions and an input hash, so an old run can be replayed.
      </P>
      <P>
        The pipeline and its checks: <A to="/docs/reference#arithmetic">Deterministic arithmetic and coverage</A>.
      </P>

      <H2 id="coverage">Coverage</H2>
      <P>
        Live today: radiated emissions under 47 CFR 15.109(a), Class B at 3 m, 30 to 1000 MHz, quasi-peak. Inputs outside that scope are refused with a
        reason rather than guessed.
      </P>
      <P>
        Limit tables, refusal rules and what is on the roadmap: <A to="/docs/reference#coverage">Coverage: 47 CFR 15.109</A>.
      </P>

      <H2 id="validation">Validation</H2>
      <P>
        {TEST_COUNT}, and {BENCHMARK}.
      </P>
      <P>
        Suites, method and what is not yet measured: <A to="/docs/evaluation">Validation</A>.
      </P>

      <H2 id="security">Security</H2>
      <P>
        Each customer works in an isolated workspace. Crado does not use your schematics, product facts or test reports to train models for other customers,
        and the public precedent library holds only public regulatory filings.
      </P>
      <P>
        Isolation, data handling and engineer authority: <A to="/docs/trust">Security and workspace isolation</A>.
      </P>
    </>
  );
}
