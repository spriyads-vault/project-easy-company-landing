import type { CSSProperties } from "react";
import { ArrowIcon } from "@/components/site/icons";
import PilotLink from "@/components/site/PilotLink";
import SectionLink from "@/components/site/SectionLink";
import HeroDevice from "./HeroDevice";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const PILL = "flex-none inline-flex h-11 items-center rounded-full px-5 text-sm leading-[1.5] font-medium tracking-[-0.01em] whitespace-nowrap no-underline transition-transform duration-[180ms] hover:-translate-y-px focus-visible:outline-slate focus-visible:outline-offset-[3px]";

export default function Hero() {
  return (
    // Sits under the transparent sticky header.
    <section aria-labelledby="hero-h" className="relative -mt-16 overflow-hidden bg-oat">
      <div className="relative mx-auto box-border flex max-w-[1200px] flex-col items-center px-5 pt-[104px] pb-[72px] min-[900px]:px-[clamp(20px,2.2vw,32px)] min-[900px]:pt-32 min-[900px]:pb-20">
        <div className="relative flex max-w-[1100px] flex-col items-center text-center">
          <span
            style={delay(0)}
            className="hero-up inline-flex h-[30px] items-center gap-2 rounded-full border border-line bg-[rgba(255,255,255,0.6)] px-3 text-sm leading-[1.5] tracking-[-0.01em] whitespace-nowrap text-fg"
          >
            <span aria-hidden="true" className="size-1.5 rounded-full bg-lime" />
            Member of NVIDIA Inception
          </span>
          <h1
            id="hero-h"
            style={delay(80)}
            className="hero-lift m-0 mt-7 text-[clamp(40px,5.84vw,84px)] leading-[1.04] tracking-[-0.06em] text-fg"
          >
            Hardware changes.
            <br />
            <span className="text-fg-muted">Evidence stays connected.</span>
          </h1>
          <p
            style={delay(160)}
            className="hero-lift m-0 mt-6 max-w-[620px] text-lg leading-[1.65] tracking-[-0.015em] text-pretty text-fg-muted"
          >
            Crado helps hardware teams evaluate a change before the next test, investigate failures when they happen,
            and keep the evidence current as the product evolves.
          </p>
          <div style={delay(240)} className="hero-up mt-8 flex flex-wrap justify-center gap-3">
            <PilotLink className={`${PILL} gap-3 bg-ink text-white hover:bg-[#1C232D] hover:text-white`}>
              Discuss a pilot
              <ArrowIcon />
            </PilotLink>
            <SectionLink
              section="approach"
              className={`${PILL} border border-line bg-[rgba(255,255,255,0.5)] text-ink hover:border-ink hover:text-ink`}
            >
              See how it works
            </SectionLink>
          </div>
          <p style={delay(320)} className="hero-up m-0 mt-5 text-sm leading-[1.5] tracking-[-0.01em] text-fg-muted">
            For hardware teams preparing for test and certification.
          </p>
        </div>
        <HeroDevice />
      </div>
    </section>
  );
}
