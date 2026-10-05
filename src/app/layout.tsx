import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import BookingManager from "@/components/site/BookingManager";
import { HOME_DESCRIPTION, HOME_TITLE, OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

// Every label and every line of text on the site.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Docs code blocks only.
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400"],
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName: SITE_NAME, images: [OG_IMAGE] },
  twitter: { card: "summary_large_image", images: [OG_IMAGE] },
};

export const viewport: Viewport = {
  themeColor: "#FAFAF9",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${spaceGrotesk.variable} ${plexMono.variable}`}>
      <body>
        {children}
        <BookingManager />
      </body>
    </html>
  );
}
