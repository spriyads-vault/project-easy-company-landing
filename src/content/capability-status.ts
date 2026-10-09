/**
 * The single source of truth for what is live. Every LIVE / EARLY ACCESS / ROADMAP label on the v6 homepage (and
 * llms.txt) reads from here; components never write a status themselves. tests/unit/capability-status.test.ts
 * fails if one does.
 *
 * Defaults (SCRUM-294): the EMC investigator, product memory, change and retest comparison, and evidence state per
 * revision are LIVE. Everything else is ROADMAP until it ships. To move a capability, change its status here.
 */

export type CapabilityStatus = "LIVE" | "EARLY ACCESS" | "ROADMAP";

export interface Capability {
  /** Human name, used in llms.txt. */
  name: string;
  status: CapabilityStatus;
}

export const CAPABILITIES = {
  // Live today
  emcInvestigator: { name: "EMC investigator (radiated-emissions investigation under 47 CFR 15.109(a))", status: "LIVE" },
  productMemory: { name: "Product memory (reports, facts and likely causes filed with each product)", status: "LIVE" },
  changeAndRetest: { name: "Change and retest comparison", status: "LIVE" },
  evidenceStatePerRevision: { name: "Evidence state per revision", status: "LIVE" },

  // Agents not yet live
  changeReviewer: { name: "Change reviewer agent", status: "ROADMAP" },
  retestPlanner: { name: "Retest planner agent", status: "ROADMAP" },
  labLiaison: { name: "Lab liaison agent", status: "ROADMAP" },
  complianceWriter: { name: "Compliance writer agent", status: "ROADMAP" },
  evidenceAuditor: { name: "Evidence auditor agent", status: "ROADMAP" },

  // Sources beyond lab reports
  sourcesEmailChatTickets: { name: "Reading email, team chat and change tickets", status: "ROADMAP" },

  // Regulations beyond 47 CFR 15.109(a)
  fcc15109b: { name: "47 CFR 15.109(b), Class A at 10 m", status: "ROADMAP" },
  euEmcRed: { name: "EU EMC and Radio Equipment Directives", status: "ROADMAP" },
  euMachinery: { name: "EU Machinery Regulation 2023/1230", status: "ROADMAP" },
  rtcaDo160: { name: "RTCA DO-160", status: "ROADMAP" },
} as const satisfies Record<string, Capability>;

export type CapabilityId = keyof typeof CAPABILITIES;

export function statusOf(id: CapabilityId): CapabilityStatus {
  return CAPABILITIES[id].status;
}

export function isLive(id: CapabilityId): boolean {
  return statusOf(id) === "LIVE";
}

/** Tag colour per status (v6 design: LIVE mint, ROADMAP grey; EARLY ACCESS sunshine). */
export type StatusTone = "mint" | "sun" | "grey";

export const STATUS_TONE: Record<CapabilityStatus, StatusTone> = {
  LIVE: "mint",
  "EARLY ACCESS": "sun",
  ROADMAP: "grey",
};

/** Every distinct status label, for tests. */
export const STATUS_LABELS: readonly CapabilityStatus[] = ["LIVE", "EARLY ACCESS", "ROADMAP"];
