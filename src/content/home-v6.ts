/**
 * Homepage v6 copy, verbatim from Claude Design "Crado Homepage v6.dc.html". The page, its FAQPage JSON-LD and
 * llms.txt all render from these lists. Statuses are capability ids resolved through capability-status.ts.
 */
import { CAPABILITIES, statusOf, type CapabilityId, type CapabilityStatus } from "./capability-status";

export const V6_TITLE = "Crado | The evidence layer for regulated hardware";
export const V6_CATEGORY = "The evidence layer for regulated hardware";
export const V6_H1 = "Compliance, inside the engineering loop.";
export const V6_INTRO =
  "Crado is the evidence layer for regulated hardware. It keeps every test result, design change and regulation tied to the product revision it belongs to.";
/** Meta description: the hero intro (148 characters). */
export const V6_DESCRIPTION = V6_INTRO;

export const ANNOUNCEMENT = "Early access · Radiated-emissions investigation under FCC Part 15 · ";

/** Evidence-state colour per tag (design: Bright colours and evidence mapping). */
export type EvidenceTone = "sky" | "mint" | "sun" | "lilac";

export interface EvidenceCard {
  tag: "OBSERVED" | "KNOWN" | "INFERRED" | "MISSING";
  tone: EvidenceTone;
  title: string;
  body: string;
}

export const EVIDENCE_CARDS: EvidenceCard[] = [
  { tag: "OBSERVED", tone: "sky", title: "It reads.", body: "Every value Crado reads from a report shows its page." },
  { tag: "KNOWN", tone: "mint", title: "It checks.", body: "Margin is measured minus limit, from a versioned rule set." },
  { tag: "INFERRED", tone: "sun", title: "Agents investigate.", body: "Read reports, organise the evidence, propose likely causes with their evidence." },
  { tag: "MISSING", tone: "lilac", title: "Unknown stays unknown.", body: "Each likely cause lists the evidence for it and the facts it still needs." },
];

export const COMMITMENTS = "No guaranteed passes. No certification determinations. Unknown stays unknown.";
export const COMMITMENTS_LABEL = "How Crado works, in three lines.";

export const ESSAY_LEAD =
  "Hardware compliance, as practised today, is falling behind. Products change every sprint: firmware, layouts, suppliers. The evidence that shows they still meet the rules changes a few times a year, in a lab, in a PDF. The knowledge that connects the two lives in email threads, spreadsheets and one engineer's memory. The result is retests nobody planned, fixes nobody can trace, and new designs that repeat old failures.";
export const ESSAY_BODY = [
  "Crado is building the evidence layer for regulated hardware: one record between your engineering team and the regulations your product must meet.",
  "It reads. It checks. It remembers. Agents organise the evidence, rules check the numbers, and your engineers make every decision.",
];

export interface StackLayer {
  title: string;
  body: string;
  tone: "card" | "sky" | "mint" | "forest";
}

export const STACK: StackLayer[] = [
  { title: "Your engineers", body: "Set priorities, confirm facts, make every decision.", tone: "card" },
  { title: "Crado agents", body: "Read reports, organise the evidence, propose likely causes with their evidence.", tone: "sky" },
  {
    title: "Crado rules engine",
    body: "Checks measurements against the regulation, with the citation and rule version recorded. Same input, same result.",
    tone: "mint",
  },
  { title: "Your product record", body: "Revisions, test reports, changes and regulations, in one place.", tone: "forest" },
];

/** "Reads lab reports today (PDF, TXT, Markdown). Email, team chat and change tickets: <status>." */
export const SOURCES_NOTE = { live: "Reads lab reports today (PDF, TXT, Markdown).", next: "Email, team chat and change tickets", capability: "sourcesEmailChatTickets" } as const;

export interface Principle {
  label: string;
  title: string;
  body: string;
}

export const PRINCIPLES: Principle[] = [
  {
    label: "The vision",
    title: "Every change should arrive with its evidence.",
    body: "Engineers should design, test and decide. Finding out what a change did to the evidence should not take a week of searching.",
  },
  {
    label: "The record",
    title: "A record that follows the revision.",
    body: "Every report, confirmed fact, likely cause and change is filed with the product revision it belongs to, so the next one starts from what the last one learned.",
  },
  {
    label: "The boundary",
    title: "Agents investigate. Engineers decide.",
    body: "In a regulated product, a confident wrong answer costs more than no answer. Agents propose and cite, a deterministic engine does the arithmetic, and nothing is marked known until a person confirms it.",
  },
];

export interface Agent {
  capability: CapabilityId;
  stage: string;
  name: string;
  body: string;
  ask: string;
}

export const AGENTS_H2 = "One record. Agents for every stage.";
export const AGENTS_INTRO = "Specialist agents that each own one part of the compliance work. Every output cites its evidence.";

export const AGENTS: Agent[] = [
  {
    capability: "emcInvestigator",
    stage: "When a test fails",
    name: "EMC investigator",
    body: "Ranks likely causes of a failed radiated-emissions test, each with its evidence, and suggests the next test.",
    ask: '"Why did Rev D fail at 144.2 MHz?"',
  },
  {
    capability: "changeReviewer",
    stage: "Before a change",
    name: "Change reviewer",
    body: "Shows which evidence and certifications a design change touches.",
    ask: '"What does ECO-214 do to our FCC evidence?"',
  },
  {
    capability: "retestPlanner",
    stage: "Before a retest",
    name: "Retest planner",
    body: "Proposes the smallest set of checks that settles an open question.",
    ask: '"What would settle the 96 MHz risk?"',
  },
  {
    capability: "labLiaison",
    stage: "With the lab",
    name: "Lab liaison",
    body: "Keeps test plans, samples and lab threads in step with each revision.",
    ask: '"What did we agree with the lab about the cable?"',
  },
  {
    capability: "complianceWriter",
    stage: "Before review",
    name: "Compliance writer",
    body: "Drafts review packages for engineers to check and approve.",
    ask: '"Draft the Rev E review package."',
  },
  {
    capability: "evidenceAuditor",
    stage: "After shipping",
    name: "Evidence auditor",
    body: "Finds evidence that went stale after a change, before an auditor does.",
    ask: '"Which Rev D results no longer apply to Rev E?"',
  },
];

export interface CoverageRow {
  regulation: string;
  scope: string;
  measurement: string;
  capability: CapabilityId;
}

export const COVERAGE_H2 = "What Crado checks today";
export const COVERAGE: CoverageRow[] = [
  { regulation: "47 CFR 15.109(a)", scope: "Class B, 3 m", measurement: "Radiated emissions, quasi-peak", capability: "emcInvestigator" },
  { regulation: "47 CFR 15.109(b)", scope: "Class A, 10 m", measurement: "Radiated emissions, quasi-peak", capability: "fcc15109b" },
  { regulation: "EU EMC and Radio Equipment Directives", scope: "Radiated and conducted emissions", measurement: "Per harmonised standard", capability: "euEmcRed" },
  { regulation: "EU Machinery Regulation 2023/1230", scope: "Substantial modification", measurement: "Change assessment", capability: "euMachinery" },
  { regulation: "RTCA DO-160", scope: "Qualification by similarity", measurement: "Environmental test evidence", capability: "rtcaDo160" },
];
export const COVERAGE_NOTE = "Crado refuses a comparison when the test distance or detector does not match the limit.";

export interface CommitmentCard {
  label: string;
  title: string;
  body?: string;
  tone: "sky" | "rust" | "card" | "lilac";
}

export const COMMITMENT_CARDS: CommitmentCard[] = [
  { tone: "sky", ...PRINCIPLES[0] },
  { tone: "rust", ...PRINCIPLES[1] },
  { tone: "card", label: "The boundary", title: "Agents investigate. Engineers decide." },
  {
    tone: "lilac",
    label: "The boundary",
    title: "In a regulated product, a confident wrong answer costs more than no answer.",
    body: "Agents propose and cite, a deterministic engine does the arithmetic, and nothing is marked known until a person confirms it.",
  },
];

/** Every capability whose status the page shows: agent tags, coverage rows and the sources note. */
export const PAGE_CAPABILITIES: CapabilityId[] = [...AGENTS.map((a) => a.capability), ...COVERAGE.map((r) => r.capability), SOURCES_NOTE.capability];

/** Sentence-case status names as the FAQ writes them. */
export const STATUS_IN_PROSE: Record<CapabilityStatus, string> = { LIVE: "Live", "EARLY ACCESS": "Early access", ROADMAP: "Roadmap" };

function listOf(items: string[]): string {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/**
 * FAQ 06, generated from capability-status.ts: the LIVE capabilities, then only the other statuses that some item on
 * the page actually has (tests/unit/capability-status.test.ts fails if it names one that none has).
 */
export function liveTodayAnswer(): string {
  const live = Object.values(CAPABILITIES)
    .filter((c) => c.status === "LIVE")
    .map((c) => c.summary);
  const others = (["EARLY ACCESS", "ROADMAP"] as const).filter((s) => PAGE_CAPABILITIES.some((id) => statusOf(id) === s)).map((s) => STATUS_IN_PROSE[s]);
  const first = live[0] ? live[0][0].toUpperCase() + live[0].slice(1) : "";
  const lead = live.length ? `${listOf([first, ...live.slice(1)])}.` : "Nothing yet.";
  return others.length ? `${lead} Everything else on this page is marked ${others.join(" or ")}.` : lead;
}

export interface FaqEntry {
  q: string;
  a: string;
}

export const FAQ_H2 = "Before you trust Crado with your evidence";
export const FAQ_INTRO = "What engineering teams ask first.";
export const FAQ_V6: FaqEntry[] = [
  {
    q: "Will Crado tell me if my product will pass?",
    a: "No. Crado reports the margin to the limit and ranks likely causes. The decision stays with your engineers and your lab.",
  },
  {
    q: "Does Crado replace my EMC engineer or test lab?",
    a: "No. Crado organises the evidence they work from and does the arithmetic against the rules. Measurement, judgement and certification stay with people and accredited labs.",
  },
  {
    q: "Why isn't a general AI assistant enough?",
    a: "Compliance needs numbers that come from a cited, versioned rule, evidence tied to the exact product revision, and a clear line between what was measured and what was inferred. A chat window keeps none of that.",
  },
  {
    q: "What does Crado do on its own?",
    a: "It reads reports, extracts values, files evidence to the right revision and proposes likely causes. Nothing is confirmed, decided or sent outside your workspace without a person.",
  },
  {
    q: "Where does my data go?",
    a: "Into your workspace. Crado does not use your data for other customers. Contributing to a shared benchmark would need your explicit opt-in, and it is off by default.",
  },
  { q: "Which parts are live today?", a: liveTodayAnswer() },
];

export const CLOSING_H2 = "The evidence layer for regulated hardware.";
export const CLOSING_BODY =
  "Bring one failed or marginal emissions report. In 30 minutes you'll see what Crado finds, what it can't, and what it would need.";

export const WAITLIST_COPY = {
  tag: "Waitlist",
  title: "Not ready to bring a report yet?",
  body: "Join the waitlist and we'll invite you as places open. No newsletter unless you tick the box.",
  emailLabel: "Work email",
  emailPlaceholder: "name@company.com",
  emailError: "Enter a valid email address.",
  personalHint: "A work email helps us prioritise engineering teams.",
  roleLabel: "Your role",
  rolePlaceholder: "Choose your role",
  roleHelp: "Enter your email first",
  updates: "Send me occasional product updates.",
  submit: "Join the waitlist",
  loading: "Joining…",
  successTitle: "You're on the list.",
  step2Link: "Tell us about your product (optional)",
  book: "Book a case review",
  rateLimit: "Too many attempts from this network. Try again in an hour.",
  serverError: "Something went wrong. Try again, or ",
  serverErrorLink: "email us",
} as const;

/** Labels shared by several sections. */
export const CTA = {
  book: "Book a case review",
  bookShort: "Book",
  readHow: "Read how it works",
  join: "Join the waitlist",
} as const;

/** The "How it works" nav item's label with NEXT_PUBLIC_FF_SCROLL_SECTIONS on (SCRUM-316); the section keeps its pill and H2. */
export const NAV_PRODUCT = "Product";

export const NAV_LINKS = [
  { id: "how", label: "How it works" },
  { id: "agents", label: "Agents" },
  { id: "coverage", label: "Coverage" },
  { id: "faq", label: "FAQ" },
] as const;

/**
 * v3 anchors that other pages and old links still use, and the v6 section each now lands on. Rendered as empty
 * anchors at the top of those sections, so the browser resolves them without script.
 */
export const LEGACY_ANCHORS: Record<string, string> = {
  "change-review": "agents",
  "failure-investigation": "product",
  evidence: "how",
  "how-it-works": "how",
  "use-cases": "coverage",
  join: "waitlist",
};
