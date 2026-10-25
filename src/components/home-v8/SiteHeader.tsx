"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NAV, NAV_CTA } from "@/content/home-v8";
import { LOGO_PATH } from "@/lib/site";
import { PILL_GHOST, PILL_LIGHT } from "./ui";

/** Fixed header (design: 64px, clear at the top, blurred page colour with a hairline once scrolled past 40px). */
export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled || undefined}
      className={`fixed inset-x-0 top-0 z-60 h-16 transition-[background-color,box-shadow] duration-300 ease-v8-ui ${
        scrolled ? "bg-v8-nav-scrolled shadow-[0_1px_0_var(--color-v8-ring)] backdrop-blur-[16px]" : "bg-transparent"
      }`}
    >
      <nav aria-label="Primary" className="flex h-16 items-center justify-between gap-6 px-[max(24px,3vw)]">
        <Link href="/" aria-label="Crado home" className="flex items-center gap-2.5 text-v8-white hover:text-v8-white">
          {/* The Crado mark as supplied (white on transparent), 22px tall. */}
          <Image src={LOGO_PATH} alt="" width={19} height={22} priority className="block h-[22px] w-auto" />
          <span className="font-v8-brand text-[22px] font-semibold tracking-[-0.01em]">Crado</span>
        </Link>
        <div className="hidden items-center gap-6 text-[15px] leading-6 font-[450] v8w:flex v8x:gap-7">
          {NAV.map((item) =>
            item.href.startsWith("#") ? (
              <a key={item.href} href={item.href} className="text-v8-muted transition-colors duration-200 hover:text-v8-white">
                {item.label}
              </a>
            ) : (
              <Link key={item.href} href={item.href} className="text-v8-muted transition-colors duration-200 hover:text-v8-white">
                {item.label}
              </Link>
            ),
          )}
        </div>
        <div className="flex items-center gap-2">
          {/* The sample case pill gives way to the centre links between 1020 and 1200px, where there is no room for both. */}
          <a href={NAV_CTA.sample.href} className={`${PILL_GHOST} px-4 py-2 text-[15px] leading-[21px] max-v8n:hidden v8w:max-v8x:hidden`}>
            {NAV_CTA.sample.label}
          </a>
          <a href={NAV_CTA.start.href} data-wl-source="nav" className={`${PILL_LIGHT} px-[18px] py-2 text-[15px] leading-[21px]`}>
            {NAV_CTA.start.label}
          </a>
        </div>
      </nav>
    </header>
  );
}
