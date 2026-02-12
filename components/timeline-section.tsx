"use client"

import { Badge } from "@/components/ui/badge"
import {
    GraduationCap,
    Award,
    Rocket,
    Briefcase,
} from "lucide-react"

// All items merged and sorted by date descending
const TIMELINE_ITEMS = [
    {
        date: "2026.01 ~ 02",
        title: "CONY",
        description: "기프티콘 관리 및 판매 서비스. 6인 팀 리더, 백엔드 & 인프라 담당.",
        side: "left" as const,
        type: "project" as const,
    },
    {
        date: "2025.11 ~ 12",
        title: "SsaveryTime",
        description: "SSAFY 통합 익명 커뮤니티. 2인 팀 Full-Stack 개발.",
        side: "left" as const,
        type: "project" as const,
    },
    {
        date: "2025.08",
        title: "부산대학교 졸업",
        description: "정보컴퓨터공학과 전공",
        side: "right" as const,
        type: "education" as const,
    },
    {
        date: "2025.07",
        title: "SSAFY 14기 입과",
        description: "Java 전공 트랙 (진행 중)",
        side: "right" as const,
        type: "education" as const,
    },
    {
        date: "2025.06",
        title: "정보처리기사 취득",
        description: "한국산업인력공단 국가기술자격",
        side: "right" as const,
        type: "certification" as const,
    },
    {
        date: "2025.04",
        title: "SQLD 취득",
        description: "SQL 개발자 자격증",
        side: "right" as const,
        type: "certification" as const,
    },
    {
        date: "2024.04 ~ 10",
        title: "졸업과제",
        description: "Hyperledger Fabric 기반 데이터 수집 플랫폼 설계 및 구현.",
        side: "left" as const,
        type: "project" as const,
    },
]

const TYPE_CONFIG = {
    project: {
        icon: Rocket,
        color: "bg-blue-500",
        ring: "ring-blue-500/20",
        border: "border-blue-200 dark:border-blue-800",
        bg: "bg-blue-50 dark:bg-blue-950/30",
    },
    education: {
        icon: GraduationCap,
        color: "bg-emerald-500",
        ring: "ring-emerald-500/20",
        border: "border-emerald-200 dark:border-emerald-800",
        bg: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    certification: {
        icon: Award,
        color: "bg-amber-500",
        ring: "ring-amber-500/20",
        border: "border-amber-200 dark:border-amber-800",
        bg: "bg-amber-50 dark:bg-amber-950/30",
    },
    career: {
        icon: Briefcase,
        color: "bg-purple-500",
        ring: "ring-purple-500/20",
        border: "border-purple-200 dark:border-purple-800",
        bg: "bg-purple-50 dark:bg-purple-950/30",
    },
}

export default function TimelineSection() {
    return (
        <section id="timeline" className="py-24 px-4 bg-background">
            <div className="max-w-5xl mx-auto">
                <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 view-trigger">
                    <h2 className="text-4xl font-bold mb-3 text-foreground">타임라인</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">
                        성장 과정과 주요 이정표를 시간순으로 정리했습니다.
                    </p>
                    <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
                </div>

                {/* Column Labels */}
                <div className="hidden md:flex justify-between mb-8 px-4">
                    <div className="w-[calc(50%-20px)] text-right">
                        <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 border-0">
                            <Rocket className="w-3 h-3 mr-1" /> Projects
                        </Badge>
                    </div>
                    <div className="w-10" />
                    <div className="w-[calc(50%-20px)] text-left">
                        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300 border-0">
                            <GraduationCap className="w-3 h-3 mr-1" /> Education & Certifications
                        </Badge>
                    </div>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Center Line - Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-primary/50 via-slate-300 dark:via-slate-700 to-transparent" />

                    {/* Center Line - Mobile (left side) */}
                    <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-slate-300 dark:via-slate-700 to-transparent" />

                    <div className="space-y-8 md:space-y-10">
                        {TIMELINE_ITEMS.map((item, index) => {
                            const config = TYPE_CONFIG[item.type]
                            const Icon = config.icon
                            const isLeft = item.side === "left"

                            return (
                                <div
                                    key={index}
                                    className="relative animate-in fade-in duration-500 view-trigger"
                                    style={{ animationDelay: `${index * 80}ms` }}
                                >
                                    {/* Desktop Layout */}
                                    <div className="hidden md:flex items-start">
                                        {/* Left Content */}
                                        <div className="w-[calc(50%-20px)] pr-6">
                                            {isLeft && (
                                                <div className={`p-4 rounded-xl border ${config.border} ${config.bg} text-right transition-all hover:shadow-md`}>
                                                    <p className="text-xs font-mono text-muted-foreground mb-1">{item.date}</p>
                                                    <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                                                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                                </div>
                                            )}
                                        </div>

                                        {/* Center Dot */}
                                        <div className="w-10 flex justify-center shrink-0">
                                            <div className={`w-8 h-8 rounded-full ${config.color} flex items-center justify-center shadow-md ring-4 ring-background`}>
                                                <Icon className="h-3.5 w-3.5 text-white" />
                                            </div>
                                        </div>

                                        {/* Right Content */}
                                        <div className="w-[calc(50%-20px)] pl-6">
                                            {!isLeft && (
                                                <div className={`p-4 rounded-xl border ${config.border} ${config.bg} text-left transition-all hover:shadow-md`}>
                                                    <p className="text-xs font-mono text-muted-foreground mb-1">{item.date}</p>
                                                    <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                                                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Mobile Layout - Always left-aligned */}
                                    <div className="md:hidden relative pl-12">
                                        <div className={`absolute left-[9px] top-2 w-7 h-7 rounded-full ${config.color} flex items-center justify-center shadow-md ring-3 ring-background`}>
                                            <Icon className="h-3 w-3 text-white" />
                                        </div>
                                        <div className={`p-4 rounded-xl border ${config.border} ${config.bg} transition-all`}>
                                            <p className="text-xs font-mono text-muted-foreground mb-1">{item.date}</p>
                                            <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
