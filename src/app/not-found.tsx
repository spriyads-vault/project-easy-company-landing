import type { Metadata } from "next";
import Link from "next/link";
import AnnouncementBar from "@/components/site/AnnouncementBar";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";

export const metadata: Metadata = {
  title: "Page not found | Crado",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-oat font-sans text-fg">
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="mx-auto box-content w-full max-w-[1200px] flex-1 px-gutter py-[clamp(72px,10vw,136px)]">
        <p className="m-0 mb-4 text-[11px] leading-[1.4] font-medium tracking-[0.08em] uppercase text-fg-muted">404</p>
        <h1 className="m-0 mb-6 font-display text-[clamp(40px,5vw,64px)] leading-[1.04] tracking-[-0.05em]">
          This page does not exist.
        </h1>
        <p className="m-0 mb-8 max-w-[34rem] text-lg leading-[1.65] tracking-[-0.015em] text-fg-muted">
          The address may be mistyped, or the page may have moved.
        </p>
        <div className="flex flex-wrap gap-x-7 gap-y-4">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-white no-underline hover:bg-ink-deep hover:text-white"
          >
            Go to the homepage
          </Link>
          <Link href="/docs" className="inline-flex h-11 items-center rounded-full border border-line px-5 text-sm font-medium text-ink no-underline hover:border-ink">
            Read the docs
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
