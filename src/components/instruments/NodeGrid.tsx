"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SIDE = 100; // 100 × 100 = 10,000 nodes
const TOUCHED = 33;

/**
 * Deterministic set of touched nodes. The count is the claim; the positions are
 * a stand-in for one recalc's dependency slice.
 */
function touchedNodes() {
  const nodes = new Set<number>();
  let seed = 1337;
  while (nodes.size < TOUCHED) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    const anchor = seed % (SIDE * SIDE);
    // Dependency slices cluster: seed a node, then walk a short chain from it.
    const chain = 1 + (seed % 4);
    for (let step = 0; step < chain && nodes.size < TOUCHED; step++) {
      nodes.add((anchor + step * SIDE + step) % (SIDE * SIDE));
    }
  }
  return [...nodes];
}

const LIT = touchedNodes();

export function NodeGrid({ run }: { run: boolean }) {
  const reduced = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let litCount = reduced || !run ? LIT.length : 0;
    let start = 0;

    const draw = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cssWidth = canvas.clientWidth;
      const cssHeight = canvas.clientHeight;
      if (canvas.width !== Math.round(cssWidth * dpr)) {
        canvas.width = Math.round(cssWidth * dpr);
        canvas.height = Math.round(cssHeight * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const cell = Math.min(cssWidth, cssHeight) / SIDE;
      const dot = Math.max(1, cell * 0.5);
      const offsetX = (cssWidth - cell * SIDE) / 2;
      const offsetY = (cssHeight - cell * SIDE) / 2;

      ctx.fillStyle = "rgba(255,255,255,0.18)";
      for (let index = 0; index < SIDE * SIDE; index++) {
        const x = offsetX + (index % SIDE) * cell;
        const y = offsetY + Math.floor(index / SIDE) * cell;
        ctx.fillRect(x, y, dot, dot);
      }

      // Flat fill, no glow. A blurred halo on 33 dots turned the grid into a
      // smear at small sizes and read as decoration rather than data.
      ctx.fillStyle = "#00d2ff";
      for (let i = 0; i < litCount; i++) {
        const index = LIT[i];
        const x = offsetX + (index % SIDE) * cell;
        const y = offsetY + Math.floor(index / SIDE) * cell;
        ctx.fillRect(x - dot * 0.35, y - dot * 0.35, dot * 1.7, dot * 1.7);
      }
    };

    if (reduced || !run) {
      draw();
      return;
    }

    const tick = (now: number) => {
      if (!start) start = now;
      litCount = Math.min(LIT.length, Math.floor(((now - start) / 900) * LIT.length));
      draw();
      if (litCount < LIT.length) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current !== undefined) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced, run]);

  return (
    <figure className="m-0">
      <canvas
        ref={canvasRef}
        className="block aspect-square w-full max-w-[150px]"
        role="img"
        aria-label="Grid of 10,000 formula nodes with 33 highlighted as recalculated."
      />
      <figcaption className="mt-3 text-xs text-white/70">
        <span className="font-num text-white tabular-nums">33</span> of{" "}
        <span className="font-num tabular-nums">10,000</span> nodes recalculated
      </figcaption>
    </figure>
  );
}
