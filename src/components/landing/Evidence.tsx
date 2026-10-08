import RecordDiagram from "@/components/landing/diagrams/RecordDiagram";
import Label from "@/components/ui/Label";

export default function Evidence() {
  return (
    <section id="evidence" aria-labelledby="evidence-title" className="mx-auto max-w-page px-(--space-gutter) pt-(--space-section)">
      <div className="flex flex-col items-center text-center">
        <Label>EVIDENCE AND COMMUNICATIONS</Label>
        <h2 id="evidence-title" className="mt-5 text-[30px] leading-[1.2] font-bold tracking-[-0.02em] text-balance">
          Built for revisions, not just reports.
        </h2>
        <p className="mt-4 max-w-[600px] text-[15px] leading-[1.6] text-pretty text-fg-6">
          Lab emails, supplier threads and Slack decisions file themselves with the product, revision and case they belong to. The
          reasoning behind a change stays with its evidence, not in someone&apos;s inbox.
        </p>
        <span className="mt-5">
          <Label>EARLY ACCESS</Label>
        </span>
      </div>
      <RecordDiagram />
    </section>
  );
}
