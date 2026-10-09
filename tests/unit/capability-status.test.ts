import { readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { CAPABILITIES, STATUS_LABELS, statusOf, type CapabilityStatus } from "@/content/capability-status";
import { AGENTS, COVERAGE, FAQ_V6, PAGE_CAPABILITIES, STATUS_IN_PROSE, liveTodayAnswer } from "@/content/home-v6";
import { llmsTxtV6 } from "@/content/llms";

const ROOT = path.resolve(import.meta.dirname, "../..");
const SCANNED = ["src/components", "src/home", "src/app"];

/**
 * v3 components that predate capability-status.ts and still write their labels inline. They are only served while
 * NEXT_PUBLIC_FF_HOMEPAGE_V6 is off (or on docs pages) and leave this list when they move to the status file or
 * are retired with v3. Nothing may be added here: new components read statuses from capability-status.ts.
 */
const LEGACY_V3 = new Set([
  "src/components/landing/Agents.tsx",
  "src/components/landing/UseCases.tsx",
  "src/components/landing/hero/ToolsStrip.tsx",
  "src/components/landing/steps/ChangeScene.tsx",
  "src/components/landing/steps/EvidenceScene.tsx",
  "src/components/landing/steps/Steps.tsx",
  "src/components/site/Banner.tsx",
  "src/components/site/Footer.tsx",
  "src/components/site/Nav.tsx",
  "src/components/docs-site/content/Concepts.tsx",
]);

const STATUS_WORD = /\b(LIVE|ROADMAP|EARLY ACCESS)\b/;

function files(dir: string): string[] {
  return readdirSync(dir).flatMap((name) => {
    const p = path.join(dir, name);
    if (statSync(p).isDirectory()) return files(p);
    return /\.(tsx?|jsx?)$/.test(name) ? [p] : [];
  });
}

/** Source without comments, so documentation that mentions a status is not a hit. */
function code(src: string): string {
  return src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\{\/\*[\s\S]*?\*\/\}/g, "").replace(/(^|[^:])\/\/.*$/gm, "$1");
}

/** Finds status words written into a component (JSX text, strings, attributes) rather than read from the file. */
export function hardcodedStatuses(src: string): string[] {
  return code(src)
    .split("\n")
    .filter((line) => STATUS_WORD.test(line));
}

describe("capability statuses", () => {
  it("no component hardcodes a status", () => {
    const offenders: string[] = [];
    for (const dir of SCANNED) {
      for (const file of files(path.join(ROOT, dir))) {
        const rel = path.relative(ROOT, file);
        if (LEGACY_V3.has(rel)) continue;
        for (const line of hardcodedStatuses(readFileSync(file, "utf8"))) offenders.push(`${rel}: ${line.trim()}`);
      }
    }
    expect(offenders).toEqual([]);
  });

  it("the check catches a hardcoded status", () => {
    expect(hardcodedStatuses('<span className="tag">ROADMAP</span>')).toHaveLength(1);
    expect(hardcodedStatuses('const tag = { label: "LIVE" };')).toHaveLength(1);
    expect(hardcodedStatuses("<Label>EARLY ACCESS</Label>")).toHaveLength(1);
    expect(hardcodedStatuses("// ROADMAP in a comment is fine\n<StatusTag capability={a.capability} />")).toEqual([]);
  });

  it("the legacy list only names files that still need it", () => {
    for (const rel of LEGACY_V3) expect(hardcodedStatuses(readFileSync(path.join(ROOT, rel), "utf8")).length, rel).toBeGreaterThan(0);
  });

  it("uses the SCRUM-294 defaults", () => {
    const live = Object.entries(CAPABILITIES)
      .filter(([, c]) => c.status === "LIVE")
      .map(([id]) => id)
      .sort();
    expect(live).toEqual(["changeAndRetest", "emcInvestigator", "evidenceStatePerRevision", "productMemory"]);
    for (const c of Object.values(CAPABILITIES)) expect(STATUS_LABELS).toContain(c.status);
  });

  it("v6 agents, coverage and llms.txt resolve through the status file", () => {
    expect(AGENTS.map((a) => statusOf(a.capability))).toEqual(["LIVE", "ROADMAP", "ROADMAP", "ROADMAP", "ROADMAP", "ROADMAP"]);
    expect(COVERAGE.map((r) => statusOf(r.capability))).toEqual(["LIVE", "ROADMAP", "ROADMAP", "ROADMAP", "ROADMAP"]);
    const txt = llmsTxtV6();
    expect(txt).toContain("- EMC investigator (LIVE)");
    expect(txt).toContain("- 47 CFR 15.109(b), Class A, 10 m, Radiated emissions, quasi-peak: ROADMAP");
  });

  it("FAQ 06 lists every LIVE item and names only statuses an item on the page has", () => {
    const faq = FAQ_V6.find((f) => f.q === "Which parts are live today?")!;
    expect(faq.a).toBe(liveTodayAnswer());
    for (const c of Object.values(CAPABILITIES)) if (c.status === "LIVE") expect(faq.a.toLowerCase()).toContain(c.summary.toLowerCase());
    expect(namedStatusesMissingFromPage(faq.a)).toEqual([]);
    expect(faq.a).toBe(
      "Radiated-emissions investigation under 47 CFR 15.109(a), product memory, change and retest comparison and evidence state per revision. Everything else on this page is marked Roadmap.",
    );
  });

  it("the FAQ check catches a status no item has", () => {
    expect(namedStatusesMissingFromPage("Everything else on this page is marked Early access or Roadmap.")).toEqual(["EARLY ACCESS"]);
  });
});

/** Statuses the text names (outside the "Live today" list) that no capability shown on the page has. */
function namedStatusesMissingFromPage(text: string): CapabilityStatus[] {
  const onPage = new Set(PAGE_CAPABILITIES.map(statusOf));
  const named = (Object.entries(STATUS_IN_PROSE) as [CapabilityStatus, string][])
    .filter(([s]) => s !== "LIVE")
    .filter(([, prose]) => new RegExp(`\\b${prose}\\b`, "i").test(text))
    .map(([s]) => s);
  return named.filter((s) => !onPage.has(s));
}
