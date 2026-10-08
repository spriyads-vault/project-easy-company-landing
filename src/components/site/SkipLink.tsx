export default function SkipLink({ target = "main" }: { target?: string }) {
  return (
    <a
      href={`#${target}`}
      className="fixed -top-16 left-4 z-200 flex h-10 items-center rounded-md bg-fg px-3.5 text-sm font-medium text-bg focus:top-3 focus:text-bg"
    >
      Skip to content
    </a>
  );
}
