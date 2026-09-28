"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { DOC_GROUPS, docHref, groupByPath } from "@/lib/docs";
import DocsSearch from "./DocsSearch";

const FLAT = DOC_GROUPS.flatMap((g) => g.items.map(([id, t]) => ({ id, t, group: g })));

function itemHref(groupPath: string, id: string, first: boolean) {
  return first ? groupPath : `${groupPath}#${id}`;
}

export default function DocsShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const group = groupByPath(pathname);
  const [active, setActive] = useState(group.items[0][0]);
  // The drawer is open for the page it was opened on, so navigating closes it.
  const [drawerOn, setDrawerOn] = useState<string | null>(null);
  const drawer = drawerOn === pathname;
  const setDrawer = useCallback((next: boolean) => setDrawerOn(next ? pathname : null), [pathname]);
  const drawerButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);

  const closeDrawer = useCallback(
    (restoreFocus = true) => {
      setDrawer(false);
      if (restoreFocus) drawerButton.current?.focus();
    },
    [setDrawer],
  );

  // Send legacy or cross-page anchors to the page that now holds them.
  useEffect(() => {
    const redirect = () => {
      const raw = decodeURIComponent(window.location.hash.slice(1));
      if (!raw || document.getElementById(raw)) return;
      const href = docHref(raw);
      if (href && href !== window.location.pathname + window.location.hash) router.replace(href);
    };
    redirect();
    window.addEventListener("hashchange", redirect);
    return () => window.removeEventListener("hashchange", redirect);
  }, [pathname, router]);

  // Scroll spy: the last section whose top has passed the reading line.
  useEffect(() => {
    const spy = () => {
      const line = window.matchMedia("(min-width: 820px)").matches ? 110 : 150;
      let cur = group.items[0][0];
      for (const [id] of group.items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) cur = id;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        cur = group.items[group.items.length - 1][0];
      }
      setActive(cur);
    };
    spy();
    window.addEventListener("scroll", spy, { passive: true });
    return () => window.removeEventListener("scroll", spy);
  }, [group]);

  // Drawer: close on Escape, or when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!drawer) return;
    requestAnimationFrame(() => closeButton.current?.focus());
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeDrawer();
    const wide = window.matchMedia("(min-width: 820px)");
    const onWide = () => wide.matches && setDrawer(false);
    window.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      window.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [drawer, closeDrawer, setDrawer]);

  const activeTitle = (group.items.find(([id]) => id === active) ?? group.items[0])[1];
  const firstIdx = FLAT.findIndex((f) => f.id === group.items[0][0]);
  const lastIdx = FLAT.findIndex((f) => f.id === group.items[group.items.length - 1][0]);
  const prev = FLAT[firstIdx - 1];
  const next = FLAT[lastIdx + 1];
  const flatHref = (f: (typeof FLAT)[number]) => itemHref(f.group.path, f.id, f.group.items[0][0] === f.id);

  const toc = (rail: boolean) =>
    group.items.map(([id, t], i) => {
      const on = id === active;
      return (
        <li key={id}>
          <Link
            href={itemHref(group.path, id, i === 0)}
            aria-current={on ? "location" : undefined}
            className={
              rail
                ? `-ml-px block border-l-2 px-3 py-[7px] text-sm leading-[1.4] text-ink no-underline ${
                    on ? "border-ink font-semibold" : "border-transparent"
                  }`
                : `block py-[9px] text-[15px] text-ink ${on ? "font-semibold" : ""}`
            }
          >
            {t}
          </Link>
        </li>
      );
    });

  return (
    <div className="docs-shell">
      <div className="sticky top-16 z-40 flex h-[52px] items-center gap-3 border-b border-line bg-oat px-[clamp(16px,4vw,32px)] min-[820px]:hidden">
        <button
          ref={drawerButton}
          type="button"
          onClick={() => setDrawer(true)}
          aria-expanded={drawer}
          aria-controls="docs-sidebar"
          className="min-h-11 cursor-pointer rounded-[3px] border border-ink bg-transparent px-3.5 text-[15px] font-medium text-ink"
        >
          Contents
        </button>
        <span className="truncate font-mono text-[13px] text-muted">
          {group.label} / {activeTitle}
        </span>
      </div>
      {drawer && (
        <div
          aria-hidden="true"
          onClick={() => closeDrawer()}
          className="fixed inset-0 z-[60] bg-[rgba(42,52,65,0.45)] min-[820px]:hidden"
        />
      )}

      <div className="mx-auto box-content grid max-w-[1320px] grid-cols-1 gap-x-[clamp(24px,3vw,56px)] px-[clamp(16px,3vw,40px)] min-[820px]:grid-cols-[248px_minmax(0,1fr)] min-[1180px]:grid-cols-[248px_minmax(0,1fr)_200px]">
        <aside
          id="docs-sidebar"
          aria-label="Documentation"
          className={`fixed top-0 left-0 z-[70] box-border h-screen w-[min(340px,88vw)] overflow-y-auto border-r border-ink bg-oat px-5 pt-4 pb-8 transition-transform duration-200 ${
            drawer ? "visible translate-x-0" : "invisible -translate-x-[105%]"
          } min-[820px]:visible min-[820px]:sticky min-[820px]:top-16 min-[820px]:z-[1] min-[820px]:h-[calc(100vh-64px)] min-[820px]:w-auto min-[820px]:translate-x-0 min-[820px]:border-line min-[820px]:py-10 min-[820px]:pr-5 min-[820px]:pl-0 min-[820px]:transition-none`}
        >
          <div className="mb-4 flex items-center justify-between min-[820px]:hidden">
            <span className="font-display text-xl font-medium">Documentation</span>
            <button
              ref={closeButton}
              type="button"
              onClick={() => closeDrawer()}
              className="min-h-11 min-w-11 cursor-pointer rounded-[3px] border border-ink bg-transparent text-[15px] font-medium text-ink"
            >
              Close
            </button>
          </div>

          <DocsSearch onNavigate={() => closeDrawer(false)} />

          <nav aria-label="Documentation sections">
            {DOC_GROUPS.map((g) => {
              const current = g === group;
              return (
                <div key={g.slug} className="mb-6">
                  <p
                    className={`m-0 mb-1.5 flex items-center gap-2 font-mono text-xs tracking-[0.08em] uppercase ${
                      current ? "text-ink" : "text-muted"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`size-2 border border-ink ${current ? "bg-lime" : "bg-transparent"}`}
                    />
                    {g.label}
                  </p>
                  <ul className="m-0 list-none border-l border-line p-0">
                    {g.items.map(([id, t], i) => {
                      const on = current && id === active;
                      return (
                        <li key={id}>
                          <Link
                            href={itemHref(g.path, id, i === 0)}
                            onClick={() => closeDrawer(false)}
                            aria-current={on ? "location" : undefined}
                            className={`-ml-px block border-l-2 px-3 py-[9px] text-[15px] leading-[1.35] text-ink no-underline hover:bg-oat-hover ${
                              on ? "border-ink bg-oat-active font-semibold" : "border-transparent"
                            }`}
                          >
                            {t}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </nav>
        </aside>

        <main id="doc-main" tabIndex={-1} className="min-w-0 pt-[clamp(32px,5vw,64px)] pb-24 outline-none">
          <details className="mb-8 border border-ink bg-oat-light min-[1180px]:hidden">
            <summary className="cursor-pointer px-4 py-3 font-mono text-[13px] tracking-[0.04em]">ON THIS PAGE</summary>
            <ul className="m-0 list-none px-4 pb-3">{toc(false)}</ul>
          </details>

          {children}

          <nav
            aria-label="Previous and next"
            className="grid max-w-[44rem] grid-cols-2 gap-4 border-t border-ink pt-6"
          >
            <div>
              {prev && (
                <Link href={flatHref(prev)} className="flex flex-col gap-1 py-2 text-ink no-underline">
                  <span className="font-mono text-xs text-muted">← PREVIOUS</span>
                  <span className="text-[17px] font-medium">{prev.t}</span>
                </Link>
              )}
            </div>
            <div className="text-right">
              {next && (
                <Link href={flatHref(next)} className="flex flex-col items-end gap-1 py-2 text-ink no-underline">
                  <span className="font-mono text-xs text-muted">NEXT →</span>
                  <span className="text-[17px] font-medium">{next.t}</span>
                </Link>
              )}
            </div>
          </nav>
        </main>

        <aside
          aria-label="On this page"
          className="sticky top-16 hidden self-start pt-[clamp(32px,5vw,64px)] pb-8 min-[1180px]:block"
        >
          <p className="m-0 mb-2.5 font-mono text-xs tracking-[0.08em] text-muted">ON THIS PAGE</p>
          <ul className="m-0 list-none border-l border-line p-0">{toc(true)}</ul>
          <a href="mailto:hello@crado.io" className="mt-7 block text-sm text-ink">
            Questions? hello@crado.io
          </a>
        </aside>
      </div>
    </div>
  );
}
