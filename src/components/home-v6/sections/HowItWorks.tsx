import { statusOf } from "@/content/capability-status";
import Link from "next/link";
import { PRINCIPLES, SOURCES_NOTE, STACK, type StackLayer } from "@/content/home-v6";
import { TEASER_LINKS } from "@/content/section-pages";
import { SECTION_DOM_IDS, SECTION_PATHS } from "../links";
import { CONTAINER, H2, H3, LABEL, MONO, Pill, SMALL, TEASER_LINK } from "../ui";
import LegacyAnchors from "./LegacyAnchors";

const LAYER: Record<StackLayer["tone"], { box: string; body: string }> = {
  card: { box: "border border-v6-line-strong bg-v6-card", body: "" },
  sky: { box: "bg-v6-sky", body: "" },
  mint: { box: "bg-v6-mint", body: "" },
  forest: { box: "bg-v6-forest text-v6-on-dark", body: "text-v6-on-dark-muted" },
};

/**
 * Where Crado sits: the four-layer stack and the vision, record and boundary (design: WHERE CRADO SITS). `teaser`
 * (homepage with section pages on) keeps the heading and links to /how-it-works instead.
 */
export default function HowItWorks({ teaser = false }: { teaser?: boolean }) {
  return (
    <section id={SECTION_DOM_IDS.how} data-screen-label="How it works" className="relative bg-v6-alt py-(--v6-section)">
      <LegacyAnchors section="how" skip={SECTION_DOM_IDS.how} />
      <div className={`${CONTAINER} flex flex-col gap-16`}>
        <div className="flex flex-col gap-5">
          <Pill tone="sky">How it works</Pill>
          <div className="grid grid-cols-12 gap-6">
            <h2 className={`${H2} col-[1/-1] v6t:col-[1/7]`}>A record your engineers can check</h2>
          </div>
          {teaser && (
            <Link href={SECTION_PATHS.how} className={`${TEASER_LINK} mt-2`}>
              {TEASER_LINKS.how}
            </Link>
          )}
        </div>
        {!teaser && (
          <div className="grid grid-cols-12 items-start gap-x-6 gap-y-12">
            <div className="col-[1/-1] flex flex-col gap-4 v6t:col-[1/7]">
              <div className="flex flex-col gap-2">
                {STACK.map((l) => (
                  <div key={l.title} className={`flex flex-col gap-1 rounded-v6-card px-6 py-5 ${LAYER[l.tone].box}`}>
                    <div className={H3}>{l.title}</div>
                    <div className={`${SMALL} ${LAYER[l.tone].body}`}>{l.body}</div>
                  </div>
                ))}
              </div>
              <div className={`${MONO} text-v6-muted`}>
                {SOURCES_NOTE.live} {SOURCES_NOTE.next}: {statusOf(SOURCES_NOTE.capability)}.
              </div>
            </div>
            <div className="col-[1/-1] flex flex-col v6t:col-[7/13] v6d:col-[8/13]">
              {PRINCIPLES.map((p, i) => (
                <div key={p.label} className={`flex flex-col gap-3 ${i === 0 ? "pb-7" : `border-t border-v6-line-strong ${i === PRINCIPLES.length - 1 ? "pt-7" : "py-7"}`}`}>
                  <div className={`${LABEL} text-v6-muted uppercase`}>{p.label}</div>
                  <h3 className={`${H3} text-balance`}>{p.title}</h3>
                  <p className="m-0 text-pretty text-v6-muted">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
