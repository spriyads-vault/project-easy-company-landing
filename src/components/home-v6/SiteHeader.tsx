"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";
import { CTA, NAV_LINKS } from "@/content/home-v6";
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

/**
 * Sticky header (design: header). Over the page it is solid; once scrolled it turns translucent with a blur and a
 * hairline. The current section's link is underlined. At 640px and below the links move into a full-screen menu
 * (a modal <dialog>: Tab cycles inside it, Esc closes it and focus returns to the menu button).
 */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      setScrolled(window.scrollY > 8);
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
              <a key={id} href={`#${id}`} aria-current={active === id ? "true" : undefined} className={`${NAV_LINK} ${active === id ? "border-v6-primary" : "border-transparent"}`}>
                {label}
              </a>
            ))}
          </nav>
          <div className="hidden v6t:block">
            <a href="#book" className={BUTTON_PRIMARY}>
              {CTA.book}
            </a>
          </div>
          <div className="flex items-center gap-2 v6t:hidden">
            <a href="#book" className={BUTTON_PRIMARY}>
              {CTA.bookShort}
            </a>
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
          {[...NAV_LINKS, { id: "waitlist", label: CTA.join }].map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => menuLink(e, id)}
              className="border-b border-v6-line py-4 font-v6-serif text-[34px] leading-[38px] tracking-[-.02em] text-v6-ink hover:text-v6-ink"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="mt-auto px-(--v6-gutter) py-6">
          <a
            href="#book"
            onClick={(e) => menuLink(e, "book")}
            className="flex h-12 items-center justify-center rounded-v6-button bg-v6-primary font-v6-sans text-[15px] leading-none font-medium text-v6-on-primary hover:bg-v6-primary-hover hover:text-v6-on-primary"
          >
            {CTA.book}
          </a>
        </div>
      </dialog>
    </>
  );
}
