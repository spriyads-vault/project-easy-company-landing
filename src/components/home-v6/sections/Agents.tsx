import Link from "next/link";
import { isLive, isRoadmap } from "@/content/capability-status";
import { AGENTS, AGENTS_H2, AGENTS_INTRO } from "@/content/home-v6";
import { TEASER_LINKS } from "@/content/section-pages";
import { SECTION_PATHS } from "../links";
import RecordBlockCanvas from "../RecordBlockCanvas";
import { CONTAINER, H2, H3, INTRO, LABEL, MONO, Pill, SMALL, StatusTag, TEASER_LINK_ON_DARK } from "../ui";

/** Homepage teaser: the LIVE agents and the first two ROADMAP agents, from capability-status.ts. */
const TEASER_AGENTS = [...AGENTS.filter((a) => isLive(a.capability)), ...AGENTS.filter((a) => isRoadmap(a.capability)).slice(0, 2)];

interface AgentsProps {
  /** Homepage with section pages on: a few agents and a link to /agents. */
  teaser?: boolean;
  /** Show the intro next to the heading (off on /agents, where it is the page intro). */
  intro?: boolean;
}
import LegacyAnchors from "./LegacyAnchors";

/** Forest band: the six agents with their status, and the still record block (design: AGENTS). */
export default function Agents({ teaser = false, intro = true }: AgentsProps) {
  const agents = teaser ? TEASER_AGENTS : AGENTS;
  return (
    <section id="agents" data-screen-label="Agents" data-band="dark" className="relative bg-v6-forest py-(--v6-section) text-v6-on-dark">
      <LegacyAnchors section="agents" />
      <div className={`${CONTAINER} flex flex-col gap-16`}>
        <div className="flex flex-col gap-5">
          <Pill tone="sun">Agents</Pill>
          <div className="grid grid-cols-12 items-start gap-6">
            <h2 className={`${H2} col-[1/-1] v6t:col-[1/7]`}>{AGENTS_H2}</h2>
            {intro && <p className={`${INTRO} col-[1/-1] max-w-[44ch] text-v6-on-dark-muted v6t:col-[7/13] v6d:col-[8/13]`}>{AGENTS_INTRO}</p>}
          </div>
        </div>
        <div className="grid grid-cols-12 items-start gap-x-6 gap-y-12">
          <ul className="col-[1/-1] m-0 grid list-none grid-cols-1 gap-x-10 border-t border-v6-dark-line p-0 v6d:col-[1/9] v6d:grid-cols-2">
            {agents.map((a) => (
              <li key={a.name} className="flex flex-col gap-3 border-b border-v6-dark-line py-7">
                <div className="flex flex-wrap items-center gap-2">
                  <StatusTag capability={a.capability} />
                  <span className={`${LABEL} text-v6-on-dark-muted uppercase`}>{a.stage}</span>
                </div>
                <h3 className={H3}>{a.name}</h3>
                <p className={`m-0 ${SMALL} text-pretty`}>{a.body}</p>
                <div className={`${MONO} text-v6-on-dark-muted`}>{a.ask}</div>
              </li>
            ))}
          </ul>
          {teaser && (
            <Link href={SECTION_PATHS.agents} className={`${TEASER_LINK_ON_DARK} col-[1/-1] v6d:row-start-2`}>
              {TEASER_LINKS.agents}
            </Link>
          )}
          <div className="sticky top-[100px] col-[10/13] hidden v6d:block">
            <RecordBlockCanvas variant="agents" className="block aspect-square w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
