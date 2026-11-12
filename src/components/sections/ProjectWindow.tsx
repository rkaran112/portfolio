"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Database, FileText, LayoutGrid, Network, Workflow } from "lucide-react";
import { ProjectDemo } from "./ProjectDemo";
import { flagship } from "@/lib/content";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  lattice: LayoutGrid,
  cacheopt: Database,
  relay: Workflow,
  quorum: Network,
  "resume-tailor": FileText,
};

/** Only the projects that have an in-page demo. The rest link to a write-up. */
const withDemo = flagship.filter((project) => project.instrument);

export function ProjectWindow() {
  const [activeSlug, setActiveSlug] = useState(withDemo[0].slug);
  const active = withDemo.find((project) => project.slug === activeSlug) ?? withDemo[0];

  return (
    <section id="demos" className="mx-auto max-w-page px-6 sm:px-10 py-16 md:py-24">
      <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">See a few of them run</h2>
      <p className="mt-4 mb-10 max-w-lg text-base text-white/65">
        Small in-page demos for five of the projects. Each write-up links to the real app
        and the source.
      </p>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl"
      >
        <div className="relative flex items-center border-b border-white/10 px-4 py-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="absolute left-1/2 -translate-x-1/2 text-xs text-white/70">
            {active.name}
          </span>
        </div>

        <div className="grid grid-cols-12">
          {/* Project picker */}
          <div className="col-span-12 border-white/10 bg-black/30 p-3 lg:col-span-3 lg:border-r">
            <p className="px-2 pt-1 pb-3 text-[10px] tracking-widest text-white/60 uppercase">
              Pick one to run its demo
            </p>
            <nav className="flex gap-1.5 overflow-x-auto pb-1 lg:block lg:space-y-1.5 lg:overflow-visible lg:pb-0">
              {withDemo.map((project) => {
                const Icon = ICONS[project.slug] ?? LayoutGrid;
                const isActive = project.slug === activeSlug;
                return (
                  <button
                    key={project.slug}
                    type="button"
                    onClick={() => setActiveSlug(project.slug)}
                    aria-pressed={isActive}
                    className={`hover-lift flex shrink-0 cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-xs lg:w-full ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "border-white/10 text-white/70 hover:border-white/25 hover:bg-white/5 hover:text-white"
                    }`}
                    style={isActive ? { borderColor: project.accent } : undefined}
                  >
                    <span
                      aria-hidden
                      className="h-2 w-2 shrink-0 rounded-full"
                      style={{ background: project.accent, opacity: isActive ? 1 : 0.5 }}
                    />
                    <Icon className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">{project.name}</span>
                    {isActive ? (
                      <span
                        aria-hidden
                        className="font-num ml-auto hidden text-[9px] tracking-tight lg:inline"
                        style={{ color: project.accent }}
                      >
                        live
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>

            <Link
              href={`/projects/${activeSlug}`}
              className="group mt-3 inline-flex items-center gap-1.5 px-2.5 py-2 text-xs"
              style={{ color: active.accent }}
            >
              How I built it
              <span aria-hidden className="nudge">
                →
              </span>
            </Link>
          </div>

          {/* Live demo. The hook and tech chips used to sit in a third pane
              here, but the card for this project repeats both a screen below. */}
          <div className="col-span-12 p-5 lg:col-span-9">
            <ProjectDemo key={active.slug} slug={active.slug} accent={active.accent} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
