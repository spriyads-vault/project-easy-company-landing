import AgentCard, { type AgentCardProps } from "@/components/landing/AgentCard";
import Label from "@/components/ui/Label";

const ICON = { width: 24, height: 24, viewBox: "0 0 24 24", "aria-hidden": true, className: "flex-none" } as const;

const AGENTS: AgentCardProps[] = [
  {
    name: "Change reviewer",
    label: "EARLY ACCESS",
    description: "See which evidence and certifications a design change touches.",
    prompt: "“What does ECO-214 do to our FCC evidence?”",
    icon: (
      <svg {...ICON} fill="var(--color-info)">
        <rect x="2" y="6" width="13" height="13" rx="2" opacity=".55" />
        <rect x="9" y="3" width="13" height="13" rx="2" />
      </svg>
    ),
  },
  {
    name: "EMC investigator",
    description: "Rank likely causes of a failed emissions test, with evidence for each.",
    prompt: "“Why did Rev D fail at 144.2 MHz?”",
    icon: (
      <svg {...ICON}>
        <rect x="2" y="2" width="20" height="20" rx="4" fill="var(--color-warn)" opacity=".25" />
        <path d="M4 15c2 0 2-7 4-7s2 9 4 9 2-12 4-12 2 7 4 7" fill="none" stroke="var(--color-warn)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Lab liaison",
    label: "EARLY ACCESS",
    description: "Keep test plans, samples and lab threads in step with each revision.",
    prompt: "“What did we agree with the lab about the cable?”",
    icon: (
      <svg {...ICON} fill="var(--color-ok)">
        <circle cx="8" cy="12" r="6" opacity=".55" />
        <circle cx="16" cy="12" r="6" />
      </svg>
    ),
  },
  {
    name: "Compliance writer",
    label: "EARLY ACCESS",
    description: "Draft review packages for engineers to check and approve.",
    prompt: "“Draft the Rev E review package.”",
    icon: (
      <svg {...ICON}>
        <path d="M5 2h10l5 5v15H5z" fill="var(--color-violet)" />
        <path d="M8 12h8M8 16h6" stroke="var(--color-surface-1b)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Retest planner",
    label: "EARLY ACCESS",
    description: "Propose the smallest set of checks that settles an open question.",
    prompt: "“What would settle the 96 MHz risk?”",
    icon: (
      <svg {...ICON} fill="var(--color-orange)">
        <circle cx="12" cy="12" r="10" opacity=".35" />
        <circle cx="12" cy="12" r="6" opacity=".7" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
  {
    name: "Evidence auditor",
    label: "ROADMAP",
    description: "Find evidence that went stale after a change, before an auditor does.",
    prompt: "“Which Rev D results no longer apply to Rev E?”",
    icon: (
      <svg {...ICON}>
        <circle cx="10" cy="10" r="7" fill="var(--color-pink)" />
        <path d="M15 15l6 6" stroke="var(--color-pink)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Agents() {
  return (
    <section id="agents" aria-labelledby="agents-title" className="mx-auto max-w-page px-(--space-gutter) pt-(--space-section)">
      <Label>AGENTS</Label>
      <h2 id="agents-title" className="m-0 mt-5 text-[30px] leading-[1.2] font-bold tracking-[-0.02em]">
        Put Crado agents to work
      </h2>
      <p className="m-0 mt-4 max-w-[640px] text-[15px] leading-[1.6] text-pretty text-fg-6">
        Agents work inside your workspace and ask before they act. Every output is backed by evidence you can check.
      </p>
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {AGENTS.map((agent) => (
          <AgentCard key={agent.name} {...agent} />
        ))}
      </div>
    </section>
  );
}
