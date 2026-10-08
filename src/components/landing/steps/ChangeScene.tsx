import type { CSSProperties } from "react";

// Generated from the design markup (Crado Homepage.dc.html, data-scene="0"). Original artwork: gradient stops in the
// 3D tiles are illustration colours, not UI tokens. Step 01 (change review, early access): ECO-214 against the Rev C/D/E evidence, a cited row and its source tooltip.
// Text is drawn with CSS generated content (data-t) because the scene is decorative artwork (aria-hidden, described
// by its box's role="img" label): it should not be read or contrast-checked as page text.
// `p` prefixes SVG ids so the desktop and mobile copies of a scene never share an id.

export default function ChangeScene({ p }: { p: string }) {
  return (
    <div
      className="absolute left-[50%] top-[50%] w-[720px] h-[560px] mt-[-280px] mr-0 mb-0 ml-[-360px] [transform-origin:50%_50%] font-display text-fg text-left scale-(--scene-scale)"
      data-scene
      data-scene-id="0"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-accent-vivid)_10%,transparent),_color-mix(in_srgb,var(--color-accent-vivid)_0%,transparent))] pointer-events-none"
        aria-hidden="true"
      ></div>
      <div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_72%_72%_at_50%_50%,_var(--color-black)_40%,_transparent_100%)] pointer-events-none"
        aria-hidden="true"
        data-bg
      >
        <div className="absolute left-[80px] right-[80px] top-[20px] h-[44px]">
          <span className="absolute left-0 right-0 top-[6px] h-[1px] bg-line-7 block"></span>
          <span className="absolute left-[0%] top-0 w-[13px] h-[13px] ml-[-6px] rounded-full bg-bg border-[2px] border-fg-faint block"></span>
          <span className="absolute left-[0%] top-[22px] [transform:translateX(-50%)] font-mono text-[13px] text-fg-6">
            <span data-t="Rev C" className="before:content-[attr(data-t)]" />
          </span>
          <span className="absolute left-[50%] top-0 w-[13px] h-[13px] ml-[-6px] rounded-full bg-bg border-[2px] border-fg-6 block"></span>
          <span className="absolute left-[50%] top-[22px] [transform:translateX(-50%)] font-mono text-[13px] text-fg-6">
            <span data-t="Rev D" className="before:content-[attr(data-t)]" />
          </span>
          <span className="absolute left-[100%] top-0 w-[13px] h-[13px] ml-[-6px] rounded-full bg-bg border-[2px] border-accent-vivid block"></span>
          <span className="absolute left-[100%] top-[22px] [transform:translateX(-50%)] font-mono text-[13px] text-fg-6">
            <span data-t="Rev E" className="before:content-[attr(data-t)]" />
          </span>
        </div>
        <div className="absolute left-[496px] top-[116px] w-[200px] h-[200px]">
          <svg className="absolute inset-0 overflow-visible" width="200" height="200" viewBox="0 0 200 200">
            <defs>
              <linearGradient id={`${p}g01`} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#9DB0FF" />
                <stop offset="1" stopColor="#3D5AFE" />
              </linearGradient>
            </defs>
            <circle className="stroke-line-3" cx="100" cy="100" r="84" fill="none" strokeWidth="10" />
            <path
              data-gauge
              d="M100 16 A84 84 0 1 1 17.5 115.7"
              pathLength={1}
              strokeDasharray="1"
              strokeDashoffset="0"
              fill="none"
              stroke={`url(#${p}g01)`}
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path className="stroke-fg-muted" d="M29.5 159.1 L41.8 148.9" strokeWidth="2" />
            <text className="fill-fg-muted" x="6" y="182" fontFamily="Geist Mono, monospace" fontSize="12">
              Rev C
            </text>
          </svg>
          <span className="absolute left-0 right-0 top-[62px] text-center font-display text-[64px] font-semibold tracking-[-.04em] leading-[1] text-fg">
            <span data-t="−1.8" className="before:content-[attr(data-t)]" />
          </span>
        </div>
        <span className="absolute left-[466px] w-[260px] top-[332px] text-center text-[14px] text-fg-4">
          <span data-t="dB margin at 96 MHz · Rev D" className="before:content-[attr(data-t)]" />
        </span>
        <svg className="absolute left-0 top-[446px]" width="720" height="110" viewBox="0 0 720 110">
          <path className="stroke-danger-strong" d="M0 34 H720" strokeWidth="1" strokeDasharray="5 5" opacity=".8" />
          <path
            className="stroke-accent-soft-line"
            d="M0 92 L40 88 L80 90 L120 84 L160 86 L200 78 L240 82 L270 60 L285 20 L300 64 L330 76 L380 80 L420 70 L450 74 L500 66 L540 72 L590 62 L630 70 L680 66 L720 72"
            fill="none"
            strokeWidth="1.6"
          />
        </svg>
      </div>
      <div className="absolute left-[24px] top-[44px] w-[466px] z-[2] bg-surface-3 border border-line-4 rounded-xl shadow-[0_30px_80px_color-mix(in_srgb,var(--color-black)_55%,transparent)] text-fg">
        <div className="h-[56px] flex items-center gap-[12px] pt-0 pr-[20px] pb-0 pl-[24px] border-b border-b-surface-7">
          <span className="text-[17px] font-medium whitespace-nowrap">
            <span data-t="ECO-214 · Change review" className="before:content-[attr(data-t)]" />
          </span>
          <span className="font-mono text-[11px] tracking-[.1em] text-fg-faint whitespace-nowrap">
            <span data-t="EARLY ACCESS" className="before:content-[attr(data-t)]" />
          </span>
          <span className="ml-auto flex gap-[14px]">
            <svg
              className="stroke-fg-muted flex-none block"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 6h16M7 12h10M10 18h4" />
            </svg>
            <svg
              className="stroke-fg-muted flex-none block"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12a9 9 0 1 0 3-6.7L3 8M3 3v5h5M12 7v5l3 2" />
            </svg>
            <svg
              className="stroke-fg-muted flex-none block"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </span>
        </div>
        <div className="pt-[22px] px-[24px] pb-[20px] flex flex-col gap-[16px]">
          <div className="self-end max-w-[360px] py-[11px] px-[16px] bg-surface-6 border border-line-4 rounded-[12px_12px_4px_12px] text-[16px] leading-[1.45]">
            <span data-t="What does ECO-214 do to our FCC evidence?" className="before:content-[attr(data-t)]" />
          </div>
          <div className="flex gap-[12px] items-start">
            <span className="w-[28px] h-[28px] flex-none rounded-md bg-hero-band flex items-center justify-center">
              <svg className="fill-white" width="14" height="14" viewBox="0 0 24 24">
                <path d="M12 3C12.8 8.5 15.5 11.2 21 12C15.5 12.8 12.8 15.5 12 21C11.2 15.5 8.5 12.8 3 12C8.5 11.2 11.2 8.5 12 3Z" />
              </svg>
            </span>
            <div className="flex-1 min-w-0 flex flex-col gap-[12px]">
              <span className="text-[16px] leading-[1.5] text-fg-2">
                <span data-t="Two changes touch evidence behind your FCC filing." className="before:content-[attr(data-t)]" />
              </span>
              <div className="bg-surface-1b border border-surface-7 rounded-card">
                <div
                  className="flex items-center gap-[12px] py-[9px] px-[14px] border-b border-b-surface-7"
                  data-r
                  style={{ "--i": 0 } as CSSProperties}
                >
                  <span className="w-[8px] h-[8px] flex-none rounded-full bg-warn block"></span>
                  <div className="flex-1 min-w-0 flex flex-col gap-[1px]">
                    <span className="text-[16px] whitespace-nowrap overflow-hidden text-ellipsis">
                      <span data-t="Radiated 88–216 MHz" className="before:content-[attr(data-t)]" />
                    </span>
                    <span className="text-[14px] text-warn">
                      <span data-t="At risk" className="before:content-[attr(data-t)]" />
                    </span>
                  </div>
                  <span className="h-[22px] flex-none inline-flex items-center gap-[6px] py-0 px-[7px] font-mono text-[11px] tracking-[.06em] text-warn border border-warn/50 rounded-xs whitespace-nowrap">
                    <span data-t="INFERRED" className="before:content-[attr(data-t)]" />
                  </span>
                  <span className="relative flex">
                    <span className="relative h-[22px] min-w-[26px] flex-none inline-flex items-center justify-center py-0 px-[6px] font-mono text-[12px] text-fg-3 bg-surface-7 border border-line-5 rounded-[5px] whitespace-nowrap">
                      <span data-t="[1]" className="before:content-[attr(data-t)]" />
                    </span>
                    <div
                      className="absolute left-[calc(100%_+_12px)] top-[-28px] w-[236px] z-[15] flex flex-col gap-[6px] py-[12px] px-[14px] bg-ink border border-line-6 rounded-card shadow-[0_18px_40px_color-mix(in_srgb,var(--color-black)_60%,transparent)] text-left"
                      data-tip
                    >
                      <span className="text-[14px] font-medium text-fg">
                        <span data-t="Rev D report · p.4" className="before:content-[attr(data-t)]" />
                      </span>
                      <span className="font-mono text-[13px] leading-[1.5] text-fg-4">
                        <span data-t="96.0 MHz H · 41.7 dBµV/m · margin −1.8 dB" className="before:content-[attr(data-t)]" />
                      </span>
                    </div>
                    <svg
                      className="absolute left-[10px] top-[10px] z-20 overflow-visible [filter:drop-shadow(0_3px_4px_color-mix(in_srgb,var(--color-black)_55%,transparent))] pointer-events-none"
                      data-cur
                      width="22"
                      height="26"
                      viewBox="0 0 22 26"
                      aria-hidden="true"
                    >
                      <path
                        className="fill-white stroke-ink"
                        d="M2 2 L2 20 L6.6 15.8 L9.6 23 L12.6 21.8 L9.7 14.8 L16 14.8 Z"
                        strokeWidth="1.4"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
                <div
                  className="flex items-center gap-[12px] py-[9px] px-[14px] border-b border-b-surface-7"
                  data-r
                  style={{ "--i": 1 } as CSSProperties}
                >
                  <span className="w-[8px] h-[8px] flex-none rounded-full bg-danger block"></span>
                  <div className="flex-1 min-w-0 flex flex-col gap-[1px]">
                    <span className="text-[16px] whitespace-nowrap overflow-hidden text-ellipsis">
                      <span data-t="Radio output power" className="before:content-[attr(data-t)]" />
                    </span>
                    <span className="text-[14px] text-danger">
                      <span data-t="Retest needed" className="before:content-[attr(data-t)]" />
                    </span>
                  </div>
                  <span className="h-[22px] flex-none inline-flex items-center gap-[6px] py-0 px-[7px] font-mono text-[11px] tracking-[.06em] text-ok border border-ok/50 rounded-xs whitespace-nowrap">
                    <span data-t="KNOWN" className="before:content-[attr(data-t)]" />
                  </span>
                  <span className="relative flex">
                    <span className="relative h-[22px] min-w-[26px] flex-none inline-flex items-center justify-center py-0 px-[6px] font-mono text-[12px] text-fg-3 bg-surface-7 border border-line-5 rounded-[5px] whitespace-nowrap">
                      <span data-t="[2]" className="before:content-[attr(data-t)]" />
                    </span>
                  </span>
                </div>
                <div
                  className="flex items-center gap-[12px] py-[9px] px-[14px] border-b border-b-surface-7"
                  data-r
                  style={{ "--i": 2 } as CSSProperties}
                >
                  <span className="w-[8px] h-[8px] flex-none rounded-full bg-fg-muted block"></span>
                  <div className="flex-1 min-w-0 flex flex-col gap-[1px]">
                    <span className="text-[16px] whitespace-nowrap overflow-hidden text-ellipsis">
                      <span data-t="ESD immunity" className="before:content-[attr(data-t)]" />
                    </span>
                    <span className="text-[14px] text-fg-muted">
                      <span data-t="Still valid" className="before:content-[attr(data-t)]" />
                    </span>
                  </div>
                  <span className="h-[22px] flex-none inline-flex items-center gap-[6px] py-0 px-[7px] font-mono text-[11px] tracking-[.06em] text-info border border-info/50 rounded-xs whitespace-nowrap">
                    <span data-t="OBSERVED" className="before:content-[attr(data-t)]" />
                  </span>
                  <span className="relative flex">
                    <span className="relative h-[22px] min-w-[26px] flex-none inline-flex items-center justify-center py-0 px-[6px] font-mono text-[12px] text-fg-3 bg-surface-7 border border-line-5 rounded-[5px] whitespace-nowrap">
                      <span data-t="+2" className="before:content-[attr(data-t)]" />
                    </span>
                  </span>
                </div>
                <div className="flex items-center gap-[12px] py-[9px] px-[14px]" data-r style={{ "--i": 3 } as CSSProperties}>
                  <span className="w-[9px] h-[9px] flex-none rounded-full border-[1.5px] border-dashed border-fg-muted block"></span>
                  <div className="flex-1 min-w-0 flex flex-col gap-[1px]">
                    <span className="text-[16px] whitespace-nowrap overflow-hidden text-ellipsis">
                      <span data-t="Enclosure shielding" className="before:content-[attr(data-t)]" />
                    </span>
                  </div>
                  <span className="h-[22px] flex-none inline-flex items-center gap-[6px] py-0 px-[7px] font-mono text-[11px] tracking-[.06em] text-fg-muted border border-fg-muted/50 rounded-xs whitespace-nowrap">
                    <span data-t="MISSING" className="before:content-[attr(data-t)]" />
                  </span>
                  <span className="relative flex">
                    <span className="relative h-[22px] min-w-[26px] flex-none inline-flex items-center justify-center py-0 px-[6px] font-mono text-[12px] text-fg-3 bg-surface-7 border border-line-5 rounded-[5px] whitespace-nowrap">
                      <span data-t="[2]" className="before:content-[attr(data-t)]" />
                    </span>
                  </span>
                </div>
              </div>
              <div className="flex gap-[14px] opacity-[.45]">
                <svg
                  className="stroke-fg-6 flex-none block"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 9h11v11H9zM5 15H4V4h11v1" />
                </svg>
                <svg
                  className="stroke-fg-6 flex-none block"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 10v10H4V10zM7 10l4-7c1.5 0 2.5 1 2.2 2.6L12.6 9H19a2 2 0 0 1 2 2.3l-1.2 6.9A2 2 0 0 1 17.8 20H7" />
                </svg>
                <svg
                  className="stroke-fg-6 flex-none block"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 14V4h3v10zM17 14l-4 7c-1.5 0-2.5-1-2.2-2.6l.6-3.4H5a2 2 0 0 1-2-2.3l1.2-6.9A2 2 0 0 1 6.2 4H17" />
                </svg>
                <svg className="fill-fg-6" width="15" height="15" viewBox="0 0 24 24">
                  <path d="M12 3C12.8 8.5 15.5 11.2 21 12C15.5 12.8 12.8 15.5 12 21C11.2 15.5 8.5 12.8 3 12C8.5 11.2 11.2 8.5 12 3Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
