import ArrowLink from "@/components/ui/ArrowLink";
import PixelWord from "@/components/ui/PixelWord";
import WaitlistForm from "@/components/waitlist/WaitlistForm";

/**
 * Final call to action with the inline waitlist. The design's one-row inline form is replaced (owner's request)
 * by the full two-step flow in a framed card built from the modal's parts and tokens.
 */
export default function FinalCta() {
  return (
    <section aria-labelledby="cta-title" className="mx-auto max-w-page px-(--space-gutter) py-(--space-section)">
      <div className="flex flex-col items-center text-center">
        <h2 id="cta-title" className="m-0 text-[44px] leading-none font-bold tracking-[-0.04em] text-balance sm:text-[72px]">
          Bring us your next{" "}
          <br />
          design <PixelWord>change</PixelWord>.
        </h2>
        <p className="m-0 mt-6 max-w-[520px] text-base leading-[1.55] text-pretty text-fg-5">
          Early-access pilots for connected-hardware teams, reviewed against your own test history.
        </p>
      </div>

      <div
        data-waitlist-inline
        className="mx-auto mt-10 w-full max-w-form rounded-2xl border border-line-3 bg-surface-2 p-5 text-left shadow-modal sm:p-8"
      >
        <WaitlistForm variant="inline" source="final_cta_inline" headingLevel={3} />
      </div>

      <div className="mt-8 flex justify-center">
        <ArrowLink href="/docs">Read the docs</ArrowLink>
      </div>
    </section>
  );
}
