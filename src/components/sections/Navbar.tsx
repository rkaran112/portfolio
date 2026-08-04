"use client";

import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { PrimaryButton } from "@/components/aura/Primitives";
import { GITHUB_URL } from "@/lib/content";

const LINKS = [
  { label: "Demos", href: "#work" },
  { label: "Projects", href: "#benchmarks" },
  { label: "Stack", href: "#stack" },
  { label: "Background", href: "#background" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mx-auto flex max-w-page items-center justify-end px-6 py-5 sm:px-10"
    >
      {/* No wordmark: the hero states the name a moment later. Links stay
          optically centred by taking them out of the flex flow. */}
      <div className="absolute left-1/2 hidden -translate-x-1/2 gap-8 md:flex">
        {LINKS.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: "easeOut" }}
            className="text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            {link.label}
          </motion.a>
        ))}
      </div>

      <div className="hidden md:block">
        <PrimaryButton href={GITHUB_URL} label="View the code" />
      </div>

      <a
        href="#work"
        aria-label="Jump to the work"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
      >
        <Menu className="h-4 w-4 text-white" />
      </a>
    </motion.nav>
  );
}
