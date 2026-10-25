import { TRUTH_STATES } from "@/content/docs-spec";
import { STATE_GLYPH } from "@/content/home-v8";
import { Bullet, H2, Lead, Mono, P } from "../ui";

/** /docs/concepts with NEXT_PUBLIC_FF_DOCS_SPEC on: the four truth states and the rules that enforce them. */
export default function TruthStates() {
  return (
    <>
      <Lead>
        Compliance records fall apart when estimates pass as measurements. Crado gives every value one of four states and enforces them in code: it never
        guesses a missing parameter and never promotes an unconfirmed extraction to fact.
      </Lead>

      {TRUTH_STATES.map((t) => (
        <section key={t.state} className="flex flex-col gap-4">
          <H2 id={t.id}>{t.title}</H2>
          <P>{t.definition}</P>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0 text-base leading-[1.6] text-fg-4">
            {t.rules.map((r) => (
              <Bullet key={r} filled className="[&>span:first-child]:mt-[9px]">
                {r}
              </Bullet>
            ))}
          </ul>
          <span className="flex items-baseline gap-2">
            <Mono>EXAMPLE</Mono>
            <span className="font-mono text-[13px] text-fg-2">
              {STATE_GLYPH[t.state]} {t.example}
            </span>
          </span>
        </section>
      ))}

      <H2 id="no-silent-defaults">No silent defaults</H2>
      <P>
        When an input the evaluation needs is not in the record, Crado shows it as missing and blocks the result that depends on it. Where a convention is
        reasonable, such as Class B for a product whose class is unstated, the assumption is shown as inferred and marked to confirm, so a person sees it
        before relying on the result.
      </P>

      <H2 id="confirmation-boundary">The confirmation boundary</H2>
      <P>
        Extraction and engine output stop at inferred. Only a person moves a value to known: an engineer confirms product facts and setup parameters on the
        revision they belong to, records the hardware change that creates the next revision, evaluates the retest delta and signs the derived result. The
        derived result is not a certification; measurement, judgement and certification stay with your engineers and accredited laboratories.
      </P>
    </>
  );
}
