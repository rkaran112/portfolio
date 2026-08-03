"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

function format(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

interface ReadoutProps {
  to: number;
  from?: number;
  decimals?: number;
  duration?: number;
  /** Counting starts when this flips true. */
  run: boolean;
  unit?: string;
  className?: string;
  unitClassName?: string;
}

/**
 * A number that resolves like an instrument settling. The displayed value is
 * derived, not stored — when the animation isn't running (reduced motion, or
 * before hydration) it renders its final value directly, never a zero.
 */
export function Readout({
  to,
  from = 0,
  decimals = 0,
  duration = 1100,
  run,
  unit,
  className,
  unitClassName,
}: ReadoutProps) {
  const reduced = useReducedMotion();
  const active = run && !reduced;
  const [animated, setAnimated] = useState<number | null>(null);

  useEffect(() => {
    if (!active) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setAnimated(from + (to - from) * easeOutCubic(t));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, from, to, duration]);

  const value = active ? (animated ?? from) : to;

  return (
    <span className={cn("font-num tabular-nums", className)}>
      {format(value, decimals)}
      {unit ? (
        <span className={cn("text-[0.5em] tracking-normal", unitClassName)}>{unit}</span>
      ) : null}
    </span>
  );
}
