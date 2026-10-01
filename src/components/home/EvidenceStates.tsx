const STATES = [
  { name: "Observed", rule: "bg-slate", mark: "size-2.5 rounded-[2px] bg-slate", text: "An emissions test recorded a result above the limit.", status: "MEASURED" },
  { name: "Known", rule: "bg-[#6FA84A]", mark: "size-[11px] rounded-full bg-[#6FA84A]", text: "The board’s clock frequency is documented.", status: "SOURCE-BACKED" },
  { name: "Inferred", rule: "bg-[#8A6CC7]", mark: "size-[9px] rotate-45 bg-[#8A6CC7]", text: "The clock could explain the emission.", status: "UNCONFIRMED" },
  {
    name: "Missing",
    rule: "bg-[#D9B74A]",
    mark: "box-border size-2.5 rounded-[2px] border-[1.5px] border-[#B8932A]",
    text: "A follow-up test is needed to investigate the cause.",
    status: "NOT YET TESTED",
  },
];

export default function EvidenceStates() {
  return (
    <section id="evidence" aria-labelledby="ev-h" className="border-b border-ink/15">
      <div className="mx-auto box-content grid max-w-[1280px] grid-cols-1 items-start gap-[clamp(32px,5vw,96px)] px-gutter py-[clamp(64px,8vw,112px)] min-[1000px]:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
        <div className="flex max-w-[26rem] flex-col gap-5">
          <h2
            id="ev-h"
            className="m-0 font-display text-[clamp(34px,3.6vw,50px)] leading-[1.06] font-medium tracking-[-0.025em] text-balance"
          >
            Show what is known. Keep uncertainty visible.
          </h2>
          <p className="m-0 text-[19px] leading-[1.55] text-pretty">
            See the facts, possible explanations and open questions separately.
          </p>
        </div>
        <ul className="m-0 min-w-0 list-none border-t border-ink/15 p-0">
          {STATES.map((s) => (
            <li
              key={s.name}
              className="relative grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-[clamp(16px,2.4vw,32px)] gap-y-1.5 border-b border-ink/15 py-[22px] pl-[18px] [grid-template-areas:'cat_st'_'ex_ex'] min-[720px]:grid-cols-[172px_minmax(0,1fr)_120px] min-[720px]:[grid-template-areas:'cat_ex_st']"
            >
              <span aria-hidden="true" className={`absolute top-[22px] bottom-[22px] left-0 w-0.5 rounded-[1px] opacity-85 ${s.rule}`} />
              <span className="flex items-center gap-3 [grid-area:cat]">
                <span aria-hidden="true" className="grid size-3.5 flex-none translate-y-px place-items-center">
                  <span className={s.mark} />
                </span>
                <span className="font-display text-2xl leading-[1.2] font-medium tracking-[-0.01em] text-navy">{s.name}</span>
              </span>
              <span className="text-[17px] leading-[1.5] text-pretty [grid-area:ex]">{s.text}</span>
              <span className="justify-self-end font-mono text-xs leading-[1.5] tracking-[0.06em] whitespace-nowrap text-muted-2 [grid-area:st]">
                {s.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
