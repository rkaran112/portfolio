"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { flagship, groupLabels, type Project, type ProjectGroup } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;
const GROUPS: ProjectGroup[] = ["data", "systems"];

const outLink =
  "inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-[11px] text-white/75 transition-colors hover:border-white/35 hover:text-white";

/**
 * Main page carries key points only; the write-up lives on /projects/<slug>.
 * The external links sit outside the card Link because an anchor cannot be
 * nested inside another anchor.
 */
function Card({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.08, ease: EASE }}
      className="liquid-glass hover-lift group relative flex h-full flex-col rounded-2xl border border-transparent hover:border-white/20"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="relative flex flex-1 flex-col px-6 pt-6"
      >
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-2 w-2 rounded-full"
            style={{ background: project.accent }}
          />
          <h4 className="font-num text-xl font-semibold tracking-tight md:text-2xl">
            {project.name}
          </h4>
        </div>
        <p className="mt-3 text-base leading-[1.5] text-white/85">{project.hook}</p>

        <ul className="mt-5 space-y-2.5">
          {project.keyPoints.map((point) => (
            <li key={point} className="flex gap-2.5 text-sm leading-[1.55] text-white/75">
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
          className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium"
          style={{ color: project.accent }}
        >
          Read how I built it
          <ArrowRight className="nudge h-4 w-4" />
        </span>
      </Link>

      <div className="flex flex-wrap gap-2 px-6 pt-4 pb-6">
        {project.demo ? (
          <a href={project.demo} target="_blank" rel="noreferrer noopener" className={outLink}>
            Live demo ↗<span className="sr-only">{` for ${project.name}`}</span>
          </a>
        ) : null}
        {project.repo.kind === "public" ? (
          <a
            href={project.repo.url}
            target="_blank"
            rel="noreferrer noopener"
            className={outLink}
          >
            Source ↗<span className="sr-only">{` for ${project.name}`}</span>
          </a>
        ) : null}
      </div>
    </motion.div>
  );
}

export function SelectedWork() {
  return (
    <section id="projects" className="mx-auto max-w-page px-6 py-20 sm:px-10 md:py-28">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="text-3xl font-semibold tracking-tight md:text-5xl"
      >
        Things I&rsquo;ve built
      </motion.h2>
      <p className="mt-4 max-w-lg text-base text-white/65">
        Each one links to a short write-up: what the problem was, what I did, and what I
        measured.
      </p>

      {GROUPS.map((group) => {
        const projects = flagship.filter((project) => project.group === group);
        return (
          <div key={group} className="mt-14">
            <h3 className="text-xs tracking-[0.18em] text-[#a4f4fd] uppercase">
              {groupLabels[group].title}
            </h3>
            <p className="mt-2 max-w-lg text-sm text-white/60">{groupLabels[group].note}</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {projects.map((project, i) => (
                <Card key={project.slug} project={project} index={i} />
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
