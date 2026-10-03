"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * From 760px up, renders its child as a 1440x900 frame scaled to the available
 * width (transform only). Below that the child lays out at its natural width.
 */
export default function Scaler({ children, className = "" }: { children: ReactNode; className?: string }) {
  const outer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = outer.current;
    if (!el) return;
    const fit = () => el.style.setProperty("--s", String(el.clientWidth / 1440));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={outer}
      className={`scaler relative w-full min-w-0 overflow-hidden rounded-2xl shadow-[0_24px_48px_rgba(24,24,27,0.08)] [contain:inline-size] ${className}`}
    >
      <div className="scaler-inner">{children}</div>
    </div>
  );
}
