"use client"

import { Badge } from "@/components/ui/badge"
import {
    GraduationCap,
    Award,
    Rocket,
    Briefcase,
} from "lucide-react"

const TIMELINE_ITEMS = [
    {
        date: "2026.01",
        title: "CONY",
        subtitle: "기프티콘 관리 서비스",
        type: "project" as const,
    },
    {
        date: "2025.11",
        title: "SsaveryTime",
        subtitle: "SSAFY 커뮤니티 플랫폼",
        type: "project" as const,
    },
    {
        date: "2025.08",
        title: "부산대학교 졸업",
        subtitle: "정보컴퓨터공학과",
        type: "education" as const,
    },
    {
        date: "2025.07",
        title: "SSAFY 14기 입과",
        subtitle: "Java 전공",
        type: "education" as const,
    },
    {
        date: "2025.06",
        title: "정보처리기사",
        subtitle: "국가기술자격",
        type: "certification" as const,
    },
    {
        date: "2025.04",
        title: "SQLD",
        subtitle: "SQL 개발자",
        type: "certification" as const,
    },
    {
        date: "2024.04",
        title: "졸업과제",
        subtitle: "Hyperledger Fabric",
        type: "project" as const,
    },
]

const TYPE_CONFIG = {
    project: {
        icon: Rocket,
        color: "bg-blue-500",
    },
    education: {
        icon: GraduationCap,
        color: "bg-emerald-500",
    },
    certification: {
        icon: Award,
        color: "bg-amber-500",
    },
    career: {
        icon: Briefcase,
        color: "bg-purple-500",
    },
}

export default function TimelineSidebar() {
    return (
        <aside className="hidden xl:block w-56 shrink-0">
            <div className="sticky top-20">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                    Timeline
                </h3>
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/40 via-border to-transparent" />

                    <div className="space-y-3">
                        {TIMELINE_ITEMS.map((item, index) => {
                            const config = TYPE_CONFIG[item.type]
                            const Icon = config.icon

                            return (
                                <div
                                    key={index}
                                    className="relative pl-8 group"
                                >
                                    {/* Dot */}
                                    <div
                                        className={`absolute left-[6px] top-1.5 w-[11px] h-[11px] rounded-full ${config.color} ring-2 ring-background transition-transform group-hover:scale-125`}
                                    />

                                    <div className="py-1">
                                        <p className="text-[10px] font-mono text-muted-foreground">
                                            {item.date}
                                        </p>
                                        <p className="text-xs font-semibold text-foreground leading-tight">
                                            {item.title}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground leading-tight">
                                            {item.subtitle}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Legend */}
                <div className="mt-6 pt-4 border-t border-border/50 space-y-1.5">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-[10px] text-muted-foreground">Project</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] text-muted-foreground">Education</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        <span className="text-[10px] text-muted-foreground">Certification</span>
                    </div>
                </div>
            </div>
        </aside>
    )
}
