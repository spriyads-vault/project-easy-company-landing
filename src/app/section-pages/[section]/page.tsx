import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { SECTION_SLUGS, type SectionSlug } from "@/content/section-pages";
import { SECTION_PAGES } from "@/lib/flags";
import SectionPage, { sectionMetadata } from "@/site/v6/sections/SectionPage";

// /how-it-works, /agents, /coverage, /faq and /waitlist (SCRUM-310), rewritten here by next.config.ts while the
// section pages are on. The canonical URLs are the clean paths. With the flag off there are no rewrites and no params.
export const dynamicParams = false;

interface SectionProps {
  params: Promise<{ section: string }>;
}

export function generateStaticParams(): { section: SectionSlug }[] {
  return SECTION_PAGES ? SECTION_SLUGS.map((section) => ({ section })) : [];
}

const slugOf = (s: string): SectionSlug | undefined => (SECTION_SLUGS as string[]).includes(s) ? (s as SectionSlug) : undefined;

export async function generateMetadata({ params }: SectionProps): Promise<Metadata> {
  const slug = slugOf((await params).section);
  return slug ? sectionMetadata(slug) : {};
}

export const viewport: Viewport = { colorScheme: "light", themeColor: "#F8F7F6" };

export default async function Page({ params }: SectionProps) {
  const slug = slugOf((await params).section);
  if (!SECTION_PAGES || !slug) notFound();
  return <SectionPage slug={slug} />;
}
