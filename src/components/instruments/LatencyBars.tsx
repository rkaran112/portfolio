"use client";

import { Readout } from "./Readout";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const BEFORE = 126;
const AFTER = 31;

/** Two bars drawn to the same scale, so the gap is visible rather than stated. */
export function LatencyBars({ accent = "#00d2ff" }: { accent?: string }) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const run = inView && !reduced;
  const grown = inView || reduced;

  return (
    <div ref={ref}>
      <p className="mb-4 text-xs text-white/70">p95 latency · 12M-row table</p>

      <div className="space-y-3">
        {[
          { label: "before", ms: BEFORE, fill: "rgba(255,255,255,0.22)" },
          { label: "after", ms: AFTER, fill: accent },
        ].map((bar) => (
          <div key={bar.label} className="flex items-center gap-3">
            <span className="w-12 shrink-0 text-[11px] text-white/70">{bar.label}</span>
            <div className="h-5 flex-1 rounded-full bg-black/40">
              <div
                className="h-full rounded-full"
                style={{
                  width: grown ? `${(bar.ms / BEFORE) * 100}%` : "0%",
                  background: bar.fill,
                  transition: reduced ? undefined : "width 900ms cubic-bezier(0.22,1,0.36,1)",
                }}
              />
            </div>
            <span className="font-num w-16 shrink-0 text-right text-xs text-white tabular-nums">
              <Readout to={bar.ms} run={run} duration={900} unit="ms" />
            </span>
          </div>
        ))}
      </div>

      <p className="mt-6 text-sm text-white/70">
        <Readout
          to={2.74}
          decimals={2}
          run={run}
          className="text-3xl font-semibold text-white"
          unit="×"
          unitClassName="text-white/60"
        />{" "}
        faster overall
      </p>
    </div>
  );
}
