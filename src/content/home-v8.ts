/**
 * Homepage v8 copy, from Claude Design "Crado_Landing_v8.dc.html" and the owner's institutional brief (SCRUM-TBD), with
 * the owner's approved copy decisions: no workspace sign-up (the existing waitlist instead), statuses only from
 * capability-status.ts, "derived result at signing, not a certification" instead of "compliance state/statement", no
 * invented lab name, no em dashes, no internal module names. The page, its FAQPage JSON-LD and llms.txt all render
 * from these lists.
 */
import { BOOKING_URL, CONTACT_EMAIL, LINKEDIN_URL } from "@/lib/site";
import { DOCS_SPEC } from "@/lib/flags";
import { CAPABILITIES, statusOf, type CapabilityId } from "./capability-status";
import { type FaqEntry } from "./home-v6";

export const V8_H1 = "Continuous verification for physical hardware.";
export const V8_TITLE = "Crado | Continuous verification for physical hardware";
/** Meta description (under 160 characters), from the hero intro. */
export const V8_DESCRIPTION =
  "Crado connects hardware facts, component changes, lab measurements and regulatory limits across every board revision, from schematic fact to signed result.";

/** Section ids on the page (header, footer and legacy anchors point at these). */
export const IDS = {
  productGraph: "product-graph",
  continuity: "continuity",
  workflow: "workflow",
  engine: "engine",
  capabilities: "capabilities",
  faq: "faq",
  getStarted: "get-started",
  sample: "sample-case",
} as const;

export const HERO = {
  eyebrow: "CONTINUOUS COMPLIANCE & REVISION VERIFICATION",
  h1: V8_H1,
  /** The brief's subhead, with its em dash and "signed compliance statement" replaced as approved. */
  intro:
    "Requirement tools stop at the text of a standard. Crado connects your living hardware architecture, component changes, lab measurements and regulatory limits across every board revision, from first schematic fact to the derived result an engineer signs.",
  /** Goes to the waitlist (#get-started): there is no product sign-up on this site. */
  primary: "Start with a product or report",
  secondary: "Inspect the Gateway X revision thread →",
  scroll: "Scroll to explore",
} as const;

/** The four evidence states. Glyphs and their colours are part of the design's evidence model. */
export type EvidenceState = "observed" | "known" | "inferred" | "missing";

export const STATE_GLYPH: Record<EvidenceState, string> = { observed: "●", known: "✓", inferred: "≈", missing: "○" };

export const STATE_LABEL: Record<EvidenceState, string> = { observed: "OBSERVED", known: "KNOWN", inferred: "INFERRED", missing: "MISSING" };

/** The legend under the hero artifact, one line per state. */
export const STATE_LEGEND: { state: EvidenceState; text: string }[] = [
  { state: "observed", text: "Read from measurement or document" },
  { state: "known", text: "Confirmed by an engineer" },
  { state: "inferred", text: "Derived by engine with reasoning" },
  { state: "missing", text: "Unsupplied parameter (never guessed)" },
];

export interface DiagramRow {
  state?: EvidenceState;
  text: string;
}

/**
 * Hero artifact: product memory on Rev 17, the engine's evaluation, and the Rev 18 retest. Sample data (Gateway X), the
 * same numbers as the sample case below. Limits, margins and deltas are INFERRED, never OBSERVED.
 */
export const DIAGRAM = {
  caption: "Product memory → deterministic checks → verified revision continuity",
  captionShort: "Product memory → checks → revision continuity",
  facts: {
    title: "Living Product Memory (Gateway X · Rev 17)",
    rows: [
      { state: "known", text: "Y1 · 40.000 MHz XO (MCU clock)" },
      { state: "known", text: "U3 · 1.2 MHz buck converter" },
      { state: "observed", text: "200.0 MHz · 47.6 dBµV/m QP @ 3 m" },
    ] as DiagramRow[],
  },
  engine: {
    title: "Deterministic Verification Engine",
    rows: [
      { state: "inferred", text: "47 CFR §\u00a015.109(a) Class B limit: 43.5 dBµV/m" },
      { state: "inferred", text: "Margin: −4.1 dB (4.1 dB over stated limit)" },
      { state: "inferred", text: "5th harmonic match to Y1 (40.000 MHz × 5, Δf = 0.00%)" },
      { state: "missing", text: "Radiator type not confirmed" },
    ] as DiagramRow[],
  },
  record: {
    title: "Verified Revision Continuity (Rev 17 → Rev 18)",
    rows: [
      { state: "known", text: "Change recorded on Rev 18: 22 Ω series damping on Y1 clock line" },
      { state: "observed", text: "Retest @ 200.0 MHz: 39.8 dBµV/m QP @ 3 m" },
      { state: "inferred", text: "Before/after delta: −7.8 dB (7/7 setup conditions matched)" },
    ] as DiagramRow[],
    derived: "Derived state: Ready for engineer sign-off",
  },
  loop: "Rev 18 retest · before / after delta",
};

export const GAP = {
  h2: "Hardware teams move fast.",
  h2Muted: "The compliance trail breaks on every rev.",
  before: {
    label: "Static checklists and scattered files",
    body: "Requirements live in one tool, schematic and clock facts live in another, and lab PDFs sit in email threads. When a switching regulator or crystal changes on Rev 17, nobody sees which margins shifted or which prior measurements are invalidated until the next lab run.",
  },
  after: {
    label: "Living revision memory in Crado",
    /** Rendered with the KNOWN, OBSERVED and INFERRED glyphs between the parts. */
    parts: [
      "Product facts (",
      "), empirical readings (",
      ") and clause evaluations (",
      ") stay bound to the exact hardware revision. When the board changes or a new scan arrives, Crado re-evaluates limits against the active revision and preserves the audit trail.",
    ],
  },
};

/** The sample case (design: workbench). Every value here is sample data, and the case is labelled "Sample case". */
export const SAMPLE = {
  label: "Sample case",
  product: "Gateway X",
  revision: "Rev 17",
  report: "NCL-26-1041-RE",
  verdict: { over: "−4.1 dB margin", clause: "§15.109(a)" },
  assumptions: [
    { state: "observed", text: "3 m · p.6" },
    { state: "observed", text: "Quasi-peak · p.6" },
    { state: "observed", text: "Horizontal · p.6" },
    { state: "inferred", text: "Class B · default, to confirm" },
    { state: "inferred", text: "43.5 dBµV/m · 88–216 MHz" },
  ] as { state: EvidenceState; text: string }[],
  chartTitle: "Radiated emissions · 30–960 MHz · QP",
  chartLabel: "Observed peaks against the Class B limit (40.0, 43.5 and 46.0 dBµV/m, band edges at 88 and 216 MHz) with the 40 MHz harmonic comb",
  legend: { peak: "observed peak", comb: "40 MHz comb", limit: "Class B limit" },
  causesTitle: "Ranked causes",
  causesStatus: ["Checking clock harmonics", "Matching Y1 40.000 MHz XO", "investigation priorities · 200.0 MHz"],
  causes: [
    {
      rank: "1",
      title: "5th harmonic of Y1 40.000 MHz = 200.0 MHz",
      priority: "High priority",
      chips: [
        { state: "inferred", text: "Δf = 0.00%" },
        { state: "known", text: "Y1 · 40.000 MHz XO (MCU clock)" },
        { state: "observed", text: "N=3 120.0 · N=7 280.0 · p.6" },
      ] as { state: EvidenceState; text: string }[],
    },
    {
      rank: "2",
      title: "U3 · 1.2 MHz buck switching noise",
      priority: "Low priority",
      note: "Broadband switching noise, not a narrow peak; unlikely at 200.0 MHz.",
      chips: [{ state: "known", text: "U3 · 1.2 MHz buck converter" }] as { state: EvidenceState; text: string }[],
    },
  ],
  missing: { label: "Missing:", text: "Radiator type not confirmed" },
  bench: { label: "Bench test:", text: "Fit 22 Ω series damping on the Y1 clock line and retest at 200.0 MHz." },
  pdf: {
    file: "NCL-26-1041-RE.pdf",
    page: "p.6",
    /** Was "Northfield Compliance" in the design: no invented lab name. */
    lab: "Sample lab report",
    meta: "Gateway X · Rev 17 · tested 2026-10-08",
    setup: "Radiated emissions · 3 m · quasi-peak · horizontal",
    head: ["Frequency (MHz)", "QP (dBµV/m)"],
    rows: [
      ["120.0", "38.1"],
      ["200.0", "47.6"],
      ["280.0", "41.0"],
    ],
    limit: { label: "INFERRED · limit §15.109(a)", value: "43.5 dBµV/m" },
    margin: { label: "INFERRED · margin", value: "−4.1 dB" },
  },
  provenance: [
    { state: "observed", text: "200.0 MHz · 47.6 dBµV/m read from p.6" },
    { state: "inferred", text: "INFERRED · −4.1 dB margin against 43.5 dBµV/m, calculated" },
  ] as { state: EvidenceState; text: string }[],
};

/** Workbench chart geometry (design: WB), in the 680 × 244 viewBox. Log frequency axis 30–960 MHz, 20–55 dBµV/m. */
const X0 = 48;
const X1 = 664;
const Y0 = 24;
const Y1 = 214;
const fx = (f: number) => +(X0 + ((Math.log10(f) - Math.log10(30)) / (Math.log10(960) - Math.log10(30))) * (X1 - X0)).toFixed(1);
const dy = (d: number) => +(Y1 - ((d - 20) / 35) * (Y1 - Y0)).toFixed(1);

export const CHART = {
  x0: X0,
  x1: X1,
  y0: Y0,
  y1: Y1,
  grid: [30, 40, 50].map((d) => ({ y: dy(d), label: String(d) })),
  comb: Array.from({ length: 24 }, (_, i) => i + 1).map((n) => ({ x: fx(40 * n), strong: [3, 5, 7].includes(n), label: [3, 5, 7].includes(n) ? `N=${n}` : "" })),
  peaks: [
    { x: fx(120), y: dy(38.1), hot: false, label: "120.0 · 38.1", t: 1450 },
    { x: fx(200), y: dy(47.6), hot: true, label: "", t: 1850 },
    { x: fx(280), y: dy(41.0), hot: false, label: "280.0 · 41.0", t: 1650 },
  ],
  limit: `M${fx(30)} ${dy(40)} H${fx(88)} V${dy(43.5)} H${fx(216)} V${dy(46)} H${fx(960)}`,
  /** The 15.109(a) Class B step values, written on each step of the limit line. */
  limitLabels: [
    { x: fx(52), y: dy(40) - 5, label: "40.0" },
    { x: fx(92), y: dy(43.5) - 5, label: "43.5" },
    { x: fx(600), y: dy(46) - 5, label: "46.0" },
  ],
  xLabels: [
    { x: fx(30), anchor: "start", label: "30" },
    { x: fx(88), anchor: "middle", label: "88" },
    { x: fx(216), anchor: "middle", label: "216" },
    { x: fx(960), anchor: "end", label: "960 MHz" },
  ] as { x: number; anchor: "start" | "middle" | "end"; label: string }[],
  hot: { x: fx(200), y: dy(47.6), limitY: dy(43.5), delta: "≈ −4.1 dB", label: "200.0 MHz · 47.6 dBµV/m" },
};

/** Engine pulse dots over the dot map (design: PULSE), viewBox 360 × 139.5, with their delays in ms. */
export const PULSE = (
  [
    [182.25, 38.25, 32], [186.75, 38.25, 32], [191.25, 38.25, 33], [173.25, 42.75, 28], [177.75, 42.75, 27], [195.75, 42.75, 31],
    [182.25, 47.25, 23], [186.75, 47.25, 23], [173.25, 51.75, 19], [177.75, 51.75, 18], [182.25, 51.75, 18], [186.75, 51.75, 19],
    [191.25, 51.75, 21], [200.25, 51.75, 27], [168.75, 56.25, 18], [191.25, 56.25, 18], [195.75, 56.25, 21], [200.25, 56.25, 24],
    [204.75, 56.25, 28], [164.25, 60.75, 18], [195.75, 60.75, 18], [200.25, 60.75, 22], [204.75, 60.75, 26], [164.25, 65.25, 16],
    [195.75, 65.25, 16], [200.25, 65.25, 21], [204.75, 65.25, 25], [200.25, 69.75, 20], [204.75, 69.75, 25], [209.25, 69.75, 29],
    [195.75, 74.25, 16], [200.25, 74.25, 21], [204.75, 74.25, 25], [195.75, 78.75, 18], [200.25, 78.75, 22], [204.75, 78.75, 26],
    [191.25, 83.25, 18], [195.75, 83.25, 21], [200.25, 83.25, 24], [191.25, 87.75, 21], [195.75, 87.75, 24], [200.25, 87.75, 27],
    [195.75, 92.25, 27],
  ] as const
).map(([x, y, r]) => ({ x, y, t: Math.round(650 + (r - 16) * 14) }));

export const CONTINUITY = {
  h2: "Every assumption is labeled. Every number traces to its source.",
  body: "Compliance records fall apart when estimates masquerade as measurements. Crado enforces a strict four state epistemic model in code, never guessing a missing parameter and never promoting an unconfirmed extraction to fact.",
  states: [
    {
      state: "observed",
      label: "OBSERVED",
      title: "Raw Evidence",
      body: "Read directly from a measurement table or document with page and row provenance.",
      example: "200.0 MHz · 47.6 dBµV/m QP @ 3 m · p.6",
    },
    {
      state: "known",
      label: "KNOWN",
      title: "Engineer-Confirmed Fact",
      body: "Hardware architecture and setup parameters explicitly confirmed by your team on the active revision.",
      example: "Y1 · 40.000 MHz XO (MCU clock) · Rev 17",
    },
    {
      state: "inferred",
      label: "INFERRED",
      title: "Engine-Derived",
      body: "Calculated limit margins, harmonic correlations and bounded investigation hypotheses with visible reasoning.",
      example: "Margin −4.1 dB against 43.5 dBµV/m",
    },
    {
      state: "missing",
      label: "MISSING",
      title: "Unsupplied Context",
      body: "Unstated detector modes, distances or radiator types surfaced explicitly so nothing defaults silently.",
      example: "Radiator type not confirmed",
    },
  ] as { state: EvidenceState; label: string; title: string; body: string; example: string }[],
};

export const WORKFLOW = {
  /** "signed state" in the brief; "signed result" as approved (never "compliance state"). */
  h2: "One continuous thread from first measurement to signed result.",
  /** Design had an em dash after "bench"; a full stop instead (approved). */
  body: "Built for how hardware teams work every day at the bench. And how compliance leads sign off at the chamber gate.",
  steps: [
    { n: "01", title: "Product & measurement intake", body: "Record product facts on Rev 17, drop a lab report or type a single reading. Crado isolates the critical reading and evaluates it against the 15.109(a) limit." },
    { n: "02", title: "Physical source correlation", body: "Match frequencies against confirmed clocks, radios and converters, then rank investigation hypotheses with cited evidence." },
    { n: "03", title: "Engineering change (Rev 17 → Rev 18)", body: "Record the board or component modification to create the next revision." },
    { n: "04", title: "Retest delta & signing", body: "Compare before and after readings across all 7 setup conditions, close the case and sign the derived result. It is not a certification." },
  ],
};

export const METHOD = {
  h2: "Code does the math. AI writes the investigation notes. Engineers own the decision.",
  body: "Probabilistic models should never calculate regulatory limits or invent compliance verdicts. Crado separates deterministic regulatory arithmetic from investigation drafting and checks every number, sign and citation before it reaches the screen.",
  cards: [
    {
      tag: "01 · CODE",
      title: "Deterministic Code",
      body: "Deterministic functions select the critical peak, evaluate the 47 CFR §\u00a015.109(a) limit and its band edges, match harmonics against product sources and check 7-condition retest eligibility. Every run records its rule versions and an input hash so an old run can be replayed.",
    },
    {
      tag: "02 · NOTES",
      title: "Policied Investigation Notes",
      body: "Investigation hypotheses are constrained strictly to candidate sources found by the engine. Post-generation checks verify every number, margin sign, harmonic ordinal and citation. They hide unsourced numbers and drop certainty claims automatically.",
    },
    {
      tag: "03 · ENGINEER",
      title: "Engineer Authority",
      body: "Nothing extracted from a document becomes ✓ KNOWN until an engineer confirms it. Engineers record the hardware fix, evaluate the retest delta and sign the derived result, which is not a certification.",
    },
  ],
};

export type CapabilityCategory = "engine" | "workflow" | "governance";

export const CATEGORY_LABEL: Record<CapabilityCategory, string> = { engine: "Engine", workflow: "Workflow", governance: "Governance" };

export interface LedgerRow {
  title: string;
  body: string;
  category: CapabilityCategory;
  /** Its status comes from capability-status.ts, never from here. */
  capability: CapabilityId;
  /** Where "Learn more" goes. */
  href: string;
  /** The small evidence card on wide screens (decorative). */
  token: { label: string; state?: EvidenceState; value: string };
}

export const CAPABILITIES_SECTION = {
  h2: "Built for rigorous EMC and regulatory engineering.",
  body: "Every inspection layer records its rule versions and an input hash, so an old run can be replayed.",
  filterLabel: "Filter capabilities",
  all: "All",
  learnMore: "Learn more",
};

/** "Learn more" targets: the matching specification section with the docs spec on, the current docs pages otherwise. */
const LEARN = DOCS_SPEC
  ? { engine: "/docs/reference#pipeline", coverage: "/docs/reference#coverage", workflow: "/docs/concepts", security: "/docs/trust" }
  : { engine: "/docs/evaluation", coverage: "/docs/reference", workflow: "/docs/concepts", security: "/docs/trust" };

export const LEDGER: LedgerRow[] = [
  {
    title: "Worst-Margin Peak Selection",
    body: "Identifies declared or sole failing peaks without guessing or defaulting to the first table row.",
    category: "engine",
    capability: "emcInvestigator",
    href: LEARN.engine,
    token: { label: "worst peak · p.6", state: "observed", value: "200.0 MHz · 47.6" },
  },
  {
    title: "FCC 15.109(a) Limit & Band-Edge Evaluator",
    body: "Evaluates Class B quasi-peak limits at 3 m from 30 to 1000 MHz, applying the tighter limit exactly at each band edge.",
    category: "engine",
    capability: "emcInvestigator",
    href: LEARN.engine,
    token: { label: "§15.109(a) · Class B", state: "inferred", value: "43.5 dBµV/m · 88–216" },
  },
  {
    title: "FCC 15.109(b) Class A Evaluator",
    body: "Class A quasi-peak limits at 10 m.",
    category: "engine",
    capability: "fcc15109b",
    href: LEARN.coverage,
    token: { label: "§15.109(b) · Class A", state: "missing", value: "10 m" },
  },
  {
    title: "Harmonic Source Correlator",
    body: "Matches failing peaks against board clocks, radios, and switching converters up to N = 25, flagging each candidate as consistent with the source.",
    category: "engine",
    capability: "emcInvestigator",
    href: LEARN.engine,
    token: { label: "rule · f = N × f0", state: "inferred", value: "5 × 40.000 MHz = 200.0" },
  },
  {
    title: "Ranked Investigation Hypotheses",
    body: "Synthesizes candidate mechanisms, missing setup context, and recommended bench checks while stripping any unverified numbers or certainty claims.",
    category: "workflow",
    capability: "emcInvestigator",
    href: LEARN.workflow,
    token: { label: "priority 1 · High", state: "inferred", value: "5th harmonic of Y1" },
  },
  {
    title: "Single Bench Reading",
    body: "Type a single reading from the bench instead of uploading a full lab report.",
    category: "workflow",
    capability: "singleReading",
    href: LEARN.workflow,
    token: { label: "bench · typed", state: "observed", value: "200.0 MHz · 47.6" },
  },
  {
    title: "BOM Intake",
    body: "Import a bill of materials to fill in the clocks, radios and converters on a revision.",
    category: "workflow",
    capability: "bomIntake",
    href: LEARN.workflow,
    token: { label: "BOM · import", state: "missing", value: "Rev 18 parts" },
  },
  {
    title: "7-Condition Retest Parity Check",
    body: "Verifies that detector, distance, antenna polarity, class, and frequency tolerance (±0.5 MHz) match before calculating a before/after dB delta.",
    category: "workflow",
    capability: "changeAndRetest",
    href: LEARN.engine,
    token: { label: "Rev 17 → Rev 18 · same setup", state: "observed", value: "3 m · QP · horizontal" },
  },
  {
    title: "Revision Engineering Change Ledger",
    body: "Records what changed and where between Revision N and Revision N+1, preserving design rationale across board spins.",
    category: "workflow",
    capability: "changeAndRetest",
    href: LEARN.workflow,
    token: { label: "change", state: "known", value: "EC-01 → Rev 18" },
  },
  {
    title: "Derived Result at Signing",
    body: "Records each revision's derived result (Conforming, Non-conforming or Not proven) from confirmed requirements and verified margins when an engineer signs. It is a derived result at signing, not a certification.",
    category: "governance",
    capability: "derivedResultAtSigning",
    href: LEARN.engine,
    token: { label: "Rev 18 · ready to sign", state: "inferred", value: "−7.8 dB delta" },
  },
  {
    title: "Case Library",
    body: "Searches public FCC precedents, and approved past cases from your own workspace. Workspace history stays in its workspace and is never shared across customers.",
    category: "governance",
    capability: "publicCaseLibrary",
    href: LEARN.security,
    token: { label: "scope", value: "Public + your workspace" },
  },
];

export const START = {
  tag: "Get started",
  h2: "Start with your latest lab report or product revision.",
  body: "See how Crado maps your board's frequency sources, evaluates margins against 47 CFR §\u00a015.109(a), and keeps your investigation and revision history in one technical record.",
  sample: "Or inspect the sample Gateway X case (200 MHz · Rev 17 → Rev 18) →",
};

/** The waitlist form. Fields, roles, consent text and the final state are the existing waitlist's. */
export const FORM = {
  emailLabel: "Work email",
  emailPlaceholder: "name@company.com",
  emailHelp: "Enter a valid work email",
  personalHint: "A work email helps us match you to the right pilot.",
  roleLabel: "Your role",
  rolePlaceholder: "Select your role",
  updates: "Send me occasional product updates.",
  submit: "Join waitlist",
  loading: "Joining…",
  book: { label: "Or book a 30-minute walkthrough with an engineer →", href: BOOKING_URL },
  onList: "You're on the list.",
  step2Title: "Help us shape your pilot",
  step2Intro: "Optional. Takes 15 seconds.",
  step2Save: "Save answers",
  step2Saving: "Saving…",
  step2Skip: "Skip",
  doneTitle: `Thanks. We'll be in touch from ${CONTACT_EMAIL}.`,
  doneSaved: "Thanks. Your details are saved.",
  doneBook: "Book a 30-minute call",
  doneDocs: "Read the docs",
  rateLimit: "Too many attempts from this network. Please try again in an hour.",
  serverError: "Something went wrong. Please try again, or email hello@crado.io.",
};

export const FAQ_H2 = "Questions engineering teams ask first.";

/** Owner-verified benchmark (Oct 18 engine audit of the product repo). */
export const BENCHMARK = "34 of 34 comparable readings on public FCC reports match the lab within 0.1 dB";
/** Owner-verified test count (Oct 18 engine audit). */
export const TEST_COUNT = "1,462 passing unit tests across the engine modules";

/** Extra detail shown after a live capability's summary in the FAQ. */
const LIVE_DETAIL: Partial<Record<CapabilityId, string>> = {
  emcInvestigator: " (30–1000 MHz quasi-peak, Class B at 3 m)",
};

/** The roadmap items FAQ 06 names, in order. Only those still ROADMAP in capability-status.ts are listed. */
export const FAQ_ROADMAP: CapabilityId[] = [
  "bomIntake",
  "preTestRiskReview",
  "fcc15109b",
  "fcc15107",
  "radiatedAbove1GHz",
  "detectorConversion",
  "distanceExtrapolation",
  "cispr32",
];

function listOf(items: string[]): string {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** FAQ 06, generated from capability-status.ts so it can never disagree with the labels on the page. */
export function liveVsRoadmapAnswer(): string {
  const live = (Object.entries(CAPABILITIES) as [CapabilityId, (typeof CAPABILITIES)[CapabilityId]][])
    .filter(([, c]) => c.status === "LIVE")
    .map(([id, c]) => c.summary + (LIVE_DETAIL[id] ?? ""));
  const roadmap = FAQ_ROADMAP.filter((id) => statusOf(id) === "ROADMAP").map((id) => CAPABILITIES[id].summary);
  const parts = [`Live today: ${listOf(live)}. On the benchmark, ${BENCHMARK}.`];
  if (roadmap.length) parts.push(`Marked Roadmap: ${listOf(roadmap)}.`);
  return parts.join(" ");
}

export interface FaqV8Entry extends FaqEntry {
  tag: string;
}

/** The institutional FAQ (owner's brief), with the approved changes: no em dashes, no "AI off" claim, statuses generated. */
export const FAQ_V8: FaqV8Entry[] = [
  {
    tag: "NO VERDICTS",
    q: "Will Crado tell me if my product will pass?",
    a: "No. Crado never issues compliance verdicts, predicts a guaranteed pass, or declares a definitive root cause. Deterministic code evaluates your reading against the cited regulatory table to 0.1 dB, matches frequencies against your product's recorded sources, and ranks investigation hypotheses. The engineering decision and formal certification stay with your team and your accredited test laboratory.",
  },
  {
    tag: "SYMBOLIC VERIFICATION",
    q: "Why isn't a general AI assistant or requirement-management tool enough?",
    a: "Requirement tools stop at the text of a regulation, and chat windows guess arithmetic, lose track of board revisions, and blend raw measurements with assumptions. Physical hardware verification requires versioned, deterministic math (pinned rule versions and replayable input hashes), strict separation between what was measured (● OBSERVED), confirmed (✓ KNOWN), derived (≈ INFERRED) or left unstated (○ MISSING), and evidence bound to the exact product revision (Rev 17 → Rev 18).",
  },
  {
    tag: "DETERMINISTIC ENGINE",
    q: "What runs in deterministic code, and what does the AI step do?",
    a: `Peak isolation, regulatory limit evaluation, margin arithmetic, harmonic source correlation and 7-condition before/after retest comparisons run entirely in deterministic code, backed by ${TEST_COUNT}. The AI step writes investigation notes and next-test options constrained strictly to the candidate sources matched by the engine, and post-generation code checks audit every number and citation before display.`,
  },
  {
    tag: "ENGINEER AUTHORITY",
    q: "Does Crado replace my EMC engineer, compliance lead, or test lab?",
    a: "No. Crado structures the technical record they work from and automates clause arithmetic and source correlation across revisions. Nothing extracted from a report or datasheet is marked ✓ KNOWN without a person confirming it. Measurement, chamber judgment, hardware design changes and certification remain with your engineers and accredited laboratories.",
  },
  {
    tag: "WORKSPACE ISOLATION",
    q: "Where does my hardware data go?",
    a: "Into your isolated workspace. Crado does not use your schematics, product facts or test reports to train models for other customers. Workspace checks learn only from your own revision history inside your workspace. Our public precedent library contains only public regulatory filings.",
  },
  { tag: "LIVE VS. ROADMAP", q: "Which parts are live today versus on the roadmap?", a: liveVsRoadmapAnswer() },
];

/** Every capability whose status this page shows: the ledger, the FAQ roadmap list and the footer tags. */
export const V8_PAGE_CAPABILITIES: CapabilityId[] = [...LEDGER.map((r) => r.capability), ...FAQ_ROADMAP];

export const NAV = [
  { href: `#${IDS.productGraph}`, label: "Product Graph" },
  { href: `#${IDS.engine}`, label: "Verification Engine" },
  { href: `#${IDS.workflow}`, label: "Revision Loop" },
  { href: "/docs", label: "Method & Coverage" },
  { href: `#${IDS.faq}`, label: "FAQ" },
] as const;

export const NAV_CTA = {
  sample: { href: `#${IDS.sample}`, label: "Sample case" },
  /** The waitlist: there is no product sign-up on this site. */
  start: { href: `#${IDS.getStarted}`, label: "Start a workspace" },
};

export interface FooterLink {
  label: string;
  href: string;
  /** Capabilities whose status is shown after the label (one tag; ROADMAP only if every one of them is). */
  capabilities?: CapabilityId[];
  external?: boolean;
}

/**
 * Docs deep links. With NEXT_PUBLIC_FF_DOCS_SPEC on, the /docs overview has these anchors; with it off they point at
 * the current docs pages' headings, so every footer link resolves either way.
 */
const D = DOCS_SPEC
  ? {
      observed: "/docs#observed",
      known: "/docs#known",
      inferred: "/docs#inferred",
      missing: "/docs#missing",
      arithmetic: "/docs#deterministic-arithmetic",
      coverage: "/docs#coverage",
      security: "/docs#security",
    }
  : {
      observed: "/docs/concepts#evidence",
      known: "/docs/concepts#evidence",
      inferred: "/docs/concepts#observations",
      missing: "/docs/evaluation#missing-conditions",
      arithmetic: "/docs/evaluation#rule-evaluation",
      coverage: "/docs/reference#coverage",
      security: "/docs/trust",
    };

export const FOOTER_TAGLINE = V8_H1;
export const FOOTER_COPYRIGHT = "© 2026 BloomX Analytica Limited";
export const FOOTER_NVIDIA = "Member of NVIDIA Inception";

export const FOOTER: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Sample case", href: `#${IDS.sample}` },
      { label: "Revision continuity", href: `#${IDS.continuity}` },
      { label: "Workflow", href: `#${IDS.workflow}` },
      { label: "Capabilities", href: `#${IDS.capabilities}` },
      { label: "FAQ", href: `#${IDS.faq}` },
      { label: "Docs", href: "/docs" },
    ],
  },
  {
    title: "Method",
    links: [
      { label: "Observed (●)", href: D.observed },
      { label: "Known (✓)", href: D.known },
      { label: "Inferred (≈)", href: D.inferred },
      { label: "Missing (○)", href: D.missing },
      { label: "Deterministic arithmetic", href: D.arithmetic },
    ],
  },
  {
    title: "Coverage",
    links: [
      { label: "FCC Part 15", href: D.coverage },
      { label: "47 CFR §\u00a015.109(a)", href: D.coverage },
      { label: "Class B at 3 m", href: D.coverage },
      { label: "Class A at 10 m", href: D.coverage, capabilities: ["fcc15109b"] },
      { label: "30–1000 MHz radiated", href: D.coverage },
      { label: "Public FCC precedents", href: D.coverage },
      { label: "BOM & CISPR 32", href: D.coverage, capabilities: ["bomIntake", "cispr32"] },
    ],
  },
  {
    title: "Company & Security",
    links: [
      { label: "Method & Coverage Docs", href: "/docs" },
      { label: "Security & Data Isolation", href: D.security },
      { label: "Contact", href: `mailto:${CONTACT_EMAIL}` },
      { label: "LinkedIn", href: LINKEDIN_URL, external: true },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

/**
 * Old homepage anchors (v3, v6 and the first v8 ids, still linked from the docs and legal pages and from outside) and
 * the section each now lands on.
 */
export const LEGACY_ANCHORS_V8: Record<string, string> = {
  gap: IDS.productGraph,
  "failure-investigation": IDS.productGraph,
  method: IDS.engine,
  agents: IDS.engine,
  workflows: IDS.workflow,
  "how-it-works": IDS.workflow,
  how: IDS.workflow,
  "change-review": IDS.workflow,
  "use-cases": IDS.capabilities,
  coverage: IDS.capabilities,
  evidence: IDS.continuity,
  start: IDS.getStarted,
  join: IDS.getStarted,
  waitlist: IDS.getStarted,
  book: IDS.getStarted,
};
