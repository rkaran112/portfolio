"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type Tone = "idle" | "live" | "dead" | "commit" | "reject";

interface Step {
  at: number;
  lane: "a" | "b" | "ledger";
  text: string;
  tone: Tone;
}

/** The negative control, visualized: a dead worker's late write hits a newer fence. */
const STEPS: Step[] = [
  { at: 0, lane: "a", text: "worker-a leases job 4812 · fence 7", tone: "live" },
  { at: 700, lane: "a", text: "side effect starts", tone: "live" },
  { at: 1300, lane: "a", text: "worker-a dies mid-task", tone: "dead" },
  { at: 1900, lane: "b", text: "worker-b leases job 4812 · fence 8", tone: "live" },
  { at: 2500, lane: "b", text: "commits · outbox row written", tone: "commit" },
  { at: 3100, lane: "a", text: "worker-a's late write arrives · fence 7", tone: "dead" },
  { at: 3600, lane: "ledger", text: "rejected · 7 < 8 · effect applied exactly once", tone: "reject" },
];

const TONE_CLASS: Record<Tone, string> = {
  idle: "text-white/60",
  live: "text-white/85",
  dead: "text-white/60 line-through decoration-white/25",
  commit: "text-white",
  reject: "font-semibold text-white",
};

const DOT: Record<Tone, string> = {
  idle: "rgba(255,255,255,0.2)",
  live: "rgba(255,255,255,0.7)",
  dead: "rgba(255,255,255,0.25)",
  commit: "accent",
  reject: "accent",
};

const LANE_LABEL: Record<Step["lane"], string> = {
  a: "worker-a",
  b: "worker-b",
  ledger: "ledger",
};

export function FenceTimeline({ accent = "#00d2ff" }: { accent?: string }) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.4);
  const active = inView && !reduced;
  const [step, setStep] = useState(0);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (!active) return;
    const timers = STEPS.map((entry, index) =>
      window.setTimeout(() => setStep(index + 1), entry.at + 120),
    );
    return () => timers.forEach(window.clearTimeout);
  }, [active, nonce]);

  // With motion off, every step is already on screen.
  const shown = active ? step : STEPS.length;

  return (
    <div ref={ref}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="text-xs text-white/70">Chaos harness · negative control</p>
        {!reduced && (
          <button
            type="button"
            onClick={() => {
              setStep(0);
              setNonce((n) => n + 1);
            }}
            className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-white/75 transition-colors hover:border-white/30 hover:text-white"
          >
            Replay
          </button>
        )}
      </div>

      <ol className="space-y-2">
        {STEPS.map((entry, index) => {
          const visible = index < shown;
          const tone = visible ? entry.tone : "idle";
          return (
            <li
              key={entry.text}
              className="flex items-baseline gap-3 text-xs"
              style={{
                opacity: visible ? 1 : 0.15,
                transform: visible ? "none" : "translateX(-4px)",
                transition: reduced ? undefined : "opacity 260ms ease, transform 260ms ease",
              }}
            >
              <span className="w-[62px] shrink-0 text-[10px] text-white/55">
                {LANE_LABEL[entry.lane]}
              </span>
              <span
                aria-hidden
                className="mt-[5px] h-[5px] w-[5px] shrink-0 rounded-full"
                style={{ background: DOT[tone] === "accent" ? accent : DOT[tone] }}
              />
              <span className={TONE_CLASS[tone]}>{entry.text}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
