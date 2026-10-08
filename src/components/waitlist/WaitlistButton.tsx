"use client";

import type { ReactNode } from "react";
import type { WaitlistSource } from "@/lib/waitlist/schema";
import { useWaitlist } from "./WaitlistProvider";

interface WaitlistButtonProps {
  source: WaitlistSource;
  className?: string;
  children: ReactNode;
}

/** Any "Join early access" control. Opens the shared waitlist dialog and records where it was opened from. */
export default function WaitlistButton({ source, className, children }: WaitlistButtonProps) {
  const { open } = useWaitlist();
  return (
    <button
      type="button"
      aria-haspopup="dialog"
      data-waitlist-source={source}
      onClick={(e) => open(source, e.currentTarget)}
      className={className}
    >
      {children}
    </button>
  );
}
