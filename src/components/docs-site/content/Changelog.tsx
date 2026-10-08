const ENTRIES: [string, string][] = [
  ["8 Oct 2026", "Added 'How Crado reaches a result' and the glossary."],
  ["8 Oct 2026", "Documentation restructured into guides, concepts and reference."],
];

export default function Changelog() {
  return (
    <ul className="m-0 mt-3 flex list-none flex-col border-b border-line-1 p-0">
      {ENTRIES.map(([date, text]) => (
        <li key={text} className="grid grid-cols-1 gap-x-6 gap-y-1.5 border-t border-line-1 py-4 font-mono text-[13px] sm:grid-cols-[180px_minmax(0,1fr)]">
          <span className="text-fg-muted">{date}</span>
          <span className="text-fg-2">{text}</span>
        </li>
      ))}
    </ul>
  );
}
