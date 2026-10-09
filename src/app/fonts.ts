// Homepage v3 and every other page. With NEXT_PUBLIC_FF_HOMEPAGE_V6 on, fonts-v6.ts replaces this module.
import { Geist, Geist_Mono, Inter, Instrument_Serif } from "next/font/google";

// Inter (OFL) is the display and text face. It is the variable font with the optical size axis, so headings set
// `font-variation-settings: "opsz" 32` and body text picks its size automatically. Preloaded because the hero h1
// (the LCP element) uses it; next/font's size-adjusted fallback keeps metrics stable until it swaps in.
const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
});

// Geist and Geist Mono (OFL) for mockup UI and labels, self-hosted by next/font as Latin subsets. Geist is not
// preloaded: above the fold it only appears inside the hero product window, so it should not compete with the
// hero text. Geist Mono (banner and eyebrows) keeps its preload so the banner never swaps.
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  preload: false,
});

// Glyphs outside the Latin subset (the "→" in labels) fall back to the generic monospace face, as in the design,
// rather than to next/font's metric-adjusted Arial. Preloaded, so the swap happens before first paint.
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  adjustFontFallback: false,
  fallback: ["monospace"],
});

// Pixel-serif accent ("loop", step numbers). The canvas pixel effect draws over the real text.
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  // The pixel canvas waits for document.fonts.load anyway, so no preload.
  preload: false,
});

export const FONT_VARIABLES = [inter.variable, geistSans.variable, geistMono.variable, instrumentSerif.variable].join(" ");
