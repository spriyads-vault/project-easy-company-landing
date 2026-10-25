import { CHART, SAMPLE } from "@/content/home-v8";
import { Chip, Glyph, MONO, anim } from "./ui";

const SHIMMER = "linear-gradient(90deg,rgba(255,255,255,0) 0%,rgba(255,255,255,0.07) 50%,rgba(255,255,255,0) 100%)";

/** An assumption chip that loads behind a skeleton shimmer (design: the "Assumptions" strip). */
function Assumption({ state, text, i }: { state: (typeof SAMPLE.assumptions)[number]["state"]; text: string; i: number }) {
  const t = i * 160;
  return (
    <span
      className={`relative flex min-w-0 items-center gap-2 rounded-v8-chip border border-v8-line bg-v8-chip px-[9px] py-[5px] whitespace-nowrap ${MONO} text-[12px] leading-[18px] text-v8-ink`}
      {...anim("fade", t, 200)}
    >
      <Glyph state={state} />
      <span>{text}</span>
      <span aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-v8-chip bg-v8-chip" {...anim("skel", t + 420, 220)}>
        <span className="absolute inset-0" {...anim("shimmer", t, 900, { backgroundImage: SHIMMER, backgroundSize: "200% 100%" })} />
      </span>
    </span>
  );
}

function Chart() {
  const h = CHART.hot;
  return (
    <svg viewBox="0 0 680 244" role="img" aria-label={SAMPLE.chartLabel} className={`block h-auto w-full ${MONO}`}>
      <g {...anim("fade", 300, 400)}>
        {CHART.grid.map((g) => (
          <line key={g.label} x1={CHART.x0} y1={g.y} x2={CHART.x1} y2={g.y} stroke="var(--color-v8-line-faint)" />
        ))}
        {CHART.grid.map((g) => (
          <text key={g.label} x="40" y={g.y + 3.5} textAnchor="end" fontSize="10" className="fill-v8-axis">
            {g.label}
          </text>
        ))}
        {CHART.xLabels.map((l) => (
          <text key={l.label} x={l.x} y="232" textAnchor={l.anchor} fontSize="10" className="fill-v8-axis">
            {l.label}
          </text>
        ))}
      </g>
      <g {...anim("fade", 550, 400)}>
        {CHART.comb.map((c) => (
          <line key={c.x} x1={c.x} y1={CHART.y0} x2={c.x} y2={CHART.y1} stroke={c.strong ? "var(--color-v8-dash)" : "var(--color-v8-line-faint)"} />
        ))}
        {CHART.comb
          .filter((c) => c.label)
          .map((c) => (
            <text key={c.label} x={c.x} y="16" textAnchor="middle" fontSize="10" className="fill-v8-faint">
              {c.label}
            </text>
          ))}
      </g>
      <line x1={CHART.x0} y1={CHART.y1} x2={CHART.x1} y2={CHART.y1} stroke="var(--color-v8-dash)" pathLength={1} {...anim("trace", 300, 400)} />
      <path d={CHART.limit} fill="none" stroke="var(--color-v8-known)" strokeWidth="1.25" pathLength={1} {...anim("trace", 750, 500)} />
      <g {...anim("fade", 1150, 300)}>
        {CHART.limitLabels.map((l) => (
          <text key={l.label} x={l.x} y={l.y} fontSize="9.5" className="fill-v8-known">
            {l.label}
          </text>
        ))}
      </g>
      {CHART.peaks.map((p) => (
        <g key={p.x} {...anim("rise", p.t, 400)}>
          <line x1={p.x} y1={CHART.y1} x2={p.x} y2={p.y} stroke={p.hot ? "var(--color-v8-rust)" : "var(--color-v8-ink)"} strokeOpacity="0.6" />
          <circle cx={p.x} cy={p.y} r="4" fill={p.hot ? "var(--color-v8-rust)" : "var(--color-v8-ink)"} />
        </g>
      ))}
      {CHART.peaks
        .filter((p) => p.label)
        .map((p) => (
          <text key={p.label} x={p.x + 8} y={p.y - 6} fontSize="10" className="fill-v8-dim" {...anim("fade", p.t, 300)}>
            {p.label}
          </text>
        ))}
      <circle
        cx={h.x}
        cy={h.y}
        r="5"
        fill="none"
        stroke="var(--color-v8-rust)"
        strokeWidth="1"
        {...anim("ring", 2250, 700, { transformBox: "fill-box", transformOrigin: "center", opacity: 0 })}
      />
      <g {...anim("fade", 2250, 300)}>
        <line x1={h.x - 10} y1={h.y} x2={h.x - 10} y2={h.limitY} stroke="var(--color-v8-rust)" />
        <text x={h.x - 16} y={(h.y + h.limitY) / 2 + 4} textAnchor="end" fontSize="10.5" fill="var(--color-v8-rust)">
          {h.delta}
        </text>
        <text x={h.x + 10} y={h.y - 16} fontSize="11" className="fill-v8-ink">
          {h.label}
        </text>
      </g>
    </svg>
  );
}

function Causes() {
  const [first, second] = SAMPLE.causes;
  return (
    <div className="flex flex-col gap-3 px-[18px] pt-4 pb-[18px]">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="text-[15px] font-medium">{SAMPLE.causesTitle}</span>
        <span className={`min-h-4 ${MONO} text-[11.5px] text-v8-faint`} data-status={SAMPLE.causesStatus.join("|")} data-t="900" data-step="650">
          {SAMPLE.causesStatus[SAMPLE.causesStatus.length - 1]}
        </span>
      </div>
      <div className="flex flex-col gap-2.5 rounded-[10px] border border-v8-line bg-v8-card p-3.5" {...anim("rise-up", 2250, 400)}>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <span className="text-[14px] font-medium">
            <span className={`${MONO} mr-2 text-v8-faint`}>{first.rank}</span>
            <span className={`${MONO} text-[13px]`}>{first.title}</span>
          </span>
          <span className={`rounded-v8-chip border border-v8-line px-2 py-0.5 ${MONO} text-[11.5px] text-v8-ink`}>{first.priority}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {first.chips.map((c, i) => (
            <Chip key={c.text} state={c.state} nowrap {...anim("fade", 2500 + i * 150, 250)}>
              {c.text}
            </Chip>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2.5 rounded-[10px] border border-v8-line p-3.5" {...anim("rise-up", 2650, 400)}>
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <span className="text-[14px] font-medium text-v8-dim">
            <span className={`${MONO} mr-2 text-v8-faint`}>{second.rank}</span>
            <span className={`${MONO} text-[13px]`}>{second.title}</span>
          </span>
          <span className={`rounded-v8-chip border border-v8-line px-2 py-0.5 ${MONO} text-[11.5px] text-v8-faint`}>{second.priority}</span>
        </div>
        <span className="text-[13px] text-v8-dim">{second.note}</span>
        <div className="flex flex-wrap gap-2">
          {second.chips.map((c) => (
            <Chip key={c.text} state={c.state} {...anim("fade", 2950, 250)}>
              {c.text}
            </Chip>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-baseline gap-2.5 text-[13px]" {...anim("fade", 3050, 200)}>
          <Glyph state="missing" className={MONO} />
          <span>
            <span className="text-v8-faint">{SAMPLE.missing.label}</span>{" "}
            <span data-type="" data-t="3050" data-d="450">
              {SAMPLE.missing.text}
            </span>
          </span>
        </div>
        <div className="flex items-baseline gap-2.5 text-[13px]" {...anim("fade", 3450, 200)}>
          <span className={`${MONO} text-v8-ink`} aria-hidden="true">
            →
          </span>
          <span>
            <span className="text-v8-faint">{SAMPLE.bench.label}</span>{" "}
            <span data-type="" data-t="3450" data-d="600">
              {SAMPLE.bench.text}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}

const PDF_ROW = "grid grid-cols-2 px-2 py-1.5";

function Pdf() {
  const pdf = SAMPLE.pdf;
  return (
    <div className="flex min-w-0 flex-col gap-3 border-v8-line bg-v8-card px-[18px] pt-4 pb-[18px] max-v8w:border-t v8w:border-l">
      <div className={`flex items-baseline justify-between gap-3 ${MONO} text-[11.5px] text-v8-faint`}>
        <span className="text-v8-ink">{pdf.file}</span>
        <span>{pdf.page}</span>
      </div>
      {/* The cited report page: an elevated dark card with the terracotta accent, never a white card. */}
      <div className="flex flex-col gap-3.5 rounded-v8-chip border border-v8-line-elevated border-l-2 border-l-v8-rust bg-v8-elevated p-5 text-v8-ink">
        <div className="flex flex-col gap-[3px]" {...anim("fade", 250, 300)}>
          <span className="text-[13px] font-semibold">{pdf.lab}</span>
          <span className={`${MONO} text-[10.5px] text-v8-faint`}>{pdf.meta}</span>
        </div>
        <div className={`${MONO} text-[10.5px] text-v8-dim`} {...anim("fade", 400, 300)}>
          {pdf.setup}
        </div>
        <div className={`flex flex-col ${MONO} text-[11.5px]`}>
          <div className={`${PDF_ROW} border-b border-v8-line text-[10px] text-v8-faint`} {...anim("fade", 550, 300)}>
            <span>{pdf.head[0]}</span>
            <span className="text-right">{pdf.head[1]}</span>
          </div>
          {pdf.rows.map(([f, v], i) =>
            i === 1 ? (
              <div key={f} {...anim("fade", 950, 300)}>
                <div className={`${PDF_ROW} rounded-[3px]`} {...anim("hl", 2250, 400)}>
                  <span>{f}</span>
                  <span className="text-right">{v}</span>
                </div>
              </div>
            ) : (
              <div key={f} className={`${PDF_ROW} border-b border-v8-line-faint`} {...anim("fade", i === 0 ? 750 : 1150, 300)}>
                <span>{f}</span>
                <span className="text-right">{v}</span>
              </div>
            ),
          )}
        </div>
        <div className="h-2 w-[72%] rounded-[2px] bg-v8-line-faint" aria-hidden="true" {...anim("fade", 1350, 300)} />
        <div className="h-2 w-[54%] rounded-[2px] bg-v8-line-faint" aria-hidden="true" {...anim("fade", 1450, 300)} />
        <div className={`flex flex-col gap-2 border-t border-v8-line pt-3 ${MONO} text-[11.5px]`}>
          <div className="flex justify-between gap-3" {...anim("fade", 2350, 300)}>
            <span className="text-v8-faint">
              <Glyph state="inferred" /> {pdf.limit.label}
            </span>
            <span className="whitespace-nowrap">{pdf.limit.value}</span>
          </div>
          <div className="flex justify-between gap-3" {...anim("fade", 2500, 300)}>
            <span className="text-v8-faint">
              <Glyph state="inferred" /> {pdf.margin.label}
            </span>
            <span className="whitespace-nowrap text-v8-rust-text">{pdf.margin.value}</span>
          </div>
        </div>
        <div className={`text-right ${MONO} text-[10px] text-v8-faint`}>{pdf.page}</div>
      </div>
      <div className={`flex flex-col gap-2 ${MONO} text-[12px] text-v8-dim`}>
        {SAMPLE.provenance.map((p, i) => (
          <span key={p.text} {...anim("fade", i === 0 ? 2250 : 2500, 300)}>
            <Glyph state={p.state} /> {p.text}
          </span>
        ))}
      </div>
    </div>
  );
}

/** The sample case workbench (design: #sample-case): chart, ranked causes and the cited report page. Sample data. */
export default function SampleCase() {
  return (
    <div
      id="sample-case"
      data-anim-root=""
      className="mx-auto mt-[72px] max-w-[1200px] scroll-mt-[88px] overflow-hidden rounded-2xl border border-v8-line bg-v8-inset text-[13px] leading-[18px] text-v8-ink tabular-nums shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_1px_2px_rgba(0,0,0,0.4),0_24px_48px_-12px_rgba(0,0,0,0.6)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-v8-line px-[18px] py-3">
        <div className={`flex flex-wrap items-center gap-2.5 ${MONO} text-[12.5px] text-v8-dim`}>
          <span className="text-v8-ink">{SAMPLE.product}</span>
          <span className="text-v8-faint" aria-hidden="true">
            /
          </span>
          <span>{SAMPLE.revision}</span>
          <span className="text-v8-faint" aria-hidden="true">
            /
          </span>
          <span>{SAMPLE.report}</span>
        </div>
        <div className={`flex flex-wrap items-center gap-2 ${MONO} text-[12px]`}>
          <span className="rounded-v8-chip border border-v8-line px-[9px] py-[3px] whitespace-nowrap text-v8-faint">{SAMPLE.label}</span>
          <span className="rounded-v8-chip border border-v8-line px-[9px] py-[3px] whitespace-nowrap text-v8-ink" {...anim("fade", 2050, 300)}>
            <Glyph state="inferred" /> <span className="text-v8-rust-text">{SAMPLE.verdict.over}</span> {SAMPLE.verdict.clause}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 border-b border-v8-line bg-v8-card px-[18px] py-2.5">
        <span className={`mr-1 ${MONO} text-[11.5px] text-v8-faint`}>Assumptions</span>
        {SAMPLE.assumptions.map((a, i) => (
          <Assumption key={a.text} state={a.state} text={a.text} i={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 v8w:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <div className="flex min-w-0 flex-col">
          <div className="flex flex-col gap-2 border-b border-v8-line px-[18px] pt-4 pb-2.5">
            <div className={`flex flex-wrap items-center justify-between gap-3 ${MONO} text-[11.5px] text-v8-faint`}>
              <span>{SAMPLE.chartTitle}</span>
              <div className="flex flex-wrap items-center gap-3.5" aria-hidden="true">
                <span className="flex items-center gap-1.5">
                  <span className="h-[7px] w-[7px] rounded-full bg-v8-ink" />
                  {SAMPLE.legend.peak}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-0 border-l border-v8-dash" />
                  {SAMPLE.legend.comb}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3.5 border-t-[1.25px] border-v8-known" />
                  {SAMPLE.legend.limit}
                </span>
              </div>
            </div>
            <Chart />
          </div>
          <Causes />
        </div>
        <Pdf />
      </div>
    </div>
  );
}
