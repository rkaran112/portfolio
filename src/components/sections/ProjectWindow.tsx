"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Database, FileText, LayoutGrid, Workflow } from "lucide-react";
import { ProjectDemo } from "./ProjectDemo";
import { flagship } from "@/lib/content";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  lattice: LayoutGrid,
  cacheopt: Database,
  relay: Workflow,
  "resume-tailor": FileText,
};

export function ProjectWindow() {
  const [activeSlug, setActiveSlug] = useState(flagship[0].slug);
  const active = flagship.find((project) => project.slug === activeSlug) ?? flagship[0];

  return (
    <section id="work" className="mx-auto max-w-page px-6 sm:px-10 py-16 md:py-24">
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
              Pick a project to run its demo
            </p>
            <nav className="flex gap-1.5 overflow-x-auto pb-1 lg:block lg:space-y-1.5 lg:overflow-visible lg:pb-0">
              {flagship.map((project) => {
                const Icon = ICONS[project.slug] ?? LayoutGrid;
                const isActive = project.slug === activeSlug;
                return (
                  <button
                    key={project.slug}
                    type="button"
                    onClick={() => setActiveSlug(project.slug)}
                    aria-pressed={isActive}
                    className={`flex shrink-0 cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-left text-xs transition-all lg:w-full ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "border-white/10 text-white/70 hover:-translate-y-px hover:border-white/25 hover:bg-white/5 hover:text-white"
                    }`}
                    style={isActive ? { borderColor: project.accent } : undefined}
                  >
                    <span
                      aria-hidden
                      className="h-2 w-2 shrink-0 rounded-full transition-transform"
                      style={{
                        background: project.accent,
                        opacity: isActive ? 1 : 0.5,
                        boxShadow: isActive ? `0 0 8px ${project.accent}` : undefined,
                      }}
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
          </div>

          {/* Live demo */}
          <div className="col-span-12 border-white/10 p-5 md:col-span-7 lg:col-span-6 lg:border-r">
            <ProjectDemo key={active.slug} slug={active.slug} accent={active.accent} />
          </div>

          {/* Orientation, not the full write-up. That lives further down. */}
          <div className="col-span-12 p-5 md:col-span-5 lg:col-span-3">
            <p className="text-sm leading-[1.6] text-white/85">{active.hook}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {active.tech.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-white/70"
                >
                  {item}
                </span>
              ))}
            </div>

            <Link
              href={`/projects/${active.slug}`}
              className="group mt-6 inline-flex items-center gap-1.5 text-xs transition-colors"
              style={{ color: active.accent }}
            >
              Problem, approach, outcome
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
