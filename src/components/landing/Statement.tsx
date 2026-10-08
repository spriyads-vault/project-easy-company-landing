import StatementFrame from "./diagrams/StatementFrame";

/** "Your engineers, minus the evidence hunt": statement and the Sense Hub change review window. */
export default function Statement() {
  return (
    <section aria-labelledby="statement-title" className="mx-auto max-w-page px-(--space-gutter) pt-(--space-section)">
      <p className="mb-12 text-center font-mono text-[10px] leading-[1.55] tracking-[0.1em] text-fg-faint">
        BUILT FOR TEAMS SHIPPING CONNECTED HARDWARE
      </p>
      <div className="flex flex-col items-center text-center">
        <h2 id="statement-title" className="text-[30px] leading-[1.12] font-bold tracking-[-0.03em] text-balance sm:text-[40px]">
          Your engineers, minus the evidence hunt
        </h2>
        <p className="mt-4 max-w-[600px] text-[15px] leading-[1.6] text-pretty text-fg-6">
          Crado&apos;s agents read lab reports, keep every finding tied to its revision and cite the source it came from. In
          early access, they also trace changes and file email and Slack decisions with each case.
        </p>
      </div>
      <StatementFrame />
    </section>
  );
}
