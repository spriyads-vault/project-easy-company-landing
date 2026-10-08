"use client";

import { useEffect, useRef, useState } from "react";
import type { WaitlistSource } from "@/lib/waitlist/schema";
import WaitlistForm from "./WaitlistForm";

interface WaitlistDialogProps {
  open: boolean;
  source: WaitlistSource;
  onClose: () => void;
  /** Called once the visitor reaches the final state, so the next open starts fresh. */
  onFinished: () => void;
}

const FOCUSABLE = 'button:not([disabled]), a[href], input:not([disabled]):not([tabindex="-1"]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Waitlist modal: centred 480px panel on desktop, bottom sheet under 760px. Focus is trapped while open,
 * Escape and the scrim close it, and the provider returns focus to the control that opened it.
 * It stays mounted after closing so entered details survive a close and reopen (design behaviour).
 */
export default function WaitlistDialog({ open, source, onClose, onFinished }: WaitlistDialogProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [titleId, setTitleId] = useState<string>();

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    // Focus the first field (design: first input or button in the step).
    const first = panel?.querySelector<HTMLElement>('[data-step] input:not([tabindex="-1"]), [data-step] button, [data-step] a[href]');
    first?.focus({ preventScroll: true });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const a = items[0];
      const z = items[items.length - 1];
      const active = document.activeElement;
      if (!panel.contains(active)) {
        e.preventDefault();
        a.focus();
      } else if (e.shiftKey && (active === a || active === panel)) {
        e.preventDefault();
        z.focus();
      } else if (!e.shiftKey && active === z) {
        e.preventDefault();
        a.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <div
      hidden={!open}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-90 flex items-end justify-center bg-(--scrim) p-0 sm:items-center sm:p-6"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[calc(100dvh-24px)] w-full overflow-y-auto rounded-t-2xl border border-line-3 bg-surface-2 px-5 pt-5 pb-[calc(20px+env(safe-area-inset-bottom))] text-left leading-normal shadow-modal motion-safe:animate-panel-in sm:w-[480px] sm:max-w-full sm:rounded-2xl sm:p-8"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-md border-0 bg-transparent text-fg-6 transition-colors hover:bg-surface-6"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>
        <WaitlistForm
          variant="modal"
          source={source}
          headingLevel={2}
          onTitleId={setTitleId}
          onStepChange={(s) => {
            if (s === 3) onFinished();
          }}
        />
      </div>
    </div>
  );
}
