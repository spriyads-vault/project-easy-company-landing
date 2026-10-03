"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEvent } from "react";
import CradoMark from "./CradoMark";
import { ArrowIcon } from "./icons";
import PilotLink from "./PilotLink";
import SectionLink from "./SectionLink";

const SECTIONS = [
  { id: "approach", label: "Approach" },
  { id: "system", label: "System" },
];

const NAV_LINK = "px-0.5 py-3 text-sm leading-[1.5] tracking-[-0.01em] text-ink no-underline hover:text-slate";
const MENU_LINK =
  "border-b border-line py-5 font-display text-2xl leading-[1.2] tracking-[-0.03em] text-ink no-underline hover:text-slate";
const PILOT_PILL =
  "inline-flex flex-none items-center justify-center gap-3 rounded-full bg-ink font-medium whitespace-nowrap text-white no-underline transition-transform duration-[180ms] hover:-translate-y-px hover:bg-[#1C232D] hover:text-white focus-visible:outline-slate";

export default function SiteHeader() {
  const pathname = usePathname();
  // The menu is open for the page it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean) => setOpenOn(next ? pathname : null);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDivElement>(null);
  const onDocs = pathname?.startsWith("/docs") ?? false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the menu is open: focus its first link, close on Escape and when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!open) return;
    dialog.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOn(null);
        menuButton.current?.focus();
      }
    };
    const wide = window.matchMedia("(min-width: 760px)");
    const onWide = () => wide.matches && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  // Keep Tab inside the full-screen menu.
  const trapFocus = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !dialog.current) return;
    const items = dialog.current.querySelectorAll<HTMLElement>("a, button");
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const close = () => setOpen(false);
  const closeAndReturn = () => {
    close();
    menuButton.current?.focus();
  };

  const goHome = (e: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== "/" || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  const solid = scrolled || open;

  return (
    <header className="sticky top-0 z-30 h-16 text-ink">
      {/* Frosted backdrop fades in once the page scrolls. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 border-b border-[rgba(42,52,65,0.08)] bg-[rgba(250,250,249,0.82)] backdrop-blur-[14px] backdrop-saturate-[1.2] transition-opacity duration-[240ms] ${
          solid ? "opacity-100" : "opacity-0"
        }`}
      />
      <div className="relative mx-auto grid h-full max-w-[1200px] grid-cols-[auto_minmax(0,1fr)] items-center gap-1 px-[clamp(20px,4vw,40px)] min-[760px]:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] min-[760px]:gap-5">
        <Link
          href="/"
          onClick={goHome}
          aria-label="Crado home"
          className="flex min-h-11 items-center gap-2 justify-self-start text-ink no-underline"
        >
          <CradoMark height={22} priority />
          <span data-wordmark className="text-lg leading-[1.65] tracking-[-0.015em]">
            Crado
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-9 min-[760px]:flex">
          {SECTIONS.map(({ id, label }) => (
            <SectionLink key={id} section={id} className={NAV_LINK}>
              {label}
            </SectionLink>
          ))}
          <Link href="/docs" aria-current={onDocs ? "page" : undefined} className={NAV_LINK}>
            Docs
          </Link>
        </nav>

        <div className="flex items-center justify-end gap-1 min-[760px]:gap-5">
          <PilotLink className={`${PILOT_PILL} h-8 px-4 text-sm leading-[1.5] tracking-[-0.01em]`}>
            <span className="max-[399px]:hidden">Discuss a pilot</span>
            <span className="min-[400px]:hidden">Pilot</span>
            <ArrowIcon />
          </PilotLink>
          <button
            ref={menuButton}
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="site-menu"
            aria-label="Open menu"
            className="flex size-11 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-ink min-[760px]:hidden"
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M3 6.5h14M3 13.5h14" />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="site-menu"
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          onKeyDown={trapFocus}
          className="fixed inset-0 z-[60] flex flex-col bg-oat px-6 pb-8 min-[760px]:hidden"
        >
          <div className="flex h-16 flex-none items-center justify-between">
            <span className="flex items-center gap-2">
              <CradoMark height={22} />
              <span data-wordmark className="text-lg leading-[1.65] tracking-[-0.015em] text-fg">
                Crado
              </span>
            </span>
            <button
              type="button"
              onClick={closeAndReturn}
              aria-label="Close menu"
              className="flex size-11 cursor-pointer items-center justify-center border-0 bg-transparent text-ink"
            >
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="m5 5 10 10M15 5 5 15" />
              </svg>
            </button>
          </div>
          <nav aria-label="Primary" className="mt-6 flex flex-col">
            {SECTIONS.map(({ id, label }) => (
              <SectionLink key={id} section={id} onClick={close} className={MENU_LINK}>
                {label}
              </SectionLink>
            ))}
            <Link href="/docs" onClick={close} className={MENU_LINK}>
              Docs
            </Link>
          </nav>
          <PilotLink onClick={close} className={`${PILOT_PILL} mt-auto h-[54px] text-base leading-[1.65] tracking-[-0.015em]`}>
            Discuss a pilot
            <ArrowIcon />
          </PilotLink>
        </div>
      )}
    </header>
  );
}
