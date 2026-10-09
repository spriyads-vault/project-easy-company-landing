// The homepage. next.config.ts points @crado/home-active at src/home/v3 (default) or src/home/v6 when
// NEXT_PUBLIC_FF_HOMEPAGE_V6 is on, so only one homepage is ever in the build.
import HomePage, { metadata as homeMetadata, viewport as homeViewport } from "@crado/home-active";

export const metadata = homeMetadata;
export const viewport = homeViewport;

export default HomePage;
