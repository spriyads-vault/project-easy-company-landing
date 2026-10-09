import { LOGO_PATH } from "@/lib/site";

/** Rendered height of the nav mark (the design's 32px slot). */
export const LOGO_MARK_HEIGHT = 32;
const WIDTH = Math.round((LOGO_MARK_HEIGHT * 882) / 1000);
/** The same file through the Next image optimiser at 64px wide (2x the slot), about 2 KB instead of 42 KB. */
const MASK_URL = `/_next/image?url=${encodeURIComponent(LOGO_PATH)}&w=64&q=75`;

/**
 * The official Crado mark (public/assets/crado-logo.png, unaltered), shown in Ink on the light page. The file is a
 * white mark on transparency, so it is used as a CSS mask over an Ink fill rather than redrawn or re-exported (only resized,
 * by the image optimiser).
 * Decorative: the surrounding link carries the accessible name.
 */
export default function LogoMark() {
  return (
    <span
      aria-hidden="true"
      data-logo-mark
      className="block flex-none bg-v6-ink [mask-position:center] [mask-repeat:no-repeat] [mask-size:contain]"
      style={{ width: WIDTH, height: LOGO_MARK_HEIGHT, maskImage: `url(${MASK_URL})`, WebkitMaskImage: `url(${MASK_URL})` }}
    />
  );
}
