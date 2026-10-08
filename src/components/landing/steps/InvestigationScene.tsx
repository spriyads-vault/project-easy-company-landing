import type { CSSProperties } from "react";

// Generated from the design markup (Crado Homepage.dc.html, data-scene="1"). Original artwork: gradient stops in the
// 3D tiles are illustration colours, not UI tokens. Step 02 (failure investigation): the question typed into a case, ranked likely causes, a suggested next test and the Rev E retest.
// Text is drawn with CSS generated content (data-t) because the scene is decorative artwork (aria-hidden, described
// by its box's role="img" label): it should not be read or contrast-checked as page text.
// `p` prefixes SVG ids so the desktop and mobile copies of a scene never share an id.

export default function InvestigationScene({ p }: { p: string }) {
  return (
    <div
      className="absolute left-[50%] top-[50%] w-[720px] h-[560px] mt-[-280px] mr-0 mb-0 ml-[-360px] [transform-origin:50%_50%] font-display text-fg text-left scale-(--scene-scale)"
      data-scene
      data-scene-id="1"
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-accent-vivid)_10%,transparent),_color-mix(in_srgb,var(--color-accent-vivid)_0%,transparent))] pointer-events-none"
        aria-hidden="true"
      ></div>
      <div
        className="absolute inset-0 [mask-image:radial-gradient(ellipse_72%_72%_at_50%_50%,_var(--color-black)_40%,_transparent_100%)] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="absolute left-[-136px] top-[-44px] w-[200px] h-[140px] p-[8px] flex flex-col gap-[8px] bg-surface-3 border border-line-4 rounded-lg"
          data-bg
        >
          <div className="relative w-full h-[72px] flex-none rounded-md overflow-hidden [background:linear-gradient(160deg,_#8A2C52,_#2E0B1C)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-white)_14%,transparent)]">
            <span className="absolute left-[-20%] top-[-60%] w-[90%] h-[120%] [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-white)_16%,transparent),_color-mix(in_srgb,var(--color-white)_0%,transparent))] block"></span>
            <svg className="relative block" viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`${p}u1q`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#FFFFFF" />
                  <stop offset="1" stopColor="#E2DCE8" />
                </linearGradient>
              </defs>
              <ellipse className="fill-black" cx="60" cy="71" rx="38" ry="4.5" opacity=".35" />
              <g transform="rotate(-8 62 40)">
                <path className="fill-black" d="M40 10 H75 L87 22 V72 H40 Z" opacity=".25" transform="translate(2.5 2.5)" />
                <path d="M40 10 H75 L87 22 V72 H40 Z" fill={`url(#${p}u1q)`} />
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
          <div className="flex flex-col gap-[5px] py-0 px-[4px]">
            <span className="text-[13px] font-medium text-fg whitespace-nowrap overflow-hidden text-ellipsis">
              <span data-t="Rev C baseline" className="before:content-[attr(data-t)]" />
            </span>
            <span className="flex items-center gap-[6px] text-[11.5px] text-fg-muted">
              <span>
                <span data-t="2w ago" className="before:content-[attr(data-t)]" />
              </span>
              <span className="ml-auto w-[18px] h-[18px] rounded-full bg-line-4b text-fg-3 text-[8.5px] flex items-center justify-center">
                <span data-t="PS" className="before:content-[attr(data-t)]" />
              </span>
              <span className="h-[18px] py-0 px-[5px] rounded-xs bg-surface-7 font-mono text-[10px] text-fg-4 flex items-center">
                <span data-t="5" className="before:content-[attr(data-t)]" />
              </span>
            </span>
          </div>
        </div>
        <div
          className="absolute left-[-136px] top-[112px] w-[200px] h-[140px] p-[8px] flex flex-col gap-[8px] bg-surface-3 border border-line-4 rounded-lg"
          data-bg
        >
          <div className="relative w-full h-[72px] flex-none rounded-md overflow-hidden [background:linear-gradient(160deg,_#17663F,_#062417)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-white)_14%,transparent)]">
            <span className="absolute left-[-20%] top-[-60%] w-[90%] h-[120%] [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-white)_16%,transparent),_color-mix(in_srgb,var(--color-white)_0%,transparent))] block"></span>
            <svg className="relative block" viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`${p}u2p`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#4FD18F" />
                  <stop offset="1" stopColor="#127046" />
                </linearGradient>
                <linearGradient id={`${p}u2c`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#4A4E5C" />
                  <stop offset="1" stopColor="#1E2028" />
                </linearGradient>
              </defs>
              <ellipse className="fill-black" cx="60" cy="71" rx="38" ry="4.5" opacity=".35" />
              <path d="M16 37 L60 59 L60 64 L16 42 Z" fill="#0C4A2C" />
              <path d="M60 59 L104 37 L104 42 L60 64 Z" fill="#073620" />
              <path d="M60 15 L104 37 L60 59 L16 37 Z" fill={`url(#${p}u2p)`} />
              <path className="fill-white" d="M60 15 L104 37 L98 40 L60 21 L22 40 L16 37 Z" opacity=".18" />
              <path
                className="stroke-warn-3"
                d="M30 37 L44 30 L58 37 M66 41 L80 34 L90 39 M40 44 L54 37 M62 26 L76 33"
                fill="none"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <circle className="fill-warn-3" cx="44" cy="30" r="1.6" />
              <circle className="fill-warn-3" cx="80" cy="34" r="1.6" />
              <path d="M60 29 L72 35 L72 39 L60 45 L48 39 L48 35 Z" fill="#14161C" />
              <path d="M60 29 L72 35 L60 41 L48 35 Z" fill={`url(#${p}u2c)`} />
              <path className="stroke-white" d="M48 35 L60 29 L72 35" fill="none" strokeOpacity=".35" strokeWidth=".8" />
              <path d="M80 41 L87 44.5 L80 48 L73 44.5 Z" fill="#2A2D36" />
              <path d="M36 43 L42 46 L36 49 L30 46 Z" fill="#E9E4D4" />
            </svg>
          </div>
          <div className="flex flex-col gap-[5px] py-0 px-[4px]">
            <span className="text-[13px] font-medium text-fg whitespace-nowrap overflow-hidden text-ellipsis">
              <span data-t="Conducted emissions" className="before:content-[attr(data-t)]" />
            </span>
            <span className="flex items-center gap-[6px] text-[11.5px] text-fg-muted">
              <span>
                <span data-t="1w ago" className="before:content-[attr(data-t)]" />
              </span>
              <span className="ml-auto w-[18px] h-[18px] rounded-full bg-line-4b text-fg-3 text-[8.5px] flex items-center justify-center">
                <span data-t="SL" className="before:content-[attr(data-t)]" />
              </span>
              <span className="h-[18px] py-0 px-[5px] rounded-xs bg-surface-7 font-mono text-[10px] text-fg-4 flex items-center">
                <span data-t="2" className="before:content-[attr(data-t)]" />
              </span>
            </span>
          </div>
        </div>
        <div
          className="absolute left-[-136px] top-[268px] w-[200px] h-[140px] p-[8px] flex flex-col gap-[8px] bg-surface-3 border border-line-4 rounded-lg"
          data-bg
        >
          <div className="relative w-full h-[72px] flex-none rounded-md overflow-hidden [background:linear-gradient(160deg,_#22348A,_#0A1238)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-white)_14%,transparent)]">
            <span className="absolute left-[-20%] top-[-60%] w-[90%] h-[120%] [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-white)_16%,transparent),_color-mix(in_srgb,var(--color-white)_0%,transparent))] block"></span>
            <svg className="relative block" viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`${p}u3b`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#F1F3FA" />
                  <stop offset="1" stopColor="#8990A8" />
                </linearGradient>
                <linearGradient id={`${p}u3s`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0E1C46" />
                  <stop offset="1" stopColor="#050B22" />
                </linearGradient>
                <radialGradient id={`${p}u3k`} cx=".35" cy=".3" r=".8">
                  <stop offset="0" stopColor="#FFFFFF" />
                  <stop offset="1" stopColor="#5C6380" />
                </radialGradient>
                <filter id={`${p}u3f`} x="-20%" y="-50%" width="140%" height="200%">
                  <feGaussianBlur stdDeviation="1.4" />
                </filter>
              </defs>
              <ellipse className="fill-black" cx="60" cy="71" rx="38" ry="4.5" opacity=".35" />
              <g transform="translate(60 42) skewY(-5) translate(-60 -42)">
                <rect x="21" y="17" width="78" height="50" rx="7" fill={`url(#${p}u3b)`} />
                <rect className="fill-white" x="23" y="18" width="74" height="7" rx="3.5" opacity=".55" />
                <rect x="26" y="23" width="52" height="38" rx="3.5" fill={`url(#${p}u3s)`} />
                <path className="stroke-danger-2" d="M28 39 H76" strokeWidth=".9" strokeDasharray="2 2" />
                <path
                  d="M28 55 L35 54 L40 52 L45 53 L49 47 L51 29 L53 47 L57 51 L63 52 L69 54 L76 53"
                  fill="none"
                  stroke="#7FB2FF"
                  strokeWidth="2.4"
                  filter={`url(#${p}u3f)`}
                  opacity=".8"
                />
                <path
                  d="M28 55 L35 54 L40 52 L45 53 L49 47 L51 29 L53 47 L57 51 L63 52 L69 54 L76 53"
                  fill="none"
                  stroke="#D6E6FF"
                  strokeWidth="1.1"
                />
                <circle cx="88" cy="32" r="4.6" fill={`url(#${p}u3k)`} />
                <circle cx="88" cy="45" r="3.4" fill={`url(#${p}u3k)`} />
                <rect className="fill-accent-vivid" x="82" y="54" width="12" height="4" rx="2" />
              </g>
            </svg>
          </div>
          <div className="flex flex-col gap-[5px] py-0 px-[4px]">
            <span className="text-[13px] font-medium text-fg whitespace-nowrap overflow-hidden text-ellipsis">
              <span data-t="Radio output power" className="before:content-[attr(data-t)]" />
            </span>
            <span className="flex items-center gap-[6px] text-[11.5px] text-fg-muted">
              <span>
                <span data-t="4d ago" className="before:content-[attr(data-t)]" />
              </span>
              <span className="ml-auto w-[18px] h-[18px] rounded-full bg-line-4b text-fg-3 text-[8.5px] flex items-center justify-center">
                <span data-t="PS" className="before:content-[attr(data-t)]" />
              </span>
              <span className="h-[18px] py-0 px-[5px] rounded-xs bg-surface-7 font-mono text-[10px] text-fg-4 flex items-center">
                <span data-t="3" className="before:content-[attr(data-t)]" />
              </span>
            </span>
          </div>
        </div>
        <div
          className="absolute left-[-136px] top-[424px] w-[200px] h-[140px] p-[8px] flex flex-col gap-[8px] bg-surface-3 border border-line-4 rounded-lg"
          data-bg
        >
          <div className="relative w-full h-[72px] flex-none rounded-md overflow-hidden [background:linear-gradient(160deg,_#4B2789,_#170933)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-white)_14%,transparent)]">
            <span className="absolute left-[-20%] top-[-60%] w-[90%] h-[120%] [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-white)_16%,transparent),_color-mix(in_srgb,var(--color-white)_0%,transparent))] block"></span>
            <svg className="relative block" viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`${p}u4h`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FBE0BE" />
                  <stop offset=".55" stopColor="#C98B52" />
                  <stop offset="1" stopColor="#8A5428" />
                </linearGradient>
                <linearGradient id={`${p}u4w`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#E9B985" />
                  <stop offset="1" stopColor="#8A5428" />
                </linearGradient>
              </defs>
              <ellipse className="fill-black" cx="60" cy="71" rx="38" ry="4.5" opacity=".35" />
              <path d="M50 52 L46 70 M50 52 L54 70" stroke="#9AA0B2" strokeWidth="2" strokeLinecap="round" />
              <rect x="16" y="33" width="22" height="14" rx="2" fill={`url(#${p}u4w)`} />
              <path d="M38 33 L94 13 L94 67 L38 47 Z" fill={`url(#${p}u4h)`} />
              <path className="stroke-white" d="M38 33 L94 13" strokeOpacity=".7" strokeWidth="1.2" />
              <path d="M94 13 L104 19 L104 73 L94 67 Z" fill="#6E3F1C" />
              <path d="M96 17 L102 21 L102 69 L96 65 Z" fill="#2A1508" />
            </svg>
          </div>
          <div className="flex flex-col gap-[5px] py-0 px-[4px]">
            <span className="text-[13px] font-medium text-fg whitespace-nowrap overflow-hidden text-ellipsis">
              <span data-t="ESD immunity" className="before:content-[attr(data-t)]" />
            </span>
            <span className="flex items-center gap-[6px] text-[11.5px] text-fg-muted">
              <span>
                <span data-t="2w ago" className="before:content-[attr(data-t)]" />
              </span>
              <span className="ml-auto w-[18px] h-[18px] rounded-full bg-line-4b text-fg-3 text-[8.5px] flex items-center justify-center">
                <span data-t="HE" className="before:content-[attr(data-t)]" />
              </span>
              <span className="h-[18px] py-0 px-[5px] rounded-xs bg-surface-7 font-mono text-[10px] text-fg-4 flex items-center">
                <span data-t="1" className="before:content-[attr(data-t)]" />
              </span>
            </span>
          </div>
        </div>
        <div
          className="absolute left-[80px] top-[-44px] w-[200px] h-[140px] p-[8px] flex flex-col gap-[8px] bg-surface-3 border border-line-4 rounded-lg"
          data-bg
        >
          <div className="relative w-full h-[72px] flex-none rounded-md overflow-hidden [background:linear-gradient(160deg,_#7A2234,_#2A0911)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-white)_14%,transparent)]">
            <span className="absolute left-[-20%] top-[-60%] w-[90%] h-[120%] [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-white)_16%,transparent),_color-mix(in_srgb,var(--color-white)_0%,transparent))] block"></span>
            <svg className="relative block" viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`${p}u5r`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#9A9AA6" />
                  <stop offset=".45" stopColor="#3A3A42" />
                  <stop offset="1" stopColor="#55555F" />
                </linearGradient>
              </defs>
              <ellipse className="fill-black" cx="60" cy="71" rx="38" ry="4.5" opacity=".35" />
              <path
                className="stroke-surface-3"
                d="M6 60 C30 60 36 42 60 42 C84 42 90 24 114 24"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
              <path
                className="stroke-fg-dim"
                d="M6 58.5 C30 58.5 36 40.5 60 40.5 C84 40.5 90 22.5 114 22.5"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                opacity=".7"
              />
              <g transform="rotate(-24 60 42)">
                <rect x="42" y="31" width="36" height="22" rx="5" fill={`url(#${p}u5r)`} />
                <rect className="fill-white" x="44" y="33" width="32" height="3.5" rx="1.75" opacity=".45" />
                <ellipse className="fill-line-5b" cx="78" cy="42" rx="5.5" ry="11" />
                <ellipse cx="78" cy="42" rx="2.4" ry="4.6" fill="#0E0E12" />
              </g>
            </svg>
          </div>
          <div className="flex flex-col gap-[5px] py-0 px-[4px]">
            <span className="text-[13px] font-medium text-fg whitespace-nowrap overflow-hidden text-ellipsis">
              <span data-t="Case 0039 · USB noise" className="before:content-[attr(data-t)]" />
            </span>
            <span className="flex items-center gap-[6px] text-[11.5px] text-fg-muted">
              <span>
                <span data-t="1d ago" className="before:content-[attr(data-t)]" />
              </span>
              <span className="ml-auto w-[18px] h-[18px] rounded-full bg-line-4b text-fg-3 text-[8.5px] flex items-center justify-center">
                <span data-t="SL" className="before:content-[attr(data-t)]" />
              </span>
              <span className="h-[18px] py-0 px-[5px] rounded-xs bg-surface-7 font-mono text-[10px] text-fg-4 flex items-center">
                <span data-t="4" className="before:content-[attr(data-t)]" />
              </span>
            </span>
          </div>
        </div>
        <div
          className="absolute left-[80px] top-[112px] w-[200px] h-[140px] p-[8px] flex flex-col gap-[8px] bg-surface-3 border border-line-4 rounded-lg"
          data-bg
        >
          <div className="relative w-full h-[72px] flex-none rounded-md overflow-hidden [background:linear-gradient(160deg,_#7A2234,_#2A0911)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-white)_14%,transparent)]">
            <span className="absolute left-[-20%] top-[-60%] w-[90%] h-[120%] [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-white)_16%,transparent),_color-mix(in_srgb,var(--color-white)_0%,transparent))] block"></span>
            <svg className="relative block" viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`${p}u6r`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#9A9AA6" />
                  <stop offset=".45" stopColor="#3A3A42" />
                  <stop offset="1" stopColor="#55555F" />
                </linearGradient>
              </defs>
              <ellipse className="fill-black" cx="60" cy="71" rx="38" ry="4.5" opacity=".35" />
              <path
                className="stroke-surface-3"
                d="M6 60 C30 60 36 42 60 42 C84 42 90 24 114 24"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
              <path
                className="stroke-fg-dim"
                d="M6 58.5 C30 58.5 36 40.5 60 40.5 C84 40.5 90 22.5 114 22.5"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                opacity=".7"
              />
              <g transform="rotate(-24 60 42)">
                <rect x="42" y="31" width="36" height="22" rx="5" fill={`url(#${p}u6r)`} />
                <rect className="fill-white" x="44" y="33" width="32" height="3.5" rx="1.75" opacity=".45" />
                <ellipse className="fill-line-5b" cx="78" cy="42" rx="5.5" ry="11" />
                <ellipse cx="78" cy="42" rx="2.4" ry="4.6" fill="#0E0E12" />
              </g>
            </svg>
          </div>
          <div className="flex flex-col gap-[5px] py-0 px-[4px]">
            <span className="text-[13px] font-medium text-fg whitespace-nowrap overflow-hidden text-ellipsis">
              <span data-t="Supplier datasheet" className="before:content-[attr(data-t)]" />
            </span>
            <span className="flex items-center gap-[6px] text-[11.5px] text-fg-muted">
              <span>
                <span data-t="6d ago" className="before:content-[attr(data-t)]" />
              </span>
              <span className="ml-auto w-[18px] h-[18px] rounded-full bg-line-4b text-fg-3 text-[8.5px] flex items-center justify-center">
                <span data-t="SL" className="before:content-[attr(data-t)]" />
              </span>
              <span className="h-[18px] py-0 px-[5px] rounded-xs bg-surface-7 font-mono text-[10px] text-fg-4 flex items-center">
                <span data-t="2" className="before:content-[attr(data-t)]" />
              </span>
            </span>
          </div>
        </div>
        <div
          className="absolute left-[80px] top-[268px] w-[200px] h-[140px] p-[8px] flex flex-col gap-[8px] bg-surface-3 border border-line-4 rounded-lg"
          data-bg
        >
          <div className="relative w-full h-[72px] flex-none rounded-md overflow-hidden [background:linear-gradient(160deg,_#8A2C52,_#2E0B1C)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-white)_14%,transparent)]">
            <span className="absolute left-[-20%] top-[-60%] w-[90%] h-[120%] [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-white)_16%,transparent),_color-mix(in_srgb,var(--color-white)_0%,transparent))] block"></span>
            <svg className="relative block" viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`${p}u7q`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#FFFFFF" />
                  <stop offset="1" stopColor="#E2DCE8" />
                </linearGradient>
              </defs>
              <ellipse className="fill-black" cx="60" cy="71" rx="38" ry="4.5" opacity=".35" />
              <g transform="rotate(-8 62 40)">
                <path className="fill-black" d="M40 10 H75 L87 22 V72 H40 Z" opacity=".25" transform="translate(2.5 2.5)" />
                <path d="M40 10 H75 L87 22 V72 H40 Z" fill={`url(#${p}u7q)`} />
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
          <div className="flex flex-col gap-[5px] py-0 px-[4px]">
            <span className="text-[13px] font-medium text-fg whitespace-nowrap overflow-hidden text-ellipsis">
              <span data-t="Design review · Rev E" className="before:content-[attr(data-t)]" />
            </span>
            <span className="flex items-center gap-[6px] text-[11.5px] text-fg-muted">
              <span>
                <span data-t="3d ago" className="before:content-[attr(data-t)]" />
              </span>
              <span className="ml-auto w-[18px] h-[18px] rounded-full bg-line-4b text-fg-3 text-[8.5px] flex items-center justify-center">
                <span data-t="PS" className="before:content-[attr(data-t)]" />
              </span>
              <span className="h-[18px] py-0 px-[5px] rounded-xs bg-surface-7 font-mono text-[10px] text-fg-4 flex items-center">
                <span data-t="4" className="before:content-[attr(data-t)]" />
              </span>
            </span>
          </div>
        </div>
        <div
          className="absolute left-[80px] top-[424px] w-[200px] h-[140px] p-[8px] flex flex-col gap-[8px] bg-surface-3 border border-line-4 rounded-lg"
          data-bg
        >
          <div className="relative w-full h-[72px] flex-none rounded-md overflow-hidden [background:linear-gradient(160deg,_#8A2C52,_#2E0B1C)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-white)_14%,transparent)]">
            <span className="absolute left-[-20%] top-[-60%] w-[90%] h-[120%] [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-white)_16%,transparent),_color-mix(in_srgb,var(--color-white)_0%,transparent))] block"></span>
            <svg className="relative block" viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`${p}u8q`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#FFFFFF" />
                  <stop offset="1" stopColor="#E2DCE8" />
                </linearGradient>
              </defs>
              <ellipse className="fill-black" cx="60" cy="71" rx="38" ry="4.5" opacity=".35" />
              <g transform="rotate(-8 62 40)">
                <path className="fill-black" d="M40 10 H75 L87 22 V72 H40 Z" opacity=".25" transform="translate(2.5 2.5)" />
                <path d="M40 10 H75 L87 22 V72 H40 Z" fill={`url(#${p}u8q)`} />
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
          <div className="flex flex-col gap-[5px] py-0 px-[4px]">
            <span className="text-[13px] font-medium text-fg whitespace-nowrap overflow-hidden text-ellipsis">
              <span data-t="Rev C baseline" className="before:content-[attr(data-t)]" />
            </span>
            <span className="flex items-center gap-[6px] text-[11.5px] text-fg-muted">
              <span>
                <span data-t="2w ago" className="before:content-[attr(data-t)]" />
              </span>
              <span className="ml-auto w-[18px] h-[18px] rounded-full bg-line-4b text-fg-3 text-[8.5px] flex items-center justify-center">
                <span data-t="PS" className="before:content-[attr(data-t)]" />
              </span>
              <span className="h-[18px] py-0 px-[5px] rounded-xs bg-surface-7 font-mono text-[10px] text-fg-4 flex items-center">
                <span data-t="5" className="before:content-[attr(data-t)]" />
              </span>
            </span>
          </div>
        </div>
        <div
          className="absolute left-[296px] top-[-44px] w-[200px] h-[140px] p-[8px] flex flex-col gap-[8px] bg-surface-3 border border-line-4 rounded-lg"
          data-bg
        >
          <div className="relative w-full h-[72px] flex-none rounded-md overflow-hidden [background:linear-gradient(160deg,_#17663F,_#062417)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-white)_14%,transparent)]">
            <span className="absolute left-[-20%] top-[-60%] w-[90%] h-[120%] [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-white)_16%,transparent),_color-mix(in_srgb,var(--color-white)_0%,transparent))] block"></span>
            <svg className="relative block" viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`${p}u9p`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#4FD18F" />
                  <stop offset="1" stopColor="#127046" />
                </linearGradient>
                <linearGradient id={`${p}u9c`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#4A4E5C" />
                  <stop offset="1" stopColor="#1E2028" />
                </linearGradient>
              </defs>
              <ellipse className="fill-black" cx="60" cy="71" rx="38" ry="4.5" opacity=".35" />
              <path d="M16 37 L60 59 L60 64 L16 42 Z" fill="#0C4A2C" />
              <path d="M60 59 L104 37 L104 42 L60 64 Z" fill="#073620" />
              <path d="M60 15 L104 37 L60 59 L16 37 Z" fill={`url(#${p}u9p)`} />
              <path className="fill-white" d="M60 15 L104 37 L98 40 L60 21 L22 40 L16 37 Z" opacity=".18" />
              <path
                className="stroke-warn-3"
                d="M30 37 L44 30 L58 37 M66 41 L80 34 L90 39 M40 44 L54 37 M62 26 L76 33"
                fill="none"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <circle className="fill-warn-3" cx="44" cy="30" r="1.6" />
              <circle className="fill-warn-3" cx="80" cy="34" r="1.6" />
              <path d="M60 29 L72 35 L72 39 L60 45 L48 39 L48 35 Z" fill="#14161C" />
              <path d="M60 29 L72 35 L60 41 L48 35 Z" fill={`url(#${p}u9c)`} />
              <path className="stroke-white" d="M48 35 L60 29 L72 35" fill="none" strokeOpacity=".35" strokeWidth=".8" />
              <path d="M80 41 L87 44.5 L80 48 L73 44.5 Z" fill="#2A2D36" />
              <path d="M36 43 L42 46 L36 49 L30 46 Z" fill="#E9E4D4" />
            </svg>
          </div>
          <div className="flex flex-col gap-[5px] py-0 px-[4px]">
            <span className="text-[13px] font-medium text-fg whitespace-nowrap overflow-hidden text-ellipsis">
              <span data-t="Case 0036 · Enclosure seam" className="before:content-[attr(data-t)]" />
            </span>
            <span className="flex items-center gap-[6px] text-[11.5px] text-fg-muted">
              <span>
                <span data-t="3d ago" className="before:content-[attr(data-t)]" />
              </span>
              <span className="ml-auto w-[18px] h-[18px] rounded-full bg-line-4b text-fg-3 text-[8.5px] flex items-center justify-center">
                <span data-t="PS" className="before:content-[attr(data-t)]" />
              </span>
              <span className="h-[18px] py-0 px-[5px] rounded-xs bg-surface-7 font-mono text-[10px] text-fg-4 flex items-center">
                <span data-t="2" className="before:content-[attr(data-t)]" />
              </span>
            </span>
          </div>
        </div>
        <div
          className="absolute left-[296px] top-[112px] w-[200px] h-[140px] p-[8px] flex flex-col gap-[8px] bg-surface-3 border border-line-4 rounded-lg"
          data-bg
        >
          <div className="relative w-full h-[72px] flex-none rounded-md overflow-hidden [background:linear-gradient(160deg,_#17663F,_#062417)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-white)_14%,transparent)]">
            <span className="absolute left-[-20%] top-[-60%] w-[90%] h-[120%] [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-white)_16%,transparent),_color-mix(in_srgb,var(--color-white)_0%,transparent))] block"></span>
            <svg className="relative block" viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`${p}u10p`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#4FD18F" />
                  <stop offset="1" stopColor="#127046" />
                </linearGradient>
                <linearGradient id={`${p}u10c`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#4A4E5C" />
                  <stop offset="1" stopColor="#1E2028" />
                </linearGradient>
              </defs>
              <ellipse className="fill-black" cx="60" cy="71" rx="38" ry="4.5" opacity=".35" />
              <path d="M16 37 L60 59 L60 64 L16 42 Z" fill="#0C4A2C" />
              <path d="M60 59 L104 37 L104 42 L60 64 Z" fill="#073620" />
              <path d="M60 15 L104 37 L60 59 L16 37 Z" fill={`url(#${p}u10p)`} />
              <path className="fill-white" d="M60 15 L104 37 L98 40 L60 21 L22 40 L16 37 Z" opacity=".18" />
              <path
                className="stroke-warn-3"
                d="M30 37 L44 30 L58 37 M66 41 L80 34 L90 39 M40 44 L54 37 M62 26 L76 33"
                fill="none"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
              <circle className="fill-warn-3" cx="44" cy="30" r="1.6" />
              <circle className="fill-warn-3" cx="80" cy="34" r="1.6" />
              <path d="M60 29 L72 35 L72 39 L60 45 L48 39 L48 35 Z" fill="#14161C" />
              <path d="M60 29 L72 35 L60 41 L48 35 Z" fill={`url(#${p}u10c)`} />
              <path className="stroke-white" d="M48 35 L60 29 L72 35" fill="none" strokeOpacity=".35" strokeWidth=".8" />
              <path d="M80 41 L87 44.5 L80 48 L73 44.5 Z" fill="#2A2D36" />
              <path d="M36 43 L42 46 L36 49 L30 46 Z" fill="#E9E4D4" />
            </svg>
          </div>
          <div className="flex flex-col gap-[5px] py-0 px-[4px]">
            <span className="text-[13px] font-medium text-fg whitespace-nowrap overflow-hidden text-ellipsis">
              <span data-t="Conducted emissions" className="before:content-[attr(data-t)]" />
            </span>
            <span className="flex items-center gap-[6px] text-[11.5px] text-fg-muted">
              <span>
                <span data-t="1w ago" className="before:content-[attr(data-t)]" />
              </span>
              <span className="ml-auto w-[18px] h-[18px] rounded-full bg-line-4b text-fg-3 text-[8.5px] flex items-center justify-center">
                <span data-t="SL" className="before:content-[attr(data-t)]" />
              </span>
              <span className="h-[18px] py-0 px-[5px] rounded-xs bg-surface-7 font-mono text-[10px] text-fg-4 flex items-center">
                <span data-t="2" className="before:content-[attr(data-t)]" />
              </span>
            </span>
          </div>
        </div>
        <div
          className="absolute left-[296px] top-[268px] w-[200px] h-[140px] p-[8px] flex flex-col gap-[8px] bg-surface-3 border border-line-4 rounded-lg"
          data-bg
        >
          <div className="relative w-full h-[72px] flex-none rounded-md overflow-hidden [background:linear-gradient(160deg,_#22348A,_#0A1238)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-white)_14%,transparent)]">
            <span className="absolute left-[-20%] top-[-60%] w-[90%] h-[120%] [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-white)_16%,transparent),_color-mix(in_srgb,var(--color-white)_0%,transparent))] block"></span>
            <svg className="relative block" viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`${p}u11b`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#F1F3FA" />
                  <stop offset="1" stopColor="#8990A8" />
                </linearGradient>
                <linearGradient id={`${p}u11s`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0E1C46" />
                  <stop offset="1" stopColor="#050B22" />
                </linearGradient>
                <radialGradient id={`${p}u11k`} cx=".35" cy=".3" r=".8">
                  <stop offset="0" stopColor="#FFFFFF" />
                  <stop offset="1" stopColor="#5C6380" />
                </radialGradient>
                <filter id={`${p}u11f`} x="-20%" y="-50%" width="140%" height="200%">
                  <feGaussianBlur stdDeviation="1.4" />
                </filter>
              </defs>
              <ellipse className="fill-black" cx="60" cy="71" rx="38" ry="4.5" opacity=".35" />
              <g transform="translate(60 42) skewY(-5) translate(-60 -42)">
                <rect x="21" y="17" width="78" height="50" rx="7" fill={`url(#${p}u11b)`} />
                <rect className="fill-white" x="23" y="18" width="74" height="7" rx="3.5" opacity=".55" />
                <rect x="26" y="23" width="52" height="38" rx="3.5" fill={`url(#${p}u11s)`} />
                <path className="stroke-danger-2" d="M28 39 H76" strokeWidth=".9" strokeDasharray="2 2" />
                <path
                  d="M28 55 L35 54 L40 52 L45 53 L49 47 L51 29 L53 47 L57 51 L63 52 L69 54 L76 53"
                  fill="none"
                  stroke="#7FB2FF"
                  strokeWidth="2.4"
                  filter={`url(#${p}u11f)`}
                  opacity=".8"
                />
                <path
                  d="M28 55 L35 54 L40 52 L45 53 L49 47 L51 29 L53 47 L57 51 L63 52 L69 54 L76 53"
                  fill="none"
                  stroke="#D6E6FF"
                  strokeWidth="1.1"
                />
                <circle cx="88" cy="32" r="4.6" fill={`url(#${p}u11k)`} />
                <circle cx="88" cy="45" r="3.4" fill={`url(#${p}u11k)`} />
                <rect className="fill-accent-vivid" x="82" y="54" width="12" height="4" rx="2" />
              </g>
            </svg>
          </div>
          <div className="flex flex-col gap-[5px] py-0 px-[4px]">
            <span className="text-[13px] font-medium text-fg whitespace-nowrap overflow-hidden text-ellipsis">
              <span data-t="Radio output power" className="before:content-[attr(data-t)]" />
            </span>
            <span className="flex items-center gap-[6px] text-[11.5px] text-fg-muted">
              <span>
                <span data-t="4d ago" className="before:content-[attr(data-t)]" />
              </span>
              <span className="ml-auto w-[18px] h-[18px] rounded-full bg-line-4b text-fg-3 text-[8.5px] flex items-center justify-center">
                <span data-t="PS" className="before:content-[attr(data-t)]" />
              </span>
              <span className="h-[18px] py-0 px-[5px] rounded-xs bg-surface-7 font-mono text-[10px] text-fg-4 flex items-center">
                <span data-t="3" className="before:content-[attr(data-t)]" />
              </span>
            </span>
          </div>
        </div>
        <div
          className="absolute left-[296px] top-[424px] w-[200px] h-[140px] p-[8px] flex flex-col gap-[8px] bg-surface-3 border border-line-4 rounded-lg"
          data-bg
        >
          <div className="relative w-full h-[72px] flex-none rounded-md overflow-hidden [background:linear-gradient(160deg,_#4B2789,_#170933)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-white)_14%,transparent)]">
            <span className="absolute left-[-20%] top-[-60%] w-[90%] h-[120%] [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-white)_16%,transparent),_color-mix(in_srgb,var(--color-white)_0%,transparent))] block"></span>
            <svg className="relative block" viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`${p}u12h`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FBE0BE" />
                  <stop offset=".55" stopColor="#C98B52" />
                  <stop offset="1" stopColor="#8A5428" />
                </linearGradient>
                <linearGradient id={`${p}u12w`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#E9B985" />
                  <stop offset="1" stopColor="#8A5428" />
                </linearGradient>
              </defs>
              <ellipse className="fill-black" cx="60" cy="71" rx="38" ry="4.5" opacity=".35" />
              <path d="M50 52 L46 70 M50 52 L54 70" stroke="#9AA0B2" strokeWidth="2" strokeLinecap="round" />
              <rect x="16" y="33" width="22" height="14" rx="2" fill={`url(#${p}u12w)`} />
              <path d="M38 33 L94 13 L94 67 L38 47 Z" fill={`url(#${p}u12h)`} />
              <path className="stroke-white" d="M38 33 L94 13" strokeOpacity=".7" strokeWidth="1.2" />
              <path d="M94 13 L104 19 L104 73 L94 67 Z" fill="#6E3F1C" />
              <path d="M96 17 L102 21 L102 69 L96 65 Z" fill="#2A1508" />
            </svg>
          </div>
          <div className="flex flex-col gap-[5px] py-0 px-[4px]">
            <span className="text-[13px] font-medium text-fg whitespace-nowrap overflow-hidden text-ellipsis">
              <span data-t="ESD immunity" className="before:content-[attr(data-t)]" />
            </span>
            <span className="flex items-center gap-[6px] text-[11.5px] text-fg-muted">
              <span>
                <span data-t="2w ago" className="before:content-[attr(data-t)]" />
              </span>
              <span className="ml-auto w-[18px] h-[18px] rounded-full bg-line-4b text-fg-3 text-[8.5px] flex items-center justify-center">
                <span data-t="HE" className="before:content-[attr(data-t)]" />
              </span>
              <span className="h-[18px] py-0 px-[5px] rounded-xs bg-surface-7 font-mono text-[10px] text-fg-4 flex items-center">
                <span data-t="1" className="before:content-[attr(data-t)]" />
              </span>
            </span>
          </div>
        </div>
        <div
          className="absolute left-[512px] top-[-44px] w-[200px] h-[140px] p-[8px] flex flex-col gap-[8px] bg-surface-3 border border-line-4 rounded-lg"
          data-bg
        >
          <div className="relative w-full h-[72px] flex-none rounded-md overflow-hidden [background:linear-gradient(160deg,_#4B2789,_#170933)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-white)_14%,transparent)]">
            <span className="absolute left-[-20%] top-[-60%] w-[90%] h-[120%] [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-white)_16%,transparent),_color-mix(in_srgb,var(--color-white)_0%,transparent))] block"></span>
            <svg className="relative block" viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`${p}u13h`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#FBE0BE" />
                  <stop offset=".55" stopColor="#C98B52" />
                  <stop offset="1" stopColor="#8A5428" />
                </linearGradient>
                <linearGradient id={`${p}u13w`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#E9B985" />
                  <stop offset="1" stopColor="#8A5428" />
                </linearGradient>
              </defs>
              <ellipse className="fill-black" cx="60" cy="71" rx="38" ry="4.5" opacity=".35" />
              <path d="M50 52 L46 70 M50 52 L54 70" stroke="#9AA0B2" strokeWidth="2" strokeLinecap="round" />
              <rect x="16" y="33" width="22" height="14" rx="2" fill={`url(#${p}u13w)`} />
              <path d="M38 33 L94 13 L94 67 L38 47 Z" fill={`url(#${p}u13h)`} />
              <path className="stroke-white" d="M38 33 L94 13" strokeOpacity=".7" strokeWidth="1.2" />
              <path d="M94 13 L104 19 L104 73 L94 67 Z" fill="#6E3F1C" />
              <path d="M96 17 L102 21 L102 69 L96 65 Z" fill="#2A1508" />
            </svg>
          </div>
          <div className="flex flex-col gap-[5px] py-0 px-[4px]">
            <span className="text-[13px] font-medium text-fg whitespace-nowrap overflow-hidden text-ellipsis">
              <span data-t="Antenna placement" className="before:content-[attr(data-t)]" />
            </span>
            <span className="flex items-center gap-[6px] text-[11.5px] text-fg-muted">
              <span>
                <span data-t="5d ago" className="before:content-[attr(data-t)]" />
              </span>
              <span className="ml-auto w-[18px] h-[18px] rounded-full bg-line-4b text-fg-3 text-[8.5px] flex items-center justify-center">
                <span data-t="SL" className="before:content-[attr(data-t)]" />
              </span>
              <span className="h-[18px] py-0 px-[5px] rounded-xs bg-surface-7 font-mono text-[10px] text-fg-4 flex items-center">
                <span data-t="1" className="before:content-[attr(data-t)]" />
              </span>
            </span>
          </div>
        </div>
        <div
          className="absolute left-[512px] top-[112px] w-[200px] h-[140px] p-[8px] flex flex-col gap-[8px] bg-surface-3 border border-line-7 rounded-lg"
          data-hot
          data-bghot
        >
          <div className="relative w-full h-[72px] flex-none rounded-md overflow-hidden [background:linear-gradient(160deg,_#22348A,_#0A1238)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-white)_14%,transparent)]">
            <span className="absolute left-[-20%] top-[-60%] w-[90%] h-[120%] [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-white)_16%,transparent),_color-mix(in_srgb,var(--color-white)_0%,transparent))] block"></span>
            <svg className="relative block" viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`${p}u14b`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#F1F3FA" />
                  <stop offset="1" stopColor="#8990A8" />
                </linearGradient>
                <linearGradient id={`${p}u14s`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#0E1C46" />
                  <stop offset="1" stopColor="#050B22" />
                </linearGradient>
                <radialGradient id={`${p}u14k`} cx=".35" cy=".3" r=".8">
                  <stop offset="0" stopColor="#FFFFFF" />
                  <stop offset="1" stopColor="#5C6380" />
                </radialGradient>
                <filter id={`${p}u14f`} x="-20%" y="-50%" width="140%" height="200%">
                  <feGaussianBlur stdDeviation="1.4" />
                </filter>
              </defs>
              <ellipse className="fill-black" cx="60" cy="71" rx="38" ry="4.5" opacity=".35" />
              <g transform="translate(60 42) skewY(-5) translate(-60 -42)">
                <rect x="21" y="17" width="78" height="50" rx="7" fill={`url(#${p}u14b)`} />
                <rect className="fill-white" x="23" y="18" width="74" height="7" rx="3.5" opacity=".55" />
                <rect x="26" y="23" width="52" height="38" rx="3.5" fill={`url(#${p}u14s)`} />
                <path className="stroke-danger-2" d="M28 39 H76" strokeWidth=".9" strokeDasharray="2 2" />
                <path
                  d="M28 55 L35 54 L40 52 L45 53 L49 47 L51 29 L53 47 L57 51 L63 52 L69 54 L76 53"
                  fill="none"
                  stroke="#7FB2FF"
                  strokeWidth="2.4"
                  filter={`url(#${p}u14f)`}
                  opacity=".8"
                />
                <path
                  d="M28 55 L35 54 L40 52 L45 53 L49 47 L51 29 L53 47 L57 51 L63 52 L69 54 L76 53"
                  fill="none"
                  stroke="#D6E6FF"
                  strokeWidth="1.1"
                />
                <circle cx="88" cy="32" r="4.6" fill={`url(#${p}u14k)`} />
                <circle cx="88" cy="45" r="3.4" fill={`url(#${p}u14k)`} />
                <rect className="fill-accent-vivid" x="82" y="54" width="12" height="4" rx="2" />
              </g>
            </svg>
          </div>
          <div className="flex flex-col gap-[5px] py-0 px-[4px]">
            <span className="text-[13px] font-medium text-fg whitespace-nowrap overflow-hidden text-ellipsis">
              <span data-t="Case 0042 · Rev D emissions" className="before:content-[attr(data-t)]" />
            </span>
            <span className="flex items-center gap-[6px] text-[11.5px] text-fg-muted">
              <span>
                <span data-t="30m ago" className="before:content-[attr(data-t)]" />
              </span>
              <span className="ml-auto w-[18px] h-[18px] rounded-full bg-line-4b text-fg-3 text-[8.5px] flex items-center justify-center">
                <span data-t="PS" className="before:content-[attr(data-t)]" />
              </span>
              <span className="h-[18px] py-0 px-[5px] rounded-xs bg-surface-7 font-mono text-[10px] text-fg-4 flex items-center">
                <span data-t="6" className="before:content-[attr(data-t)]" />
              </span>
            </span>
          </div>
        </div>
        <div
          className="absolute left-[512px] top-[268px] w-[200px] h-[140px] p-[8px] flex flex-col gap-[8px] bg-surface-3 border border-line-4 rounded-lg"
          data-bg
        >
          <div className="relative w-full h-[72px] flex-none rounded-md overflow-hidden [background:linear-gradient(160deg,_#8A2C52,_#2E0B1C)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-white)_14%,transparent)]">
            <span className="absolute left-[-20%] top-[-60%] w-[90%] h-[120%] [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-white)_16%,transparent),_color-mix(in_srgb,var(--color-white)_0%,transparent))] block"></span>
            <svg className="relative block" viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`${p}u15q`} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#FFFFFF" />
                  <stop offset="1" stopColor="#E2DCE8" />
                </linearGradient>
              </defs>
              <ellipse className="fill-black" cx="60" cy="71" rx="38" ry="4.5" opacity=".35" />
              <g transform="rotate(-8 62 40)">
                <path className="fill-black" d="M40 10 H75 L87 22 V72 H40 Z" opacity=".25" transform="translate(2.5 2.5)" />
                <path d="M40 10 H75 L87 22 V72 H40 Z" fill={`url(#${p}u15q)`} />
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
          <div className="flex flex-col gap-[5px] py-0 px-[4px]">
            <span className="text-[13px] font-medium text-fg whitespace-nowrap overflow-hidden text-ellipsis">
              <span data-t="Rev E retest" className="before:content-[attr(data-t)]" />
            </span>
            <span className="flex items-center gap-[6px] text-[11.5px] text-fg-muted">
              <span>
                <span data-t="2h ago" className="before:content-[attr(data-t)]" />
              </span>
              <span className="ml-auto w-[18px] h-[18px] rounded-full bg-line-4b text-fg-3 text-[8.5px] flex items-center justify-center">
                <span data-t="HE" className="before:content-[attr(data-t)]" />
              </span>
              <span className="h-[18px] py-0 px-[5px] rounded-xs bg-surface-7 font-mono text-[10px] text-fg-4 flex items-center">
                <span data-t="3" className="before:content-[attr(data-t)]" />
              </span>
            </span>
          </div>
        </div>
        <div
          className="absolute left-[512px] top-[424px] w-[200px] h-[140px] p-[8px] flex flex-col gap-[8px] bg-surface-3 border border-line-4 rounded-lg"
          data-bg
        >
          <div className="relative w-full h-[72px] flex-none rounded-md overflow-hidden [background:linear-gradient(160deg,_#7A2234,_#2A0911)] shadow-[inset_0_1px_0_color-mix(in_srgb,var(--color-white)_14%,transparent)]">
            <span className="absolute left-[-20%] top-[-60%] w-[90%] h-[120%] [background:radial-gradient(closest-side,_color-mix(in_srgb,var(--color-white)_16%,transparent),_color-mix(in_srgb,var(--color-white)_0%,transparent))] block"></span>
            <svg className="relative block" viewBox="0 0 120 80" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id={`${p}u16r`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#9A9AA6" />
                  <stop offset=".45" stopColor="#3A3A42" />
                  <stop offset="1" stopColor="#55555F" />
                </linearGradient>
              </defs>
              <ellipse className="fill-black" cx="60" cy="71" rx="38" ry="4.5" opacity=".35" />
              <path
                className="stroke-surface-3"
                d="M6 60 C30 60 36 42 60 42 C84 42 90 24 114 24"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
              <path
                className="stroke-fg-dim"
                d="M6 58.5 C30 58.5 36 40.5 60 40.5 C84 40.5 90 22.5 114 22.5"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                opacity=".7"
              />
              <g transform="rotate(-24 60 42)">
                <rect x="42" y="31" width="36" height="22" rx="5" fill={`url(#${p}u16r)`} />
                <rect className="fill-white" x="44" y="33" width="32" height="3.5" rx="1.75" opacity=".45" />
                <ellipse className="fill-line-5b" cx="78" cy="42" rx="5.5" ry="11" />
                <ellipse cx="78" cy="42" rx="2.4" ry="4.6" fill="#0E0E12" />
              </g>
            </svg>
          </div>
          <div className="flex flex-col gap-[5px] py-0 px-[4px]">
            <span className="text-[13px] font-medium text-fg whitespace-nowrap overflow-hidden text-ellipsis">
              <span data-t="Supplier datasheet" className="before:content-[attr(data-t)]" />
            </span>
            <span className="flex items-center gap-[6px] text-[11.5px] text-fg-muted">
              <span>
                <span data-t="6d ago" className="before:content-[attr(data-t)]" />
              </span>
              <span className="ml-auto w-[18px] h-[18px] rounded-full bg-line-4b text-fg-3 text-[8.5px] flex items-center justify-center">
                <span data-t="SL" className="before:content-[attr(data-t)]" />
              </span>
              <span className="h-[18px] py-0 px-[5px] rounded-xs bg-surface-7 font-mono text-[10px] text-fg-4 flex items-center">
                <span data-t="2" className="before:content-[attr(data-t)]" />
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="absolute left-[80px] top-[22px] w-[560px] h-[64px] z-[3] flex items-center gap-[12px] py-0 px-[20px] bg-surface-5 border border-line-6 rounded-lg shadow-[0_20px_50px_color-mix(in_srgb,var(--color-black)_50%,transparent)]">
        <svg className="fill-accent-pale flex-none" width="18" height="18" viewBox="0 0 24 24">
          <path d="M12 3C12.8 8.5 15.5 11.2 21 12C15.5 12.8 12.8 15.5 12 21C11.2 15.5 8.5 12.8 3 12C8.5 11.2 11.2 8.5 12 3Z" />
        </svg>
        <span className="flex items-center min-w-0">
          <span className="text-[16px] text-fg whitespace-nowrap overflow-hidden relative" data-type>
            <span data-t="Why did Rev D fail at 144.2 MHz?" className="before:content-[attr(data-t)]" />
            <span className="absolute inset-0 bg-surface-5" data-type-cover />
          </span>
          <span className="w-[1.5px] h-[20px] ml-[2px] bg-accent-pale block" data-caret></span>
        </span>
        <span className="ml-auto w-[32px] h-[32px] flex-none rounded-md bg-white flex items-center justify-center">
          <svg
            className="stroke-ink flex-none block"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </span>
      </div>
      <div
        className="absolute left-[40px] top-[106px] w-[460px] z-[2] bg-surface-3 border border-line-4 rounded-xl shadow-[0_30px_80px_color-mix(in_srgb,var(--color-black)_55%,transparent)] text-fg"
        data-cp
      >
        <div className="h-[56px] flex items-center gap-[12px] pt-0 pr-[20px] pb-0 pl-[24px] border-b border-b-surface-7">
          <span className="text-[17px] font-medium whitespace-nowrap">
            <span data-t="Case 0042 · Likely causes" className="before:content-[attr(data-t)]" />
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
        <div className="pt-[18px] px-[24px] pb-[20px] flex flex-col gap-[10px]">
          <div className="flex gap-[10px] items-start py-[10px] px-[12px] bg-surface-1b border border-surface-7 rounded-md">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-danger-strong block mt-[6px]"></span>
            <span className="font-mono text-[13px] leading-[1.55] text-fg-2">
              <span
                data-t="144.2 MHz · 47.7 dBµV/m · limit 43.5 · margin +4.2 dB · 47 CFR 15.109(a)"
                className="before:content-[attr(data-t)]"
              />
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex gap-[12px] py-[7px] px-0" data-c style={{ "--i": 0 } as CSSProperties}>
              <span className="font-mono text-[13px] text-fg-faint pt-[2px]">
                <span data-t="1" className="before:content-[attr(data-t)]" />
              </span>
              <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                <span className="text-[16px] leading-[1.35]">
                  <span data-t="Clock harmonic coupling onto the USB cable" className="before:content-[attr(data-t)]" />
                </span>
                <span className="flex gap-[6px]">
                  <span className="h-[22px] flex-none inline-flex items-center gap-[6px] py-0 px-[7px] font-mono text-[11px] tracking-[.06em] text-warn border border-warn/50 rounded-xs whitespace-nowrap">
                    <span data-t="INFERRED" className="before:content-[attr(data-t)]" />
                  </span>
                  <span className="relative h-[22px] min-w-[26px] flex-none inline-flex items-center justify-center py-0 px-[6px] font-mono text-[12px] text-fg-3 bg-surface-7 border border-line-5 rounded-[5px] whitespace-nowrap">
                    <span data-t="p.4" className="before:content-[attr(data-t)]" />
                  </span>
                </span>
              </div>
            </div>
            <div className="flex gap-[12px] py-[7px] px-0" data-c style={{ "--i": 1 } as CSSProperties}>
              <span className="font-mono text-[13px] text-fg-faint pt-[2px]">
                <span data-t="2" className="before:content-[attr(data-t)]" />
              </span>
              <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                <span className="text-[16px] leading-[1.35]">
                  <span data-t="Buck regulator switching noise" className="before:content-[attr(data-t)]" />
                </span>
                <span className="flex gap-[6px]">
                  <span className="h-[22px] flex-none inline-flex items-center gap-[6px] py-0 px-[7px] font-mono text-[11px] tracking-[.06em] text-warn border border-warn/50 rounded-xs whitespace-nowrap">
                    <span data-t="INFERRED" className="before:content-[attr(data-t)]" />
                  </span>
                  <span className="relative h-[22px] min-w-[26px] flex-none inline-flex items-center justify-center py-0 px-[6px] font-mono text-[12px] text-fg-3 bg-surface-7 border border-line-5 rounded-[5px] whitespace-nowrap">
                    <span data-t="p.6" className="before:content-[attr(data-t)]" />
                  </span>
                </span>
              </div>
            </div>
            <div className="flex gap-[12px] py-[7px] px-0" data-c style={{ "--i": 2 } as CSSProperties}>
              <span className="font-mono text-[13px] text-fg-faint pt-[2px]">
                <span data-t="3" className="before:content-[attr(data-t)]" />
              </span>
              <div className="flex-1 min-w-0 flex flex-col gap-[6px]">
                <span className="text-[16px] leading-[1.35]">
                  <span data-t="Enclosure seam leakage" className="before:content-[attr(data-t)]" />
                </span>
                <span className="flex gap-[6px]">
                  <span className="h-[22px] flex-none inline-flex items-center gap-[6px] py-0 px-[7px] font-mono text-[11px] tracking-[.06em] text-warn border border-warn/50 rounded-xs whitespace-nowrap">
                    <span data-t="INFERRED" className="before:content-[attr(data-t)]" />
                  </span>
                  <span className="h-[22px] flex-none inline-flex items-center gap-[6px] py-0 px-[7px] font-mono text-[11px] tracking-[.06em] text-fg-muted border border-fg-muted/50 rounded-xs whitespace-nowrap">
                    <span data-t="MISSING" className="before:content-[attr(data-t)]" />
                    <span className="tracking-normal [text-transform:none] text-fg-4">
                      <span data-t="shielding data" className="before:content-[attr(data-t)]" />
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[6px] py-[12px] px-[14px] bg-surface-4 border border-line-4 rounded-card" data-nt>
            <span className="text-[14px] text-fg-6">
              <span data-t="Suggested next test" className="before:content-[attr(data-t)]" />
            </span>
            <span className="text-[15px] leading-[1.4]">
              <span data-t="Near-field scan at 144.2 MHz, ferrite on the USB cable" className="before:content-[attr(data-t)]" />
            </span>
            <div className="mt-[4px] flex gap-[8px]">
              <span className="relative h-[32px] inline-flex items-center py-0 px-[14px] rounded-[7px] text-[14px] font-medium bg-white text-ink">
                <span data-t="Accept" className="before:content-[attr(data-t)]" />
                <svg
                  className="absolute left-[38px] top-[14px] z-20 overflow-visible [filter:drop-shadow(0_3px_4px_color-mix(in_srgb,var(--color-black)_55%,transparent))] pointer-events-none"
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
              <span className="relative h-[32px] inline-flex items-center py-0 px-[14px] rounded-[7px] text-[14px] font-medium text-fg-3 border border-line-6">
                <span data-t="Edit" className="before:content-[attr(data-t)]" />
              </span>
              <span className="relative h-[32px] inline-flex items-center py-0 px-[14px] rounded-[7px] text-[14px] font-medium text-fg-3 border border-line-6">
                <span data-t="Reject" className="before:content-[attr(data-t)]" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div
        className="absolute left-[452px] top-[418px] w-[256px] z-[4] py-[14px] px-[16px] bg-surface-3 border border-line-4 rounded-lg shadow-[0_24px_60px_color-mix(in_srgb,var(--color-black)_60%,transparent)]"
        data-rt
        data-float
      >
        <div className="flex flex-col gap-[8px]">
          <span className="text-[15px] font-medium">
            <span data-t="Rev E retest" className="before:content-[attr(data-t)]" />
          </span>
          <span className="font-mono text-[13px] text-fg-2">
            <span data-t="margin +4.2 → −1.6 dB" className="before:content-[attr(data-t)]" />
          </span>
          <div className="relative flex flex-col gap-[5px] my-[2px] mx-0">
            <div className="flex items-center gap-[8px]">
              <span className="w-[38px] font-mono text-[11px] text-fg-muted">
                <span data-t="Rev D" className="before:content-[attr(data-t)]" />
              </span>
              <span className="w-[118px] h-[7px] rounded-xs bg-danger-strong block"></span>
            </div>
            <div className="flex items-center gap-[8px]">
              <span className="w-[38px] font-mono text-[11px] text-fg-muted">
                <span data-t="Rev E" className="before:content-[attr(data-t)]" />
              </span>
              <span className="w-[64px] h-[7px] rounded-xs bg-ok block"></span>
            </div>
            <span className="absolute left-[125px] top-[-3px] bottom-[-3px] border-l border-dashed border-l-fg-6 block"></span>
          </div>
          <span className="flex items-center gap-[7px] text-[14px] text-fg-4">
            <span className="w-[8px] h-[8px] flex-none rounded-full bg-ok block"></span>
            <span data-t="Conditions match" className="before:content-[attr(data-t)]" />
          </span>
        </div>
      </div>
    </div>
  );
}
