import FaqAccordion from "@/components/landing/FaqAccordion";
import Label from "@/components/ui/Label";
import { FAQ } from "@/lib/faq";

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="mx-auto max-w-page px-(--space-gutter) pt-(--space-section)">
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
        <div className="flex flex-col items-start">
          <Label>FAQ</Label>
          <h2 id="faq-title" className="m-0 mt-5 text-[30px] leading-[1.2] font-bold tracking-[-0.02em]">
            Common questions
          </h2>
        </div>
        <FaqAccordion items={FAQ} />
      </div>
    </section>
  );
}
