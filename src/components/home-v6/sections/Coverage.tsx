import Link from "next/link";
import { isLive } from "@/content/capability-status";
import { COMMITMENT_CARDS, COVERAGE, COVERAGE_H2, COVERAGE_NOTE, type CommitmentCard } from "@/content/home-v6";
import { COVERAGE_DOCS_LINK, TEASER_LINKS } from "@/content/section-pages";
import { SECTION_PATHS } from "../links";
import { CONTAINER, H2, LABEL, Pill, SMALL, StatusTag, TEASER_LINK } from "../ui";
import LegacyAnchors from "./LegacyAnchors";

const COLS = "grid grid-cols-[minmax(200px,1.5fr)_1.2fr_1.3fr_140px]";

interface CoverageProps {
  /** Homepage with section pages on: the LIVE rows and a link to /coverage. */
  teaser?: boolean;
  /**
   * /coverage: the page H1 is the section title, so the section heading is left out and the table is labelled by
   * the element with this id; the docs reference link follows the note.
   */
  labelledBy?: string;
}

/** Regulatory coverage table (design: COVERAGE). Rows that are not live are muted; statuses come from capability-status. */
export function Coverage({ teaser = false, labelledBy }: CoverageProps) {
  const rows = teaser ? COVERAGE.filter((r) => isLive(r.capability)) : COVERAGE;
  const titleId = labelledBy ?? "coverage-title";
  return (
    <section id="coverage" data-screen-label="Coverage" className="relative py-(--v6-section)">
      <LegacyAnchors section="coverage" />
      <div className={`${CONTAINER} flex flex-col gap-12`}>
        {!labelledBy && (
          <div className="flex flex-col gap-5">
            <Pill tone="mint">Coverage</Pill>
            <div className="grid grid-cols-12 gap-6">
              <h2 id="coverage-title" className={`${H2} col-[1/-1] v6t:col-[1/7]`}>
                {COVERAGE_H2}
              </h2>
            </div>
          </div>
        )}
        <div className="flex flex-col gap-4">
          <div className="overflow-hidden rounded-v6-panel border border-v6-line bg-v6-card">
            {/* Scrolls sideways on narrow screens; focusable so keyboard users can scroll it too. */}
            <div tabIndex={0} role="region" aria-labelledby={titleId} className="overflow-x-auto">
              <div role="table" aria-labelledby={titleId} className="flex min-w-[760px] flex-col">
                <div role="row" className={`${COLS} border-b border-v6-line bg-v6-alt ${LABEL} text-v6-muted uppercase`}>
                  <span role="columnheader" className="sticky left-0 bg-v6-alt px-6 py-4">
                    Regulation
                  </span>
                  <span role="columnheader" className="py-4 pr-6">
                    Scope
                  </span>
                  <span role="columnheader" className="py-4 pr-6">
                    Measurement
                  </span>
                  <span role="columnheader" className="py-4 pr-6">
                    Status
                  </span>
                </div>
                {rows.map((r, i) => {
                  const live = isLive(r.capability);
                  return (
                    <div
                      key={r.regulation}
                      role="row"
                      className={`${COLS} items-center ${i < rows.length - 1 ? "border-b border-v6-line" : ""} ${live ? "" : "text-v6-muted"}`}
                    >
                      <span role="cell" className="sticky left-0 bg-v6-card px-6 py-5 font-v6-serif text-[20px] leading-7 text-v6-ink">
                        {r.regulation}
                      </span>
                      <span role="cell" className="pr-6">
                        {r.scope}
                      </span>
                      <span role="cell" className="pr-6">
                        {r.measurement}
                      </span>
                      <span role="cell">
                        <StatusTag capability={r.capability} />
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <p className={`m-0 ${SMALL} text-v6-muted`}>{COVERAGE_NOTE}</p>
          {teaser && (
            <Link href={SECTION_PATHS.coverage} className={`${TEASER_LINK} mt-4`}>
              {TEASER_LINKS.coverage}
            </Link>
          )}
          {labelledBy && (
            <Link href={COVERAGE_DOCS_LINK.href} className={`${TEASER_LINK} mt-4`}>
              {COVERAGE_DOCS_LINK.text}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

const CARD: Record<CommitmentCard["tone"], { box: string; label: string; body: string; dark?: boolean }> = {
  sky: { box: "border-v6-sky bg-v6-sky hover:border-v6-ink", label: "", body: "" },
  rust: { box: "border-v6-rust bg-v6-rust text-v6-on-dark hover:border-v6-on-dark", label: "text-v6-on-dark-muted", body: "text-v6-on-dark-muted", dark: true },
  card: { box: "border-v6-line bg-v6-card hover:border-v6-ink", label: "text-v6-muted", body: "" },
  lilac: { box: "border-v6-lilac bg-v6-lilac hover:border-v6-ink", label: "", body: "" },
};

/** Four commitment cards after the coverage table (design: COMMITMENT CARDS). */
export function CommitmentCards() {
  return (
    <section data-screen-label="Commitment cards" className="pb-(--v6-section)">
      <div className={`${CONTAINER} grid grid-cols-1 gap-6 v6t:grid-cols-2`}>
        {COMMITMENT_CARDS.map((c) => {
          const t = CARD[c.tone];
          return (
            <div
              key={c.title}
              data-band={t.dark ? "dark" : undefined}
              className={`flex min-h-80 flex-col justify-between gap-7 rounded-v6-card border p-10 transition-colors duration-150 ease-v6-ui ${t.box}`}
            >
              <span className={`${LABEL} uppercase ${t.label}`}>{c.label}</span>
              <div className="flex flex-col gap-4">
                <p className="m-0 font-v6-serif text-[length:calc(var(--v6-h2)*.6)] leading-[1.2] tracking-[-.02em] text-balance">{c.title}</p>
                {c.body && <p className={`m-0 max-w-[52ch] ${SMALL} ${t.body}`}>{c.body}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
