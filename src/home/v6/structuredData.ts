import { FAQ_V6, V6_DESCRIPTION } from "@/content/home-v6";
import { CONTACT_EMAIL, HOME_URL, LINKEDIN_URL, LOGO_PATH, SITE_NAME, SITE_URL } from "@/lib/site";

/** JSON-LD for the v6 homepage: Organization, WebSite, SoftwareApplication, FAQPage and BreadcrumbList. */
export const V6_ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: HOME_URL,
  logo: `${SITE_URL}${LOGO_PATH}`,
  email: CONTACT_EMAIL,
  sameAs: [LINKEDIN_URL],
};

export const V6_WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: HOME_URL,
};

/** No ratings and no offers: Crado has neither public reviews nor public pricing. */
export const V6_SOFTWARE_APPLICATION_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: V6_DESCRIPTION,
  url: HOME_URL,
};

/** Generated from the visible FAQ, so the two always match word for word. */
export const V6_FAQ_PAGE_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_V6.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export const V6_BREADCRUMB_LD = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: HOME_URL }],
};

export const V6_JSON_LD = [V6_ORGANIZATION_LD, V6_WEBSITE_LD, V6_SOFTWARE_APPLICATION_LD, V6_FAQ_PAGE_LD, V6_BREADCRUMB_LD];
