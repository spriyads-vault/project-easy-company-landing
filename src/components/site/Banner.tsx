"use client";

import Link from "next/link";
import { useState } from "react";
import { CONTACT_EMAIL } from "@/lib/site";

/** Home announcement bar. Server-rendered visible; dismissing hides it until the page reloads. */
function HomeBanner() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  const dismiss = () => {
    setOpen(false);
    // The button unmounts, so hand focus to the first nav control instead of dropping it on <body>.
    window.requestAnimationFrame(() => document.querySelector<HTMLElement>('nav[aria-label="Main"] a, nav[aria-label="Main"] button')?.focus());
  };
  return (
    <div className="relative flex min-h-12 items-center justify-center border-b border-white/12 bg-announce px-[52px] py-2">
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="text-center font-mono text-xs leading-normal tracking-[0.12em] text-balance text-white/75 uppercase transition-colors duration-150 hover:text-white"
      >
        EARLY ACCESS · Change review for connected-hardware teams →
      </a>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={dismiss}
        className="absolute top-1/2 right-3 -mt-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent text-white/75 hover:bg-white/10 hover:text-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" />
        </svg>
      </button>
    </div>
  );
}

/** Announcement strip above the nav. */
export default function Banner({ variant }: { variant: "home" | "docs" }) {
  if (variant === "home") return <HomeBanner />;
  return (
    <Link
      href="/#join"
      className="flex justify-center border-b border-surface-5 px-4 py-[9px] text-center font-mono text-[11px] tracking-[0.04em] text-balance text-fg-muted hover:text-fg"
    >
      <span>
        <span className="text-fg-4">PILOT PROGRAMME</span> · Now accepting hardware teams preparing for certification ·{" "}
        <span className="text-fg">Apply →</span>
      </span>
    </Link>
  );
}
