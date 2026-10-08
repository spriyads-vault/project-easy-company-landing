"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import WaitlistButton from "@/components/waitlist/WaitlistButton";
import { useWaitlist } from "@/components/waitlist/WaitlistProvider";
import Logo from "@/components/ui/Logo";

/** home: on the hero band with scrollspy. docs: Docs marked current. page: any other page (legal). */
type Variant = "home" | "docs" | "page";

interface ProductItem {
  id: string;
  title: string;
  sub: string;
  earlyAccess: boolean;
  icon: ReactNode;
}

const icon = (d: string) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="flex-none" aria-hidden="true">
    <path d={d} />
  </svg>
);

const PRODUCT: ProductItem[] = [
  { id: "change-review", title: "Change review", sub: "See what a design change does to your evidence.", earlyAccess: true, icon: icon("M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7") },
  { id: "failure-investigation", title: "Failure investigation", sub: "Ranked likely causes for failed emissions tests.", earlyAccess: false, icon: icon("M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.3-4.3") },
  { id: "evidence", title: "Evidence and communications", sub: "Lab emails and Slack decisions, filed with each revision.", earlyAccess: true, icon: icon("M3 13h5l2 3h4l2-3h5M5 5h14l2 8v6H3v-6z") },
  { id: "agents", title: "Agents", sub: "Agents that work in the background and ask before acting.", earlyAccess: true, icon: icon("M12 8V4M8 4h8M5 8h14v11H5zM9 13h.01M15 13h.01") },
];

/** Section id → nav item index (0 Product, 1 How it works, 2 Use cases). Design: SECS. */
const SPY: [string, number][] = [
  ["change-review", 0],
  ["evidence", 0],
  ["failure-investigation", 0],
  ["how-it-works", 1],
  ["use-cases", 2],
  ["agents", 0],
];

function Chevron({ open }: { open: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`flex-none transition-transform duration-150 ${open ? "rotate-180" : ""}`} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function Nav({ variant }: { variant: Variant }) {
  const home = variant === "home";
  const href = (id: string) => (home ? `#${id}` : `/#${id}`);
  const source = variant === "docs" ? "docs" : "nav";
  const { open: openWaitlist } = useWaitlist();

  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(-1);
  const [ddOpen, setDdOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [accOpen, setAccOpen] = useState(false);
  const [ul, setUl] = useState<{ x: number; w: number } | null>(null);

  const linksRef = useRef<HTMLDivElement>(null);
  const ddRef = useRef<HTMLDivElement>(null);
  const ddBtnRef = useRef<HTMLButtonElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const ddTimer = useRef<number>(0);
  const ddOpenedAt = useRef(0);

  // Scroll state and scrollspy (activation line: 56px + 35% of the viewport).
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      if (!home) return;
      const line = 56 + window.innerHeight * 0.35;
      let a = -1;
      for (const [id, n] of SPY) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) a = n;
      }
      setActive(a);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [home]);

  // Underline position, measured from the active link (animated with transform only).
  const measure = useCallback(() => {
    const items = linksRef.current?.querySelectorAll<HTMLElement>("[data-navi]");
    const el = active >= 0 ? items?.[active] : undefined;
    if (!el) return;
    setUl({ x: el.offsetLeft, w: el.offsetWidth });
  }, [active]);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    document.fonts?.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  // Close the dropdown on outside click.
  useEffect(() => {
    if (!ddOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!ddRef.current?.contains(e.target as Node)) setDdOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [ddOpen]);

  // Mobile menu: Escape closes, focus stays inside, focus returns to the menu button.
  useEffect(() => {
    if (!menuOpen) return;
    const panel = menuRef.current;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("[data-menu-close]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>("a[href], button")];
      const a = items[0];
      const z = items[items.length - 1];
      if (e.shiftKey && document.activeElement === a) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && document.activeElement === z) {
        e.preventDefault();
        a.focus();
      }
    };
    const onResize = () => {
      if (window.innerWidth >= 760) setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    const btn = menuBtnRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
      document.documentElement.style.overflow = prevOverflow;
      btn?.focus();
    };
  }, [menuOpen]);

  const ddEnter = () => {
    window.clearTimeout(ddTimer.current);
    if (ddOpen) return;
    ddTimer.current = window.setTimeout(() => {
      ddOpenedAt.current = Date.now();
      setDdOpen(true);
    }, 150);
  };
  const ddLeave = () => {
    window.clearTimeout(ddTimer.current);
    if (!ddOpen) return;
    ddTimer.current = window.setTimeout(() => setDdOpen(false), 150);
  };
  const ddClick = () => {
    window.clearTimeout(ddTimer.current);
    // A click right after hover-intent opened it should not immediately close it.
    if (ddOpen && Date.now() - ddOpenedAt.current < 600) return;
    ddOpenedAt.current = 0;
    setDdOpen((o) => !o);
  };
  const ddKey = (e: ReactKeyboardEvent) => {
    const items = [...(ddRef.current?.querySelectorAll<HTMLElement>("[data-ddi]") ?? [])];
    const i = items.indexOf(document.activeElement as HTMLElement);
    if (e.key === "Escape" && ddOpen) {
      e.preventDefault();
      e.stopPropagation();
      setDdOpen(false);
      ddBtnRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!ddOpen) {
        setDdOpen(true);
        window.setTimeout(() => items[0]?.focus(), 40);
      } else (items[i + 1] ?? items[0])?.focus();
    } else if (e.key === "ArrowUp" && ddOpen) {
      e.preventDefault();
      (items[i - 1] ?? items[items.length - 1])?.focus();
    } else if (e.key === "Tab" && ddOpen && i === items.length - 1 && !e.shiftKey) {
      setDdOpen(false);
    }
  };

  // Home at the top sits on the accent band, so it uses on-accent ink.
  const onBand = home && !scrolled;
  const ink = onBand ? "text-on-accent" : "text-fg";
  const linkColor = (i: number) => (i === active ? ink : onBand ? "text-on-accent/85" : "text-fg-6");
  const hoverInk = onBand ? "hover:text-on-accent" : "hover:text-fg";

  return (
    <>
      <nav
        aria-label="Main"
        className={`sticky top-0 z-50 h-14 border-b backdrop-blur-[12px] transition-[border-color,background-color,color] duration-200 ${
          onBand ? "border-transparent bg-transparent" : "border-line-1 bg-(--nav-bg-scrolled)"
        } ${!home && !scrolled ? "border-transparent" : ""} ${ink}`}
      >
        <div className={`mx-auto flex h-full items-center gap-12 px-(--space-gutter) ${home ? "max-w-page" : "max-w-[1440px]"}`}>
          <Link href="/" aria-label="Crado home" className="flex items-center text-inherit">
            <Logo height={home ? 22 : 20} alt="" />
          </Link>

          <div ref={linksRef} className="relative hidden h-full items-center gap-7 font-display text-sm font-medium sm:flex">
            <div ref={ddRef} onMouseEnter={ddEnter} onMouseLeave={ddLeave} onKeyDown={ddKey} className="relative flex h-full items-center">
              <button
                ref={ddBtnRef}
                data-navi
                data-active={active === 0 || undefined}
                type="button"
                aria-haspopup="true"
                aria-expanded={ddOpen}
                aria-controls="nav-product-menu"
                onClick={ddClick}
                className={`flex cursor-pointer items-center gap-[5px] border-0 bg-transparent p-0 transition-colors duration-200 ${linkColor(0)} ${hoverInk}`}
              >
                Product
                <Chevron open={ddOpen} />
              </button>
              <div
                id="nav-product-menu"
                role="menu"
                aria-label="Product"
                className={`absolute top-[calc(100%-6px)] -left-[18px] w-[520px] rounded-lg border border-line-3 bg-surface-2 p-2 text-left font-sans text-fg shadow-pop transition-[opacity,transform,visibility] duration-150 ease-out-expo ${
                  ddOpen ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
                }`}
              >
                {PRODUCT.map((item) => (
                  <a
                    key={item.id}
                    data-ddi
                    role="menuitem"
                    href={href(item.id)}
                    onClick={() => setDdOpen(false)}
                    className="flex items-center gap-3 rounded-md p-2.5 text-fg outline-none hover:bg-surface-5 hover:text-fg focus-visible:bg-surface-5 focus-visible:shadow-[inset_0_0_0_2px_var(--color-accent)]"
                  >
                    <span className="flex h-8 w-8 flex-none items-center justify-center rounded-md border border-line-4 bg-surface-5 text-fg-4">{item.icon}</span>
                    <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                      <span className="text-sm font-medium">{item.title}</span>
                      <span className="truncate text-[13px] text-fg-muted">{item.sub}</span>
                    </span>
                    {item.earlyAccess && <span className="font-mono text-[10px] tracking-[0.1em] whitespace-nowrap text-fg-faint">EARLY ACCESS</span>}
                  </a>
                ))}
                <div className="mx-0.5 my-2 h-px bg-line-2" role="separator" />
                <a
                  data-ddi
                  role="menuitem"
                  href={href("how-it-works")}
                  onClick={() => setDdOpen(false)}
                  className="flex items-center gap-2 rounded-md p-2.5 text-[13px] text-fg-6 outline-none hover:bg-surface-5 hover:text-fg focus-visible:bg-surface-5 focus-visible:shadow-[inset_0_0_0_2px_var(--color-accent)]"
                >
                  <span className="font-medium text-fg">Evaluation engine</span>·<span>Rule-based checks on confirmed values</span>
                  <span className="ml-auto" aria-hidden="true">
                    →
                  </span>
                </a>
              </div>
            </div>
            <a data-navi data-active={active === 1 || undefined} href={href("how-it-works")} className={`transition-colors duration-200 ${linkColor(1)} ${hoverInk}`}>
              How it works
            </a>
            <a data-navi data-active={active === 2 || undefined} href={href("use-cases")} className={`transition-colors duration-200 ${linkColor(2)} ${hoverInk}`}>
              Use cases
            </a>
            {variant !== "docs" ? (
              <Link data-navi href="/docs" className={`transition-colors duration-200 ${onBand ? "text-on-accent/85" : "text-fg-6"} ${hoverInk}`}>
                Docs
              </Link>
            ) : (
              <Link data-navi href="/docs" aria-current="page" className="relative text-fg">
                Docs
                <span className="absolute right-0 -bottom-1 left-0 block h-px bg-accent" aria-hidden="true" />
              </Link>
            )}
            {home && (
              <span
                aria-hidden="true"
                className={`pointer-events-none absolute bottom-3.5 left-0 h-px w-px origin-left transition-[transform,opacity] duration-200 ${onBand ? "bg-on-accent" : "bg-accent"} ${
                  ul && active >= 0 ? "opacity-100" : "opacity-0"
                }`}
                style={{ transform: ul ? `translateX(${ul.x}px) scaleX(${ul.w})` : undefined }}
              />
            )}
          </div>

          <div className="ml-auto flex items-center gap-1">
            <WaitlistButton
              source={source}
              className="flex h-8 cursor-pointer items-center rounded-sm border-0 bg-fg px-3 font-display text-sm font-medium whitespace-nowrap text-bg transition-colors hover:bg-white"
            >
              Join early access
            </WaitlistButton>
            <button
              ref={menuBtnRef}
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(true)}
              className="-mr-2 flex h-10 w-10 cursor-pointer items-center justify-center border-0 bg-transparent text-inherit sm:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M4 8h16M4 16h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-70 flex flex-col overflow-y-auto bg-bg px-5 text-fg"
        >
          <div className="flex h-14 flex-none items-center justify-between">
            <Link href="/" aria-label="Crado home" onClick={() => setMenuOpen(false)} className="flex items-center">
              <Logo height={22} alt="" />
            </Link>
            <button
              data-menu-close
              type="button"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
              className="-mr-2 flex h-10 w-10 cursor-pointer items-center justify-center border-0 bg-transparent text-fg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <div className="mt-4 flex flex-col font-display text-[22px] font-medium tracking-[-0.02em]">
            <button
              type="button"
              aria-expanded={accOpen}
              aria-controls="mobile-product"
              onClick={() => setAccOpen((o) => !o)}
              className="flex cursor-pointer items-center justify-between border-0 border-b border-line-1 bg-transparent py-4 text-left text-fg"
            >
              Product
              <Chevron open={accOpen} />
            </button>
            {accOpen && (
              <div id="mobile-product" className="flex flex-col border-b border-line-1 pt-2 pb-3">
                {[...PRODUCT, { id: "how-it-works", title: "Evaluation engine", sub: "Rule-based checks on confirmed values.", earlyAccess: false }].map((item) => (
                  <a key={item.title} href={href(item.id)} onClick={() => setMenuOpen(false)} className="flex flex-col gap-0.5 py-2.5 font-sans text-fg">
                    <span className="flex items-center gap-2.5 text-[15px] font-medium tracking-normal">
                      {item.title}
                      {item.earlyAccess && <span className="font-mono text-[9.5px] tracking-[0.1em] text-fg-faint">EARLY ACCESS</span>}
                    </span>
                    <span className="text-[13px] tracking-normal text-fg-muted">{item.sub}</span>
                  </a>
                ))}
              </div>
            )}
            <a href={href("how-it-works")} onClick={() => setMenuOpen(false)} className="border-b border-line-1 py-4 text-fg">
              How it works
            </a>
            <a href={href("use-cases")} onClick={() => setMenuOpen(false)} className="border-b border-line-1 py-4 text-fg">
              Use cases
            </a>
            <Link href="/docs" onClick={() => setMenuOpen(false)} className="border-b border-line-1 py-4 text-fg">
              Docs
            </Link>
          </div>
          <div className="mt-auto pt-6 pb-[calc(20px+env(safe-area-inset-bottom))]">
            <button
              type="button"
              aria-haspopup="dialog"
              onClick={() => {
                setMenuOpen(false);
                // The menu unmounts, so focus returns to the menu button when the dialog closes.
                openWaitlist(source, menuBtnRef.current);
              }}
              className="flex h-11 w-full cursor-pointer items-center justify-center rounded-md border-0 bg-fg font-display text-[15px] font-medium text-bg"
            >
              Join early access
            </button>
          </div>
        </div>
      )}
    </>
  );
}

