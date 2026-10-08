"use client";

import type { HTMLAttributes, ReactNode } from "react";
import { useMotion } from "@/hooks/useMotion";

interface MotionRegionProps extends HTMLAttributes<HTMLDivElement> {
  /** IntersectionObserver threshold for the one-shot reveal (data-in). */
  threshold?: number;
  children: ReactNode;
}

/**
 * Thin client wrapper that mirrors useMotion onto a [data-motion] div (data-in / data-paused), so the markup inside
 * stays server-rendered and all motion is plain CSS keyed off those attributes.
 */
export default function MotionRegion({ threshold = 0.3, children, ...rest }: MotionRegionProps) {
  const { ref } = useMotion<HTMLDivElement>({ threshold });
  return (
    <div ref={ref} data-motion {...rest}>
      {children}
    </div>
  );
}
