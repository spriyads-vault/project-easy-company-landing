import { HERO, IDS, STATE_LABEL, STATE_LEGEND } from "@/content/home-v8";
import HeroDiagram from "../HeroDiagram";
import { Glyph, Icon, MONO, PILL_GHOST, PILL_LIGHT } from "../ui";

/** Hero (SECTION 1): a rounded panel with the eyebrow, h1, intro, the two calls to action, the artifact and its legend. */
export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-title" className="relative pt-[116px]">
      <div className="mx-6 flex flex-col overflow-hidden rounded-v8-panel bg-v8-panel">
        <div className="h-5" />
        <div className="flex flex-col items-center px-6 pt-[clamp(24px,4vh,48px)] text-center">
          <div className="rounded-full px-4 py-1.5 text-[13px] leading-5 tracking-[0.08em] text-v8-white shadow-[0_0_0_1px_var(--color-v8-ring-pill)]">{HERO.eyebrow}</div>
          <h1 id="hero-title" className="m-0 mt-6 max-w-[1080px] text-[clamp(48px,5.8vw,96px)] leading-none font-normal tracking-[-0.02em] text-balance">
            {HERO.h1}
          </h1>
          <p className="m-0 mt-5 max-w-[760px] text-[20px] leading-[29px] text-pretty text-v8-muted">{HERO.intro}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <a href={`#${IDS.getStarted}`} data-wl-source="hero" className={`${PILL_LIGHT} px-[22px] py-3 text-[16px] leading-6`}>
              {HERO.primary}
            </a>
            <a href={`#${IDS.sample}`} className={`${PILL_GHOST} px-[22px] py-3 text-[16px] leading-6`}>
              {HERO.secondary}
            </a>
          </div>
        </div>
        <div className="v8-defer mt-14 px-6 pb-8">
          <HeroDiagram />
        </div>
        {/* The epistemic legend: what each glyph in the artifact (and the rest of the page) means. */}
        <dl className={`m-0 mx-6 mb-8 grid grid-cols-1 gap-x-8 gap-y-3 border-t border-v8-line pt-6 ${MONO} text-[12px] leading-[18px] v8n:grid-cols-2 v8d:flex v8d:flex-wrap v8d:justify-center`}>
          {STATE_LEGEND.map((l) => (
            <div key={l.state} className="flex items-baseline gap-2">
              <dt className="flex flex-none items-baseline gap-1.5 text-v8-ink">
                <Glyph state={l.state} />
                {STATE_LABEL[l.state]}
              </dt>
              <dd className="m-0 text-v8-faint">{l.text}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="mx-6 mt-5 flex">
        <a href={`#${IDS.productGraph}`} className="flex items-center gap-1.5 text-[16px] leading-6 font-[450] text-v8-muted hover:text-v8-white">
          {HERO.scroll} <Icon name="south" size={20} />
        </a>
      </div>
    </section>
  );
}
