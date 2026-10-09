import Link from "next/link";
import RecordBlockCanvas from "@/components/home-v6/RecordBlockCanvas";
import { BUTTON_PRIMARY, BUTTON_SECONDARY, CONTAINER, INTRO, LABEL } from "@/components/home-v6/ui";
import SiteShellV6 from "./SiteShellV6";

/** The 404 in the v6 design (SCRUM-296): page background, one H1, two ways on and a small still record block. */
export default function NotFoundV6() {
  return (
    <SiteShellV6 waitlistHeading="h2">
      <main id="main" className="py-(--v6-section)">
        <div className={`${CONTAINER} grid grid-cols-12 items-center gap-x-6 gap-y-10`}>
          <div className="col-[1/-1] flex flex-col items-start gap-6 v6t:col-[1/8]">
            <span className={`${LABEL} text-v6-muted`}>404</span>
            <h1 className="m-0 font-v6-serif text-[length:var(--v6-doc-h1)] leading-(--v6-doc-h1-lh) font-normal tracking-[-.02em] text-balance text-v6-ink">Page not found</h1>
            <p className={`${INTRO} max-w-[44ch] text-v6-muted`}>The page may have moved. Try the docs or go back home.</p>
            <nav aria-label="Recovery" className="mt-2 flex flex-wrap gap-3">
              <Link href="/" className={BUTTON_PRIMARY}>
                Go to homepage
              </Link>
              <Link href="/docs" className={BUTTON_SECONDARY}>
                Read the docs
              </Link>
            </nav>
          </div>
          <RecordBlockCanvas variant="still" className="col-[1/-1] block size-[160px] justify-self-start v6t:col-[9/13] v6t:size-[240px] v6t:justify-self-end" />
        </div>
      </main>
    </SiteShellV6>
  );
}
