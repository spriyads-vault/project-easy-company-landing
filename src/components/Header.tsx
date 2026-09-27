import Image from "next/image";
import Link from "next/link";
import BookPilotButton from "./BookPilotButton";
import CalEmbed from "./CalEmbed";
import NavLinks from "./NavLinks";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-(--header-h) w-full items-center justify-between gap-6 border-b border-ink bg-night px-6">
      <CalEmbed />
      <Link href="/" aria-label="Crado home" className="flex">
        <Image
          src="/assets/crado-logo.png"
          alt="Crado - Enterprise Hardware Compliance Automation Logo"
          width={882}
          height={1000}
          priority
          className="block h-6 w-auto"
        />
      </Link>
      <nav
        aria-label="Primary Navigation"
        className="hidden items-center gap-8 border-x border-ink px-8 min-[720px]:flex"
      >
        <NavLinks />
      </nav>
      <BookPilotButton
        aria-label="Book a compliance pilot scoping call"
        className="inline-flex cursor-pointer items-center rounded-none border-0 bg-mint px-4 py-2 font-mono text-xs leading-4 tracking-[0.1em] whitespace-nowrap text-ink uppercase transition-colors duration-200 hover:bg-mint/80"
      >
        Book a pilot
      </BookPilotButton>
    </header>
  );
}
