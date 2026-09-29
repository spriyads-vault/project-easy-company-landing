"use client";

import { useAutoAdvance } from "@/hooks/useAutoAdvance";
import PlayToggle from "./PlayToggle";

const REVS = [
  {
    id: "A",
    sub: "Prototype",
    chip: null,
    title: "REV A · PROTOTYPE",
    status: "No recorded evidence",
    statusBg: "#F4F2EC",
    text: "No test report is attached to Rev A. Its design history stays available as context for later revisions.",
  },
  {
    id: "B",
    sub: "Tested",
    chip: ["TEST REPORT", "#F4F2EC"],
    title: "REV B · TESTED",
    status: "Evidence recorded",
    statusBg: "#CDDDF2",
    text: "The test report is connected to Rev B. Its result describes Rev B under the recorded conditions.",
  },
  {
    id: "C",
    sub: "Layout change",
    chip: ["CHANGE", "#BFA3E6"],
    title: "REV C · LAYOUT CHANGE",
    status: "Review what changed",
    statusBg: "#BFA3E6",
    text: "Evidence that depends on the changed layout needs review against Rev C. Evidence tied to unchanged facts may still apply.",
  },
  {
    id: "D",
    sub: "Enclosure change",
    chip: ["CHANGE", "#BFA3E6"],
    title: "REV D · ENCLOSURE CHANGE",
    status: "Review what changed",
    statusBg: "#BFA3E6",
    text: "Whether the Rev B evidence still supports Rev D depends on which recorded conditions the enclosure change affects.",
  },
] as const;

const MONO = "font-mono";
const SANS = "font-sans";

/** The three faces of one isometric block; `x`/`y` is the top vertex of its upper face. */
function Block({ x, y, on }: { x: number; y: number; on: boolean }) {
  const sw = on ? 2.5 : 1.25;
  return (
    <>
      <polygon
        points={`${x},${y} ${x + 80},${y + 40} ${x},${y + 80} ${x - 80},${y + 40}`}
        fill={on ? "#CDDDF2" : "#8FA3C6"}
        stroke="#2A3441"
        strokeWidth={sw}
      />
      <polygon
        points={`${x - 80},${y + 40} ${x},${y + 80} ${x},${y + 136} ${x - 80},${y + 96}`}
        fill="#6D85AD"
        stroke="#2A3441"
        strokeWidth={sw}
      />
      <polygon
        points={`${x},${y + 80} ${x + 80},${y + 40} ${x + 80},${y + 96} ${x},${y + 136}`}
        fill="#56698C"
        stroke="#2A3441"
        strokeWidth={sw}
      />
    </>
  );
}

function RevisionStair({ rev, pick }: { rev: string; pick: (id: string) => void }) {
  const lift = (id: string) => ({ transform: `translateY(${id === rev ? -10 : 0}px)` });
  const LIFT = "transition-transform duration-300 ease-in-out";
  return (
    <svg viewBox="0 0 820 560" aria-hidden="true" className="block h-auto w-full">
      <line x1="120" y1="530" x2="780" y2="200" stroke="#2A3441" strokeWidth="1" strokeDasharray="2 5" />

      <g className={`cursor-pointer ${LIFT}`} style={lift("D")} onClick={() => pick("D")}>
        <Block x={690} y={90} on={rev === "D"} />
        <polygon points="690,62 770,102 690,142 610,102" fill="#D9C8F0" stroke="#2A3441" strokeWidth="1.25" />
        <polygon points="610,102 690,142 690,156 610,116" fill="#BFA3E6" stroke="#2A3441" strokeWidth="1.25" />
        <polygon points="690,142 770,102 770,116 690,156" fill="#A68ACF" stroke="#2A3441" strokeWidth="1.25" />
        <line x1="690" y1="62" x2="690" y2="52" stroke="#2A3441" strokeWidth="1" />
        <rect x="606" y="26" width="170" height="26" fill="#BFA3E6" stroke="#2A3441" />
        <text x="618" y="44" className={`${MONO} text-[13px]`} fill="#2A3441">
          ENCLOSURE CHANGED
        </text>
        <text x="708" y="246" className={`${MONO} text-[15px] font-medium`} fill="#2A3441">
          REV D
        </text>
        <text x="708" y="266" className={`${SANS} text-[14px]`} fill="#2A3441">
          Enclosure change
        </text>
      </g>

      <g className={`cursor-pointer ${LIFT}`} style={lift("C")} onClick={() => pick("C")}>
        <Block x={510} y={180} on={rev === "C"} />
        <polygon points="510,198 554,220 510,242 466,220" fill="#BFA3E6" stroke="#2A3441" strokeWidth="1.25" />
        <polyline points="482,220 500,229 520,219 538,228" fill="none" stroke="#2A3441" strokeWidth="1.25" />
        <line x1="510" y1="198" x2="510" y2="140" stroke="#2A3441" strokeWidth="1" />
        <rect x="440" y="114" width="150" height="26" fill="#BFA3E6" stroke="#2A3441" />
        <text x="452" y="132" className={`${MONO} text-[13px]`} fill="#2A3441">
          LAYOUT CHANGED
        </text>
        <text x="528" y="336" className={`${MONO} text-[15px] font-medium`} fill="#2A3441">
          REV C
        </text>
        <text x="528" y="356" className={`${SANS} text-[14px]`} fill="#2A3441">
          Layout change
        </text>
      </g>

      <g className={`cursor-pointer ${LIFT}`} style={lift("B")} onClick={() => pick("B")}>
        <Block x={330} y={270} on={rev === "B"} />
        <circle cx="330" cy="304" r="6" fill="#2A3441" stroke="#F4F2EC" strokeWidth="2" />
        <text x="348" y="426" className={`${MONO} text-[15px] font-medium`} fill="#2A3441">
          REV B
        </text>
        <text x="348" y="446" className={`${SANS} text-[14px]`} fill="#2A3441">
          Tested
        </text>
      </g>

      <g className={`cursor-pointer ${LIFT}`} style={lift("A")} onClick={() => pick("A")}>
        <Block x={150} y={360} on={rev === "A"} />
        <text x="168" y="516" className={`${MONO} text-[15px] font-medium`} fill="#2A3441">
          REV A
        </text>
        <text x="168" y="536" className={`${SANS} text-[14px]`} fill="#2A3441">
          Prototype
        </text>
      </g>

      <g className="cursor-pointer" onClick={() => pick("B")}>
        <line x1="265" y1="222" x2="328" y2="298" stroke="#2A3441" strokeWidth="1.5" strokeDasharray="5 4" />
        <polygon points="196,60 310,60 326,76 326,222 196,222" fill="#F4F2EC" stroke="#2A3441" strokeWidth="1.25" />
        <polygon points="310,60 310,76 326,76" fill="#D6D3CA" stroke="#2A3441" strokeWidth="1.25" />
        <text x="208" y="84" className={`${MONO} text-[12px] font-medium`} fill="#2A3441">
          TEST REPORT
        </text>
        <text x="208" y="100" className={`${MONO} text-[11px]`} fill="#4A5463">
          REV B · p. 4
        </text>
        <rect x="208" y="114" width="100" height="4" fill="#9AA3B0" />
        <rect x="208" y="126" width="80" height="4" fill="#9AA3B0" />
        <rect x="208" y="138" width="92" height="4" fill="#9AA3B0" />
        <rect x="202" y="152" width="118" height="20" fill="#F6E39E" stroke="#2A3441" />
        <text x="210" y="166" className={`${MONO} text-[11px]`} fill="#2A3441">
          216.8 MHz
        </text>
        <rect x="208" y="184" width="90" height="4" fill="#9AA3B0" />
        <rect x="208" y="196" width="70" height="4" fill="#9AA3B0" />
        <text x="196" y="246" className={`${MONO} text-[11px]`} fill="#2A3441">
          RECORDED RESULT
        </text>
      </g>
    </svg>
  );
}

export default function Approach() {
  const { index, select, playing, toggle, sectionRef, holdProps } = useAutoAdvance<HTMLElement>(REVS.length);
  const cur = REVS[index];
  const pick = (id: string) => select(REVS.findIndex((r) => r.id === id));

  return (
    <section
      ref={sectionRef}
      id="approach"
      aria-labelledby="approach-h"
      className="border-y border-ink bg-lime"
    >
      <div className="mx-auto box-content grid max-w-[1280px] grid-cols-1 items-center gap-[clamp(40px,5vw,72px)] px-gutter py-[clamp(72px,10vw,128px)] min-[1100px]:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="flex flex-col gap-6">
          <h2
            id="approach-h"
            className="m-0 font-display text-[clamp(34px,4vw,54px)] leading-[1.04] font-medium tracking-[-0.03em]"
          >
            The hardware changed.
            <br />
            What still holds?
          </h2>
          <p className="m-0 max-w-[30rem] text-[19px] leading-[1.6] text-pretty">
            A board revision, firmware update or different test setup can change how a result should be interpreted.
          </p>
          <p className="m-0 max-w-[30rem] text-[19px] leading-[1.6] text-pretty">
            Keep the finding, the tested configuration and the engineering decision connected, so the next
            investigation starts with the right context.
          </p>
        </div>

        <div {...holdProps} className="flex min-w-0 flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
            <PlayToggle
              playing={playing}
              onToggle={toggle}
              label="revision sequence"
              className="min-h-11 border-[1.5px] border-ink text-ink"
            />
            <div role="group" aria-label="Select revision" className="hidden border-[1.5px] border-ink bg-oat min-[1100px]:flex">
              {REVS.map((r, i) => {
                const on = i === index;
                return (
                  <button
                    key={r.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => select(i)}
                    className={`min-h-11 min-w-16 cursor-pointer border-0 px-3.5 font-mono text-sm transition-colors duration-150 ${
                      i < REVS.length - 1 ? "border-r-[1.5px] border-r-ink" : ""
                    } ${on ? "bg-ink text-oat" : "bg-transparent text-ink"}`}
                  >
                    Rev {r.id}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden min-[1100px]:block">
            <RevisionStair rev={cur.id} pick={pick} />
          </div>

          <div role="group" aria-label="Select revision" className="flex flex-col-reverse gap-3.5 min-[1100px]:hidden">
            {REVS.map((r, i) => {
              const on = i === index;
              return (
                <button
                  key={r.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => select(i)}
                  className={`flex min-h-16 cursor-pointer items-center gap-4 border-[1.5px] border-ink px-3.5 py-3 text-left font-sans text-ink transition-shadow duration-150 ${
                    on ? "bg-oat shadow-[6px_6px_0_#2A3441]" : "bg-lime-soft shadow-[0_0_0_#2A3441]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="h-[30px] w-11 flex-none border border-ink bg-slate shadow-[5px_5px_0_#56698C]"
                  />
                  <span className="flex flex-1 flex-col gap-0.5">
                    <span className="font-mono text-sm font-medium">Rev {r.id}</span>
                    <span className="text-[15px]">{r.sub}</span>
                  </span>
                  {r.chip && (
                    <span
                      className="border border-ink px-2 py-1 font-mono text-[11px]"
                      style={{ background: r.chip[1] }}
                    >
                      {r.chip[0]}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Every caption shares one grid cell so the box keeps the tallest height and never shifts the page. */}
          <div aria-live={playing ? "off" : "polite"} className="grid border-[1.5px] border-ink bg-oat">
            {REVS.map((r, i) => (
              <div
                key={r.id}
                aria-hidden={i !== index}
                className={`grid min-h-[118px] grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-x-7 gap-y-3 px-5 py-[18px] [grid-area:1/1] ${
                  i === index ? "visible" : "invisible"
                }`}
              >
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[13px] tracking-[0.04em]">{r.title}</span>
                  <span
                    className="self-start border border-ink px-2 py-[3px] text-[13px]"
                    style={{ background: r.statusBg }}
                  >
                    {r.status}
                  </span>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="m-0 text-base leading-[1.55]">{r.text}</p>
                  <p className="m-0 font-mono text-xs text-muted-2">Rev B test report: result stays on record.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
