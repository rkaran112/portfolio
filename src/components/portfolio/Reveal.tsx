"use client";

import { useInView } from "@/hooks/useInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Settles into place as it enters view. Deliberately restrained — a short rise,
 * once only, no rotation and no replay. The wrapper always renders so the
 * server and client markup agree; only the style differs.
 */
export function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const show = reduced || inView;

  return (
    <div
      ref={ref}
      className="h-full"
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "none" : "translateY(18px)",
        transition: reduced
          ? undefined
          : `opacity 480ms ease ${delay}ms, transform 520ms cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
