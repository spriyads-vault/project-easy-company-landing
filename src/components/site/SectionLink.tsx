"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ComponentPropsWithoutRef, MouseEvent } from "react";
import { SCROLL_TARGET_KEY, clearHash, scrollToSection } from "@/lib/scroll";

type Props = Omit<ComponentPropsWithoutRef<"a">, "href"> & { section: string };

/**
 * Link to a home-page section. The href stays "/#id" so it works without JS and in
 * new tabs; with JS it scrolls there without leaving "#id" in the address bar.
 */
export default function SectionLink({ section, onClick, ...rest }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const go = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (pathname === "/") {
      scrollToSection(section);
      clearHash();
      return;
    }
    try {
      sessionStorage.setItem(SCROLL_TARGET_KEY, section);
    } catch {}
    router.push("/", { scroll: false });
  };

  return <Link href={`/#${section}`} onClick={go} {...rest} />;
}
