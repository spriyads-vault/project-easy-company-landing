"use client";

import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { ArrowIcon, CheckIcon } from "@/components/site/icons";
import SectionLink from "@/components/site/SectionLink";
import DemoChangeReview from "./DemoChangeReview";
import DemoInvestigation from "./DemoInvestigation";
import BrandMark, { type BrandKind } from "./BrandMark";
import DemoRecord from "./DemoRecord";
import { backdrop } from "./Outcome";

const CARDS: {
  gradient: string;
  eyebrow: string;
  item: string;
  state: string;
  solid: boolean;
  mark?: BrandKind;
  title: string;
  body: string;
}[] = [
  {
    gradient: "linear-gradient(160deg, #D2E3FC 0%, #AECBFA 55%, #8AB4F8 100%)",
    eyebrow: "Proposed change",
    item: "Rev C clock-routing review",
    state: "Ready for review",
    solid: true,
    title: "Proposed changes",
    body: "Review a layout or component change against earlier evidence before you commit to a build.",
  },
  {
    gradient: "linear-gradient(160deg, #FEF7E0 0%, #FDE293 55%, #FBBC04 130%)",
    eyebrow: "Investigation",
    item: "Clock harmonic on USB cable",
    state: "Unconfirmed",
    solid: false,
    title: "Failed tests",
    body: "Bring the report, setup notes and team discussion into one investigation and plan the next check.",
  },
  {
    gradient: "linear-gradient(160deg, #E6F4EA 0%, #CEEAD6 55%, #81C995 100%)",
    eyebrow: "Evidence",
    item: "Rev C report.pdf",
    state: "Linked",
    solid: true,
    mark: "pdf",
    title: "Evolving evidence",
    body: "Keep results tied to the revision they were measured on as the hardware moves forward.",
  },
];

const STEPS = [
  {
    label: "Evaluate",
    eyebrow: "Proposed change",
    title: "See what the change could affect.",
    body: "Check a change against the requirements and earlier evidence before the next build.",
    cta: "See the change review",
    target: "evaluate",
    Demo: DemoChangeReview,
  },
  {
    label: "Investigate",
    eyebrow: "Failed test",
    title: "Prepare a clearer next step.",
    body: "Start from linked sources, possible causes and a proposed check your team can review.",
    cta: "See the investigation",
    target: "investigate",
    Demo: DemoInvestigation,
  },
  {
    label: "Maintain",
    eyebrow: "New results",
    title: "Keep the whole picture connected.",
    body: "See what each revision’s evidence supports as new reports and messages arrive.",
    cta: "See the revision view",
    target: "maintain",
    Demo: DemoRecord,
  },
];

const STEP_MS = 5000;
const TICK = 100;

/** Auto-advancing walkthrough of the three mockups. Pauses on hover, off screen and when a tab is chosen. */
function Walkthrough() {
  const box = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [{ index, elapsed }, setPos] = useState({ index: 0, elapsed: 0 });
  const [auto, setAuto] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const io = new IntersectionObserver(
      ([en]) =>
        setVisible(en.isIntersecting && (en.intersectionRatio >= 0.4 || en.intersectionRect.height >= window.innerHeight * 0.4)),
      { threshold: [0, 0.4, 0.6] },
    );
    if (box.current) io.observe(box.current);
    return () => {
      mq.removeEventListener("change", sync);
      io.disconnect();
    };
  }, []);

  const playing = auto && !reduced;
  const ticking = playing && visible && !hover;
  useEffect(() => {
    if (!ticking) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      setPos((p) =>
        p.elapsed + TICK < STEP_MS
          ? { index: p.index, elapsed: p.elapsed + TICK }
          : { index: (p.index + 1) % STEPS.length, elapsed: 0 },
      );
    }, TICK);
    return () => window.clearInterval(id);
  }, [ticking]);

  const pick = (i: number) => {
    setPos({ index: i, elapsed: 0 });
    setAuto(false);
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = (i + step + STEPS.length) % STEPS.length;
    pick(next);
    tabs.current[next]?.focus();
  };

  const step = STEPS[index];
  const progress = (i: number) => (i < index ? 1 : i > index ? 0 : playing ? elapsed / STEP_MS : 1);

  return (
    <div
      ref={box}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="mt-6 overflow-hidden rounded-2xl bg-navy text-white"
    >
      <div
        id="walkthrough-panel"
        role="tabpanel"
        aria-labelledby={`walkthrough-tab-${index}`}
        className="grid grid-cols-[minmax(0,1fr)] min-[900px]:min-h-[420px] min-[900px]:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
      >
        <div key={index} className="flex animate-[fadeIn_260ms_cubic-bezier(0.22,1,0.36,1)] flex-col justify-center p-[clamp(28px,4vw,48px)]">
          <p className="m-0 text-[11px] leading-[1.4] font-medium tracking-[0.08em] text-[#AEB6C2] uppercase">{step.eyebrow}</p>
          <h3 className="m-0 mt-4 font-display text-2xl leading-[1.2] tracking-[-0.03em] text-balance">{step.title}</h3>
          <p className="m-0 mt-5 max-w-[26rem] text-base leading-[1.65] tracking-[-0.015em] text-[#E2E6EA]">{step.body}</p>
          <SectionLink
            section={step.target}
            className="mt-7 inline-flex h-11 items-center gap-3 self-start rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.1)] px-5 text-base leading-[1.65] font-medium tracking-[-0.015em] text-white no-underline hover:bg-[rgba(255,255,255,0.16)] hover:text-white focus-visible:outline-white"
          >
            {step.cta}
            <ArrowIcon />
          </SectionLink>
        </div>
        <div
          style={backdrop("blue")}
          className="relative m-3 grid min-w-0 grid-cols-[minmax(0,1fr)] content-end overflow-hidden rounded-2xl px-2.5 pt-3.5 min-[900px]:px-5 min-[900px]:pt-6"
        >
          {STEPS.map(({ label, Demo }, i) => (
            <div
              key={label}
              aria-hidden={i !== index}
              className={`[grid-area:1/1] min-w-0 transition-opacity duration-[320ms] ${i === index ? "visible opacity-100" : "invisible opacity-0"}`}
            >
              <Demo still />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-stretch gap-[clamp(12px,2vw,24px)] bg-ink-deep px-[clamp(16px,2vw,32px)]">
        <div role="tablist" aria-label="Walkthrough" className="grid flex-1 grid-cols-3 gap-[clamp(12px,2vw,24px)]">
          {STEPS.map(({ label }, i) => (
            <button
              key={label}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`walkthrough-tab-${i}`}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-controls="walkthrough-panel"
              tabIndex={i === index ? 0 : -1}
              onClick={() => pick(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className={`flex min-h-14 cursor-pointer flex-col gap-4 border-0 bg-transparent px-0 pt-5 text-left text-sm leading-[1.5] tracking-[-0.01em] focus-visible:outline-white ${
                i === index ? "text-white" : "text-[#AEB6C2]"
              }`}
            >
              <span>{label}</span>
              <span aria-hidden="true" className="relative mb-5 block h-0.5 overflow-hidden bg-[rgba(255,255,255,0.14)]">
                <span
                  className="absolute inset-0 origin-left bg-white transition-transform duration-100 ease-linear"
                  style={{ transform: `scaleX(${progress(i)})` }}
                />
              </span>
            </button>
          ))}
        </div>
        {!reduced && (
          <button
            type="button"
            onClick={() => setAuto((a) => !a)}
            aria-label={auto ? "Pause walkthrough" : "Play walkthrough"}
            title={auto ? "Pause walkthrough" : "Play walkthrough"}
            className="flex size-9 flex-none cursor-pointer items-center justify-center self-center rounded-full border border-[rgba(255,255,255,0.18)] bg-transparent text-white hover:bg-[rgba(255,255,255,0.1)] focus-visible:outline-white"
          >
            <svg aria-hidden="true" width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
              <path d={auto ? "M3 2h2v8H3zM7 2h2v8H7z" : "M3 1.8v8.4L10 6z"} />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export default function Capabilities() {
  return (
    <section
      id="fit"
      aria-labelledby="fit-h"
      className="bg-line-soft px-[clamp(16px,2.2vw,32px)] pt-[clamp(96px,11.1vw,160px)] pb-[clamp(96px,11.1vw,160px)]"
    >
      <div className="mx-auto max-w-[1200px]">
        <div data-rv="up" className="text-center">
          <p className="m-0 text-sm leading-[1.5] tracking-[-0.01em] text-fg-muted">Where it fits</p>
          <h2 id="fit-h" className="m-0 mt-5 text-[clamp(34px,3.9vw,56px)] leading-[1.08] tracking-[-0.05em] text-balance">
            One case for every
            <br />
            <span className="text-fg-muted">engineering decision.</span>
          </h2>
          <p className="mx-auto mt-5 mb-0 max-w-[36rem] text-lg leading-[1.65] tracking-[-0.015em] text-pretty text-fg-muted">
            Proposed changes, failed tests and new results all land in the same place, tied to the product and revision.
          </p>
        </div>

        <ul className="m-0 mt-16 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-6 p-0">
          {CARDS.map((card, i) => (
            <li key={card.title} className="min-w-0">
              <div
                aria-hidden="true"
                style={{ background: card.gradient }}
                className="relative grid aspect-[4/3] place-items-center overflow-hidden p-6"
              >
                <div
                  data-rv="glass"
                  style={{ "--rv-d": `${i * 80}ms` } as CSSProperties}
                  className="box-border w-full max-w-[260px] border border-[rgba(24,24,27,0.08)] bg-[rgba(255,255,255,0.7)] px-[18px] py-4 text-left shadow-[0_16px_40px_rgba(24,24,27,0.10)] backdrop-blur-[20px]"
                >
                  <span className="flex items-center justify-between gap-2 text-[11px] leading-[1.4] font-medium tracking-[0.08em] text-ink uppercase">
                    {card.eyebrow}
                    {card.mark && <BrandMark kind={card.mark} size={14} />}
                  </span>
                  <span className="mt-2 block text-base leading-[1.65] tracking-[-0.015em] text-ink">{card.item}</span>
                  <span
                    className={`mt-3 inline-flex h-6 items-center gap-1.5 px-2.5 text-xs leading-[1.5] ${
                      card.solid ? "bg-[#F2F2F1] text-[#111111]" : "border border-dashed border-[rgba(42,52,65,0.4)] text-ink"
                    }`}
                  >
                    {card.solid && <CheckIcon />}
                    {card.state}
                  </span>
                </div>
              </div>
              <h3 className="m-0 mt-6 font-display text-2xl leading-[1.2] tracking-[-0.03em]">{card.title}</h3>
              <p className="m-0 mt-2 text-base leading-[1.65] tracking-[-0.015em] text-fg-muted">{card.body}</p>
            </li>
          ))}
        </ul>

        <Walkthrough />
        <p className="m-0 mt-3 text-center text-xs leading-[1.5] text-fg-muted">Illustrative example</p>
      </div>
    </section>
  );
}
