import { SECTION_PAGES } from "@/lib/flags";

/** "Read how it works": the docs section that explains how Crado reaches a result. */
export const HOW_IT_WORKS_DOCS = "/docs#how-it-works";

/** Homepage sections that have their own page while SECTION_PAGES is on (SCRUM-310). */
export type SectionId = "how" | "agents" | "coverage" | "faq" | "waitlist";

export const SECTION_PATHS: Record<SectionId, string> = {
  how: "/how-it-works",
  agents: "/agents",
  coverage: "/coverage",
  faq: "/faq",
  waitlist: "/waitlist",
};

/**
 * Where a link to a homepage section goes. With SECTION_PAGES on: its page. Otherwise the v6 anchors as before:
 * `${linkBase}#id` ("" on the homepage, "/" elsewhere), and the waitlist on the page's own footer.
 */
export function sectionHref(id: SectionId, linkBase: "" | "/" = ""): string {
  if (SECTION_PAGES) return SECTION_PATHS[id];
  return id === "waitlist" ? "#waitlist" : `${linkBase}#${id}`;
}

/** "Book a case review" (v6 without section pages only): the homepage's #book band. */
export function bookHref(linkBase: "" | "/" = ""): string {
  return `${linkBase}#book`;
}

/**
 * Old homepage hashes (v6 sections and the v3 anchors) and the page each now lives on. With SECTION_PAGES on, the
 * homepage swaps a matching hash for the path without adding a history entry (HashRedirect).
 */
export const HASH_PATHS: Record<string, string> = {
  how: SECTION_PATHS.how,
  "how-it-works": SECTION_PATHS.how,
  evidence: SECTION_PATHS.how,
  agents: SECTION_PATHS.agents,
  "change-review": SECTION_PATHS.agents,
  "failure-investigation": SECTION_PATHS.agents,
  coverage: SECTION_PATHS.coverage,
  "use-cases": SECTION_PATHS.coverage,
  faq: SECTION_PATHS.faq,
  waitlist: SECTION_PATHS.waitlist,
  join: SECTION_PATHS.waitlist,
  // The booking band is gone with the section pages on; its old links go to the waitlist.
  book: SECTION_PATHS.waitlist,
};
