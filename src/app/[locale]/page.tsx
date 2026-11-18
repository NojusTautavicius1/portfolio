import { setRequestLocale } from "next-intl/server";

import { Reveal } from "@/components/motion/Reveal";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { StudioMotion } from "@/components/sections/StudioMotion";
import { ProbeLayer } from "@/components/three/ProbeLayer";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <Projects />
      <StudioMotion />
      <Experience />
      <Skills />
      <About />
      <Contact />
      {/* After the sections: Reveal and the probe look up elements that must already exist. */}
      <Reveal />
      <ProbeLayer />
    </>
  );
}
