"use client";

import { useEffect, useState, useSyncExternalStore, type ComponentType } from "react";

type Scenes = ComponentType<{ p: string }>[];

const WIDE = "(min-width: 1100px)";

let scenes: Scenes | null = null;
let loading: Promise<Scenes> | null = null;
const listeners = new Set<() => void>();

/**
 * Loads the scene chunk once. StepsController calls this when the browser is idle after load, or as soon as the
 * section comes within a viewport and a half, so the scenes are in place before anyone scrolls to them.
 */
export function loadScenes(): Promise<Scenes> {
  loading ??= import("./scenes").then((m) => {
    scenes = m.SCENES;
    listeners.forEach((l) => l());
    return scenes;
  });
  return loading;
}

function subscribeWide(onChange: () => void) {
  const mql = window.matchMedia(WIDE);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

interface LazySceneProps {
  index: number;
  /** "layer": the sticky box (wide screens). "inline": under its step text (narrow screens). */
  variant: "layer" | "inline";
  /** SVG id prefix, unique per copy. */
  p: string;
}

/**
 * One scene, rendered client-side into its fixed-size box (the box and its role="img" label are server-rendered,
 * so nothing shifts when it appears). Only the copy for the current layout renders.
 */
export default function LazyScene({ index, variant, p }: LazySceneProps) {
  const [, setLoaded] = useState(scenes !== null);
  const wide = useSyncExternalStore(
    subscribeWide,
    () => window.matchMedia(WIDE).matches,
    () => variant === "layer",
  );

  useEffect(() => {
    const onLoad = () => setLoaded(true);
    listeners.add(onLoad);
    return () => {
      listeners.delete(onLoad);
    };
  }, []);

  if (!scenes || wide !== (variant === "layer")) return null;
  const Scene = scenes[index];
  return <Scene p={p} />;
}
