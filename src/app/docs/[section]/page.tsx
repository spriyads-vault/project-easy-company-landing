import { notFound } from "next/navigation";
import DocsPage, { docsMetadata } from "@/components/docs/DocsPage";
import { DOC_GROUPS, groupBySlug } from "@/lib/docs";

export const dynamicParams = false;

export function generateStaticParams() {
  return DOC_GROUPS.slice(1).map((g) => ({ section: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/docs/[section]">) {
  const group = groupBySlug((await params).section);
  return group ? docsMetadata(group) : {};
}

export default async function DocsSection({ params }: PageProps<"/docs/[section]">) {
  const group = groupBySlug((await params).section);
  if (!group || group.slug === "get-started") notFound();
  return <DocsPage group={group} />;
}
