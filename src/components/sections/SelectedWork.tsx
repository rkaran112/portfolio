"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { flagship, type Project } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Main page carries key points only. The whole card is the target, so a reader
 * who wants the reasoning gets it in one click on /projects/<slug>.
 */
function Card({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: EASE }}
      whileHover={{ y: -4 }}
      className="liquid-glass group relative h-full rounded-2xl"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(80% 60% at 20% 0%, ${project.accent}1a, transparent 70%)`,
        }}
      />

      <Link
        href={`/projects/${project.slug}`}
        className="relative flex h-full flex-col p-6 focus-visible:outline-none"
      >
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-2 w-2 rounded-full transition-transform duration-500 group-hover:scale-150"
            style={{ background: project.accent }}
          />
          <span className="text-[11px] tracking-widest text-white/55 uppercase">
            {project.repo.kind === "public" ? "Public repo" : "Repo pending"}
          </span>
        </div>

        <h3 className="font-num mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
          {project.name}
        </h3>
        <p className="mt-2 text-sm text-white/70">{project.hook}</p>

        <ul className="mt-5 space-y-2.5">
          {project.keyPoints.map((point) => (
            <li key={point} className="flex gap-2.5 text-sm leading-[1.55] text-white/80">
              <span
                aria-hidden
                className="mt-[8px] h-1 w-1 shrink-0 rounded-full"
                style={{ background: project.accent }}
              />
              {point}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/12 px-2.5 py-1 text-[11px] text-white/65"
            >
              {item}
            </span>
          ))}
        </div>

        <span
          className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium"
          style={{ color: project.accent }}
        >
          Read the full write-up
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </span>
      </Link>
    </motion.div>
  );
}

export function SelectedWork() {
  return (
    <section id="benchmarks" className="mx-auto max-w-page px-6 py-20 sm:px-10 md:py-28">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="text-3xl font-semibold tracking-tight md:text-5xl"
      >
        Selected work
      </motion.h2>
      <p className="mt-4 max-w-md text-base text-white/65">
        Click any project for the problem, the approach and the outcome in full.
      </p>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {flagship.map((project, i) => (
          <Card key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
