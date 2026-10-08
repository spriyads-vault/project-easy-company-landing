import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import DocsArticle from "@/components/docs-site/DocsArticle";
import Changelog from "@/components/docs-site/content/Changelog";
import Concepts from "@/components/docs-site/content/Concepts";
import Evaluation from "@/components/docs-site/content/Evaluation";
import Reference from "@/components/docs-site/content/Reference";
import Trust from "@/components/docs-site/content/Trust";
import { DOCS_SLUGS, docsMetadata, docsPageBySlug } from "@/lib/docs-pages";

const CONTENT: Record<string, ComponentType> = {
  concepts: Concepts,
  evaluation: Evaluation,
  reference: Reference,
  trust: Trust,
  changelog: Changelog,
};

export const dynamicParams = false;

export function generateStaticParams() {
  return DOCS_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/docs/[slug]">): Promise<Metadata> {
  const page = docsPageBySlug((await params).slug);
  return page ? docsMetadata(page) : {};
}

export default async function DocsSlugPage({ params }: PageProps<"/docs/[slug]">) {
  const { slug } = await params;
  const page = docsPageBySlug(slug);
  const Content = CONTENT[slug];
  if (!page || !Content || page.slug === "") notFound();
  return (
    <DocsArticle page={page}>
      <Content />
    </DocsArticle>
  );
}
