import { NAV_PRODUCT } from "@/content/home-v6";
import { CLEAN_URLS, SCROLL_SECTIONS } from "@/lib/flags";

/** "Read how it works": the docs section that explains how Crado reaches a result. */
export const HOW_IT_WORKS_DOCS = "/docs#how-it-works";

/** Homepage sections with a clean URL: their own page (SECTION_PAGES) or a homepage scroll target (SCROLL_SECTIONS). */
export type SectionId = "how" | "agents" | "coverage" | "faq" | "waitlist";

export const SECTION_PATHS: Record<SectionId, string> = {
  // SCROLL_SECTIONS (SCRUM-316): the section is "Product" in the nav, at /product; /how-it-works still lands there.
  how: SCROLL_SECTIONS ? "/product" : "/how-it-works",
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
 * (product; the "In the product" band moves to PRODUCT_BAND_ID); otherwise it stays "how" as on main.
 */
export const SECTION_DOM_IDS: Record<SectionId, string> = {
  how: SCROLL_SECTIONS ? "product" : "how",
  agents: "agents",
  coverage: "coverage",
  faq: "faq",
  waitlist: "waitlist",
};

/** The "In the product" band's id: "product" as on main, or "in-the-product" once the section above takes "product". */
export const PRODUCT_BAND_ID = SCROLL_SECTIONS ? "in-the-product" : "product";

/** The nav, mobile menu and footer label of a section (SCROLL_SECTIONS: "How it works" reads "Product"). */
export function sectionLabel(id: SectionId, label: string): string {
  return SCROLL_SECTIONS && id === "how" ? NAV_PRODUCT : label;
}

/**
 * Old section paths that still land on their section, and the path the address bar shows instead (replaced, no
 * extra history entry). SCROLL_SECTIONS only.
 */
export const PATH_ALIASES: Record<string, string> = SCROLL_SECTIONS ? { "/how-it-works": SECTION_PATHS.how } : {};

/** The current name of a path: an old alias becomes its new path, anything else is unchanged. */
export function canonicalPath(pathname: string): string {
  return PATH_ALIASES[pathname] ?? pathname;
}

/** Fired by the ScrollRouter after it lands on a URL, so the FAQ can open a ?q= answer. */
export const ROUTE_EVENT = "crado:route";

/** The section a path names ("/agents" → "agents", an old alias too), or undefined. */
export function sectionForPath(pathname: string): SectionId | undefined {
  const path = canonicalPath(pathname);
  return (Object.keys(SECTION_PATHS) as SectionId[]).find((id) => SECTION_PATHS[id] === path);
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
