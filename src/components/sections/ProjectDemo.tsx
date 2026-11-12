"use client";

import { FenceTimeline } from "@/components/instruments/FenceTimeline";
import { LatencyBars } from "@/components/instruments/LatencyBars";
import { TestTicks } from "@/components/instruments/TestTicks";
import { VirtualStrip } from "@/components/instruments/VirtualStrip";

/**
 * Each project's demo, running for real rather than as a screenshot. Every slug
 * is listed explicitly: a catch-all default would quietly show one project's
 * numbers under another project's name.
 */
export function ProjectDemo({ slug, accent }: { slug: string; accent: string }) {
  switch (slug) {
    case "lattice":
      return <VirtualStrip accent={accent} />;
    case "cacheopt":
      return <LatencyBars accent={accent} />;
    case "relay":
      return <FenceTimeline accent={accent} />;
    case "quorum":
      return <TestTicks count={147} label="Test suite, cluster in-process" accent={accent} />;
    case "resume-tailor":
      return <TestTicks count={84} label="Test suite" accent={accent} />;
    default:
      return (
        <p className="text-sm text-white/60">
          No demo for this one. The write-up covers what it does.
        </p>
      );
  }
}
