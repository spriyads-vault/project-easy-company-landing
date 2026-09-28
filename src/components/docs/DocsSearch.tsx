"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, type KeyboardEvent } from "react";
import { DOC_GROUPS } from "@/lib/docs";

type Entry = { id: string; title: string; group: string; href: string; text: string };
type Result = Entry & { snippet: string; score: number };

let index: Promise<Entry[]> | null = null;

function sectionsOf(doc: Document | ParentNode, group: (typeof DOC_GROUPS)[number]): Entry[] {
  return Array.from(doc.querySelectorAll<HTMLElement>("[data-sec]")).map((el) => ({
    id: el.id,
    title: el.dataset.sec ?? el.id,
    group: group.label,
    href: group.items[0][0] === el.id ? group.path : `${group.path}#${el.id}`,
    text: (el.textContent ?? "").replace(/\s+/g, " ").trim(),
  }));
}

/** Index every docs section. Other pages are statically rendered, so fetch and parse their HTML once. */
function buildIndex(pathname: string) {
  index ??= Promise.all(
    DOC_GROUPS.map(async (g) => {
      if (g.path === pathname) return sectionsOf(document, g);
      try {
        const html = await fetch(g.path).then((r) => (r.ok ? r.text() : ""));
        return sectionsOf(new DOMParser().parseFromString(html, "text/html"), g);
      } catch {
        return [];
      }
    }),
  ).then((groups) => groups.flat());
  return index;
}

function search(entries: Entry[], q: string): Result[] {
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  return entries
    .map((s) => {
      const hay = `${s.title} ${s.text}`.toLowerCase();
      if (!terms.every((t) => hay.includes(t))) return null;
      const score = terms.reduce(
        (a, t) => a + (s.title.toLowerCase().includes(t) ? 10 : 0) + hay.split(t).length - 1,
        0,
      );
      const at = Math.max(0, s.text.toLowerCase().indexOf(terms[0]));
      const start = Math.max(0, at - 50);
      const snippet =
        (start > 0 ? "…" : "") + s.text.slice(start, start + 140) + (start + 140 < s.text.length ? "…" : "");
      return { ...s, snippet, score };
    })
    .filter((r): r is Result => r !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8);
}

export default function DocsSearch({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [entries, setEntries] = useState<Entry[] | null>(null);

  const load = () => {
    if (!entries) buildIndex(pathname).then(setEntries);
  };
  const results = entries && q.trim() ? search(entries, q) : [];

  const go = (href: string) => {
    setQ("");
    onNavigate();
    router.push(href);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") setQ("");
    if (e.key === "Enter" && results[0]) {
      e.preventDefault();
      go(results[0].href);
    }
  };

  return (
    <div role="search" className="relative mb-6">
      <label
        htmlFor="docs-search"
        className="mb-1.5 block font-mono text-xs tracking-[0.06em] text-muted"
      >
        SEARCH DOCUMENTATION
      </label>
      <input
        id="docs-search"
        type="search"
        value={q}
        onFocus={load}
        onChange={(e) => {
          load();
          setQ(e.target.value);
        }}
        onKeyDown={onKey}
        autoComplete="off"
        placeholder="e.g. detector, margin"
        aria-controls={q.trim() ? "search-results" : undefined}
        className="box-border min-h-11 w-full rounded-[3px] border border-ink bg-oat-light px-3 py-2.5 text-[15px] text-ink"
      />
      {q.trim() && (
        <div id="search-results" aria-live="polite" className="mt-2 border border-ink bg-oat-light">
          <p className="m-0 border-b border-line px-3 py-2 font-mono text-xs text-muted">
            {!entries
              ? "Searching…"
              : results.length
                ? `${results.length} ${results.length === 1 ? "section matches" : "sections match"}`
                : `No sections match “${q.trim()}”`}
          </p>
          {results.map((r) => (
            <a
              key={r.href}
              href={r.href}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey) return;
                e.preventDefault();
                go(r.href);
              }}
              className="block border-b border-line-soft px-3 py-2.5 text-ink no-underline hover:bg-oat-hover"
            >
              <span className="block text-sm font-semibold">{r.title}</span>
              <span className="mt-0.5 mb-1 block font-mono text-[11px] text-muted">{r.group}</span>
              <span className="block text-[13px] leading-[1.45] text-muted-2">{r.snippet}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
