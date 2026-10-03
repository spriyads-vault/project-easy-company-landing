import Approach from "@/components/home/Approach";
import Capabilities from "@/components/home/Capabilities";
import DemoChangeReview, { CHANGE_REVIEW } from "@/components/home/DemoChangeReview";
import DemoInvestigation, { INVESTIGATION } from "@/components/home/DemoInvestigation";
import DemoRecord, { RECORD } from "@/components/home/DemoRecord";
import Hero from "@/components/home/Hero";
import Outcome from "@/components/home/Outcome";
import Pilot from "@/components/home/Pilot";
import ScrollEffects from "@/components/home/ScrollEffects";
import TimeComparison from "@/components/home/TimeComparison";
import "@/components/home/home.css";
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
    <div id="top" className="min-h-screen bg-oat font-sans text-fg">
      <JsonLd nodes={[WEBPAGE]} />
      <SectionScroller />
      <ScrollEffects />
      <SkipLink target="main" />
      <AnnouncementBar />
      <SiteHeader />
      <main id="main">
        <Hero />
        <Approach />
        <div id="system">
          <Outcome
            id="evaluate"
            numeral="01"
            eyebrow="Evaluate"
            title="See what the change could affect."
            body="Review a design change against the available requirements and earlier evidence. Find the questions worth answering before the next build or test."
            tone="blue"
            alt={CHANGE_REVIEW.alt}
            caption="A focused question for the next build or test."
          >
            <DemoChangeReview />
          </Outcome>
          <Outcome
            id="investigate"
            numeral="02"
            eyebrow="Investigate"
            title="Prepare a clearer next step."
            body="Bring scattered information into one investigation. Explore possible causes and prepare a focused change or test plan for your team to review."
            tone="lilac"
            alt={INVESTIGATION.alt}
            caption="Possible causes stay unconfirmed until your team checks them."
          >
            <DemoInvestigation />
          </Outcome>
          <Outcome
            id="maintain"
            numeral="03"
            eyebrow="Maintain"
            title="Keep the whole picture connected."
            body="Keep reports, lab emails, Slack discussions, and WhatsApp updates with the product and revision they concern. As new results arrive, see what is supported and what still needs attention."
            tone="butter"
            alt={RECORD.alt}
            caption="Every update stays with the product and revision it concerns."
          >
            <DemoRecord />
          </Outcome>
        </div>
        <Capabilities />
        <TimeComparison />
        <Pilot />
      </main>
      <SiteFooter />
    </div>
  );
}
