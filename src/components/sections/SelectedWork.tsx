"use client";

import { motion } from "motion/react";
import { flagship, type Project } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

function Panel({
  term,
  detail,
  accent,
  index,
}: {
  term: string;
  detail: string;
  accent: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      whileHover={{ y: -4 }}
      className="liquid-glass group/panel rounded-2xl p-6 transition-shadow duration-500"
      style={{ boxShadow: `inset 0 1px 1px rgba(255,255,255,0.1)` }}
    >
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden
          className="h-1.5 w-1.5 rounded-full transition-transform duration-500 group-hover/panel:scale-150"
          style={{ background: accent }}
        />
        <h4
          className="text-[11px] tracking-[0.18em] uppercase"
          style={{ color: accent }}
        >
          {term}
        </h4>
      </div>
      <p className="mt-3 text-sm leading-[1.75] text-white/75">{detail}</p>
    </motion.div>
  );
}

function ProjectSection({ project, flip }: { project: Project; flip: boolean }) {
  return (
    <section
      id={`project-${project.slug}`}
      aria-labelledby={`heading-${project.slug}`}
      className="relative py-20 md:py-28"
    >
      {/* Accent wash, so each project owns its own pocket of colour. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: `radial-gradient(70% 55% at ${flip ? "80%" : "20%"} 40%, ${project.accent}1f, transparent 70%)`,
        }}
      />

      <div className="mx-auto grid max-w-page items-start gap-10 px-6 sm:px-10 md:gap-16 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: EASE }}
          className={`lg:sticky lg:top-24 ${flip ? "lg:order-2" : ""}`}
        >
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="h-2 w-2 rounded-full"
              style={{ background: project.accent }}
            />
            <span className="text-xs tracking-widest text-white/60 uppercase">
              {project.repo.kind === "public" ? "Public repo" : "Repo pending"}
            </span>
          </div>

          <h3
            id={`heading-${project.slug}`}
            className="font-num mt-5 text-4xl font-semibold tracking-tight md:text-5xl"
          >
            {project.name}
          </h3>

          <p className="mt-5 max-w-md text-lg leading-[1.5] text-white/85">{project.hook}</p>

          <div className="mt-7 flex flex-wrap gap-2">
            {project.tech.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-xs text-white/75 backdrop-blur-sm transition-colors hover:border-white/30 hover:text-white"
              >
                {item}
              </span>
            ))}
          </div>

          {project.repo.kind === "public" ? (
            <a
              href={project.repo.url}
              target="_blank"
              rel="noreferrer noopener"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
            >
              Read the source
              <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                ↗
              </span>
            </a>
          ) : (
            <span className="mt-8 inline-flex rounded-full border border-dashed border-white/20 px-5 py-2.5 text-sm text-white/55">
              Repo publishing pending
            </span>
          )}
        </motion.div>

        <div className={`space-y-4 ${flip ? "lg:order-1" : ""}`}>
          <Panel term="Problem" detail={project.problem} accent={project.accent} index={0} />
          <Panel term="Approach" detail={project.approach} accent={project.accent} index={1} />
          <Panel term="Outcome" detail={project.outcome} accent={project.accent} index={2} />
        </div>
      </div>
    </section>
  );
}

export function SelectedWork() {
  return (
    <div id="benchmarks">
      <div className="mx-auto max-w-page px-6 sm:px-10 pt-16 pb-4 text-center md:pt-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-4xl font-semibold tracking-tight md:text-6xl"
        >
          Selected work
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          className="mx-auto mt-5 max-w-lg text-base leading-[1.6] text-white/70"
        >
          Each one written up the same way: the problem that made it worth building, the
          approach taken, and what came out of it.
        </motion.p>
      </div>

      {flagship.map((project, i) => (
        <ProjectSection key={project.slug} project={project} flip={i % 2 === 1} />
      ))}
    </div>
  );
}
