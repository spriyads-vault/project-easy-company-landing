/**
 * Copy for the section pages (SCRUM-310). H1s, titles, the /waitlist intro, the closing block and the teaser links
 * are from the brief; every other line reuses existing homepage or docs copy, so the pages make no new claims.
 * Descriptions that mention statuses are generated from capability-status.ts.
 */
import { isLive, isRoadmap } from "./capability-status";
import { AGENTS_INTRO, COMMITMENTS, COVERAGE, COVERAGE_H2, ESSAY_BODY, FAQ_H2, FAQ_INTRO, WAITLIST_COPY } from "./home-v6";

export type SectionSlug = "how-it-works" | "agents" | "coverage" | "faq" | "waitlist";

export interface SectionPageCopy {
  slug: SectionSlug;
  /** Breadcrumb and llms.txt name. */
  name: string;
  title: string;
  h1: string;
  intro: string;
  description: string;
}

function listOf(items: string[]): string {
  return items.length < 2 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

/** "What Crado checks today: 47 CFR 15.109(a) (Class B, 3 m) is live; … are on the roadmap." From the statuses. */
function coverageDescription(): string {
  const live = COVERAGE.filter((r) => isLive(r.capability)).map((r) => `${r.regulation} (${r.scope})`);
  const roadmap = COVERAGE.filter((r) => isRoadmap(r.capability)).map((r) => r.regulation);
  const parts = [live.length ? `${listOf(live)} ${live.length > 1 ? "are" : "is"} live` : "", roadmap.length ? `${listOf(roadmap)} ${roadmap.length > 1 ? "are" : "is"} on the roadmap` : ""];
  return `${COVERAGE_H2}: ${parts.filter(Boolean).join("; ")}.`;
}

export const SECTION_PAGES_COPY: Record<SectionSlug, SectionPageCopy> = {
  "how-it-works": {
    slug: "how-it-works",
    name: "How it works",
    title: "How it works | Crado",
    h1: "How Crado works",
    intro: COMMITMENTS,
    description: ESSAY_BODY[0],
  },
  agents: {
    slug: "agents",
    name: "Agents",
    title: "Agents | Crado",
    h1: "Crado agents",
    intro: AGENTS_INTRO,
    description: AGENTS_INTRO,
  },
  coverage: {
    slug: "coverage",
    name: "Coverage",
    title: "Coverage | Crado",
    h1: "What Crado checks today",
    // Docs reference, first sentence.
    intro: "Coverage is listed per clause and condition.",
    description: coverageDescription(),
  },
  faq: {
    slug: "faq",
    name: "FAQ",
    title: "FAQ | Crado",
    h1: FAQ_H2,
    intro: FAQ_INTRO,
    description: `${FAQ_H2}: ${FAQ_INTRO[0].toLowerCase()}${FAQ_INTRO.slice(1)}`,
  },
  waitlist: {
    slug: "waitlist",
    name: "Join the waitlist",
    title: "Join the waitlist | Crado",
    h1: "Join the waitlist",
    intro: "Not ready to bring a report yet? We'll invite you as places open.",
    description: WAITLIST_COPY.body,
  },
};

export const SECTION_SLUGS = Object.keys(SECTION_PAGES_COPY) as SectionSlug[];

/** Closing block on every section page. */
export const SECTION_CLOSING_H2 = "Bring us your next design change.";

/** Homepage teaser links. */
export const TEASER_LINKS = {
  how: "How Crado works →",
  agents: "All agents →",
  coverage: "Full coverage →",
  faq: "See all questions →",
} as const;

/** /coverage: link to the docs reference (its page name in the docs). */
export const COVERAGE_DOCS_LINK = { text: "Regulatory coverage in the docs →", href: "/docs/reference" } as const;
