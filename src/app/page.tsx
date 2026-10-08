import Agents from "@/components/landing/Agents";
import Faq from "@/components/landing/Faq";
import FinalCta from "@/components/landing/FinalCta";
import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import Principles from "@/components/landing/Principles";
import Statement from "@/components/landing/Statement";
import Steps from "@/components/landing/steps/Steps";
import UseCases from "@/components/landing/UseCases";
import JsonLd from "@/components/site/JsonLd";
import SiteShell from "@/components/site/SiteShell";
import { FAQ_PAGE_LD } from "@/lib/faq";
import { HOME_DESCRIPTION, HOME_TITLE, HOME_URL, ORGANIZATION_LD, SOFTWARE_APPLICATION_LD, WEBSITE_LD, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/" });

export default function Home() {
  return (
    <SiteShell variant="home">
      {/* React hoists these into <head>; see pageMetadata for why they are not in `metadata`. */}
      <link rel="canonical" href={HOME_URL} />
      <meta property="og:url" content={HOME_URL} />
      <JsonLd data={ORGANIZATION_LD} />
      <JsonLd data={WEBSITE_LD} />
      <JsonLd data={SOFTWARE_APPLICATION_LD} />
      <JsonLd data={FAQ_PAGE_LD} />
      <main id="main">
        <Hero />
        <Statement />
        <Steps />
        <HowItWorks />
        <UseCases />
        <Agents />
        <Principles />
        <Faq />
        <FinalCta />
      </main>
    </SiteShell>
  );
}
