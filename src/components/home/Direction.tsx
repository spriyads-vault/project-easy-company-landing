"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FocusEvent } from "react";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// One loop of the presentation sequence, in milliseconds (from the approved Home v3 design):
// lines appear at these marks, the full record holds until BLANK_AT, then clears and repeats.
const MARKS = [250, 900, 1450, 2000, 2700];
const BLANK_AT = 8700;
const LOOP = 9100;
const TICK = 100;
const ALL = MARKS.length;

function stepAt(t: number) {
  if (t >= BLANK_AT) return 0;
  return MARKS.filter((m) => t >= m).length;
}

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Timeline for the engineering-record terminal.
 *
 * Runs only while at least half the terminal is on screen and the tab is visible. Under reduced
 * motion it starts paused on the complete record. Focus inside the record holds it complete.
 * Every line is always rendered, so the terminal never changes height.
 */
function useTerminalLoop() {
  const [choice, setChoice] = useState<"auto" | "playing" | "paused">("auto");
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const paused = choice === "paused" || (choice === "auto" && reduced);
  // null until the sequence first starts: the server and no-JS render show the complete record.
  const [step, setStep] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [docHidden, setDocHidden] = useState(false);
  const [focusHold, setFocusHold] = useState(false);
  const t = useRef(0);
  const started = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.intersectionRatio >= 0.5), { threshold: [0, 0.5, 1] });
    io.observe(el);
    const onVis = () => setDocHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  const running = visible && !docHidden && !paused && !focusHold;

  // A single interval exists only while the sequence is running.
  useEffect(() => {
    if (!running) return;
    if (!started.current) {
      started.current = true;
      t.current = 0;
      setStep(0);
    }
    const id = setInterval(() => {
      t.current = (t.current + TICK) % LOOP;
      setStep(stepAt(t.current));
    }, TICK);
    return () => clearInterval(id);
  }, [running]);

  // Resume from the complete record so a visitor never returns to a blank terminal.
  const resumeFull = () => {
    t.current = MARKS[ALL - 1];
    started.current = true;
    setStep(ALL);
  };

  const toggle = () => {
    if (paused) resumeFull();
    else setStep(ALL);
    setChoice(paused ? "playing" : "paused");
  };

  const regionProps = {
    onFocus: (e: FocusEvent<HTMLElement>) => {
      if (!(e.target as HTMLElement).dataset.termCtl) setFocusHold(true);
    },
    onBlur: (e: FocusEvent<HTMLElement>) => {
      const next = e.relatedTarget as HTMLElement | null;
      if (!e.currentTarget.contains(next) || next?.dataset.termCtl) {
        resumeFull();
        setFocusHold(false);
      }
    },
  };

  const shown = paused || focusHold || step === null ? ALL : step;
  return { ref, shown, paused, toggle, regionProps };
}

const LINE = "flex items-baseline gap-3.5 transition-[opacity,transform] duration-[320ms] ease-[ease]";
const DETAILS = ["Earlier test found · Rev B", "Related investigation linked", "Affected evidence needs review"];

export default function Direction() {
  const { ref, shown, paused, toggle, regionProps } = useTerminalLoop();
  const lineState = (i: number) => (i < shown ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0");

  return (
    <section id="direction" aria-labelledby="dir-h">
      <div className="mx-auto box-content max-w-[1280px] px-gutter py-[clamp(64px,8vw,112px)]">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-[clamp(32px,6vw,96px)] gap-y-5">
          <h2
            id="dir-h"
            className="m-0 font-display text-[clamp(34px,4.6vw,62px)] leading-[1.04] font-medium tracking-[-0.025em] text-balance"
          >
            Engineering changes. The record should keep up.
          </h2>
          <p className="m-0 max-w-[34rem] text-[19px] leading-[1.6] text-pretty">
            We’re building Crado to bring affected evidence back into view when hardware changes, while preserving
            earlier results and decisions.
          </p>
        </div>

        <div
          ref={ref}
          id="dir-term"
          role="region"
          aria-label="Crado engineering record, in development"
          {...regionProps}
          className="mt-[clamp(36px,5vw,56px)] overflow-hidden rounded-xl border border-[#2E3948] bg-navy text-[#E9EBEE] shadow-[0_1px_2px_rgba(31,39,50,0.18),0_24px_48px_-32px_rgba(31,39,50,0.55)]"
        >
          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2.5 border-b border-[#313C4C] px-[clamp(18px,2.6vw,32px)] py-3">
            <span className="font-mono text-[13px] tracking-[0.02em] text-fog">
              crado <span className="text-[#7F8A9A]">/</span> engineering record
            </span>
            <div className="flex items-center gap-3.5">
              <span className="rounded border border-[#46526A] px-2 py-[3px] font-mono text-xs tracking-[0.06em] text-fog">
                In development
              </span>
              <button
                type="button"
                data-term-ctl="1"
                onClick={toggle}
                aria-label={paused ? "Play the presentation sequence" : "Pause the presentation sequence"}
                className="inline-flex min-h-9 min-w-[84px] cursor-pointer items-center justify-center gap-2 rounded-md border border-[#46526A] bg-transparent px-3 font-mono text-xs tracking-[0.04em] text-[#E9EBEE] transition-[border-color,background-color] duration-150 hover:border-lime hover:bg-lime/5 focus-visible:outline-lime"
              >
                <span aria-hidden="true" className="w-3 text-center text-[11px]">
                  {paused ? "▶" : "❚❚"}
                </span>
                {paused ? "Play" : "Pause"}
              </button>
            </div>
          </div>
          <div
            tabIndex={0}
            className="flex flex-col gap-3.5 px-[clamp(18px,2.6vw,32px)] pt-[clamp(22px,3vw,36px)] pb-[clamp(24px,3vw,32px)] font-mono text-[clamp(15px,1.25vw,17px)] leading-[1.6] outline-none focus-visible:rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-[6px] focus-visible:outline-lime"
          >
            <div className={`${LINE} ${lineState(0)}`}>
              <span aria-hidden="true" className="w-4 flex-none text-lime">
                ›
              </span>
              <span className="min-w-0 [overflow-wrap:anywhere] text-oat">Review the clock-routing change in Rev C.</span>
            </div>
            <div className="flex flex-col gap-2 pl-[30px] text-fog">
              {DETAILS.map((d, i) => (
                <div key={d} className={`${LINE} ${lineState(i + 1)}`}>
                  <span aria-hidden="true" className="w-4 flex-none text-[#7F8A9A]">
                    –
                  </span>
                  <span className="min-w-0 [overflow-wrap:anywhere]">{d}</span>
                </div>
              ))}
            </div>
            <div
              className={`mt-2.5 flex items-baseline gap-3.5 border-t border-[#313C4C] pt-5 transition-[opacity,transform] duration-[360ms] ${lineState(4)}`}
            >
              <span aria-hidden="true" className="size-2.5 flex-none -translate-y-px rounded-[2px] bg-lime" />
              <span className="font-sans text-[clamp(19px,1.8vw,23px)] leading-[1.4] font-medium text-pretty text-oat">
                Rev C needs review. Rev B’s record stays intact.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
