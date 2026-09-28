import Link from "next/link";
import type { ReactNode } from "react";
import { docHref } from "@/lib/docs";

export const H1 =
  "m-0 mb-6 font-display text-[clamp(36px,4.4vw,52px)] leading-[1.05] font-medium tracking-[-0.03em]";
export const H2 = "m-0 mb-5 font-display text-[34px] font-medium tracking-[-0.02em]";
export const H2_SUB = "mt-10 mb-4 font-display text-[26px] font-medium tracking-[-0.01em]";
export const H3 = "m-0 mb-3 text-xl font-semibold";
export const P = "m-0 mb-5 text-[17px] leading-[1.7]";
export const LEAD = "m-0 mb-5 text-[19px] leading-[1.65]";
export const LIST = "m-0 mb-7 pl-[22px] text-[17px] leading-[1.7]";
export const TABLE_WRAP = "overflow-x-auto border border-ink";
export const TABLE = "w-full border-collapse text-[15px] leading-[1.5]";
export const TH = "border-b border-ink px-3.5 py-2.5 font-semibold";
export const TD = "border-b border-line px-3.5 py-2.5";
export const TD_LAST = "px-3.5 py-2.5";

export function Article({ kicker, children }: { kicker: string; children: ReactNode }) {
  return (
    <article className="max-w-[44rem]">
      <p className="m-0 mb-3 font-mono text-[13px] tracking-[0.06em] text-muted">{kicker}</p>
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
    <div className={`border border-ink px-5 py-[18px] ${dashed ? "border-dashed" : "bg-oat-light"}`}>
      <p className="m-0 mb-2 font-mono text-xs tracking-[0.06em]">{label}</p>
      <p className="m-0 text-base leading-[1.65]">{children}</p>
    </div>
  );
}

/** A simple bordered table: first row is the header, cells are plain text or nodes. */
export function DataTable({
  head,
  rows,
  minWidth,
  caption,
  shadedHead = true,
  className = "",
}: {
  head: string[];
  rows: ReactNode[][];
  minWidth: number;
  caption?: string;
  shadedHead?: boolean;
  className?: string;
}) {
  return (
    <div className={`${TABLE_WRAP} ${className}`}>
      <table className={TABLE} style={{ minWidth }}>
        {caption && (
          <caption className="border-b border-ink bg-oat-hover px-3.5 py-2.5 text-left font-mono text-xs tracking-[0.04em]">
            {caption}
          </caption>
        )}
        <thead>
          <tr className={`text-left ${shadedHead ? "bg-oat-hover" : ""}`}>
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
