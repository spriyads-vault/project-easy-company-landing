import Image from "next/image";
import Link from "next/link";
import { CLOSING_BODY, CLOSING_H2, CTA, WAITLIST_COPY } from "@/content/home-v6";
import { SECTION_CLOSING_BODY, SECTION_CLOSING_H2, SECTION_WAITLIST_TITLE } from "@/content/section-pages";
import { CLEAN_URLS } from "@/lib/flags";
import { BOOKING_URL, CONTACT_EMAIL, LINKEDIN_URL } from "@/lib/site";
import type { WaitlistSource } from "@/lib/waitlist/schema";
import { HOW_IT_WORKS_DOCS, SECTION_PATHS, bookHref, sectionHref } from "../links";
import { BUTTON_ON_DARK, BUTTON_PRIMARY, CONTAINER, H2, H3, INTRO, LABEL, MONO, Pill } from "../ui";
import WaitlistFormV6 from "../waitlist/WaitlistFormV6";
import LegacyAnchors from "./LegacyAnchors";

/** Rust band: book a case review (design: CLOSING, id "book"). */
export function Closing() {
  return (
    <section id="book" data-screen-label="Closing" data-band="dark" className="bg-v6-rust py-(--v6-section) text-v6-on-dark">
      <div className={`${CONTAINER} flex flex-col items-center gap-6 text-center`}>
        <h2 className={`${H2} max-w-[20ch]`}>{CLOSING_H2}</h2>
        <p className={`${INTRO} max-w-[44ch] text-v6-on-dark-muted`}>{CLOSING_BODY}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <a href={BOOKING_URL} target="_blank" rel="noopener" className={BUTTON_PRIMARY}>
            {CTA.book}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <Link href={HOW_IT_WORKS_DOCS} className={BUTTON_ON_DARK}>
            {CTA.readHow}
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Closing block with the section pages on (SCRUM-310): the homepage and every section page except /waitlist. Rust
 * band, "Bring us your next design change.", one line and one button to the waitlist. No booking link.
 */
export function SectionClosing() {
  return (
    <section data-screen-label="Closing" data-band="dark" className="bg-v6-rust py-(--v6-section) text-v6-on-dark">
      <div className={`${CONTAINER} flex flex-col items-center gap-6 text-center`}>
        <h2 className={`${H2} max-w-[20ch]`}>{SECTION_CLOSING_H2}</h2>
        <p className={`${INTRO} max-w-[44ch] text-v6-on-dark-muted`}>{SECTION_CLOSING_BODY}</p>
        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <Link href={SECTION_PATHS.waitlist} className={BUTTON_PRIMARY}>
            {CTA.join}
          </Link>
        </div>
      </div>
    </section>
  );
}

const FOOT_LINK = "py-[11px] text-v6-ink hover:text-v6-muted";
const FOOT_HEAD = `${LABEL} mb-2 text-v6-muted uppercase`;
const ICON_LINK =
  "flex h-11 w-11 items-center justify-center rounded-v6-button border border-v6-line-strong font-v6-sans text-[15px] leading-none font-medium text-v6-ink transition-colors duration-150 ease-v6-ui hover:border-v6-ink hover:text-v6-ink active:translate-y-px";

interface FooterProps {
  /** "" on the homepage; "/" elsewhere, so the Product links and "Book a case review" go to the homepage sections. */
  linkBase?: "" | "/";
  /** Attribution for the waitlist form: the homepage's inline form, or "docs" on docs pages. */
  source?: WaitlistSource;
  /** The waitlist title's level: h3 under the page's h2 sections; h2 on a page with none (the 404). */
  waitlistHeading?: "h2" | "h3";
  /** Leave out the waitlist block (on /waitlist, which has the form already). */
  waitlist?: boolean;
}


/** Footer: the waitlist, link columns and the NVIDIA Inception badge, on a page card over forest (design: FOOTER). */
export function Footer({ linkBase = "", source, waitlistHeading: WaitlistHeading = "h3", waitlist = true }: FooterProps) {
  return (
    <footer className="bg-v6-forest p-6">
      <div className="rounded-v6-panel bg-v6-page pt-16 pb-7">
        <div className={`${CONTAINER} flex flex-col gap-12`}>
          {waitlist && (
            <div id="waitlist" data-screen-label="Waitlist" className="relative grid grid-cols-12 items-start gap-x-6 gap-y-7">
              <LegacyAnchors section="waitlist" />
              <div className="col-[1/-1] flex flex-col gap-3 v6d:col-[1/6]">
                <Pill tone="sun">{WAITLIST_COPY.tag}</Pill>
                <WaitlistHeading className={`${H3} mt-2 text-balance`}>{CLEAN_URLS ? SECTION_WAITLIST_TITLE : WAITLIST_COPY.title}</WaitlistHeading>
                <p className="m-0 max-w-[64ch] text-pretty text-v6-muted">{WAITLIST_COPY.body}</p>
              </div>
              <div className="col-[1/-1] flex flex-col v6d:col-[7/13]">
                <WaitlistFormV6 source={source} />
              </div>
            </div>
          )}

          <nav aria-label="Footer" className={`grid grid-cols-1 ${waitlist ? "border-t border-v6-line pt-7" : "-mt-5"} font-v6-sans text-[15px] leading-[22px] v6t:grid-cols-2 v6d:grid-cols-4`}>
            <div className="flex flex-col py-5 pr-5">
              <div className={FOOT_HEAD}>Product</div>
              <a href={sectionHref("how", linkBase)} className={FOOT_LINK}>
                How it works
              </a>
              <a href={sectionHref("agents", linkBase)} className={FOOT_LINK}>
                Agents
              </a>
              <a href={sectionHref("coverage", linkBase)} className={FOOT_LINK}>
                Coverage
              </a>
            </div>
            <div className="flex flex-col py-5 pr-5">
              <div className={FOOT_HEAD}>Company</div>
              {/* No booking link with the section pages on. */}
              {!CLEAN_URLS && (
                <a href={bookHref(linkBase)} className={FOOT_LINK}>
                  {CTA.book}
                </a>
              )}
              <a href={sectionHref("waitlist")} className={FOOT_LINK}>
                {CTA.join}
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} className={FOOT_LINK}>
                Contact
              </a>
            </div>
            <div className="flex flex-col py-5 pr-5">
              <div className={FOOT_HEAD}>Legal</div>
              <Link href="/privacy" className={FOOT_LINK}>
                Privacy
              </Link>
              <Link href="/terms" className={FOOT_LINK}>
                Terms
              </Link>
            </div>
            <div className="flex flex-col gap-3 py-5 pr-5">
              <div className={`${LABEL} text-v6-muted uppercase`}>Connect</div>
              <div className="flex gap-2">
                <a href={LINKEDIN_URL} target="_blank" rel="noopener" aria-label="LinkedIn (opens in a new tab)" className={ICON_LINK}>
                  {/* "in" drawn by CSS so the visible glyphs never compete with the accessible name. */}
                  <span aria-hidden="true" className="before:content-['in']" />
                </a>
                <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email" className={ICON_LINK}>
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                    <rect x=".65" y=".65" width="14.7" height="10.7" rx="1" />
                    <polyline points="1,1.5 8,7 15,1.5" />
                  </svg>
                </a>
              </div>
            </div>
          </nav>

          <div className={`flex flex-wrap items-center justify-between gap-4 border-t border-v6-line pt-5 ${MONO} text-v6-muted`}>
            <span>© 2026 Crado</span>
            <div className="flex items-center gap-3">
              <span>Member of NVIDIA Inception</span>
              {/* The member badge as supplied (501×217), scaled to 32px tall: no recolouring, cropping or effects. */}
              <Image src="/assets/nvidia-inception-badge.png" alt="NVIDIA Inception program member" width={74} height={32} className="block h-8 w-auto" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
