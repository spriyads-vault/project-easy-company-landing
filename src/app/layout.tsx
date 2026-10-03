import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import BookingManager from "@/components/site/BookingManager";
import { HOME_DESCRIPTION, HOME_TITLE, OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Headings 24px and above, and the wordmark.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500"],
});

// Docs code blocks and the hero board's silkscreen labels only.
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
    <html lang="en" data-scroll-behavior="smooth" className={`${inter.variable} ${spaceGrotesk.variable} ${plexMono.variable}`}>
      <body>
        {children}
        <BookingManager />
      </body>
    </html>
  );
}
