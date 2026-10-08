import ArrowLink from "@/components/ui/ArrowLink";
import PixelWord from "@/components/ui/PixelWord";
import WaitlistButton from "@/components/waitlist/WaitlistButton";
import HeroCollage, { ICON_PATH } from "./diagrams/HeroCollage";

/**
 * Home hero on the accent band. Server component: the h1 and paragraph are plain server-rendered text with no
 * entrance animation, so the h1 paints as the LCP element on first frame. Only the collage below animates.
 */
export default function Hero() {
  return (
    <section
      data-hero
      aria-labelledby="hero-title"
      className="relative mx-auto max-w-page px-(--space-gutter) pt-[clamp(48px,6vw,72px)] pb-20 text-on-accent"
    >
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2 text-[13px] font-medium">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="flex-none"
          >
            <path d={ICON_PATH.change} />
          </svg>
          <span>Change review</span>
          <span className="ml-1 font-mono text-[10px] tracking-[0.1em] text-on-accent/85">EARLY ACCESS</span>
        </div>
        <h1 id="hero-title" className="mt-6 text-[40px] leading-[1.02] font-bold tracking-[-0.04em] sm:text-[64px]">
          Compliance, inside{" "}
          <br />
          the engineering <PixelWord>loop</PixelWord>.
        </h1>
        <p className="mt-6 max-w-[500px] text-base leading-[1.55] text-pretty text-on-accent/85">
          Crado keeps test evidence tied to every product revision and checks results against published rules. In early
          access, agents trace design changes to the tests and certifications they touch.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-5">
          <WaitlistButton
            source="hero"
            className="inline-flex h-8 cursor-pointer items-center rounded-sm bg-fg px-3 text-sm font-medium text-bg hover:bg-white"
          >
            Join early access
          </WaitlistButton>
          <ArrowLink href="/docs" className="text-on-accent">
            Read the docs
          </ArrowLink>
        </div>
        {/* Replaces the design's label + integration-logo row; the box keeps that row's height (label 15.5 + 12 + icons, which wrap to a second line below ~456px) so nothing below shifts. */}
        <p className="mt-8 h-[83px] font-mono text-[10px] leading-[1.55] tracking-[0.1em] text-balance text-on-accent/85 min-[456px]:h-[59.5px]">
          WORKS WITH YOUR LAB REPORTS · PDF · TEXT · MARKDOWN
        </p>
      </div>
      <HeroCollage />
    </section>
  );
}
