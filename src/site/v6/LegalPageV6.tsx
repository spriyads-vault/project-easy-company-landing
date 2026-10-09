import { slugify } from "@/components/docs-site/slugify";
import { LABEL } from "@/components/home-v6/ui";
import { linkify } from "@/components/LegalPage";
import type { LegalDoc } from "@/lib/legal";
import SiteShellV6 from "./SiteShellV6";

const LINK = "text-v6-primary underline underline-offset-[3px] hover:text-v6-primary-hover";

/**
 * Privacy and Terms in the v6 design (SCRUM-296): one 72ch column with the section list at the top. The text is
 * src/lib/legal.ts, rendered exactly as the v3 page renders it (tests/e2e/v6/legal.spec.ts compares the two). Prints
 * as a plain document (site.css).
 */
export default function LegalPageV6({ doc }: { doc: LegalDoc }) {
  const sections = doc.sections.map((s) => ({ ...s, id: slugify(s.heading) }));
  return (
    <SiteShellV6>
      <main id="main" data-legal className="mx-auto w-full max-w-[calc(72ch+2*var(--v6-gutter))] px-(--v6-gutter) pt-14 pb-24 v6d:pt-20 v6d:pb-[120px]">
        <div data-legal-text>
          <p className={`m-0 ${LABEL} text-v6-muted`}>LAST UPDATED · {doc.lastUpdated.toUpperCase()}</p>
          <h1 className="m-0 mt-4 font-v6-serif text-[length:var(--v6-doc-h1)] leading-(--v6-doc-h1-lh) font-normal tracking-[-.02em] text-balance text-v6-ink">{doc.title}</h1>
        </div>

        <nav aria-label="On this page" data-print-hide className="mt-10 mb-4 rounded-v6-card border border-v6-line bg-v6-card px-5 py-4">
          <span className={`${LABEL} text-v6-muted`}>ON THIS PAGE</span>
          <ol className="m-0 mt-3 flex list-none flex-col p-0">
            {sections.map((s) => (
              <li key={s.id} className="flex">
                <a href={`#${s.id}`} className="flex-1 py-1.5 font-v6-sans text-[15px] leading-[22px] text-v6-ink hover:text-v6-primary">
                  {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div data-legal-text className="font-v6-sans text-[length:var(--v6-doc-body)] leading-(--v6-doc-body-lh) text-v6-ink">
          {sections.map((section) => (
            <section key={section.id} aria-label={section.heading} className="flex flex-col gap-5">
              <h2 id={section.id} className="m-0 mt-14 font-v6-serif text-[length:var(--v6-doc-h2)] leading-(--v6-doc-h2-lh) font-normal tracking-[-.02em] text-balance">
                {section.heading}
              </h2>
              {section.blocks.map((block, i) =>
                block.type === "p" ? (
                  <p key={i} className="m-0 text-pretty">
                    {linkify(block.text, LINK)}
                  </p>
                ) : (
                  <ul key={i} className="m-0 flex list-disc flex-col gap-3 pl-5 marker:text-v6-muted">
                    {block.items.map((item) => (
                      <li key={item.text} className="text-pretty">
                        {item.label && <strong className="font-medium">{item.label}: </strong>}
                        {linkify(item.text, LINK)}
                      </li>
                    ))}
                  </ul>
                ),
              )}
            </section>
          ))}
        </div>
      </main>
    </SiteShellV6>
  );
}
