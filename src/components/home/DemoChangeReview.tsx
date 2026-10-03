import AppShell, { type DemoData } from "./AppShell";

export const CHANGE_REVIEW: DemoData = {
  area: "Changes",
  title: "Rev C clock-routing review",
  type: "Proposed change",
  action: "Review test plan",
  description: "Review what the routing change could affect and prepare the next check.",
  chip: "Ready for review",
  counts: ["3 sources linked", "1 open question"],
  link: "View evidence",
  tabs: ["Overview", "Evidence"],
  columns: ["Source", "Contribution", "State"],
  pending: "Linking…",
  rows: [
    { icon: "layout", a: "Rev C layout", b: "Proposed routing change", state: "Linked" },
    { icon: "report", a: "Rev B test report", b: "Earlier measurement", state: "Linked" },
    { icon: "slack", a: "Team discussion", b: "Design decision", state: "Linked" },
  ],
  note: {
    title: "Potential impact",
    tag: "Needs measurement",
    body: "Emissions performance may change. The effect needs measurement.",
  },
  sources: {
    title: "Linked evidence",
    items: [
      { icon: "layout", name: "Rev C layout diff" },
      { icon: "report", name: "Rev B radiated report, p. 14" },
      { icon: "slack", name: "#hw-gateway thread" },
    ],
  },
  alt: "Crado change review for Rev C clock routing: three linked sources, a potential emissions impact that needs measurement, and a next check marked not run.",
};

export default function DemoChangeReview({ still }: { still?: boolean }) {
  return <AppShell data={CHANGE_REVIEW} still={still} />;
}
