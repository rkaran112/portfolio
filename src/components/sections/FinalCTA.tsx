"use client";

import { motion } from "motion/react";
import { GhostButton, PrimaryButton } from "@/components/aura/Primitives";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, LOCATION } from "@/lib/content";

export function FinalCTA() {
  return (
    <section id="contact" className="mx-auto max-w-page px-6 sm:px-10 py-20 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 text-center md:py-24"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)",
            opacity: 0.3,
          }}
        />

        <div className="relative">
          <h2 className="text-4xl leading-[1.02] font-semibold tracking-tight md:text-6xl">
            <span className="block">Want the long version?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-[1.7] text-white/75">
            I am happy to talk through any of these in detail: what the problem actually was,
            which approaches were tried first, and where each one still falls short. The
            failures are usually the more interesting half.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton href={GITHUB_URL} label="View the code" />
            <GhostButton label="Email me" href={`mailto:${EMAIL}`} />
            <GhostButton label="LinkedIn" href={LINKEDIN_URL} external />
          </div>

          <p className="mt-8 text-xs text-white/60">
            {EMAIL} · {LOCATION}
          </p>
        </div>
      </motion.div>
    </section>
  );
}
