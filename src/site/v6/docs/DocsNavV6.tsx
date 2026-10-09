"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useContentsDrawer, useDocsNav, useSidebarGroups } from "@/components/docs-site/DocsNav";
import { LABEL } from "@/components/home-v6/ui";

/*
 * v6 docs navigation (SCRUM-296). State and behaviour come from DocsNavProvider (src/components/docs-site/DocsNav.tsx):
 * scrollspy, search filtering, ⌘K / Ctrl+K and the drawer's focus handling are the v3 docs' own; only the markup and
 * the breakpoints differ. From 1024px the sidebar shows; below it the contents bar opens the drawer (which also holds
 * the search). From 1280px "On this page" is the right rail; below it the same list sits above the content.
 */

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="flex-none text-v6-muted" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </svg>
  );
}

const FIELD =
  "flex flex-none cursor-text items-center gap-2 rounded-v6-button border border-v6-line-input bg-v6-card px-3 transition-[border-color] duration-150 ease-v6-ui hover:border-v6-ink focus-within:border-v6-ink focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-v6-primary";
const INPUT =
  "min-w-0 flex-1 appearance-none border-0 bg-transparent font-v6-sans text-v6-ink outline-none placeholder:text-v6-muted focus-visible:outline-none [&::-webkit-search-cancel-button]:hidden";

/** Sidebar groups filtered by the search query; the active entry is the current page's section in view. */
function Groups({ large, onNavigate }: { large?: boolean; onNavigate?: () => void }) {
  const { page, sideAt } = useDocsNav();
  const groups = useSidebarGroups();

  if (!groups.length) return <span className="font-v6-sans text-[15px] text-v6-muted">No matching pages</span>;

  return (
    <>
      {groups.map(({ p, items }) => (
        <div key={p.path} className="flex flex-col gap-2">
          <span className={`${LABEL} text-v6-muted`}>{p.group}</span>
          <ul className="m-0 flex list-none flex-col border-l border-v6-line p-0">
            {items.map((s) => {
              const active = p === page && s.id === sideAt;
              return (
                <li key={s.id} className="flex">
                  <Link
                    href={`${p.path}#${s.id}`}
                    onClick={onNavigate}
                    aria-current={active ? "location" : undefined}
                    className={`relative flex-1 pl-4 font-v6-sans transition-colors duration-150 ease-v6-ui hover:text-v6-ink ${
                      large ? "py-[11px] text-[17px] leading-[22px]" : "py-1.5 text-[15px] leading-[22px]"
                    } ${active ? "font-medium text-v6-ink" : "text-v6-muted"}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute top-1.5 bottom-1.5 -left-px w-0.5 bg-v6-primary transition-opacity duration-150 ${active ? "opacity-100" : "opacity-0"}`}
                    />
                    {s.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}

/** Left sidebar (from 1024px): search with the ⌘K hint and the grouped page index. */
export function DocsSidebarV6() {
  const { query, setQuery, searchRef } = useDocsNav();
  return (
    <aside
      aria-label="Documentation"
      className="sticky top-(--v6-nav-height) hidden max-h-[calc(100vh-var(--v6-nav-height))] flex-col gap-8 overflow-y-auto pt-10 pb-12 [scrollbar-width:none] v6d:flex"
    >
      <label className={`${FIELD} h-11`}>
        <SearchIcon />
        <input
          ref={searchRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documentation"
          aria-label="Search documentation"
          className={`${INPUT} text-[15px]`}
        />
        <kbd className="rounded-[4px] border border-v6-line-strong px-1.5 font-v6-mono text-[11px] leading-5 font-medium text-v6-muted">⌘K</kbd>
      </label>
      <Groups />
    </aside>
  );
}

function TocList() {
  const { page, at } = useDocsNav();
  return (
    <ul className="m-0 flex list-none flex-col border-l border-v6-line p-0">
      {page.toc.map((t) => {
        const active = t.id === at;
        return (
          <li key={t.id} className="flex">
            <Link
              href={`${page.path}#${t.id}`}
              aria-current={active ? "location" : undefined}
              className={`relative flex-1 py-1.5 pl-4 font-v6-sans text-[14px] leading-5 transition-colors duration-150 ease-v6-ui hover:text-v6-ink ${active ? "text-v6-ink" : "text-v6-muted"}`}
            >
              <span aria-hidden="true" className={`absolute top-1.5 bottom-1.5 -left-px w-0.5 bg-v6-primary transition-opacity duration-150 ${active ? "opacity-100" : "opacity-0"}`} />
              {t.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

/** Right rail (from 1280px): the page's H1 and H2s with scrollspy. */
export function DocsRailV6() {
  return (
    <aside aria-label="On this page" className="sticky top-(--v6-nav-height) hidden flex-col gap-3 pt-16 pb-12 v6w:flex">
      <span className={`${LABEL} text-v6-muted`}>ON THIS PAGE</span>
      <TocList />
    </aside>
  );
}

/**
 * "On this page" above the content (below 1280px), as a collapsible list. Open by default from 641px and collapsed
 * at 640px and below; the default comes from CSS, so nothing moves when the page hydrates. Once toggled, the
 * reader's choice holds.
 */
export function DocsTocAboveV6() {
  const [open, setOpen] = useState<boolean | null>(null);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 641px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const expanded = open ?? wide;
  const list = open === null ? "hidden v6t:block" : open ? "block" : "hidden";

  return (
    <nav aria-label="On this page" className="mb-10 rounded-v6-card border border-v6-line bg-v6-card v6w:hidden">
      <button
        type="button"
        aria-expanded={expanded}
        aria-controls="docs-toc-above"
        onClick={() => setOpen(!expanded)}
        className="flex min-h-12 w-full cursor-pointer items-center justify-between gap-3 rounded-v6-card border-0 bg-transparent px-4 text-left"
      >
        <span className={`${LABEL} text-v6-muted`}>ON THIS PAGE</span>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          aria-hidden="true"
          className={`flex-none text-v6-muted transition-transform duration-150 ease-v6-ui ${open === null ? "v6t:rotate-180" : open ? "rotate-180" : ""}`}
        >
          <polyline points="1,1.5 6,6.5 11,1.5" />
        </svg>
      </button>
      <div id="docs-toc-above" className={`px-4 pb-4 ${list}`}>
        <TocList />
      </div>
    </nav>
  );
}

/** Below 1024px: the sticky contents bar under the header and the contents drawer (search and page index). */
export function DocsBarV6() {
  const { page, query, setQuery, drawerOpen, setDrawerOpen } = useDocsNav();
  const { buttonRef, dialogRef, closeRef, close, onKeyDown, current } = useContentsDrawer();

  return (
    <>
      <div className="sticky top-(--v6-nav-height) z-20 flex h-(--v6-docs-bar) items-center border-b border-v6-line bg-v6-nav-scrolled px-(--v6-gutter) backdrop-blur-[12px] v6d:hidden">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={drawerOpen}
          className="flex h-9 flex-none cursor-pointer items-center gap-2 rounded-v6-button border border-v6-line-strong bg-v6-card pr-3.5 pl-3 font-v6-sans text-[15px] leading-none font-medium text-v6-ink transition-colors duration-150 ease-v6-ui hover:border-v6-ink active:translate-y-px"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M4 6h16M4 12h10M4 18h13" />
          </svg>
          Contents
        </button>
        {/* Decorative: the article's eyebrow says the same, and the bar is not a landmark. */}
        <span aria-hidden="true" className={`ml-3 overflow-hidden ${LABEL} text-ellipsis whitespace-nowrap text-v6-muted uppercase`}>
          {page.section} / {current.label}
        </span>
      </div>

      {drawerOpen && (
        <div className="fixed inset-0 z-50 v6d:hidden">
          <div aria-hidden="true" onClick={close} className="absolute inset-0 bg-v6-scrim motion-safe:animate-v6-in" />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label="Contents"
            onKeyDown={onKeyDown}
            className="absolute inset-y-2 left-2 flex w-[min(400px,calc(100vw-16px))] flex-col overflow-hidden rounded-v6-panel border border-v6-line bg-v6-page font-v6-sans text-v6-ink motion-safe:animate-v6-in"
          >
            <div className="flex h-16 flex-none items-center justify-between border-b border-v6-line pr-3 pl-5">
              <span className={`${LABEL} text-v6-muted`}>CONTENTS</span>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                aria-label="Close contents"
                className="flex size-11 cursor-pointer items-center justify-center rounded-v6-button border border-v6-line-strong bg-transparent text-v6-ink transition-colors duration-150 ease-v6-ui hover:border-v6-ink"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 flex-col gap-7 overflow-y-auto px-5 pt-5 pb-10">
              <label className={`${FIELD} h-12`}>
                <SearchIcon />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search documentation"
                  aria-label="Search documentation"
                  className={`${INPUT} text-[16px]`}
                />
              </label>
              <Groups large onNavigate={close} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
