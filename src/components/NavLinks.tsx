"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINK =
  "whitespace-nowrap font-mono text-xs leading-4 tracking-[0.1em] uppercase no-underline transition-colors duration-200";

// Absolute root hashes so the links work from /docs, /privacy and /terms too.
const SECTION_LINKS = [
  { href: "/#thesis", label: "Thesis" },
  { href: "/#pipeline", label: "System" },
];

export default function NavLinks() {
  const onDocs = usePathname()?.startsWith("/docs") ?? false;

  return (
    <>
      {SECTION_LINKS.map(({ href, label }) => (
        <a key={href} href={href} className={`${LINK} text-muted-2 hover:text-paper`}>
          {label}
        </a>
      ))}
      <Link
        href="/docs"
        aria-current={onDocs ? "page" : undefined}
        className={
          onDocs
            ? `${LINK} -mx-[11px] -my-[5px] flex items-center gap-2 border border-steel bg-night-2 px-2.5 py-1 text-[#F4F2EC] hover:text-[#F4F2EC]`
            : `${LINK} text-muted-2 hover:text-paper`
        }
      >
        {onDocs && <span aria-hidden="true" className="size-1.5 bg-mint" />}
        Docs
      </Link>
    </>
  );
}
