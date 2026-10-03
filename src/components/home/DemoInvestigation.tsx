import AppShell, { type DemoData } from "./AppShell";

export const INVESTIGATION: DemoData = {
  area: "Investigations",
  title: "Emissions investigation",
  type: "Investigation",
  action: "Request review",
  description: "Bring the findings and engineering context together to prepare a focused next test.",
  chip: "Draft plan",
  counts: ["5 sources linked", "1 open question"],
  link: "View test plan",
  tabs: ["Findings", "Test plan"],
  columns: ["Possible cause", "Source", "State"],
  pending: "Checking…",
  rows: [
    { icon: "search", a: "Clock harmonic on USB cable", b: "Rev B layout", state: "Unconfirmed" },
    { icon: "slack", a: "USB cable moved between scans", b: "#hw-gateway", state: "Unconfirmed" },
    { icon: "report", a: "Cable position not recorded", b: "Lab report", state: "Not run" },
  ],
  note: {
    title: "Possible explanation",
    tag: "Unconfirmed",
    body: "A clock harmonic may be coupling onto the USB cable, which moved between scans.",
  },
  sources: {
    title: "Supporting sources",
    items: [
      { icon: "report", name: "Lab report, radiated pre-scan" },
      { icon: "slack", name: "#hw-gateway thread" },
      { icon: "whatsapp", name: "Bench photo from the lab" },
    ],
  },
  alt: "Crado emissions investigation: findings from the lab report and team thread, a possible explanation marked unconfirmed, and proposed checks marked not run.",
};

export default function DemoInvestigation({ still }: { still?: boolean }) {
  return <AppShell data={INVESTIGATION} still={still} />;
}
