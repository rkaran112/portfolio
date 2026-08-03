"use client";

import { useEffect, useState } from "react";
import { Readout } from "./Readout";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** One tick per passing test. Nothing more — the count is the whole point. */
export function TestTicks({
  count,
  label,
  accent = "#00d2ff",
}: {
  count: number;
  label: string;
  accent?: string;
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const active = inView && !reduced;
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    if (!active) return;

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const value = Math.min(1, (now - start) / 800);
      setProgress(value);
      if (value < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const filled = active ? Math.round((progress ?? 0) * count) : count;

  return (
    <div ref={ref}>
      <p className="mb-4 text-xs text-white/70">{label}</p>
      <div aria-hidden className="flex flex-wrap gap-[3px]">
        {Array.from({ length: count }, (_, i) => (
          <span
            key={i}
            className="h-[14px] w-[3px] rounded-full"
            style={{ background: i < filled ? accent : "rgba(255,255,255,0.12)" }}
          />
        ))}
      </div>
      <p className="mt-5 text-sm text-white/70">
        <Readout
          to={count}
          run={active}
          duration={800}
          className="text-3xl font-semibold text-white"
        />{" "}
        passing
      </p>
    </div>
  );
}
