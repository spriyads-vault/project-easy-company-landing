/**
 * Homepage v8 copy, from Claude Design "Crado_Landing_v8.dc.html" with the owner's approved copy changes (SCRUM-TBD):
 * no workspace sign-up (the existing waitlist instead), statuses from capability-status.ts, "derived result at
 * signing, not a certification" instead of "compliance state", no invented lab name, no em dashes. The page, its
 * FAQPage JSON-LD and llms.txt all render from these lists.
 */
import { BOOKING_URL, CONTACT_EMAIL, LINKEDIN_URL } from "@/lib/site";
import { type CapabilityId } from "./capability-status";
import { FAQ_V6, liveTodayAnswer, type FaqEntry } from "./home-v6";

export const V8_H1 = "Continuous verification for physical hardware.";
export const V8_TITLE = "Crado | Continuous verification for physical hardware";
/** Meta description (under 160 characters), from the hero intro. */
export const V8_DESCRIPTION =
  "Crado connects hardware facts, component changes, lab measurements and regulatory limits across every board revision, from schematic fact to signed result.";

export const HERO = {
  eyebrow: "CONTINUOUS COMPLIANCE & REVISION VERIFICATION",
  h1: V8_H1,
  intro:
    "Requirements tools stop at the text of a standard. Crado connects your living hardware architecture, component changes, lab measurements and regulatory limits across every board revision, from first schematic fact to the derived result an engineer signs.",
  join: "Join waitlist",
  sample: "Explore the sample case →",
  scroll: "Scroll to explore",
} as const;

/** The four evidence states. Glyphs and their colours are part of the design's evidence model. */
export type EvidenceState = "observed" | "known" | "inferred" | "missing";

export const STATE_GLYPH: Record<EvidenceState, string> = { observed: "●", known: "✓", inferred: "≈", missing: "○" };

export interface DiagramRow {
  state?: EvidenceState;
  text: string;
}

/** Hero diagram: daily inputs, the engine, the revision record. */
export const DIAGRAM = {
  caption: "Daily inputs → deterministic checks → verified revision record",
  captionShort: "Daily inputs → deterministic checks → verified record",
  facts: {
    title: "Living Hardware Facts (Rev 17)",
    rows: [
      { state: "known", text: "Clocks, converters, radios & enclosure facts" },
      { state: "observed", text: "Pre-compliance & accredited lab readings" },
      { state: "known", text: "Target regulatory regimes & test setups" },
    ] as DiagramRow[],
  },
  engine: {
    title: "Deterministic Verification Engine",
    rows: ["Evaluates clause limits & band edges to 0.1 dB", "Correlates physical sources against measured peaks"],
    missing: { before: "Surfaces", after: "parameters before lab sign-off" },
  },
  record: {
    title: "Verified Revision Record (Rev 18)",
    rows: [
      { state: "inferred", text: "Ranked investigation hypotheses" },
      { state: "known", text: "Recorded engineering changes (Rev 17 → Rev 18)" },
      { state: "observed", text: "Before and after delta & derived result at signing" },
    ] as DiagramRow[],
  },
  retest: "Rev 18 retest · before / after delta",
};

export const GAP = {
  h2: "Hardware teams move fast.",
  h2Muted: "The compliance trail breaks on every rev.",
  before: {
    label: "Static requirement checklists & spreadsheets",
    body: "Requirements sit in one tool, schematics and BOM facts sit in another, and lab PDFs sit in email threads. When an engineer swaps a switching regulator or crystal on Rev 17, nobody knows which regulatory margins shifted or which prior test results are now invalid until the board fails at the lab.",
  },
  after: {
    label: "Living revision verification in Crado",
    /** Rendered with the KNOWN, OBSERVED and INFERRED glyphs between the parts. */
    parts: [
      "Every product revision carries its confirmed hardware facts (",
      "), empirical readings (",
      ") and derived margins (",
      ") forward automatically. When the design changes or a new measurement arrives, Crado re-evaluates limits, isolates physical correlations and keeps the audit trail intact.",
    ],
  },
};

/** The sample case (design: workbench). Every value here is sample data, and the case is labelled "Sample case". */
export const SAMPLE = {
  label: "Sample case",
  product: "Gateway X",
  revision: "Rev 17",
  report: "NCL-26-1041-RE",
  verdict: { over: "+2.7 dB over", clause: "§15.109(a)" },
  assumptions: [
    { state: "observed", text: "3 m · p.6" },
    { state: "observed", text: "Quasi-peak · p.6" },
    { state: "observed", text: "Horizontal · p.6" },
    { state: "inferred", text: "Class B · default, to confirm" },
    { state: "inferred", text: "43.5 dBµV/m · 88–216 MHz" },
  ] as { state: EvidenceState; text: string }[],
  chartTitle: "Radiated emissions · 30–960 MHz · QP",
  chartLabel: "Observed peaks against the Class B limit with the 40 MHz harmonic comb",
  legend: { peak: "observed peak", comb: "40 MHz comb", limit: "Class B limit" },
  causesTitle: "Ranked causes",
  causesStatus: ["Checking clock harmonics", "Matching 40 MHz RMII clock", "investigation priorities · 200.02 MHz"],
  causes: [
    {
      rank: "1",
      title: "5th harmonic of 40 MHz = 200.00 MHz",
      priority: "High priority",
      chips: [
        { state: "inferred", text: "Δ 0.02 MHz (100 ppm)" },
        { state: "known", text: "U4 · 40.000 MHz RMII clock" },
        { state: "observed", text: "N=3 120.01 · N=7 280.03 · p.6" },
      ] as { state: EvidenceState; text: string }[],
    },
    {
      rank: "2",
      title: "8th harmonic of 25 MHz = 200.00 MHz",
      priority: "Low priority",
      note: "Even harmonic of a crystal, likely coincidence.",
      chips: [{ state: "inferred", text: "Y1 · 25.000 MHz · from datasheet, unconfirmed" }] as { state: EvidenceState; text: string }[],
    },
  ],
  missing: { label: "Missing:", text: "RMII_REF_CLK trace length" },
  bench: { label: "Bench test:", text: "Probe RMII_REF_CLK near U4 with an H-field probe; fit a 33 Ω series resistor." },
  pdf: {
    file: "NCL-26-1041-RE.pdf",
    page: "p.6",
    /** Was "Northfield Compliance" in the design: no invented lab name. */
    lab: "Sample lab report",
    meta: "Gateway X · Rev 17 · tested 2026-10-08",
    setup: "Radiated emissions · 3 m · quasi-peak · horizontal",
    head: ["Frequency (MHz)", "QP (dBµV/m)"],
    rows: [
      ["120.01", "38.1"],
      ["200.02", "46.2"],
      ["280.03", "41.0"],
    ],
    limit: { label: "INFERRED · limit §15.109(a)", value: "43.5 dBµV/m" },
    margin: { label: "DERIVED · margin", value: "+2.7 dB over" },
  },
  provenance: [
    { state: "observed", text: "200.02 MHz · 46.2 dBµV/m read from p.6" },
    { state: "inferred", text: "DERIVED · +2.7 dB over 43.5 dBµV/m, calculated" },
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
    { x: fx(120.01), y: dy(38.1), hot: false, label: "120.01 · 38.1", t: 1450 },
    { x: fx(200.02), y: dy(46.2), hot: true, label: "", t: 1850 },
    { x: fx(280.03), y: dy(41.0), hot: false, label: "280.03 · 41.0", t: 1650 },
  ],
  limit: `M${fx(30)} ${dy(40)} H${fx(88)} V${dy(43.5)} H${fx(216)} V${dy(46)} H${fx(960)}`,
  xLabels: [
    { x: fx(30), anchor: "start", label: "30" },
    { x: fx(88), anchor: "middle", label: "88" },
    { x: fx(216), anchor: "middle", label: "216" },
    { x: fx(960), anchor: "end", label: "960 MHz" },
  ] as { x: number; anchor: "start" | "middle" | "end"; label: string }[],
  hot: { x: fx(200.02), y: dy(46.2), limitY: dy(43.5), delta: "≈ +2.7 dB", label: "200.02 MHz · 46.2 dBµV/m" },
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
    { state: "observed", label: "OBSERVED", title: "Raw Evidence", body: "Read directly from a measurement table or document with page and row provenance." },
    { state: "known", label: "KNOWN", title: "Engineer-Confirmed Fact", body: "Hardware architecture and setup parameters explicitly confirmed by your team on the active revision." },
    { state: "inferred", label: "INFERRED", title: "Engine-Derived", body: "Calculated limit margins, harmonic correlations and bounded investigation hypotheses with visible reasoning." },
    { state: "missing", label: "MISSING", title: "Unsupplied Context", body: "Unstated detector modes, distances or radiator types surfaced explicitly so nothing defaults silently." },
  ] as { state: EvidenceState; label: string; title: string; body: string }[],
};

export const WORKFLOW = {
  h2: "One continuous thread from first measurement to signed result.",
  /** Design had an em dash after "bench"; a full stop instead (approved). */
  body: "Built for how hardware teams work every day at the bench. And how compliance leads sign off at the chamber gate.",
  active: "ACTIVE",
  steps: [
    { n: "01", title: "Product & Report Intake", body: "Record hardware facts on Rev 17, drop a lab report or type a single reading, isolate the critical reading and evaluate it against the 15.109(a) limit." },
    { n: "02", title: "Physical Source Correlation", body: "Match frequencies against confirmed clocks, radios and converters, then rank investigation hypotheses with cited evidence." },
    { n: "03", title: "Engineering Change (Rev 17 → Rev 18)", body: "Record the exact board or component modification and spawn the next hardware revision." },
    { n: "04", title: "Retest Delta & Sign-Off", body: "Compare before and after readings across all 7 setup conditions, close the case and sign the derived result. It is not a certification." },
  ],
};

export const METHOD = {
  h2: "Code does the math. AI writes the investigation notes. Engineers own the decision.",
  body: "Probabilistic models should never calculate regulatory limits or invent compliance verdicts. Crado separates deterministic regulatory arithmetic from investigation drafting and checks every number, sign and citation before it reaches the screen.",
  cards: [
    {
      tag: "01 · CODE",
      title: "Deterministic Code",
      body: "Pure functions evaluate regulatory tables, band edges, margin signs, harmonic ratios and 7 point retest eligibility. Every run records its rule version and inputs.",
    },
    {
      tag: "02 · NOTES",
      title: "Policied Investigation Notes",
      body: "Investigation hypotheses are constrained strictly to engine matched product sources. Post generation checks verify every number, sign and citation, stripping unsourced claims and certainty language automatically.",
    },
    {
      tag: "03 · ENGINEER",
      title: "Engineer Authority",
      body: "Crado never issues legal compliance verdicts or replaces accredited labs. Engineers confirm facts, record the hardware change, verify the retest delta and sign the derived result, which is not a certification.",
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
  body: "Every inspection layer records its rule version and inputs.",
  filterLabel: "Filter capabilities",
  all: "All",
  learnMore: "Learn more",
};

export const LEDGER: LedgerRow[] = [
  {
    title: "Worst-Margin Peak Selection",
    body: "Identifies declared or sole failing peaks without guessing or defaulting to the first table row.",
    category: "engine",
    capability: "emcInvestigator",
    href: "/docs/evaluation",
    token: { label: "worst peak · p.6", state: "observed", value: "200.02 MHz · 46.2" },
  },
  {
    title: "FCC 15.109(a) Limit & Band-Edge Evaluator",
    body: "Evaluates Class B quasi-peak limits at 3 m from 30 to 1000 MHz, applying the tighter limit exactly at each band edge.",
    category: "engine",
    capability: "emcInvestigator",
    href: "/docs/evaluation",
    token: { label: "§15.109(a) · Class B", state: "inferred", value: "43.5 dBµV/m · 88–216" },
  },
  {
    title: "FCC 15.109(b) Class A Evaluator",
    body: "Class A quasi-peak limits at 10 m.",
    category: "engine",
    capability: "fcc15109b",
    href: "/docs/reference",
    token: { label: "§15.109(b) · Class A", state: "missing", value: "10 m" },
  },
  {
    title: "Harmonic Source Correlator",
    body: "Matches failing peaks against board clocks, radios, and switching converters up to N = 25, flagging each candidate as consistent with the source.",
    category: "engine",
    capability: "emcInvestigator",
    href: "/docs/evaluation",
    token: { label: "rule · f = N × f0", state: "inferred", value: "5 × 40 MHz = 200.00" },
  },
  {
    title: "Ranked Investigation Hypotheses",
    body: "Synthesizes candidate mechanisms, missing setup context, and recommended bench checks while stripping any unverified numbers or certainty claims.",
    category: "workflow",
    capability: "emcInvestigator",
    href: "/docs/concepts",
    token: { label: "priority 1 · High", state: "inferred", value: "5th harmonic of 40 MHz" },
  },
  {
    title: "Single Bench Reading",
    body: "Type a single reading from the bench instead of uploading a full lab report.",
    category: "workflow",
    capability: "singleReading",
    href: "/docs/concepts",
    token: { label: "bench · typed", state: "observed", value: "200.02 MHz · 46.2" },
  },
  {
    title: "BOM Intake",
    body: "Import a bill of materials to fill in the clocks, radios and converters on a revision.",
    category: "workflow",
    capability: "bomIntake",
    href: "/docs/concepts",
    token: { label: "BOM · import", state: "missing", value: "Rev 18 parts" },
  },
  {
    title: "7-Condition Retest Parity Check",
    body: "Verifies that detector, distance, antenna polarity, class, and frequency tolerance (±0.5 MHz) match before calculating a before/after dB delta.",
    category: "workflow",
    capability: "changeAndRetest",
    href: "/docs/evaluation",
    token: { label: "Rev 17 → Rev 18 · same setup", state: "observed", value: "3 m · QP · horizontal" },
  },
  {
    title: "Revision Engineering Change Ledger",
    body: "Records what changed and where between Revision N and Revision N+1, preserving design rationale across board spins.",
    category: "workflow",
    capability: "changeAndRetest",
    href: "/docs/concepts",
    token: { label: "change", state: "known", value: "EC-01 → Rev 18" },
  },
  {
    title: "Derived Result at Signing",
    body: "Records each revision's derived result (Conforming, Non-conforming or Not proven) from confirmed requirements and verified margins when an engineer signs. It is a derived result at signing, not a certification.",
    category: "governance",
    capability: "derivedResultAtSigning",
    href: "/docs/evaluation",
    token: { label: "Rev 18 retest", state: "inferred", value: "−3.7 dB under" },
  },
  {
    title: "Case Library",
    body: "Searches public FCC precedents, and approved past cases from your own workspace. Workspace history stays in its workspace and is never shared across customers.",
    category: "governance",
    capability: "publicCaseLibrary",
    href: "/docs/trust",
    token: { label: "scope", value: "Public + your workspace" },
  },
];

export const START = {
  tag: "Get started",
  h2: "Start with your latest lab report or a single bench reading.",
  body: "See how Crado maps your board's frequency sources, evaluates margins against 47 CFR 15.109(a), and structures your next investigation.",
  /** Shown with its status from capability-status.ts. */
  roadmap: { capability: "bomIntake" as CapabilityId, label: "BOM intake" },
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

/** Every capability whose status this page shows: the ledger, the BOM note and the Class A footer link. */
export const V8_PAGE_CAPABILITIES: CapabilityId[] = [...LEDGER.map((r) => r.capability), START.roadmap.capability, "fcc15109b"];

/** The v6 FAQ's approved answers, with "Which parts are live today?" generated for this page's statuses. */
export const FAQ_V8: FaqEntry[] = [...FAQ_V6.slice(0, 5), { q: "Which parts are live today?", a: liveTodayAnswer(V8_PAGE_CAPABILITIES) }];

export const NAV = [
  { href: "#gap", label: "Product Graph" },
  { href: "#method", label: "Verification Engine" },
  { href: "#workflows", label: "Revision Loop" },
  { href: "#capabilities", label: "Governance & Security" },
  { href: "/docs", label: "Docs" },
  { href: "/docs/changelog", label: "Changelog", wideOnly: true },
] as const;

export interface FooterLink {
  label: string;
  href: string;
  /** A capability whose status is shown after the label. */
  capability?: CapabilityId;
  external?: boolean;
}

export const FOOTER_TAGLINE = V8_H1;
export const FOOTER_COPYRIGHT = "© 2026 BloomX Analytica Limited";

export const FOOTER: { title: string; links: FooterLink[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Sample case", href: "#sample-case" },
      { label: "Revision continuity", href: "#continuity" },
      { label: "Workflow", href: "#workflows" },
      { label: "Capabilities", href: "#capabilities" },
      { label: "FAQ", href: "#faq" },
      { label: "Release notes", href: "/docs/changelog" },
    ],
  },
  {
    title: "Method",
    links: [
      { label: "Observed", href: "/docs/concepts#evidence" },
      { label: "Known", href: "/docs/concepts#evidence" },
      { label: "Inferred", href: "/docs/concepts#observations" },
      { label: "Missing", href: "/docs/evaluation#missing-conditions" },
      { label: "Deterministic arithmetic", href: "/docs/concepts#agents-rules" },
    ],
  },
  {
    title: "Coverage",
    links: [
      { label: "FCC Part 15", href: "/docs/reference#coverage" },
      { label: "47 CFR § 15.109(a)", href: "/docs/reference#coverage" },
      { label: "Class B at 3 m", href: "/docs/reference#coverage" },
      { label: "Class A at 10 m", href: "/docs/reference#coverage", capability: "fcc15109b" },
      { label: "30–1000 MHz radiated", href: "/docs/reference#coverage" },
      { label: "Public FCC precedents", href: "/docs/reference" },
    ],
  },
  {
    title: "Company & Security",
    links: [
      { label: "Docs", href: "/docs" },
      { label: "Security & Trust", href: "/docs/trust" },
      { label: "Contact", href: `mailto:${CONTACT_EMAIL}` },
      { label: "LinkedIn", href: LINKEDIN_URL, external: true },
      { label: "Join waitlist", href: "#start" },
    ],
  },
];

export const FOOTER_LEGAL = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Security", href: "/docs/trust" },
];

/**
 * Old homepage anchors (v3 and v6, still linked from the docs and legal pages' header and footer) and the v8
 * section each now lands on.
 */
export const LEGACY_ANCHORS_V8: Record<string, string> = {
  "how-it-works": "workflows",
  how: "workflows",
  "use-cases": "capabilities",
  coverage: "capabilities",
  "change-review": "workflows",
  "failure-investigation": "gap",
  evidence: "continuity",
  agents: "method",
  join: "start",
  waitlist: "start",
  book: "start",
};
