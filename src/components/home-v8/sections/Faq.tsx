import { FAQ_H2, FAQ_V8, IDS } from "@/content/home-v8";
import { H2, MONO, SECTION } from "../ui";

/**
 * The institutional FAQ (SECTION 6, #faq): six questions in two columns, each with its mono category tag, the
 * question on the left and the answer on the right. Always open, so the page says exactly what the FAQPage JSON-LD
 * (generated from the same FAQ_V8 list) says.
 */
export default function Faq() {
  return (
    <section id={IDS.faq} aria-labelledby="faq-title" className={SECTION}>
      <div className="mx-auto max-w-[1120px]">
        <h2 id="faq-title" data-reveal="" className={`${H2} max-w-[680px]`}>
          {FAQ_H2}
        </h2>
        <dl className="m-0 mt-14 shadow-[0_-1px_0_var(--color-v8-ring)]">
          {FAQ_V8.map((f) => (
            <div key={f.q} className="grid grid-cols-1 gap-x-12 gap-y-3 py-8 shadow-[0_1px_0_var(--color-v8-ring)] v8w:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
              <dt className="flex flex-col gap-3">
                <span className={`self-start rounded-v8-chip border border-v8-line px-2 py-[3px] ${MONO} text-[11px] tracking-[0.08em] text-v8-dim`}>{f.tag}</span>
                <h3 className="m-0 text-[20px] leading-[28px] font-medium text-balance">{f.q}</h3>
              </dt>
              <dd className="m-0 text-[17px] leading-[28px] text-pretty text-v8-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
