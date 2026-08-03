"use client";

import { useEffect, useState } from "react";

/**
 * Defaults to `true` so the server-rendered markup is the resolved, static
 * end-state. Motion is opt-in once we know the user allows it.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}
