import Image from "next/image";
import Link from "next/link";

const LINK = "py-2.5 text-ink";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-oat text-ink">
      <div className="mx-auto box-content flex max-w-[1280px] flex-wrap items-end justify-between gap-x-12 gap-y-6 px-gutter pt-12 pb-10">
        <div className="flex flex-col gap-3">
          <Link href="/" aria-label="Crado home" className="block self-start py-0.5">
            <Image
              src="/assets/crado-mark-black.png"
              alt="Crado"
              width={39}
              height={44}
              className="block h-11 w-auto"
            />
          </Link>
          <a href="mailto:hello@crado.io" className="font-mono text-[15px] text-ink underline-offset-[5px]">
            hello@crado.io
          </a>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-7 gap-y-1 text-base">
          <Link href="/#approach" className={LINK}>
            Approach
          </Link>
          <Link href="/#system" className={LINK}>
            System
          </Link>
          <Link href="/docs" className={LINK}>
            Docs
          </Link>
          <Link href="/privacy" className={LINK}>
            Privacy
          </Link>
          <Link href="/terms" className={LINK}>
            Terms
          </Link>
          <a href="https://www.linkedin.com/company/crado-io/" className={LINK}>
            LinkedIn
          </a>
        </nav>
      </div>
      <div className="mx-auto box-content flex max-w-[1280px] flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-[#DDD9CF] px-gutter pt-6 pb-10">
        <span className="flex items-center gap-4">
          <Image
            src="/assets/nvidia-inception-badge.png"
            alt="NVIDIA Inception Program"
            width={128}
            height={55}
            className="block h-[55px] w-auto"
          />
          <span className="text-sm text-muted">Member of NVIDIA Inception</span>
        </span>
        <span className="font-mono text-[13px] text-muted">© 2026 Crado</span>
      </div>
    </footer>
  );
}
