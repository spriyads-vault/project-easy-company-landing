"use client";

import { useCopied } from "@/components/docs-site/CodeCopyButton";

/**
 * v6 "Copy" button for a code block. Hairline outline on white; hover darkens the outline to Ink; focus shows the
 * primary ring (site.css); for 1.5s after a click it turns Mint with a check and reads "Copied".
 */
export default function CopyButton({ text, label }: { text: string; label: string }) {
  const { copied, copy } = useCopied(text);
  return (
    <button
      type="button"
      onClick={copy}
      data-copied={copied ? "" : undefined}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="flex h-8 cursor-pointer items-center gap-1.5 rounded-v6-button border border-v6-line-strong bg-v6-card px-3 font-v6-sans text-[13px] leading-none font-medium text-v6-ink transition-[background-color,border-color] duration-150 ease-v6-ui hover:border-v6-ink active:translate-y-px data-copied:border-v6-mint data-copied:bg-v6-mint"
    >
      {copied ? (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      ) : (
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
          <rect x="8" y="8" width="12" height="12" rx="2" />
          <path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3" />
        </svg>
      )}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
