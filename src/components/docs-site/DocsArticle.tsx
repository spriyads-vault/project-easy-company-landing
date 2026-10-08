import Link from "next/link";
import type { ReactNode } from "react";
import JsonLd from "@/components/site/JsonLd";
import { CONTACT_EMAIL } from "@/lib/site";
import { DOCS_UPDATED_LABEL, docsJsonLd, docsNeighbours, type DocsPage } from "@/lib/docs-pages";
import Feedback from "./Feedback";
import { Mono } from "./ui";

const CARD = "flex flex-col gap-1.5 rounded-card border border-line-2 px-5 py-[18px] transition-[border-color,background-color] duration-150 hover:border-line-7 hover:bg-surface-0";

/** One docs page: breadcrumb eyebrow, H1, content, prev/next cards and the page footer row. */
export default function DocsArticle({ page, children }: { page: DocsPage; children: ReactNode }) {
  const { prev, next } = docsNeighbours(page);
  return (
    <article className="flex w-full max-w-article flex-col gap-5">
      <JsonLd data={docsJsonLd(page)} />
      <Mono>{page.eyebrow}</Mono>
      {/* Large scroll margin: a link to the H1 lands at the top of the page, as in the design. */}
      <h1 id={page.toc[0].id} className="m-0 scroll-mt-60 font-display text-[44px] leading-[1.05] font-bold tracking-[-0.03em]">
        {page.headline}
      </h1>
      {children}

      <nav aria-label="Previous and next pages" className="mt-[76px] grid grid-cols-1 gap-3 sm:grid-cols-2">
        {prev && (
          <Link href={prev.path} className={`${CARD} col-start-1`}>
            <Mono>← PREVIOUS · {prev.section.toUpperCase()}</Mono>
            <span className="text-[17px] font-bold tracking-[-0.01em]">{prev.headline}</span>
          </Link>
        )}
        {next && (
          <Link href={next.path} className={`${CARD} items-end text-right sm:col-start-2`}>
            <Mono>NEXT · {next.section.toUpperCase()} →</Mono>
            <span className="text-[17px] font-bold tracking-[-0.01em]">{next.headline}</span>
          </Link>
        )}
      </nav>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-t border-line-1 pt-6 text-[13px] text-fg-muted">
        <span className="font-mono text-[11px] text-fg-faint">Last updated {DOCS_UPDATED_LABEL}</span>
        <Feedback />
        <span>
          Report an issue:{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-fg-3 underline underline-offset-2 hover:text-fg">
            {CONTACT_EMAIL}
          </a>
        </span>
      </div>
    </article>
  );
}
