"use client"

import { Badge } from "@/components/ui/badge"
import {
    GraduationCap,
    Award,
    Rocket,
    BookOpen,
    Briefcase,
} from "lucide-react"

const TIMELINE_ITEMS = [
    {
        date: "2026.01 ~ 2026.02",
        title: "CONY - 기프티콘 관리 및 판매 서비스",
        description: "SSAFY 14기 공통 프로젝트. 6인 팀 리더로 백엔드(Room API) 및 인프라(Docker, Jenkins CI/CD, Prometheus/Grafana) 담당.",
        type: "project" as const,
        tags: ["Spring Boot", "Docker", "Jenkins"],
    },
    {
        date: "2025.11 ~ 2025.12",
        title: "SsaveryTime - SSAFY 통합 커뮤니티 플랫폼",
        description: "2인 팀으로 익명 커뮤니티 플랫폼 개발. SHA-256 기반 익명 소유권 검증, AI 요약, Docker 기반 배포.",
        type: "project" as const,
        tags: ["Spring Boot", "FastAPI", "Docker"],
    },
    {
        date: "2025.08",
        title: "부산대학교 졸업",
        description: "전기컴퓨터공학부 정보컴퓨터공학과 전공. 정보 보안 및 네트워크 분야 중점 학습.",
        type: "education" as const,
        tags: ["컴퓨터공학"],
    },
    {
        date: "2025.07",
        title: "Samsung SW Academy For Youth (SSAFY) 14기 입과",
        description: "Java 전공 트랙. 알고리즘, 웹 개발, 프로젝트 기반 학습 과정 수료 중.",
        type: "education" as const,
        tags: ["Java", "진행 중"],
    },
    {
        date: "2025.06",
        title: "정보처리기사 취득",
        description: "한국산업인력공단 국가기술자격증.",
        type: "certification" as const,
        tags: [],
    },
    {
        date: "2025.04",
        title: "SQLD 취득",
        description: "한국데이터산업진흥원 SQL 개발자 자격증.",
        type: "certification" as const,
        tags: [],
    },
    {
        date: "2024.04 ~ 2024.10",
        title: "Hyperledger Fabric 기반 데이터 수집 플랫폼 (졸업과제)",
        description: "허가형 블록체인으로 데이터 무결성을 보장하는 수집 플랫폼 설계. 3-Tier 저장소 분리 아키텍처 및 스마트 컨트랙트 검증 로직 구현.",
        type: "project" as const,
        tags: ["Hyperledger Fabric", "Node.js", "GO"],
    },
]

const TYPE_CONFIG = {
    project: {
        icon: Rocket,
        color: "bg-blue-500",
        badgeColor: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
        label: "Project",
    },
    education: {
        icon: GraduationCap,
        color: "bg-emerald-500",
        badgeColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
        label: "Education",
    },
    certification: {
        icon: Award,
        color: "bg-amber-500",
        badgeColor: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
        label: "Certification",
    },
    career: {
        icon: Briefcase,
        color: "bg-purple-500",
        badgeColor: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
        label: "Career",
    },
}

export default function TimelineSection() {
    return (
        <section id="timeline" className="py-24 px-4 bg-background">
            <div className="max-w-3xl mx-auto">
                <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700 view-trigger">
                    <h2 className="text-4xl font-bold mb-3 text-foreground">타임라인</h2>
                    <p className="text-slate-600 dark:text-slate-400 text-lg mb-4">
                        성장 과정과 주요 이정표를 시간순으로 정리했습니다.
                    </p>
                    <div className="h-1.5 w-20 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-slate-300 dark:via-slate-700 to-transparent" />

                    <div className="space-y-10">
                        {TIMELINE_ITEMS.map((item, index) => {
                            const config = TYPE_CONFIG[item.type]
                            const Icon = config.icon

                            return (
                                <div
                                    key={index}
                                    className="relative pl-16 animate-in fade-in slide-in-from-left-4 duration-500 view-trigger"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Icon Circle */}
                                    <div
                                        className={`absolute left-3 top-1 w-7 h-7 rounded-full ${config.color} flex items-center justify-center shadow-lg ring-4 ring-background`}
                                    >
                                        <Icon className="h-3.5 w-3.5 text-white" />
                                    </div>

                                    {/* Content Card */}
                                    <div className="group p-5 rounded-xl border bg-card hover:shadow-md hover:border-primary/30 transition-all duration-300">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <Badge className={`text-xs font-medium ${config.badgeColor} border-0`}>
                                                {config.label}
                                            </Badge>
                                            <span className="text-xs text-muted-foreground font-mono">
                                                {item.date}
                                            </span>
                                        </div>

                                        <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {item.description}
                                        </p>

                                        {item.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mt-3">
                                                {item.tags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                                                    >
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
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
