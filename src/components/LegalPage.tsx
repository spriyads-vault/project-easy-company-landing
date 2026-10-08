import type { ReactNode } from "react";
import SiteShell from "@/components/site/SiteShell";
import type { LegalDoc } from "@/lib/legal";
import { CONTACT_EMAIL } from "@/lib/site";

// Turn bare mentions of the contact address into mailto links.
function linkify(text: string): ReactNode {
  const parts = text.split(CONTACT_EMAIL);
  if (parts.length === 1) return text;
  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <a key={i} href={`mailto:${CONTACT_EMAIL}`} className="text-fg underline underline-offset-[3px]">
            {CONTACT_EMAIL}
          </a>,
          part,
        ],
  );
}

/** Privacy and Terms, restyled with the site tokens (no dedicated design). */
export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <SiteShell variant="page">
      <main id="main" className="mx-auto max-w-article px-(--space-gutter) py-[clamp(64px,8vw,112px)]">
        <p className="m-0 font-mono text-[10px] tracking-[0.1em] text-fg-faint">LAST UPDATED · {doc.lastUpdated.toUpperCase()}</p>
        <h1 className="m-0 mt-4 mb-12 border-b border-line-2 pb-6 text-[clamp(32px,4vw,44px)] leading-[1.1] font-bold tracking-[-0.035em]">
          {doc.title}
        </h1>
        <div className="space-y-6 font-sans text-[15px] leading-[1.7] text-fg-5">
          {doc.sections.map((section) => (
            <section key={section.heading} aria-label={section.heading} className="space-y-5">
              <h2 className="mt-12 mb-4 font-display text-[22px] leading-[1.25] font-bold tracking-[-0.02em] text-fg">{section.heading}</h2>
              {section.blocks.map((block, i) =>
                block.type === "p" ? (
                  <p key={i} className="m-0">
                    {linkify(block.text)}
                  </p>
                ) : (
                  <ul key={i} className="m-0 list-disc space-y-3 pl-5 marker:text-fg-faint">
                    {block.items.map((item) => (
                      <li key={item.text}>
                        {item.label && <strong className="font-medium text-fg">{item.label}: </strong>}
                        {linkify(item.text)}
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </section>
          ))}
        </div>
      </main>
    </SiteShell>
  );
}
