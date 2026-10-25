import Image from "next/image";
import { DIAGRAM, PULSE, type DiagramRow } from "@/content/home-v8";
import { LOGO_PATH } from "@/lib/site";
import { Chip, Glyph, MONO, anim } from "./ui";

const CARD_TITLE = `${MONO} text-[12px] text-v8-faint`;
const DASH = "var(--color-v8-dash)";
const ARROW = "var(--color-v8-arrow)";

function Rows({ rows, timed }: { rows: DiagramRow[]; timed?: number[] }) {
  return (
    <div className="flex flex-col gap-2">
      {rows.map((r, i) => (
        <Chip key={r.text} state={r.state} {...(timed ? anim("fade", timed[i], 300) : {})}>
          {r.state && <span className="text-v8-faint">{r.state.toUpperCase()} </span>}
          {r.text}
        </Chip>
      ))}
    </div>
  );
}

/**
 * The engine's dot map with its pulse. The design's world-dots.svg was not supplied with the design file, so the map
 * is a plain dot grid (an SVG pattern, faded at the edges) at the same 4.5-unit pitch the pulse dots sit on.
 */
function DotMap({ id, logoHeight, className }: { id: string; logoHeight: number; className: string }) {
  return (
    <div className={`relative mx-auto ${className}`}>
      <svg viewBox="0 0 360 139.5" className="block h-auto w-full" aria-hidden="true">
        <defs>
          <pattern id={`${id}-dots`} width="4.5" height="4.5" patternUnits="userSpaceOnUse">
            <circle cx="2.25" cy="2.25" r="1.05" fill={DASH} />
          </pattern>
          <radialGradient id={`${id}-fade`} cx="50%" cy="50%" r="55%">
            <stop offset="0.55" stopColor="#fff" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <mask id={`${id}-mask`}>
            <rect width="360" height="139.5" fill={`url(#${id}-fade)`} />
          </mask>
        </defs>
        <rect width="360" height="139.5" fill={`url(#${id}-dots)`} mask={`url(#${id}-mask)`} />
        {PULSE.map((p) => (
          <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r="1.25" className="fill-v8-ink" {...anim("pulse", p.t, 400, { opacity: 0 })} />
        ))}
      </svg>
      <div className="absolute top-1/2 left-1/2 flex -translate-1/2 rounded-lg bg-v8-card p-[5px]">
        <Image src={LOGO_PATH} alt="Crado" width={Math.round((logoHeight * 882) / 1000)} height={logoHeight} className="block w-auto" style={{ height: logoHeight }} />
      </div>
    </div>
  );
}

function Engine({ id, logoHeight, mapClass }: { id: string; logoHeight: number; mapClass: string }) {
  return (
    <>
      <DotMap id={id} logoHeight={logoHeight} className={mapClass} />
      <span className={CARD_TITLE}>{DIAGRAM.engine.title}</span>
      <div className="flex flex-col gap-2">
        {DIAGRAM.engine.rows.map((r) => (
          <Chip key={r}>{r}</Chip>
        ))}
        <Chip>
          {DIAGRAM.engine.missing.before} <Glyph state="missing" /> <span className="text-v8-faint">MISSING</span> {DIAGRAM.engine.missing.after}
        </Chip>
      </div>
    </>
  );
}

function Legend({ className }: { className: string }) {
  return (
    <div className={`flex justify-center gap-4 ${MONO} text-v8-faint ${className}`}>
      {(["observed", "known", "inferred", "missing"] as const).map((s) => (
        <span key={s}>
          <Glyph state={s} /> {s}
        </span>
      ))}
    </div>
  );
}

const DESK_CARD = "absolute top-[250px] box-border flex h-[325px] w-[340px] flex-col gap-2.5 overflow-hidden rounded-v8-card border border-v8-line bg-v8-card p-4";

function ArrowRight({ left, t }: { left: number; t: number }) {
  return (
    <svg width="48" height="20" viewBox="0 0 48 20" className="absolute top-[390px]" aria-hidden="true" {...anim("draw-r", t, 300, { left })}>
      <line x1="0" y1="10" x2="41" y2="10" stroke={DASH} strokeDasharray="4 4" />
      <path d="M41 6 L45.5 10 L41 14" fill="none" stroke={ARROW} strokeWidth="1.2" />
    </svg>
  );
}

/** Desktop diagram (from 1100px): the design's 1440 × 715 stage, cropped to 1200 × 545 and zoomed to fit. */
function Desktop() {
  return (
    <div className="v8-dz relative mx-auto hidden h-[545px] w-[1200px] overflow-hidden v8d:block">
      <div data-anim-root="" className="absolute top-[-170px] left-[-120px] h-[715px] w-[1440px]">
        <div className={`absolute inset-x-0 top-[200px] text-center ${MONO} text-[12px] text-v8-faint`}>{DIAGRAM.caption}</div>
        <ArrowRight left={486} t={0} />
        <ArrowRight left={886} t={600} />
        <svg width="840" height="80" viewBox="0 0 840 80" className="absolute top-[565px] left-[300px]" aria-hidden="true" {...anim("draw-l", 1300, 400)}>
          <path d="M810 10 V62 Q810 70 802 70 H18 Q10 70 10 62 V18" fill="none" stroke={DASH} strokeDasharray="4 4" />
          <path d="M6 22 L10 17.5 L14 22" fill="none" stroke={ARROW} strokeWidth="1.2" />
        </svg>
        <div className={`${DESK_CARD} left-[140px]`} {...anim("fade", 0, 300)}>
          <span className={CARD_TITLE}>{DIAGRAM.facts.title}</span>
          <Rows rows={DIAGRAM.facts.rows} />
        </div>
        <div className={`${DESK_CARD} left-[540px]`} {...anim("fade", 300, 300)}>
          <Engine id="dz-desk" logoHeight={26} mapClass="w-[160px]" />
        </div>
        <div className={`${DESK_CARD} left-[940px]`} {...anim("fade", 900, 300)}>
          <span className={CARD_TITLE}>{DIAGRAM.record.title}</span>
          <Rows rows={DIAGRAM.record.rows} timed={[1000, 1080, 1160]} />
        </div>
        <div className="pointer-events-none absolute top-[621px] left-[120px] flex w-[1200px] justify-center">
          <div
            className={`box-border flex h-7 items-center rounded-full border border-v8-line bg-v8-inset px-3 whitespace-nowrap ${MONO} text-[12px] text-v8-dim`}
            {...anim("fade", 1500, 300)}
          >
            {DIAGRAM.retest}
          </div>
        </div>
        <Legend className="absolute inset-x-0 top-[675px] text-[11.5px]" />
      </div>
    </div>
  );
}

function DownArrow({ t }: { t: number }) {
  return (
    <div className="relative h-9" aria-hidden="true" {...anim("draw-d", t, 300)}>
      <div className="absolute top-0 bottom-1 left-1/2 border-l border-dashed border-v8-dash" />
      <svg width="10" height="10" viewBox="0 0 10 10" className="absolute bottom-0 left-[calc(50%-4.5px)]">
        <path d="M1 3 L5 7.5 L9 3" fill="none" stroke={ARROW} strokeWidth="1.2" />
      </svg>
    </div>
  );
}

const NARROW_CARD = "flex flex-col gap-2.5 rounded-v8-card border border-v8-line bg-v8-card p-3.5";

/** Narrow diagram (below 1100px): the three cards stacked, with the return loop down the left edge. */
function Narrow() {
  return (
    <div data-anim-root="" className="mx-auto box-border flex w-full max-w-[460px] flex-col v8d:hidden">
      <div className={`mb-5 text-center ${MONO} text-[11px] text-v8-faint`}>{DIAGRAM.captionShort}</div>
      <div className="relative flex flex-col pl-[18px]">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true" {...anim("draw-u", 1300, 400)}>
          <div className="absolute top-[22px] bottom-3.5 left-1 border-l border-dashed border-v8-dash" />
          <div className="absolute top-[22px] left-1 w-[9px] border-t border-dashed border-v8-dash" />
          <svg width="10" height="10" viewBox="0 0 10 10" className="absolute top-[17px] left-2.5">
            <path d="M3 1 L7.5 5 L3 9" fill="none" stroke={ARROW} strokeWidth="1.2" />
          </svg>
          <div className="absolute bottom-3.5 left-1 w-3.5 border-t border-dashed border-v8-dash" />
        </div>
        <div className={NARROW_CARD}>
          <span className={CARD_TITLE}>{DIAGRAM.facts.title}</span>
          <Rows rows={DIAGRAM.facts.rows} />
        </div>
        <DownArrow t={0} />
        <div className={NARROW_CARD}>
          <Engine id="dz-narrow" logoHeight={30} mapClass="w-[70%]" />
        </div>
        <DownArrow t={600} />
        <div className={NARROW_CARD}>
          <span className={CARD_TITLE}>{DIAGRAM.record.title}</span>
          <Rows rows={DIAGRAM.record.rows} timed={[1000, 1080, 1160]} />
        </div>
        <div className="h-[18px]" />
        <div className={`self-start rounded-v8-chip border border-v8-line bg-v8-inset px-2.5 py-[5px] ${MONO} text-[11px] text-v8-dim`} {...anim("fade", 1500, 300)}>
          {DIAGRAM.retest}
        </div>
      </div>
      <Legend className="mt-3.5 text-[10.5px]" />
    </div>
  );
}

/** Hero diagram: daily inputs → deterministic checks → verified revision record. Decorative motion, real text. */
export default function HeroDiagram() {
  return (
    <figure className="m-0" aria-label={DIAGRAM.caption}>
      <Desktop />
      <Narrow />
    </figure>
  );
}
