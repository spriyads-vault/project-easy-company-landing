import ChangeDiagram from "@/components/landing/diagrams/ChangeDiagram";
import Label from "@/components/ui/Label";
import WaitlistButton from "@/components/waitlist/WaitlistButton";

export default function ChangeReview() {
  return (
    <section
      id="change-review"
      aria-labelledby="change-review-title"
      className="mx-auto max-w-page px-(--space-gutter) pt-(--space-section)"
    >
      <div className="grid grid-cols-[minmax(0,1fr)] items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="flex min-w-0 flex-col items-start">
          <Label>CHANGE REVIEW</Label>
          <h2 id="change-review-title" className="mt-5 text-[30px] leading-[1.2] font-bold tracking-[-0.02em] text-balance">
            Review the change, not the whole product.
          </h2>
          <p className="mt-4 text-[15px] leading-[1.6] text-pretty text-fg-6">
            Open an engineering change and Crado traces it to every requirement, test result and certification it touches. See what
            still holds, what is at risk, and the smallest check that settles it, before anyone books the chamber.
          </p>
          <div className="mt-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.1em] text-fg-4">
            <span>TRACE</span>
            <span className="block h-px w-6 bg-line-7" aria-hidden="true" />
            <span>FLAG</span>
            <span className="block h-px w-6 bg-line-7" aria-hidden="true" />
            <span>PLAN</span>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <WaitlistButton
              source="section"
              className="inline-flex h-8 items-center rounded-sm bg-fg px-3 text-[14px] font-medium text-bg hover:bg-white"
            >
              Join early access
            </WaitlistButton>
            <Label>EARLY ACCESS</Label>
          </div>
        </div>
        <ChangeDiagram />
      </div>
    </section>
  );
}
