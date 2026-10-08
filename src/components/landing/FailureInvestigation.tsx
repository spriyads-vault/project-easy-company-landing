import Label from "@/components/ui/Label";
import WaitlistButton from "@/components/waitlist/WaitlistButton";
import LoopDiagram from "./diagrams/LoopDiagram";
import { ApprovalPill, EngineChip, LoopNode, RankCard } from "./diagrams/LoopParts";
import PcbCanvas from "./diagrams/PcbCanvas";

const GRID_STYLE = {
  backgroundImage:
    "linear-gradient(var(--hairline-white-5) 1px, transparent 1px), linear-gradient(90deg, var(--hairline-white-5) 1px, transparent 1px)",
  backgroundSize: "64px 64px",
  backgroundPosition: "center",
  maskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
  WebkitMaskImage: "radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)",
} as const;

/** Section copy. Rendered once per layout (only one is displayed); only the wide copy carries the heading id. */
function Copy({ headingId }: { headingId?: string }) {
  return (
    <>
      <Label>FAILURE INVESTIGATION</Label>
      <h2 id={headingId} className="m-0 mt-5 text-[30px] leading-[1.2] font-bold tracking-[-0.02em] text-balance">
        Sharper with every test.
      </h2>
      <p className="m-0 mt-4 text-[15px] leading-[1.6] text-pretty text-fg-6">
        When a test fails, Crado investigates with ranked likely causes, each with its evidence. The measured result stays on
        the case, ready for the next review.
      </p>
      <div className="mt-6">
        <WaitlistButton
          source="section"
          className="inline-flex h-8 cursor-pointer items-center rounded-sm border-0 bg-fg px-3 text-sm font-medium text-bg hover:bg-white"
        >
          Join early access
        </WaitlistButton>
      </div>
    </>
  );
}

function Connector() {
  return (
    <div aria-hidden="true" className="flex flex-col items-center py-1.5">
      <span className="block h-5 w-px bg-line-7" />
      <svg width="9" height="6" viewBox="0 0 9 6">
        <path d="M.5 .5 4.5 5 8.5 .5" fill="none" className="stroke-line-7" />
      </svg>
    </div>
  );
}

export default function FailureInvestigation() {
  return (
    <section
      id="failure-investigation"
      aria-labelledby="failure-investigation-title"
      className="relative mt-(--space-section) overflow-hidden border-y border-surface-3 bg-bg-raised"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={GRID_STYLE} />
      <div className="relative mx-auto max-w-page px-(--space-gutter) font-sans">
        {/* Wide: the loop stage with the copy inside it, bottom-left. */}
        <div className="hidden lg:block">
          <LoopDiagram>
            <Copy headingId="failure-investigation-title" />
          </LoopDiagram>
        </div>

        {/* Narrow: the loop as a vertical stack, then the copy. */}
        <div className="flex flex-col pt-14 pb-16 lg:hidden">
          <div data-diagram="loop-stack" className="mx-auto flex w-full max-w-[360px] flex-col">
            <div className="flex flex-col items-center gap-2.5 pb-4">
              <PcbCanvas height={56} />
              <span className="text-[13px] font-semibold">Crado</span>
            </div>
            <LoopNode index={0} className="relative" />
            <div className="flex justify-center pt-2">
              <ApprovalPill />
            </div>
            <Connector />
            <LoopNode index={1} className="relative" />
            <Connector />
            <LoopNode index={2} className="relative" />
            <RankCard className="mt-2" />
            <Connector />
            <LoopNode index={3} className="relative" />
            <EngineChip className="mt-2 self-start" />
          </div>
          <div className="mt-14 flex flex-col items-start font-display">
            <Copy />
          </div>
        </div>
      </div>
    </section>
  );
}
