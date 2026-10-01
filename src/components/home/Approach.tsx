import { EnclosureChanged, EnclosureTested } from "./art";

// Below 560px the two configurations stack; above it they sit side by side and their
// status bars join into one strip.
const AREAS =
  "[grid-template-areas:'b'_'lb'_'sb'_'d'_'ld'_'sd'] min-[560px]:grid-cols-2 min-[560px]:[grid-template-areas:'b_d'_'lb_ld'_'sb_sd']";
const STATUS = "flex min-h-12 items-center gap-2.5 py-0 pr-4 pl-5 text-[15px] font-medium text-navy";

export default function Approach() {
  return (
    <section id="approach" aria-labelledby="approach-h" className="bg-sage">
      <div className="mx-auto box-content grid max-w-[1280px] grid-cols-1 items-center gap-[clamp(32px,5vw,80px)] px-gutter py-[clamp(56px,6.5vw,88px)] min-[1100px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div className="flex max-w-[30rem] flex-col gap-5">
          <h2
            id="approach-h"
            className="m-0 font-display text-[clamp(34px,3.8vw,54px)] leading-[1.04] font-medium tracking-[-0.025em] text-balance"
          >
            Hardware changes.
            <br />
            Keep the evidence connected.
          </h2>
          <p className="m-0 max-w-[26rem] text-[19px] leading-[1.55] text-pretty">
            See which earlier test results need another look when your hardware changes.
          </p>
        </div>

        <div className="flex w-full max-w-[720px] min-w-0 flex-col gap-[18px] justify-self-start min-[1100px]:justify-self-end">
          <div
            role="img"
            aria-label="Two hardware configurations. Rev B, tested. Rev D, with a changed enclosure cover. The test report stays attached to Rev B. Rev D needs review."
            className={`grid grid-cols-1 ${AREAS}`}
          >
            <div className="pr-[clamp(8px,1.6vw,20px)] [grid-area:b]">
              <EnclosureTested className="block h-auto w-full overflow-visible" />
            </div>
            <div className="pt-9 [grid-area:d] min-[560px]:pt-0 min-[560px]:pl-[clamp(8px,1.6vw,20px)]">
              <EnclosureChanged className="block h-auto w-full overflow-visible" />
            </div>
            <div className="flex flex-col items-start pt-3.5 pl-6 [grid-area:lb]">
              <span className="text-[15px] font-semibold text-navy">Rev B · Tested</span>
              <span aria-hidden="true" className="mt-2.5 block h-[22px] w-px bg-navy" />
            </div>
            <div className="flex flex-col items-start pt-3.5 pb-3.5 pl-6 [grid-area:ld] min-[560px]:pb-0">
              <span className="flex items-center gap-2 text-[15px] font-semibold text-navy">
                <span
                  aria-hidden="true"
                  className="size-2 flex-none rounded-[2px] bg-lilac-pale shadow-[inset_0_0_0_1px_#5B3F99]"
                />
                Rev D · Enclosure changed
              </span>
            </div>
            <div
              className={`${STATUS} rounded-lg border border-navy/15 bg-oat-light shadow-[0_1px_2px_rgba(31,39,50,0.05)] [grid-area:sb] min-[560px]:rounded-r-none`}
            >
              <span aria-hidden="true" className="size-[9px] flex-none rounded-full bg-navy" />
              Test report · Rev B
            </div>
            <div
              className={`${STATUS} rounded-lg border border-[rgba(91,63,153,0.35)] bg-[#F3EFF9] [grid-area:sd] min-[560px]:rounded-l-none min-[560px]:border-l-0`}
            >
              <span aria-hidden="true" className="mx-px size-2 flex-none rotate-45 bg-violet" />
              Rev D · Review needed
            </div>
          </div>
          <p className="m-0 pl-1 text-[15px] leading-[1.5] text-navy">The original result stays with the tested revision.</p>
        </div>
      </div>
    </section>
  );
}
