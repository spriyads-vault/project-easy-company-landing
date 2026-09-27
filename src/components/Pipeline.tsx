import type { ReactNode } from "react";

function CodePanel({
  label,
  command,
  tag,
  children,
}: {
  label: ReactNode;
  command: string;
  tag: string;
  children: ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-2.5">
      <div className="flex min-h-9 items-end font-mono text-xs leading-[18px] font-medium tracking-[0.04em] text-ink">
        {label}
      </div>
      <div className="min-w-0 flex-1 border border-ink bg-paper-light">
        <div className="flex justify-between gap-3 border-b border-ink bg-ink px-3 py-2 text-[11px] leading-4 tracking-[0.04em] text-paper">
          <span>{command}</span>
          <span>{tag}</span>
        </div>
        <div className="overflow-x-auto p-3 text-xs leading-5 text-ink">{children}</div>
      </div>
    </div>
  );
}

const Line = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`whitespace-pre ${className}`}>{children}</div>
);
const Kw = ({ children }: { children: ReactNode }) => <span className="text-plum">{children}</span>;
const Num = ({ children }: { children: ReactNode }) => <span className="text-amber">{children}</span>;

export default function Pipeline() {
  return (
    <section id="pipeline" className="border-t border-rule bg-mint">
      <div className="mx-auto flex max-w-[1264px] flex-col gap-16 px-8 py-24">
        <h2 className="m-0 font-display text-[clamp(48px,7.4vw,112px)] leading-[0.95] font-bold tracking-[-0.05em] text-ink">
          3x Faster. Zero Regressions.
        </h2>
        <div className="flex flex-wrap gap-8 border-t border-ink pt-8">
          <h3 className="m-0 max-w-[14ch] flex-[1_1_380px] font-display text-[clamp(30px,3vw,36px)] leading-[1.05] font-bold tracking-[-0.05em] text-ink">
            Engineered for Certainty, Not Probability.
          </h3>
          <p className="m-0 flex-[1_1_380px] columns-2 gap-8 text-base leading-[26px] text-pretty text-ink hyphens-auto [column-rule:1px_solid_#2A3441]">
            Standard LLMs hallucinate regulatory law. We built Crado as a neuro-symbolic bridge:
            combining the unstructured parsing capabilities of foundation models with the absolute
            rigidity of a deterministic rule engine. No probabilistic guessing—just hard trace
            evidence.
          </p>
        </div>
        <div
          aria-hidden="true"
          className="flex flex-wrap gap-6 font-mono tabular-nums [font-variant-ligatures:none]"
        >
          <CodePanel
            label="[01] UNSTRUCTURED EXTRACTION"
            command="$ crado extract TR-0412.pdf --table 4.2"
            tag="RAW"
          >
            <Line className="text-muted-2">ROW  FREQ_MHZ  READ_DBUV  AF_DB  CL_DB  LEVEL  POL</Line>
            <Line>r01     48.02      18.9    11.2    1.3   31.4   V</Line>
            <Line>r02     96.10      21.6    11.8    1.5   34.9   H</Line>
            <Line>r03    144.30      22.4    14.1    1.7   38.2   V</Line>
            <Line className="-mx-3 bg-blush px-3">r04    216.80      27.9    17.1    2.0   47.0   H</Line>
            <Line>r05    288.50      19.6    18.8    2.3   40.7   V</Line>
            <Line>r06    432.00      19.3    22.1    2.7   44.1   H</Line>
            <Line className="mt-1 text-muted-2">6 rows · units verified · page 4 of 18</Line>
          </CodePanel>
          <CodePanel
            label={
              <>
                [02] DETERMINISTIC MAPPING <span className="text-moss">→</span> [03] CONTINUOUS
                REVISION STATE
              </>
            }
            command="$ crado export --drc altium --rev C"
            tag=".RUL"
          >
            <Line className="text-muted-2">{"// from chamber failures: rev A, rev B"}</Line>
            <Line>
              <Kw>Rule</Kw> CRADO_EMC_0117 {"{"}
            </Line>
            <Line>  Scope   InNet(&apos;CLK_54M&apos;)</Line>
            <Line>
              {"  Check   SeriesTermination <= "}
              <Num>5mm</Num> U7.12
            </Line>
            <Line>
              {"  Check   MaxTraceLength    <= "}
              <Num>25mm</Num>
            </Line>
            <Line>{"}"}</Line>
            <Line>
              <Kw>Rule</Kw> CRADO_EMC_0118 {"{"}
            </Line>
            <Line>  Scope   InNetClass(&apos;HS_CLK&apos;)</Line>
            <Line>
              {"  Check   ReturnPathGap     == "}
              <Num>0</Num>
            </Line>
            <Line>{"}"}</Line>
          </CodePanel>
        </div>
      </div>
    </section>
  );
}
