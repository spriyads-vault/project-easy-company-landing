import Image from "next/image";
import Link from "next/link";

const LINK = "py-2.5 text-ink";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-oat text-ink">
      <div className="mx-auto box-content flex max-w-[1280px] flex-wrap items-center justify-between gap-x-12 gap-y-6 px-gutter py-10">
        <div className="flex flex-col gap-1.5">
          <Link href="/" aria-label="Crado home" className="block pt-1 pb-2">
            <Image
              src="/assets/crado-mark-black.png"
              alt="Crado"
              width={882}
              height={1001}
              className="block h-10 w-auto"
            />
          </Link>
          <a href="mailto:hello@crado.io" className="text-[15px] text-ink">
            hello@crado.io
          </a>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-1 text-[15px]">
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
      <div className="mx-auto box-content flex max-w-[1280px] flex-wrap items-center gap-x-6 gap-y-4 border-t border-line-soft px-gutter pt-6 pb-10">
        <Image
          src="/assets/nvidia-inception-badge.png"
          alt="NVIDIA Inception Program"
          width={501}
          height={217}
          className="block h-[60px] w-auto"
        />
        <span className="text-sm text-muted">Member of NVIDIA Inception</span>
      </div>
    </footer>
  );
}
