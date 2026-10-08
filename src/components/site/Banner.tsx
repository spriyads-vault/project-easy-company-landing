import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";

/** Announcement strip above the nav. The home variant sits on the hero's accent band. */
export default function Banner({ variant }: { variant: "home" | "docs" }) {
  if (variant === "home") {
    return (
      <a
        href={`mailto:${CONTACT_EMAIL}`}
        className="relative z-10 flex justify-center border-b border-on-accent/16 px-4 py-[9px] text-center font-mono text-[11px] tracking-[0.04em] text-balance text-on-accent/85 hover:text-on-accent"
      >
        EARLY ACCESS · Change review for connected-hardware teams →
      </a>
    );
  }
  return (
    <Link
      href="/#join"
      className="flex justify-center border-b border-surface-5 px-4 py-[9px] text-center font-mono text-[11px] tracking-[0.04em] text-balance text-fg-muted hover:text-fg"
    >
      <span>
        <span className="text-fg-4">PILOT PROGRAMME</span> · Now accepting hardware teams preparing for certification ·{" "}
        <span className="text-fg">Apply →</span>
      </span>
    </Link>
  );
}
