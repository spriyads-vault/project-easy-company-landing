import type { ReactNode } from "react";

/** Mono status label: EARLY ACCESS, ROADMAP, LIVE and section eyebrows. Never drop one that the design shows. */
export default function Label({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono text-[10px] tracking-[0.1em] whitespace-nowrap text-fg-faint ${className ?? ""}`}>{children}</span>;
}
