import type { CSSProperties } from "react";
import { PrimaryButton } from "@/components/aura/Primitives";
import { EMAIL, FIRST_NAME, intro, roles, status } from "@/lib/content";

/**
 * The entrance is a CSS animation, not a JS one, so the hero paints as soon
 * as the stylesheet arrives. It used to wait for React to hydrate, which left
 * the top of the page blank on a slow phone.
 */
const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section
      id="top"
      className="flex flex-col items-center px-6 pt-16 pb-20 text-center md:pt-28"
    >
      <p className="rise text-xs tracking-widest text-white/80 uppercase" style={delay(100)}>
        {roles}
      </p>

      <h1
        className="rise mt-7 max-w-4xl text-5xl leading-[0.95] font-semibold tracking-tight md:text-7xl"
        style={delay(200)}
      >
        <span className="text-white">Hi, I&rsquo;m </span>
        <span className="text-[#a4f4fd]">{FIRST_NAME}.</span>
      </h1>

      <p
        className="rise mt-8 max-w-xl text-lg leading-[1.55] text-balance text-white/90 md:text-xl"
        style={delay(300)}
      >
        {intro}
      </p>

      <p className="rise mt-5 text-sm text-balance text-white/70" style={delay(380)}>
        {status}
      </p>

      <div
        className="rise mt-10 flex flex-wrap items-center justify-center gap-3"
        style={delay(460)}
      >
        <PrimaryButton href="/#projects" label="See what I've built" />
        <a
          href={`mailto:${EMAIL}`}
          className="inline-flex items-center justify-center rounded-full border border-white/25 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          Say hello
        </a>
      </div>
    </section>
  );
}
