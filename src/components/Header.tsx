import Image from "next/image";
import Link from "next/link";
import BookPilotButton from "./BookPilotButton";
import CalEmbed from "./CalEmbed";

const NAV_LINKS = [
  { href: "/#architecture", label: "Architecture" },
  { href: "/#pipeline", label: "Pipeline" },
  { href: "/#specifications", label: "Specifications" },
];

export default function Header() {
  return (
    <header className="flex justify-center border-b border-ink bg-ink py-5">
      <CalEmbed />
      <div className="relative z-20 flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-x-6 gap-y-4 px-6">
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
          className="flex items-center justify-center gap-6 rounded-full border border-steel bg-[rgba(53,67,83,0.4)] px-8 py-2 text-sm leading-5 font-medium backdrop-blur-md max-md:order-3 max-md:basis-full"
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="whitespace-nowrap text-paper no-underline hover:text-mint"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5 text-sm leading-5 font-medium">
          <BookPilotButton
            aria-label="Book a compliance pilot scoping call"
            className="inline-flex cursor-pointer items-center whitespace-nowrap rounded-full border-0 bg-mint px-4 py-1.5 text-sm leading-5 font-medium text-ink hover:bg-mint-hover"
          >
            Book a pilot
          </BookPilotButton>
        </div>
      </div>
    </header>
  );
}
