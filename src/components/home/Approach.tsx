export default function Approach() {
  return (
    <section
      id="approach"
      aria-labelledby="approach-h"
      data-rv="up"
      className="px-[clamp(16px,2.2vw,32px)] pt-[clamp(96px,11.1vw,160px)] text-center"
    >
      <p className="m-0 text-sm leading-[1.5] tracking-[-0.01em] text-fg-muted">Approach</p>
      <h2
        id="approach-h"
        className="m-0 mt-5 text-[clamp(34px,3.9vw,56px)] leading-[1.08] tracking-[-0.05em] text-balance"
      >
        Move faster.
        <br />
        <span className="text-fg-muted">Know what needs checking.</span>
      </h2>
      <p className="mx-auto mt-5 mb-0 max-w-[36rem] text-lg leading-[1.65] tracking-[-0.015em] text-pretty text-fg-muted">
        Crado helps teams evaluate engineering changes before the next test, investigate failures when they happen,
        and maintain the evidence as the hardware evolves.
      </p>
    </section>
  );
}
