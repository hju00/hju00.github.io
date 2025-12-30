"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { ProjectDetailDialog, Project } from "./project-detail-dialog"

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <ProjectDetailDialog project={project}>
      <Card className="group cursor-pointer overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col h-full bg-card">
        {/* Project Thumbnail */}
        {project.image && (
          <div className="relative w-full h-48 overflow-hidden border-b border-border">
            <Image 
              src={project.image} 
              alt={project.title} 
              fill 
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span className="text-white font-medium px-4 py-2 border border-white/50 rounded-full backdrop-blur-sm">
                자세히 보기
              </span>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <div className="flex items-center flex-wrap gap-2 text-sm text-muted-foreground">
              <Badge variant="outline" className="whitespace-nowrap">
                {project.role}
              </Badge>
              <span className="text-xs">•</span>
              <span className="text-xs">{project.period}</span>
            </div>
          </div>

          {/* Tech Stack - Limit to first 5 or show all if short */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.techStack.slice(0, 5).map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs bg-muted/50 group-hover:bg-muted transition-colors">
                {tech}
              </Badge>
            ))}
            {project.techStack.length > 5 && (
              <Badge variant="secondary" className="text-xs bg-muted/50">
                +{project.techStack.length - 5}
              </Badge>
            )}
          </div>

          {/* Bottom Action Area */}
          <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between text-sm text-muted-foreground group-hover:text-primary transition-colors">
            <span>Click to explore</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Card>
    </ProjectDetailDialog>
  )
}
