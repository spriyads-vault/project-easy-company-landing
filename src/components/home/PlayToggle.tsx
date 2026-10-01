type Props = { playing: boolean; onToggle: () => void; label: string; className: string };

/** Pause/Play control for an automatic sequence. */
export default function PlayToggle({ playing, onToggle, label, className }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`${playing ? "Pause" : "Play"} automatic ${label}`}
      className={`flex cursor-pointer items-center gap-2 bg-transparent px-3 font-mono text-xs ${className}`}
    >
      <span aria-hidden="true">{playing ? "❚❚" : "▶"}</span>
      {playing ? "Pause" : "Play"}
    </button>
  );
}
