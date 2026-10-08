"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const mql = window.matchMedia(REDUCED_QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/** True when the visitor prefers reduced motion. Server render assumes reduced (static final state). */
export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED_QUERY).matches,
    () => true,
  );
}

type MotionOptions = {
  /** IntersectionObserver threshold for the first reveal. */
  threshold?: number;
  rootMargin?: string;
};

/**
 * Drives a [data-motion] region:
 * - `entered` flips true once the region first reaches the viewport (one-shot reveals),
 * - `running` is true while it is on screen, the tab is visible and motion is allowed (loops and timers).
 * It also mirrors both onto the element as data-in / data-paused so CSS animations follow without re-rendering.
 */
export function useMotion<T extends HTMLElement = HTMLDivElement>({ threshold = 0.3, rootMargin = "0px" }: MotionOptions = {}) {
  const ref = useRef<T>(null);
  const reduced = useReducedMotion();
  const [entered, setEntered] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        setOnScreen(entry.isIntersecting);
        if (entry.isIntersecting && entry.intersectionRatio >= threshold) setEntered(true);
      },
      { threshold: [0, threshold], rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced, threshold, rootMargin]);

  useEffect(() => {
    const onVis = () => setTabVisible(document.visibilityState === "visible");
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const running = !reduced && entered && onScreen && tabVisible;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.toggleAttribute("data-in", reduced || entered);
    el.toggleAttribute("data-paused", !reduced && !running);
  }, [reduced, entered, running]);

  return { ref, reduced, entered: reduced || entered, running };
}
