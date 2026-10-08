import type { CSSProperties } from "react";

// Generated from the design markup (Crado Homepage.dc.html, data-scene="2"). Original artwork: gradient stops in the
// 3D tiles are illustration colours, not UI tokens. Step 03 (evidence and communications, early access): lab and team messages filed with the revision they belong to.
// Copy change from the design: "Sense Hub" (an invented product name) reads "Sensor hub", as elsewhere on the page.
// Text is drawn with CSS generated content (data-t) because the scene is decorative artwork (aria-hidden, described
// by its box's role="img" label): it should not be read or contrast-checked as page text.
// `p` prefixes SVG ids so the desktop and mobile copies of a scene never share an id.

export default function EvidenceScene({ p }: { p: string }) {
  return (
    <div
      className="absolute left-[50%] top-[50%] w-[720px] h-[560px] mt-[-280px] mr-0 mb-0 ml-[-360px] [transform-origin:50%_50%] font-display text-fg text-left scale-(--scene-scale)"
      data-scene
      data-scene-id="2"
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
        <div className="absolute left-[40px] right-[24px] top-[28px] grid grid-cols-[minmax(0,1fr)_100px_100px_100px] gap-y-[0] text-[14px] text-fg-4">
          <span className="h-[40px] flex items-center font-mono text-[12px] tracking-[.08em] text-fg-faint">
            <span data-t="EVIDENCE" className="before:content-[attr(data-t)]" />
          </span>
          <span className="h-[40px] flex items-center justify-center font-mono text-[13px] text-fg-6">
            <span data-t="Rev C" className="before:content-[attr(data-t)]" />
          </span>
          <span className="h-[40px] flex items-center justify-center font-mono text-[13px] text-fg-6">
            <span data-t="Rev D" className="before:content-[attr(data-t)]" />
          </span>
          <span className="h-[40px] flex items-center justify-center font-mono text-[13px] text-fg-6">
            <span data-t="Rev E" className="before:content-[attr(data-t)]" />
          </span>
          <span className="h-[56px] flex items-center border-t border-t-surface-7">
            <span data-t="Radiated 30–230 MHz" className="before:content-[attr(data-t)]" />
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-ok block"></span>
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-warn block"></span>
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-ok block"></span>
          </span>
          <span className="h-[56px] flex items-center border-t border-t-surface-7">
            <span data-t="Conducted, DC input" className="before:content-[attr(data-t)]" />
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-ok block"></span>
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-warn block"></span>
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-warn block"></span>
          </span>
          <span className="h-[56px] flex items-center border-t border-t-surface-7">
            <span data-t="Radio output power" className="before:content-[attr(data-t)]" />
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-ok block"></span>
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-ok block"></span>
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-danger block"></span>
          </span>
          <span className="h-[56px] flex items-center border-t border-t-surface-7">
            <span data-t="ESD immunity" className="before:content-[attr(data-t)]" />
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-ok block"></span>
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-ok block"></span>
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-ok block"></span>
          </span>
          <span className="h-[56px] flex items-center border-t border-t-surface-7">
            <span data-t="Enclosure shielding" className="before:content-[attr(data-t)]" />
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-fg-faint block"></span>
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[9px] h-[9px] flex-none rounded-full border-[1.5px] border-dashed border-fg-muted block"></span>
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[9px] h-[9px] flex-none rounded-full border-[1.5px] border-dashed border-fg-muted block"></span>
          </span>
          <span className="h-[56px] flex items-center border-t border-t-surface-7">
            <span data-t="Antenna gain" className="before:content-[attr(data-t)]" />
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-ok block"></span>
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-ok block"></span>
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-warn block"></span>
          </span>
          <span className="h-[56px] flex items-center border-t border-t-surface-7">
            <span data-t="Radiated 230 MHz–1 GHz" className="before:content-[attr(data-t)]" />
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-ok block"></span>
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-warn block"></span>
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-ok block"></span>
          </span>
          <span className="h-[56px] flex items-center border-t border-t-surface-7">
            <span data-t="Thermal, enclosure" className="before:content-[attr(data-t)]" />
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-ok block"></span>
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-fg-faint block"></span>
          </span>
          <span className="h-[56px] flex items-center justify-center border-t border-t-surface-7">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-fg-faint block"></span>
          </span>
        </div>
      </div>
      <div className="absolute left-[28px] top-[28px] w-[480px] z-[2] bg-surface-3 border border-line-4 rounded-xl shadow-[0_30px_80px_color-mix(in_srgb,var(--color-black)_55%,transparent)] text-fg">
        <div className="h-[56px] flex items-center gap-[12px] pt-0 pr-[20px] pb-0 pl-[24px] border-b border-b-surface-7">
          <span className="text-[17px] font-medium whitespace-nowrap">
            <span data-t="Sensor hub · Linked evidence" className="before:content-[attr(data-t)]" />
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
        <div className="pt-[16px] px-[24px] pb-0 text-[14px] leading-[1.5] text-fg-6">
          <span
            data-t="Reports, emails and decisions linked to each revision. Every item keeps its source."
            className="before:content-[attr(data-t)]"
          />
        </div>
        <div className="pt-[10px] px-[12px] pb-0 flex flex-col">
          <div className="flex items-center gap-[12px] h-[60px] py-0 px-[12px] rounded-md" data-r style={{ "--i": 0 } as CSSProperties}>
            <span className="w-[36px] h-[36px] flex-none rounded-[9px] bg-surface-6 border border-line-4 flex items-center justify-center">
              <span className="w-[16px] h-[20px] rounded-[3px] bg-danger-strong text-white font-mono text-[6px] flex items-center justify-center">
                <span data-t="PDF" className="before:content-[attr(data-t)]" />
              </span>
            </span>
            <div className="flex-1 min-w-0 flex flex-col gap-[1px]">
              <span className="text-[14px] text-fg-muted">
                <span data-t="Report" className="before:content-[attr(data-t)]" />
              </span>
              <span className="text-[16px] whitespace-nowrap overflow-hidden text-ellipsis">
                <span data-t="Rev D report.pdf" className="before:content-[attr(data-t)]" />
              </span>
            </div>
            <span className="h-[24px] flex-none flex items-center py-0 px-[8px] rounded-sm bg-line-1 border border-line-4 font-mono text-[13px] text-fg-3 whitespace-nowrap">
              <span data-t="Rev D" className="before:content-[attr(data-t)]" />
            </span>
            <span className="w-[26px] h-[26px] flex-none rounded-full bg-line-4b text-fg-3 text-[10.5px] font-medium flex items-center justify-center">
              <span data-t="PS" className="before:content-[attr(data-t)]" />
            </span>
          </div>
          <div className="flex items-center gap-[12px] h-[60px] py-0 px-[12px] rounded-md" data-r style={{ "--i": 1 } as CSSProperties}>
            <span className="w-[36px] h-[36px] flex-none rounded-[9px] bg-surface-6 border border-line-4 flex items-center justify-center">
              <svg
                className="stroke-fg-4 flex-none block"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18v12H3zM3 7l9 6 9-6" />
              </svg>
            </span>
            <div className="flex-1 min-w-0 flex flex-col gap-[1px]">
              <span className="text-[14px] text-fg-muted">
                <span data-t="Lab email" className="before:content-[attr(data-t)]" />
              </span>
              <span className="text-[16px] whitespace-nowrap overflow-hidden text-ellipsis">
                <span data-t="Re: Rev E samples" className="before:content-[attr(data-t)]" />
              </span>
            </div>
            <span className="h-[24px] flex-none flex items-center py-0 px-[8px] rounded-sm bg-line-1 border border-line-4 font-mono text-[13px] text-fg-3 whitespace-nowrap">
              <span data-t="Rev E" className="before:content-[attr(data-t)]" />
            </span>
            <span className="w-[26px] h-[26px] flex-none rounded-full bg-line-4b text-fg-3 text-[10.5px] font-medium flex items-center justify-center">
              <span data-t="HE" className="before:content-[attr(data-t)]" />
            </span>
          </div>
          <div className="flex items-center gap-[12px] h-[60px] py-0 px-[12px] rounded-md" data-r style={{ "--i": 2 } as CSSProperties}>
            <span className="w-[36px] h-[36px] flex-none rounded-[9px] bg-surface-6 border border-line-4 flex items-center justify-center">
              <svg
                className="stroke-fg-4 flex-none block"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 5h16v11H9l-5 4z" />
              </svg>
            </span>
            <div className="flex-1 min-w-0 flex flex-col gap-[1px]">
              <span className="text-[14px] text-fg-muted">
                <span data-t="Team chat" className="before:content-[attr(data-t)]" />
              </span>
              <span className="text-[16px] whitespace-nowrap overflow-hidden text-ellipsis">
                <span data-t="Unshielded cable approved" className="before:content-[attr(data-t)]" />
              </span>
            </div>
            <span className="h-[24px] flex-none flex items-center py-0 px-[8px] rounded-sm bg-line-1 border border-line-4 font-mono text-[13px] text-fg-3 whitespace-nowrap">
              <span data-t="Rev E" className="before:content-[attr(data-t)]" />
            </span>
            <span className="w-[26px] h-[26px] flex-none rounded-full bg-line-4b text-fg-3 text-[10.5px] font-medium flex items-center justify-center">
              <span data-t="SL" className="before:content-[attr(data-t)]" />
            </span>
          </div>
          <div className="flex items-center gap-[12px] h-[60px] py-0 px-[12px] rounded-md" data-r style={{ "--i": 3 } as CSSProperties}>
            <span className="w-[36px] h-[36px] flex-none rounded-[9px] bg-surface-6 border border-line-4 flex items-center justify-center">
              <svg
                className="stroke-fg-4 flex-none block"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4z" />
              </svg>
            </span>
            <div className="flex-1 min-w-0 flex flex-col gap-[1px]">
              <span className="text-[14px] text-fg-muted">
                <span data-t="ECO-214" className="before:content-[attr(data-t)]" />
              </span>
              <span className="text-[16px] whitespace-nowrap overflow-hidden text-ellipsis">
                <span data-t="Buck regulator swap" className="before:content-[attr(data-t)]" />
              </span>
            </div>
            <span className="h-[24px] flex-none flex items-center py-0 px-[8px] rounded-sm bg-line-1 border border-line-4 font-mono text-[13px] text-fg-3 whitespace-nowrap">
              <span data-t="Rev D → Rev E" className="before:content-[attr(data-t)]" />
            </span>
            <span className="w-[26px] h-[26px] flex-none rounded-full bg-line-4b text-fg-3 text-[10.5px] font-medium flex items-center justify-center">
              <span data-t="PS" className="before:content-[attr(data-t)]" />
            </span>
          </div>
          <div className="flex items-center gap-[12px] h-[60px] py-0 px-[12px] rounded-md" data-new>
            <span className="w-[36px] h-[36px] flex-none rounded-[9px] bg-surface-6 border border-line-4 flex items-center justify-center">
              <svg
                className="stroke-fg-4 flex-none block"
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18v12H3zM3 7l9 6 9-6" />
              </svg>
            </span>
            <div className="flex-1 min-w-0 flex flex-col gap-[1px]">
              <span className="text-[14px] text-fg-muted">
                <span data-t="Lab email" className="before:content-[attr(data-t)]" />
              </span>
              <span className="text-[16px] whitespace-nowrap overflow-hidden text-ellipsis">
                <span data-t="Retest slot" className="before:content-[attr(data-t)]" />
              </span>
            </div>
            <span className="h-[24px] flex-none flex items-center py-0 px-[8px] rounded-sm bg-line-1 border border-line-4 font-mono text-[13px] text-fg-3 whitespace-nowrap">
              <span data-t="Rev E" className="before:content-[attr(data-t)]" />
            </span>
            <span className="w-[26px] h-[26px] flex-none rounded-full bg-line-4b text-fg-3 text-[10.5px] font-medium flex items-center justify-center">
              <span data-t="HE" className="before:content-[attr(data-t)]" />
            </span>
          </div>
        </div>
        <div className="pt-[8px] px-[24px] pb-[20px]">
          <span className="h-[36px] inline-flex items-center gap-[8px] py-0 px-[12px] rounded-md border border-dashed border-line-6 text-[14px] text-fg-6 opacity-[.6]">
            <svg
              className="stroke-fg-6 flex-none block"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span data-t="Link evidence" className="before:content-[attr(data-t)]" />
          </span>
        </div>
      </div>
      <div
        className="absolute left-[420px] top-[92px] w-[290px] z-[4] p-[6px] bg-surface-4 border border-line-6 rounded-lg shadow-[0_24px_60px_color-mix(in_srgb,var(--color-black)_60%,transparent)] [transform-origin:50%_0]"
        data-dd2
      >
        <div className="h-[44px] flex items-center gap-[10px] py-0 px-[10px] mb-[4px] border-b border-b-line-4">
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
            <path d="M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-4.3-4.3" />
          </svg>
          <span className="text-[15px] text-fg-muted">
            <span data-t="Find or link evidence…" className="before:content-[attr(data-t)]" />
          </span>
        </div>
        <div className="relative h-[44px] flex items-center gap-[10px] py-0 px-[12px] rounded-[7px] text-[15px] text-fg-2">
          <span className="relative flex">
            <span className="w-[16px] h-[20px] rounded-[3px] bg-danger-strong text-white font-mono text-[6px] flex items-center justify-center">
              <span data-t="PDF" className="before:content-[attr(data-t)]" />
            </span>
          </span>
          <span className="relative whitespace-nowrap overflow-hidden text-ellipsis">
            <span data-t="Rev C report.pdf" className="before:content-[attr(data-t)]" />
          </span>
        </div>
        <div className="relative h-[44px] flex items-center gap-[10px] py-0 px-[12px] rounded-[7px] text-[15px] text-fg-2">
          <span
            className="absolute inset-0 rounded-[7px] bg-accent-vivid/18 shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--color-accent-vivid)_60%,transparent)] block"
            data-hl2
          ></span>
          <span className="relative flex">
            <svg
              className="stroke-fg-4 flex-none block"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18v12H3zM3 7l9 6 9-6" />
            </svg>
          </span>
          <span className="relative whitespace-nowrap overflow-hidden text-ellipsis">
            <span data-t="Lab email · Retest slot" className="before:content-[attr(data-t)]" />
          </span>
          <svg
            className="absolute left-[150px] top-[20px] z-20 overflow-visible [filter:drop-shadow(0_3px_4px_color-mix(in_srgb,var(--color-black)_55%,transparent))] pointer-events-none"
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
        </div>
        <div className="relative h-[44px] flex items-center gap-[10px] py-0 px-[12px] rounded-[7px] text-[15px] text-fg-2">
          <span className="relative flex">
            <svg
              className="stroke-fg-4 flex-none block"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18v12H3zM3 7l9 6 9-6" />
            </svg>
          </span>
          <span className="relative whitespace-nowrap overflow-hidden text-ellipsis">
            <span data-t="Supplier email · Ferrite datasheet" className="before:content-[attr(data-t)]" />
          </span>
        </div>
        <div className="relative h-[44px] flex items-center gap-[10px] py-0 px-[12px] rounded-[7px] text-[15px] text-fg-2">
          <span className="relative flex">
            <svg
              className="stroke-fg-4 flex-none block"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg>
          </span>
          <span className="relative whitespace-nowrap overflow-hidden text-ellipsis">
            <span data-t="Design review · Rev E" className="before:content-[attr(data-t)]" />
          </span>
        </div>
      </div>
      <div
        className="absolute left-0 top-[448px] w-[248px] z-[4] p-[10px] bg-surface-4 border border-line-6 rounded-lg shadow-[0_24px_60px_color-mix(in_srgb,var(--color-black)_60%,transparent)]"
        data-doc
        data-float
      >
        <div className="flex items-center gap-[12px]">
          <div className="relative w-[60px] h-[60px] flex-none rounded-[9px] overflow-hidden [background:linear-gradient(160deg,_#8A2C52,_#2E0B1C)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-white)_14%,transparent)]">
            <span className="absolute left-[-20%] top-[-60%] w-[90%] h-[120%] [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-white)_16%,transparent),_color-mix(in_srgb,var(--color-white)_0%,transparent))] block"></span>
            <svg className="relative block" viewBox="20 0 80 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`${p}u17q`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#FFFFFF" />
                  <stop offset="1" stopColor="#E2DCE8" />
                </linearGradient>
              </defs>
              <ellipse className="fill-black" cx="60" cy="71" rx="38" ry="4.5" opacity=".35" />
              <g transform="rotate(-8 62 40)">
                <path className="fill-black" d="M40 10 H75 L87 22 V72 H40 Z" opacity=".25" transform="translate(2.5 2.5)" />
                <path d="M40 10 H75 L87 22 V72 H40 Z" fill={`url(#${p}u17q)`} />
                <path d="M75 10 V22 H87 Z" fill="#CBC3D4" />
                <rect className="fill-danger-strong" x="46" y="18" width="22" height="5" rx="1.5" />
                <rect x="46" y="29" width="34" height="2.6" rx="1.3" fill="#C8C1D2" />
                <rect x="46" y="35" width="28" height="2.6" rx="1.3" fill="#C8C1D2" />
                <path className="stroke-danger-strong" d="M46 52 H81" strokeWidth=".9" strokeDasharray="2 1.6" />
                <path
                  className="stroke-accent-vivid"
                  d="M46 64 L52 58 L57 61 L63 47 L69 57 L80 54"
                  fill="none"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <path className="fill-white" d="M40 10 H75 L76.5 11.5 H41.5 V72 H40 Z" opacity=".8" />
              </g>
            </svg>
          </div>
          <div className="flex flex-col gap-[3px]">
            <span className="text-[16px] font-medium">
              <span data-t="Rev D report" className="before:content-[attr(data-t)]" />
            </span>
            <span className="text-[14px] text-fg-muted">
              <span data-t="PDF · 6m ago · PS" className="before:content-[attr(data-t)]" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
