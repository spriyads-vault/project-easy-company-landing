import PrinciplesReveal from "@/components/landing/diagrams/PrinciplesReveal";

const LINES = [{ text: "No guaranteed passes." }, { text: "No certification determinations." }, { text: "Unknown stays unknown.", faint: true }];

export default function Principles() {
  return (
    <section aria-label="Product principles" className="mx-auto max-w-page px-(--space-gutter) pt-(--space-section)">
      <div className="flex flex-col items-center text-center">
        <PrinciplesReveal lines={LINES} />
        <span className="mt-7 font-mono text-[11px] tracking-[0.1em] text-fg-faint">CRADO PRODUCT PRINCIPLES</span>
      </div>
    </section>
  );
}
