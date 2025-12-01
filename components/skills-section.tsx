import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const SKILLS = {
  backend: [
    "Java",
    "Spring Boot",
    "Spring Data JPA",
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
  infrastructure: ["Hyperledger Fabric", "Docker", "Kubernetes", "CI/CD", "System Architecture", "Distributed Systems"],
  certifications: ["SSAFY (Samsung Software Academy)", "Java Certification", "Backend Architecture Design"],
}

export default function SkillsSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-3 text-foreground">기술 스택 & 역량</h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Backend Technologies */}
          <Card className="p-8 bg-card hover:border-primary/50 transition-colors">
            <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
              <div className="h-3 w-3 rounded-full bg-primary mr-3" />
              Backend
            </h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.backend.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Database & Infrastructure */}
          <Card className="p-8 bg-card hover:border-primary/50 transition-colors">
            <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
              <div className="h-3 w-3 rounded-full bg-primary mr-3" />
              Database & Infrastructure
            </h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.database.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Architecture & Systems */}
          <Card className="p-8 bg-card hover:border-primary/50 transition-colors md:col-span-1">
            <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
              <div className="h-3 w-3 rounded-full bg-primary mr-3" />
              Architecture
            </h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.infrastructure.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Certifications */}
          <Card className="p-8 bg-card hover:border-primary/50 transition-colors md:col-span-1">
            <h3 className="text-xl font-semibold mb-4 text-foreground flex items-center">
              <div className="h-3 w-3 rounded-full bg-primary mr-3" />
              Certifications
            </h3>
            <div className="flex flex-wrap gap-2">
              {SKILLS.certifications.map((cert) => (
                <Badge key={cert} variant="outline" className="text-sm">
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
