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
import { ExternalLink, Calendar, User, Trophy, Clock } from "lucide-react"
import Image from "next/image"
import { TroubleshootingDialog, TroubleshootingLog } from "./troubleshooting-dialog"

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
  link?: string
  award?: string
  status?: "completed" | "in-progress"
  teamComposition?: {
    role: string
    count: number
    tasks: string
    isMe?: boolean
  }[]
  contributionBreakdown?: {
    area: string
    percentage: number
    description: string
  }[]
  retrospective?: {
    regrets: string[]
    improvements: string[]
    learnings: string[]
  }
  features?: {
    title: string
    description: string
    mediaUrls?: string[]
  }[]
}

const SECTION_COLORS = {
  overview: "bg-background border-border",
  contribution: "bg-background border-border",
  techStack: "bg-background border-border",
}

const SECTION_TEXT_COLORS = {
  overview: "text-foreground",
  contribution: "text-foreground",
  techStack: "text-foreground",
}

interface ProjectDetailDialogProps {
  project: Project
  children: React.ReactNode
}

export function ProjectDetailDialog({ project, children }: ProjectDetailDialogProps) {
  const isInProgress = project.status === "in-progress"

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="!max-w-none w-[98vw] h-[96vh] p-0 flex flex-col gap-0 overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b bg-muted/40 shrink-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {project.title}
              {isInProgress && (
                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700 gap-1 animate-pulse">
                  <Clock className="h-3 w-3" />
                  진행 중
                </Badge>
              )}
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
              {project.role && (
                <>
                  <span className="hidden sm:inline text-muted-foreground">|</span>
                  <span className="flex items-center gap-1.5">
                    <User className="h-4 w-4" />
                    {project.role}
                  </span>
                </>
              )}
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

            {/* In-Progress Placeholder */}
            {isInProgress && !project.overview && (
              <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
                <Clock className="h-12 w-12 mb-4 opacity-30 animate-spin" style={{ animationDuration: "3s" }} />
                <p className="text-lg font-medium">현재 개발 진행 중인 프로젝트입니다.</p>
                <p className="text-sm mt-2">상세 내용은 프로젝트 완료 후 공개될 예정입니다.</p>
              </div>
            )}

            {/* Image + STAR in side-by-side layout */}
            {(!isInProgress || project.overview) && (
              <div className="flex flex-col xl:flex-row gap-8">
                {/* Image Section */}
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

                {/* STAR Content */}
                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-semibold">프로젝트 상세</h3>
                  <div className="grid gap-4">
                    {/* Overview */}
                    {project.overview && (
                      <div className={`p-5 rounded-xl border ${SECTION_COLORS.overview}`}>
                        <h4 className={`font-bold mb-2 flex items-center gap-2 ${SECTION_TEXT_COLORS.overview}`}>
                          <Badge variant="secondary" className="px-2 py-0.5 rounded text-xs font-semibold">Overview</Badge>
                          프로젝트 개요 및 목표
                        </h4>
                        <p className="text-base leading-relaxed whitespace-pre-line text-foreground/90">
                          {project.overview}
                        </p>
                      </div>
                    )}

                    {/* Contribution */}
                    {project.contribution && (
                      <div className={`p-5 rounded-xl border ${SECTION_COLORS.contribution}`}>
                        <h4 className={`font-bold mb-2 flex items-center gap-2 ${SECTION_TEXT_COLORS.contribution}`}>
                          <Badge variant="secondary" className="px-2 py-0.5 rounded text-xs font-semibold">Role & Contribution</Badge>
                          담당 역할 및 기여도
                        </h4>
                        <p className="text-base leading-relaxed whitespace-pre-line text-foreground/90">
                          {project.contribution}
                        </p>
                      </div>
                    )}

                    {/* Tech Stack Reasons */}
                    {project.techStack.length > 0 && (
                      <div className={`p-5 rounded-xl border ${SECTION_COLORS.techStack}`}>
                        <h4 className={`font-bold mb-3 flex items-center gap-2 ${SECTION_TEXT_COLORS.techStack}`}>
                          <Badge variant="secondary" className="px-2 py-0.5 rounded text-xs font-semibold">Tech Stack</Badge>
                          사용 기술 및 도입 이유
                        </h4>
                        <ul className="space-y-3">
                          {project.techStack.map((tech) => (
                            <li key={tech.name} className="text-base text-foreground/90">
                              <strong className="text-foreground font-semibold mr-2">{tech.name}:</strong>
                              <span className="ml-1">{tech.reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Features (주요 기능) */}
            {project.features && project.features.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  ✨ 주요 기능 및 시연
                </h3>
                <div className="grid grid-cols-1 gap-6">
                  {project.features.map((feature, idx) => (
                    <div key={idx} className="border rounded-xl p-6 bg-muted/10 flex flex-col md:flex-row gap-6">
                      <div className="flex-1 space-y-3">
                        <h4 className="font-bold text-lg text-foreground flex items-center gap-2">
                          <span className="w-1.5 h-6 bg-primary rounded-full" />
                          {feature.title}
                        </h4>
                        <p className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed pl-3.5">
                          {feature.description}
                        </p>
                      </div>
                      {feature.mediaUrls && feature.mediaUrls.length > 0 && (
                        <div className={`shrink-0 flex gap-3 ${feature.mediaUrls.length > 1 ? 'flex-col sm:flex-row' : 'flex-col'} justify-center items-center`}>
                          {feature.mediaUrls.map((url, mediaIdx) => {
                            const isPortrait = url.toLowerCase().includes('/donttaz/') || url.includes('사전점검2_본인확인');
                            const isAnviPortrait = url.includes('사전점검2_본인확인');
                            return (
                              <div
                                key={mediaIdx}
                                className={`rounded-lg overflow-hidden border bg-muted/40 relative flex items-center justify-center shadow-sm ${
                                  isPortrait
                                    ? 'w-[200px] sm:w-[240px] aspect-[9/16]'
                                    : 'max-w-[320px] aspect-video'
                                }`}
                              >
                                <img
                                  src={url}
                                  alt={`${feature.title} 시연 ${mediaIdx + 1}`}
                                  className={
                                    isAnviPortrait
                                      ? "w-full h-full object-cover object-center"
                                      : "max-w-full max-h-full object-contain"
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Team Composition & Contribution Breakdown */}
            {(project.teamComposition || project.contributionBreakdown) && (
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {/* Team Composition */}
                {project.teamComposition && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      팀 구성
                      <Badge variant="outline" className="text-xs font-normal">
                        총 {project.teamComposition.reduce((sum, t) => sum + t.count, 0)}인
                      </Badge>
                    </h3>
                    <div className="border rounded-xl overflow-hidden">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-muted/60 text-left">
                            <th className="px-4 py-2.5 font-semibold w-1/3">역할</th>
                            <th className="px-4 py-2.5 font-semibold w-8">인원</th>
                            <th className="px-4 py-2.5 font-semibold">담당 업무</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                          {project.teamComposition.map((member, i) => (
                            <tr
                              key={i}
                              className={member.isMe ? "bg-primary/5 border-l-2 border-l-primary" : ""}
                            >
                              <td className="px-4 py-3 font-medium">
                                {member.role}
                                {member.isMe && (
                                  <Badge className="ml-2 text-[10px] px-1 py-0 h-4 bg-primary/20 text-primary border-primary/30">
                                    본인
                                  </Badge>
                                )}
                              </td>
                              <td className="px-4 py-3 text-center text-muted-foreground">{member.count}명</td>
                              <td className="px-4 py-3 text-muted-foreground">{member.tasks}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Contribution Breakdown */}
                {project.contributionBreakdown && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">개인 기여도 분석</h3>
                    <div className="space-y-3 p-4 border rounded-xl bg-muted/20">
                      {project.contributionBreakdown.map((item, i) => (
                        <div key={i} className="space-y-1.5">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-medium">{item.area}</span>
                            <span className="text-primary font-bold">{item.percentage}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full transition-all duration-700"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Troubleshooting Log */}
            {project.troubleshooting && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  🛠 트러블슈팅 로그
                  <Badge variant="outline" className="text-xs font-normal">Technical Deep Dive</Badge>
                </h3>
                <div className="border rounded-xl p-1 bg-muted/30">
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

            {/* Retrospective */}
            {project.retrospective && (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  📝 프로젝트 회고
                  <Badge variant="outline" className="text-xs font-normal">Retrospective</Badge>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                    <h4 className="font-bold text-sm text-foreground">아쉬웠던 부분</h4>
                    <ul className="space-y-2">
                      {project.retrospective.regrets.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-destructive shrink-0 mt-0.5">✗</span>
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                    <h4 className="font-bold text-sm text-foreground">개선 방안</h4>
                    <ul className="space-y-2">
                      {project.retrospective.improvements.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-blue-500 shrink-0 mt-0.5">→</span>
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-xl border border-border bg-background space-y-2">
                    <h4 className="font-bold text-sm text-foreground">학습 결과</h4>
                    <ul className="space-y-2">
                      {project.retrospective.learnings.map((item, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex gap-2">
                          <span className="text-emerald-500 shrink-0 mt-0.5">✓</span>
                          <span className="text-foreground/90">{item}</span>
                        </li>
                      ))}
                    </ul>
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
