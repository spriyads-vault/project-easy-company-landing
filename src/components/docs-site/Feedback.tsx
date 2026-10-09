"use client";

import { useState } from "react";

const BUTTON = "h-7 cursor-pointer rounded-sm border border-line-4 bg-transparent px-3 font-sans text-[13px] text-fg-3 hover:bg-surface-3 hover:text-fg";

/** "Was this page helpful?" Local state only; nothing is sent. The v6 docs pass their own button style. */
export default function Feedback({ buttonClassName = BUTTON }: { buttonClassName?: string }) {
  const [done, setDone] = useState(false);
  return (
    <div className="flex items-center gap-2.5" aria-live="polite">
      {done ? (
        <span>Thanks for the feedback.</span>
      ) : (
        <>
          <span>Was this page helpful?</span>
          <button type="button" onClick={() => setDone(true)} className={buttonClassName}>
            Yes
          </button>
          <button type="button" onClick={() => setDone(true)} className={buttonClassName}>
            No
          </button>
        </>
      )}
    </div>
  );
}
