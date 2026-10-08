import HorizonTrack, { StopDot, type HorizonStop } from "@/components/landing/diagrams/HorizonTrack";
import Label from "@/components/ui/Label";

const STOPS: HorizonStop[] = [
  { title: "Connected electronics", question: "Does our FCC grant and CE declaration still hold?", label: "EARLY ACCESS", current: true },
  { title: "Robotics and machinery", question: "Is this a substantial modification?", label: "ROADMAP" },
  { title: "Aerospace equipment", question: "Can we qualify this change by similarity?", label: "ROADMAP" },
];

const TRACK_LABEL =
  "Diagram: three industries on a track; connected electronics is in early access, robotics and aerospace are on the roadmap";

const TAGS: { text: string; live?: boolean }[] = [
  { text: "RADIATED EMISSIONS (LIVE)", live: true },
  { text: "CONDUCTED (ROADMAP)" },
  { text: "IMMUNITY (ROADMAP)" },
  { text: "RADIO (ROADMAP)" },
  { text: "ELECTRICAL SAFETY (ROADMAP)" },
  { text: "CYBERSECURITY (ROADMAP)" },
];

const DASHED_Y = "bg-[repeating-linear-gradient(180deg,var(--color-line-7)_0_4px,transparent_4px_9px)]";

export default function UseCases() {
  return (
    <section id="use-cases" aria-labelledby="use-cases-title" className="mx-auto max-w-page px-(--space-gutter) py-(--space-section)">
      <div className="flex max-w-[640px] flex-col items-start">
        <Label>USE CASES</Label>
        <h2 id="use-cases-title" className="m-0 mt-5 text-[length:clamp(34px,3.4vw,48px)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance">
          One question, every regulated industry.
        </h2>
        <p className="m-0 mt-6 text-[17px] leading-normal tracking-[-0.005em] text-pretty text-fg-6">
          A design changed: does our evidence still hold? Electronics teams ask it as an FCC permissive change. Robotics teams ask
          it as a substantial modification. Aerospace teams ask it as qualification by similarity. We start with connected
          electronics.
        </p>
      </div>

      <div className="mt-16">
        <div className="hidden lg:block">
          <HorizonTrack stops={STOPS} ariaLabel={TRACK_LABEL} />
        </div>

        {/* Narrow (<1100px): vertical track, every question visible. */}
        <div role="group" aria-label={TRACK_LABEL} className="relative flex flex-col gap-8 pl-1 lg:hidden">
          <span aria-hidden="true" className={`absolute top-2.5 bottom-10 left-1 block w-px ${DASHED_Y}`} />
          {STOPS.map((stop) => (
            <div
              key={stop.title}
              className="relative flex cursor-default flex-col gap-2 pl-7"
            >
              <StopDot current={stop.current} className="top-1.5" />
              {/* Roadmap stops are dimmed with a muted title colour; the design's 45% opacity fails AA contrast. */}
              <span className={`text-[15px] font-medium tracking-[-0.01em] ${stop.current ? "" : "text-fg-muted"}`}>{stop.title}</span>
              <span className="text-[13px] leading-normal text-pretty text-fg-6">{stop.question}</span>
              <Label>{stop.label}</Label>
            </div>
          ))}
        </div>

        <ul className="m-0 mt-10 flex list-none flex-wrap gap-2 p-0">
          {TAGS.map((tag) => (
            <li
              key={tag.text}
              className={`rounded-xs border border-line-2 px-2 py-1 font-mono text-[10px] tracking-[0.08em] ${
                tag.live ? "text-fg-3" : "text-fg-faint"
              }`}
            >
              {tag.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
