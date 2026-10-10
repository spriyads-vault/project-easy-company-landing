import type { Metadata } from "next";
import type { ReactNode } from "react";
import Agents from "@/components/home-v6/sections/Agents";
import { Essay } from "@/components/home-v6/sections/Bands";
import { SectionClosing } from "@/components/home-v6/sections/Closing";
import { Coverage } from "@/components/home-v6/sections/Coverage";
import Faq from "@/components/home-v6/sections/Faq";
import HowItWorks from "@/components/home-v6/sections/HowItWorks";
import { CONTAINER, INTRO } from "@/components/home-v6/ui";
import WaitlistFormV6 from "@/components/home-v6/waitlist/WaitlistFormV6";
import JsonLd from "@/components/site/JsonLd";
import { SECTION_PAGES_COPY, type SectionSlug } from "@/content/section-pages";
import { V6_FAQ_PAGE_LD } from "@/home/v6/structuredData";
import { HOME_URL, SITE_NAME, SITE_URL } from "@/lib/site";
import SiteShellV6 from "../SiteShellV6";

/*
 * The section pages (SCRUM-310, behind NEXT_PUBLIC_FF_SECTION_PAGES with NEXT_PUBLIC_FF_HOMEPAGE_V6): each is the
 * v6 shell, an H1 with one intro line, the homepage section in full, and the closing block. Served by
 * src/app/[section]/page.tsx.
 */

export function sectionUrl(slug: SectionSlug): string {
  return `${SITE_URL}/${slug}`;
}

/** Title, description, canonical, Open Graph and Twitter. The share images come from [section]/opengraph-image.tsx. */
export function sectionMetadata(slug: SectionSlug): Metadata {
  const { title, description } = SECTION_PAGES_COPY[slug];
  const url = sectionUrl(slug);
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: url },
    robots: { index: true, follow: true, "max-image-preview": "large" },
    openGraph: { type: "website", siteName: SITE_NAME, url, title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

function breadcrumbLd(slug: SectionSlug): object {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: HOME_URL },
      { "@type": "ListItem", position: 2, name: SECTION_PAGES_COPY[slug].name, item: sectionUrl(slug) },
    ],
  };
}

/** H1 (the v6 H1 scale) and the one intro line. */
function PageIntro({ slug, titleId }: { slug: SectionSlug; titleId?: string }) {
  const { h1, intro } = SECTION_PAGES_COPY[slug];
  return (
    <div className={`${CONTAINER} flex flex-col gap-7 pt-[100px] pb-(--v6-section)`}>
      <h1 id={titleId} className="m-0 max-w-[20ch] font-v6-serif text-[length:var(--v6-h1)] leading-(--v6-h1-lh) font-normal tracking-[-.02em] text-balance">
        {h1}
      </h1>
      <p className={`${INTRO} max-w-[44ch] text-v6-muted`}>{intro}</p>
    </div>
  );
}

/** /waitlist: the same form as the footer, on its own. */
function WaitlistBlock() {
  return (
    <div className={`${CONTAINER} pb-(--v6-section)`}>
      <div className="max-w-[720px] rounded-v6-panel border border-v6-line bg-v6-card p-6 v6t:p-10">
        {/* The waitlist API accepts only its existing source values ("waitlist-page" would be rejected without a
            schema change), so this form sends the homepage's inline-form value. */}
        <WaitlistFormV6 source="final_cta_inline" />
      </div>
    </div>
  );
}

const BODY: Record<SectionSlug, ReactNode> = {
  "how-it-works": (
    <>
      <Essay />
      <HowItWorks />
    </>
  ),
  agents: <Agents intro={false} />,
  coverage: <Coverage labelledBy="page-title" />,
  faq: <Faq page />,
  waitlist: <WaitlistBlock />,
};

export default function SectionPage({ slug }: { slug: SectionSlug }) {
  const isWaitlist = slug === "waitlist";
  return (
    <SiteShellV6 waitlist={!isWaitlist}>
      <JsonLd data={breadcrumbLd(slug)} />
      {slug === "faq" && <JsonLd data={V6_FAQ_PAGE_LD} />}
      <main id="main" data-section-page={slug}>
        <PageIntro slug={slug} titleId="page-title" />
        {BODY[slug]}
        <SectionClosing waitlistButton={!isWaitlist} />
      </main>
    </SiteShellV6>
  );
}
