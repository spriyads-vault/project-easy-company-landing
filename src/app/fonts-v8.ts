// Root layout fonts while NEXT_PUBLIC_FF_HOMEPAGE_V8 is on (next.config.ts swaps this in for fonts.ts). Docs, legal
// pages and the 404 keep the v3 design, so these are the v3 faces with the same options as src/app/fonts.ts, except
// that none is preloaded: the v8 homepage does not use them and loads its own (src/home/v8/fonts.ts), so a preload
// here would only compete with the homepage's hero text. next/font's size-adjusted fallbacks cover the swap.
import { Geist, Geist_Mono, Inter, Instrument_Serif } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-inter",
  preload: false,
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  preload: false,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist-mono",
  adjustFontFallback: false,
  fallback: ["monospace"],
  preload: false,
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  preload: false,
});

export const FONT_VARIABLES = [inter.variable, geistSans.variable, geistMono.variable, instrumentSerif.variable].join(" ");
