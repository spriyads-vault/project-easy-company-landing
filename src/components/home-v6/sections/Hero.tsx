import { CTA, EVIDENCE_CARDS, V6_H1, V6_INTRO } from "@/content/home-v6";
import { HOW_IT_WORKS_DOCS } from "../links";
import RecordBlockCanvas from "../RecordBlockCanvas";
import { BUTTON_PRIMARY, BUTTON_SECONDARY, CONTAINER, H3, INTRO, Pill, SMALL } from "../ui";

/** Hero with the record block, then the four evidence-state cards (design: HERO). The h1 is the LCP element. */
export default function Hero() {
  return (
    <section data-screen-label="Hero" className="pt-[100px] pb-(--v6-section)">
      <div className={`${CONTAINER} flex flex-col gap-16`}>
        <div className="grid grid-cols-12 items-center gap-x-6 gap-y-10">
          <div className="col-[1/-1] flex flex-col gap-7 v6t:col-[1/7]">
            <h1 className="m-0 font-v6-serif text-[length:var(--v6-h1)] leading-(--v6-h1-lh) font-normal tracking-[-.02em] text-balance">{V6_H1}</h1>
            <p className={`${INTRO} max-w-[44ch] text-v6-muted`}>{V6_INTRO}</p>
            <div className="mt-2 flex flex-wrap gap-3">
              <a href="#book" className={BUTTON_PRIMARY}>
                {CTA.book}
              </a>
              <a href={HOW_IT_WORKS_DOCS} className={BUTTON_SECONDARY}>
                {CTA.readHow}
              </a>
            </div>
          </div>
          <RecordBlockCanvas variant="hero" className="col-[1/-1] block h-[200px] w-full v6t:col-[7/13] v6t:aspect-square v6t:h-auto v6d:aspect-[6/5]" />
        </div>
        <div className="grid grid-cols-1 gap-4 v6t:grid-cols-2 v6d:grid-cols-4">
          {EVIDENCE_CARDS.map((c) => (
            <div key={c.tag} className="flex flex-col gap-3 rounded-v6-card border border-v6-line bg-v6-card p-6 transition-colors duration-150 ease-v6-ui hover:border-v6-ink">
              <Pill tone={c.tone}>{c.tag}</Pill>
              {/* h2 keeps the heading order (h1 → h2); styled as the design's h3. */}
              <h2 className={`${H3} mt-2`}>{c.title}</h2>
              <p className={`m-0 ${SMALL} text-v6-muted`}>{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
