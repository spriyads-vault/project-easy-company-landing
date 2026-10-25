import { isLive, statusOf, type CapabilityId } from "@/content/capability-status";
import { MONO } from "./ui";

/** A capability's status label, read from capability-status.ts (components never write a status themselves). */
export default function StatusTag({ capability, className = "" }: { capability: CapabilityId; className?: string }) {
  const status = statusOf(capability);
  const live = isLive(capability);
  return (
    <span
      data-status-tag={status}
      className={`inline-flex rounded-v8-chip border px-[7px] py-px ${MONO} text-[10.5px] leading-4 tracking-[0.08em] whitespace-nowrap ${
        live ? "border-v8-line text-v8-ink" : "border-v8-line text-v8-faint"
      } ${className}`}
    >
      {status}
    </span>
  );
}
