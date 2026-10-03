import AppShell, { type DemoData } from "./AppShell";

export const RECORD: DemoData = {
  area: "Evidence",
  title: "Rev C engineering record",
  type: "Engineering record",
  action: "Review draft",
  description: "Keep test results, decisions and follow-up work connected to the hardware.",
  chip: "Rev C · current",
  counts: ["3 new updates", "1 missing item"],
  link: "Rev B history",
  tabs: ["Record", "Follow-up"],
  columns: ["Update", "Source", "State"],
  pending: "Linking…",
  rows: [
    { icon: "mail", a: "Rev C radiated retest", b: "Northfield Test Lab", state: "Linked" },
    { icon: "slack", a: "USB cable routing", b: "#hw-gateway", state: "Linked" },
    { icon: "whatsapp", a: "Retest done, photos pending", b: "Test lab", state: "Needs setup photos" },
  ],
  note: {
    title: "Follow-up",
    tag: "Draft · not sent",
    body: "Hi Priya, thanks for the Rev C retest. Could you send the setup photos, including the USB cable position?",
    link: "Open draft",
  },
  sources: {
    title: "Linked to Rev C",
    items: [
      { icon: "report", name: "Rev C report.pdf" },
      { icon: "mail", name: "Lab email, setup notes" },
      { icon: "slack", name: "#hw-gateway thread" },
    ],
  },
  alt: "Crado Rev C engineering record: lab and team updates linked to Rev C, earlier Rev B results kept, and a follow-up email draft that has not been sent.",
};

export default function DemoRecord({ still }: { still?: boolean }) {
  return <AppShell data={RECORD} still={still} />;
}
