import { LEGACY_ANCHORS_V8 } from "@/content/home-v8";

/** Empty anchors for the old homepage ids (still linked from the docs and legal pages) that now land on this section. */
export default function LegacyAnchors({ section }: { section: string }) {
  return (
    <>
      {Object.entries(LEGACY_ANCHORS_V8)
        .filter(([, to]) => to === section)
        .map(([id]) => (
          <span key={id} id={id} data-legacy-anchor aria-hidden="true" className="block h-0" />
        ))}
    </>
  );
}
