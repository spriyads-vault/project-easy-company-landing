"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV, NAV_CTA, fromPage } from "@/content/home-v8";
import { LOGO_PATH } from "@/lib/site";
import AnnouncementBar from "./AnnouncementBar";
import { PILL_GHOST, PILL_LIGHT } from "./ui";

interface SiteHeaderProps {
  /**
   * "home": fixed, with the announcement bar inside it; past 40px of scroll the bar slides up out of view (a transform,
   * so nothing on the page shifts) and the 64px nav gets the blurred page colour. "page" (docs, legal, 404): the bar
   * scrolls away with the page and the 56px nav sticks to the top, as the docs sidebar offsets expect.
   */
  variant?: "home" | "page";
  /** The nav link to mark as the current page (e.g. "/docs"). */
  current?: string;
}

export default function SiteHeader({ variant = "home", current }: SiteHeaderProps) {
  const home = variant === "home";
  const linkBase = home ? "" : "/";
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || !home;
  const nav = (
    <nav
      aria-label="Primary"
      className={`flex items-center justify-between gap-6 px-[max(24px,3vw)] transition-[background-color,box-shadow] duration-300 ease-v8-ui ${home ? "h-16" : "h-14"} ${
        solid ? "bg-v8-nav-scrolled shadow-[0_1px_0_var(--color-v8-ring)] backdrop-blur-[16px]" : "bg-transparent"
      }`}
    >
      <Link href="/" aria-label="Crado home" className="flex items-center gap-2.5 text-v8-white hover:text-v8-white">
        {/* The Crado mark as supplied (white on transparent), 22px tall. */}
        <Image src={LOGO_PATH} alt="" width={19} height={22} priority className="block h-[22px] w-auto" />
        <span className="font-v8-brand text-[22px] font-semibold tracking-[-0.01em] text-v8-white">Crado</span>
      </Link>
      <div className="hidden items-center gap-6 font-v8-sans text-[15px] leading-6 font-[450] v8w:flex v8x:gap-7">
        {NAV.map((item) => {
          const href = fromPage(item.href, linkBase);
          const isCurrent = current !== undefined && (current === item.href || current.startsWith(`${item.href}/`));
          const cls = `transition-colors duration-200 hover:text-v8-white ${isCurrent ? "text-v8-white underline decoration-v8-rust decoration-2 underline-offset-[10px]" : "text-v8-muted"}`;
          return item.href.startsWith("#") && home ? (
            <a key={item.href} href={href} className={cls}>
              {item.label}
            </a>
          ) : (
            <Link key={item.href} href={href} aria-current={isCurrent ? "page" : undefined} className={cls}>
              {item.label}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center gap-2 font-v8-sans">
        {/* The sample case pill gives way to the centre links between 1020 and 1200px, where there is no room for both. */}
        <a href={fromPage(NAV_CTA.sample.href, linkBase)} className={`${PILL_GHOST} px-4 py-2 text-[15px] leading-[21px] max-v8n:hidden v8w:max-v8x:hidden`}>
          {NAV_CTA.sample.label}
        </a>
        <a href={fromPage(NAV_CTA.start.href, linkBase)} data-wl-source="nav" className={`${PILL_LIGHT} px-[18px] py-2 text-[15px] leading-[21px]`}>
          {NAV_CTA.start.label}
        </a>
      </div>
    </nav>
  );

  if (!home) {
    return (
      <>
        <AnnouncementBar linkBase="/" />
        <header className="sticky top-0 z-50">{nav}</header>
      </>
    );
  }
  return (
    <header
      data-scrolled={scrolled || undefined}
      className={`fixed inset-x-0 top-0 z-60 transition-transform duration-300 ease-v8-ui ${scrolled ? "-translate-y-9" : "translate-y-0"}`}
    >
      <AnnouncementBar linkBase="" />
      {nav}
    </header>
  );
}
