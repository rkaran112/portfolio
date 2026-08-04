"use client";

import { motion } from "motion/react";
import { Briefcase, GraduationCap } from "lucide-react";
import { education, experience } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;
const WORK_ACCENT = "#00d2ff";
const STUDY_ACCENT = "#a4f4fd";

function Column({
  title,
  icon: Icon,
  accent,
  children,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <Icon className="h-4 w-4" />
        <h3 className="text-xs tracking-[0.18em] uppercase" style={{ color: accent }}>
          {title}
        </h3>
      </div>
      {/* Entries hang off a single rule so the sequence reads as a timeline. */}
      <div className="mt-6 space-y-4 border-l border-white/12 pl-6">{children}</div>
    </div>
  );
}

function Entry({
  index,
  accent,
  period,
  heading,
  sub,
  children,
}: {
  index: number;
  accent: string;
  period: string;
  heading: string;
  sub: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      whileHover={{ y: -3 }}
      className="liquid-glass group/entry relative rounded-2xl p-5"
    >
      <span
        aria-hidden
        className="absolute top-7 -left-[26px] h-2 w-2 rounded-full transition-transform duration-500 group-hover/entry:scale-150"
        style={{ background: accent }}
      />
      <p className="font-num text-[11px] tracking-tight text-white/60">{period}</p>
      <h4 className="mt-2 text-base font-semibold text-white">{heading}</h4>
      <p className="mt-1 text-sm text-white/70">{sub}</p>
      {children}
    </motion.article>
  );
}

export function Background() {
  return (
    <section id="background" className="relative py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, rgba(0,210,255,0.10), transparent 70%)",
        }}
      />

      <div className="mx-auto max-w-page px-6 sm:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="text-3xl font-semibold tracking-tight md:text-4xl"
        >
          Background
        </motion.h2>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          <Column title="Experience" icon={Briefcase} accent={WORK_ACCENT}>
            {experience.map((role, i) => (
              <Entry
                key={`${role.org}-${role.title}`}
                index={i}
                accent={WORK_ACCENT}
                period={role.period}
                heading={role.title}
                sub={`${role.org} · ${role.place}`}
              >
                <ul className="mt-4 space-y-2.5">
                  {role.points.map((point) => (
                    <li key={point} className="flex gap-2.5 text-sm leading-[1.65] text-white/75">
                      <span
                        aria-hidden
                        className="mt-[9px] h-1 w-1 shrink-0 rounded-full"
                        style={{ background: WORK_ACCENT }}
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </Entry>
            ))}
          </Column>

          <Column title="Education" icon={GraduationCap} accent={STUDY_ACCENT}>
            {education.map((study, i) => (
              <Entry
                key={`${study.institution}-${study.campus}`}
                index={i}
                accent={STUDY_ACCENT}
                period={study.period}
                heading={study.qualification}
                sub={`${study.institution} · ${study.campus}`}
              >
                {study.detail ? (
                  <p className="font-num mt-3 inline-flex rounded-full border border-white/12 px-3 py-1 text-[11px] text-white/75">
                    {study.detail}
                  </p>
                ) : null}
              </Entry>
            ))}
          </Column>
        </div>
      </div>
    </section>
  );
}
