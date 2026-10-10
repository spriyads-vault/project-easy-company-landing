import { LEGACY_ANCHORS } from "@/content/home-v6";

/** Empty anchors for the v3 ids that now land on this section (#change-review, #failure-investigation, #evidence…). */
export default function LegacyAnchors({ section, skip }: { section: string; skip?: string }) {
  return (
    <>
      {Object.entries(LEGACY_ANCHORS)
        // `skip`: an id the section itself now has (with SCROLL_SECTIONS on), so it is not repeated.
        .filter(([id, to]) => to === section && id !== skip)
        .map(([id]) => (
          <span key={id} id={id} data-legacy-anchor aria-hidden="true" />
        ))}
    </>
  );
}
