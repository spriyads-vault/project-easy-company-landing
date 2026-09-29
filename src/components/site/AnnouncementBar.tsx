import PilotLink from "./PilotLink";

export default function AnnouncementBar() {
  return (
    <div role="region" aria-label="Announcement" className="border-b border-ink bg-lime text-ink">
      <p className="mx-auto box-content flex max-w-[1280px] flex-wrap items-center justify-center gap-x-4 gap-y-1 px-gutter py-2 text-center text-sm leading-[1.45]">
        <span>
          <span className="font-mono text-[13px]">Crado Pilot Program</span> · For teams investigating radiated-emissions failures.
        </span>
        <PilotLink className="py-1 font-medium text-ink underline-offset-[3px]">Book a pilot call</PilotLink>
      </p>
    </div>
  );
}
