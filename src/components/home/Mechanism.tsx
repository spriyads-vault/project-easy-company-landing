const LAYERS = [
  {
    color: "bg-lilac",
    title: "Model-assisted interpretation",
    text: "Interpret the available material and propose explanations.",
  },
  {
    color: "bg-slate-mid",
    title: "Deterministic evaluation",
    text: "Apply versioned rules to supported inputs and check the conditions required for a valid comparison.",
  },
  {
    color: "bg-lime",
    title: "Engineering review",
    text: "Examine the evidence, challenge the interpretation and decide the physical next step.",
  },
];

export default function Mechanism() {
  return (
    <section id="mechanism" aria-labelledby="mech-h" className="bg-ink text-oat">
      <div className="mx-auto box-content max-w-[1280px] px-gutter py-[clamp(72px,10vw,136px)]">
        <h2
          id="mech-h"
          className="m-0 mb-[clamp(40px,6vw,72px)] max-w-[16ch] font-display text-[clamp(34px,4.6vw,62px)] leading-[1.02] font-medium tracking-[-0.03em]"
        >
          Intelligence with explicit boundaries.
        </h2>
        <div className="border-t border-night-line">
          {LAYERS.map((l) => (
            <div
              key={l.title}
              className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] items-baseline gap-x-12 gap-y-3 border-b border-night-line py-8"
            >
              <div className="flex items-center gap-4">
                <span aria-hidden="true" className={`size-4 flex-none ${l.color}`} />
                <h3 className="m-0 font-display text-[26px] font-medium tracking-[-0.01em]">{l.title}</h3>
              </div>
              <p className="m-0 max-w-[34rem] text-lg leading-[1.6] text-fog-light">{l.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-[clamp(40px,6vw,64px)] mb-0 max-w-[28ch] font-display text-[clamp(24px,2.6vw,34px)] leading-[1.25] tracking-[-0.01em]">
          Each layer has a defined responsibility. Missing information stays visible.
        </p>
      </div>
    </section>
  );
}
