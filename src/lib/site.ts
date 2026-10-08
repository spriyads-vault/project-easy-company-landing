import type { Metadata } from "next";

export const SITE_URL = "https://www.crado.io";
export const SITE_NAME = "Crado";
export const CONTACT_EMAIL = "hello@crado.io";
export const LINKEDIN_URL = "https://www.linkedin.com/company/crado-io/";
export const BOOKING_URL = "https://cal.com/crado-a7dbr4/30min";
export const LOGO_PATH = "/assets/crado-logo.png";

export const HOME_TITLE = "Crado | Hardware compliance inside the engineering loop";
export const HOME_DESCRIPTION =
  "Crado keeps EMC test evidence tied to each product revision, investigates radiated-emissions failures and checks results against FCC Part 15 limits.";

export const OG_IMAGE = {
  url: "/og/crado-og-1200x630.png",
  width: 1200,
  height: 630,
  alt: "Crado: Compliance, inside the engineering loop.",
};

interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  ogAlt?: string;
}

/** Canonical, robots, Open Graph and Twitter metadata for one public page (SEO hand-off). */
export function pageMetadata({ title, description, path, type = "website", ogAlt = OG_IMAGE.alt }: PageMetadataInput): Metadata {
  // Next normalises the root URL to the bare origin; the hand-off wants "https://www.crado.io/", so the home
  // page renders its canonical and og:url itself (src/app/page.tsx).
  const root = path === "/";
  const url = `${SITE_URL}${path}`;
  const image = { ...OG_IMAGE, alt: ogAlt };
  return {
    title: { absolute: title },
    description,
    alternates: root ? undefined : { canonical: url },
    robots: { index: true, follow: true, "max-image-preview": "large" },
    openGraph: { type, siteName: SITE_NAME, url: root ? undefined : url, title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export const ORGANIZATION_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}${LOGO_PATH}`,
  email: CONTACT_EMAIL,
  sameAs: [LINKEDIN_URL],
};

export const WEBSITE_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: `${SITE_URL}/`,
};

export const SOFTWARE_APPLICATION_LD = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: SITE_NAME,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description: HOME_DESCRIPTION,
  url: `${SITE_URL}/`,
};

export const HOME_URL = `${SITE_URL}/`;
