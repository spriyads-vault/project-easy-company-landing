import { HERO } from "@/content/home-v8";
import HeroDiagram from "../HeroDiagram";
import { Icon, PILL_GHOST, PILL_LIGHT } from "../ui";

/** Hero (design: SECTION 1): a rounded panel with the eyebrow, h1, intro, the two calls to action and the diagram. */
export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative pt-20">
      <div className="mx-6 flex flex-col overflow-hidden rounded-v8-panel bg-v8-panel">
        <div className="h-5" />
        <div className="flex flex-col items-center px-6 pt-[clamp(24px,4vh,48px)] text-center">
          <div className="rounded-full px-4 py-1.5 text-[13px] leading-5 tracking-[0.08em] text-v8-white shadow-[0_0_0_1px_var(--color-v8-ring-pill)]">{HERO.eyebrow}</div>
          <h1 id="hero-title" className="m-0 mt-6 max-w-[1080px] text-[clamp(48px,5.8vw,96px)] leading-none font-normal tracking-[-0.02em] text-balance">
            {HERO.h1}
          </h1>
          <p className="m-0 mt-5 max-w-[760px] text-[20px] leading-[29px] text-pretty text-v8-muted">{HERO.intro}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href="#start" data-wl-source="hero" className={`${PILL_LIGHT} px-[22px] py-3 text-[16px] leading-6`}>
              {HERO.join}
            </a>
            <a href="#sample-case" className={`${PILL_GHOST} px-[22px] py-3 text-[16px] leading-6`}>
              {HERO.sample}
            </a>
          </div>
        </div>
        <div className="v8-defer mt-14 px-6 pb-12">
          <HeroDiagram />
        </div>
        <div className="h-2" />
      </div>
      <div className="mx-6 mt-5 flex">
        <a href="#gap" className="flex items-center gap-1.5 text-[16px] leading-6 font-[450] text-v8-muted hover:text-v8-white">
          {HERO.scroll} <Icon name="south" size={20} />
        </a>
      </div>
    </section>
  );
}
