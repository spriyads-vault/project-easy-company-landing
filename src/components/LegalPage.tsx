import type { ReactNode } from "react";
import type { LegalDoc } from "@/lib/legal";
import Footer from "./Footer";
import Header from "./Header";

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
    <div className="min-h-screen bg-[#F4F2EC] text-[#2A3441]">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-32">
        <h1 className="mb-12 border-b border-[#2A3441] pb-6 font-display text-4xl font-bold tracking-tight md:text-5xl">
          {doc.title}
        </h1>
        <div className="space-y-6 font-sans text-sm leading-relaxed text-[#2A3441]/80 md:text-base">
          <p className="font-mono text-xs tracking-[0.04em] text-[#2A3441] uppercase">
            Last updated: {doc.lastUpdated}
          </p>
          {doc.sections.map((section) => (
            <section key={section.heading} aria-label={section.heading} className="space-y-6">
              <h2 className="mt-12 mb-4 font-display text-xl font-bold text-[#2A3441]">
                {section.heading}
              </h2>
              {section.blocks.map((block, i) =>
                block.type === "p" ? (
                  <p key={i}>{linkify(block.text)}</p>
                ) : (
                  <ul key={i} className="list-disc space-y-3 pl-5 marker:text-[#2A3441]">
                    {block.items.map((item) => (
                      <li key={item.text}>
                        {item.label && (
                          <strong className="font-semibold text-[#2A3441]">{item.label}: </strong>
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
      <Footer />
    </div>
  );
}
