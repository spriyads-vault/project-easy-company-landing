import { CONTINUITY } from "@/content/home-v8";
import { CARD, Glyph, H2, LEAD, MONO, SECTION, anim } from "../ui";

/** The four evidence states (design: SECTION 3, #continuity). */
export default function Continuity() {
  return (
    <section id="continuity" aria-labelledby="continuity-title" className={SECTION}>
      <div className="mx-auto max-w-[1120px]">
        <div data-stagger="" className="grid grid-cols-1 items-start gap-[clamp(24px,3vw,48px)] v8w:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <h2 id="continuity-title" className={H2}>
            {CONTINUITY.h2}
          </h2>
          <p className={`${LEAD} max-w-[560px]`}>{CONTINUITY.body}</p>
        </div>
      </div>
      <div data-anim-root="" className="mx-auto mt-[72px] grid max-w-[1200px] grid-cols-1 gap-4 v8n:grid-cols-2 v8d:grid-cols-4">
        {CONTINUITY.states.map((s, i) => (
          <div key={s.label} className={`${CARD} flex min-h-[220px] flex-col gap-3 p-[22px]`} {...anim("fade", i * 150, 300)}>
            <div className={`flex items-center gap-2.5 ${MONO} text-[12px] tracking-[0.08em] text-v8-faint`}>
              <Glyph state={s.state} className="text-[18px] tracking-normal" />
              {s.label}
            </div>
            <div className="min-h-5 flex-1" />
            <h3 className="m-0 text-[18px] leading-6 font-medium text-v8-ink">{s.title}</h3>
            <p className="m-0 text-[14px] leading-normal text-pretty text-v8-dim">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
