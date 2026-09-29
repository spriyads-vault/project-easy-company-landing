import PilotLink from "@/components/site/PilotLink";

export default function Pilot() {
  return (
    <section id="pilot" aria-labelledby="pilot-h" className="border-t border-ink bg-lime">
      <div className="mx-auto box-content grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-[clamp(32px,6vw,96px)] gap-y-10 px-gutter py-[clamp(72px,10vw,136px)]">
        <h2
          id="pilot-h"
          className="m-0 font-display text-[clamp(38px,5.4vw,76px)] leading-none font-medium tracking-[-0.035em] text-balance"
        >
          Bring a failed test.
          <br />
          Let’s work through the next step.
        </h2>
        <div className="flex max-w-[34rem] flex-col gap-7">
          <p className="m-0 text-[19px] leading-[1.6]">
            We are working with connected-electronics teams investigating radiated-emissions failures.
          </p>
          <p className="m-0 text-[19px] leading-[1.6]">
            Book a 30-minute call to discuss your report, your current workflow and whether a Crado pilot fits.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <PilotLink className="rounded-[3px] bg-ink px-6 py-4 text-[17px] font-medium text-oat no-underline hover:bg-ink-deep hover:text-oat">
              Book a pilot call
            </PilotLink>
            <a href="mailto:hello@crado.io" className="py-3 font-mono text-[15px] text-ink">
              hello@crado.io
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
