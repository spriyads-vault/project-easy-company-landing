import BookPilotButton from "./BookPilotButton";

export default function AnnouncementBar() {
  return (
    <aside
      aria-label="Announcement"
      className="border-b border-ink bg-blush px-6 py-2 text-center font-mono text-sm leading-5 text-ink text-balance"
    >
      New: Crado Pilot Program — Q4 Intake Closing Soon.{" "}
      <BookPilotButton
        aria-label="Book a compliance pilot assessment"
        className="cursor-pointer whitespace-nowrap border-0 bg-transparent p-0 font-[inherit] text-ink underline underline-offset-[3px] hover:opacity-80"
      >
        Book assessment →
      </BookPilotButton>
    </aside>
  );
}
