"use client";

import { useMotion } from "@/hooks/useMotion";

interface PrinciplesRevealProps {
  lines: { text: string; faint?: boolean }[];
}

const STAGGER_MS = 120;

/** Principles statement (design: [data-principles]). Each sentence fades up 6px once, 120ms apart. */
export default function PrinciplesReveal({ lines }: PrinciplesRevealProps) {
  const { ref, entered } = useMotion<HTMLParagraphElement>({ threshold: 0.3 });

  return (
    <p
      ref={ref}
      data-motion
      data-principles
      className="m-0 max-w-[860px] text-[28px] leading-[1.2] font-medium tracking-[-0.025em] text-balance sm:text-[40px]"
    >
      {lines.map((line, i) => (
        <span key={line.text}>
          {i > 0 ? " " : null}
          <span
            data-rv
            style={entered ? { transitionDelay: `${i * STAGGER_MS}ms` } : undefined}
            className={`inline-block ${line.faint ? "text-fg-faint" : ""} ${
              entered ? "transition-[opacity,transform] duration-500 ease-out-expo" : "translate-y-1.5 opacity-0"
            }`}
          >
            {line.text}
          </span>
        </span>
      ))}
    </p>
  );
}
