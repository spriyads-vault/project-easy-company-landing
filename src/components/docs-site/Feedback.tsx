"use client";

import { useState } from "react";

const BUTTON = "h-7 cursor-pointer rounded-sm border border-line-4 bg-transparent px-3 font-sans text-[13px] text-fg-3 hover:bg-surface-3 hover:text-fg";

/** "Was this page helpful?" Local state only; nothing is sent. */
export default function Feedback() {
  const [done, setDone] = useState(false);
  return (
    <div className="flex items-center gap-2.5" aria-live="polite">
      {done ? (
        <span>Thanks for the feedback.</span>
      ) : (
        <>
          <span>Was this page helpful?</span>
          <button type="button" onClick={() => setDone(true)} className={BUTTON}>
            Yes
          </button>
          <button type="button" onClick={() => setDone(true)} className={BUTTON}>
            No
          </button>
        </>
      )}
    </div>
  );
}
