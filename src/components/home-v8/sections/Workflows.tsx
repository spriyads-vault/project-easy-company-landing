import { IDS, WORKFLOW } from "@/content/home-v8";
import { ACCENT, CARD, CARD_ELEVATED, H2, LEAD, MONO, SECTION, anim } from "../ui";

/** The four-stage revision loop (SECTION 4, #workflow). Stage 04, the signed result, is the highlighted one. */
export default function Workflows() {
  return (
    <section id={IDS.workflow} aria-labelledby="workflows-title" className={SECTION}>
      <div data-reveal="" className="mx-auto max-w-[1120px]">
        <h2 id="workflows-title" className={`${H2} max-w-[720px]`}>
          {WORKFLOW.h2}
        </h2>
        <p className={`${LEAD} mt-4 max-w-[600px] text-balance`}>{WORKFLOW.body}</p>
      </div>
      <ol data-anim-root="" className="mx-auto mt-14 grid max-w-[1200px] list-none grid-cols-1 gap-6 p-0 v8n:grid-cols-2 v8d:grid-cols-4">
        {WORKFLOW.steps.map((s, i) => {
          // The last stage (the signed result) is the highlighted one: elevated surface with the terracotta accent.
          const last = i === WORKFLOW.steps.length - 1;
          return (
            <li key={s.n} className={`${last ? `${CARD_ELEVATED} ${ACCENT}` : CARD} relative flex min-h-[230px] flex-col gap-3 p-[22px]`} {...anim("fade", i * 250, 300)}>
              <div className={`${MONO} text-[12px] ${last ? "text-v8-rust-text" : "text-v8-faint"}`}>{s.n}</div>
              <div className="min-h-3 flex-1" />
              <h3 className="m-0 text-[18px] leading-6 font-medium text-balance text-v8-ink">{s.title}</h3>
              <p className="m-0 text-[14px] leading-normal text-pretty text-v8-dim">{s.body}</p>
              {i < WORKFLOW.steps.length - 1 && (
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" className="absolute top-[26px] right-[-18px] hidden v8d:block">
                  <path d="M3 1.5 L8 6 L3 10.5" fill="none" stroke="var(--color-v8-arrow)" strokeWidth="1.2" />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
}
