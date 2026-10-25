import { IDS, START } from "@/content/home-v8";
import WaitlistFormV8 from "../WaitlistFormV8";
import { H2, LEAD } from "../ui";

/** The conversion card with the waitlist (SECTION 7, #get-started). Every waitlist call to action on the page lands here. */
export default function Start() {
  return (
    <section id={IDS.getStarted} aria-labelledby="start-title" className="px-6 pt-[clamp(120px,13vw,200px)] pb-[clamp(96px,11vw,160px)]">
      <div
        data-reveal=""
        className="mx-auto grid max-w-[1120px] grid-cols-1 items-start gap-[clamp(36px,5vw,72px)] rounded-v8-panel bg-v8-start p-6 shadow-[0_0_0_1px_var(--color-v8-ring)] v8n:p-16 v8w:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      >
        <div>
          <span className="inline-flex rounded-full px-3.5 py-1 text-[15px] leading-[21px] text-v8-muted shadow-[0_0_0_1px_var(--color-v8-ring-pill)]">{START.tag}</span>
          <h2 id="start-title" className={`${H2} mt-5`}>
            {START.h2}
          </h2>
          <p className={`${LEAD} mt-5`}>{START.body}</p>
        </div>
        <WaitlistFormV8 />
      </div>
    </section>
  );
}
