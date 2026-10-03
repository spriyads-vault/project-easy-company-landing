"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

const ROWS: { label: string; without: string; with: string; icon: ReactNode }[] = [
  {
    label: "Gathering context",
    without: "Search inboxes, chats and shared drives for the last report and setup notes.",
    with: "Reports, emails and discussions are already linked to the case.",
    icon: (
      <>
        <rect x="3" y="4" width="11" height="13" rx="1.5" />
        <path d="M6 8h5M6 11h5M6 14h3M17 7v10" />
      </>
    ),
  },
  {
    label: "Assessing a change",
    without: "Compare the change with earlier results by hand, often after the build.",
    with: "See what the change could affect and which checks are worth running.",
    icon: (
      <>
        <path d="M3 15h6M11 5h6M9 15l2-10" />
        <circle cx="3.5" cy="15" r="1.5" />
        <circle cx="16.5" cy="5" r="1.5" />
      </>
    ),
  },
  {
    label: "Investigating a failure",
    without: "Rebuild the setup and history before anyone can suggest a cause.",
    with: "Start from linked sources, possible causes and a proposed next check.",
    icon: (
      <>
        <circle cx="8.5" cy="8.5" r="5" />
        <path d="m12.5 12.5 4.5 4.5" />
      </>
    ),
  },
  {
    label: "Keeping evidence current",
    without: "Track by hand which results still apply after each revision.",
    with: "See what each revision's evidence supports and what needs attention.",
    icon: (
      <>
        <rect x="3" y="3" width="6" height="6" rx="1" />
        <rect x="11" y="11" width="6" height="6" rx="1" />
        <path d="M9 6h4v5" />
      </>
    ),
  },
];

const BODY = "text-base leading-[1.65] tracking-[-0.015em]";

/** "Without Crado / With Crado" comparison. Switches itself on a second after it is first seen, one row at a time. */
export default function TimeComparison() {
  const section = useRef<HTMLElement>(null);
  const touched = useRef(false);
  const [on, setOn] = useState(false);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];
    const later = (fn: () => void, ms: number) => timers.push(window.setTimeout(fn, reduced ? 0 : ms));
    const io = new IntersectionObserver(
      ([en]) => {
        const seen = en.isIntersecting && (en.intersectionRatio >= 0.4 || en.intersectionRect.height >= window.innerHeight * 0.4);
        if (!seen) return;
        io.disconnect();
        later(() => {
          if (touched.current) return;
          setOn(true);
          ROWS.forEach((_, i) => later(() => !touched.current && setShown(i + 1), (i + 1) * 260));
        }, 1000);
      },
      { threshold: [0, 0.4, 0.6] },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(window.clearTimeout);
    };
  }, []);

  const choose = (next: boolean) => {
    touched.current = true;
    setOn(next);
    setShown(ROWS.length);
  };

  const lit = (i: number) => on && shown > i;

  return (
    <section ref={section} id="time" aria-labelledby="time-h" className="px-[clamp(16px,2.2vw,32px)] pt-[clamp(96px,11.1vw,160px)]">
      <div className="mx-auto max-w-[1200px]">
        <div data-rv="up" className="text-center">
          <p className="m-0 text-sm leading-[1.5] tracking-[-0.01em] text-fg-muted">Time</p>
          <h2 id="time-h" className="m-0 mt-5 text-[clamp(34px,3.9vw,56px)] leading-[1.08] tracking-[-0.05em] text-balance">
            From scattered context
            <br />
            <span className="text-fg-muted">to a prepared assessment.</span>
          </h2>
          <p className="mx-auto mt-5 mb-0 max-w-[36rem] text-lg leading-[1.65] tracking-[-0.015em] text-pretty text-fg-muted">
            Crado prepares the assessment from the evidence your team already has. Builds, physical tests and
            certification keep their own schedule.
          </p>
        </div>

        {/* Wide: three columns with a switch. */}
        <div className="mt-14 hidden grid-cols-[230px_minmax(0,1fr)_minmax(0,1fr)] gap-x-8 min-[760px]:grid">
          <div aria-hidden="true" className="relative col-start-3 row-span-5 row-start-1 rounded-2xl border border-line bg-white">
            <div
              className={`absolute -inset-px rounded-2xl border border-[#9DC27E] transition-opacity duration-[240ms] ${on ? "opacity-100" : "opacity-0"}`}
            />
          </div>
          <span className="col-start-2 row-start-1 self-end pb-5 text-sm leading-[1.5] tracking-[-0.01em] text-fg-muted">
            Without Crado
          </span>
          <div className="relative col-start-3 row-start-1 flex items-center justify-between gap-3 px-8 pt-7 pb-5">
            <span id="cmp-with" className="text-lg leading-[1.65] tracking-[-0.015em] text-fg">
              With Crado
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={on}
              aria-labelledby="cmp-with"
              onClick={() => choose(!on)}
              className={`flex h-[22px] w-9 cursor-pointer rounded-full border-0 p-0.5 ${on ? "bg-[#3E6B22]" : "bg-[#C9CCD1]"}`}
            >
              <span
                className={`size-[18px] rounded-full bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)] transition-transform duration-200 ${on ? "translate-x-3.5" : ""}`}
              />
            </button>
          </div>
          {ROWS.map((row, i) => {
            const last = i === ROWS.length - 1;
            const pad = last ? "pt-6 pb-8" : "py-6";
            return (
              <div key={row.label} className="contents">
                <span style={{ gridRow: i + 2 }} className={`col-start-1 flex items-start gap-3 text-lg leading-[1.65] tracking-[-0.015em] ${pad}`}>
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#5B616B" strokeWidth="1.3" className="mt-1 flex-none">
                    {row.icon}
                  </svg>
                  {row.label}
                </span>
                <span style={{ gridRow: i + 2 }} className={`col-start-2 text-fg-muted ${BODY} ${pad}`}>
                  {row.without}
                </span>
                <span
                  style={{ gridRow: i + 2 }}
                  className={`relative col-start-3 px-8 transition-opacity duration-[420ms] ${BODY} ${pad} ${
                    lit(i) ? "text-fg opacity-100" : "text-fg-subtle opacity-[0.18]"
                  }`}
                >
                  {row.with}
                </span>
              </div>
            );
          })}
        </div>

        {/* Narrow: a segmented control above one list. */}
        <div className="mt-10 rounded-2xl border border-line bg-white px-5 pt-2 pb-1 min-[760px]:hidden">
          <div role="group" aria-label="Compare" className="mt-3 mb-1 grid grid-cols-2 rounded-2xl bg-line-soft p-[3px]">
            {[false, true].map((value) => (
              <button
                key={String(value)}
                type="button"
                aria-pressed={on === value}
                onClick={() => choose(value)}
                className={`min-h-11 cursor-pointer rounded-2xl border-0 text-ink ${BODY} ${
                  on === value ? "bg-white shadow-[0_1px_2px_rgba(23,29,37,0.12)]" : "bg-transparent"
                }`}
              >
                {value ? "With Crado" : "Without Crado"}
              </button>
            ))}
          </div>
          {ROWS.map((row, i) => (
            <div key={row.label} className={`py-5 ${i ? "border-t border-[#EEEBE4]" : ""}`}>
              <p className={`m-0 ${BODY}`}>{row.label}</p>
              <p className={`m-0 mt-2 text-fg-muted ${BODY}`}>{lit(i) ? row.with : row.without}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
