import PilotLink from "@/components/site/PilotLink";
import SectionLink from "@/components/site/SectionLink";
import { RevisionLayers } from "./art";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-h"
      className="mx-auto box-content max-w-[1440px] px-gutter pt-10 pb-16 min-[1100px]:pt-[clamp(28px,5vh,64px)] min-[1100px]:pb-[clamp(48px,8vh,96px)]"
    >
      <div className="grid grid-cols-1 items-center gap-[clamp(32px,4vw,64px)] min-[1100px]:grid-cols-[minmax(0,52fr)_minmax(0,48fr)]">
        <div className="flex min-w-0 flex-col gap-[clamp(20px,3vh,28px)]">
          <h1
            id="hero-h"
            className="m-0 mb-[clamp(4px,1vh,12px)] font-display text-[clamp(36px,9.4vw,64px)] leading-none font-medium tracking-[-0.03em] text-navy min-[1100px]:text-[clamp(44px,min(4.6vw,9vh),80px)]"
          >
            Compliance,
            <br />
            inside the
            <br />
            engineering loop.
          </h1>
          <p className="m-0 max-w-[33rem] text-[clamp(17px,1.3vw,19px)] leading-[1.6] text-pretty">
            Crado connects hardware revisions, regulatory requirements and test evidence so engineers can trace a
            finding, investigate a failure and review the evidence behind the next decision.
          </p>
          <p className="m-0 flex items-center gap-2.5 self-start rounded-md border border-line bg-oat-light py-[7px] pr-3.5 pl-2.5 font-mono text-[13px] tracking-[0.02em]">
            <span aria-hidden="true" className="size-[9px] flex-none rounded-[2px] border border-ink/20 bg-slate" />
            <span>Starting with radiated-emissions investigations.</span>
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-x-6 gap-y-3">
            <PilotLink className="inline-flex min-h-[52px] items-center gap-3.5 rounded-md bg-ink py-0 pr-2.5 pl-[22px] text-[17px] font-medium text-oat no-underline transition-[background-color,transform] duration-200 hover:bg-navy hover:text-oat active:translate-y-px">
              Discuss a pilot
              <span aria-hidden="true" className="grid size-8 place-items-center rounded bg-lime font-[system-ui] text-base text-ink">
                →
              </span>
            </PilotLink>
            <SectionLink
              section="system"
              className="inline-flex min-h-11 items-center gap-2 px-0.5 text-[17px] font-medium text-ink decoration-[#9AA3B0] decoration-[1.5px] underline-offset-[6px] transition-[text-decoration-color] duration-200 hover:decoration-ink"
            >
              Explore the system <span aria-hidden="true">↓</span>
            </SectionLink>
          </div>
        </div>
        <figure className="m-0 min-w-0">
          <RevisionLayers className="block h-auto w-full" />
          <figcaption className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-[#DDD9CF] pt-4 font-mono text-[13px] leading-[1.5] text-muted">
            <span>FIG. 1</span>
            <span className="flex-[1_1_280px] font-sans text-[15px] leading-[1.55] text-ink">
              A fact changes in Rev C. The Rev B finding that depends on it returns to review and stays on record.
              Evidence tied to unchanged facts stays connected.
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
