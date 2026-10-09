"use client";

import { useEffect, useRef, useState } from "react";

/** Copies `text` and reports `copied` for 1.5s afterwards (shared by the v3 and v6 copy buttons). */
export function useCopied(text: string): { copied: boolean; copy: () => void } {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1500);
  };
  return { copied, copy };
}

/** "Copy" button for a code block; reads "Copied" for 1.5s after a click. */
export default function CodeCopyButton({ text, label }: { text: string; label: string }) {
  const { copied, copy } = useCopied(text);

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="flex h-[26px] cursor-pointer items-center gap-1.5 rounded-sm border border-line-4 bg-surface-3 px-2.5 font-sans text-xs text-fg-4 transition-colors hover:border-line-7 hover:text-fg"
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
        <rect x="8" y="8" width="12" height="12" rx="2" />
        <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
      </svg>
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
