const STATES = [
  { name: "Inspect the source", swatch: "bg-observed border-solid", text: "Check reported values against the original evidence." },
  { name: "Check the calculation", swatch: "bg-known border-solid", text: "Review supported calculations and the inputs they use." },
  { name: "Test the explanation", swatch: "bg-inferred border-solid", text: "Treat a possible cause as a question to investigate." },
  {
    name: "Keep the unknowns visible",
    swatch: "bg-missing border-dashed",
    text: "See which missing details prevent a supported conclusion.",
  },
];

export default function EvidenceStates() {
  return (
    <section id="evidence" aria-labelledby="ev-h" className="border-b border-line">
      <div className="mx-auto box-content max-w-[1280px] px-gutter py-[clamp(72px,10vw,136px)]">
        <h2
          id="ev-h"
          className="m-0 mb-[clamp(40px,6vw,72px)] max-w-[18ch] font-display text-[clamp(34px,4.6vw,62px)] leading-[1.02] font-medium tracking-[-0.03em] text-balance"
        >
          See what supports the next step.
        </h2>
        <dl className="m-0 grid grid-cols-[repeat(auto-fit,minmax(min(100%,230px),1fr))] gap-x-6 gap-y-10">
          {STATES.map((s) => (
            <div key={s.name} className="flex flex-col gap-3.5">
              <span aria-hidden="true" className={`h-10 border border-ink ${s.swatch}`} />
              <dt className="font-display text-[28px] font-medium">{s.name}</dt>
              <dd className="m-0 text-[17px] leading-[1.55]">{s.text}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-[clamp(40px,6vw,64px)] mb-0 max-w-[40ch] font-display text-[clamp(22px,2.2vw,28px)] leading-[1.3] tracking-[-0.01em] text-pretty">
          Crado supports the investigation. Engineers review the proposed next step, and physical tests establish what
          happened.
        </p>
      </div>
    </section>
  );
}
