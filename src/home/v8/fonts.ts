// Faces for the v8 homepage only (imported by src/home/v8/HomePage.tsx, so no other page loads or preloads them).
// Self-hosted by next/font as Latin subsets. The design also loads Material Symbols; its icons are inline SVG instead,
// so that webfont is not loaded at all.
import { JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";

// Google Sans Flex (OFL) for prose, UI and the "Crado" wordmark (institutional brief). Self-hosted as Google's Latin
// subset instanced to the weights the page sets (400 to 600, variable), 38 KB instead of the 51 KB full 1 to 1000
// axis next/font/google would fetch. Preloaded: the hero h1 and intro (the LCP element) use it.
const googleSansFlex = localFont({
  src: "./fonts/google-sans-flex-latin-400-600.woff2",
  weight: "400 600",
  variable: "--font-google-sans-flex",
  fallback: ["system-ui", "sans-serif"],
});

// JetBrains Mono (OFL), tabular, for frequencies, margins, clause numbers, harmonic ordinals and revision IDs. Not
// preloaded: above the fold it only appears inside the hero artifact. Glyphs outside Latin (● ✓ ≈ ○) fall back to the
// system monospace face, as in the design.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  fallback: ["ui-monospace", "monospace"],
  preload: false,
});

export const V8_FONT_VARIABLES = [googleSansFlex.variable, jetbrainsMono.variable].join(" ");
