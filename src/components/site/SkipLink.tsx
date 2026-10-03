export default function SkipLink({ target }: { target: string }) {
  return (
    <a
      href={`#${target}`}
      className="absolute top-2 -left-[9999px] z-[100] bg-ink px-4 py-3 text-white focus:left-4 focus:text-white"
    >
      Skip to content
    </a>
  );
}
