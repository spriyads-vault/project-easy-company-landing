import CopyButton from "./CopyButton";

export default function CodeBlock({
  id,
  label,
  children,
  size = "text-sm leading-[1.7]",
}: {
  id: string;
  label: string;
  children: string;
  size?: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-ink text-[#EEF1F5]">
      <div className="flex items-center justify-between gap-3 pt-3 pr-3 pl-5">
        <span className="text-[11px] leading-[1.4] font-medium tracking-[0.08em] uppercase">{label}</span>
        <CopyButton target={id} label={label.toLowerCase()} />
      </div>
      <pre id={id} className={`m-0 overflow-x-auto px-5 pt-4 pb-5 font-mono ${size}`}>
        {children}
      </pre>
    </div>
  );
}
