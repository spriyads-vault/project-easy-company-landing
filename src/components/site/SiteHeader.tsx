"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import PilotLink from "./PilotLink";
import SectionLink from "./SectionLink";

const SECTIONS = [
  { id: "approach", label: "Approach" },
  { id: "system", label: "System" },
];

const NAV_LINK = "px-3.5 py-2.5 text-[15px] text-ink no-underline underline-offset-[5px] hover:underline";
const MENU_LINK = "border-b border-line-soft py-3.5 text-lg text-ink no-underline";

export default function SiteHeader() {
  const pathname = usePathname();
  // The menu is open for the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const onDocs = pathname?.startsWith("/docs") ?? false;

  // Close the menu on Escape and when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOn(null);
        menuButton.current?.focus();
      }
    };
    const wide = window.matchMedia("(min-width: 820px)");
    const onWide = () => wide.matches && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  const goHome = (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/" || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-oat text-ink">
      <div className="mx-auto box-content flex h-16 max-w-[1280px] items-center gap-6 px-gutter">
        <Link href="/" onClick={goHome} aria-label="Crado home" className="flex min-h-11 items-center">
          <Image
            src="/assets/crado-mark-black.png"
            alt="Crado"
            width={30}
            height={34}
            priority
            className="block h-[34px] w-auto"
          />
        </Link>

        <nav aria-label="Primary" className="mx-auto hidden gap-1 min-[820px]:flex">
          {SECTIONS.map(({ id, label }) => (
            <SectionLink key={id} section={id} className={NAV_LINK}>
              {label}
            </SectionLink>
          ))}
        </nav>
        <div className="hidden items-center gap-2 min-[820px]:flex">
          <Link
            href="/docs"
            aria-current={onDocs ? "page" : undefined}
            className={`px-3.5 py-2.5 text-[15px] text-ink underline decoration-2 underline-offset-[6px] ${
              onDocs ? "decoration-ink" : "decoration-transparent hover:decoration-ink"
            }`}
          >
            Docs
          </Link>
          <PilotLink className="rounded-[3px] bg-ink px-[18px] py-2.5 text-[15px] font-medium text-oat no-underline hover:bg-ink-deep hover:text-oat">
            Pilot
          </PilotLink>
        </div>

        <button
          ref={menuButton}
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="site-menu"
          className="ml-auto min-h-11 min-w-11 cursor-pointer rounded-[3px] border border-ink bg-transparent px-3.5 text-[15px] font-medium text-ink min-[820px]:hidden"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav
          id="site-menu"
          aria-label="Primary"
          className="flex flex-col border-t border-line bg-oat px-gutter pt-2 pb-5 min-[820px]:hidden"
        >
          {SECTIONS.map(({ id, label }) => (
            <SectionLink key={id} section={id} onClick={() => setOpen(false)} className={MENU_LINK}>
              {label}
            </SectionLink>
          ))}
          <Link href="/docs" onClick={() => setOpen(false)} className={MENU_LINK}>
            Docs
          </Link>
          <PilotLink
            onClick={() => setOpen(false)}
            className="mt-4 rounded-[3px] bg-ink px-[18px] py-3.5 text-center text-[17px] font-medium text-oat no-underline hover:text-oat"
          >
            Pilot
          </PilotLink>
        </nav>
      )}
    </header>
  );
}
