import type { CSSProperties } from "react";
import ProductFrame from "./ProductFrame";

/**
 * "Your engineers, minus the evidence hunt": the statement and the scroll-scaling product frame (design: [data-pframe]).
 * The frame's contents are server-rendered; ProductFrame only drives the scale and the one-time Finding reveal.
 */
export default function Statement() {
  return (
    <section aria-labelledby="statement-title" className="px-(--space-gutter) py-(--space-section)">
      <div className="mx-auto flex max-w-(--container-statement) flex-col items-center text-center">
        <h2
          id="statement-title"
          className="m-0 text-[length:clamp(34px,3.4vw,48px)] leading-[1.08] font-semibold tracking-[-.03em] text-balance"
        >
          Your engineers, minus the evidence hunt
        </h2>
        <p className="mx-0 mt-6 mb-0 max-w-[680px] text-[19px] leading-[1.5] tracking-[-.005em] text-pretty text-white/70">
          Crado reads lab reports, keeps every finding tied to its revision and cites the source it came from. Every number on screen comes
          from the evaluation engine, not the model.
        </p>
      </div>
      <div className="mx-auto mt-[72px] max-w-(--container-frame)">
        <ProductFrame>
          <div
            role="img"
            aria-label="Product illustration: Case 0042, where Crado drafts a finding for the Rev D radiated-emissions failure and shows the cited row in the lab report"
            className="flex min-h-0 flex-1 flex-col"
          >
            <div className="flex h-12 flex-none items-center gap-3 border-b border-line-3 px-4">
              <svg
                className="flex-none stroke-fg-muted"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h10" />
              </svg>
              <svg className="flex-none fill-fg-4" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3C12.8 8.5 15.5 11.2 21 12C15.5 12.8 12.8 15.5 12 21C11.2 15.5 8.5 12.8 3 12C8.5 11.2 11.2 8.5 12 3Z" />
              </svg>
              <span className="min-w-0 truncate text-[13.5px] font-medium">Case 0042 · Rev D radiated emissions</span>
              <span className="ml-auto flex h-[26px] items-center gap-[7px] rounded-sm bg-warn/10 px-2.5 text-[12px] whitespace-nowrap text-warn-2">
                <span className="block size-1.5 rounded-full bg-warn" />
                Draft · awaiting engineer review
              </span>
            </div>
            <div className="flex min-h-0 flex-1">
              <div className="flex min-w-0 flex-1 flex-col gap-5 overflow-hidden px-4 pt-5 pb-14 sm:px-9 sm:pt-7">
                <div className="self-end max-w-[min(460px,_92%)] flex flex-col items-end gap-[8px] py-[12px] px-[14px] bg-surface-6 border border-line-4 rounded-[12px_12px_4px_12px]">
                  <span className="text-[14px] leading-[1.5] text-fg">Rev D failed radiated emissions at the lab, can you look?</span>
                  <span className="inline-flex items-center gap-[7px] h-[26px] pt-0 pr-[9px] pb-0 pl-[6px] rounded-sm bg-line-3 text-[12px] text-fg-3 whitespace-nowrap">
                    <span aria-hidden="true" className="w-[16px] h-[16px] flex-none rounded-xs bg-danger-strong text-white font-mono text-[5.5px] flex items-center justify-center before:content-['PDF']" />
                    Rev D report.pdf
                  </span>
                </div>
                <div className="flex gap-[12px] items-start">
                  <span className="w-[26px] h-[26px] flex-none rounded-sm bg-hero-band flex items-center justify-center">
                    <svg className="fill-white" width="13" height="13" viewBox="0 0 24 24">
                      <path d="M12 3C12.8 8.5 15.5 11.2 21 12C15.5 12.8 12.8 15.5 12 21C11.2 15.5 8.5 12.8 3 12C8.5 11.2 11.2 8.5 12 3Z" />
                    </svg>
                  </span>
                  <div className="flex-1 min-w-0 flex flex-col gap-[10px]">
                    <div
                      className="min-h-[26px] flex items-center flex-wrap gap-[6px] text-[13.5px] text-fg-6"
                      data-ps
                      style={{ "--i": 0 } as CSSProperties}
                    >
                      <span className="font-medium text-fg">Finding</span>
                      <span>·</span>
                      <span>Sensor hub Rev D</span>
                      <span>·</span>
                      <span className="inline-flex items-center gap-[6px] text-warn">
                        <span className="w-[6px] h-[6px] rounded-full bg-warn block"></span>Draft, awaiting engineer review
                      </span>
                    </div>
                    <div
                      className="flex items-center flex-wrap gap-[10px] py-[11px] px-[12px] bg-surface-4 border border-line-3 rounded-md"
                      data-ps
                      style={{ "--i": 1 } as CSSProperties}
                    >
                      <span className="w-[6px] h-[6px] flex-none rounded-full bg-danger-strong block"></span>
                      <span className="flex-1 min-w-[200px] font-mono text-[12.5px] leading-[1.5] text-fg-2">
                        144.2 MHz · 47.7 dBµV/m · limit 43.5 · margin +4.2 dB · 47 CFR 15.109(a)
                      </span>
                      <span className="h-[20px] flex-none inline-flex items-center py-0 px-[6px] font-mono text-[10px] tracking-[.06em] text-fg-4 border border-line-7 rounded-xs whitespace-nowrap">
                        EVALUATION ENGINE
                      </span>
                    </div>
                    <div className="pt-[4px] px-[2px] pb-0" data-ps style={{ "--i": 2 } as CSSProperties}>
                      <span className="font-mono text-[10px] tracking-[.1em] text-fg-faint">LIKELY CAUSES · RANKED</span>
                    </div>
                    <div
                      className="flex items-center flex-wrap gap-[8px] py-[10px] px-[12px] border border-surface-7 rounded-md bg-surface-2b"
                      data-ps
                      style={{ "--i": 3 } as CSSProperties}
                    >
                      <span className="font-mono text-[11px] text-fg-faint">1</span>
                      <span className="flex-1 min-w-[140px] text-[13.5px] text-fg-2">Buck regulator harmonics</span>
                      <span className="h-[20px] flex-none inline-flex items-center py-0 px-[6px] font-mono text-[10px] tracking-[.06em] text-warn border border-warn/50 rounded-xs whitespace-nowrap">
                        INFERRED
                      </span>
                      <span className="h-[20px] flex-none inline-flex items-center py-0 px-[6px] font-mono text-[10.5px] text-fg-4 bg-line-1 border border-line-4 rounded-xs whitespace-nowrap">
                        report p.4
                      </span>
                    </div>
                    <div
                      className="flex items-center flex-wrap gap-[8px] py-[10px] px-[12px] border border-surface-7 rounded-md bg-surface-2b"
                      data-ps
                      style={{ "--i": 4 } as CSSProperties}
                    >
                      <span className="font-mono text-[11px] text-fg-faint">2</span>
                      <span className="flex-1 min-w-[140px] text-[13.5px] text-fg-2">Unshielded USB cable</span>
                      <span className="h-[20px] flex-none inline-flex items-center py-0 px-[6px] font-mono text-[10px] tracking-[.06em] text-warn border border-warn/50 rounded-xs whitespace-nowrap">
                        INFERRED
                      </span>
                      <span className="h-[20px] flex-none inline-flex items-center py-0 px-[6px] font-mono text-[10.5px] text-fg-4 bg-line-1 border border-line-4 rounded-xs whitespace-nowrap">
                        report p.6
                      </span>
                    </div>
                    <div
                      className="flex items-center flex-wrap gap-[8px] py-[10px] px-[12px] border border-surface-7 rounded-md bg-surface-2b"
                      data-ps
                      style={{ "--i": 5 } as CSSProperties}
                    >
                      <span className="font-mono text-[11px] text-fg-faint">3</span>
                      <span className="flex-1 min-w-[140px] text-[13.5px] text-fg-2">Clock trace near seam</span>
                      <span className="h-[20px] flex-none inline-flex items-center py-0 px-[6px] font-mono text-[10px] tracking-[.06em] text-warn border border-warn/50 rounded-xs whitespace-nowrap">
                        INFERRED
                      </span>
                      <span className="h-[20px] flex-none inline-flex items-center py-0 px-[6px] font-mono text-[10.5px] text-fg-4 bg-line-1 border border-line-4 rounded-xs whitespace-nowrap">
                        report p.7
                      </span>
                    </div>
                    <div
                      className="flex items-center flex-wrap gap-[10px] py-[10px] px-[12px] border border-dashed border-warn/40 rounded-md bg-warn-ink-2"
                      data-ps
                      style={{ "--i": 6 } as CSSProperties}
                    >
                      <svg
                        className="stroke-warn-2 flex-none"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z" />
                      </svg>
                      <span className="text-[13.5px] font-medium text-warn-2">Held for review</span>
                      <span className="flex-1 min-w-[180px] text-[13px] text-fg-4">
                        288.4 MHz is 1.9 dB under the limit; antenna height scan not in the report
                      </span>
                    </div>
                    <div
                      className="pt-[2px] px-[2px] pb-0 font-mono text-[11px] leading-[1.6] text-fg-faint"
                      data-ps
                      style={{ "--i": 7 } as CSSProperties}
                    >
                      Run record · FCC Part 15 Class B rules · engine 0.9.2 · Rev D report.pdf p.4 · 14:02
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden w-[400px] flex-none flex-col md:flex border-l border-l-line-3 bg-surface-0">
                <div className="h-[48px] flex-none flex items-center gap-[10px] py-0 px-[16px] border-b border-b-surface-7">
                  <span aria-hidden="true" className="w-[16px] h-[16px] flex-none rounded-xs bg-danger-strong text-white font-mono text-[5.5px] flex items-center justify-center before:content-['PDF']" />
                  <span className="text-[13px] font-medium">Rev D report.pdf</span>
                  <span className="ml-auto font-mono text-[11px] text-fg-muted">p. 4 / 12</span>
                </div>
                <div className="flex-1 min-h-0 p-[20px] overflow-hidden">
                  <div className="flex flex-col gap-[12px] py-[20px] px-[18px] bg-surface-3 border border-line-3 rounded-md">
                    <span className="font-mono text-[10px] tracking-[.1em] text-fg-faint">SECTION 6 · RADIATED EMISSIONS</span>
                    <span className="text-[13px] font-medium text-fg-2">Table 6.2 · 30 MHz – 1 GHz, 3 m, quasi-peak</span>
                    <div className="flex flex-col gap-[6px]">
                      <span className="block w-[92%] h-[7px] rounded-xs bg-surface-7"></span>
                      <span className="block w-[78%] h-[7px] rounded-xs bg-surface-7"></span>
                    </div>
                    <div className="flex flex-col mt-[6px]">
                      <div className="grid grid-cols-[1.1fr_1fr_1fr_1fr_.6fr] gap-[8px] pt-0 px-[10px] pb-[8px] font-mono text-[9.5px] tracking-[.06em] text-fg-faint">
                        <span>MHz</span>
                        <span>dBµV/m</span>
                        <span>LIMIT</span>
                        <span>MARGIN</span>
                        <span>POL</span>
                      </div>
                      <div className="relative grid grid-cols-[1.1fr_1fr_1fr_1fr_.6fr] gap-[8px] items-center h-[34px] py-0 px-[10px] rounded-sm text-fg-4 border-b border-b-surface-7 font-mono text-[11.5px]">
                        <span>48.6</span>
                        <span>31.2</span>
                        <span>40.0</span>
                        <span>−8.8</span>
                        <span>V</span>
                      </div>
                      <div className="relative grid grid-cols-[1.1fr_1fr_1fr_1fr_.6fr] gap-[8px] items-center h-[34px] py-0 px-[10px] rounded-sm text-fg-4 border-b border-b-surface-7 font-mono text-[11.5px]">
                        <span>96.0</span>
                        <span>41.7</span>
                        <span>43.5</span>
                        <span>−1.8</span>
                        <span>H</span>
                      </div>
                      <div className="relative grid grid-cols-[1.1fr_1fr_1fr_1fr_.6fr] gap-[8px] items-center h-[34px] py-0 px-[10px] rounded-sm bg-accent-vivid/16 shadow-[inset_0_0_0_1px_var(--color-accent-vivid)] text-white font-mono text-[11.5px]">
                        <span>144.2</span>
                        <span>47.7</span>
                        <span>43.5</span>
                        <span className="text-danger-soft">+4.2</span>
                        <span>H</span>
                        <span className="absolute right-[-8px] top-[-9px] h-[18px] py-0 px-[5px] flex items-center rounded-xs bg-accent-vivid text-white text-[10px]">
                          [1]
                        </span>
                      </div>
                      <div className="relative grid grid-cols-[1.1fr_1fr_1fr_1fr_.6fr] gap-[8px] items-center h-[34px] py-0 px-[10px] rounded-sm text-fg-4 border-b border-b-surface-7 font-mono text-[11.5px]">
                        <span>216.3</span>
                        <span>41.0</span>
                        <span>46.0</span>
                        <span>−5.0</span>
                        <span>V</span>
                      </div>
                      <div className="relative grid grid-cols-[1.1fr_1fr_1fr_1fr_.6fr] gap-[8px] items-center h-[34px] py-0 px-[10px] rounded-sm text-fg-4 border-b border-b-surface-7 font-mono text-[11.5px]">
                        <span>288.4</span>
                        <span>44.1</span>
                        <span>46.0</span>
                        <span>−1.9</span>
                        <span>H</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-[6px] mt-[6px]">
                      <span className="block w-[86%] h-[7px] rounded-xs bg-surface-7"></span>
                      <span className="block w-[64%] h-[7px] rounded-xs bg-surface-7"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* The walkthrough video is not recorded yet: a caption only, no play button. */}
          <span className="absolute right-4 bottom-3.5 z-[3] flex h-[26px] items-center rounded-sm border border-line-3 bg-bg/85 px-2.5 font-mono text-[11px] text-fg-6">
            Product walkthrough · video coming soon
          </span>
        </ProductFrame>
      </div>
    </section>
  );
}
