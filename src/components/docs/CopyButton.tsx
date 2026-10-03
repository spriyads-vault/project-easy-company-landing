"use client";

import { useEffect, useRef, useState } from "react";

/** Copies the text content of the element with id `target`. */
export default function CopyButton({ target, label }: { target: string; label: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    const text = document.getElementById(target)?.textContent ?? "";
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${label}`}
      className="h-7 cursor-pointer rounded-full border border-[rgba(255,255,255,0.18)] bg-[rgba(255,255,255,0.1)] px-3 text-[13px] leading-[1.5] font-medium text-[#EEF1F5] hover:bg-[rgba(255,255,255,0.16)] focus-visible:outline-white"
    >
      <span aria-live="polite">{state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : "Copy"}</span>
    </button>
  );
}
