import { AUDIT_DATE, BENCHMARK, TEST_COUNT, TEST_SUITES } from "@/content/docs-spec";
import { H2, Lead, P } from "../ui";

/** /docs/evaluation with NEXT_PUBLIC_FF_DOCS_SPEC on: how the engine is tested and benchmarked. Figures as of the audit. */
export default function Validation() {
  return (
    <>
      <Lead>
        Figures on this page are from the engine audit of {AUDIT_DATE}. They describe the deterministic engine; they are not a claim that any product will
        pass a test.
      </Lead>

      <H2 id="test-suite">Test suite</H2>
      <P>
        {TEST_COUNT}, including {TEST_SUITES.slice(0, -1).join(", ")} and {TEST_SUITES[TEST_SUITES.length - 1]} suites. The pinned-replay suite re-runs
        recorded inputs against their recorded rule versions and checks the result is unchanged.
      </P>

      <H2 id="public-benchmark">Public FCC report benchmark</H2>
      <P>
        {BENCHMARK}. A comparable reading is one whose report states the frequency, level, detector, distance and class the 47 CFR 15.109(a) evaluation needs.
      </P>

      <H2 id="not-yet-measured">Not yet measured</H2>
      <P>
        How often the top-ranked likely cause turns out to be the confirmed one is being evaluated with pilot teams. No figure is published until that
        evaluation is complete.
      </P>
    </>
  );
}
