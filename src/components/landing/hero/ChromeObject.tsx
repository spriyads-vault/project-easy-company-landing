"use client";

import { useEffect, useRef } from "react";

const RING = "M3 37a57 31 0 1 0 114 0a57 31 0 1 0 -114 0ZM27 31a33 12 0 1 0 66 0a33 12 0 1 0 -66 0Z";

/**
 * The 3D chrome ring set inline in the hero h1 (design: [data-chrome]). Original SVG artwork from the design; its
 * gradient stops are illustration colours, not UI tokens. Two SVG transform animations (the reflection rotates,
 * a highlight travels the rim) run only while the h1 is on screen and the tab is visible. With reduced motion it
 * holds the design's still frame (t = 3s).
 */
export default function ChromeObject() {
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = true;
    const apply = () => {
      if (reduced.matches) {
        svg.setCurrentTime(3);
        svg.pauseAnimations();
      } else if (onScreen && document.visibilityState === "visible") svg.unpauseAnimations();
      else svg.pauseAnimations();
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      apply();
    });
    io.observe(svg);
    document.addEventListener("visibilitychange", apply);
    reduced.addEventListener("change", apply);
    apply();
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", apply);
      reduced.removeEventListener("change", apply);
    };
  }, []);

  return (
    <svg
      ref={ref}
      data-chrome
      viewBox="0 0 120 72"
      aria-hidden="true"
      focusable="false"
      className="ml-[.18em] inline-block h-[.8em] w-[1.333em] overflow-visible align-[-.03em]"
    >
      <defs>
        <linearGradient id="crm-base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F7F9FD" />
          <stop offset=".18" stopColor="#C7CEDC" />
          <stop offset=".4" stopColor="#6A7286" />
          <stop offset=".55" stopColor="#2A2F3D" />
          <stop offset=".7" stopColor="#9EA8BE" />
          <stop offset=".86" stopColor="#EEF2F9" />
          <stop offset="1" stopColor="#8EA2E6" />
        </linearGradient>
        <linearGradient id="crm-env" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset=".44" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset=".5" stopColor="#FFFFFF" stopOpacity=".8" />
          <stop offset=".56" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset=".78" stopColor="#5B7BFF" stopOpacity="0" />
          <stop offset=".9" stopColor="#5B7BFF" stopOpacity=".5" />
          <stop offset="1" stopColor="#5B7BFF" stopOpacity="0" />
          <animateTransform attributeName="gradientTransform" type="rotate" values="0 .5 .5;360 .5 .5" dur="20s" repeatCount="indefinite" />
        </linearGradient>
        <linearGradient id="crm-rim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1D2130" />
          <stop offset="1" stopColor="#D3DBEE" />
        </linearGradient>
        <clipPath id="crm-clip">
          <path d={RING} clipRule="evenodd" />
        </clipPath>
        <filter id="crm-blur" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <path d={RING} fill="url(#crm-base)" fillRule="evenodd" />
      <g clipPath="url(#crm-clip)">
        <path d={RING} fill="url(#crm-env)" fillRule="evenodd" />
        <ellipse cx="60" cy="68" rx="50" ry="10" fill="#5B7BFF" opacity=".4" filter="url(#crm-blur)" />
        <path d="M91 34C97 41 101 47 107 56L119 46C111 42 104 37 96 30Z" fill="#141826" opacity=".4" />
        <path d="M93 32C99 39 103 46 109 54" fill="none" stroke="#FFFFFF" strokeWidth="1.2" opacity=".85" />
        <circle r="8" fill="#FFFFFF" opacity=".9" filter="url(#crm-blur)">
          <animateMotion dur="20s" repeatCount="indefinite" path="M15 36a45 21 0 1 1 90 0a45 21 0 1 1 -90 0" />
        </circle>
      </g>
      <ellipse cx="60" cy="31" rx="33" ry="12" fill="none" stroke="url(#crm-rim)" strokeWidth="1.4" />
      <path d="M10 26C22 10 50 6 70 7" fill="none" stroke="#FFFFFF" strokeWidth="1.6" strokeLinecap="round" opacity=".85" />
    </svg>
  );
}
