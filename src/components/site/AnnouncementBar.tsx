"use client";

import { useEffect, useState } from "react";
import { ArrowIcon } from "./icons";
import PilotLink from "./PilotLink";

const CLOSED_KEY = "crado-bar-closed";

export default function AnnouncementBar() {
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    try {
      // Restoring a dismissal stored by an earlier page view in this tab.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (sessionStorage.getItem(CLOSED_KEY) === "1") setClosed(true);
    } catch {}
  }, []);

  if (closed) return null;

  const close = () => {
    try {
      sessionStorage.setItem(CLOSED_KEY, "1");
    } catch {}
    setClosed(true);
  };

  return (
    <div
      role="region"
      aria-label="Announcement"
      className="relative h-9 animate-[barIn_300ms_ease_both] border-b border-line bg-white"
    >
      <PilotLink className="flex h-full items-center justify-center gap-3 overflow-hidden px-11 text-[13px] leading-[1.4] whitespace-nowrap text-fg no-underline hover:text-fg">
        <span className="inline-flex h-[22px] flex-none items-center rounded-full border border-line px-2 text-xs">
          Pilot programme
        </span>
        <span className="truncate text-fg-muted">
          <span className="max-[639px]:hidden">Now accepting hardware teams preparing for certification</span>
          <span className="min-[640px]:hidden">Pilot programme open</span>
        </span>
        <span className="inline-flex flex-none items-center gap-1 hover:underline">
          Apply
          <ArrowIcon size={11} />
        </span>
      </PilotLink>
      <button
        type="button"
        onClick={close}
        aria-label="Close announcement"
        className="absolute top-1 right-2 flex size-7 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-[#A1A1AA] hover:bg-line-soft hover:text-fg-subtle"
      >
        <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="m3.5 3.5 7 7M10.5 3.5l-7 7" />
        </svg>
      </button>
    </div>
  );
}
