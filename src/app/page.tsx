import Approach from "@/components/home/Approach";
import Direction from "@/components/home/Direction";
import EvidenceStates from "@/components/home/EvidenceStates";
import Hero from "@/components/home/Hero";
import Pilot from "@/components/home/Pilot";
import System from "@/components/home/System";
import Workbench from "@/components/home/Workbench";
import AnnouncementBar from "@/components/site/AnnouncementBar";
import JsonLd from "@/components/site/JsonLd";
import SectionScroller from "@/components/site/SectionScroller";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import SkipLink from "@/components/site/SkipLink";
import { HOME_DESCRIPTION, HOME_TITLE, OG_IMAGE, SITE_URL, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/" });

const WEBPAGE = {
  "@type": "WebPage",
  "@id": `${SITE_URL}/#webpage`,
  url: `${SITE_URL}/`,
  name: HOME_TITLE,
  description: HOME_DESCRIPTION,
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  primaryImageOfPage: { "@type": "ImageObject", url: `${SITE_URL}${OG_IMAGE.url}` },
};

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-oat font-sans text-ink">
      <JsonLd nodes={[WEBPAGE]} />
      <SectionScroller />
      <SkipLink target="main" />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Approach />
        <System />
        <Workbench />
        <EvidenceStates />
        <Direction />
        <Pilot />
      </main>
      <SiteFooter />
    </div>
  );
}
