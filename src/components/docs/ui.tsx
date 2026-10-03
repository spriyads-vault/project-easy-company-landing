import Link from "next/link";
import type { ReactNode } from "react";
import { docHref } from "@/lib/docs";

export const H1 =
  "m-0 mb-5 font-display text-[clamp(32px,2.92vw,42px)] leading-[1.1] tracking-[-0.045em]";
export const H2 = "m-0 mb-4 font-display text-2xl leading-[1.2] tracking-[-0.03em]";
export const H2_SUB = "mt-16 mb-4 font-display text-2xl leading-[1.2] tracking-[-0.03em]";
export const H3 = "mt-10 mb-3 text-lg leading-[1.4] tracking-[-0.015em]";
export const P = "m-0 mb-5 text-base leading-[1.7] tracking-[-0.015em]";
export const LEAD = "m-0 mb-5 text-lg leading-[1.65] tracking-[-0.015em] text-fg-muted";
export const LIST = "m-0 mb-7 pl-6 text-base leading-[1.7] tracking-[-0.015em]";
export const TABLE_WRAP = "overflow-x-auto border border-line";
export const TABLE = "w-full border-collapse text-base leading-[1.7] tracking-[-0.015em]";
export const TH = "h-12 border-b border-line px-4 text-[13px] leading-[1.5] text-fg-muted";
export const TD = "border-b border-line px-4 py-3";
export const TD_LAST = "px-4 py-3";

export function Article({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <article className="max-w-[44rem]">
      <p className="m-0 mb-3 text-[11px] leading-[1.4] font-medium tracking-[0.08em] uppercase text-fg-muted">{kicker}</p>
      {children}
    </article>
  );
}

export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} data-sec={title} className="mb-[72px]">
      {children}
    </section>
  );
}

/** Link to any docs section by its anchor, across pages. */
export function DocLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link href={docHref(to) ?? `#${to}`} className="underline-offset-[3px]">
      {children}
    </Link>
  );
}

export function Callout({ label, dashed, children }: { label: string; dashed?: boolean; children: ReactNode }) {
  return (
    <div className={`border px-5 py-5 ${dashed ? "border-dashed border-ink" : "border-line bg-white"}`}>
      <p className="m-0 mb-2 text-[11px] leading-[1.4] font-medium tracking-[0.08em] uppercase">{label}</p>
      <p className="m-0 text-base leading-[1.7] tracking-[-0.015em]">{children}</p>
    </div>
  );
}

/** A simple bordered table: first row is the header, cells are plain text or nodes. */
export function DataTable({
  head,
  rows,
  minWidth,
  caption,
  className = "",
}: {
  head: string[];
  rows: ReactNode[][];
  minWidth: number;
  caption?: string;
  className?: string;
}) {
  return (
    <div className={`${TABLE_WRAP} ${className}`}>
      <table className={TABLE} style={{ minWidth }}>
        {caption && (
          <caption className="border-b border-line bg-line-soft px-4 py-3 text-left text-[11px] leading-[1.4] font-medium tracking-[0.08em] uppercase">
            {caption}
          </caption>
        )}
        <thead>
          <tr className="text-left">
            {head.map((h) => (
              <th key={h} scope="col" className={TH}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} className={i === rows.length - 1 ? TD_LAST : TD}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const ECFR_15_109 =
  "https://www.ecfr.gov/current/title-47/chapter-I/subchapter-A/part-15/subpart-B/section-15.109";
