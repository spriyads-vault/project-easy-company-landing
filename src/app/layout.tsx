import type { Metadata, Viewport } from "next";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_NAME, SITE_URL } from "@/lib/site";
import { FONT_VARIABLES } from "@crado/fonts-active";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0A0A0B" },
    { media: "(prefers-color-scheme: light)", color: "#FAF9F7" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={FONT_VARIABLES}>
      <body>{children}</body>
    </html>
  );
}
