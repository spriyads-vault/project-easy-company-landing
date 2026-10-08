import Link from "next/link";
import PixelWord from "@/components/ui/PixelWord";
import WaitlistButton from "@/components/waitlist/WaitlistButton";
import ChromeObject from "./hero/ChromeObject";
import HeroWindow from "./hero/HeroWindow";
import ToolsStrip from "./hero/ToolsStrip";

const BUTTON = "inline-flex h-[52px] items-center justify-center rounded-sm px-[22px] text-[17px] font-medium tracking-[-.005em] whitespace-nowrap transition-colors duration-150";

/**
 * Home hero on the flat hero band. Server component: the h1 and paragraph are plain server-rendered text with no
 * entrance animation, so the h1 paints as the LCP element on first frame. The pixel accent, the chrome ring and
 * the product window below are the only moving parts.
 */
export default function Hero() {
  return (
    <section
      data-hero
      aria-labelledby="hero-title"
      className="relative mx-auto max-w-page px-(--space-gutter) pt-(--space-hero-top) text-white [&_:focus-visible]:outline-white"
    >
      <div className="flex flex-col items-start">
        <div className="flex items-center gap-2.5 text-[18px] font-medium tracking-[-.005em]">
          <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" className="flex-none fill-current">
            <path d="M12 3C12.8 8.5 15.5 11.2 21 12C15.5 12.8 12.8 15.5 12 21C11.2 15.5 8.5 12.8 3 12C8.5 11.2 11.2 8.5 12 3Z" />
          </svg>
          <span>Case threads</span>
        </div>
        <h1
          id="hero-title"
          className="mt-7 text-[44px] leading-none font-semibold tracking-[-.035em] [font-variation-settings:'opsz'_32] sm:text-[72px]"
        >
          Compliance, inside
          <ChromeObject />{" "}
          {/* The space before the break keeps the text "Compliance, inside the engineering loop." */}
          <br />
          the engineering <PixelWord>loop</PixelWord>.
        </h1>
        <p className="mt-8 max-w-[760px] text-[length:clamp(18px,1vw+14px,20px)] leading-[1.5] tracking-[-.005em] text-pretty text-white/92">
          Crado keeps test evidence tied to every product revision and checks radiated-emissions results against FCC Part 15 limits. In early
          access, agents trace design changes to the tests and certifications they touch.
        </p>
        <div className="mt-10 flex flex-col items-stretch justify-between gap-8 self-stretch sm:flex-row sm:items-end sm:gap-6">
          <div className="flex flex-col gap-3 sm:flex-row">
            <WaitlistButton source="hero" className={`${BUTTON} cursor-pointer border-0 bg-white text-ink hover:bg-white-hover`}>
              Join early access
            </WaitlistButton>
            <Link href="/docs" className={`${BUTTON} border border-white/35 bg-white/6 text-white hover:bg-white/12 hover:text-white`}>
              Read the docs
            </Link>
          </div>
          <ToolsStrip />
        </div>
      </div>
      <HeroWindow />
    </section>
  );
}
