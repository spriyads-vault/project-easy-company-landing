// Root layout fonts while NEXT_PUBLIC_FF_HOMEPAGE_V6 is on (next.config.ts swaps this in for fonts.ts). With the flag
// on, every page is v6 (homepage, docs, legal, 404), so the root layout serves IBM Plex (OFL) only, preloaded on
// every page; the v3 faces are not loaded at all. Self-hosted by next/font as Latin subsets, only the weights the v6
// design sets: Serif 400 for headings, Sans 400/500 for text and buttons, Mono 500 for labels and code. next/font's
// size-adjusted fallbacks keep the layout still while they load. next/font needs literal options, hence a module of
// its own; src/home/v6/fonts.ts re-exports these for the homepage root.
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-plex-serif",
  fallback: ["Georgia", "serif"],
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-sans",
  fallback: ["system-ui", "sans-serif"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-plex-mono",
  fallback: ["ui-monospace", "monospace"],
});

export const V6_FONT_VARIABLES = [plexSerif.variable, plexSans.variable, plexMono.variable].join(" ");
export const FONT_VARIABLES = V6_FONT_VARIABLES;
