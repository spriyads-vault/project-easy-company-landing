import type { Metadata } from "next";

export const SITE_URL = "https://www.crado.io";
export const SITE_NAME = "Crado";

export const HOME_TITLE = "Crado | Hardware Compliance Inside the Engineering Loop";
export const HOME_DESCRIPTION =
  "Connect hardware revisions, regulatory requirements and test evidence. Investigate radiated-emissions failures and prepare reviewed retest plans with Crado.";

export const OG_IMAGE = {
  url: "/og/crado-og-1200x630.png",
  width: 1200,
  height: 630,
  alt: "Crado logo with the headline Compliance, inside the engineering loop, on an oat background with slate and green revision layers.",
};

/** Canonical, Open Graph and Twitter metadata for one public page. */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { type, siteName: SITE_NAME, title, description, url, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE] },
  };
}

const ORGANIZATION = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/assets/crado-mark-black.png`, width: 882, height: 1001 },
  email: "hello@crado.io",
  sameAs: ["https://www.linkedin.com/company/crado-io/"],
};

const WEBSITE = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export function jsonLd(...nodes: object[]) {
  return JSON.stringify({ "@context": "https://schema.org", "@graph": [ORGANIZATION, WEBSITE, ...nodes] }).replace(
    /</g,
    "\\u003c",
  );
}
