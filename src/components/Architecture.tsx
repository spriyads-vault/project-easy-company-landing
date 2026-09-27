import { buildPlot } from "@/lib/plot";

const plot = buildPlot();
const TABLE_COLS = "grid-cols-[1fr_0.5fr_0.9fr_0.9fr_0.8fr_1.1fr_0.8fr]";

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="size-1.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}

function EmissionsPlot() {
  const { points, limitSegs, limitRisers, xTicks, yTicks, spike } = plot;
  return (
    <div className="flex pt-6 pr-6 pb-3 pl-3">
      <div className="relative w-11 flex-none">
        <span className="absolute top-1/2 left-0 -translate-x-[30%] -translate-y-1/2 -rotate-90 text-[11px] whitespace-nowrap text-fog">
          dBuV/m
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="relative h-[clamp(260px,34vw,400px)] border-b border-l border-fog">
          {yTicks.map((t) => (
            <div key={`y${t.label}`}>
              <div className="absolute right-0 left-0 border-t border-grid" style={{ bottom: t.pos }} />
              <span
                className="absolute -left-[30px] translate-y-1/2 text-[10px] leading-3 text-mist"
                style={{ bottom: t.pos }}
              >
                {t.label}
              </span>
            </div>
          ))}
          {xTicks.map((t) => (
            <div key={`x${t.label}`} className="absolute top-0 bottom-0 border-l border-grid" style={{ left: t.pos }} />
          ))}
          {limitSegs.map((s, i) => (
            <div
              key={`seg${i}`}
              className="absolute border-t border-dashed border-butter"
              style={{ left: s.left, width: s.width, bottom: s.bottom }}
            />
          ))}
          {limitRisers.map((s, i) => (
            <div
              key={`riser${i}`}
              className="absolute border-l border-dashed border-butter"
              style={{ left: s.left, bottom: s.bottom, height: s.height }}
            />
          ))}
          {points.map((p, i) => (
            <span
              key={`p${i}`}
              className="absolute -mb-0.5 -ml-0.5 rounded-full"
              style={{ left: p.left, bottom: p.bottom, width: p.size, height: p.size, background: p.color }}
            />
          ))}
          <span
            className="absolute -mb-1.5 -ml-1.5 size-3 rounded-full bg-blush shadow-[0_0_0_4px_rgba(241,164,171,0.25)]"
            style={{ left: spike.left, bottom: spike.bottom }}
          />
          <div
            className="absolute mb-5 ml-3.5 min-w-[210px] border border-blush bg-night text-[11px] leading-[17px] text-paper"
            style={{ left: spike.left, bottom: spike.bottom }}
          >
            <div className="flex justify-between gap-3 bg-blush px-2 py-1 text-ink">
              <span>FAIL</span>
              <span>15.109(a)</span>
            </div>
            <div className="px-2 py-1.5">
              <div>216.8 MHz · H · QP</div>
              <div>47.0 dBuV/m / lim 46.0</div>
              <div className="text-blush">margin −1.0 dB</div>
            </div>
          </div>
        </div>
        <div className="relative mt-1.5 h-[18px]">
          {xTicks.map((t) => (
            <span
              key={`xl${t.label}`}
              className="absolute -translate-x-1/2 text-[10px] leading-3 text-mist"
              style={{ left: t.pos }}
            >
              {t.label}
            </span>
          ))}
        </div>
        <div className="mt-1 text-center text-[11px] leading-4 text-fog">Frequency (MHz)</div>
      </div>
    </div>
  );
}

function PeaksTable() {
  return (
    <div className="overflow-x-auto border-t border-steel">
      <div className="min-w-[760px] text-xs leading-[18px]">
        <div className={`grid ${TABLE_COLS} gap-3 border-b border-steel bg-night-4 px-4 py-2.5 text-[11px] tracking-[0.04em] text-fog`}>
          <span>FREQ (MHz)</span>
          <span>POL</span>
          <span className="text-right">LEVEL</span>
          <span className="text-right">LIMIT</span>
          <span className="text-right">MARGIN</span>
          <span>CLAUSE</span>
          <span>RESULT</span>
        </div>
        {plot.rows.map((r) => (
          <div
            key={r.f}
            className={`grid ${TABLE_COLS} gap-3 border-b border-steel px-4 py-[9px] text-paper`}
            style={{ background: r.bg }}
          >
            <span>{r.f}</span>
            <span className="text-fog">{r.pol}</span>
            <span className="text-right">{r.level}</span>
            <span className="text-right text-fog">{r.limit}</span>
            <span className="text-right" style={{ color: r.mColor }}>
              {r.margin}
            </span>
            <span className="text-fog">{r.clause}</span>
            <span style={{ color: r.mColor }}>{r.result}</span>
          </div>
        ))}
        <div className="flex justify-between gap-3 px-4 py-[9px] text-[11px] text-mist">
          <span>47 CFR 15.109(a) · Class B · 3 m · levels in dBuV/m</span>
          <span>margin = limit − level</span>
        </div>
      </div>
    </div>
  );
}

export default function Architecture() {
  return (
    <section id="architecture" className="relative overflow-hidden border-t border-ink bg-ink text-paper">
      <div
        aria-hidden="true"
        className="grid-lines absolute inset-0 bg-[length:32px_32px] opacity-35 [--grid-color:#526171]"
      />
      <div className="relative mx-auto max-w-[1264px] px-8 py-32">
        <h2 className="mx-auto my-0 max-w-[18ch] text-center font-display text-[clamp(36px,4.4vw,52px)] leading-none font-bold tracking-[-0.05em] text-balance text-paper">
          Hardware Intelligence For Chamber Logs.
        </h2>

        <div
          aria-hidden="true"
          className="mt-[72px] border border-steel bg-ink font-mono tabular-nums [font-variant-ligatures:none]"
        >
          <div className="flex flex-wrap justify-between gap-x-6 gap-y-2 border-b border-steel px-4 py-2.5 text-[11px] leading-4 tracking-[0.04em] text-fog">
            <span>FIG. 2 — RADIATED EMISSIONS SWEEP · CR-GW-220 rev B · 3 m · QP</span>
            <span className="flex flex-wrap gap-4">
              <LegendDot color="#8F9BA7" label="reading" />
              <LegendDot color="#F7DF8C" label="< 3 dB margin" />
              <LegendDot color="#F1A4AB" label="over limit" />
              <span className="flex items-center gap-1.5">
                <span className="w-3.5 border-t border-dashed border-butter" />
                Class B limit
              </span>
            </span>
          </div>
          <EmissionsPlot />
          <PeaksTable />
        </div>
      </div>
    </section>
  );
}
