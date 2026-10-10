import { CLEAN_URLS, SCROLL_SECTIONS } from "@/lib/flags";

/** "Read how it works": the docs section that explains how Crado reaches a result. */
export const HOW_IT_WORKS_DOCS = "/docs#how-it-works";

/** Homepage sections with a clean URL: their own page (SECTION_PAGES) or a homepage scroll target (SCROLL_SECTIONS). */
export type SectionId = "how" | "agents" | "coverage" | "faq" | "waitlist";

export const SECTION_PATHS: Record<SectionId, string> = {
  how: "/how-it-works",
  agents: "/agents",
  coverage: "/coverage",
  faq: "/faq",
  waitlist: "/waitlist",
};

/**
 * Where a link to a homepage section goes. With clean URLs (either flag): its path. Otherwise the v6 anchors as before:
 * `${linkBase}#id` ("" on the homepage, "/" elsewhere), and the waitlist on the page's own footer.
 */
export function sectionHref(id: SectionId, linkBase: "" | "/" = ""): string {
  if (CLEAN_URLS) return SECTION_PATHS[id];
  return id === "waitlist" ? "#waitlist" : `${linkBase}#${id}`;
}

/** "Book a case review" (v6 without section pages only): the homepage's #book band. */
export function bookHref(linkBase: "" | "/" = ""): string {
  return `${linkBase}#book`;
}

/**
 * The element id of each section on the homepage. With SCROLL_SECTIONS on, "How it works" takes its path's name
 * (how-it-works); otherwise it stays "how" as on main.
 */
export const SECTION_DOM_IDS: Record<SectionId, string> = {
  how: SCROLL_SECTIONS ? "how-it-works" : "how",
  agents: "agents",
  coverage: "coverage",
  faq: "faq",
  waitlist: "waitlist",
};

/** Fired by the ScrollRouter after it lands on a URL, so the FAQ can open a ?q= answer. */
export const ROUTE_EVENT = "crado:route";

/** The section a path names ("/agents" → "agents"), or undefined. */
export function sectionForPath(pathname: string): SectionId | undefined {
  return (Object.keys(SECTION_PATHS) as SectionId[]).find((id) => SECTION_PATHS[id] === pathname);
}

/**
 * Old homepage hashes (v6 sections and the v3 anchors) and the path each now lives at. With clean URLs on, the
 * homepage swaps a matching hash for the path without adding a history entry (HashRedirect, or ScrollRouter).
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
