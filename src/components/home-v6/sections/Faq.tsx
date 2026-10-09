"use client";

import { useState } from "react";
import { FAQ_H2, FAQ_INTRO, FAQ_V6 } from "@/content/home-v6";
import { CONTAINER, H2, INTRO, MONO, Pill } from "../ui";

/**
 * FAQ accordion (design: FAQ, FAQ row states). The first answer starts open. Every answer is in the HTML (closed
 * ones `hidden`), so search engines and find-in-page see them; the FAQPage JSON-LD renders from the same list.
 */
export default function Faq() {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });

  return (
    <section id="faq" data-screen-label="FAQ" className="border-t border-v6-line py-(--v6-section)">
      <div className={`${CONTAINER} flex flex-col gap-12`}>
        <div className="flex flex-col gap-5">
          <Pill tone="lilac">FAQ</Pill>
          <div className="grid grid-cols-12 items-start gap-6">
            <h2 className={`${H2} col-[1/-1] v6t:col-[1/7]`}>{FAQ_H2}</h2>
            <p className={`${INTRO} col-[1/-1] max-w-[44ch] text-v6-muted v6t:col-[7/13] v6d:col-[8/13]`}>{FAQ_INTRO}</p>
          </div>
        </div>
        <div className="flex flex-col border-t border-v6-line">
          {FAQ_V6.map((f, i) => {
            const isOpen = !!open[i];
            const n = String(i + 1).padStart(2, "0");
            return (
              <div key={f.q} className="border-b border-v6-line">
                <h3 className="m-0">
                  <button
                    type="button"
                    id={`faq-q-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen((o) => ({ ...o, [i]: !o[i] }))}
                    className="group grid min-h-11 w-full cursor-pointer grid-cols-[48px_minmax(0,1fr)_24px] items-baseline gap-3 rounded-v6-button border-0 bg-transparent px-3 py-6 text-left text-v6-ink transition-colors duration-150 ease-v6-ui hover:bg-v6-alt active:translate-y-px"
                  >
                    <span aria-hidden="true" className={`${MONO} text-v6-primary`}>
                      {n}
                    </span>
                    <span className="font-v6-serif text-[length:var(--v6-h3)] leading-(--v6-h3-lh) font-normal">{f.q}</span>
                    <span aria-hidden="true" className="font-v6-mono text-[length:var(--v6-body)] leading-none font-medium text-v6-muted group-hover:text-v6-ink">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen}>
                  <p className="m-0 max-w-[calc(64ch+100px)] pr-12 pb-7 pl-[72px] text-pretty text-v6-muted motion-safe:animate-v6-in">{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
