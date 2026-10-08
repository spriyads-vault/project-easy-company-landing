"use client";

import type { MouseEvent } from "react";

interface HeadingAnchorProps {
  id: string;
  label: string;
}

/** Link icon after an H2/H3. Shown on heading hover or focus; a click copies the heading URL. */
export default function HeadingAnchor({ id, label }: HeadingAnchorProps) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const url = `${window.location.href.split("#")[0]}#${id}`;
    navigator.clipboard?.writeText(url).catch(() => {});
    try {
      history.replaceState(history.state, "", `#${id}`);
    } catch {
      // History can be unavailable in sandboxed frames; copying still worked.
    }
  };

  return (
    <a
      href={`#${id}`}
      onClick={onClick}
      aria-label={`Copy link to ${label}`}
      className="ml-2.5 inline-flex align-middle text-fg-muted opacity-0 transition-opacity duration-150 group-hover/h:opacity-100 hover:text-fg focus-visible:opacity-100"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
      </svg>
    </a>
  );
}
