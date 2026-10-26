// Root layout fonts while NEXT_PUBLIC_FF_HOMEPAGE_V8 is on (next.config.ts swaps this in for fonts.ts). Every page
// (homepage, docs, legal, 404) uses the v8 faces: the v8 shell maps the docs' font tokens onto them
// (src/site/v8/site.css), so the v3 faces are not loaded at all. src/home/v8/fonts.ts re-exports the variables.
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

// Google Sans Flex (OFL) for prose, UI and the "Crado" wordmark. Self-hosted as Google's Latin subset instanced to the
// weights the site sets (400 to 600, variable), 38 KB instead of the 51 KB full axis (src/app/fonts/README.md).
const googleSansFlex = localFont({
  src: "./fonts/google-sans-flex-latin-400-600.woff2",
  weight: "400 600",
  variable: "--font-google-sans-flex",
  fallback: ["system-ui", "sans-serif"],
});

// JetBrains Mono (OFL), tabular, for frequencies, margins, clause numbers, harmonic ordinals and revision IDs. Not
// preloaded: above the fold it only appears inside the hero artifact and the announcement bar.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  fallback: ["ui-monospace", "monospace"],
  preload: false,
});

export const V8_FONT_VARIABLES = [googleSansFlex.variable, jetbrainsMono.variable].join(" ");

export const FONT_VARIABLES = V8_FONT_VARIABLES;
