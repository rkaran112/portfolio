"use client";

import { motion } from "motion/react";
import { flagship } from "@/lib/content";

/** Tools used across the work on this page, not companies vouching for anyone. */
const STACK = [...new Set(flagship.flatMap((project) => project.tech))];

export function BuiltWith() {
  return (
    <section id="stack" className="mx-auto max-w-6xl px-6 py-16 md:py-20">
      <p className="text-center text-xs tracking-widest text-white/60 uppercase">
        Built with, across the projects on this page
      </p>

      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-6">
        {STACK.map((name, i) => (
          <motion.span
            key={name}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: "easeOut" }}
            className="text-center text-sm font-semibold tracking-tight text-white/70 transition-colors hover:text-white"
          >
            {name}
          </motion.span>
        ))}
      </div>
    </section>
  );
}
