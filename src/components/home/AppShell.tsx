"use client";

import { useRef, type ReactNode } from "react";
import CradoMark from "@/components/site/CradoMark";
import { ArrowIcon, CheckIcon, ChevronIcon } from "@/components/site/icons";
import { useSequence } from "@/hooks/useSequence";
import Scaler from "./Scaler";
import SourceIcon, { type SourceKind } from "./SourceIcon";

type Area = "Changes" | "Investigations" | "Evidence";

export type DemoData = {
  area: Area;
  title: string;
  type: string;
  action: string;
  description: string;
  chip: string;
  counts: [string, string];
  link: string;
  tabs: [string, string];
  columns: [string, string, string];
  /** Status shown on each row before it settles. */
  pending: string;
  rows: { icon: SourceKind; a: string; b: string; state: string }[];
  note: { title: string; tag: string; body: string; link?: string };
  sources: { title: string; items: { icon: SourceKind; name: string }[] };
  /** Text alternative for the whole mockup. */
  alt: string;
};

// Cue times, in ms from when the mockup is first 40% visible.
const END = 2600;
const rowShown = (i: number) => 300 + i * 180;
const rowDone = (i: number) => 1000 + i * 150;
const PULSE = [1900, 2500];

const T15 = "text-[15px] leading-[1.5] tracking-[-0.01em]";
const T14 = "text-sm leading-[1.45]";

const NAV: { area: Area | "Ask Crado"; icon: ReactNode }[] = [
  {
    area: "Changes",
    icon: (
      <>
        <circle cx="5" cy="4" r="1.6" />
        <circle cx="5" cy="14" r="1.6" />
        <circle cx="13" cy="6.5" r="1.6" />
        <path d="M5 5.6v6.8M13 8.1c0 3-2.4 3.5-8 4" />
      </>
    ),
  },
  {
    area: "Investigations",
    icon: (
      <>
        <circle cx="8" cy="8" r="4.8" />
        <path d="m11.6 11.6 3.6 3.6" />
      </>
    ),
  },
  {
    area: "Evidence",
    icon: <path d="M4.5 2h6l3 3v11h-9zM10.5 2v3h3M6.8 10.5l1.7 1.7 3-3.2" />,
  },
  {
    area: "Ask Crado",
    icon: (
      <path d="M9 2.2l1.4 3.9 3.9 1.4-3.9 1.4L9 12.8l-1.4-3.9-3.9-1.4 3.9-1.4zM14 12.2l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z" />
    ),
  },
];

function Sidebar({ area }: { area: Area }) {
  return (
    <div className="hidden flex-col border-r border-line px-3.5 pt-[22px] pb-4 min-[760px]:flex">
      <span className="flex items-center gap-2.5 px-2.5">
        <CradoMark height={24} />
        <span data-wordmark className="text-[17px] font-medium tracking-[-0.02em] text-fg">
          Crado
        </span>
      </span>
      <span className="mt-5 flex items-center gap-2.5 rounded-[10px] border border-line bg-white p-2.5 whitespace-nowrap">
        <span className={`flex size-[34px] flex-none items-center justify-center rounded-2xl bg-line-soft text-fg-muted ${T15}`}>
          G
        </span>
        <span className="min-w-0">
          <span className={`block ${T15}`}>Gateway board</span>
          <span className={`mt-px block text-fg-subtle ${T14}`}>Engineering</span>
        </span>
      </span>
      <span className={`mt-8 mb-2 px-3 text-fg-subtle ${T14}`}>Workspace</span>
      <span className="flex flex-col gap-0.5">
        {NAV.map(({ area: name, icon }) => {
          const on = name === area;
          return (
            <span
              key={name}
              className={`flex h-10 items-center gap-3 rounded-2xl px-3 ${T15} ${on ? "bg-line-soft text-ink" : "text-fg-subtle"}`}
            >
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                stroke={on ? "#2A3441" : "#6B7280"}
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="block flex-none"
              >
                {icon}
              </svg>
              <span className="flex-1">{name}</span>
              {on && <span className={`text-fg ${T14}`}>1</span>}
            </span>
          );
        })}
      </span>
      <span className="mt-auto flex items-center gap-3 border-t border-line px-1.5 pt-4">
        <span className={`flex size-9 flex-none items-center justify-center rounded-full border border-line bg-white text-fg-subtle ${T14}`}>
          MO
        </span>
        <span>
          <span className={`block ${T15}`}>Maya Okafor</span>
          <span className={`block text-fg-subtle ${T14}`}>Hardware lead</span>
        </span>
      </span>
    </div>
  );
}

function Pill({ state, done, pending }: { state: string; done: boolean; pending: string }) {
  const tone = !done
    ? "border-transparent text-fg-muted"
    : state === "Linked"
      ? "border-transparent text-fg"
      : "border-dashed border-line text-fg-muted";
  return (
    <span
      role="cell"
      className={`inline-flex h-7 items-center gap-1.5 justify-self-end rounded-full border bg-line-soft px-[11px] whitespace-nowrap ${T14} ${tone}`}
    >
      {done ? state : pending}
    </span>
  );
}

/**
 * A Crado workspace mockup. With `still` it shows the finished state; otherwise
 * it plays its short sequence when scrolled into view and offers a Replay button.
 */
export default function AppShell({ data, still = false }: { data: DemoData; still?: boolean }) {
  const frame = useRef<HTMLDivElement>(null);
  const seq = useSequence(frame, END);
  const t = still ? Number.POSITIVE_INFINITY : seq.t;
  const pulsing = t >= PULSE[0] && t < PULSE[1];
  const focusable = still ? -1 : undefined;

  return (
    <div ref={frame}>
      <Scaler>
        <div
          data-app
          className="box-border grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-2xl border border-line bg-white text-left text-fg [font-feature-settings:'tnum','zero','cv05'] min-[760px]:h-[900px] min-[760px]:grid-cols-[220px_minmax(0,1fr)]"
        >
          <Sidebar area={data.area} />
          <div className="min-h-0 min-w-0 min-[760px]:py-3 min-[760px]:pr-3">
            <div className="box-border h-full overflow-hidden rounded-xl border border-line bg-white">
              <div className={`flex h-14 items-center gap-3 border-b border-line pr-4 pl-[18px] min-[760px]:pl-10 ${T15}`}>
                <span className="text-fg-subtle">Gateway board</span>
                <ChevronIcon />
                <span>{data.area}</span>
                <button
                  type="button"
                  onClick={seq.replay}
                  tabIndex={focusable}
                  aria-label="Replay"
                  title="Replay"
                  className="ml-auto flex size-8 cursor-pointer items-center justify-center rounded-2xl border-0 bg-transparent hover:bg-line-soft"
                >
                  <svg aria-hidden="true" width="17" height="17" viewBox="0 0 18 18" fill="none" stroke="#6B7280" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="block">
                    <path d="M3.5 9a5.5 5.5 0 1 0 1.7-4M3.2 2.5v3h3" />
                  </svg>
                </button>
              </div>

              <div className="px-[18px] pt-5 pb-[18px] min-[760px]:px-10 min-[760px]:pt-10 min-[760px]:pb-8">
                <div className="flex flex-wrap items-start gap-4">
                  <div className="min-w-[220px] flex-1">
                    <h3 className="m-0 text-[26px] leading-[1.2] font-medium tracking-[-0.02em]">{data.title}</h3>
                    <p className={`m-0 mt-2 text-fg-subtle ${T15}`}>
                      {data.type}
                      <span aria-hidden="true" className="mx-2.5">
                        ·
                      </span>
                      Gateway board
                    </p>
                  </div>
                  <span className={`relative hidden h-9 flex-none items-center gap-1.5 rounded-lg bg-ink px-3.5 text-white min-[600px]:inline-flex ${T15}`}>
                    {/* Pulse ring: a fixed shadow faded in and out. */}
                    <span
                      aria-hidden="true"
                      className={`pulse-ring pointer-events-none absolute inset-0 rounded-lg shadow-[0_0_0_6px_rgba(42,52,65,0.14)] ${pulsing ? "opacity-100" : "opacity-0"}`}
                    />
                    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="flex-none">
                      <path d="M3.5 9.5 7 13l7.5-8" />
                    </svg>
                    {data.action}
                  </span>
                </div>
                <p className={`m-0 mt-4 truncate text-fg-subtle ${T15}`}>{data.description}</p>
                <div className={`mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-fg-subtle ${T15}`}>
                  <span className="inline-flex h-8 items-center gap-[7px] rounded-full bg-line-soft px-[13px] text-fg">
                    <CheckIcon />
                    {data.chip}
                  </span>
                  <span>{data.counts[0]}</span>
                  <span>{data.counts[1]}</span>
                  <button
                    type="button"
                    onClick={seq.replay}
                    tabIndex={focusable}
                    className={`inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-ink hover:text-fg hover:underline hover:underline-offset-[3px] ${T15}`}
                  >
                    {data.link}
                    <ArrowIcon size={13} />
                  </button>
                </div>

                <div className={`mt-7 flex gap-7 border-b border-line ${T15}`}>
                  <span className="flex h-[42px] items-center text-ink shadow-[inset_0_-2px_0_#2A3441]">{data.tabs[0]}</span>
                  <span className="flex h-[42px] items-center text-fg-subtle">{data.tabs[1]}</span>
                </div>

                <div role="table" aria-label={data.columns[0]} className="mt-2">
                  <div
                    role="row"
                    className={`grid h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-5 px-4 text-fg-subtle min-[600px]:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto] ${T14}`}
                  >
                    <span role="columnheader">{data.columns[0]}</span>
                    <span role="columnheader" className="hidden min-[600px]:block">
                      {data.columns[1]}
                    </span>
                    <span role="columnheader" className="justify-self-end">
                      {data.columns[2]}
                    </span>
                  </div>
                  {data.rows.map((row, i) => {
                    const shown = t >= rowShown(i);
                    return (
                      <div
                        key={row.a}
                        role="row"
                        className={`seq-row grid h-12 grid-cols-[minmax(0,1fr)_auto] items-center gap-5 border-t border-line px-4 min-[600px]:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)_auto] ${
                          i === 0 ? "bg-line-soft" : "bg-white"
                        } ${shown ? "opacity-100" : "translate-y-1.5 opacity-0"}`}
                      >
                        <span role="cell" className={`flex min-w-0 items-center gap-3 ${T15}`}>
                          <span aria-hidden="true" className="flex size-8 flex-none items-center justify-center rounded-full bg-line-soft">
                            <SourceIcon kind={row.icon} />
                          </span>
                          <span className="truncate">{row.a}</span>
                          {i === 0 && (
                            <span className="ml-auto">
                              <ChevronIcon />
                            </span>
                          )}
                        </span>
                        <span role="cell" className={`hidden truncate min-[600px]:block ${T15} ${i === 0 ? "text-fg-muted" : "text-fg-subtle"}`}>
                          {row.b}
                        </span>
                        <Pill state={row.state} done={t >= rowDone(i)} pending={data.pending} />
                      </div>
                    );
                  })}
                  <div aria-hidden="true" className="border-t border-line" />
                </div>

                <div className="mt-7 grid grid-cols-[minmax(0,1fr)] gap-6 min-[760px]:grid-cols-[minmax(0,1.3fr)_1px_minmax(0,1fr)] min-[760px]:gap-8">
                  <div className="min-w-0">
                    <p className={`m-0 flex flex-wrap gap-3.5 ${T15}`}>
                      <span>{data.note.title}</span>
                      <span className="text-fg-subtle">{data.note.tag}</span>
                    </p>
                    <p className={`m-0 mt-2.5 max-w-[28rem] text-fg-subtle ${T15}`}>{data.note.body}</p>
                    {data.note.link && (
                      <button
                        type="button"
                        onClick={seq.replay}
                        tabIndex={focusable}
                        className={`mt-3.5 inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent p-0 text-ink hover:text-fg hover:underline hover:underline-offset-[3px] ${T15}`}
                      >
                        {data.note.link}
                        <ArrowIcon size={13} />
                      </button>
                    )}
                  </div>
                  <span aria-hidden="true" className="hidden bg-line min-[760px]:block" />
                  <div className="hidden min-w-0 min-[760px]:block">
                    <p className={`m-0 text-fg-subtle ${T15}`}>{data.sources.title}</p>
                    <ul className="m-0 mt-2.5 list-none p-0">
                      {data.sources.items.map((item) => (
                        <li key={item.name} className={`flex h-10 items-center gap-2.5 ${T15}`}>
                          <SourceIcon kind={item.icon} size={17} stroke="#6B7280" />
                          <span className="min-w-0 flex-1 truncate">{item.name}</span>
                          <ChevronIcon />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Scaler>
    </div>
  );
}
