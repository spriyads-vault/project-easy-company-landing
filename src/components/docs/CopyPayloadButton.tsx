"use client";

import { useEffect, useRef, useState } from "react";
import { PAYLOAD } from "@/lib/docs";

export default function CopyPayloadButton() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = () => {
    navigator.clipboard?.writeText(PAYLOAD).catch(() => {});
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy payload JSON"
      className={`cursor-pointer border border-steel bg-transparent px-2 py-0.5 font-mono text-[11px] leading-4 tracking-[0.06em] hover:border-mint ${
        copied ? "text-mint" : "text-fog"
      }`}
    >
      {copied ? "COPIED" : "COPY"}
    </button>
  );
}
