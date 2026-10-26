import Link from "next/link";
import { ANNOUNCEMENT, IDS, fromPage } from "@/content/home-v8";
import { MONO } from "./ui";

/** The 36px announcement bar above the header (homepage and every docs and legal page). One link, to the waitlist. */
export default function AnnouncementBar({ linkBase }: { linkBase: "" | "/" }) {
  const href = fromPage(`#${IDS.getStarted}`, linkBase);
  const inner = (
    <>
      <span className="text-v8-rust-text">{ANNOUNCEMENT.label}</span>
      <span aria-hidden="true" className="text-v8-faint">
        ·
      </span>
      <span className="text-v8-dim max-v8n:hidden">{ANNOUNCEMENT.text}</span>
      <span aria-hidden="true" className="text-v8-faint max-v8n:hidden">
        ·
      </span>
      <span className="text-v8-white">{ANNOUNCEMENT.cta}</span>
    </>
  );
  const className = `flex h-9 items-center justify-center gap-2.5 border-b border-v8-line bg-v8-inset px-4 whitespace-nowrap ${MONO} text-[11.5px] leading-none tracking-[0.04em] hover:[&>span:last-child]:underline`;
  return (
    <div data-announcement="">
      {linkBase ? (
        <Link href={href} className={className}>
          {inner}
        </Link>
      ) : (
        <a href={href} data-wl-source="section" className={className}>
          {inner}
        </a>
      )}
    </div>
  );
}
