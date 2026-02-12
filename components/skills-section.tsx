import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { TechIcon } from "@/components/tech-icon"
import { Trophy } from "lucide-react"

const SKILLS = {
  backend: [
    "Java",
    "Spring Boot",
    "Spring Security",
    "JPA",
    "RESTful API",
    "MySQL",
    "CouchDB",
  ],
  infrastructure: [
    "Hyperledger Fabric",
    "Docker",
    "CI/CD",
    "System Architecture",
    "Distributed Systems"
  ],
  awards: [
    { title: "수상 내역을 추가해주세요", date: "20XX.XX", org: "주최 기관", description: "수상 내용 설명" },
  ],
  certifications: [
    { name: "SQLD", date: "2025.04", link: "https://drive.google.com/file/d/1owtHkllOHmrQULWB3Y0YMHynUbq01jEr/view?usp=drive_link" },
    { name: "정보처리기사", date: "2025.06", link: "https://drive.google.com/file/d/1JfKRqQN09VksAW1eRt-6gd6Nobf_dHkv/view?usp=drive_link" },
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
          {/* Backend & Database (통합) */}
          <Card className="p-8 bg-card border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100 fill-mode-both view-trigger">
            <h3 className="text-xl font-bold mb-6 text-foreground flex items-center">
              <div className="h-3 w-3 rounded-full bg-blue-500 mr-3 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
              Backend & Database
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

          {/* Infrastructure (기존 Database 위치) */}
          <Card className="p-8 bg-card border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 fill-mode-both view-trigger">
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

          {/* Awards (기존 Infrastructure 위치) */}
          <Card className="p-8 bg-card border-slate-200 dark:border-slate-800 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 md:col-span-1 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both view-trigger">
            <h3 className="text-xl font-bold mb-6 text-foreground flex items-center">
              <div className="h-3 w-3 rounded-full bg-rose-500 mr-3 shadow-[0_0_10px_rgba(244,63,94,0.5)]" />
              Awards
            </h3>
            <div className="flex flex-col gap-3">
              {SKILLS.awards.map((award) => (
                <div
                  key={award.title}
                  className="p-4 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-rose-500/50 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <Trophy className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-slate-700 dark:text-slate-300">{award.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{award.org}</p>
                        {award.description && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{award.description}</p>
                        )}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs bg-white dark:bg-slate-950 shrink-0">
                      {award.date}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Certifications */}
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
