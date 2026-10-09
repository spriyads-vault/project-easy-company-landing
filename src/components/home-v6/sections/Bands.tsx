import { COMMITMENTS, COMMITMENTS_LABEL, ESSAY_BODY, ESSAY_LEAD } from "@/content/home-v6";
import { CONTAINER, LABEL } from "../ui";

/** Forest band: the three commitments (design: COMMITMENTS). */
export function Commitments() {
  return (
    <section data-screen-label="Commitments" data-band="dark" className="bg-v6-forest py-(--v6-section) text-v6-on-dark">
      <div className={`${CONTAINER} flex flex-col items-center gap-7 text-center`}>
        <p className="m-0 max-w-[960px] font-v6-serif text-[length:var(--v6-h2)] leading-(--v6-h2-lh) tracking-[-.02em] text-balance">{COMMITMENTS}</p>
        <div className={`${LABEL} text-v6-on-dark-muted uppercase`}>{COMMITMENTS_LABEL}</div>
      </div>
    </section>
  );
}

const MONO_11 = "font-v6-mono text-[11px] font-medium";

/** The evidence gap chart and the essay with its drop cap (design: ESSAY). */
export function Essay() {
  return (
    <section data-screen-label="Essay" className="py-(--v6-section)">
      <div className={`${CONTAINER} grid grid-cols-12 items-center gap-x-6 gap-y-12`}>
        <svg
          viewBox="0 0 480 360"
          role="img"
          aria-label="Chart: the evidence gap"
          className="col-[1/-1] block h-auto w-full overflow-visible v6t:col-[1/7] v6d:col-[1/6]"
        >
          <path d="M40 320 C200 310 320 200 450 40 L450 260 C340 290 200 315 40 320 Z" className="fill-v6-lilac" />
          <path d="M40 320 C200 310 320 200 450 40" fill="none" className="stroke-v6-ink" strokeWidth="1.5" />
          <path d="M40 320 C200 315 340 290 450 260" fill="none" className="stroke-v6-muted" strokeWidth="1.5" strokeDasharray="6 4" />
          <line x1="40" y1="20" x2="40" y2="320" className="stroke-v6-ink" strokeWidth="1" />
          <line x1="40" y1="320" x2="460" y2="320" className="stroke-v6-ink" strokeWidth="1" />
          <text x="434" y="36" textAnchor="end" className={`${MONO_11} fill-v6-ink`}>
            How often the design changes
          </text>
          <text x="450" y="284" textAnchor="end" className={`${MONO_11} fill-v6-muted`}>
            How often the evidence is checked
          </text>
          <text x="398" y="226" textAnchor="middle" className={`${MONO_11} fill-v6-ink`}>
            The evidence gap
          </text>
          <text x="460" y="344" textAnchor="end" letterSpacing=".6" className="fill-v6-muted font-v6-mono text-[10px] font-medium">
            TIME
          </text>
        </svg>
        <div className="col-[1/-1] flex max-w-[64ch] flex-col gap-5 v6t:col-[7/13]">
          <p className="m-0 text-pretty">
            <span className="float-left pt-1 pr-3 font-v6-serif text-[76px] leading-[62px]">{ESSAY_LEAD[0]}</span>
            {ESSAY_LEAD.slice(1)}
          </p>
          {ESSAY_BODY.map((t) => (
            <p key={t} className="m-0 text-pretty">
              {t}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
