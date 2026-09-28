"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type FocusEvent } from "react";

const STEP_SECONDS = 7;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Timed progression for a tabbed illustration.
 *
 * Advances only while the section is on screen and the browser tab is visible,
 * pauses on hover and keyboard focus, never runs under reduced motion, and stops
 * for good after a manual selection until the visitor presses Play.
 */
export function useAutoAdvance<T extends HTMLElement>(count: number, initial = 0) {
  const [index, setIndex] = useState(initial);
  // "auto" plays unless the visitor prefers reduced motion; an explicit Play or Pause wins.
  const [choice, setChoice] = useState<"auto" | "playing" | "paused">("auto");
  const reduced = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  const playing = choice === "playing" || (choice === "auto" && !reduced);
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const sectionRef = useRef<T>(null);
  const ticks = useRef(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = playing && visible && !hovered && !focused;

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      if (document.hidden) return;
      if (++ticks.current >= STEP_SECONDS) {
        ticks.current = 0;
        setIndex((i) => (i + 1) % count);
      }
    }, 1000);
    return () => clearInterval(id);
  }, [running, count]);

  /** Manual selection: show this step and stop automatic progression. */
  const select = useCallback((i: number) => {
    setIndex(i);
    setChoice("paused");
  }, []);

  const toggle = useCallback(() => {
    ticks.current = 0;
    setChoice(playing ? "paused" : "playing");
  }, [playing]);

  const holdProps = {
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setFocused(true),
    onBlur: (e: FocusEvent<HTMLElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
    },
  };

  return { index, select, playing, toggle, sectionRef, holdProps };
}
