"use client";

import { motion } from "motion/react";
import { supporting } from "@/lib/content";

export function AlsoBuilt() {
  return (
    <section id="also-built" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <h2 className="text-3xl leading-[1.02] font-semibold tracking-tight md:text-4xl">
        Also built.
      </h2>
      <p className="mt-4 max-w-lg text-base leading-[1.6] text-white/75">
        Smaller projects, listed as they are. Where a repo is not public yet the card says so
        instead of linking somewhere dead.
      </p>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {supporting.map((item, i) => (
          <motion.li
            key={item.name}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, delay: (i % 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="liquid-glass flex h-full flex-col rounded-2xl p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-num text-sm font-semibold text-white">{item.name}</h3>
              {item.repo.kind === "public" ? (
                <a
                  href={item.repo.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="shrink-0 rounded-full border border-white/15 px-2.5 py-1 text-[10px] text-white/80 transition-colors hover:border-white/40 hover:text-white"
                >
                  Repo ↗<span className="sr-only">{` for ${item.name}, opens on GitHub`}</span>
                </a>
              ) : (
                <span className="shrink-0 rounded-full border border-dashed border-white/15 px-2.5 py-1 text-[10px] text-white/55">
                  {item.repo.kind === "pending" ? "Pending" : "In progress"}
                </span>
              )}
            </div>
            <p className="mt-3 text-xs leading-[1.7] text-white/70">{item.note}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
