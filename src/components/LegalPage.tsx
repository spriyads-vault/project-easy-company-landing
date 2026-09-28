import type { ReactNode } from "react";
import type { LegalDoc } from "@/lib/legal";
import AnnouncementBar from "./site/AnnouncementBar";
import SiteFooter from "./site/SiteFooter";
import SiteHeader from "./site/SiteHeader";

const EMAIL = "hello@crado.io";

// Turn bare mentions of the contact address into mailto links.
function linkify(text: string): ReactNode {
  const parts = text.split(EMAIL);
  if (parts.length === 1) return text;
  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <a key={i} href={`mailto:${EMAIL}`} className="underline underline-offset-[3px]">
            {EMAIL}
          </a>,
          part,
        ],
  );
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  return (
    <div className="min-h-screen bg-oat font-sans text-ink">
      <AnnouncementBar />
      <SiteHeader />
      <main id="main" className="mx-auto max-w-3xl px-gutter py-[clamp(64px,8vw,112px)]">
        <h1 className="mb-12 border-b border-ink pb-6 font-display text-4xl font-medium tracking-[-0.03em] md:text-5xl">
          {doc.title}
        </h1>
        <div className="space-y-6 font-sans text-sm leading-relaxed text-ink/80 md:text-base">
          <p className="font-mono text-xs tracking-[0.04em] text-ink uppercase">
            Last updated: {doc.lastUpdated}
          </p>
          {doc.sections.map((section) => (
            <section key={section.heading} aria-label={section.heading} className="space-y-6">
              <h2 className="mt-12 mb-4 font-display text-xl font-medium text-ink">
                {section.heading}
              </h2>
              {section.blocks.map((block, i) =>
                block.type === "p" ? (
                  <p key={i}>{linkify(block.text)}</p>
                ) : (
                  <ul key={i} className="list-disc space-y-3 pl-5 marker:text-ink">
                    {block.items.map((item) => (
                      <li key={item.text}>
                        {item.label && (
                          <strong className="font-semibold text-ink">{item.label}: </strong>
                        )}
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
      <SiteFooter />
    </div>
  );
}
