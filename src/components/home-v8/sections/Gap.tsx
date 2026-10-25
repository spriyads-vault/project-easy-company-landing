import { GAP, IDS, SAMPLE } from "@/content/home-v8";
import SampleCase from "../SampleCase";
import { Glyph, H2, LEAD, MONO, SECTION } from "../ui";

/** The product graph (SECTION 2): the structural gap, then the sample case workbench. */
export default function Gap() {
  const [a, b, c, d] = GAP.after.parts;
  return (
    <section id={IDS.productGraph} aria-labelledby="gap-title" className={SECTION}>
      <div className="mx-auto max-w-[1120px]">
        <h2 id="gap-title" data-reveal="" className={`${H2} mx-auto max-w-[960px] text-center leading-[1.08]`}>
          {GAP.h2} <span className="text-v8-muted">{GAP.h2Muted}</span>
        </h2>
        <div data-stagger="" className="mx-auto mt-14 grid max-w-[1000px] grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-[clamp(24px,4vw,64px)]">
          <div>
            <div className="text-[15px] leading-[21px] text-v8-grey">{GAP.before.label}</div>
            <p className={`${LEAD} mt-3`}>{GAP.before.body}</p>
          </div>
          <div>
            <div className="text-[15px] leading-[21px] text-v8-white">{GAP.after.label}</div>
            <p className={`${LEAD} mt-3`}>
              {a}
              <Glyph state="known" /> KNOWN{b}
              <Glyph state="observed" /> OBSERVED{c}
              <Glyph state="inferred" /> INFERRED{d}
            </p>
          </div>
        </div>
      </div>
      <SampleCase />
      <p className={`m-0 mt-4 text-center ${MONO} text-[13px] leading-[21px] text-v8-muted`}>{SAMPLE.label}</p>
    </section>
  );
}
