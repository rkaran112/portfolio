"use client";

import { FenceTimeline } from "@/components/instruments/FenceTimeline";
import { LatencyBars } from "@/components/instruments/LatencyBars";
import { TestTicks } from "@/components/instruments/TestTicks";
import { VirtualStrip } from "@/components/instruments/VirtualStrip";

/** Each project's demo, running for real rather than as a screenshot. */
export function ProjectDemo({ slug, accent }: { slug: string; accent: string }) {
  switch (slug) {
    case "lattice":
      return <VirtualStrip accent={accent} />;
    case "cacheopt":
      return <LatencyBars accent={accent} />;
    case "relay":
      return <FenceTimeline accent={accent} />;
    default:
      return <TestTicks count={96} label="Test suite" accent={accent} />;
  }
}
