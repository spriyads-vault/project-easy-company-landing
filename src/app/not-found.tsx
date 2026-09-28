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
    <div className="flex min-h-screen flex-col bg-oat font-sans text-ink">
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="mx-auto box-content w-full max-w-[1280px] flex-1 px-gutter py-[clamp(72px,10vw,136px)]">
        <p className="m-0 mb-4 font-mono text-[13px] tracking-[0.06em] text-muted">404</p>
        <h1 className="m-0 mb-6 font-display text-[clamp(36px,4.4vw,52px)] leading-[1.05] font-medium tracking-[-0.03em]">
          This page does not exist.
        </h1>
        <p className="m-0 mb-8 max-w-[34rem] text-[19px] leading-[1.6]">
          The address may be mistyped, or the page may have moved.
        </p>
        <div className="flex flex-wrap gap-x-7 gap-y-4">
          <Link
            href="/"
            className="rounded-[3px] bg-ink px-6 py-4 text-[17px] font-medium text-oat no-underline hover:bg-ink-deep hover:text-oat"
          >
            Go to the homepage
          </Link>
          <Link href="/docs" className="py-4 text-[17px] text-ink">
            Read the docs
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
