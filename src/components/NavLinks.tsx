"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const SECTION_LINKS = [
  { href: "/#architecture", label: "Architecture" },
  { href: "/#pipeline", label: "Pipeline" },
  { href: "/#specifications", label: "Specifications" },
];

export default function NavLinks() {
  const onDocs = usePathname()?.startsWith("/docs") ?? false;

  return (
    <>
      {SECTION_LINKS.map(({ href, label }) => (
        <a key={href} href={href} className="whitespace-nowrap text-paper no-underline hover:text-mint">
          {label}
        </a>
      ))}
      <Link
        href="/docs"
        aria-current={onDocs ? "page" : undefined}
        className={`flex items-center gap-2 whitespace-nowrap no-underline hover:text-mint ${
          onDocs ? "text-[#F4F2EC]" : "text-paper"
        }`}
      >
        {onDocs && <span aria-hidden="true" className="size-1.5 bg-mint" />}
        Docs
      </Link>
    </>
  );
}
