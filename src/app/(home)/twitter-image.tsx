import { SOCIAL_ALT, SOCIAL_SIZE, socialImage } from "@/home/v6/socialImage";
import { SOCIAL_ALT_V8, socialImageV8 } from "@/home/v8/socialImage";
import { HOMEPAGE_V8 } from "@/lib/flags";

// The homepage share image (1200×630): the v8 dark card when NEXT_PUBLIC_FF_HOMEPAGE_V8 is on, the v6 light card when
// NEXT_PUBLIC_FF_HOMEPAGE_V6 is on, otherwise the existing v3 card. Lives in the (home) route group so it applies to
// "/" only.
export const alt = HOMEPAGE_V8 ? SOCIAL_ALT_V8 : SOCIAL_ALT;
export const size = SOCIAL_SIZE;
export const contentType = "image/png";

export default function Image() {
  return HOMEPAGE_V8 ? socialImageV8() : socialImage();
}
