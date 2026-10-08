import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, pageMetadata } from "@/lib/site";

/** Route segment under /docs. "" is /docs itself. */
export type DocsSlug = "" | "concepts" | "evaluation" | "reference" | "trust" | "changelog";

export interface DocsAnchor {
  id: string;
  label: string;
}

export interface DocsPage {
  slug: DocsSlug;
  /** Absolute path, e.g. /docs/concepts. */
  path: string;
  /** Short page name used in the <title> and the breadcrumb JSON-LD. */
  name: string;
  /** Section name used on prev/next cards and the mobile contents bar (design NAMES). */
  section: string;
  /** Sidebar group heading. */
  group: string;
  /** Mono breadcrumb eyebrow above the H1. */
  eyebrow: string;
  /** The page H1 (its id is toc[0].id). */
  headline: string;
  title: string;
  description: string;
  /** Sidebar entries for this page's group. */
  sidebar: DocsAnchor[];
  /** H1 followed by every H2, in order (right rail and scrollspy). */
  toc: DocsAnchor[];
}

export const DOCS_UPDATED = "2026-10-08";
export const DOCS_UPDATED_LABEL = "8 Oct 2026";

type DocsPageInput = Omit<DocsPage, "toc"> & { toc?: DocsAnchor[] };

const PAGE_INPUTS: DocsPageInput[] = [
  {
    slug: "",
    path: "/docs",
    name: "Introduction",
    section: "Get started",
    group: "GET STARTED",
    eyebrow: "GET STARTED / INTRODUCTION",
    headline: "Introduction",
    title: "Introduction | Crado Docs",
    description:
      "Crado connects a product revision, its requirements and the evidence used to review an engineering finding, starting with radiated-emissions investigation.",
    sidebar: [
      { id: "introduction", label: "Introduction" },
      { id: "first-investigation", label: "First investigation" },
      { id: "scope", label: "Scope and limitations" },
    ],
    toc: [
      { id: "introduction", label: "Introduction" },
      { id: "what-is", label: "What a radiated-emissions investigation is" },
      { id: "how-it-works", label: "How Crado reaches a result" },
      { id: "first-investigation", label: "First investigation" },
      { id: "scope", label: "Scope and limitations" },
    ],
  },
  {
    slug: "concepts",
    path: "/docs/concepts",
    name: "Concepts",
    section: "Core concepts",
    group: "CONCEPTS",
    eyebrow: "CONCEPTS / PRODUCTS AND REVISIONS",
    headline: "Products and revisions",
    title: "Concepts | Crado Docs",
    description:
      "How Crado handles products, revisions, requirements, evidence and evidence states, and how agents, rules and engineers each reach a result.",
    sidebar: [
      { id: "products-revisions", label: "Products and revisions" },
      { id: "requirements", label: "Requirements and applicability" },
      { id: "evidence", label: "Evidence and provenance" },
      { id: "observations", label: "Observations and hypotheses" },
      { id: "agents-rules", label: "Agents, rules and review" },
      { id: "reviews", label: "Reviews and historical decisions" },
    ],
  },
  {
    slug: "evaluation",
    path: "/docs/evaluation",
    name: "Evaluation",
    section: "Evaluation",
    group: "EVALUATION",
    eyebrow: "EVALUATION / REPORT CONFIRMATION",
    headline: "Report confirmation",
    title: "Evaluation | Crado Docs",
    description:
      "How report values are confirmed, how supported rules are evaluated, and when a comparison is blocked because conditions are missing or incompatible.",
    sidebar: [
      { id: "report-confirmation", label: "Report confirmation" },
      { id: "rule-evaluation", label: "Supported rule evaluation" },
      { id: "comparisons", label: "Measurement comparisons" },
      { id: "missing-conditions", label: "Missing and incompatible conditions" },
    ],
  },
  {
    slug: "reference",
    path: "/docs/reference",
    name: "Reference",
    section: "Reference",
    group: "REFERENCE",
    eyebrow: "REFERENCE / REGULATORY COVERAGE",
    headline: "Regulatory coverage",
    title: "Reference | Crado Docs",
    description:
      "Which clauses and conditions Crado evaluates today under 47 CFR 15.109(a), what is not covered, and a glossary of the terms used in Crado.",
    sidebar: [
      { id: "coverage", label: "Regulatory coverage" },
      { id: "glossary", label: "Glossary" },
    ],
  },
  {
    slug: "trust",
    path: "/docs/trust",
    name: "Trust",
    section: "Trust",
    group: "TRUST",
    eyebrow: "TRUST / WORKSPACE ACCESS",
    headline: "Workspace access",
    title: "Trust | Crado Docs",
    description:
      "How Crado workspaces are scoped, how pilot data is handled and where Crado's current security status is shared.",
    sidebar: [
      { id: "workspace-access", label: "Workspace access" },
      { id: "data-handling", label: "Data handling" },
      { id: "security-status", label: "Security status" },
    ],
  },
  {
    slug: "changelog",
    path: "/docs/changelog",
    name: "Changelog",
    section: "Changelog",
    group: "CHANGELOG",
    eyebrow: "CHANGELOG",
    headline: "Changelog",
    title: "Changelog | Crado Docs",
    description: "Dated changes to the Crado documentation.",
    sidebar: [{ id: "changelog", label: "Changelog" }],
  },
];

/** Every docs page in reading order (sidebar, prev/next). The toc defaults to the sidebar entries. */
export const DOCS_PAGES: DocsPage[] = PAGE_INPUTS.map((p) => ({ ...p, toc: p.toc ?? p.sidebar }));

/** Slugs served by /docs/[slug]. */
export const DOCS_SLUGS = DOCS_PAGES.filter((p) => p.slug !== "").map((p) => p.slug);

export function docsPageBySlug(slug: string): DocsPage | undefined {
  return DOCS_PAGES.find((p) => p.slug === slug);
}

export function docsPageByPath(path: string): DocsPage | undefined {
  const clean = path.replace(/\/+$/, "") || "/";
  return DOCS_PAGES.find((p) => p.path === clean);
}

/** Link to a heading anywhere in the docs, e.g. docsHref("coverage") → /docs/reference#coverage. */
export function docsHref(id: string): string {
  const page = DOCS_PAGES.find((p) => p.toc.some((t) => t.id === id));
  return page ? `${page.path}#${id}` : `/docs#${id}`;
}

export function docsNeighbours(page: DocsPage): { prev?: DocsPage; next?: DocsPage } {
  const i = DOCS_PAGES.indexOf(page);
  return { prev: DOCS_PAGES[i - 1], next: DOCS_PAGES[i + 1] };
}

export function docsMetadata(page: DocsPage): Metadata {
  return pageMetadata({ title: page.title, description: page.description, path: page.path, type: "article", ogAlt: "Crado Docs" });
}

/** TechArticle + BreadcrumbList graph (SEO hand-off). */
export function docsJsonLd(page: DocsPage): object {
  const url = `${SITE_URL}${page.path}`;
  const org = { "@type": "Organization", name: SITE_NAME, url: `${SITE_URL}/` };
  const crumbs = [{ "@type": "ListItem", position: 1, name: "Docs", item: `${SITE_URL}/docs` }];
  if (page.slug !== "") crumbs.push({ "@type": "ListItem", position: 2, name: page.name, item: url });
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "TechArticle", headline: page.headline, description: page.description, dateModified: DOCS_UPDATED, url, author: org, publisher: org },
      { "@type": "BreadcrumbList", itemListElement: crumbs },
    ],
  };
}
