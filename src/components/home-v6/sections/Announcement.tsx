import { ANNOUNCEMENT, CTA } from "@/content/home-v6";
import { CONTAINER } from "../ui";

/** Sunshine announcement bar above the header (design: announcement). */
export default function Announcement() {
  return (
    <aside aria-label="Announcement" className="bg-v6-sun text-v6-ink">
      <div className={`${CONTAINER} flex min-h-10 flex-wrap items-center justify-between gap-x-4 gap-y-1 py-3 font-v6-mono text-[12px] leading-4 font-medium`}>
        <span>
          {ANNOUNCEMENT}
          <a href="#waitlist" className="text-v6-ink underline-offset-[3px] hover:text-v6-ink hover:underline">
            {CTA.join} →
          </a>
        </span>
      </div>
    </aside>
  );
}
