import CopyButton from "./CopyButton";

export default function CodeBlock({
  id,
  label,
  children,
  size = "text-[15px] leading-[1.6]",
}: {
  id: string;
  label: string;
  children: string;
  size?: string;
}) {
  return (
    <div className="border border-ink bg-oat-light">
      <div className="flex items-center justify-between gap-3 border-b border-ink py-2 pr-2 pl-4">
        <span className="font-mono text-xs tracking-[0.04em]">{label}</span>
        <CopyButton target={id} label={label.toLowerCase()} />
      </div>
      <pre id={id} className={`m-0 overflow-x-auto p-4 font-mono ${size}`}>
        {children}
      </pre>
    </div>
  );
}
