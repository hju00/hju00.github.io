import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import TimelineSection from "@/components/timeline-section"
import ContactFooter from "@/components/contact-footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <TimelineSection />
      <ContactFooter />
    </main>
  )
}
