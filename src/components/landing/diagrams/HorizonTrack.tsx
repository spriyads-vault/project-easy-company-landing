"use client";

import Label from "@/components/ui/Label";
import { useMotion } from "@/hooks/useMotion";

export interface HorizonStop {
  title: string;
  question: string;
  label: string;
  /** The stop that is available today: full opacity, accent dot, question always shown. */
  current?: boolean;
}

interface HorizonTrackProps {
  stops: HorizonStop[];
  ariaLabel: string;
}

/** Left offsets of the three stops on the wide track (design: 10%, 43%, 76%). */
const LEFT = ["left-[10%]", "left-[43%]", "left-[76%]"];

const DASHED_X = "bg-[repeating-linear-gradient(90deg,var(--color-line-7)_0_4px,transparent_4px_9px)]";

/**
 * Wide (>=1100px) industry track (design: [data-horizon]). The solid accent segment grows once (scaleX, 800ms)
 * when the track first reaches the viewport. Roadmap stops rest in muted text colours (the design's 45% opacity
 * fails AA contrast) and brighten on hover or focus;
 * their question is hidden until then, but only on devices that can hover, so touch readers always see it.
 */
export default function HorizonTrack({ stops, ariaLabel }: HorizonTrackProps) {
  const { ref, entered } = useMotion<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div ref={ref} data-motion data-diagram="horizon" data-horizon role="group" aria-label={ariaLabel} className="relative h-[150px]">
      <span aria-hidden="true" className="absolute top-1.5 left-0 block h-px w-[10%] bg-line-7" />
      <span
        aria-hidden="true"
        data-hfill
        className={`absolute top-1.5 left-0 block h-px w-[10%] origin-left bg-accent-text ${
          entered ? "transition-transform delay-150 duration-800 ease-out-expo" : "scale-x-0"
        }`}
      />
      <span aria-hidden="true" className={`absolute top-1.5 right-0 left-[10%] block h-px ${DASHED_X}`} />

      {stops.map((stop, i) => (
        <div
          key={stop.title}
          tabIndex={stop.current ? undefined : 0}
          className={`group absolute top-0 flex w-[24%] cursor-default flex-col gap-2 ${LEFT[i]}`}
        >
          <StopDot current={stop.current} className="top-0.5" />
          {/* The design dims roadmap stops with 45% opacity, which fails AA contrast; they are dimmed with muted
              text colours instead and brighten on hover/focus. */}
          <span
            className={`mt-7 text-[15px] font-medium tracking-[-0.01em] transition-colors duration-250 ${
              stop.current ? "" : "text-fg-muted group-hover:text-fg-3 group-focus-visible:text-fg-3"
            }`}
          >
            {stop.title}
          </span>
          <span
            className={`text-[13px] leading-normal text-pretty text-fg-6 transition-opacity duration-250 ease-[ease] ${
              stop.current ? "" : "[@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
            }`}
          >
            {stop.question}
          </span>
          <Label>{stop.label}</Label>
        </div>
      ))}
    </div>
  );
}

export function StopDot({ current, className }: { current?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute -left-1 block size-[9px] rounded-full border ${
        current ? "border-accent-text bg-accent-text shadow-[0_0_0_4px_var(--color-accent-soft)]" : "border-fg-faint bg-bg"
      } ${className ?? ""}`}
    />
  );
}
