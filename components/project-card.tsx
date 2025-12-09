"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, ZoomIn } from "lucide-react" 
import { TroubleshootingDialog, TroubleshootingLog } from "./troubleshooting-dialog"
import Image from "next/image"
import { ImageViewerDialog } from "./image-viewer-dialog"
import { Button } from "@/components/ui/button"

interface Project {
  id: number
  title: string
  period: string
  role: string
  techStack: string[]
  situation: string
  task: string
  action: string
  result: string
  image?: string // Project thumbnail
  architecture?: string // Architecture diagram URL
  troubleshooting?: TroubleshootingLog
}

const STAR_COLORS = {
  situation: "bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800",
  task: "bg-purple-50 dark:bg-purple-950 border-purple-200 dark:border-purple-800",
  action: "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800",
  result: "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800",
}

const STAR_TEXT_COLORS = {
  situation: "text-blue-700 dark:text-blue-300",
  task: "text-purple-700 dark:text-purple-300",
  action: "text-green-700 dark:text-green-300",
  result: "text-amber-700 dark:text-amber-300",
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col h-full">
      {/* Project Thumbnail */}
      {project.image && (
        <div className="relative w-full h-48 overflow-hidden border-b border-border group">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />

          {/* Clickable Zoom Button Overlay */}
          <ImageViewerDialog src={project.image} alt={project.title}>
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer">
              <Button 
                variant="secondary"
                size="icon"
                className="rounded-full shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300"
                aria-label={`View full image of ${project.title}`}
              >
                <ZoomIn className="h-5 w-5" />
              </Button>
            </div>
          </ImageViewerDialog>
        </div>
      )}

      {/* Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900 dark:to-transparent">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground mb-2">{project.title}</h3>
          <div className="flex items-center flex-wrap gap-2 text-sm text-slate-600 dark:text-slate-400">
            <Badge variant="outline" className="whitespace-nowrap">
              {project.role}
            </Badge>
            <span>•</span>
            <span>{project.period}</span>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </div>

      {/* STAR Content */}
      <div className="p-6 flex-1 flex flex-col gap-4">
        {/* Architecture Diagram (Optional) */}
        {project.architecture && (
          <div className="mb-4 p-2 border rounded-lg bg-white dark:bg-slate-950">
            <div className="relative w-full aspect-video rounded overflow-hidden">
               <Image 
                src={project.architecture} 
                alt={`${project.title} Architecture`} 
                fill 
                className="object-contain"
              />
            </div>
            <p className="text-center text-xs text-muted-foreground mt-2">System Architecture</p>
          </div>
        )}

        {/* Situation */}
        <div className={`p-4 rounded-lg border-l-4 border-l-blue-500 ${STAR_COLORS.situation}`}>
          <h4 className={`font-semibold text-sm mb-2 ${STAR_TEXT_COLORS.situation}`}>상황 (Situation)</h4>
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{project.situation}</p>
        </div>

        {/* Task */}
        <div className={`p-4 rounded-lg border-l-4 border-l-purple-500 ${STAR_COLORS.task}`}>
          <h4 className={`font-semibold text-sm mb-2 ${STAR_TEXT_COLORS.task}`}>과제 (Task)</h4>
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{project.task}</p>
        </div>

        {/* Action */}
        <div className={`p-4 rounded-lg border-l-4 border-l-green-500 ${STAR_COLORS.action}`}>
          <h4 className={`font-semibold text-sm mb-2 ${STAR_TEXT_COLORS.action}`}>행동 (Action)</h4>
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{project.action}</p>
        </div>

        {/* Result - Always Visible */}
        <div className={`p-4 rounded-lg border-l-4 border-l-amber-500 ${STAR_COLORS.result}`}>
          <h4 className={`font-semibold text-sm mb-2 ${STAR_TEXT_COLORS.result}`}>결과 (Result)</h4>
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{project.result}</p>
        </div>

        {project.troubleshooting && (
          <TroubleshootingDialog log={project.troubleshooting} />
        )}
      </div>
    </Card>
  )
}
