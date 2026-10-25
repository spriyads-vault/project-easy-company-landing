/**
 * Feature flags. NEXT_PUBLIC_ values are inlined at build time. next.config.ts reads the same variable to choose
 * the homepage module; keep the accepted values in sync.
 */
const on = (v: string | undefined) => ["1", "true", "on"].includes((v ?? "").toLowerCase());

/**
 * Homepage v8 (dark design, Claude Design "Crado_Landing_v8"). Default off. When on it replaces the homepage and
 * wins over HOMEPAGE_V6 (which, with the section flags below, is then off); docs, legal pages and the 404 keep the
 * v3 dark design.
 */
export const HOMEPAGE_V8 = on(process.env.NEXT_PUBLIC_FF_HOMEPAGE_V8);

/** Homepage v6 (light design). Default off: the v3 homepage stays. Off whenever HOMEPAGE_V8 is on. */
export const HOMEPAGE_V6 = !HOMEPAGE_V8 && on(process.env.NEXT_PUBLIC_FF_HOMEPAGE_V6);

/**
 * Section pages with clean URLs (SCRUM-310): /how-it-works, /agents, /coverage, /faq and /waitlist, and path links
 * instead of #anchors in the nav, footer, announcement and mobile menu. Default off. The pages use the v6 design,
 * so it applies only while HOMEPAGE_V6 is on too.
 */
export const SECTION_PAGES = HOMEPAGE_V6 && on(process.env.NEXT_PUBLIC_FF_SECTION_PAGES) && !on(process.env.NEXT_PUBLIC_FF_SCROLL_SECTIONS);

/**
 * One scrolling homepage with clean section URLs (SCRUM-314): /product (was /how-it-works, SCRUM-316), /agents,
 * /coverage, /faq and /waitlist render the homepage and scroll to their section. Default off; needs HOMEPAGE_V6. When on it overrides
 * SECTION_PAGES (which is then off): the full sections stay on the homepage and the section pages are unused.
 */
export const SCROLL_SECTIONS = HOMEPAGE_V6 && on(process.env.NEXT_PUBLIC_FF_SCROLL_SECTIONS);

/**
 * Either clean-URL mode: section links are paths (no "#" in the nav, footer, announcement or calls to action) and
 * the booking link gives way to the waitlist, as approved for SCRUM-310.
 */
export const CLEAN_URLS = SECTION_PAGES || SCROLL_SECTIONS;

/**
 * Docs as the method, coverage and security specification (SCRUM-TBD): /docs becomes an overview index and
 * /docs/concepts, /docs/reference, /docs/evaluation and /docs/trust carry the spec sections. Same URLs, so nothing
 * indexed breaks. Default off: the current docs stay. Independent of the homepage flags.
 */
export const DOCS_SPEC = on(process.env.NEXT_PUBLIC_FF_DOCS_SPEC);
