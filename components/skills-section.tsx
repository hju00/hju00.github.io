import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { TechIcon } from "@/components/tech-icon"

const SKILLS = {
  backend: [
    "Java",
    "Spring Boot",
    "Spring Security",
    "JPA",
    "RESTful API",
  ],
  database: [
    "MySQL",
    "CouchDB",
    "Query Optimization",
    "Database Design",
    "Transaction Management",
  ],
  infrastructure: [
    "Hyperledger Fabric", 
    "Docker", 
    "CI/CD", 
    "System Architecture", 
    "Distributed Systems"
  ],
  certifications: [
    { name: "SQLD", date: "2025.04", link: "/certificates/sqld.pdf" },
    { name: "정보처리기사", date: "2025.06", link: "/certificates/engineer-information-processing.pdf" },
    { name: "SSAFY 14기", date: "2025.07 ~", link: "https://www.ssafy.com/" }
  ],
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
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SKILLS.backend.map((skill) => (
                <div key={skill} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-blue-500/50 transition-colors group">
                  <div className="h-10 w-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                    <TechIcon name={skill} size={24} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 text-center">{skill}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Database */}
          <Card className="p-8 bg-card border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both view-trigger">
            <h3 className="text-xl font-bold mb-6 text-foreground flex items-center">
              <div className="h-3 w-3 rounded-full bg-emerald-500 mr-3 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
              Database
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SKILLS.database.map((skill) => (
                <div key={skill} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-emerald-500/50 transition-colors group">
                  <div className="h-10 w-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                    <TechIcon name={skill} size={24} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 text-center">{skill}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Infrastructure */}
          <Card className="p-8 bg-card border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 md:col-span-1 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both view-trigger">
            <h3 className="text-xl font-bold mb-6 text-foreground flex items-center">
              <div className="h-3 w-3 rounded-full bg-purple-500 mr-3 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
              Infrastructure
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {SKILLS.infrastructure.map((skill) => (
                <div key={skill} className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-purple-500/50 transition-colors group">
                  <div className="h-10 w-10 flex items-center justify-center bg-white dark:bg-slate-800 rounded-full shadow-sm group-hover:scale-110 transition-transform">
                    <TechIcon name={skill} size={24} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300 text-center">{skill}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Certifications (Updated with Links) */}
          <Card className="p-8 bg-card border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 md:col-span-1 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400 fill-mode-both view-trigger">
            <h3 className="text-xl font-bold mb-6 text-foreground flex items-center">
              <div className="h-3 w-3 rounded-full bg-amber-500 mr-3 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
              Certifications
            </h3>
            <div className="flex flex-col gap-3">
              {SKILLS.certifications.map((cert) => (
                <a 
                  key={cert.name} 
                  href={cert.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 transition-all duration-200 cursor-pointer hover:-translate-y-1 hover:shadow-md hover:border-primary group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    <span className="font-medium text-slate-700 dark:text-slate-300 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">
                      {cert.name}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs bg-white dark:bg-slate-950 ml-2">
                    {cert.date}
                  </Badge>
                </a>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
