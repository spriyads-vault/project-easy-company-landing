import type { CSSProperties, ReactNode } from "react";

const GRAIN = "url(/assets/grain.svg)";
const SIZES = "200px 200px, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 100% 100%";
const DUSK = "radial-gradient(140% 80% at 50% 120%, #2A3441 0%, #2A3441 30%, rgba(42,52,65,0) 75%)";

/** Graded backdrops behind each mockup: blue for evaluate, lilac for investigate, butter for maintain. */
export const BACKDROPS = {
  blue: [
    GRAIN,
    "radial-gradient(120% 70% at 20% 0%, #CDDDF2 0%, rgba(255,255,255,0) 60%)",
    "radial-gradient(90% 60% at 85% 25%, #CDDDF2 0%, rgba(255,255,255,0) 65%)",
    "radial-gradient(110% 70% at 50% 62%, #6D85AD 0%, rgba(109,133,173,0) 70%)",
    DUSK,
    "linear-gradient(180deg, #F5F7FB 0%, #6D85AD 60%, #2A3441 100%)",
  ],
  lilac: [
    GRAIN,
    "radial-gradient(120% 70% at 20% 0%, #BFA3E6 0%, rgba(255,255,255,0) 60%)",
    "radial-gradient(90% 60% at 85% 25%, #BFA3E6 0%, rgba(255,255,255,0) 65%)",
    "radial-gradient(110% 70% at 50% 62%, #6D85AD 0%, rgba(109,133,173,0) 70%)",
    DUSK,
    "linear-gradient(180deg, #F5F7FB 0%, #6D85AD 60%, #2A3441 100%)",
  ],
  butter: [
    GRAIN,
    "radial-gradient(120% 70% at 20% 0%, rgba(246,227,158,0.4) 0%, rgba(255,255,255,0) 60%)",
    "radial-gradient(90% 60% at 85% 25%, rgba(246,227,158,0.4) 0%, rgba(255,255,255,0) 65%)",
    "radial-gradient(110% 70% at 50% 62%, #BFA3E6 0%, rgba(109,133,173,0) 70%)",
    DUSK,
    "linear-gradient(180deg, #F5F7FB 0%, #BFA3E6 60%, #2A3441 100%)",
  ],
};

export function backdrop(tone: keyof typeof BACKDROPS): CSSProperties {
  return { backgroundImage: BACKDROPS[tone].join(", "), backgroundSize: SIZES };
}

type Props = {
  id: string;
  numeral: string;
  eyebrow: string;
  title: string;
  body: string;
  tone: keyof typeof BACKDROPS;
  alt: string;
  caption: string;
  children: ReactNode;
};

/** One outcome: heading, the product mockup on its graded backdrop, and a caption. */
export default function Outcome({ id, numeral, eyebrow, title, body, tone, alt, caption, children }: Props) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-h`}
      className="px-[clamp(16px,2.2vw,32px)] pt-[clamp(96px,11.1vw,160px)]"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col items-center">
        <div data-rv="up" className="flex flex-wrap items-center justify-center gap-[clamp(20px,2.4vw,40px)] text-center min-[760px]:text-left">
          <span
            aria-hidden="true"
            data-numeral={numeral}
            className="font-display text-[clamp(34px,3.9vw,56px)] leading-[1.08] tracking-[-0.05em] text-line"
          />
          <div>
            <p className="m-0 text-[11px] leading-[1.4] font-medium tracking-[0.08em] text-fg uppercase">{eyebrow}</p>
            <h2
              id={`${id}-h`}
              className="m-0 mt-3 text-[clamp(34px,3.9vw,56px)] leading-[1.08] tracking-[-0.05em] text-balance"
            >
              {title}
            </h2>
          </div>
        </div>
        <p
          data-rv="up"
          style={{ "--rv-d": "80ms" } as CSSProperties}
          className="mx-auto mt-8 mb-0 max-w-[38rem] text-center text-base leading-[1.65] tracking-[-0.015em] text-pretty text-fg-muted"
        >
          {body}
        </p>
        <div
          data-rv="frame"
          role="group"
          aria-label={alt}
          style={backdrop(tone)}
          className="relative mt-10 box-border w-full overflow-hidden rounded-3xl px-2.5 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.7),0_48px_96px_-48px_rgba(42,52,65,0.45)] min-[760px]:p-12"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-[18%] left-1/2 h-[70%] w-[70%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(255,255,255,0.55),rgba(255,255,255,0))]"
          />
          <div className="relative mx-auto max-w-[1120px]">{children}</div>
        </div>
        <p className="m-0 mt-3 text-center text-xs leading-[1.5] text-fg-subtle">Illustrative example</p>
        <p className="m-0 mt-4 text-center text-sm leading-[1.5] tracking-[-0.01em] text-fg">{caption}</p>
      </div>
    </section>
  );
}
