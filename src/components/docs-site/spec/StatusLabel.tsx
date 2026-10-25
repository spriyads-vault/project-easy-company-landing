import { statusOf, type CapabilityId } from "@/content/capability-status";
import { Mono } from "../ui";

/** A capability's status in the docs, read from capability-status.ts (never written by hand). */
export default function StatusLabel({ capability }: { capability: CapabilityId }) {
  return <Mono className="ml-1.5 text-fg-muted">{statusOf(capability)}</Mono>;
}
