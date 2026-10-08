"use client";

import Link from "next/link";
import { useState } from "react";
import type { FaqItem } from "@/lib/faq";

interface FaqAccordionProps {
  items: FaqItem[];
}

/** Answer text with the item's `link` phrase (first occurrence) turned into a link. Text stays verbatim. */
function Answer({ item }: { item: FaqItem }) {
  const at = item.link ? item.a.indexOf(item.link.text) : -1;
  if (!item.link || at < 0) return <>{item.a}</>;
  return (
    <>
      {item.a.slice(0, at)}
      <Link href={item.link.href} className="text-fg underline decoration-accent underline-offset-3">
        {item.link.text}
      </Link>
      {item.a.slice(at + item.link.text.length)}
    </>
  );
}

/**
 * FAQ accordion. Items open independently; the first starts open. Closed answers stay in the DOM with `hidden`
 * so the text the FAQPage JSON-LD repeats is always present in the HTML.
 */
export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [open, setOpen] = useState<boolean[]>(() => items.map((_, i) => i === 0));

  const toggle = (index: number) => setOpen((prev) => prev.map((v, j) => (j === index ? !v : v)));

  return (
    <div className="flex flex-col border-b border-line-1">
      {items.map((item, i) => {
        const n = i + 1;
        const isOpen = open[i] ?? false;
        return (
          <div key={item.q} className="border-t border-line-1">
            <h3 className="m-0">
              <button
                type="button"
                id={`faq-q${n}`}
                aria-expanded={isOpen}
                aria-controls={`faq-a${n}`}
                onClick={() => toggle(i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent py-5 text-left font-display text-[17px] leading-[1.4] font-medium tracking-[-0.01em] text-fg"
              >
                {item.q}
                <svg
                  aria-hidden="true"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-fg-6)"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  className={`flex-none transition-transform duration-200 ease-out-expo ${isOpen ? "rotate-45" : ""}`}
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </h3>
            <div id={`faq-a${n}`} role="region" aria-labelledby={`faq-q${n}`} hidden={!isOpen} className="pr-8 pb-[22px]">
              <p className="m-0 text-[15px] leading-[1.6] text-pretty text-fg-6">
                <Answer item={item} />
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
