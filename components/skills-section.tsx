import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const SKILLS = {
  backend: [
    "Java",
    "Spring Boot",
    "Spring Security",
    "RESTful API",
    "Microservices",
    "Design Patterns",
  ],
  database: [
    "MySQL",
    "CouchDB",
    "Query Optimization",
    "Database Design",
    "Transaction Management",
    "Indexing Strategies",
  ],
  infrastructure: ["Hyperledger Fabric", "Docker", "CI/CD", "System Architecture", "Distributed Systems"],
  certifications: ["정보처리기사", "SQLD", "SSAFY (Samsung Software AI Academy For Youth)"],
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-4 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 view-trigger">
          <h2 className="text-4xl font-bold mb-3 text-foreground">기술 스택 & 역량</h2>
          <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Backend Technologies */}
          <Card className="p-8 bg-card border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both view-trigger">
            <h3 className="text-xl font-bold mb-6 text-foreground flex items-center">
              <div className="h-3 w-3 rounded-full bg-blue-500 mr-3 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              Backend
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {SKILLS.backend.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Database & Infrastructure */}
          <Card className="p-8 bg-card border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both view-trigger">
            <h3 className="text-xl font-bold mb-6 text-foreground flex items-center">
              <div className="h-3 w-3 rounded-full bg-emerald-500 mr-3 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              Database & Infrastructure
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {SKILLS.database.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Architecture & Systems */}
          <Card className="p-8 bg-card border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 md:col-span-1 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both view-trigger">
            <h3 className="text-xl font-bold mb-6 text-foreground flex items-center">
              <div className="h-3 w-3 rounded-full bg-purple-500 mr-3 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              Architecture
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {SKILLS.infrastructure.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-purple-500/10 hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Certifications */}
          <Card className="p-8 bg-card border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 md:col-span-1 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400 fill-mode-both view-trigger">
            <h3 className="text-xl font-bold mb-6 text-foreground flex items-center">
              <div className="h-3 w-3 rounded-full bg-amber-500 mr-3 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
              Certifications
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {SKILLS.certifications.map((cert) => (
                <Badge key={cert} variant="secondary" className="text-sm px-3 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  {cert}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
