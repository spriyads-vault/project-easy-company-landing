import { IDS, METHOD } from "@/content/home-v8";
import { ACCENT, CARD, CARD_ELEVATED, LEAD, MONO, SECTION, anim } from "../ui";

/** Deterministic code, policied notes, engineer authority (SECTION 5, #engine), on a rounded panel. */
export default function Method() {
  return (
    <section id={IDS.engine} aria-labelledby="method-title" className={SECTION}>
      <div className="mx-auto flex max-w-[1168px] flex-col gap-14 rounded-v8-panel bg-v8-panel px-[clamp(24px,5vw,64px)] py-[clamp(36px,5vw,64px)]">
        <div data-reveal="" className="max-w-[820px]">
          <h2 id="method-title" className="m-0 text-[clamp(30px,3.3vw,48px)] leading-[1.15] font-normal tracking-[-0.01em] text-balance">
            {METHOD.h2}
          </h2>
          <p className={`${LEAD} mt-5 max-w-[680px]`}>{METHOD.body}</p>
        </div>
        <div data-anim-root="" className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4">
          {METHOD.cards.map((c, i) => (
            // Engineer Authority, the last card, carries the terracotta accent on an elevated surface.
            <div key={c.tag} className={`${i === METHOD.cards.length - 1 ? `${CARD_ELEVATED} ${ACCENT}` : CARD} flex flex-col gap-3.5 p-[22px]`} {...anim("fade", i * 200, 300)}>
              <span className={`self-start rounded-v8-chip border px-2 py-[3px] ${MONO} text-[11px] tracking-[0.08em] ${i === METHOD.cards.length - 1 ? "border-v8-rust text-v8-rust-text" : "border-v8-line text-v8-dim"}`}>
                {c.tag}
              </span>
              <h3 className="m-0 mt-1 text-[20px] leading-[26px] font-medium text-v8-ink">{c.title}</h3>
              <p className="m-0 text-[15px] leading-[1.55] text-pretty text-v8-dim">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
