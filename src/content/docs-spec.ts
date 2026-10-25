/**
 * Facts the docs specification (NEXT_PUBLIC_FF_DOCS_SPEC) states, kept in one place so the overview, the detail pages
 * and the homepage say the same thing. Statuses come from capability-status.ts; the test count and benchmark are the
 * owner-verified figures from the Oct 18 2026 engine audit (src/content/home-v8.ts).
 */
import type { CapabilityId } from "./capability-status";
import type { EvidenceState } from "./home-v8";

export { BENCHMARK, TEST_COUNT } from "./home-v8";

/** The audit the published figures come from. */
export const AUDIT_DATE = "18 Oct 2026";

export const ECFR_15_109 = "https://www.ecfr.gov/current/title-47/chapter-I/subchapter-A/part-15/subpart-B/section-15.109";

export interface TruthState {
  state: EvidenceState;
  /** Heading id on /docs/concepts. */
  id: string;
  /** Anchor on the /docs overview (the homepage footer deep-links to it). */
  overviewId: string;
  label: string;
  title: string;
  definition: string;
  rules: string[];
  example: string;
}

export const TRUTH_STATES: TruthState[] = [
  {
    state: "observed",
    id: "state-observed",
    overviewId: "observed",
    label: "OBSERVED",
    title: "Observed: read from a measurement or document",
    definition: "A value read directly from a measurement table or document, with the page and row it came from.",
    rules: [
      "Only raw readings are observed: frequency, level, detector, distance and polarization as the report states them.",
      "Limits, margins and before/after deltas are never observed. The engine calculates them, so they are inferred.",
      "An observed value keeps its provenance (document, page and row) for as long as it exists.",
    ],
    example: "200.0 MHz · 47.6 dBµV/m QP @ 3 m · p.6",
  },
  {
    state: "known",
    id: "state-known",
    overviewId: "known",
    label: "KNOWN",
    title: "Known: confirmed by an engineer",
    definition: "A fact an engineer has confirmed on a specific product revision.",
    rules: [
      "Nothing extracted from a report or datasheet becomes known until a person confirms it.",
      "A known fact belongs to one revision. A new revision does not inherit confirmation silently; the change is recorded.",
      "Known facts are what the engine correlates against: clocks, radios, converters and the stated test setup.",
    ],
    example: "Y1 · 40.000 MHz XO (MCU clock) · Rev 17",
  },
  {
    state: "inferred",
    id: "state-inferred",
    overviewId: "inferred",
    label: "INFERRED",
    title: "Inferred: derived by the engine, with its reasoning",
    definition: "A value or hypothesis the engine derives from observed and known inputs, shown with the rule and inputs behind it.",
    rules: [
      "Limits, margins, harmonic matches and before/after deltas are inferred.",
      "Investigation hypotheses are inferred and bounded to the candidate sources the engine matched.",
      "Where a convention is assumed, such as Class B for an unstated class, it is shown as inferred and marked to confirm.",
    ],
    example: "Margin −4.1 dB against 43.5 dBµV/m",
  },
  {
    state: "missing",
    id: "state-missing",
    overviewId: "missing",
    label: "MISSING",
    title: "Missing: a parameter nobody supplied",
    definition: "An input the evaluation needs that is not in the record. It is shown as missing, never guessed.",
    rules: [
      "Unstated detector modes, distances, classes or radiator types are surfaced explicitly.",
      "A missing input blocks the result that depends on it rather than defaulting silently.",
      "Supplying the value (and confirming it) turns it into a known fact on that revision.",
    ],
    example: "Radiator type not confirmed",
  },
];

/** The steps of the engine pipeline, in order (plain words; no internal module names). */
export const PIPELINE: { title: string; body: string }[] = [
  { title: "Peak selection", body: "Identifies the declared or sole failing peak in a measurement table, without guessing or defaulting to the first row." },
  {
    title: "Limit evaluation",
    body: "Looks up the 47 CFR 15.109(a) limit for the reading's frequency, class and distance. At a band edge (88, 216 and 960 MHz) the lower of the two limits applies.",
  },
  { title: "Margin", body: "The limit minus the reading, to 0.1 dB, reported with its sign: a negative margin is over the limit." },
  {
    title: "Harmonic correlation",
    body: "Matches the peak against the revision's known clocks, radios and converters (f = N × f0, N up to 25) and reports the frequency difference for each candidate.",
  },
  {
    title: "Measurement comparison",
    body: "Compares a before and an after reading only when the 7 setup conditions match, including detector, distance, antenna polarization and class, with a frequency tolerance of ±0.5 MHz.",
  },
];

/** What the post-generation checks verify in investigation notes before they are shown. */
export const POST_CHECKS: string[] = [
  "Number provenance: every number in the notes must come from the run's inputs or results; unsourced numbers are hidden.",
  "Margin sign: a stated margin must have the sign the engine calculated.",
  "Harmonic ordinal: a stated harmonic must match the engine's N for that source.",
  "Citations: every cited clause and document must be one the run used.",
  "Certainty language: claims of certainty, verdicts and definitive causes are dropped.",
];

export interface LimitRow {
  band: string;
  classB: string;
  classA: string;
}

/** 47 CFR 15.109 radiated emission limits, quasi-peak, in dBµV/m (Class B at 3 m from (a), Class A at 10 m from (b)). */
export const LIMITS_15_109: LimitRow[] = [
  { band: "30–88 MHz", classB: "40.0", classA: "39.1" },
  { band: "88–216 MHz", classB: "43.5", classA: "43.5" },
  { band: "216–960 MHz", classB: "46.0", classA: "46.4" },
  { band: "960–1000 MHz", classB: "54.0", classA: "49.5" },
];

/** Inputs Crado refuses to evaluate, and why: refusing is safer than guessing. */
export const REFUSALS: { input: string; reason: string; capability?: CapabilityId }[] = [
  { input: "A detector other than quasi-peak", reason: "The 15.109(a) table is a quasi-peak limit; converting a peak or average reading would be a guess.", capability: "detectorConversion" },
  { input: "A measurement distance other than 3 m", reason: "Extrapolating a reading to 3 m depends on assumptions the report does not state.", capability: "distanceExtrapolation" },
  { input: "A frequency above 1 GHz", reason: "Radiated emissions above 1 GHz use different limits and detectors.", capability: "radiatedAbove1GHz" },
  { input: "An unstated class or detector", reason: "The input is surfaced as missing (or, for class, inferred and marked to confirm) instead of defaulting silently." },
];

/** Not covered yet, each with its status from capability-status.ts. */
export const NOT_COVERED: CapabilityId[] = ["fcc15109b", "fcc15107", "radiatedAbove1GHz", "detectorConversion", "distanceExtrapolation", "cispr32", "bomIntake"];

export const TEST_SUITES = ["golden", "band-edge", "500-case property", "pinned-replay"];
