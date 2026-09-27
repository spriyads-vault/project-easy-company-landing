"use client";

import { useState } from "react";

const FAQ: [string, string][] = [
  [
    "How does deterministic mapping work?",
    "Foundation models extract facts from your sources (frequencies, levels, test conditions, part numbers), and every fact keeps a citation to its page. Hardcoded rules for each clause then evaluate those facts. The same inputs always produce the same result, and each result links back to the evidence it used.",
  ],
  [
    "Is Crado SOC2 Compliant?",
    "We share our current security documentation and audit status during pilot scoping. Ask us for the latest report.",
  ],
  [
    "What EMC standards are supported today?",
    "FCC Part 15 Subpart B radiated emissions, Class A and Class B. Other EMC standards are scoped per pilot.",
  ],
  [
    "Do you train on customer data?",
    "No. Pilot data stays in an isolated workspace and is not used to train models.",
  ],
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="flex w-full flex-col items-center border-t border-ink bg-paper px-4 py-32"
    >
      <h2
        id="faq-title"
        className="m-0 mb-12 text-center font-display text-[clamp(36px,4.4vw,48px)] leading-[1.05] font-bold tracking-[-0.025em] text-ink"
      >
        System FAQ
      </h2>
      <div className="flex w-full max-w-3xl flex-col border-b border-ink">
        {FAQ.map(([q, a], i) => {
          const isOpen = open === i;
          const panelId = `faq-panel-${i}`;
          return (
            <div key={q} className="border-t border-ink">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 border-0 bg-transparent px-4 py-6 text-left font-mono text-sm leading-5 text-ink transition-colors duration-150 hover:bg-[rgba(42,52,65,0.05)]"
              >
                <span className="flex gap-4">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span>{q}</span>
                </span>
                <span className="font-mono text-ink">{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen && (
                <p
                  id={panelId}
                  className="m-0 max-w-[68ch] pr-4 pb-6 pl-[52px] text-[15px] leading-6 text-muted"
                >
                  {a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
