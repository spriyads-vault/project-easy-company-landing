"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { DOCS_PAGES, docsPageByPath, type DocsPage } from "@/lib/docs-pages";

/** Design breakpoint for the mobile layout (state.w < 760). */
const MOBILE_MAX = 760;

interface DocsNavState {
  page: DocsPage;
  /** Heading in view (scrollspy), from page.toc. */
  at: string;
  /** Last sidebar entry at or above `at`. */
  sideAt: string;
  query: string;
  setQuery: (q: string) => void;
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
  searchRef: RefObject<HTMLInputElement | null>;
}

const DocsNavContext = createContext<DocsNavState | null>(null);

function useDocsNav(): DocsNavState {
  const ctx = useContext(DocsNavContext);
  if (!ctx) throw new Error("useDocsNav must be used inside <DocsNavProvider>");
  return ctx;
}

/** Scroll offset the design uses for headings: nav (56) + mobile contents bar (48) + 24. */
function headingOffset(): number {
  return 56 + (window.innerWidth < MOBILE_MAX ? 48 : 0) + 24;
}

export function DocsNavProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const page = docsPageByPath(pathname) ?? DOCS_PAGES[0];
  const [spy, setSpy] = useState<{ path: string; at: string }>({ path: page.path, at: page.toc[0].id });
  const [query, setQuery] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  // Scrollspy: a heading is current once its top passes offset + 48px; the last one wins at the page bottom.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = headingOffset() + 48;
      let at = page.toc[0].id;
      for (const { id } of page.toc) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) at = id;
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4 && window.scrollY > 0;
      if (atBottom) at = page.toc[page.toc.length - 1].id;
      setSpy((s) => (s.path === page.path && s.at === at ? s : { path: page.path, at }));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [page]);

  // ⌘K / Ctrl+K focuses the search (opens the contents drawer on mobile).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (window.innerWidth < MOBILE_MAX) setDrawerOpen(true);
        else searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // The drawer only exists on the mobile layout.
  useEffect(() => {
    if (!drawerOpen) return;
    const onResize = () => {
      if (window.innerWidth >= MOBILE_MAX) setDrawerOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [drawerOpen]);

  const at = spy.path === page.path ? spy.at : page.toc[0].id;
  const sideAt = useMemo(() => {
    const ids = new Set(page.sidebar.map((s) => s.id));
    let current = page.sidebar[0].id;
    for (const { id } of page.toc) {
      if (ids.has(id)) current = id;
      if (id === at) break;
    }
    return current;
  }, [page, at]);

  const value = useMemo<DocsNavState>(
    () => ({ page, at, sideAt, query, setQuery, drawerOpen, setDrawerOpen, searchRef }),
    [page, at, sideAt, query, drawerOpen],
  );

  return <DocsNavContext.Provider value={value}>{children}</DocsNavContext.Provider>;
}

function SearchIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="flex-none text-fg-muted" aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </svg>
  );
}

interface GroupsProps {
  /** Mobile drawer uses larger rows. */
  large?: boolean;
  onNavigate?: () => void;
}

/** Sidebar groups filtered by the search query. Active entry: the current page's section in view. */
function SidebarGroups({ large, onNavigate }: GroupsProps) {
  const { page, sideAt, query } = useDocsNav();
  const q = query.trim().toLowerCase();
  const groups = DOCS_PAGES.map((p) => ({ p, items: p.sidebar.filter((s) => !q || s.label.toLowerCase().includes(q)) })).filter((g) => g.items.length);

  if (!groups.length) return <span className="text-sm text-fg-faint">No matching pages</span>;

  return (
    <>
      {groups.map(({ p, items }) => (
        <div key={p.path} className="flex flex-col gap-2">
          <span className="font-mono text-[10px] tracking-[0.1em] text-fg-faint">{p.group}</span>
          <ul className="m-0 flex list-none flex-col border-l border-line-1 p-0">
            {items.map((s) => {
              const active = p === page && s.id === sideAt;
              return (
                <li key={s.id} className="flex">
                  <Link
                    href={`${p.path}#${s.id}`}
                    onClick={onNavigate}
                    aria-current={active ? "location" : undefined}
                    className={`relative flex-1 transition-colors duration-150 hover:text-fg ${
                      large ? "px-3.5 py-[9px] text-base" : "px-3.5 py-1.5 text-sm leading-[1.4]"
                    } ${active ? "text-fg" : "text-fg-6"}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute -left-px w-0.5 bg-accent transition-opacity duration-150 ${large ? "top-[7px] bottom-[7px]" : "top-[5px] bottom-[5px]"} ${
                        active ? "opacity-100" : "opacity-0"
                      }`}
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

/** Left sidebar (≥760px): search with ⌘K hint and the grouped page index. */
export function DocsSidebar() {
  const { query, setQuery, searchRef } = useDocsNav();
  return (
    <aside
      aria-label="Documentation"
      className="sticky top-14 hidden max-h-[calc(100vh-56px)] flex-col gap-7 overflow-y-auto pt-8 pb-12 [scrollbar-width:none] sm:flex"
    >
      <label className="flex h-9 flex-none cursor-text items-center gap-2 rounded-md border border-line-2 bg-surface-1 pr-2 pl-2.5">
        <SearchIcon />
        <input
          ref={searchRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documentation"
          aria-label="Search documentation"
          className="min-w-0 flex-1 appearance-none border-0 bg-transparent font-sans text-[13.5px] text-fg outline-none placeholder:text-fg-faint [&::-webkit-search-cancel-button]:hidden"
        />
        <kbd className="rounded-xs border border-line-4 px-[5px] font-mono text-[10.5px] leading-[18px] text-fg-muted">⌘K</kbd>
      </label>
      <SidebarGroups />
    </aside>
  );
}

/** Right rail (≥1180px): the current page's H1 and H2s with scrollspy. */
export function DocsRail() {
  const { page, at } = useDocsNav();
  return (
    <aside aria-label="On this page" className="sticky top-14 hidden flex-col gap-3 pt-16 pb-12 xl:flex">
      <span className="font-mono text-[10px] tracking-[0.1em] text-fg-faint">ON THIS PAGE</span>
      <ul className="m-0 flex list-none flex-col border-l border-line-1 p-0">
        {page.toc.map((t) => {
          const active = t.id === at;
          return (
            <li key={t.id} className="flex">
              <Link
                href={`${page.path}#${t.id}`}
                aria-current={active ? "location" : undefined}
                className={`relative flex-1 py-[5px] pl-3.5 text-[13px] leading-[1.4] transition-colors duration-150 hover:text-fg ${active ? "text-fg" : "text-fg-muted"}`}
              >
                <span aria-hidden="true" className={`absolute top-1 bottom-1 -left-px w-px bg-accent transition-opacity duration-150 ${active ? "opacity-100" : "opacity-0"}`} />
                {t.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Mobile (<760px): sticky 48px contents bar and the full-screen contents drawer. */
export function DocsMobileBar() {
  const { page, sideAt, query, setQuery, drawerOpen, setDrawerOpen } = useDocsNav();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (drawerOpen) {
      wasOpen.current = true;
      closeRef.current?.focus();
    } else if (wasOpen.current) {
      wasOpen.current = false;
      buttonRef.current?.focus({ preventScroll: true });
    }
  }, [drawerOpen]);

  const close = useCallback(() => setDrawerOpen(false), [setDrawerOpen]);

  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key !== "Tab" || !dialogRef.current) return;
    const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const current = page.sidebar.find((s) => s.id === sideAt) ?? page.sidebar[0];

  return (
    <>
      <div className="sticky top-14 z-40 flex h-12 items-center border-b border-line-1 bg-bg/90 px-5 backdrop-blur-[12px] sm:hidden">
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setDrawerOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={drawerOpen}
          className="flex h-8 cursor-pointer items-center gap-2 rounded-sm border border-line-4 bg-surface-1 pr-3 pl-2.5 font-sans text-sm font-medium text-fg"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="text-fg-4" aria-hidden="true">
            <path d="M4 6h16M4 12h10M4 18h13" />
          </svg>
          Contents
        </button>
        <span className="ml-3 overflow-hidden font-mono text-[10px] tracking-[0.1em] text-ellipsis whitespace-nowrap text-fg-faint uppercase">
          {page.section} / {current.label}
        </span>
      </div>

      {drawerOpen && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Contents"
          onKeyDown={onKeyDown}
          className="fixed inset-0 z-70 flex flex-col bg-bg font-sans sm:hidden"
        >
          <div className="flex h-14 flex-none items-center justify-between border-b border-line-1 px-5">
            <span className="font-mono text-[10px] tracking-[0.1em] text-fg-faint">CONTENTS</span>
            <button
              ref={closeRef}
              type="button"
              onClick={close}
              aria-label="Close contents"
              className="-mr-2 flex size-10 cursor-pointer items-center justify-center border-0 bg-transparent text-fg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 flex-col gap-7 overflow-y-auto px-5 pt-5 pb-10">
            <label className="flex h-11 flex-none items-center gap-2 rounded-md border border-line-2 bg-surface-1 px-3">
              <SearchIcon />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search documentation"
                aria-label="Search documentation"
                className="min-w-0 flex-1 appearance-none border-0 bg-transparent font-sans text-[15px] text-fg outline-none placeholder:text-fg-faint [&::-webkit-search-cancel-button]:hidden"
              />
            </label>
            <SidebarGroups large onNavigate={close} />
          </div>
        </div>
      )}
    </>
  );
}
