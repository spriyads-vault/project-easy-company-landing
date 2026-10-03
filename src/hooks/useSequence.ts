"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

const TICK = 100;

/**
 * Plays a short timed sequence once its element is 40% visible. Returns the
 * elapsed time in ms, which components compare against their own cue times.
 * The clock pauses while the element is off screen or the tab is hidden.
 * Server render and reduced motion both get the finished state (Infinity).
 */
export function useSequence(ref: RefObject<HTMLElement | null>, end: number) {
  const [t, setT] = useState(Number.POSITIVE_INFINITY);
  const visible = useRef(false);
  const started = useRef(false);

  const replay = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    started.current = true;
    setT(0);
  }, []);

  // Arm the sequence on mount and start it when the element comes into view.
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Hide the finished state until the element is first seen.
    setT(0);
    const io = new IntersectionObserver(
      ([en]) => {
        visible.current =
          en.isIntersecting && (en.intersectionRatio >= 0.4 || en.intersectionRect.height >= window.innerHeight * 0.4);
        if (visible.current) started.current = true;
      },
      { threshold: [0, 0.4, 0.6] },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);

  // Advance while running.
  const running = t < end;
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      if (!started.current || !visible.current || document.hidden) return;
      setT((v) => Math.min(end, v + TICK));
    }, TICK);
    return () => window.clearInterval(id);
  }, [running, end]);

  return { t, replay };
}
