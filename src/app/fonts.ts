import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

// Geist and Geist Mono (OFL), self-hosted by next/font as Latin subsets (SEO hand-off: "Self-host as WOFF2,
// Latin subset"). Geist is not preloaded: above the fold it only appears inside the hero collage, so it should not
// compete with the hero text. Geist Mono (banner and eyebrows) keeps its preload so the banner never swaps.
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  preload: false,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
});

// Accent words in headings ("loop", "change"). The canvas pixel effect draws over the real text.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  // The pixel canvas waits for document.fonts.load anyway, so no preload.
  preload: false,
});

/*
 * Satoshi (Fontshare licence) is not in the repo yet. Until it is, --font-satoshi is unset and the
 * metric-matched "Satoshi Fallback" from design-system.css renders instead.
 *
 * Drop-in once licensed WOFF2 files exist in src/app/fonts/:
 *
 *   import localFont from "next/font/local";
 *   const satoshi = localFont({
 *     src: [
 *       { path: "./fonts/Satoshi-Regular.woff2", weight: "400", style: "normal" },
 *       { path: "./fonts/Satoshi-Medium.woff2", weight: "500", style: "normal" },
 *       { path: "./fonts/Satoshi-Bold.woff2", weight: "700", style: "normal" },
 *     ],
 *     variable: "--font-satoshi",
 *     display: "swap",
 *     adjustFontFallback: "Arial",
 *   });
 *
 * and add `satoshi.variable` to FONT_VARIABLES below.
 */

export const FONT_VARIABLES = [geistSans.variable, geistMono.variable, instrumentSerif.variable].join(" ");
