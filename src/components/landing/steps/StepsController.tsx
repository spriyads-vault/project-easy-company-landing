"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { loadScenes } from "./LazyScene";

const WIDE = "(min-width: 1100px)";
const SCENE_W = 720;
const SCENE_H = 560;
/** Scene 02 replays while it stays active (design: setTimeout(run, 4600 + 8000)). */
const LOOP_MS = { 1: 12600 } as Record<number, number>;
/** Longest inline timeline (scene 02 ends at 4500ms); after it the scene rests on its final frame. */
const INLINE_MS = 5000;

interface StepsControllerProps {
  className: string;
  children: ReactNode;
}

/**
 * Wires the sticky 01/02/03 section. All markup is server-rendered with step 01 active; this only moves
 * attributes, so the page never re-renders while scrolling:
 * - one IntersectionObserver on the step blocks, with a root margin collapsed to the viewport's centre line,
 *   picks the active step (data-on on the text, data-state on the sticky layers). Between or beyond the blocks
 *   the last active step stays, so a layer is always showing;
 * - the scene artwork chunk loads when the browser is idle after load, or when the section comes near;
 * - the active scene runs its micro-animations (data-run on its box) only while the section spans the centre line
 *   and the tab is visible; inline scenes (below 1100px) play once when 30% visible;
 * - scenes are scaled to their box (min(1, w / 720, h / 560));
 * - without CSS scroll-driven animations, the progress rail is filled from scroll.
 * Reduced motion: swaps are instant (no transitions) and no scene animates.
 */
export default function StepsController({ className, children }: StepsControllerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia(WIDE);
    const steps = [...root.querySelectorAll<HTMLElement>("[data-step]")];
    const layers = [...root.querySelectorAll<HTMLElement>("[data-layer]")];
    const cleanups: (() => void)[] = [];
    let active = 0;
    let live = false;
    let loop = 0;

    const sceneOf = (i: number) => layers[i]?.querySelector<HTMLElement>("[data-scene-box]") ?? null;
    const restart = (el: HTMLElement) => {
      el.removeAttribute("data-run");
      void el.offsetWidth; // restart the CSS animations from their first frame
      el.setAttribute("data-run", "");
    };
    const runActive = () => {
      window.clearTimeout(loop);
      layers.forEach((_, i) => sceneOf(i)?.removeAttribute("data-run"));
      if (reduced || !live || !wide.matches || document.visibilityState !== "visible") return;
      const el = sceneOf(active);
      if (!el) return;
      const tick = () => {
        restart(el);
        if (LOOP_MS[active]) loop = window.setTimeout(tick, LOOP_MS[active]);
      };
      tick();
    };

    const setActive = (i: number) => {
      if (i === active && steps[i]?.hasAttribute("data-on")) return;
      active = i;
      steps.forEach((s, k) => s.toggleAttribute("data-on", k === i));
      layers.forEach((l, k) => {
        l.dataset.state = k === i ? "on" : k < i ? "before" : "after";
        l.setAttribute("aria-hidden", k === i ? "false" : "true");
      });
      runActive();
    };

    // Scene artwork: load when idle after page load, or as soon as the section is within 1.5 viewports.
    const preload = () => void loadScenes();
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const onLoaded = () => idle(preload);
    if (document.readyState === "complete") onLoaded();
    else window.addEventListener("load", onLoaded, { once: true });
    const nearIo = new IntersectionObserver(([e]) => e.isIntersecting && preload(), { rootMargin: "150% 0px" });
    nearIo.observe(root);
    cleanups.push(() => {
      nearIo.disconnect();
      window.removeEventListener("load", onLoaded);
    });

    // Active step: the block crossing the viewport's centre line.
    const stepIo = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(steps.indexOf(e.target as HTMLElement));
      },
      { rootMargin: "-49.5% 0px -49.5% 0px" },
    );
    steps.forEach((s) => stepIo.observe(s));
    cleanups.push(() => stepIo.disconnect());

    // Live: the section spans the centre line.
    const liveIo = new IntersectionObserver(
      ([e]) => {
        live = e.isIntersecting;
        runActive();
      },
      { rootMargin: "-49.5% 0px -49.5% 0px" },
    );
    liveIo.observe(root);
    cleanups.push(() => liveIo.disconnect());

    // Inline scenes (narrow layout) play once.
    if (!reduced) {
      const inline = [...root.querySelectorAll<HTMLElement>("[data-inline-scene] [data-scene-box]")];
      const timers: number[] = [];
      const inlineIo = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting || wide.matches) continue;
            const el = e.target as HTMLElement;
            inlineIo.unobserve(el);
            restart(el);
            timers.push(window.setTimeout(() => el.removeAttribute("data-run"), INLINE_MS));
          }
        },
        { threshold: 0.3 },
      );
      inline.forEach((el) => inlineIo.observe(el));
      cleanups.push(() => {
        inlineIo.disconnect();
        timers.forEach(clearTimeout);
      });
    }

    const onVisibility = () => {
      root.toggleAttribute("data-paused", document.visibilityState !== "visible");
      runActive();
    };
    document.addEventListener("visibilitychange", onVisibility);
    wide.addEventListener("change", runActive);
    cleanups.push(() => {
      document.removeEventListener("visibilitychange", onVisibility);
      wide.removeEventListener("change", runActive);
      window.clearTimeout(loop);
    });

    // Scene scale per box.
    const ro = new ResizeObserver((entries) => {
      for (const e of entries) {
        const box = e.target as HTMLElement;
        const { width, height } = e.contentRect;
        if (!width || !height) continue;
        box.style.setProperty("--scene-scale", Math.min(1, width / SCENE_W, height / SCENE_H).toFixed(4));
      }
    });
    root.querySelectorAll<HTMLElement>("[data-scene-box]").forEach((b) => ro.observe(b));
    cleanups.push(() => ro.disconnect());

    // Progress rail fallback.
    if (!CSS.supports("animation-timeline: view()")) {
      let raf = 0;
      const update = () => {
        raf = 0;
        const r = root.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (window.innerHeight / 2 - r.top) / r.height));
        root.style.setProperty("--sprog", p.toFixed(4));
      };
      const onScroll = () => {
        if (!raf) raf = requestAnimationFrame(update);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      update();
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        cancelAnimationFrame(raf);
      });
    }

    return () => cleanups.forEach((c) => c());
  }, []);

  return (
    <div ref={ref} data-steps className={className}>
      {children}
    </div>
  );
}
