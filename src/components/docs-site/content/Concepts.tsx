import type { ReactNode } from "react";
import { Callout, H2, H3, Lead, Mono, P, StateBadge, Table } from "../ui";

const STATES = [
  { tone: "info", label: "OBSERVED", body: "Recorded measurements and physical test results." },
  { tone: "ok", label: "KNOWN", body: "Confirmed product facts with supporting sources." },
  { tone: "warn", label: "INFERRED", body: "Candidate explanations requiring investigation." },
  { tone: "muted", label: "MISSING", body: "Information needed before a check or decision can proceed." },
] as const;

const CHIP = "inline-flex h-7 items-center rounded-sm border border-line-5 bg-surface-5 px-[9px] font-mono text-[11.5px] text-fg-2";

function Lane({ label, last, children }: { label: string; last?: boolean; children: ReactNode }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-[96px_minmax(0,1fr)] ${last ? "" : "border-b border-surface-7"}`}>
      <div className="px-4 pt-3 font-mono text-[10px] tracking-[0.1em] text-fg-faint sm:border-r sm:border-surface-7 sm:py-[18px]">{label}</div>
      <div className="flex min-w-0 flex-wrap items-center gap-2 px-4 py-3.5">{children}</div>
    </div>
  );
}

export default function Concepts() {
  return (
    <>
      <Lead>
        A product is the device under investigation. A revision is a specific physical configuration of it: the board revision, and where relevant the firmware,
        enclosure, cables and operating mode used during the test.
      </Lead>
      <P>
        Evidence belongs to the revision it was produced on. A new revision does not inherit earlier results. Where a later revision shares facts with an earlier
        one, the shared facts are recorded explicitly rather than assumed.
      </P>
      <Callout tone="accent" label="WHY IT MATTERS">
        A pass on Rev B says nothing about Rev C until someone establishes which differences between them could affect the result.
      </Callout>

      <H2 id="requirements">Requirements and applicability</H2>
      <P>
        A requirement is a rule, the version of that rule, and the basis for applying it to this product. For radiated emissions the basis typically includes the
        equipment class, the frequency range, the measurement distance and the detector the limit is defined for.
      </P>
      <P>
        Applicability is recorded, not implied. If the basis for applying a requirement is unknown, for example the equipment class has not been stated, it is
        shown as missing and the check does not run.
      </P>

      <H2 id="evidence">Evidence and provenance</H2>
      <P>
        Evidence is a measurement together with its test conditions and a reference to where it came from. A value without its source is not used for
        evaluation.
      </P>
      <div className="mt-1 flex flex-col gap-2.5">
        <Mono>TYPICAL RADIATED-EMISSIONS EVIDENCE</Mono>
        <Table
          label="Typical radiated-emissions evidence"
          minWidth={480}
          firstCol="32%"
          head={["Field", "Meaning"]}
          rows={[
            ["Frequency", "Frequency of the recorded emission, in MHz"],
            ["Level", "Field strength as reported, in dBµV/m"],
            ["Detector", "Quasi-peak, peak or average"],
            ["Distance", "Antenna measurement distance, in metres"],
            ["Polarization", "Horizontal or vertical"],
            ["Source", "The document the value came from and its location, such as page or table"],
          ]}
        />
      </div>
      <P className="mt-1">
        Provenance is recorded at the level the source supports. A confirmed value keeps both its source reference and a record that it was confirmed.
      </P>

      <H2 id="observations">Observations and hypotheses</H2>
      <P>Every item in an investigation carries one of four states. The states describe how something is known. They are not a verdict.</P>
      <div className="mt-1 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {STATES.map((s) => (
          <div key={s.label} className="flex flex-col items-start gap-3 rounded-card border border-line-2 bg-surface-1 px-5 py-[18px]">
            <StateBadge tone={s.tone}>{s.label}</StateBadge>
            <p className="m-0 text-[15px] leading-[1.55] text-fg-3">{s.body}</p>
          </div>
        ))}
      </div>
      <H3>Suggested tests, completed tests and confirmed causes</H3>
      <P>These three are kept separate throughout.</P>
      <Table
        label="Suggested tests, completed tests and confirmed causes"
        minWidth={600}
        firstCol="22%"
        head={["Item", "What it means", "What it does not mean"]}
        rows={[
          ["Suggested test", "A proposed next step, awaiting review", "That anything has been measured"],
          ["Completed test", "A test that was run, with a recorded result and conditions", "That the hypothesis it tested is true"],
          ["Confirmed cause", "An explanation an engineer has accepted on the basis of completed tests", "That the fix holds on other revisions"],
        ]}
      />

      <H2 id="agents-rules">Agents, rules and review</H2>
      <P>
        A value starts as a proposal. When an agent reads a report, each value it finds is shown beside its source reference and labelled Inferred. A proposed
        value is never used for evaluation.
      </P>
      <P>
        An engineer then confirms, corrects or rejects it. A confirmed value keeps its source reference and a record of who confirmed it. Only confirmed values
        reach the evaluation engine.
      </P>
      <P>
        The engine applies the published rule to the confirmed values. If a required input is missing, or two readings are not comparable, the check is blocked,
        with the reason stated. Agents can request an evaluation but cannot change its result.
      </P>
      <P>
        Results are reproducible: same confirmed inputs + same rule version = same result. The rule version is stored with every result, together with its
        inputs, revision and sources.
      </P>
      <div
        role="img"
        aria-label="Example: an agent proposes a reading labelled Inferred, an engineer confirms it, and the engine evaluates it against 47 CFR 15.109(a) or blocks a reading whose detector is not recorded."
        data-diagram="docs-lanes"
        className="mt-1 overflow-hidden rounded-card border border-line-2 bg-surface-1 text-[13px]"
      >
        <Lane label="AGENT">
          <span className={CHIP}>144.2 MHz · 47.7 dBµV/m · QP · 3 m</span>
          <StateBadge tone="warn" small>
            INFERRED
          </StateBadge>
          <span className="font-mono text-[10.5px] text-fg-muted">[report p.4]</span>
        </Lane>
        <Lane label="ENGINEER">
          <span className="inline-flex h-[26px] items-center rounded-sm bg-fg px-2.5 text-xs font-medium text-bg">Confirm</span>
          <span className="text-fg-6">Value checked against its source</span>
          <StateBadge tone="ok" small>
            CONFIRMED
          </StateBadge>
        </Lane>
        <Lane label="ENGINE" last>
          <span className="text-fg-2">
            Limit 43.5 dBµV/m · Margin +4.2 dB · <span className="font-medium text-danger">Exceeds limit</span>
          </span>
          <span className="basis-full font-mono text-[10.5px] text-fg-muted">Rule 47 CFR 15.109(a) · version recorded · reproducible</span>
          <span className="h-0 basis-full" />
          <span className={CHIP}>Rev E reading · detector not stated</span>
          <StateBadge tone="muted" small>
            MISSING
          </StateBadge>
          <span className="text-xs text-danger">Blocked: detector not recorded</span>
        </Lane>
      </div>

      <H2 id="reviews">Reviews and historical decisions</H2>
      <P>
        A review records a decision, the evidence it relied on and the revision it concerns. Earlier decisions are preserved when new evidence arrives, so the
        reasoning behind a past next step can still be read.
      </P>
      <P>A historical result stays attached to the revision it was measured on. It is not overwritten by a later retest on a different revision.</P>
      <Callout tone="violet" label="ROADMAP">
        Automatically returning affected evidence to review when a revision changes is part of where Crado is heading. It is not described here as current
        functionality.
      </Callout>
    </>
  );
}
