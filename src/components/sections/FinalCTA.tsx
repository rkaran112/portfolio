"use client";

import { motion } from "motion/react";
import { PrimaryButton } from "@/components/aura/Primitives";
import { EMAIL } from "@/lib/content";

export function FinalCTA() {
  return (
    <section id="contact" className="mx-auto max-w-page px-6 py-20 sm:px-10 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 text-center md:py-24"
      >
        <div className="relative">
          <h2 className="text-4xl leading-[1.02] font-semibold tracking-tight md:text-6xl">
            Want the long version?
          </h2>

          <p className="mx-auto mt-6 max-w-md text-sm leading-[1.7] text-white/75">
            Happy to talk through what was tried first, and where each project still falls
            short.
          </p>

          {/* One action. The address, LinkedIn and repo all sit in the footer
              directly below, so repeating them here was noise. */}
          <div className="mt-10 flex justify-center">
            <PrimaryButton href={`mailto:${EMAIL}`} label="Email me" icon="mail" />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
