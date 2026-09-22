import { Hero } from "@/components/Hero";
import { ProfileStrip, About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Education } from "@/components/Education";
import { WhyMe } from "@/components/WhyMe";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProfileStrip />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <WhyMe />
      <Contact />
    </>
  );
}
