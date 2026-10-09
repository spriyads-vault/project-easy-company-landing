import Link from "next/link";
import type { ReactNode } from "react";
import HeadingAnchor from "@/components/docs-site/HeadingAnchor";
import { slugify } from "@/components/docs-site/slugify";
import { LABEL } from "@/components/home-v6/ui";
import { docsHref } from "@/lib/docs-pages";
import CopyButton from "./CopyButton";

/*
 * Docs primitives in the v6 light design (SCRUM-296), with the same API as src/components/docs-site/ui-v3.tsx so the
 * frozen content components render unchanged. Type: H2 Plex Serif 34/40, H3 24/32, body Plex Sans 17/28, code
 * Plex Mono 14/22 (tokens --v6-doc-*). Anchors land below the sticky header through scroll-padding (site.css).
 */

export { slugify };

export function H2({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="group/h m-0 mt-12 font-v6-serif text-[length:var(--v6-doc-h2)] leading-(--v6-doc-h2-lh) font-normal tracking-[-.02em] text-balance text-v6-ink">
      {children}
      <HeadingAnchor id={id} label={children} />
    </h2>
  );
}

const H3_VARIANT = {
  /** Standalone sub-heading inside a section. */
  section: "mt-4",
  /** Title inside a numbered step. */
  step: "",
  /** Title inside a card. */
  card: "",
} as const;

export function H3({ id, variant = "section", children }: { id?: string; variant?: keyof typeof H3_VARIANT; children: string }) {
  const hid = id ?? slugify(children);
  return (
    <h3 id={hid} className={`group/h m-0 font-v6-serif text-[length:var(--v6-doc-h3)] leading-(--v6-doc-h3-lh) font-normal text-v6-ink ${H3_VARIANT[variant]}`}>
      {children}
      <HeadingAnchor id={hid} label={children} />
    </h3>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="m-0 mt-1 font-v6-sans text-[20px] leading-[30px] text-pretty text-v6-muted">{children}</p>;
}

export function P({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`m-0 font-v6-sans text-[length:var(--v6-doc-body)] leading-(--v6-doc-body-lh) text-pretty text-v6-ink ${className}`}>{children}</p>;
}

const LINK = "text-v6-primary underline decoration-v6-primary/40 underline-offset-[3px] hover:text-v6-primary-hover hover:decoration-current";

/** Inline link. `to` is a docs heading id (resolved across pages), a path, a mailto: or an external URL. */
export function A({ to, children }: { to: string; children: ReactNode }) {
  if (to.startsWith("http")) {
    return (
      <a href={to} target="_blank" rel="noopener" className={LINK}>
        {children}
      </a>
    );
  }
  if (to.startsWith("mailto:")) {
    return (
      <a href={to} className={LINK}>
        {children}
      </a>
    );
  }
  return (
    <Link href={to.startsWith("/") ? to : docsHref(to)} className={LINK}>
      {children}
    </Link>
  );
}

/** Mono eyebrow / caption label (Plex Mono 500 12/16, 0.06em). The content's v3 colour classes map to v6 in site.css. */
export function Mono({ children, className = "text-v6-muted" }: { children: ReactNode; className?: string }) {
  return <span className={`${LABEL} ${className}`}>{children}</span>;
}

/** Callout tones: Sky note, Sunshine caution, grey Roadmap and Mint Live. Text is always Ink. */
const CALLOUT_TONE = {
  /** Note ("WHY IT MATTERS"). */
  accent: "bg-v6-sky",
  /** Caution ("LIMITATION"). */
  warn: "bg-v6-sun",
  /** Roadmap. */
  violet: "bg-v6-tag-grey",
  /** Live. */
  live: "bg-v6-mint",
} as const;

export function Callout({ tone, label, children }: { tone: keyof typeof CALLOUT_TONE; label: string; children: ReactNode }) {
  return (
    <aside data-callout={tone} className={`mt-1 flex flex-col gap-2 rounded-v6-card px-5 py-4 text-v6-ink ${CALLOUT_TONE[tone]}`}>
      <span className={LABEL}>{label}</span>
      <p className="m-0 font-v6-sans text-[16px] leading-[26px] text-pretty">{children}</p>
    </aside>
  );
}

/** Evidence states, as on the homepage: sky observed, mint known/confirmed, sun inferred, lilac missing. */
const STATE_TONE = {
  info: "bg-v6-sky",
  ok: "bg-v6-mint",
  warn: "bg-v6-sun",
  muted: "bg-v6-lilac",
} as const;

/** OBSERVED / KNOWN / INFERRED / MISSING / CONFIRMED badge. `small` is the lane-diagram size. */
export function StateBadge({ tone, small, children }: { tone: keyof typeof STATE_TONE; small?: boolean; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-full font-v6-mono font-medium tracking-[.06em] text-v6-ink ${
        small ? "h-5 px-2 text-[10.5px]" : "h-6 px-2.5 text-[12px]"
      } ${STATE_TONE[tone]}`}
    >
      {children}
    </span>
  );
}

const PILL_TONE = {
  /** Missing (lilac, as the missing evidence state). */
  muted: "bg-v6-lilac text-v6-ink",
  /** Incompatible. */
  danger: "border border-v6-missing-ink text-v6-missing-ink",
  /** Unsupported. */
  neutral: "bg-v6-tag-grey text-v6-ink",
} as const;

export function Pill({ tone, children }: { tone: keyof typeof PILL_TONE; children: ReactNode }) {
  return <span className={`rounded-full px-3 py-1 font-v6-sans text-[13px] leading-4 font-medium ${PILL_TONE[tone]}`}>{children}</span>;
}

/** Square bullet: filled primary (in scope) or outlined (not in scope). */
export function Bullet({ filled, children, className = "" }: { filled?: boolean; children: ReactNode; className?: string }) {
  return (
    <li className={`flex gap-3 ${className}`}>
      <span aria-hidden="true" className={`mt-2 block size-1.5 flex-none ${filled ? "bg-v6-primary" : "border border-v6-muted"}`} />
      <span>{children}</span>
    </li>
  );
}

interface TableProps {
  head: string[];
  rows: ReactNode[][];
  minWidth: number;
  /** Width of the first column, e.g. "32%". */
  firstCol?: string;
  /** Render the first column in mono (clause ids). */
  monoFirst?: boolean;
  /** Per-column minimum widths (px) for body cells. */
  minWidths?: (number | undefined)[];
  label: string;
}

/**
 * Table in the homepage coverage style: white panel, radius 20, hairline, Alt header row with mono labels. Scrolls
 * sideways on narrow screens (the region is focusable so keyboard users can scroll it) with the first column held.
 */
export function Table({ head, rows, minWidth, firstCol, monoFirst, minWidths, label }: TableProps) {
  return (
    <div className="overflow-hidden rounded-v6-panel border border-v6-line bg-v6-card">
      <div className="overflow-x-auto" role="region" aria-label={label} tabIndex={0}>
        <table className="w-full border-separate border-spacing-0 font-v6-sans text-[15px] leading-6" style={{ minWidth }}>
          <thead>
            <tr>
              {head.map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  style={i === 0 && firstCol ? { width: firstCol } : undefined}
                  className={`border-b border-v6-line bg-v6-alt px-5 py-3.5 text-left ${LABEL} text-v6-muted uppercase ${
                    i === 0 ? "sticky left-0 z-1 border-r" : ""
                  } ${i === 0 && monoFirst ? "whitespace-nowrap" : ""}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {row.map((cell, c) => (
                  <td
                    key={c}
                    style={minWidths?.[c] ? { minWidth: minWidths[c] } : undefined}
                    className={`px-5 py-4 align-top ${r > 0 ? "border-t border-v6-line" : ""} ${
                      c === 0
                        ? `sticky left-0 z-1 border-r border-r-v6-line bg-v6-card ${monoFirst ? "font-v6-mono text-[14px] leading-[22px] font-medium whitespace-nowrap text-v6-ink" : "font-medium text-v6-ink"}`
                        : "text-v6-muted"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/**
 * Code block: white card, hairline, radius 8, a mono header label and the Copy button. Plex Mono 14/22 in Ink; the
 * content's highlighted tokens (the v3 accent-text class) resolve to Primary, 9.8:1 on white (AA light theme).
 */
export function CodeBlock({ label, text, children }: { label: string; text: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-v6-card border border-v6-line bg-v6-card">
      <div className="flex h-12 items-center justify-between border-b border-v6-line pr-2 pl-4">
        <span className={`${LABEL} text-v6-muted`}>{label}</span>
        <CopyButton text={text} label={label.toLowerCase()} />
      </div>
      {/* Focusable so keyboard users can scroll a long line on narrow screens. */}
      <pre tabIndex={0} aria-label={label} className="m-0 overflow-x-auto px-4 py-4 font-v6-mono text-[length:var(--v6-doc-code)] leading-(--v6-doc-code-lh) font-medium text-v6-ink">{children}</pre>
    </div>
  );
}
