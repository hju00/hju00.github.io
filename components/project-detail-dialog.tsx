"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Calendar, User, Trophy } from "lucide-react"
import Image from "next/image"
import { TroubleshootingDialog, TroubleshootingLog } from "./troubleshooting-dialog"

// Project 타입 정의 (필요시 별도 타입 파일로 분리 가능)
export interface Project {
  id: number
  title: string
  period: string
  role: string
  techStack: { name: string; reason: string }[]
  overview: string
  contribution: string
  image?: string
  architecture?: string
  troubleshooting?: TroubleshootingLog
  link?: string // 배포 링크나 깃허브 링크가 있다면 추가 가능
  award?: string // 수상 내역
}

const SECTION_COLORS = {
  overview: "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800",
  contribution: "bg-purple-50 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800",
  techStack: "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800",
}

const SECTION_TEXT_COLORS = {
  overview: "text-blue-700 dark:text-blue-300",
  contribution: "text-purple-700 dark:text-purple-300",
  techStack: "text-green-700 dark:text-green-300",
}

interface ProjectDetailDialogProps {
  project: Project
  children: React.ReactNode
}

export function ProjectDetailDialog({ project, children }: ProjectDetailDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!max-w-none w-[98vw] h-[96vh] p-0 flex flex-col gap-0 overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b bg-muted/40 shrink-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {project.title}
              {project.link && (
                <Button variant="ghost" size="icon" asChild className="h-8 w-8">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </DialogTitle>
            <DialogDescription className="text-base flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-2">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {project.period}
              </span>
              <span className="hidden sm:inline text-muted-foreground">|</span>
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" />
                {project.role}
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-wrap gap-2 mt-4">
            {project.award && (
              <Badge className="bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-200 border-amber-300 dark:border-amber-700 gap-1">
                <Trophy className="h-3 w-3" />
                {project.award}
              </Badge>
            )}
            {project.techStack.map((tech) => (
              <Badge key={tech.name} variant="secondary">
                {tech.name}
              </Badge>
            ))}
          </div>
        </div>

        {/* Scrollable Content Section */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8 pb-8">
            {/* Image + STAR in side-by-side layout */}
            <div className="flex flex-col xl:flex-row gap-8">
              {/* Image Section - Compact */}
              {(project.architecture || project.image) && (
                <div className="xl:w-[360px] shrink-0 space-y-3">
                  <h3 className="text-lg font-semibold">
                    {project.architecture ? "시스템 아키텍처" : "프로젝트 미리보기"}
                  </h3>
                  <div className="rounded-lg border bg-muted/50 overflow-hidden">
                    <Image
                      src={project.architecture || project.image!}
                      alt={project.title}
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              )}

              {/* STAR Content - Takes remaining space */}
              <div className="flex-1 space-y-4">
                <h3 className="text-lg font-semibold">프로젝트 상세</h3>

                <div className="grid gap-4">
                  {/* Overview */}
                  <div className={`p-5 rounded-xl border ${SECTION_COLORS.overview}`}>
                    <h4 className={`font-bold mb-2 flex items-center gap-2 ${SECTION_TEXT_COLORS.overview}`}>
                      <span className="bg-blue-200 dark:bg-blue-900 px-2 py-0.5 rounded text-xs">Overview</span>
                      프로젝트 개요 및 목표
                    </h4>
                    <p className="text-base leading-relaxed whitespace-pre-line text-foreground/90">
                      {project.overview}
                    </p>
                  </div>

                  {/* Contribution */}
                  <div className={`p-5 rounded-xl border ${SECTION_COLORS.contribution}`}>
                    <h4 className={`font-bold mb-2 flex items-center gap-2 ${SECTION_TEXT_COLORS.contribution}`}>
                      <span className="bg-purple-200 dark:bg-purple-900 px-2 py-0.5 rounded text-xs">Role & Contribution</span>
                      담당 역할 및 기여도
                    </h4>
                    <p className="text-base leading-relaxed whitespace-pre-line text-foreground/90">
                      {project.contribution}
                    </p>
                  </div>

                  {/* Tech Stack Reasons */}
                  <div className={`p-5 rounded-xl border ${SECTION_COLORS.techStack}`}>
                    <h4 className={`font-bold mb-3 flex items-center gap-2 ${SECTION_TEXT_COLORS.techStack}`}>
                      <span className="bg-green-200 dark:bg-green-900 px-2 py-0.5 rounded text-xs">Tech Stack</span>
                      사용 기술 및 도입 이유
                    </h4>
                    <ul className="space-y-3">
                      {project.techStack.map((tech) => (
                        <li key={tech.name} className="text-base text-foreground/90">
                          <strong className="text-green-700 dark:text-green-400 mr-2">{tech.name}:</strong>
                          <span className="ml-1">{tech.reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Troubleshooting Log */}
            {project.troubleshooting && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  🛠 트러블슈팅 로그
                  <Badge variant="outline" className="text-xs font-normal">Technical Deep Dive</Badge>
                </h3>
                <div className="border rounded-xl p-1 bg-muted/30">
                  {/* Reuse existing component but maybe wrap it differently or just render content directly? 
                       TroubleshootingDialog is a dialog trigger itself. 
                       Here we might want to show it inline or keep it as a nested dialog.
                       Let's keep it as a nested dialog button for now to avoid too much scrolling. */}
                  <div className="p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{project.troubleshooting.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {project.troubleshooting.date} • {project.troubleshooting.environment}
                      </p>
                    </div>
                    <TroubleshootingDialog log={project.troubleshooting} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
