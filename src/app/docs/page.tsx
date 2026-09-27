import type { Metadata } from "next";
import type { ReactNode } from "react";
import AnnouncementBar from "@/components/AnnouncementBar";
import CopyPayloadButton from "@/components/docs/CopyPayloadButton";
import DocsSidebar from "@/components/docs/DocsSidebar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { JSON_LINES } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Crado Docs — System Architecture, Regulatory Coverage & Security",
  description:
    "Technical documentation for Crado: neuro-symbolic ingestion, deterministic rule gates, supported EMC standards, the verification payload schema and tenant isolation.",
  openGraph: { title: "Crado Docs — Deterministic Hardware Compliance", type: "website" },
};

const PRIMITIVES = [
  ["freq_mhz", "float", "Measured emission frequency"],
  ["level_dbuv_m", "float", "Corrected field strength"],
  ["detector", "enum", "QP, PK or AV"],
  ["distance_m", "float", "Antenna test distance"],
  ["provenance", "object", "Source file, page index and bounding box"],
];

const GATES = [
  ["[1] RESOLVE", "Select the limit by standard, class, band and distance."],
  ["[2] NORMALISE", "Bring measurement and limit to the same units."],
  ["[3] COMPARE", "Evaluate measured peak against the limit."],
  ["[4] EMIT", "Write verdict, margin and provenance to the artifact."],
];

const STANDARDS: { name: string; scope: string; status: string; live: boolean }[] = [
  { name: "FCC Part 15 Subpart B", scope: "Class A & B Digital Devices", status: "ACTIVE_PRODUCTION", live: true },
  { name: "CISPR 32 / EN 55032", scope: "Multimedia Equipment EMC", status: "ACTIVE_PRODUCTION", live: true },
  { name: "IEC 61000-4-2", scope: "Electrostatic Discharge (ESD) Immunity", status: "MODELING_ACTIVE", live: false },
  { name: "MIL-STD-461G", scope: "Defense Electronics Compatibility", status: "ROADMAP_Q1", live: false },
];

const SECURITY: { key: string; id?: string; text: string }[] = [
  {
    key: "tenant_isolation",
    text: "Each customer runs in an isolated workspace. Uploaded sources, revision graphs and output artifacts are scoped to that workspace.",
  },
  { key: "model_training", id: "data-handling", text: "Customer data is not used to train models." },
  {
    key: "audit_status",
    text: "Security documentation and current audit status are shared during pilot scoping.",
  },
];

const PIPELINE = [
  ["[Raw Chamber Logs / PDF]", "scanned reports · measurement tables · operator notes"],
  ["[Neuro-Symbolic Extraction]", "typed facts + page-level citations"],
  ["[Deterministic Rules Engine]", "PASS / FAIL against clause limits"],
  ["[Immutable Audit Artifact]", null],
] as const;

const ANCHOR = "scroll-mt-[calc(var(--header-h)+24px)]";
const BODY = "m-0 max-w-[68ch] text-base leading-[26px] text-pretty text-fog";
const SUBHEAD = "m-0 font-mono text-sm leading-5 font-medium tracking-[0.08em] text-paper uppercase";
const TABLE_HEAD = "bg-ink text-[11px] tracking-[0.06em] text-paper uppercase";

function SectionHeading({
  as: Tag,
  id,
  n,
  title,
  lede,
}: {
  as: "h1" | "h2";
  id: string;
  n: string;
  title: string;
  lede: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <Tag
        id={id}
        className="m-0 font-display text-[clamp(30px,3.4vw,40px)] leading-[1.1] font-bold tracking-[-0.04em] text-balance text-paper"
      >
        <span className="font-mono font-normal tracking-normal text-mint">{`${n} //`}</span> {title}
      </Tag>
      <p className="m-0 font-mono text-sm leading-5 text-mist">{lede}</p>
    </div>
  );
}

function Section({ id, labelledBy, children }: { id: string; labelledBy: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${ANCHOR} flex flex-col gap-6`}>
      {children}
    </section>
  );
}

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-night">
      <AnnouncementBar />
      <Header />

      <main className="flex min-h-screen border-b border-ink bg-night text-paper">
        <DocsSidebar />

        <div className="min-w-0 flex-1">
          <div className="flex max-w-[896px] flex-col gap-20 px-8 py-16">
            <Section id="overview" labelledBy="overview-title">
              <SectionHeading
                as="h1"
                id="overview-title"
                n="01"
                title="System Architecture & Neuro-Symbolic Pipeline"
                lede="Deterministic verification for hardware regulatory boundaries."
              />
              <div className="flex max-w-[68ch] flex-col gap-4 text-base leading-[26px] text-pretty text-fog">
                <p className="m-0">
                  Crado is the interface layer between the test chamber and the engineering team. It ingests
                  unstructured physical chamber outputs (scanned test reports, measurement tables, operator
                  notes) and maps each raw measurement directly to the immutable statutory clause that governs
                  it.
                </p>
                <p className="m-0">
                  Models are used for one job: extraction. They read the source, pull out typed facts and
                  attach a citation to each one. They never decide an outcome. Every Pass/Fail threshold is
                  evaluated strictly by deterministic rule gates, so the same inputs always produce the same
                  verdict and no verdict depends on a probabilistic guess.
                </p>
              </div>
              <div
                role="img"
                aria-label="Pipeline: raw chamber logs or PDF, to neuro-symbolic extraction, to deterministic rules engine, to immutable audit artifact"
                className="overflow-x-auto border border-ink bg-night-2 p-6 font-mono text-xs leading-5 text-mint"
              >
                {PIPELINE.map(([stage, note]) => (
                  <div key={stage}>
                    <div className="whitespace-pre">{stage}</div>
                    {note && (
                      <>
                        <div className="whitespace-pre text-mist">{`        │   ${note}`}</div>
                        <div className="whitespace-pre text-mist">{"        ▼"}</div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              <div id="ingestion-primitives" className={`${ANCHOR} mt-8 flex flex-col gap-4`}>
                <h2 className={SUBHEAD}>01.1 · Ingestion Primitives</h2>
                <p className={BODY}>
                  Sources are chamber test reports, datasheets and revision history. Extraction reduces each
                  source to a fixed set of typed primitives. A primitive is only accepted when its units are
                  verified and its source location is recorded.
                </p>
                <div className="overflow-x-auto border border-ink font-mono text-[13px] leading-5">
                  <div className="min-w-[560px]">
                    <div className={`grid grid-cols-[1fr_0.7fr_1.6fr] ${TABLE_HEAD}`}>
                      <span className="border-r border-steel px-3 py-2.5">Field</span>
                      <span className="border-r border-steel px-3 py-2.5">Type</span>
                      <span className="px-3 py-2.5">Description</span>
                    </div>
                    {PRIMITIVES.map(([field, type, desc], i) => (
                      <div
                        key={field}
                        className={`grid grid-cols-[1fr_0.7fr_1.6fr] border-t border-ink ${i % 2 ? "bg-night-2" : ""}`}
                      >
                        <span className="border-r border-ink px-3 py-2.5 text-butter">{field}</span>
                        <span className="border-r border-ink px-3 py-2.5 text-mist">{type}</span>
                        <span className="px-3 py-2.5 text-fog">{desc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div id="deterministic-gates" className={`${ANCHOR} mt-8 flex flex-col gap-4`}>
                <h2 className={SUBHEAD}>01.2 · Deterministic Gates</h2>
                <p className={BODY}>
                  Each clause is encoded as a fixed, versioned gate. A gate takes primitives in and returns a
                  verdict out. It holds no learned weights, so a result can be reproduced from its inputs at
                  any time.
                </p>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] border border-ink font-mono text-[13px] leading-5">
                  {GATES.map(([step, desc], i) => (
                    <div
                      key={step}
                      className={`flex flex-col gap-2 p-4 ${i < GATES.length - 1 ? "border-r border-ink" : ""}`}
                    >
                      <span className="text-mint">{step}</span>
                      <span className="text-fog">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section id="regulatory-standards" labelledBy="standards-title">
              <SectionHeading
                as="h2"
                id="standards-title"
                n="02"
                title="Regulatory Standards Library"
                lede="Active and modeled hardware emission frameworks."
              />
              <div
                role="table"
                aria-label="Regulatory standards coverage"
                className="overflow-x-auto border border-ink font-mono text-[13px] leading-5"
              >
                <div className="min-w-[640px]">
                  <div role="row" className={`grid grid-cols-[1.2fr_1.6fr_1fr] ${TABLE_HEAD}`}>
                    <span role="columnheader" className="border-r border-steel p-3">Standard</span>
                    <span role="columnheader" className="border-r border-steel p-3">Scope</span>
                    <span role="columnheader" className="p-3">Status</span>
                  </div>
                  {STANDARDS.map((s, i) => (
                    <div
                      role="row"
                      key={s.name}
                      className={`grid grid-cols-[1.2fr_1.6fr_1fr] items-center border-t border-ink ${i % 2 ? "bg-night-2" : ""}`}
                    >
                      <span role="rowheader" className="h-full border-r border-ink px-3 py-3.5 text-paper">
                        {s.name}
                      </span>
                      <span role="cell" className="h-full border-r border-ink px-3 py-3.5 text-fog">
                        {s.scope}
                      </span>
                      <span role="cell" className="px-3 py-3.5">
                        <span
                          className={`inline-block px-2 py-0.5 text-[11px] tracking-[0.04em] ${
                            s.live ? "bg-mint text-night" : "border border-steel bg-ink text-fog"
                          }`}
                        >
                          {s.status}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section id="verification-trace" labelledBy="payload-title">
              <SectionHeading
                as="h2"
                id="payload-title"
                n="03"
                title="Structured Output Payload"
                lede="Schema contract for downstream hardware engineering loops."
              />
              <div className="border border-ink bg-night-2 font-mono tabular-nums [font-variant-ligatures:none]">
                <div className="flex items-center justify-between gap-3 border-b border-ink bg-ink px-4 py-2 text-xs leading-4 text-fog">
                  <span className="flex items-center gap-3">
                    <span aria-hidden="true" className="flex gap-1.5">
                      <span className="size-2.5 rounded-full bg-blush" />
                      <span className="size-2.5 rounded-full bg-butter" />
                      <span className="size-2.5 rounded-full bg-mint" />
                    </span>
                    <span>crado_verification_payload.json</span>
                  </span>
                  <CopyPayloadButton />
                </div>
                <div className="overflow-x-auto py-4 text-[13px] leading-[21px]">
                  {JSON_LINES.map((ln) => (
                    <div key={ln.n} className="flex pr-4 whitespace-pre">
                      <span aria-hidden="true" className="w-12 flex-none pr-4 text-right text-steel select-none">
                        {ln.n}
                      </span>
                      <span>
                        {ln.toks.map((k, i) => (
                          <span key={i} style={{ color: k.c, background: k.bg }}>
                            {k.t}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section id="tenant-isolation" labelledBy="security-title">
              <SectionHeading
                as="h2"
                id="security-title"
                n="04"
                title="Enterprise Security"
                lede="Isolation and data handling commitments."
              />
              <div className="border border-ink font-mono text-[13px] leading-5">
                {SECURITY.map(({ key, id, text }, i) => (
                  <div
                    key={key}
                    id={id}
                    className={`grid grid-cols-[minmax(0,220px)_minmax(0,1fr)] ${id ? ANCHOR : ""} ${
                      i < SECURITY.length - 1 ? "border-b border-ink" : ""
                    } ${i % 2 ? "bg-night-2" : ""}`}
                  >
                    <span className="border-r border-ink p-4 text-paper">{key}</span>
                    <span className="p-4 font-sans text-[15px] leading-6 text-pretty text-fog">{text}</span>
                  </div>
                ))}
              </div>
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
