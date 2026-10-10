import { SECTION_PAGES_COPY, SECTION_SLUGS, type SectionSlug } from "@/content/section-pages";
import { SOCIAL_SIZE, socialImage } from "@/home/v6/socialImage";
import { notFound } from "next/navigation";
import { SECTION_PAGES } from "@/lib/flags";

// Share image for each section page (SCRUM-310): the v6 light card with the page's H1.

export function generateStaticParams(): { section: SectionSlug }[] {
  return SECTION_PAGES ? SECTION_SLUGS.map((section) => ({ section })) : [];
}

export async function generateImageMetadata({ params }: { params: Promise<{ section: string }> }) {
  const copy = SECTION_PAGES_COPY[(await params).section as SectionSlug];
  return copy ? [{ id: "card", alt: copy.title, size: SOCIAL_SIZE, contentType: "image/png" }] : [];
}

export default async function Image({ params }: { params: Promise<{ section: string }> }) {
  const copy = SECTION_PAGES_COPY[(await params).section as SectionSlug];
  // The image id is generated per page, so params are not limited here; unknown pages (and every page while the
  // section pages are off) are 404s.
  if (!SECTION_PAGES || !copy) notFound();
  return socialImage(copy.h1);
}
