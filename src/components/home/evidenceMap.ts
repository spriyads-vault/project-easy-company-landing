// Illustrative evidence map for the "A revision changes" concept on the home page.

export type Rev = "B" | "C";
export type NodeId = "k1" | "k3" | "k2" | "f1" | "src" | "e2" | "h1" | "t1" | "c1" | "rm";
export type State = "Observed" | "Known" | "Inferred" | "Missing" | "Source" | "Suggested" | "Historical" | "Review";

export type MapNode = {
  state: State;
  kicker: string;
  title: string;
  sub: string;
  body: string;
  meta: [string, string][];
};

export const FILL: Record<State, string> = {
  Observed: "#D5DEEC",
  Known: "#DDF2C9",
  Inferred: "#E6DCF5",
  Missing: "#FBF4D8",
  Source: "#FFFFFF",
  Suggested: "#FFFFFF",
  Historical: "#ECEAE3",
  Review: "#BFA3E6",
};

export const DASH: Partial<Record<State, string>> = { Missing: "5 4", Suggested: "2 3", Historical: "6 4" };

export function borderStyle(state: State) {
  if (state === "Missing" || state === "Historical") return "dashed";
  if (state === "Suggested") return "dotted";
  return "solid";
}

export function nodeData(id: NodeId, rev: Rev): MapNode {
  const C = rev === "C";
  switch (id) {
    case "k1":
      return C
        ? {
            state: "Known",
            kicker: "FACT · CHANGED IN REV C",
            title: "CLK_54M routing",
            sub: "Series termination added",
            body: "Rev C adds series termination at the clock source. Routing is otherwise unchanged from Rev B.",
            meta: [
              ["Revision", "Rev C"],
              ["Source", "Rev C change record"],
              ["Differs from", "Rev B: 38 mm, unterminated"],
            ],
          }
        : {
            state: "Known",
            kicker: "FACT · REV B",
            title: "CLK_54M routing",
            sub: "38 mm, unterminated",
            body: "Clock net routed 38 mm to its load without series termination.",
            meta: [
              ["Revision", "Rev B"],
              ["Source", "Rev B layout record"],
            ],
          };
    case "k3":
      return {
        state: "Known",
        kicker: "FACT",
        title: "Oscillator Y1",
        sub: "54.2 MHz · datasheet",
        body: "Clock source for CLK_54M. Frequency taken from the component datasheet.",
        meta: [
          ["Revision", C ? "Rev B and Rev C, unchanged" : "Rev B"],
          ["Source", "Y1 datasheet"],
        ],
      };
    case "k2":
      return {
        state: "Known",
        kicker: "FACT",
        title: "Enclosure and cables",
        sub: C ? "Unchanged in Rev C" : "As tested",
        body: "Enclosure, shielding and cable arrangement recorded for the test.",
        meta: [
          ["Revision", C ? "Rev B and Rev C, unchanged" : "Rev B"],
          ["Source", "Test setup description"],
        ],
      };
    case "f1":
      return C
        ? {
            state: "Historical",
            kicker: "HISTORICAL · REV B",
            title: "216.8 MHz",
            sub: "Above limit · QP · 3 m · H",
            body: "Recorded on Rev B and kept on record. Rev C changed a fact this finding depends on, so it does not describe Rev C until reviewed and retested.",
            meta: [
              ["Recorded on", "Rev B"],
              ["Conditions", "Quasi-peak · 3 m · horizontal"],
              ["Source", "Lab test report, table 4.2, p. 4"],
              ["Status", "Open for review against Rev C"],
            ],
          }
        : {
            state: "Observed",
            kicker: "OBSERVED · REV B",
            title: "216.8 MHz",
            sub: "Above limit · QP · 3 m · H",
            body: "Emission recorded above the Class B limit on Rev B.",
            meta: [
              ["Recorded on", "Rev B"],
              ["Conditions", "Quasi-peak · 3 m · horizontal"],
              ["Source", "Lab test report, table 4.2, p. 4"],
              ["Requirement", "47 CFR 15.109(a), Class B"],
            ],
          };
    case "src":
      return {
        state: "Source",
        kicker: "SOURCE",
        title: "Lab test report",
        sub: "Table 4.2 · p. 4",
        body: "Report provided for this investigation. Extracted values were confirmed by an engineer before use.",
        meta: [
          ["Covers", "Rev B"],
          ["Referenced by", "Both findings"],
        ],
      };
    case "e2":
      return {
        state: "Observed",
        kicker: "OBSERVED · REV B",
        title: "48–144 MHz",
        sub: C ? "Within limit · still connected" : "Within limit · QP · 3 m",
        body: C
          ? "Recorded on Rev B. It depends on facts that did not change in Rev C, so it stays connected."
          : "Emissions in this range recorded within the limit on Rev B.",
        meta: [
          ["Recorded on", "Rev B"],
          ["Conditions", "Quasi-peak · 3 m · V and H"],
          ["Depends on", "Enclosure and cables"],
        ],
      };
    case "h1":
      return {
        state: "Inferred",
        kicker: "INFERRED",
        title: "4th harmonic of Y1",
        sub: "Candidate, not confirmed",
        body: "216.8 MHz is four times the 54.2 MHz clock. A candidate explanation that needs a test to confirm or rule out.",
        meta: [
          ["Based on", "Finding at 216.8 MHz; Y1 datasheet"],
          ["Status", "Not confirmed"],
        ],
      };
    case "t1":
      return C
        ? {
            state: "Suggested",
            kicker: "SUGGESTED TEST · REV C",
            title: "Retest on Rev C",
            sub: "Planned · not completed",
            body: "A retest of the Rev C hardware under the Rev B conditions. It has not been run and has no result.",
            meta: [
              ["Status", "Planned"],
              ["Record against", "Rev C"],
              ["Conditions to match", "Detector, distance, polarization, operating mode"],
            ],
          }
        : {
            state: "Suggested",
            kicker: "SUGGESTED TEST",
            title: "Near-field scan",
            sub: "Along CLK_54M · not run",
            body: "A proposed next step, awaiting engineering review. Nothing has been measured yet.",
            meta: [
              ["Status", "Awaiting review"],
              ["Tests", "Inferred harmonic source"],
            ],
          };
    case "c1":
      return {
        state: "Missing",
        kicker: "MISSING",
        title: "Confirmed cause",
        sub: "None recorded",
        body: C
          ? "Still unconfirmed. A lower Rev C reading would not confirm the cause on its own unless the recorded conditions are comparable."
          : "No cause is confirmed. That requires a completed test that isolates CLK_54M.",
        meta: [
          ["Needed", "Completed test result"],
          ["Blocks", "Closing the finding"],
        ],
      };
    case "rm":
      return {
        state: "Review",
        kicker: "REVIEW MARKER",
        title: "CLK_54M changed in Rev C",
        sub: "",
        body: "The Rev B finding at 216.8 MHz depends on CLK_54M routing, which changed in Rev C. That relationship is open for review. The earlier result stays on record.",
        meta: [
          ["Changed fact", "CLK_54M termination"],
          ["Affected", "Finding at 216.8 MHz"],
          ["Not affected", "Findings at 48–144 MHz"],
        ],
      };
  }
}

/** Box positions (top-left) in the 800 x 400 wide map. */
export const POS: Record<Exclude<NodeId, "rm">, [number, number]> = {
  k1: [20, 50],
  k3: [20, 180],
  k2: [20, 310],
  f1: [300, 50],
  src: [300, 180],
  e2: [300, 310],
  h1: [580, 50],
  t1: [580, 180],
  c1: [580, 310],
};
