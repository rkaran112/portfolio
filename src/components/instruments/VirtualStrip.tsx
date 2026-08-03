"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ROW_HEIGHT = 22;
const TOTAL_ROWS = 1_000_000;
const START_ROW = 847_213;
const ROWS_PER_SECOND = 18;
const INITIAL_POOL = 11;

/** Deterministic so server and client agree, and so the strip never "invents" data twice. */
function cellValue(rowIndex: number) {
  const x = Math.sin(rowIndex * 12.9898) * 43758.5453;
  return (x - Math.floor(x)) * 100;
}

/**
 * The same technique lattice uses, running on this page: a fixed pool of row
 * elements is recycled as the window moves through a million indices. The node
 * count below is measured from the live DOM, not asserted.
 */
export function VirtualStrip({ accent = "#00d2ff" }: { accent?: string }) {
  const reduced = useReducedMotion();
  const viewportRef = useRef<HTMLDivElement>(null);
  const poolRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(START_ROW);
  const rafRef = useRef<number | undefined>(undefined);

  const [offset, setOffset] = useState(START_ROW);
  const [poolSize, setPoolSize] = useState(INITIAL_POOL);
  const [nodeCount, setNodeCount] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setPoolSize(Math.ceil(el.clientHeight / ROW_HEIGHT) + 1);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const el = poolRef.current;
    if (el) setNodeCount(el.querySelectorAll("*").length);
  }, [poolSize]);

  // Idle static on phones and with reduced motion. The strip stays fully
  // legible either way, and the Run button is still there if you want it.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 640px)");
    const sync = () => setRunning(!reduced && wide.matches);
    sync();
    wide.addEventListener("change", sync);
    return () => wide.removeEventListener("change", sync);
  }, [reduced]);

  useEffect(() => {
    if (!running) return;

    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      offsetRef.current = (offsetRef.current + ROWS_PER_SECOND * dt) % TOTAL_ROWS;
      setOffset(offsetRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [running]);

  const scrub = useCallback((rows: number) => {
    offsetRef.current = (offsetRef.current + rows + TOTAL_ROWS) % TOTAL_ROWS;
    setOffset(offsetRef.current);
  }, []);

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step =
      event.key === "ArrowDown" || event.key === "PageDown"
        ? event.key === "PageDown"
          ? poolSize
          : 1
        : event.key === "ArrowUp" || event.key === "PageUp"
          ? event.key === "PageUp"
            ? -poolSize
            : -1
          : 0;
    if (step === 0) return;
    event.preventDefault();
    setRunning(false);
    scrub(step);
  };

  const first = Math.floor(offset);
  const shift = -(offset - first) * ROW_HEIGHT;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="flex items-center gap-2 text-xs text-white/70">
          <Search className="h-3.5 w-3.5" />
          Row window
        </span>
        <button
          type="button"
          onClick={() => setRunning((value) => !value)}
          className="rounded-md border border-white/10 px-2 py-1 text-[10px] text-white/75 transition-colors hover:border-white/30 hover:text-white"
        >
          {running ? "Pause" : "Run"}
        </button>
      </div>

      <div
        ref={viewportRef}
        tabIndex={0}
        role="group"
        aria-label={`Virtualized row window, currently at row ${first.toLocaleString("en-US")} of 1,000,000. Use arrow keys to scrub.`}
        onKeyDown={onKeyDown}
        className="relative h-[300px] overflow-hidden rounded-lg border border-white/10 bg-black/40"
      >
        <div
          ref={poolRef}
          className="absolute inset-x-0 top-0 will-change-transform"
          style={{ transform: `translateY(${shift}px)` }}
        >
          {Array.from({ length: poolSize }, (_, slot) => {
            const rowIndex = (first + slot) % TOTAL_ROWS;
            const value = cellValue(rowIndex);
            return (
              <div
                key={slot}
                className="flex items-center gap-3 px-3 text-[11px] tabular-nums"
                style={{ height: ROW_HEIGHT }}
              >
                <span className="font-num w-[66px] shrink-0 text-right text-white/60">
                  {rowIndex.toLocaleString("en-US")}
                </span>
                <span className="font-num w-[48px] shrink-0 text-right text-white/85">
                  {value.toFixed(2)}
                </span>
                <span className="h-[3px] flex-1 rounded-full bg-white/10">
                  <span
                    className="block h-full rounded-full"
                    style={{ width: `${value}%`, background: accent }}
                  />
                </span>
              </div>
            );
          })}
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/50 to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <dl className="mt-3 space-y-1.5 text-[11px]">
        {[
          { term: "Rows", value: "1,000,000" },
          { term: "Row elements", value: String(poolSize) },
          // Ellipsis, not a dash: the count is pending until the pool mounts.
          { term: "DOM nodes in pool", value: nodeCount ? String(nodeCount) : "…" },
        ].map((row) => (
          <div key={row.term} className="flex justify-between">
            <dt className="text-white/65">{row.term}</dt>
            <dd className="font-num text-white tabular-nums">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
