"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { slugify } from "@/components/docs-site/slugify";
import { FAQ_H2, FAQ_INTRO, FAQ_V6 } from "@/content/home-v6";
import { TEASER_LINKS } from "@/content/section-pages";
import { ROUTE_EVENT, SECTION_PATHS } from "../links";
import { CONTAINER, H2, INTRO, MONO, Pill, TEASER_LINK } from "../ui";

/** In-page anchor for each question on /faq, e.g. #will-crado-tell-me-if-my-product-will-pass. */
export const faqAnchor = (q: string) => slugify(q);

interface FaqProps {
  /** Homepage with section pages on: the first three questions and a link to /faq. */
  teaser?: boolean;
  /**
   * /faq: the page H1 is the section title, so the section heading is left out, questions are h2, and each question
   * has its own anchor; opening a link to one expands it.
   */
  page?: boolean;
  /**
   * Homepage with SCROLL_SECTIONS on: each answer has a link of its own, /faq?q=<slug>; arriving on one (or going
   * Back to one) opens that answer, and the ScrollRouter scrolls to it.
   */
  routed?: boolean;
}

function LinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
    </svg>
  );
}

/**
 * FAQ accordion (design: FAQ, FAQ row states). The first answer starts open. Every answer is in the HTML (closed
 * ones `hidden`), so search engines and find-in-page see them; the FAQPage JSON-LD renders from the same list.
 */
export default function Faq({ teaser = false, page = false, routed = false }: FaqProps) {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });
  const entries = teaser ? FAQ_V6.slice(0, 3) : FAQ_V6;
  const Question = page ? "h2" : "h3";

  // /faq#<question>: open that answer on arrival and whenever the hash changes.
  useEffect(() => {
    if (!page) return;
    const sync = () => {
      const i = FAQ_V6.findIndex((f) => `#${faqAnchor(f.q)}` === window.location.hash);
      if (i >= 0) setOpen((o) => ({ ...o, [i]: true }));
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [page]);

  // /faq?q=<question>: open that answer whenever the router lands on it.
  useEffect(() => {
    if (!routed) return;
    const sync = () => {
      if (window.location.pathname !== SECTION_PATHS.faq) return;
      const q = new URLSearchParams(window.location.search).get("q");
      const i = FAQ_V6.findIndex((f) => faqAnchor(f.q) === q);
      if (i >= 0) setOpen((o) => ({ ...o, [i]: true }));
    };
    sync();
    window.addEventListener(ROUTE_EVENT, sync);
    return () => window.removeEventListener(ROUTE_EVENT, sync);
  }, [routed]);

  // Copies the question's URL and puts its anchor in the address bar without adding a history entry.
  const share = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const url = `${window.location.href.split("#")[0]}#${id}`;
    navigator.clipboard?.writeText(url).catch(() => {});
    try {
      history.replaceState(history.state, "", `#${id}`);
    } catch {
      // History can be unavailable in sandboxed frames; copying still worked.
    }
  };

  return (
    <section id="faq" data-screen-label="FAQ" className={page ? "pb-(--v6-section)" : "border-t border-v6-line py-(--v6-section)"}>
      <div className={`${CONTAINER} flex flex-col gap-12`}>
        {!page && (
          <div className="flex flex-col gap-5">
            <Pill tone="lilac">FAQ</Pill>
            <div className="grid grid-cols-12 items-start gap-6">
              <h2 className={`${H2} col-[1/-1] v6t:col-[1/7]`}>{FAQ_H2}</h2>
              <p className={`${INTRO} col-[1/-1] max-w-[44ch] text-v6-muted v6t:col-[7/13] v6d:col-[8/13]`}>{FAQ_INTRO}</p>
            </div>
          </div>
        )}
        <div className="flex flex-col border-t border-v6-line">
          {entries.map((f, i) => {
            const isOpen = !!open[i];
            const n = String(i + 1).padStart(2, "0");
            const anchor = page ? faqAnchor(f.q) : undefined;
            return (
              <div key={f.q} id={anchor} data-faq-slug={routed ? faqAnchor(f.q) : undefined} className="border-b border-v6-line">
                <Question className="m-0">
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
                </Question>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen}>
                  <p className="m-0 max-w-[calc(64ch+100px)] pr-12 pb-7 pl-[72px] text-pretty text-v6-muted motion-safe:animate-v6-in">{f.a}</p>
                  {routed && (
                    <a
                      href={`${SECTION_PATHS.faq}?q=${faqAnchor(f.q)}`}
                      aria-label={`Link to "${f.q}"`}
                      className="mb-6 ml-[60px] inline-flex size-11 items-center justify-center rounded-v6-button text-v6-muted transition-colors duration-150 ease-v6-ui hover:bg-v6-alt hover:text-v6-ink"
                    >
                      <LinkIcon />
                    </a>
                  )}
                  {anchor && (
                    <a
                      href={`#${anchor}`}
                      onClick={(e) => share(e, anchor)}
                      aria-label={`Copy link to "${f.q}"`}
                      className="mb-6 ml-[60px] inline-flex size-11 items-center justify-center rounded-v6-button text-v6-muted transition-colors duration-150 ease-v6-ui hover:bg-v6-alt hover:text-v6-ink"
                    >
                      <LinkIcon />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        {teaser && (
          <Link href={SECTION_PATHS.faq} className={TEASER_LINK}>
            {TEASER_LINKS.faq}
          </Link>
        )}
      </div>
    </section>
  );
}
