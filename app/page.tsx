import HeroSection from "@/components/hero-section"
import SkillsSection from "@/components/skills-section"
import ProjectsSection from "@/components/projects-section"
import ContactFooter from "@/components/contact-footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactFooter />
    </main>
  )
}
