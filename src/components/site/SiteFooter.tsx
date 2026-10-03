import Image from "next/image";
import Link from "next/link";
import CradoMark from "./CradoMark";
import SectionLink from "./SectionLink";

const HEADING = "m-0 text-sm leading-[1.5] tracking-[-0.01em] text-fg-subtle";
const LIST = "m-0 mt-4 flex list-none flex-col gap-1 p-0";
const LINK = "inline-block py-1.5 text-sm leading-[1.5] tracking-[-0.01em] text-ink no-underline hover:text-fg hover:underline";

export default function SiteFooter() {
  return (
    <footer className="bg-oat text-fg">
      <div className="mx-auto max-w-[1200px] px-[clamp(20px,4vw,40px)]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 border-t border-line pt-14 pb-12 [grid-template-areas:'brand_brand'_'crado_legal'_'contact_contact'] min-[900px]:grid-cols-[2fr_1fr_1fr_1fr] min-[900px]:[grid-template-areas:'brand_crado_legal_contact']">
          <div className="flex flex-col items-start gap-6 [grid-area:brand]">
            <Link href="/" aria-label="Crado home" className="flex items-center gap-2.5 text-fg no-underline">
              <CradoMark height={28} />
              <span data-wordmark className="text-2xl leading-none tracking-[-0.03em]">
                Crado
              </span>
            </Link>
            <span className="flex items-center gap-3">
              <Image
                src="/assets/nvidia-inception-badge.png"
                alt="NVIDIA Inception Program"
                width={74}
                height={32}
                className="block h-8 w-auto opacity-90"
              />
              <span className="text-sm leading-[1.5] text-fg-muted">Member of NVIDIA Inception</span>
            </span>
            <Link href="/privacy" className="group flex items-start gap-2.5 text-ink no-underline">
              <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" className="mt-0.5 flex-none">
                <path d="M8 1.5 13 3.5v4c0 3.2-2.1 5.6-5 7-2.9-1.4-5-3.8-5-7v-4z" />
                <path d="m5.8 8 1.6 1.6L10.4 6.5" strokeLinecap="round" />
              </svg>
              <span className="text-sm leading-[1.5]">
                <span className="group-hover:underline">Privacy</span>
                <span className="block text-fg-muted">How we handle and protect your data.</span>
              </span>
            </Link>
          </div>

          <nav aria-label="Crado" className="[grid-area:crado]">
            <h2 className={`${HEADING} font-sans`}>Crado</h2>
            <ul className={LIST}>
              <li>
                <SectionLink section="approach" className={LINK}>
                  Approach
                </SectionLink>
              </li>
              <li>
                <SectionLink section="system" className={LINK}>
                  System
                </SectionLink>
              </li>
              <li>
                <Link href="/docs" className={LINK}>
                  Docs
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal" className="[grid-area:legal]">
            <h2 className={`${HEADING} font-sans`}>Legal</h2>
            <ul className={LIST}>
              <li>
                <Link href="/privacy" className={LINK}>
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={LINK}>
                  Terms
                </Link>
              </li>
            </ul>
          </nav>

          <div className="[grid-area:contact]">
            <h2 className={`${HEADING} font-sans`}>Contact</h2>
            <ul className={LIST}>
              <li>
                <a href="https://www.linkedin.com/company/crado-io/" className={LINK}>
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:hello@crado.io" className={LINK}>
                  hello@crado.io
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="m-0 border-t border-line py-6 text-[13px] leading-[1.5] text-fg-subtle">© 2026 Crado</p>
      </div>
    </footer>
  );
}
