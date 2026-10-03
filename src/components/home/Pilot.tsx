import { ArrowIcon } from "@/components/site/icons";
import PilotLink from "@/components/site/PilotLink";

// Line drawings either side of the closing call to action: a board with stacked emissions traces, and a test turntable.
const LEFT = [
  "M40 170L140 220L240 170L140 120Z",
  "M40 170V60L140 10V120",
  "M140 10L240 60V170",
  "M40.0 152.0L50.0 138.0L60.0 142.0L70.0 128.0L80.0 132.0L90.0 118.0L100.0 122.0L110.0 108.0L120.0 112.0L130.0 98.0L140.0 102.0",
  "M140.0 102.0L150.0 98.0L160.0 112.0L170.0 108.0L180.0 122.0L190.0 118.0L200.0 132.0L210.0 128.0L220.0 142.0L230.0 138.0L240.0 152.0",
  "M40.0 128.0L50.0 114.0L60.0 118.0L70.0 104.0L80.0 108.0L90.0 94.0L100.0 98.0L110.0 84.0L120.0 88.0L130.0 74.0L140.0 78.0",
  "M140.0 78.0L150.0 74.0L160.0 88.0L170.0 84.0L180.0 98.0L190.0 94.0L200.0 108.0L210.0 104.0L220.0 118.0L230.0 114.0L240.0 128.0",
  "M40.0 104.0L50.0 90.0L60.0 94.0L70.0 80.0L80.0 84.0L90.0 70.0L100.0 74.0L110.0 60.0L120.0 64.0L130.0 50.0L140.0 54.0",
  "M140.0 54.0L150.0 50.0L160.0 64.0L170.0 60.0L180.0 74.0L190.0 70.0L200.0 84.0L210.0 80.0L220.0 94.0L230.0 90.0L240.0 104.0",
  "M40.0 80.0L50.0 66.0L60.0 70.0L70.0 56.0L80.0 60.0L90.0 46.0L100.0 50.0L110.0 36.0L120.0 40.0L130.0 26.0L140.0 30.0",
  "M140.0 30.0L150.0 26.0L160.0 40.0L170.0 36.0L180.0 50.0L190.0 46.0L200.0 60.0L210.0 56.0L220.0 70.0L230.0 66.0L240.0 80.0",
  "M150 186V146",
  "M150 186L136 204M150 186L150 208M150 186L166 202",
  "M128 146H172",
  "M134 140V152M142 138V154M150 136V156M158 138V154M166 140V152",
  "M100 188A26 13 0 1 0 152 188A26 13 0 1 0 100 188",
];

const RIGHT = [
  "M50 170A90 40 0 1 0 230 170A90 40 0 1 0 50 170",
  "M50 170V180A90 40 0 0 0 230 180V170",
  "M100 120L140 100L180 120L140 140Z",
  "M100 120V160L140 180V140",
  "M180 120V160L140 180",
  "M156 152L168 146V156L156 162Z",
  "M168 151C200 140 232 160 250 196C258 212 262 224 268 232",
  "M112 136V150",
  "M122 141V155",
];

function Drawing({ paths, side }: { paths: string[]; side: "left" | "right" }) {
  return (
    <svg
      data-draw
      aria-hidden="true"
      viewBox="0 0 280 240"
      fill="none"
      stroke="#18181B"
      strokeOpacity="0.8"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`pointer-events-none absolute top-[200px] hidden h-auto w-[min(260px,calc(18.3vw-24px))] min-[1024px]:block ${side === "left" ? "left-0" : "right-0"}`}
    >
      {paths.map((d) => (
        <path key={d} d={d} pathLength={1} />
      ))}
    </svg>
  );
}

export default function Pilot() {
  return (
    <section
      id="pilot"
      aria-labelledby="pilot-h"
      className="relative px-[clamp(16px,2.2vw,32px)] pt-[clamp(96px,11.1vw,160px)] pb-24 text-center"
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-center">
        <Drawing paths={LEFT} side="left" />
        <div data-rv="up" className="flex min-w-0 flex-1 flex-col items-center">
          <h2
            id="pilot-h"
            className="m-0 text-[40px] leading-[1.08] tracking-[-0.05em] text-fg min-[760px]:text-[clamp(40px,3.9vw,56px)] min-[1280px]:whitespace-nowrap"
          >
            Bring your next engineering decision.
          </h2>
          <p className="mx-auto mt-5 mb-0 max-w-[560px] text-lg leading-[1.6] text-pretty text-fg-subtle">
            A proposed change, an open question, or a failed test. See how Crado helps your team prepare the next step.
          </p>
          <PilotLink className="mt-8 inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-base font-medium whitespace-nowrap text-white no-underline hover:bg-ink-deep hover:text-white focus-visible:outline-slate focus-visible:outline-offset-[3px]">
            Discuss a pilot
            <ArrowIcon />
          </PilotLink>
          <p className="m-0 mt-5 text-sm leading-[1.5] text-fg-subtle">
            Prefer to write?{" "}
            <a href="mailto:hello@crado.io" className="text-fg-subtle underline-offset-[3px] hover:text-fg">
              hello@crado.io
            </a>
          </p>
        </div>
        <Drawing paths={RIGHT} side="right" />
      </div>
    </section>
  );
}
