import Image from "next/image";
import { LIVE_INTEGRATIONS } from "@/lib/integrations";

export type SourceKind = "layout" | "report" | "chat" | "slack" | "whatsapp" | "mail" | "search";

// Neutral line icons, drawn on an 18px grid.
const PATHS: Record<Exclude<SourceKind, "slack" | "whatsapp">, string> = {
  layout: "M2.5 2.5h13v13h-13zM6.5 2.5v4.5h5v8.5M2.5 10.5h4",
  report: "M4.5 2h6l3 3v11h-9zM10.5 2v3h3M6.5 9.5h5M6.5 12.5h5",
  chat: "M3 4.5A1.5 1.5 0 0 1 4.5 3h9A1.5 1.5 0 0 1 15 4.5v6a1.5 1.5 0 0 1-1.5 1.5H8l-3.5 3v-3H4.5A1.5 1.5 0 0 1 3 10.5z",
  mail: "M2.5 4h13v10h-13zM3 5l6 4.5L15 5",
  search: "M8 3.2a4.8 4.8 0 1 1 0 9.6a4.8 4.8 0 1 1 0-9.6zM11.6 11.6l3.6 3.6",
};

const MARKS = {
  slack: { live: LIVE_INTEGRATIONS.slack, src: "/assets/marks/slack.svg" },
  whatsapp: { live: LIVE_INTEGRATIONS.whatsapp, src: "/assets/marks/whatsapp.svg" },
};

/**
 * Icon for an evidence source. Slack and WhatsApp show their official mark only
 * when the integration is live; otherwise a neutral chat icon stands in.
 */
export default function SourceIcon({
  kind,
  size = 16,
  stroke = "#52525B",
}: {
  kind: SourceKind;
  size?: number;
  stroke?: string;
}) {
  if (kind === "slack" || kind === "whatsapp") {
    const mark = MARKS[kind];
    if (mark.live) {
      return <Image src={mark.src} alt="" width={size} height={size} unoptimized className="block flex-none" />;
    }
    kind = "chat";
  }
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 18 18"
      fill="none"
      stroke={stroke}
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="block flex-none"
    >
      <path d={PATHS[kind]} />
    </svg>
  );
}
