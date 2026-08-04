import { AlsoBuilt } from "@/components/sections/AlsoBuilt";
import { Background } from "@/components/sections/Background";
import { BuiltWith } from "@/components/sections/BuiltWith";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Navbar } from "@/components/sections/Navbar";
import { ProjectWindow } from "@/components/sections/ProjectWindow";
import { SelectedWork } from "@/components/sections/SelectedWork";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-black"
      >
        Skip to the work
      </a>

      <Navbar />
      <Hero />
      <ProjectWindow />
      <SelectedWork />
      <BuiltWith />
      <Background />
      <AlsoBuilt />
      <FinalCTA />
    </>
  );
}
