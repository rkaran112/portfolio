"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { NAME } from "@/lib/content";

/**
 * Links are absolute rather than bare hashes, so the nav works from the project
 * detail pages too, not just the home page.
 */
const LINKS = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Demos", href: "/#demos" },
  { label: "Background", href: "/#background" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative mx-auto max-w-page px-6 py-5 sm:px-10"
      aria-label="Primary"
    >
      <div className="flex min-h-10 items-center justify-between">
        {/* A name, not a logo: this is a person's site. */}
        <Link
          href="/#top"
          className="inline-flex items-center py-1 text-sm font-semibold text-white transition-colors hover:text-white/80"
        >
          {NAME}
        </Link>

        <div className="hidden gap-8 md:flex">
          {LINKS.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.05, ease: "easeOut" }}
              className="inline-flex items-center py-1 text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* A real disclosure. This used to be a Menu icon that just jumped to
            the work, leaving every other section unreachable on a phone. */}
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10 md:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      <div
        id="mobile-nav"
        hidden={!open}
        className="liquid-glass mt-4 rounded-2xl p-2 md:hidden"
      >
        <ul>
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-medium text-white/85 transition-colors hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
}
