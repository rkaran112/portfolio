"use client";

import { motion } from "motion/react";
import { about, now, skills } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Who I am, before any project. This is the part the site used to skip. */
export function About() {
  return (
    <section id="about" className="mx-auto max-w-page px-6 py-16 sm:px-10 md:py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.7, ease: EASE }}
        className="text-3xl font-semibold tracking-tight md:text-5xl"
      >
        About me
      </motion.h2>

      <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="space-y-5"
        >
          {about.map((paragraph) => (
            <p key={paragraph} className="max-w-2xl text-base leading-[1.75] text-white/85">
              {paragraph}
            </p>
          ))}

          <div className="liquid-glass mt-8 max-w-2xl rounded-2xl p-5">
            <p className="text-xs tracking-[0.18em] text-[#a4f4fd] uppercase">Right now</p>
            <p className="mt-3 text-sm leading-[1.7] text-white/85">{now}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
        >
          <h3 className="text-xs tracking-[0.18em] text-white/60 uppercase">What I work with</h3>
          <dl className="mt-6 space-y-5">
            {skills.map((group) => (
              <div key={group.label}>
                <dt className="text-sm font-medium text-white">{group.label}</dt>
                <dd className="mt-2.5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/12 px-2.5 py-1 text-[11px] text-white/75"
                    >
                      {item}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}
