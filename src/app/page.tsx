import { Backdrop, NoiseFilter } from "@/components/aura/Backdrop";
import { AlsoBuilt } from "@/components/sections/AlsoBuilt";
import { Background } from "@/components/sections/Background";
import { BuiltWith } from "@/components/sections/BuiltWith";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { ProjectWindow } from "@/components/sections/ProjectWindow";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, LOCATION, roles } from "@/lib/content";

const footerLink = "transition-colors hover:text-white";

export default function Home() {
  // overflow-x-clip rather than -hidden: `hidden` turns this element into a
  // scroll container, which breaks smooth scrolling and scroll-margin anchors.
  return (
    <div className="relative min-h-screen overflow-x-clip bg-[#0c0c0c] text-white">
      <Backdrop />
      <NoiseFilter />

      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black"
      >
        Skip to the work
      </a>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ProjectWindow />
        <SelectedWork />
        <BuiltWith />
        <Background />
        <AlsoBuilt />
        <FinalCTA />

        <footer className="mx-auto max-w-6xl border-t border-white/10 px-6 py-10">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-xs text-white/60">
            <span>
              R.Karan · {roles} · {LOCATION}
            </span>
            <div className="flex flex-wrap gap-6">
              <a className={footerLink} href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
              <a
                className={footerLink}
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer noopener"
              >
                LinkedIn ↗
              </a>
              <a
                className={footerLink}
                href={GITHUB_URL}
                target="_blank"
                rel="noreferrer noopener"
              >
                GitHub ↗
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
