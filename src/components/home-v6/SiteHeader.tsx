"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { CTA, NAV_LINKS } from "@/content/home-v6";
import { SECTION_PAGES } from "@/lib/flags";
import { SECTION_PATHS, bookHref, sectionHref, type SectionId } from "./links";
import LogoMark from "./LogoMark";
import { BUTTON_PRIMARY, CONTAINER } from "./ui";

/** A section is current while it spans this line (design: 120px from the top). */
const SPY_LINE = 120;

/** Smooth-scrolls to an in-page anchor (the 64px scroll-padding applies), honouring reduced motion. */
export function scrollToAnchor(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
  history.pushState(null, "", `#${id}`);
}

const NAV_LINK =
  "border-b-2 py-3 font-v6-sans text-[15px] leading-none font-medium text-v6-ink transition-[color,border-color] duration-150 ease-v6-ui hover:text-v6-muted";

interface SiteHeaderProps {
  /**
   * Prefix for links to homepage sections: "" on the homepage, "/" on every other page (docs, legal, 404), where the
   * section links and "Book a case review" go to the homepage. "Join the waitlist" stays on the page: every page
   * ends with the footer waitlist.
   */
  linkBase?: "" | "/";
}

/** With SECTION_PAGES on, section links are page links (client navigation); otherwise plain anchors as before. */
const SectionLink = SECTION_PAGES ? Link : "a";

/**
 * The header's call to action. With SECTION_PAGES on: "Join the waitlist" to /waitlist (no booking link anywhere).
 * Otherwise "Book a case review" (short "Book" on mobile) to the homepage's #book band, as before.
 */
const CTA_LINK = SECTION_PAGES ? { href: SECTION_PATHS.waitlist, label: CTA.join, short: CTA.join } : null;

/** Mobile menu items: the four sections, plus the waitlist when it is not already the menu's button. */
const MENU_LINKS: { id: SectionId; label: string }[] = SECTION_PAGES ? [...NAV_LINKS] : [...NAV_LINKS, { id: "waitlist", label: CTA.join }];

/**
 * Sticky header (design: header). Over the page it is solid; once scrolled it turns translucent with a blur and a
 * hairline. The current section's link is underlined. At 640px and below the links move into a full-screen menu
 * (a modal <dialog>: Tab cycles inside it, Esc closes it and focus returns to the menu button).
 */
export default function SiteHeader({ linkBase = "" }: SiteHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [spyActive, setActive] = useState("");
  // The section pages are rewrites of /section-pages/<slug> (next.config.ts); compare the public path.
  const pathname = usePathname().replace(/^\/section-pages(?=\/)/, "");
  // Section pages: the current page's item. Otherwise: the section in view (scrollspy).
  const active = SECTION_PAGES ? (NAV_LINKS.find(({ id }) => SECTION_PATHS[id] === pathname)?.id ?? "") : spyActive;
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 8);
      if (SECTION_PAGES) return;
      let current = "";
      for (const { id } of NAV_LINKS) {
        const r = document.getElementById(id)?.getBoundingClientRect();
        if (r && r.top <= SPY_LINE && r.bottom > SPY_LINE) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    // The menu is for narrow screens only; close it if the window widens.
    const wide = window.matchMedia("(min-width: 641px)");
    const onWide = () => wide.matches && menuRef.current?.close();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    wide.addEventListener("change", onWide);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      wide.removeEventListener("change", onWide);
    };
  }, []);

  // A modal <dialog> blocks the page behind it but lets Tab leave for the browser UI; keep it cycling inside.
  const trapTab = (e: KeyboardEvent<HTMLDialogElement>) => {
    if (e.key !== "Tab") return;
    const items = [...e.currentTarget.querySelectorAll<HTMLElement>("a[href], button")];
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

  const menuLink = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    // Section pages: every menu link is a navigation; just close the menu.
    if (SECTION_PAGES) {
      menuRef.current?.close();
      return;
    }
    // Off the homepage, section links are ordinary navigations to "/#id"; only the waitlist is on every page.
    if (linkBase && id !== "waitlist") return;
    e.preventDefault();
    menuRef.current?.close();
    requestAnimationFrame(() => scrollToAnchor(id));
  };

  return (
    <>
      <header
        className={`sticky top-0 z-30 h-(--v6-nav-height) border-b transition-[background-color,border-color] duration-150 ease-v6-ui ${
          scrolled ? "border-v6-line bg-v6-nav-scrolled backdrop-blur-[12px]" : "border-transparent bg-v6-page"
        }`}
      >
        <div className={`${CONTAINER} flex h-full items-center justify-between gap-6`}>
          <Link href="/" aria-label="Crado home" className="flex h-11 w-11 items-center rounded-v6-button">
            <LogoMark />
          </Link>
          <nav aria-label="Main" className="hidden gap-9 v6t:flex">
            {NAV_LINKS.map(({ id, label }) => (
              <SectionLink
                key={id}
                href={sectionHref(id, linkBase)}
                aria-current={active === id ? (SECTION_PAGES ? "page" : "true") : undefined}
                className={`${NAV_LINK} ${active === id ? "border-v6-primary" : "border-transparent"}`}
              >
                {label}
              </SectionLink>
            ))}
          </nav>
          <div className="hidden v6t:block">
            {CTA_LINK ? (
              <Link href={CTA_LINK.href} className={BUTTON_PRIMARY}>
                {CTA_LINK.label}
              </Link>
            ) : (
              <a href={bookHref(linkBase)} className={BUTTON_PRIMARY}>
                {CTA.book}
              </a>
            )}
          </div>
          <div className="flex items-center gap-2 v6t:hidden">
            {CTA_LINK ? (
              <Link href={CTA_LINK.href} className={BUTTON_PRIMARY}>
                {CTA_LINK.short}
              </Link>
            ) : (
              <a href={bookHref(linkBase)} className={BUTTON_PRIMARY}>
                {CTA.bookShort}
              </a>
            )}
            <button
              type="button"
              aria-label="Open menu"
              aria-haspopup="dialog"
              onClick={() => menuRef.current?.showModal()}
              className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1 rounded-v6-button border border-v6-line-strong bg-transparent transition-colors duration-150 ease-v6-ui hover:border-v6-ink active:translate-y-px"
            >
              <span className="h-[1.5px] w-4 bg-v6-ink" />
              <span className="h-[1.5px] w-4 bg-v6-ink" />
              <span className="h-[1.5px] w-4 bg-v6-ink" />
            </button>
          </div>
        </div>
      </header>

      <dialog
        ref={menuRef}
        aria-label="Menu"
        onKeyDown={trapTab}
        className="m-0 h-dvh max-h-none w-full max-w-none flex-col border-0 bg-v6-page p-0 font-v6-sans text-v6-ink open:flex motion-safe:open:animate-v6-in backdrop:bg-transparent"
      >
        <div className="flex h-(--v6-nav-height) flex-none items-center justify-between border-b border-v6-line px-(--v6-gutter)">
          <span className="flex h-11 w-11 items-center">
            <LogoMark />
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => menuRef.current?.close()}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-v6-button border border-v6-line-strong bg-transparent font-v6-mono text-[20px] leading-none font-medium text-v6-ink hover:border-v6-ink"
          >
            ×
          </button>
        </div>
        <nav aria-label="Menu links" className="flex flex-col px-(--v6-gutter) py-6">
          {MENU_LINKS.map(({ id, label }) => (
            <SectionLink
              key={id}
              href={sectionHref(id, linkBase)}
              onClick={(e: MouseEvent<HTMLAnchorElement>) => menuLink(e, id)}
              aria-current={SECTION_PAGES && SECTION_PATHS[id] === pathname ? "page" : undefined}
              className="border-b border-v6-line py-4 font-v6-serif text-[34px] leading-[38px] tracking-[-.02em] text-v6-ink hover:text-v6-ink"
            >
              {label}
            </SectionLink>
          ))}
        </nav>
        <div className="mt-auto px-(--v6-gutter) py-6">
          <SectionLink
            href={CTA_LINK ? CTA_LINK.href : bookHref(linkBase)}
            onClick={(e: MouseEvent<HTMLAnchorElement>) => menuLink(e, "book")}
            className="flex h-12 items-center justify-center rounded-v6-button bg-v6-primary font-v6-sans text-[15px] leading-none font-medium text-v6-on-primary hover:bg-v6-primary-hover hover:text-v6-on-primary"
          >
            {CTA_LINK ? CTA_LINK.label : CTA.book}
          </SectionLink>
        </div>
      </dialog>
    </>
  );
}
