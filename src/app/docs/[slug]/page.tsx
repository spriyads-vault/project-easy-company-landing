import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ComponentType } from "react";
import { DocsArticle } from "@crado/site-active";
import Changelog from "@/components/docs-site/content/Changelog";
import Concepts from "@/components/docs-site/content/Concepts";
import Evaluation from "@/components/docs-site/content/Evaluation";
import Reference from "@/components/docs-site/content/Reference";
import Trust from "@/components/docs-site/content/Trust";
import ArithmeticCoverage from "@/components/docs-site/spec/ArithmeticCoverage";
import Security from "@/components/docs-site/spec/Security";
import TruthStates from "@/components/docs-site/spec/TruthStates";
import Validation from "@/components/docs-site/spec/Validation";
import { DOCS_SLUGS, docsMetadata, docsPageBySlug } from "@/lib/docs-pages";
import { DOCS_SPEC } from "@/lib/flags";

/**
 * Page content per slug. With NEXT_PUBLIC_FF_DOCS_SPEC on, the same URLs carry the specification sections (truth states,
 * arithmetic and coverage, validation, security); the changelog is unchanged.
 */
const CONTENT: Record<string, ComponentType> = DOCS_SPEC
  ? { concepts: TruthStates, evaluation: Validation, reference: ArithmeticCoverage, trust: Security, changelog: Changelog }
  : { concepts: Concepts, evaluation: Evaluation, reference: Reference, trust: Trust, changelog: Changelog };

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
