"use client";

import { motion } from "motion/react";
import { Menu } from "lucide-react";
import { LogoMark, PrimaryButton } from "@/components/aura/Primitives";
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
      className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"
    >
      {/* The spec's mark is wordless. On a portfolio the name has to be
          readable, so it sits beside the mark. */}
      <a href="#top" className="flex items-center gap-3">
        <LogoMark className="h-8 w-8 text-white" />
        <span className="text-sm font-semibold tracking-tight text-white">R.Karan</span>
      </a>

      <div className="hidden gap-8 md:flex">
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
