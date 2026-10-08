import ArrowLink from "@/components/ui/ArrowLink";
import Label from "@/components/ui/Label";
import LanesDiagram from "./diagrams/LanesDiagram";

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-title"
      className="mx-auto max-w-page px-(--space-gutter) py-(--space-section)"
    >
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="flex min-w-0 justify-center lg:justify-start">
          <LanesDiagram />
        </div>
        <div className="flex min-w-0 flex-col items-start">
          <Label>HOW IT WORKS</Label>
          <h2 id="how-it-works-title" className="m-0 mt-5 text-[length:clamp(34px,3.4vw,48px)] leading-[1.08] font-semibold tracking-[-0.03em] text-balance">
            Agents investigate. Rules evaluate. Engineers decide.
          </h2>
          <p className="m-0 mt-6 text-[17px] leading-normal tracking-[-0.005em] text-pretty text-fg-6">
            Agents do the legwork and label everything they propose. The evaluation engine checks confirmed values against
            published, versioned rules, and stops when evidence is incomplete. Engineers confirm, approve and decide.
          </p>
          <ArrowLink href="/docs#how-it-works" className="mt-10 leading-[1.55] text-fg">
            How Crado reaches a result
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
