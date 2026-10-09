import { LEGACY_ANCHORS } from "@/content/home-v6";

/** Empty anchors for the v3 ids that now land on this section (#change-review, #failure-investigation, #evidence…). */
export default function LegacyAnchors({ section }: { section: string }) {
  return (
    <>
      {Object.entries(LEGACY_ANCHORS)
        .filter(([, to]) => to === section)
        .map(([id]) => (
          <span key={id} id={id} data-legacy-anchor aria-hidden="true" />
        ))}
    </>
  );
}
