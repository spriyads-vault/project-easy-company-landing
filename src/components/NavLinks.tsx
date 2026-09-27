"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { SCROLL_TARGET_KEY, clearHash, scrollToSection } from "@/lib/scroll";

const LINK =
  "whitespace-nowrap font-mono text-xs leading-4 tracking-[0.1em] uppercase no-underline transition-colors duration-200";

// hrefs stay absolute ("/#id") so they still work without JS, open in new tabs, etc.
const SECTION_LINKS = [
  { id: "thesis", label: "Thesis" },
  { id: "pipeline", label: "System" },
  { id: "specifications", label: "Specifications" },
];

export default function NavLinks() {
  const pathname = usePathname();
  const router = useRouter();
  const onDocs = pathname?.startsWith("/docs") ?? false;

  // Scroll to the section without leaving "#id" in the address bar.
  const goToSection = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (pathname === "/") {
      scrollToSection(id);
      clearHash();
      return;
    }
    try {
      sessionStorage.setItem(SCROLL_TARGET_KEY, id);
    } catch {}
    router.push("/", { scroll: false });
  };

  return (
    <>
      {SECTION_LINKS.map(({ id, label }) => (
        <Link
          key={id}
          href={`/#${id}`}
          onClick={(e) => goToSection(e, id)}
          className={`${LINK} text-muted-2 hover:text-paper`}
        >
          {label}
        </Link>
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
