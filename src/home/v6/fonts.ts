import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";

// IBM Plex (OFL), self-hosted by next/font as Latin subsets, only the weights the v6 design sets: Serif 400 for
// headings, Sans 400/500 for text and buttons, Mono 500 for labels. Called from the v6 homepage module, so they are
// preloaded on "/" only (never on docs). next/font's size-adjusted fallbacks keep the layout still while they load.
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
