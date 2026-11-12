"use client";

import { motion } from "motion/react";
import { PrimaryButton } from "@/components/aura/Primitives";
import { EMAIL, FIRST_NAME, intro, roles, status } from "@/lib/content";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section
      id="top"
      className="flex flex-col items-center px-6 pt-16 pb-20 text-center md:pt-28"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
        className="text-xs tracking-widest text-white/80 uppercase"
      >
        {roles}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        className="mt-7 max-w-4xl text-5xl leading-[0.95] font-semibold tracking-tight md:text-7xl"
      >
        <span className="text-white">Hi, I&rsquo;m </span>
        <span className="text-[#a4f4fd]">{FIRST_NAME}.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.45, ease: EASE }}
        className="mt-8 max-w-xl text-lg leading-[1.55] text-white/90 md:text-xl"
      >
        {intro}
      </motion.p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.55, ease: EASE }}
        className="mt-5 text-sm text-white/70"
      >
        {status}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        <PrimaryButton href="/#projects" label="See what I've built" />
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          Say hello
        </a>
      </motion.div>
    </section>
  );
}
