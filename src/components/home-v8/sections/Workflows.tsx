import { WORKFLOW } from "@/content/home-v8";
import { CARD, H2, LEAD, MONO, SECTION, anim } from "../ui";

/** The four-stage workflow (design: SECTION 4, #workflows). Stage 01 is the highlighted one. */
export default function Workflows() {
  return (
    <section id="workflows" aria-labelledby="workflows-title" className={SECTION}>
      <div data-reveal="" className="mx-auto max-w-[1120px]">
        <h2 id="workflows-title" className={`${H2} max-w-[720px]`}>
          {WORKFLOW.h2}
        </h2>
        <p className={`${LEAD} mt-4 max-w-[600px] text-balance`}>{WORKFLOW.body}</p>
      </div>
      <ol data-anim-root="" className="mx-auto mt-14 grid max-w-[1200px] list-none grid-cols-1 gap-6 p-0 v8n:grid-cols-2 v8d:grid-cols-4">
        {WORKFLOW.steps.map((s, i) => {
          const active = i === 0;
          return (
            <li
              key={s.n}
              className={`${CARD} relative flex min-h-[230px] flex-col gap-3 p-[22px] ${active ? "border-v8-rust" : ""}`}
              {...anim("fade", i * 250, 300)}
            >
              <div className={`flex items-center justify-between ${MONO} text-[12px] ${active ? "text-v8-rust-text" : "text-v8-faint"}`}>
                <span>{s.n}</span>
                {active && <span className="rounded-v8-chip border border-v8-rust px-[7px] py-0.5 text-[10.5px] tracking-[0.08em]">{WORKFLOW.active}</span>}
              </div>
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
