import Link from "next/link";
import Label from "@/components/ui/Label";
import PixelWord from "@/components/ui/PixelWord";
import WaitlistButton from "@/components/waitlist/WaitlistButton";
import LazyScene from "./LazyScene";
import s from "./Steps.module.css";
import StepsController from "./StepsController";

interface Step {
  id: string;
  n: string;
  earlyAccess: boolean;
  title: string;
  body: string;
  docs: string;
  sceneLabel: string;
}

const STEPS: Step[] = [
  {
    id: "change-review",
    n: "01",
    earlyAccess: true,
    title: "Review the change, not the whole product.",
    body: "Open an engineering change and Crado traces it to every requirement, test result and certification it touches. See what still holds, what is at risk, and the smallest check that settles it, before anyone books the chamber.",
    docs: "/docs/concepts#products-revisions",
    sceneLabel: "Illustration: a change review of ECO-214 marks which FCC evidence is at risk, needs a retest or still holds",
  },
  {
    id: "failure-investigation",
    n: "02",
    earlyAccess: false,
    title: "Sharper with every test.",
    body: "When a test fails, Crado investigates with ranked likely causes, each with its evidence. The measured result feeds the next change review, inside your workspace and nowhere else.",
    docs: "/docs#first-investigation",
    sceneLabel: "Illustration: a case asks why Rev D failed at 144.2 MHz and gets ranked likely causes, a suggested next test and the Rev E retest",
  },
  {
    id: "evidence",
    n: "03",
    earlyAccess: true,
    title: "Built for revisions, not just reports.",
    body: "Lab emails, supplier threads and Slack decisions file themselves with the product, revision and case they belong to. The reasoning behind a change stays with its evidence, not in someone's inbox.",
    docs: "/docs/concepts#evidence",
    sceneLabel: "Illustration: reports, lab emails and decisions linked to the revision each one belongs to",
  },
];

const BUTTON = "inline-flex h-12 items-center rounded-md px-5 text-[17px] font-medium tracking-[-.005em] whitespace-nowrap transition-colors duration-150";

interface SceneBoxProps {
  step: Step;
  index: number;
  variant: "layer" | "inline";
  className: string;
}

/**
 * A fixed-size, labelled box; the scene inside is loaded lazily and centred and scaled to fit
 * (StepsController sets --scene-scale per box).
 */
function SceneBox({ step, index, variant, className }: SceneBoxProps) {
  return (
    <div data-scene-box role="img" aria-label={step.sceneLabel} className={className}>
      <LazyScene index={index} variant={variant} p={`${variant[0]}${index}-`} />
    </div>
  );
}

/**
 * Sticky 01/02/03 section, replacing the separate change review, failure investigation and evidence sections.
 * The step blocks keep the #change-review, #failure-investigation and #evidence anchors the nav links to.
 * Wide: texts scroll on the left, the sticky box on the right swaps scenes. Narrow: each step shows its scene inline.
 * The scene artwork is a lazy client chunk (most of the section's markup); the text, boxes and labels are server-rendered.
 */
export default function Steps() {
  return (
    <section aria-label="Change review, failure investigation and evidence" className="relative mx-auto max-w-(--container-steps) px-(--space-gutter) py-(--space-section)">
      <StepsController className={`${s.root} relative grid grid-cols-[minmax(0,1fr)] [view-timeline-name:--steps] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10`}>
        <div className="relative flex min-w-0 flex-col gap-[88px] lg:gap-0 lg:pl-8">
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-0 hidden w-px bg-line-1b lg:block">
            <span className={`${s.bar} absolute inset-0 block bg-accent-vivid`} />
          </div>
          {STEPS.map((step, i) => (
            <div
              key={step.id}
              id={step.id}
              role="group"
              aria-labelledby={`${step.id}-title`}
              data-step={i}
              data-on={i === 0 ? "" : undefined}
              className={`${s.step} flex flex-col items-start lg:min-h-[90vh] lg:justify-center`}
            >
              <div className="flex items-center gap-4">
                <span data-pxwrap className="text-[40px] leading-none text-accent-vivid">
                  <PixelWord grain={2}>{step.n}</PixelWord>
                </span>
                {step.earlyAccess && <Label>EARLY ACCESS</Label>}
              </div>
              <h2
                id={`${step.id}-title`}
                className="mt-6 text-[length:clamp(40px,3.9vw,56px)] leading-[1.05] font-semibold tracking-[-.03em] text-balance"
              >
                {step.title}
              </h2>
              <p className="mt-7 max-w-[480px] text-[20px] leading-[1.5] tracking-[-.005em] text-pretty text-white/60">{step.body}</p>
              <div data-step-actions className="mt-10 flex flex-wrap gap-3">
                <WaitlistButton source="section" className={`${BUTTON} cursor-pointer border-0 bg-white text-ink hover:bg-white-hover`}>
                  Join early access
                </WaitlistButton>
                <Link href={step.docs} className={`${BUTTON} border border-line-6 bg-surface-2 text-fg hover:border-line-9 hover:bg-surface-5 hover:text-fg`}>
                  Read the docs
                </Link>
              </div>
              <div data-inline-scene className="mt-16 w-full lg:hidden">
                <SceneBox step={step} index={i} variant="inline" className="relative mx-auto aspect-[4/3] w-full max-w-[720px]" />
              </div>
            </div>
          ))}
        </div>
        <div className="relative hidden min-w-0 lg:block">
          <div className="sticky top-[max(88px,calc(50vh-280px))] h-[560px]">
            {STEPS.map((step, i) => (
              <div
                key={step.id}
                data-layer
                data-state={i === 0 ? "on" : "after"}
                aria-hidden={i === 0 ? "false" : "true"}
                className={`${s.layer} absolute inset-0`}
              >
                <SceneBox step={step} index={i} variant="layer" className="absolute inset-0" />
              </div>
            ))}
          </div>
        </div>
      </StepsController>
    </section>
  );
}
