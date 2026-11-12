import { About } from "@/components/sections/About";
import { AlsoBuilt } from "@/components/sections/AlsoBuilt";
import { Background } from "@/components/sections/Background";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { ProjectWindow } from "@/components/sections/ProjectWindow";
import { SelectedWork } from "@/components/sections/SelectedWork";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <SelectedWork />
      <ProjectWindow />
      <Background />
      <AlsoBuilt />
      <FinalCTA />
    </>
  );
}
