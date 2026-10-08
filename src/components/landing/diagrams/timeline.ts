/** Design easing for one-shot steps (prototype `E`). */
export const EASE_OUT_EXPO = "cubic-bezier(0.22, 1, 0.36, 1)";

/** A point on a looping timeline: time in ms, the properties at that time, and the easing into the next point. */
export type Stop = [ms: number, props: Record<string, string | number>, easing?: string];

/**
 * Turns timed stops into keyframes for one infinite Web Animation of length `total` ms.
 * Lets a prototype "rebuild every N ms" cycle run as a single pausable animation per element.
 */
export function track(total: number, stops: Stop[]): Keyframe[] {
  return stops.map(([ms, props, easing]) => ({
    ...props,
    offset: Math.min(1, Math.max(0, ms / total)),
    ...(easing ? { easing } : {}),
  }));
}
