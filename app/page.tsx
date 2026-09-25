import { Hero } from "@/components/Hero";
import { ProfileStrip, About } from "@/components/About";
import { Services } from "@/components/Services";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { SeoAuditTool } from "@/components/SeoAuditTool";
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
      <Services />
      <Experience />
      <Projects />
      <SeoAuditTool />
      <Skills />
      <Education />
      <WhyMe />
      <Contact />
    </>
  );
}
