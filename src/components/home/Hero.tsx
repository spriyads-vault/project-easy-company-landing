import PilotLink from "@/components/site/PilotLink";
import SectionLink from "@/components/site/SectionLink";

const LABEL = "font-mono text-[16px]";

function RevisionLayers() {
  return (
    <svg viewBox="0 0 700 530" role="img" aria-labelledby="fig1-t fig1-d" className="block h-auto w-full">
      <title id="fig1-t">Revisions drawn as stacked layers</title>
      <desc id="fig1-d">
        Three layers labelled Rev A, Rev B and Rev C. A finding and a requirement sit on Rev B. A changed fact on Rev
        C connects down to the Rev B finding through a review marker. Other evidence on Rev B stays connected to its
        requirement.
      </desc>
      <g stroke="#2A3441" strokeWidth="1.25" strokeLinejoin="round">
        <polygon points="300,280 520,390 300,500 80,390" fill="#6D85AD" />
        <polygon points="80,390 300,500 300,514 80,404" fill="#56698C" />
        <polygon points="300,500 520,390 520,404 300,514" fill="#475A7C" />
        <polygon points="300,160 520,270 300,380 80,270" fill="#D5DEEC" />
        <polygon points="80,270 300,380 300,394 80,284" fill="#B6C3D9" />
        <polygon points="300,380 520,270 520,284 300,394" fill="#A3B2CC" />
      </g>
      <g stroke="#2A3441" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="3 4">
        <line x1="190" y1="215" x2="410" y2="325" />
        <line x1="410" y1="215" x2="190" y2="325" />
      </g>
      <g stroke="#2A3441" strokeWidth="1.25" fill="none">
        <line x1="212" y1="259" x2="304" y2="297" />
        <line x1="212" y1="259" x2="256" y2="340" />
      </g>
      <polygon points="212,250 221,259 212,268 203,259" fill="#F2E3A0" stroke="#2A3441" strokeWidth="1.25" />
      <circle cx="311" cy="297" r="8" fill="#2A3441" stroke="#FAF9F5" strokeWidth="2" />
      <circle cx="256" cy="347" r="7" fill="#FAF9F5" stroke="#2A3441" strokeWidth="1.25" />
      <text x="104" y="394" className={LABEL} fill="#F4F2EC">
        REV A
      </text>
      <text x="104" y="274" className={LABEL} fill="#2A3441">
        REV B
      </text>
      <g stroke="#2A3441" strokeWidth="1.25" strokeLinejoin="round">
        <polygon points="300,40 520,150 300,260 80,150" fill="#FAF9F5" />
        <polygon points="80,150 300,260 300,274 80,164" fill="#E3E0D6" />
        <polygon points="300,260 520,150 520,164 300,274" fill="#D3D0C5" />
      </g>
      <g stroke="#2A3441" strokeOpacity="0.3" strokeWidth="1" strokeDasharray="3 4">
        <line x1="190" y1="95" x2="410" y2="205" />
        <line x1="410" y1="95" x2="190" y2="205" />
      </g>
      <text x="104" y="154" className={LABEL} fill="#2A3441">
        REV C
      </text>
      <line x1="311" y1="190" x2="311" y2="288" stroke="#6E4FB0" strokeWidth="2" strokeDasharray="6 4" />
      <polygon points="311,165 323,171 311,177 299,171" fill="#C9F0A8" stroke="#2A3441" strokeWidth="1.25" />
      <polygon points="299,171 311,177 311,189 299,183" fill="#8FC46A" stroke="#2A3441" strokeWidth="1.25" />
      <polygon points="311,177 323,171 323,183 311,189" fill="#A7D984" stroke="#2A3441" strokeWidth="1.25" />
      <polygon points="311,229 322,240 311,251 300,240" fill="#BFA3E6" stroke="#2A3441" strokeWidth="1.25" />
      <g stroke="#2A3441" strokeWidth="1" strokeDasharray="1 3">
        <line x1="326" y1="177" x2="548" y2="177" />
        <line x1="325" y1="240" x2="548" y2="240" />
        <line x1="321" y1="297" x2="548" y2="297" />
        <line x1="265" y1="347" x2="548" y2="347" />
      </g>
      <g className="font-mono text-[14.5px]" fill="#2A3441">
        <rect x="548" y="163" width="148" height="28" fill="#B6E88E" stroke="#2A3441" />
        <text x="558" y="182">CHANGED · REV C</text>
        <rect x="548" y="226" width="148" height="28" fill="#E6DCF5" stroke="#2A3441" />
        <text x="558" y="245">REVIEW MARKER</text>
        <rect x="548" y="283" width="148" height="28" fill="#D5DEEC" stroke="#2A3441" />
        <text x="558" y="302">FINDING · REV B</text>
        <rect x="548" y="333" width="148" height="28" fill="#FAF9F5" stroke="#2A3441" />
        <text x="558" y="352">STILL CONNECTED</text>
      </g>
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-h"
      className="mx-auto box-content max-w-[1440px] px-gutter pt-10 pb-16 min-[900px]:pt-[clamp(28px,5vh,64px)] min-[900px]:pb-[clamp(48px,8vh,96px)]"
    >
      <div className="grid grid-cols-1 items-center gap-[clamp(32px,3.6vw,56px)] min-[900px]:grid-cols-[minmax(0,52fr)_minmax(0,48fr)]">
        <div className="flex min-w-0 flex-col gap-[clamp(20px,3vh,28px)]">
          <h1
            id="hero-h"
            className="m-0 mb-[clamp(4px,1vh,12px)] font-display text-[clamp(34px,9.6vw,60px)] leading-[0.98] font-medium tracking-[-0.04em] min-[900px]:text-[clamp(44px,min(4.7vw,9.2vh),84px)]"
          >
            Compliance,
            <br />
            inside the
            <br />
            engineering loop.
          </h1>
          <p className="m-0 max-w-[34rem] text-[clamp(17px,1.35vw,20px)] leading-[1.6] text-pretty">
            Crado connects hardware revisions, test evidence and engineering decisions. Investigate radiated-emissions
            failures, prepare retest plans and keep the supporting evidence with the revision it belongs to.
          </p>
          <p className="m-0 flex items-center gap-3 font-mono text-sm tracking-[0.02em]">
            <span aria-hidden="true" className="size-3 flex-none border border-ink bg-lime" />
            <span>Starting with radiated emissions for connected electronics.</span>
          </p>
          <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
            <PilotLink className="rounded-[3px] bg-ink px-6 py-3.5 text-[17px] font-medium text-oat no-underline hover:bg-ink-deep hover:text-oat">
              Book a pilot call
            </PilotLink>
            <SectionLink
              section="system"
              className="flex items-center gap-2.5 py-2 text-[17px] font-medium text-ink underline-offset-[6px]"
            >
              Explore the system <span aria-hidden="true">↓</span>
            </SectionLink>
          </div>
        </div>
        <figure className="m-0 min-w-0">
          <RevisionLayers />
          <figcaption className="mt-[18px] flex flex-wrap gap-x-5 gap-y-2 font-mono text-[13px] leading-[1.5] text-muted">
            <span>FIG. 1</span>
            <span className="flex-[1_1_280px] font-sans text-[15px] text-ink">
              A fact changes in Rev C. The Rev B finding that depends on it returns to review and stays on record.
              Evidence tied to unchanged facts stays connected.
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
