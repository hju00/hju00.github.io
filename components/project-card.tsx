"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Trophy, Clock } from "lucide-react"
import Image from "next/image"
import { ProjectDetailDialog, Project } from "./project-detail-dialog"

export default function ProjectCard({ project }: { project: Project }) {
  const isInProgress = project.status === "in-progress"

  return (
    <ProjectDetailDialog project={project}>
      <Card className={`group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full bg-card ${isInProgress ? "hover:border-emerald-400/50 border-emerald-200 dark:border-emerald-900" : "hover:border-primary/50"}`}>
        {/* Project Thumbnail */}
        {project.image ? (
          <div className="relative w-full h-48 overflow-hidden border-b border-border">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            {/* Award Badge */}
            {project.award && (
              <div className="absolute top-3 left-3 z-10">
                <Badge className="bg-amber-100/95 text-amber-800 dark:bg-amber-900/90 dark:text-amber-200 border-amber-300 dark:border-amber-700 gap-1 shadow-md backdrop-blur-sm">
                  <Trophy className="h-3 w-3" />
                  {project.award}
                </Badge>
              </div>
            )}
            {/* In-Progress Badge */}
            {isInProgress && (
              <div className="absolute top-3 right-3 z-10">
                <Badge className="bg-emerald-100/95 text-emerald-800 dark:bg-emerald-900/90 dark:text-emerald-200 border-emerald-300 gap-1 shadow-md backdrop-blur-sm animate-pulse">
                  <Clock className="h-3 w-3" />
                  진행 중
                </Badge>
              </div>
            )}
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-medium px-4 py-2 border border-white/50 rounded-full backdrop-blur-sm">
                자세히 보기
              </span>
            </div>
          </div>
        ) : isInProgress ? (
          <div className="relative w-full h-48 border-b border-emerald-200 dark:border-emerald-900 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 flex flex-col items-center justify-center gap-2">
            <Clock className="h-10 w-10 text-emerald-400 animate-spin" style={{ animationDuration: "3s" }} />
            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">개발 진행 중</span>
            <Badge className="bg-emerald-100/95 text-emerald-800 dark:bg-emerald-900/90 dark:text-emerald-200 border-emerald-300 gap-1 animate-pulse">
              <Clock className="h-3 w-3" />
              진행 중
            </Badge>
          </div>
        ) : null}

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center flex-wrap gap-2 text-sm text-muted-foreground">
              {project.role && (
                <Badge variant="outline" className="whitespace-nowrap">
                  {project.role}
                </Badge>
              )}
              <span className="text-xs">•</span>
              <span className="text-xs">{project.period}</span>
            </div>
          </div>

          {/* Tech Stack */}
          {project.techStack.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.slice(0, 5).map((tech) => (
                <Badge key={tech.name} variant="secondary" className="text-xs bg-muted/50 group-hover:bg-muted transition-colors">
                  {tech.name}
                </Badge>
              ))}
              {project.techStack.length > 5 && (
                <Badge variant="secondary" className="text-xs bg-muted/50">
                  +{project.techStack.length - 5}
                </Badge>
              )}
            </div>
          )}

          {/* Bottom Action Area */}
          <div className={`mt-auto pt-4 border-t border-border/50 flex items-center justify-between text-sm transition-colors ${isInProgress ? "text-emerald-500 group-hover:text-emerald-400" : "text-muted-foreground group-hover:text-primary"}`}>
            <span>{isInProgress ? "업데이트 예정" : "Click to explore"}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Card>
    </ProjectDetailDialog>
  )
}
