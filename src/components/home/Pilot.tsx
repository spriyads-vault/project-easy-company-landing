import PilotLink from "@/components/site/PilotLink";

export default function Pilot() {
  return (
    <section id="pilot" aria-labelledby="pilot-h" className="bg-sage">
      <div className="mx-auto box-content grid max-w-[1280px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-end gap-x-[clamp(32px,6vw,96px)] gap-y-10 px-gutter py-[clamp(72px,10vw,136px)]">
        <h2
          id="pilot-h"
          className="m-0 font-display text-[clamp(40px,5.8vw,84px)] leading-none font-medium tracking-[-0.03em] text-balance"
        >
          Bring a real engineering question.
        </h2>
        <div className="flex max-w-[34rem] flex-col gap-7">
          <p className="m-0 text-[19px] leading-[1.6]">
            We are working with connected-electronics teams on scoped radiated-emissions investigations.
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
            <PilotLink className="inline-flex min-h-14 items-center gap-3.5 rounded-md bg-ink py-0 pr-3 pl-6 text-lg font-medium text-oat no-underline transition-[background-color,transform] duration-200 hover:bg-navy hover:text-oat active:translate-y-px">
              Discuss a pilot
              <span aria-hidden="true" className="grid size-[34px] place-items-center rounded bg-lime font-[system-ui] text-[17px] text-ink">
                →
              </span>
            </PilotLink>
            <a
              href="mailto:hello@crado.io"
              className="py-3 font-mono text-base text-ink decoration-[1.5px] underline-offset-[5px]"
            >
              hello@crado.io
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
