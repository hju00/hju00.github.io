"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

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
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card className="overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-slate-50 to-transparent dark:from-slate-900 dark:to-transparent">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-foreground">{project.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{project.period}</p>
          </div>
          <Badge variant="outline" className="ml-2">
            {project.role}
          </Badge>
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

        {/* Result - Collapsible */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-4 rounded-lg border-l-4 border-l-amber-500 ${STAR_COLORS.result} text-left transition-all`}
        >
          <div className="flex items-center justify-between">
            <h4 className={`font-semibold text-sm ${STAR_TEXT_COLORS.result}`}>결과 (Result)</h4>
            <ChevronDown
              className={`h-4 w-4 ${STAR_TEXT_COLORS.result} transition-transform ${isExpanded ? "rotate-180" : ""}`}
            />
          </div>
          {isExpanded && (
            <div className="mt-3 text-sm text-foreground leading-relaxed whitespace-pre-line">{project.result}</div>
          )}
        </button>
      </div>
    </Card>
  )
}
