"use client";

import { motion } from "motion/react";
import { PrimaryButton, gradientStyle } from "@/components/aura/Primitives";
import { GITHUB_URL, intro, roles } from "@/lib/content";

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
        R.Karan · {roles}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
        className="mt-7 max-w-4xl text-4xl leading-[0.95] font-semibold tracking-tight md:text-6xl"
      >
        <span className="block text-white">&ldquo;Measure.</span>
        <span className="animate-shiny block" style={gradientStyle}>
          Don&rsquo;t tune for speed
        </span>
        <span className="block text-white">until you&rsquo;ve measured.&rdquo;</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
        className="mt-5 text-sm text-white/75"
      >
        Rob Pike, <cite className="not-italic">Notes on Programming in C</cite>
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
        className="mt-10 max-w-xl text-base leading-[1.6] text-white/85"
      >
        {intro}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
      >
        {/* Repo only. Contact lives once, in the closing section. */}
        <PrimaryButton href={GITHUB_URL} label="View the code" />
      </motion.div>
    </section>
  );
}
