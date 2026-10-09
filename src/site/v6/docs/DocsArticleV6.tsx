import Link from "next/link";
import type { ReactNode } from "react";
import Feedback from "@/components/docs-site/Feedback";
import { LABEL, MONO } from "@/components/home-v6/ui";
import JsonLd from "@/components/site/JsonLd";
import { DOCS_UPDATED_LABEL, docsJsonLd, docsNeighbours, type DocsPage } from "@/lib/docs-pages";
import { CONTACT_EMAIL } from "@/lib/site";

const CARD =
  "flex flex-col gap-2 rounded-v6-card border border-v6-line bg-v6-card px-5 py-[18px] text-v6-ink transition-[border-color] duration-150 ease-v6-ui hover:border-v6-ink hover:text-v6-ink";
const FEEDBACK_BUTTON =
  "h-9 cursor-pointer rounded-v6-button border border-v6-line-strong bg-v6-card px-3.5 font-v6-sans text-[14px] leading-none font-medium text-v6-ink transition-colors duration-150 ease-v6-ui hover:border-v6-ink active:translate-y-px";

/** One docs page in the v6 design: breadcrumb eyebrow, H1 (Plex Serif 52/58), content, prev/next cards and the footer row. */
export default function DocsArticleV6({ page, children }: { page: DocsPage; children: ReactNode }) {
  const { prev, next } = docsNeighbours(page);
  return (
    <article className="flex w-full flex-col gap-6">
      <JsonLd data={docsJsonLd(page)} />
      <span className={`${LABEL} text-v6-muted`}>{page.eyebrow}</span>
      {/* Large scroll margin: a link to the H1 lands at the top of the page. */}
      <h1 id={page.toc[0].id} className="m-0 scroll-mt-60 font-v6-serif text-[length:var(--v6-doc-h1)] leading-(--v6-doc-h1-lh) font-normal tracking-[-.02em] text-balance text-v6-ink">
        {page.headline}
      </h1>
      {children}

      <nav aria-label="Previous and next pages" className="mt-16 grid grid-cols-1 gap-3 v6t:grid-cols-2">
        {prev && (
          <Link href={prev.path} className={`${CARD} col-start-1`}>
            <span className={`${LABEL} text-v6-muted`}>← PREVIOUS · {prev.section.toUpperCase()}</span>
            <span className="font-v6-serif text-[22px] leading-[30px]">{prev.headline}</span>
          </Link>
        )}
        {next && (
          <Link href={next.path} className={`${CARD} items-end text-right v6t:col-start-2`}>
            <span className={`${LABEL} text-v6-muted`}>NEXT · {next.section.toUpperCase()} →</span>
            <span className="font-v6-serif text-[22px] leading-[30px]">{next.headline}</span>
          </Link>
        )}
      </nav>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-v6-line pt-6 font-v6-sans text-[15px] leading-[22px] text-v6-muted">
        <span className={`${MONO} text-v6-muted`}>Last updated {DOCS_UPDATED_LABEL}</span>
        <Feedback buttonClassName={FEEDBACK_BUTTON} />
        <span>
          Report an issue:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-v6-primary underline underline-offset-[3px] hover:text-v6-primary-hover">
            {CONTACT_EMAIL}
          </a>
        </span>
      </div>
    </article>
  );
}
