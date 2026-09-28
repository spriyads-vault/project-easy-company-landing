const STATES = [
  { name: "Observed", swatch: "bg-observed border-solid", text: "Recorded measurements and physical test results." },
  { name: "Known", swatch: "bg-known border-solid", text: "Confirmed product facts with supporting sources." },
  { name: "Inferred", swatch: "bg-inferred border-solid", text: "Candidate explanations requiring investigation." },
  {
    name: "Missing",
    swatch: "bg-missing border-dashed",
    text: "Information needed before a check or decision can proceed.",
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
          Show what is known. Keep uncertainty visible.
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
      </div>
    </section>
  );
}
