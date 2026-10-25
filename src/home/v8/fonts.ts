// Faces for the v8 homepage only (imported by src/home/v8/HomePage.tsx, so no other page loads or preloads them).
// Self-hosted by next/font as Latin subsets. The design also loads Material Symbols; its four icons are inline SVG
// instead, so that webfont is not loaded at all.
import { Figtree, Google_Sans_Flex, JetBrains_Mono } from "next/font/google";

// Figtree (OFL), the text and heading face. Variable, because the design sets 400, 450, 500 and 600. Preloaded: the
// hero h1 (the LCP element) uses it.
const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  fallback: ["system-ui", "sans-serif"],
});

// JetBrains Mono (OFL) for data, labels and the sample case. Not preloaded: above the fold it only appears inside the
// hero diagram. Glyphs outside Latin (● ✓ ≈ ○) fall back to the system monospace face, as in the design.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  fallback: ["ui-monospace", "monospace"],
  preload: false,
});

// Google Sans Flex (OFL) for the "Crado" wordmark only, at 600.
const googleSansFlex = Google_Sans_Flex({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-google-sans-flex",
  fallback: ["system-ui", "sans-serif"],
  preload: false,
});

export const V8_FONT_VARIABLES = [figtree.variable, jetbrainsMono.variable, googleSansFlex.variable].join(" ");
