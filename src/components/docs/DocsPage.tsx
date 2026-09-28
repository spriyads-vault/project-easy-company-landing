import type { ComponentType } from "react";
import JsonLd from "@/components/site/JsonLd";
import type { DocGroup } from "@/lib/docs";
import { SITE_URL, pageMetadata } from "@/lib/site";
import CoreConcepts from "./content/CoreConcepts";
import Evaluation from "./content/Evaluation";
import GetStarted from "./content/GetStarted";
import Reference from "./content/Reference";
import Trust from "./content/Trust";

const CONTENT: Record<string, ComponentType> = {
  "get-started": GetStarted,
  "core-concepts": CoreConcepts,
  evaluation: Evaluation,
  reference: Reference,
  trust: Trust,
};

export function docsMetadata(group: DocGroup) {
  return pageMetadata({ title: group.title, description: group.description, path: group.path, type: "article" });
}

export default function DocsPage({ group }: { group: DocGroup }) {
  const Content = CONTENT[group.slug];
  const url = `${SITE_URL}${group.path}`;
  const crumbs = [
    { name: "Home", item: `${SITE_URL}/` },
    { name: "Docs", item: `${SITE_URL}/docs` },
    ...(group.slug === "get-started" ? [] : [{ name: group.label, item: url }]),
  ];
  return (
    <>
      <JsonLd
        nodes={[
          {
            "@type": "TechArticle",
            "@id": `${url}#article`,
            url,
            headline: group.title.replace(" | ", ": "),
            description: group.description,
            inLanguage: "en",
            isPartOf: { "@id": `${SITE_URL}/#website` },
            publisher: { "@id": `${SITE_URL}/#organization` },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${url}#breadcrumb`,
            itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, ...c })),
          },
        ]}
      />
      <Content />
    </>
  );
}
