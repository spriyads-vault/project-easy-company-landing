"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CAPABILITIES_SECTION as C, CATEGORY_LABEL, LEDGER, type CapabilityCategory } from "@/content/home-v8";
import StatusTag from "../StatusTag";
import { Glyph, H2, Icon, LEAD, MONO, SECTION } from "../ui";

type Filter = "all" | CapabilityCategory;
const FILTERS: [Filter, string][] = [["all", C.all], ...(Object.entries(CATEGORY_LABEL) as [CapabilityCategory, string][])];

/**
 * The capability ledger (design: SECTION 6, #capabilities), filterable by category. Each row's status comes from
 * capability-status.ts through StatusTag. Changing the filter fades the list out, swaps it and fades it back in.
 */
export default function Capabilities() {
  const [filter, setFilter] = useState<Filter>("all");
  const [fading, setFading] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const choose = (next: Filter) => {
    if (next === filter) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setFilter(next);
      return;
    }
    setFading(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setFilter(next);
      setFading(false);
    }, 220);
  };

  const rows = LEDGER.filter((r) => filter === "all" || r.category === filter);

  return (
    <section id="capabilities" aria-labelledby="capabilities-title" className={SECTION}>
      <div className="mx-auto max-w-[1120px]">
        <div data-reveal="" className="max-w-[680px]">
          <h2 id="capabilities-title" className={H2}>
            {C.h2}
          </h2>
          <p className={`${LEAD} mt-4`}>{C.body}</p>
          <div role="group" aria-label={C.filterLabel} className="mt-7 flex flex-wrap gap-2">
            {FILTERS.map(([key, label]) => {
              const on = key === filter;
              return (
                <button
                  key={key}
                  type="button"
                  aria-pressed={on}
                  onClick={() => choose(key)}
                  className={`cursor-pointer rounded-full border-0 px-[18px] py-2 text-[16px] leading-6 font-[450] transition-[background-color,color,transform] duration-200 ease-v8-ui active:scale-[0.98] ${
                    on ? "bg-v8-button text-v8-page" : "bg-transparent text-v8-white shadow-[0_0_0_1px_var(--color-v8-ring-button)]"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
        <ul
          className={`mx-auto mt-14 max-w-[760px] list-none p-0 shadow-[0_-1px_0_var(--color-v8-ring)] transition-[opacity,transform] duration-300 ease-v8-ui ${
            fading ? "translate-y-4 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          {rows.map((r) => (
            <li key={r.title} className="group flex items-center gap-6 py-7 shadow-[0_1px_0_var(--color-v8-ring)]">
              <div className="min-w-0 flex-1">
                <h3 className="m-0 text-[24px] leading-[30px] font-medium decoration-1 underline-offset-4 group-hover:underline">{r.title}</h3>
                <p className={`${LEAD} mt-2`}>{r.body}</p>
                <div className="mt-3 flex flex-wrap items-center gap-2.5 text-[15px] leading-[21px] text-v8-muted">
                  <span className="flex items-center gap-1.5">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-v8-faint opacity-60 group-hover:opacity-100" />
                    {CATEGORY_LABEL[r.category]}
                  </span>
                  <StatusTag capability={r.capability} />
                  <span className="text-v8-faint" aria-hidden="true">
                    ·
                  </span>
                  <Link href={r.href} className="flex items-center gap-0.5 text-v8-muted hover:text-v8-white">
                    {C.learnMore}
                    <span className="sr-only"> about {r.title}</span>
                    <Icon name="north_east" size={18} />
                  </Link>
                </div>
              </div>
              <div
                aria-hidden="true"
                className={`box-border hidden w-[232px] flex-none flex-col gap-2.5 rounded-v8-card border border-v8-line bg-v8-card px-4 py-3.5 v8w:flex ${MONO}`}
              >
                <span className="text-[11px] leading-4 text-v8-faint">{r.token.label}</span>
                <span className="flex gap-[7px] self-start rounded-v8-chip border border-v8-line bg-v8-chip px-[9px] py-[5px] text-[12px] leading-[18px] whitespace-nowrap text-v8-ink">
                  {r.token.state && <Glyph state={r.token.state} />}
                  {r.token.value}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
