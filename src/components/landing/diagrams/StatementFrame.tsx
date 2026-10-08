import type { CSSProperties, ReactNode } from "react";
import { ICON_PATH } from "./HeroCollage";
import MotionRegion from "./MotionRegion";
import s from "./StatementFrame.module.css";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

const SEC = (i: number) => delay(220 + i * 90);
const ROW = (i: number) => delay(560 + i * 120);
const ROWS_END = 560 + 4 * 120 + 200;
const SRC = (i: number) => delay(ROWS_END + i * 150);
const STATUS = delay(ROWS_END + 5 * 150 + 200);

type Status = "risk" | "retest" | "valid";

interface EvidenceRow {
  name: string;
  margin: string;
  status: Status;
  sources: number[];
}

const ROWS: EvidenceRow[] = [
  { name: "Radiated emissions 30–230 MHz", margin: "−1.8 dB · Rev C", status: "risk", sources: [1, 2] },
  { name: "Conducted emissions, DC input", margin: "−3.1 dB · Rev D", status: "risk", sources: [3] },
  { name: "Radio output power", margin: "Table changed", status: "retest", sources: [4] },
  { name: "ESD immunity", margin: "Not affected", status: "valid", sources: [] },
];

const STATUS_PILL: Record<Status, { label: string; cls: string }> = {
  risk: { label: "At risk", cls: "bg-warn/14 text-warn-2" },
  retest: { label: "Retest needed", cls: "bg-danger/14 text-danger" },
  valid: { label: "Still valid", cls: "bg-white/7 text-fg-4" },
};

interface Thread {
  icon: "mail" | "chat";
  from: string;
  when: string;
  text: string;
}

const THREADS: Thread[] = [
  { icon: "mail", from: "Test lab", when: "9:16 AM", text: "Re: Rev E samples. Retest slot moved to Thursday." },
  { icon: "chat", from: "Team channel", when: "Yesterday", text: "EMC engineer: new regulator switches at 2.1 MHz." },
  { icon: "mail", from: "Supplier", when: "Mon", text: "Regulator datasheet, revision B attached." },
];

const COLS = "grid grid-cols-[minmax(150px,1.6fr)_minmax(100px,1fr)_minmax(96px,auto)_minmax(60px,auto)] gap-3";
const SRC_BOX = "[grid-area:1/1] inline-flex h-[18px] min-w-[22px] items-center justify-center rounded-xs px-1 font-mono text-[9.5px]";

function Label({ children }: { children: ReactNode }) {
  return <span className="font-mono text-[10px] tracking-[0.1em] text-fg-faint">{children}</span>;
}

function LineIcon({ d, size }: { d: string; size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="flex-none">
      <path d={d} />
    </svg>
  );
}

/**
 * "Sensor hub / Rev E / Change review" product window (design: [data-frame]). Real, readable markup; on first view the
 * header, sections and rows build in, source placeholders [·] swap to citations [n] and the status chip settles.
 */
export default function StatementFrame() {
  let src = 0;
  return (
    <MotionRegion
      threshold={0.3}
      data-diagram="statement-frame"
      className={`${s.root} mt-12 overflow-hidden rounded-xl border border-line-3 bg-surface-3 font-sans text-[13px] shadow-[inset_0_1px_0_var(--hairline-white-4),0_40px_100px_-40px_rgb(0_0_0/0.8)]`}
    >
      <div className={`${s.hdr} flex h-[46px] items-center gap-2 overflow-hidden border-b border-line-3 px-[18px] whitespace-nowrap text-fg-6`}>
        <span className="text-fg-muted">
          <LineIcon d="M3 6h6l2 2h10v11H3z" size={14} />
        </span>
        <span>Sensor hub</span>
        <span className="text-line-8">/</span>
        <span>Rev E</span>
        <span className="text-line-8">/</span>
        <span className="text-fg">Change review</span>
        <span className="ml-auto grid justify-items-end">
          <span className={`${s.st0} flex h-6 items-center gap-[7px] rounded-sm bg-white/6 px-[9px] text-[12px] text-fg-4 [grid-area:1/1]`} style={STATUS} aria-hidden="true">
            <span className="block size-1.5 rounded-full bg-fg-muted" />
            Tracing evidence
          </span>
          <span className={`${s.st1} flex h-6 items-center gap-[7px] rounded-sm bg-warn/10 px-[9px] text-[12px] text-warn-2 [grid-area:1/1]`} style={STATUS}>
            <span className="block size-1.5 rounded-full bg-warn" />
            Draft · awaiting engineer review
          </span>
        </span>
      </div>

      <div className={`${s.sec} flex flex-col gap-1.5 border-b border-line-3 p-4 sm:px-6 sm:py-5`} style={SEC(0)}>
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-[18px] font-semibold tracking-[-0.01em]">ECO-214 · Buck regulator swap</span>
          <Label>EARLY ACCESS</Label>
        </div>
        <div className="flex flex-wrap gap-[18px] text-[12px] text-fg-muted">
          <span>
            Product <span className="text-fg-3">Sensor hub</span>
          </span>
          <span>
            Revision <span className="text-fg-3">Rev E</span>
          </span>
          <span>
            Compared with <span className="text-accent-text">Rev C</span>, <span className="text-accent-text">Rev D</span>
          </span>
          <span>
            Opened by <span className="text-fg-3">EMC engineer</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <div className={`${s.sec} flex min-w-0 flex-col gap-3 p-4 sm:px-6 sm:py-5`} style={SEC(1)}>
          <span className="text-[12px] font-medium text-fg-6">Evidence at risk</span>
          <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Evidence at risk">
            <div className="min-w-[500px]">
              <div className={`${COLS} border-b border-line-3 pb-2 font-mono text-[9.5px] tracking-[0.08em] text-fg-faint`}>
                <span>EVIDENCE</span>
                <span>PRIOR MARGIN</span>
                <span>STATUS</span>
                <span className="text-right">SOURCES</span>
              </div>
              {ROWS.map((r, i) => (
                <div
                  key={r.name}
                  className={`${s.row} ${COLS} items-center py-[11px] ${i < ROWS.length - 1 ? "border-b border-line-3" : ""}`}
                  style={ROW(i)}
                >
                  <span className="text-fg-2">{r.name}</span>
                  <span className="font-mono text-[11.5px] text-fg-6">{r.margin}</span>
                  <span>
                    <span className={`rounded-sm px-[7px] py-px text-[11.5px] font-medium whitespace-nowrap ${STATUS_PILL[r.status].cls}`}>
                      {STATUS_PILL[r.status].label}
                    </span>
                  </span>
                  <span className="flex justify-end gap-1">
                    {r.sources.map((n) => {
                      const d = SRC(src++);
                      return (
                        <span key={n} className="grid flex-none">
                          <span className={`${s.fp} ${SRC_BOX} border border-dashed border-line-7 text-fg-faint`} style={d} aria-hidden="true">
                            [·]
                          </span>
                          <span className={`${s.fr} ${SRC_BOX} border border-line-5 bg-surface-7 text-fg-3`} style={d}>
                            [{n}]
                          </span>
                        </span>
                      );
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={`${s.sec} flex min-w-0 flex-col border-t border-line-3 p-4 sm:px-6 sm:py-5 lg:border-t-0 lg:border-l`} style={SEC(2)}>
          <div className="flex items-center gap-2.5 pb-1">
            <span className="text-[12px] font-medium text-fg-6">Linked threads</span>
            <Label>EARLY ACCESS</Label>
          </div>
          {THREADS.map((t) => (
            <div key={t.from} className="flex gap-2.5 border-b border-line-3 py-[11px]">
              <span className="flex size-[26px] flex-none items-center justify-center rounded-[7px] border border-line-5 bg-surface-7 text-fg-4">
                <LineIcon d={ICON_PATH[t.icon]} size={14} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex justify-between gap-2">
                  <span className="overflow-hidden font-medium text-ellipsis whitespace-nowrap">{t.from}</span>
                  <span className="text-[11px] whitespace-nowrap text-fg-faint">{t.when}</span>
                </div>
                <span className="text-[12px] leading-[1.45] text-fg-6">{t.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MotionRegion>
  );
}
