import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Logo from "@/components/ui/Logo";
import WaitlistButton from "@/components/waitlist/WaitlistButton";
import { CONTACT_EMAIL, LINKEDIN_URL } from "@/lib/site";

const linkClass = "text-fg-muted hover:text-fg";
const earlyAccess = <span className="ml-2 font-mono text-[10px] tracking-[0.1em] whitespace-nowrap text-fg-faint">EARLY ACCESS</span>;

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 text-[13px]">
      <h2 className="m-0 mb-1 font-mono text-[10px] font-normal tracking-[0.1em] text-fg-faint">{title}</h2>
      {children}
    </div>
  );
}

interface FooterProps {
  variant: "home" | "docs" | "page";
}

export default function Footer({ variant }: FooterProps) {
  const home = variant === "home";
  const section = (id: string) => (home ? `#${id}` : `/#${id}`);
  return (
    <footer className="border-t border-surface-5">
      <div className="mx-auto max-w-page px-(--space-gutter) pt-14 pb-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-8">
          <Column title="PRODUCT">
            <a href={section("change-review")} className={linkClass}>Change review{earlyAccess}</a>
            <a href={section("failure-investigation")} className={linkClass}>Failure investigation</a>
            <a href={section("evidence")} className={linkClass}>Evidence and communications{earlyAccess}</a>
            <a href={section("agents")} className={linkClass}>Agents{earlyAccess}</a>
            <a href={section("how-it-works")} className={linkClass}>How it works</a>
          </Column>
          <Column title="RESOURCES">
            <Link href="/docs" className={linkClass}>Docs</Link>
            <Link href="/docs/changelog" className={linkClass}>Changelog</Link>
            <a href={`mailto:${CONTACT_EMAIL}?subject=Security`} className={linkClass}>Security</a>
          </Column>
          <Column title="COMPANY">
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClass}>Contact</a>
            <a href={LINKEDIN_URL} className={linkClass}>LinkedIn</a>
            <WaitlistButton
              source={variant === "docs" ? "docs" : "section"}
              className={`cursor-pointer self-start border-0 bg-transparent p-0 text-left font-[inherit] text-[13px] ${linkClass}`}
            >
              Join early access
            </WaitlistButton>
          </Column>
          <Column title="LEGAL">
            <Link href="/privacy" className={linkClass}>Privacy</Link>
            <Link href="/terms" className={linkClass}>Terms</Link>
          </Column>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-6 border-t border-surface-5 pt-8">
          <div className="flex flex-col gap-2.5">
            <Link href="/" className="flex items-center gap-2.5 font-display text-[21px] font-bold tracking-[-0.04em]">
              <Logo height={24} alt="" />
              crado
            </Link>
            <span className="text-[13px] text-fg-muted">Compliance, inside the engineering loop.</span>
          </div>
          <div className="flex items-center gap-4 py-4">
            <span className="text-xs text-fg-muted">Member of NVIDIA Inception</span>
            <Image
              src="/assets/nvidia-inception-badge.png"
              alt="NVIDIA Inception member"
              width={74}
              height={32}
              // Official badge file, served unaltered.
              unoptimized
              loading="lazy"
              className="block h-8 w-auto"
            />
          </div>
        </div>
        <div className="mt-5 text-[12.5px] text-fg-faint">© 2026 Crado</div>
      </div>
    </footer>
  );
}
