import { FAQ_H2, FAQ_V8 } from "@/content/home-v8";
import { H2, Icon, SECTION } from "../ui";

/**
 * A short FAQ, styled as the capability ledger. Native <details>, so it works without JavaScript. The questions and
 * answers are FAQ_V8, the same list the FAQPage JSON-LD is generated from.
 */
export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className={SECTION}>
      <div className="mx-auto max-w-[1120px]">
        <h2 id="faq-title" data-reveal="" className={`${H2} max-w-[680px]`}>
          {FAQ_H2}
        </h2>
        <div className="mx-auto mt-14 max-w-[760px] shadow-[0_-1px_0_var(--color-v8-ring)]">
          {FAQ_V8.map((f) => (
            <details key={f.q} className="group shadow-[0_1px_0_var(--color-v8-ring)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[20px] leading-[28px] font-medium marker:hidden hover:text-v8-white [&::-webkit-details-marker]:hidden">
                <h3 className="m-0 text-[inherit] leading-[inherit] font-[inherit]">{f.q}</h3>
                <Icon name="expand_more" size={24} className="text-v8-muted transition-transform duration-200 ease-v8-ui group-open:rotate-180" />
              </summary>
              <p className="m-0 max-w-[640px] pb-7 text-[18px] leading-[29px] text-pretty text-v8-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
