import { FAQ_V8, V8_DESCRIPTION } from "@/content/home-v8";
import { CONTACT_EMAIL, HOME_URL, LINKEDIN_URL, LOGO_PATH, SITE_NAME, SITE_URL } from "@/lib/site";

/** JSON-LD for the v8 homepage: Organization, WebSite, SoftwareApplication, FAQPage and BreadcrumbList. */
export const V8_JSON_LD = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: HOME_URL,
    logo: `${SITE_URL}${LOGO_PATH}`,
    email: CONTACT_EMAIL,
    sameAs: [LINKEDIN_URL],
  },
  { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: HOME_URL },
  // No ratings and no offers: Crado has neither public reviews nor public pricing.
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: V8_DESCRIPTION,
    url: HOME_URL,
  },
  // Generated from the visible FAQ, so the two always match word for word.
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_V8.map(({ q, a }) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: HOME_URL }],
  },
];
