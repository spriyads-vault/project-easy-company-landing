import Link from "next/link";
import type { ReactNode } from "react";
import { docsHref } from "@/lib/docs-pages";
import CodeCopyButton from "./CodeCopyButton";
import HeadingAnchor from "./HeadingAnchor";

/** Same slug rule the design used for headings without an explicit id. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Headings land 80px below the viewport top (104px + 24 on mobile, under the contents bar). */
const SCROLL_MARGIN = "scroll-mt-4 max-sm:scroll-mt-16";

export function H2({ id, children }: { id: string; children: string }) {
  return (
    <h2
      id={id}
      className={`group/h m-0 mt-11 font-display text-[26px] leading-[1.2] font-bold tracking-[-0.02em] text-balance ${SCROLL_MARGIN}`}
    >
      {children}
      <HeadingAnchor id={id} label={children} />
    </h2>
  );
}

const H3_VARIANT = {
  /** Standalone sub-heading inside a section. */
  section: "mt-4 text-[19px]",
  /** Title inside a numbered step. */
  step: "text-[19px]",
  /** Title inside a card. */
  card: "text-[17px]",
} as const;

export function H3({ id, variant = "section", children }: { id?: string; variant?: keyof typeof H3_VARIANT; children: string }) {
  const hid = id ?? slugify(children);
  return (
    <h3 id={hid} className={`group/h m-0 font-display leading-[1.3] font-bold tracking-[-0.01em] ${H3_VARIANT[variant]} ${SCROLL_MARGIN}`}>
      {children}
      <HeadingAnchor id={hid} label={children} />
    </h3>
  );
}

export function Lead({ children }: { children: ReactNode }) {
  return <p className="m-0 mt-1 text-lg leading-[1.6] text-pretty text-fg-3">{children}</p>;
}

export function P({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`m-0 text-base leading-[1.65] text-pretty text-fg-4 ${className}`}>{children}</p>;
}

const LINK = "text-fg underline decoration-accent underline-offset-[3px] hover:text-white";

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

/** Mono eyebrow / caption label. */
export function Mono({ children, className = "text-fg-faint" }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono text-[10px] tracking-[0.1em] ${className}`}>{children}</span>;
}

const CALLOUT_TONE = {
  warn: { bar: "border-warn", label: "text-warn" },
  accent: { bar: "border-accent", label: "text-accent-text" },
  violet: { bar: "border-violet", label: "text-violet" },
} as const;

export function Callout({ tone, label, children }: { tone: keyof typeof CALLOUT_TONE; label: string; children: ReactNode }) {
  const t = CALLOUT_TONE[tone];
  return (
    <aside className={`mt-1 flex flex-col gap-2 border-l-2 bg-surface-0 px-5 py-4 ${t.bar}`}>
      <Mono className={t.label}>{label}</Mono>
      <p className="m-0 text-[15px] leading-[1.6] text-pretty text-fg-3">{children}</p>
    </aside>
  );
}

const STATE_TONE = {
  info: "text-info border-info/50",
  ok: "text-ok border-ok/50",
  warn: "text-warn border-warn/50",
  muted: "text-fg-muted border-fg-muted/50",
} as const;

/** OBSERVED / KNOWN / INFERRED / MISSING / CONFIRMED badge. `small` is the lane-diagram size. */
export function StateBadge({ tone, small, children }: { tone: keyof typeof STATE_TONE; small?: boolean; children: ReactNode }) {
  return (
    <span
      className={`inline-flex items-center rounded-xs border font-mono tracking-[0.06em] ${
        small ? "h-[18px] px-[5px] text-[9.5px]" : "h-5 px-1.5 text-[10px]"
      } ${STATE_TONE[tone]}`}
    >
      {children}
    </span>
  );
}

const PILL_TONE = {
  muted: "bg-fg-muted/14 text-fg-4",
  danger: "bg-danger/14 text-danger",
  neutral: "bg-white/7 text-fg-3",
} as const;

export function Pill({ tone, children }: { tone: keyof typeof PILL_TONE; children: ReactNode }) {
  return <span className={`rounded-sm px-2 py-0.5 font-sans text-xs font-medium ${PILL_TONE[tone]}`}>{children}</span>;
}

/** Square bullet: filled accent (in scope) or outlined (not in scope). */
export function Bullet({ filled, children, className = "" }: { filled?: boolean; children: ReactNode; className?: string }) {
  return (
    <li className={`flex gap-3 ${className}`}>
      <span aria-hidden="true" className={`mt-2 block size-1.5 flex-none ${filled ? "bg-accent" : "border border-fg-faint"}`} />
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

/** Striped, horizontally scrollable table. */
export function Table({ head, rows, minWidth, firstCol, monoFirst, minWidths, label }: TableProps) {
  return (
    <div className="overflow-x-auto rounded-md border border-line-2" role="region" aria-label={label} tabIndex={0}>
      <table className="w-full border-collapse text-sm leading-normal" style={{ minWidth }}>
        <thead>
          <tr>
            {head.map((h, i) => (
              <th
                key={h}
                scope="col"
                style={i === 0 && firstCol ? { width: firstCol } : undefined}
                className={`border-b border-line-2 bg-surface-1 px-3.5 py-2.5 text-left font-mono text-[11px] font-normal tracking-[0.08em] text-fg-muted uppercase ${
                  i === 0 && monoFirst ? "whitespace-nowrap" : ""
                }`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className={r % 2 === 1 ? "bg-surface-0" : undefined}>
              {row.map((cell, c) => (
                <td
                  key={c}
                  style={minWidths?.[c] ? { minWidth: minWidths[c] } : undefined}
                  className={`px-3.5 py-3 align-top ${r > 0 ? "border-t border-line-2" : ""} ${
                    c === 0
                      ? monoFirst
                        ? "font-mono text-[13px] whitespace-nowrap text-fg"
                        : "font-medium text-fg"
                      : "text-fg-4"
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
  );
}

/** Code block with a mono header label and a Copy button. */
export function CodeBlock({ label, text, children }: { label: string; text: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-card border border-line-2 bg-surface-1">
      <div className="flex h-10 items-center justify-between border-b border-line-1 pr-2 pl-3.5">
        <Mono>{label}</Mono>
        <CodeCopyButton text={text} label={label.toLowerCase()} />
      </div>
      <pre className="m-0 overflow-x-auto px-4 py-[18px] font-mono text-[13px] leading-[1.6] text-fg-2">{children}</pre>
    </div>
  );
}
