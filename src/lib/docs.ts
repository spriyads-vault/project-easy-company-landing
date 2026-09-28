// Documentation structure: five groups, each a route, each with in-page sections.

export type DocGroup = {
  slug: string;
  path: string;
  label: string;
  title: string;
  description: string;
  items: [id: string, title: string][];
};

export const DOC_GROUPS: DocGroup[] = [
  {
    slug: "get-started",
    path: "/docs",
    label: "Get started",
    title: "Crado Docs | Emissions Investigation and Evidence",
    description:
      "Learn how Crado connects product revisions, test evidence and engineering reviews, including supported emissions checks and measurement comparisons.",
    items: [
      ["introduction", "Introduction"],
      ["first-investigation", "First investigation"],
      ["scope-and-limitations", "Scope and limitations"],
    ],
  },
  {
    slug: "core-concepts",
    path: "/docs/core-concepts",
    label: "Core concepts",
    title: "Revisions, requirements and evidence | Crado Docs",
    description:
      "How Crado records products and revisions, requirement applicability, evidence provenance, observation states and historical engineering decisions.",
    items: [
      ["products-and-revisions", "Products and revisions"],
      ["requirements-and-applicability", "Requirements and applicability"],
      ["evidence-and-provenance", "Evidence and provenance"],
      ["observations-and-hypotheses", "Observations and hypotheses"],
      ["reviews-and-historical-decisions", "Reviews and historical decisions"],
    ],
  },
  {
    slug: "evaluation",
    path: "/docs/evaluation",
    label: "Evaluation",
    title: "Report confirmation and measurement comparisons | Crado Docs",
    description:
      "How extracted report values are confirmed, how supported rules evaluate them, the margin convention and when measurement comparisons are blocked.",
    items: [
      ["report-confirmation", "Report confirmation"],
      ["supported-rule-evaluation", "Supported rule evaluation"],
      ["measurement-comparisons", "Measurement comparisons"],
      ["missing-and-incompatible-conditions", "Missing and incompatible conditions"],
    ],
  },
  {
    slug: "reference",
    path: "/docs/reference",
    label: "Reference",
    title: "Regulatory coverage and worked examples | Crado Docs",
    description:
      "The 47 CFR 15.109 checks Crado supports, what an evidence package contains, and worked examples of a supported evaluation and a blocked comparison.",
    items: [
      ["regulatory-coverage", "Regulatory coverage"],
      ["evidence-packages", "Evidence packages"],
      ["worked-examples", "Worked examples"],
    ],
  },
  {
    slug: "trust",
    path: "/docs/trust",
    label: "Trust",
    title: "Workspace access, data handling and security | Crado Docs",
    description:
      "How Crado workspaces are scoped, how pilot data is handled and where Crado's current security status is shared.",
    items: [
      ["workspace-access", "Workspace access"],
      ["data-handling", "Data handling"],
      ["security-status", "Security status"],
    ],
  },
];

const BY_SECTION = new Map<string, DocGroup>();
for (const g of DOC_GROUPS) for (const [id] of g.items) BY_SECTION.set(id, g);

// Anchors that live inside a section rather than naming one.
const NESTED: Record<string, string> = {
  "radiated-emissions-investigation": "introduction",
  "how-crado-works": "introduction",
  "tests-and-causes": "observations-and-hypotheses",
  "margin-convention": "supported-rule-evaluation",
  "example-supported": "worked-examples",
  "example-blocked": "worked-examples",
};

// Anchors from earlier versions of /docs.
const LEGACY: Record<string, string> = {
  overview: "introduction",
  architecture: "introduction",
  "system-architecture": "introduction",
  pipeline: "introduction",
  ingestion: "evidence-and-provenance",
  "ingestion-primitives": "evidence-and-provenance",
  gates: "supported-rule-evaluation",
  "deterministic-gates": "supported-rule-evaluation",
  "deterministic-evaluation": "supported-rule-evaluation",
  coverage: "regulatory-coverage",
  standards: "regulatory-coverage",
  "regulatory-standards": "regulatory-coverage",
  payload: "evidence-packages",
  output: "evidence-packages",
  "example-output": "evidence-packages",
  "verification-trace": "evidence-packages",
  security: "security-status",
  "enterprise-security": "security-status",
  "tenant-isolation": "workspace-access",
};

export function groupBySlug(slug: string) {
  return DOC_GROUPS.find((g) => g.slug === slug);
}

export function groupByPath(path: string | null) {
  return DOC_GROUPS.find((g) => g.path === path) ?? DOC_GROUPS[0];
}

/** Full href for any docs anchor, including nested and legacy ones. */
export function docHref(anchor: string) {
  const id = LEGACY[anchor] ?? anchor;
  const group = DOC_GROUPS.find((g) => g.slug === id);
  if (group) return group.path;
  const g = BY_SECTION.get(id) ?? BY_SECTION.get(NESTED[id] ?? "");
  if (!g) return null;
  return g.items[0][0] === id ? g.path : `${g.path}#${id}`;
}
