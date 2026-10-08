/**
 * Hero tools strip: the report formats Crado reads today, then connectors on the roadmap.
 * Connectors are text tiles, as in the design. Vendor logo terms (see public/logos/SOURCES.md) do not allow
 * their marks here, so no third-party logo is drawn. Tooltips show on hover and keyboard focus (CSS only).
 */

const FORMATS = ["PDF", "TXT", "MD"] as const;

/** [tile label, full name]. Design: renderVals().tools. */
const CONNECTORS: [string, string][] = [
  ["Altium", "Altium Designer"],
  ["KiCad", "KiCad"],
  ["OrCAD", "Cadence OrCAD"],
  ["SolidWorks", "SolidWorks"],
  ["Fusion", "Autodesk Fusion"],
  ["Teamcenter", "Siemens Teamcenter (PLM)"],
  ["+3", "Arena PLM · Git · Jira"],
];

const TILE = "flex h-10 flex-none items-center justify-center rounded-sm border border-white/18 bg-white/10";
const EYEBROW = "font-mono text-[12px] leading-none tracking-[.12em] text-white/75";

function FileGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-none stroke-white">
      <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8zM14 3v5h5" />
    </svg>
  );
}

export default function ToolsStrip() {
  return (
    <div className="flex max-w-full min-w-0 flex-col items-start gap-3 sm:items-end">
      <div className="flex flex-col items-start gap-3 sm:items-end">
        <span className={EYEBROW}>READS YOUR LAB REPORTS</span>
        <ul className="m-0 flex list-none gap-2 p-0" aria-label="Report formats">
          {FORMATS.map((f) => (
            <li key={f} className={`${TILE} w-10 flex-col gap-0.5`}>
              <FileGlyph />
              <span className="font-mono text-[8.5px] leading-none tracking-[.06em] text-white">{f}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex max-w-full min-w-0 flex-col items-start gap-3 sm:items-end">
        <span className={EYEBROW}>CONNECTORS ON THE ROADMAP</span>
        {/* Below 760px the row scrolls sideways (design: hr.ox). */}
        <ul
          aria-label="Connectors on the roadmap"
          className="m-0 flex max-w-full list-none gap-2 overflow-x-auto p-0 [scrollbar-width:none] sm:overflow-x-visible"
        >
          {CONNECTORS.map(([label, full], i) => {
            const last = i === CONNECTORS.length - 1;
            const tipId = `tool-tip-${i}`;
            return (
              <li key={label} className="flex">
                <span
                  tabIndex={0}
                  aria-describedby={tipId}
                  className={`${TILE} group relative min-w-10 cursor-default px-2.5 font-mono text-[10px] tracking-[.02em] whitespace-nowrap text-white/70`}
                >
                  {label}
                  <span
                    id={tipId}
                    role="tooltip"
                    className={`pointer-events-none absolute bottom-[calc(100%+8px)] z-[5] rounded-sm border border-line-4 bg-ink px-2 py-1.5 font-display text-[12px] tracking-normal whitespace-nowrap text-fg opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 ${
                      last ? "right-0" : "left-1/2 -translate-x-1/2"
                    }`}
                  >
                    {full} · Roadmap
                  </span>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
