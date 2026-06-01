"use client"

import { useState, useEffect, useRef } from "react"
import {
  Trophy, Printer, Check, Calendar, Briefcase, Code,
  Sparkles, Cpu, Layers, Shield, FileText, CheckSquare, Square,
  Award, BookOpen, AlertTriangle, ArrowRight, Mail, Github,
  Percent, Database, RefreshCw, Layers2, Zap, ArrowLeft
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Customization {
  coverTitle: string
  coverSlogan: string
  coverIntro: string
  anviRole: string
  anviSummary: string
  donttazRole: string
  donttazSummary: string
  conyRole: string
  conySummary: string
  activeSlides: Record<string, boolean>
}

interface JobApplication {
  id: string
  company: string
  position: string
  jobDescription: string
  createdAt: string
  updatedAt: string
  customization: Customization
}

const DEFAULT_CUSTOMIZATION: Customization = {
  coverTitle: "신입 백엔드 소프트웨어 엔지니어 포트폴리오",
  coverSlogan: "비즈니스 지표 최적화 및 안정적 분산 아키텍처를 설계하는 백엔드 개발자",
  coverIntro: "학부 정보컴퓨터공학 전공 및 SSAFY 14기 1,600시간의 집중 개발 훈련을 거치며, 대용량 트래픽 동시성 이슈 및 배포 인프라 성능 최적화 과정을 트레이드오프 관점에서 해결해 온 신입 백엔드 개발자 박형주입니다.",
  anviRole: "Team Lead / AI & Backend",
  anviSummary: "온라인 시험 감독 서비스 운영 시 발생하는 극심한 GPU 서버 비용(500명 동시 응시 시 월 1,500만 원 상당) 및 개인정보 규정 위반 리스크를, YOLO-Gemma VLM 계층형 온디바이스 AI 파이프라인 설계 및 기기 내 본인인증/비식별 처리를 통해 해결하여 서버 추론 비용 0원 달성 및 보안 리스크를 원천 차단했습니다.",
  donttazRole: "Team Lead / Backend & DB",
  donttazSummary: "급여일 자동 이체 등 초당 500건 이상의 고빈도 동시 이체 요청 시 발생하는 데이터 레이스(Race Condition)와 데드락 현상을 방지하기 위해, Redis 분산 락(Redisson)을 통한 메모리 레벨 락 제어 및 가상 금고 격리 아키텍처를 구현하여 데이터 무결성 100%를 충족했습니다.",
  conyRole: "Team Lead / Backend & DevOps",
  conySummary: "기프티콘 판독 지연에 의해 생성되지 않은 썸네일 경로가 null로 반환될 때 발생하던 화면 깨짐 및 사용자 이탈 장애를, 백엔드 조회 쿼리 레벨(JPA Specification)에서 원본 이미지로 우회하도록 2단계 이미지 폴백(Fallback) 반환 아키텍처를 구축하여 노출 실패율을 0%로 해결했습니다.",
  activeSlides: { cover: true, skills: true, anvi: true, donttaz: true, cony: true, secondary: true },
}

const SLIDE_IDS = ["cover", "skills", "anvi", "donttaz", "cony", "secondary"]

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function loadApplications(): JobApplication[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem("pdf-portfolio-applications")
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveApplicationsToStorage(apps: JobApplication[]) {
  localStorage.setItem("pdf-portfolio-applications", JSON.stringify(apps))
}

// 1. ANVI Performance Chart
const AnviPerformanceChart = () => {
  return (
    <div className="h-full flex flex-col justify-between w-full pt-1">
      {/* Metric 1: VLM 호출 수 */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-semibold text-slate-700 dark:text-slate-300">
          <span>분당 VLM 호출 횟수 (낮을수록 리소스 우수)</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">-99.8% 절감</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-14 text-[9px] text-slate-500 dark:text-slate-400 font-medium">전량 VLM</span>
            <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-rose-400 to-rose-500 h-full rounded-full" style={{ width: '100%' }} />
            </div>
            <span className="w-20 text-[9px] text-rose-600 dark:text-rose-400 font-mono font-bold text-right">1,200회/분</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-14 text-[9px] text-slate-500 dark:text-slate-400 font-medium">계층 추론</span>
            <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-full" style={{ width: '1.2%' }} />
            </div>
            <span className="w-20 text-[9px] text-emerald-600 dark:text-emerald-400 font-mono font-bold text-right">1.5회/분</span>
          </div>
        </div>
      </div>

      {/* Metric 2: 배터리 연속 구동 시간 */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-semibold text-slate-700 dark:text-slate-300">
          <span>기기 연속 작동 시간 (발열 한계 테스트)</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">120배 연장</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-14 text-[9px] text-slate-500 dark:text-slate-400 font-medium">전량 VLM</span>
            <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-rose-400 to-rose-500 h-full rounded-full" style={{ width: '0.8%' }} />
            </div>
            <span className="w-20 text-[9px] text-rose-600 dark:text-rose-400 font-mono font-bold text-right">1분 미만</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-14 text-[9px] text-slate-500 dark:text-slate-400 font-medium">계층 추론</span>
            <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
            </div>
            <span className="w-20 text-[9px] text-emerald-600 dark:text-emerald-400 font-mono font-bold text-right">120분+</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 2. Donttaz Performance Chart
const DonttazPerformanceChart = () => {
  return (
    <div className="h-full flex flex-col justify-between w-full pt-1">
      {/* Metric 1: 처리 속도 */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-semibold text-slate-700 dark:text-slate-300">
          <span>500건 동시 처리 시간 (낮을수록 우수)</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">85% 단축</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-14 text-[9px] text-slate-500 dark:text-slate-400 font-medium">비관적 락</span>
            <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-rose-400 to-rose-500 h-full rounded-full" style={{ width: '100%' }} />
            </div>
            <span className="w-20 text-[9px] text-rose-600 dark:text-rose-400 font-mono font-bold text-right">8.5초 (대기)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-14 text-[9px] text-slate-500 dark:text-slate-400 font-medium">분산 락</span>
            <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-full" style={{ width: '14%' }} />
            </div>
            <span className="w-20 text-[9px] text-emerald-600 dark:text-emerald-400 font-mono font-bold text-right">1.2초 (격리)</span>
          </div>
        </div>
      </div>

      {/* Metric 2: 잔액 정합성 */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-semibold text-slate-700 dark:text-slate-300">
          <span>동시성 유입 시 잔액 무결성 성공률</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% 보장</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-14 text-[9px] text-slate-500 dark:text-slate-400 font-medium">비관적 락</span>
            <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-rose-400 to-rose-500 h-full rounded-full" style={{ width: '88%' }} />
            </div>
            <span className="w-20 text-[9px] text-rose-600 dark:text-rose-400 font-mono font-bold text-right">88% 성공</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-14 text-[9px] text-slate-500 dark:text-slate-400 font-medium">분산 락</span>
            <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
            </div>
            <span className="w-20 text-[9px] text-emerald-600 dark:text-emerald-400 font-mono font-bold text-right">100% 무결성</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// 3. CONY Build Time Chart
const ConyBuildTimeChart = () => {
  return (
    <div className="h-full flex flex-col justify-between w-full pt-1">
      {/* Metric 1: 빌드 속도 */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-semibold text-slate-700 dark:text-slate-300">
          <span>CI/CD 파이프라인 빌드/배포 속도 (낮을수록 우수)</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">61.6% 단축</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-14 text-[9px] text-slate-500 dark:text-slate-400 font-medium">전체 빌드</span>
            <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-rose-400 to-rose-500 h-full rounded-full" style={{ width: '100%' }} />
            </div>
            <span className="w-20 text-[9px] text-rose-600 dark:text-rose-400 font-mono font-bold text-right">12분 30초</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-14 text-[9px] text-slate-500 dark:text-slate-400 font-medium">선택 빌드</span>
            <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-full" style={{ width: '38.4%' }} />
            </div>
            <span className="w-20 text-[9px] text-emerald-600 dark:text-emerald-400 font-mono font-bold text-right">4분 48초</span>
          </div>
        </div>
      </div>

      {/* Metric 2: 이미지 노출 성공률 */}
      <div className="space-y-1.5">
        <div className="flex justify-between text-[10px] font-semibold text-slate-700 dark:text-slate-300">
          <span>기프티콘 이미지 노출 성공률 (상세 페이지)</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% 보장</span>
        </div>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="w-14 text-[9px] text-slate-500 dark:text-slate-400 font-medium">일반 조회</span>
            <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-rose-400 to-rose-500 h-full rounded-full" style={{ width: '92.5%' }} />
            </div>
            <span className="w-20 text-[9px] text-rose-600 dark:text-rose-400 font-mono font-bold text-right">92.5% (에러)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-14 text-[9px] text-slate-500 dark:text-slate-400 font-medium">폴백 적용</span>
            <div className="flex-1 h-3.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
            </div>
            <span className="w-20 text-[9px] text-emerald-600 dark:text-emerald-400 font-mono font-bold text-right">100% 노출</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PdfPortfolio() {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [currentAppId, setCurrentAppId] = useState<string | null>(null)
  const [leftTab, setLeftTab] = useState<"info" | "edit">("info")
  const [saved, setSaved] = useState(false)

  const previewContainerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.8)

  // Load from localStorage on mount
  useEffect(() => {
    const loaded = loadApplications()
    setApplications(loaded)
    if (loaded.length > 0) setCurrentAppId(loaded[0].id)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (previewContainerRef.current) {
        const width = previewContainerRef.current.getBoundingClientRect().width
        const targetWidth = Math.max(width - 4, 300)
        setScale(targetWidth / 1122.5)
      }
    }
    const observer = new ResizeObserver(handleResize)
    if (previewContainerRef.current) observer.observe(previewContainerRef.current)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => { observer.disconnect(); window.removeEventListener("resize", handleResize) }
  }, [])

  const currentApp = applications.find(a => a.id === currentAppId) ?? null
  const customization: Customization = currentApp?.customization ?? DEFAULT_CUSTOMIZATION
  const activeSlides = customization.activeSlides

  const updateApplications = (updated: JobApplication[]) => {
    setApplications(updated)
    saveApplicationsToStorage(updated)
  }

  const createNewApplication = () => {
    const newApp: JobApplication = {
      id: generateId(),
      company: "",
      position: "",
      jobDescription: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      customization: { ...DEFAULT_CUSTOMIZATION, activeSlides: { ...DEFAULT_CUSTOMIZATION.activeSlides } },
    }
    const updated = [newApp, ...applications]
    updateApplications(updated)
    setCurrentAppId(newApp.id)
    setLeftTab("info")
  }

  const deleteApplication = (id: string) => {
    const updated = applications.filter(a => a.id !== id)
    updateApplications(updated)
    if (currentAppId === id) setCurrentAppId(updated[0]?.id ?? null)
  }

  const updateCurrentApp = (patch: Partial<JobApplication>) => {
    if (!currentAppId) return
    const updated = applications.map(a =>
      a.id === currentAppId ? { ...a, ...patch, updatedAt: new Date().toISOString() } : a
    )
    updateApplications(updated)
  }

  const updateCustomization = (patch: Partial<Customization>) => {
    if (!currentApp) return
    updateCurrentApp({ customization: { ...currentApp.customization, ...patch } })
  }

  const handleSave = () => {
    if (!currentAppId) return
    const updated = applications.map(a =>
      a.id === currentAppId ? { ...a, updatedAt: new Date().toISOString() } : a
    )
    updateApplications(updated)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") window.print()
  }

  // Cover & Profile Slide Component
  const CoverSlide = ({ custom }: { custom: Customization }) => {
    return (
      <div className="w-full h-full flex flex-col justify-between text-slate-800 dark:text-slate-100">
        {/* Slide Header */}
        <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Portfolio Cover & Profile</span>
          </div>
          <span className="text-xs text-muted-foreground font-mono">PARK HYEONG JU</span>
        </div>

        {/* Slide Body */}
        <div className="grid grid-cols-12 gap-8 my-auto items-center">
          <div className="col-span-8 space-y-6">
            <div className="inline-block px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50">
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wide uppercase">{custom.coverTitle}</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {custom.coverSlogan}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {custom.coverIntro}
              </p>
            </div>

            {/* Fact list */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Education & Experience</p>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium">
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    부산대학교 정보컴퓨터공학과 졸업 (2025.08)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    SSAFY 14기 Java 전공 트랙 수료 (2026.06)
                  </li>
                </ul>
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Certifications & Awards</p>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium">
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    정보처리기사 / SQLD 자격 보유
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    SSAFY 14기 공통 프로젝트 우수상 (CONY)
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-span-4 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl space-y-4">
            <div className="relative h-20 w-20 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 shadow-md">
              <Image src="/profile.jpg" alt="박형주" fill className="object-cover" />
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">박형주 (Park Hyeong-ju)</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Backend Software Engineer</p>
            </div>
            <div className="w-full pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs text-slate-600 dark:text-slate-400 font-medium">
              <div className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                <span>hju00forwork@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Github className="h-3.5 w-3.5 text-slate-700 dark:text-slate-300 shrink-0" />
                <a href="https://github.com/hju00" target="_blank" className="hover:underline text-blue-600 dark:text-blue-400 font-bold">github.com/hju00</a>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                <a href="https://hju00.github.io" target="_blank" className="hover:underline text-blue-600 dark:text-blue-400 font-bold">hju00.github.io</a>
              </div>
            </div>
          </div>
        </div>

        {/* Slide Footer */}
        <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t pt-2 border-slate-200 dark:border-slate-800 font-mono">
          <span>IT Portfolio - Slide 1/6</span>
          <span>Cover & Profile</span>
        </div>
      </div>
    )
  }

  // New Slide 2: Core Skills & Competencies Slide
  const SkillsSlide = ({ custom: _custom }: { custom: Customization }) => {
    return (
      <div className="w-full h-full flex flex-col justify-between text-slate-800 dark:text-slate-100">
        {/* Slide Header */}
        <div className="flex items-center justify-between border-b pb-4 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              CORE SKILLS: 백엔드 핵심 역량 및 기술 스택
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-mono">PARK HYEONG JU</span>
        </div>

        {/* Slide Body */}
        <div className="grid grid-cols-2 gap-3.5 flex-1 my-2 items-stretch">
          {/* Card 1: Backend Engineering */}
          <div className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900 bg-blue-50/10 flex flex-col">
            <div className="flex items-center gap-2 mb-2.5">
              <Cpu className="h-4.5 w-4.5 text-blue-600" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Backend Engineering</h3>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">Java</span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">Spring Boot</span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">Spring Security</span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">JPA/Hibernate</span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">QueryDSL</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300 text-xs font-semibold leading-relaxed">
                <li>Spring Boot & Java 기반의 안정적이고 테스트 가능한 비즈니스 API 설계 및 웹 애플리케이션 개발</li>
                <li>JPA 영속성 컨텍스트 생명주기 및 N+1 쿼리 최적화, QueryDSL을 활용한 다차원 동적 쿼리 구현</li>
                <li>Spring Security 기반의 사용자 인증/인가 흐름 제어 및 커스텀 필터 체인을 통한 API 보안 강화</li>
              </ul>
            </div>
          </div>

          {/* Card 2: Database & Caching */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="flex items-center gap-2 mb-2.5">
              <Database className="h-4.5 w-4.5 text-blue-600" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Database & Caching</h3>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">MySQL</span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">Redis</span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">RabbitMQ</span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">CouchDB</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300 text-xs font-semibold leading-relaxed">
                <li>데이터베이스 정규화 및 트랜잭션 격리 수준 조정을 통한 동시성 데이터 무결성 보장</li>
                <li>Redis 캐싱 및 분산 락(Redisson)을 활용하여 초당 고빈도 분산 이체 트랜잭션 동시성 격리</li>
                <li>RabbitMQ 메시지 큐를 통한 비동기 이벤트 격리 및 신뢰성 보장 (Manual ACK, Dead Letter Queue)</li>
              </ul>
            </div>
          </div>

          {/* Card 3: Cloud & DevOps */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="flex items-center gap-2 mb-2.5">
              <Layers className="h-4.5 w-4.5 text-blue-600" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Infrastructure & DevOps</h3>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">AWS (EC2, S3, RDS)</span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">Docker</span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">Jenkins</span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">Nginx</span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">GitHub Actions</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300 text-xs font-semibold leading-relaxed">
                <li>Docker 컨테이너 가상화를 통한 다중 마이크로서비스 서비스 격리 및 이식성 확보</li>
                <li>Jenkins 변경 changeset 감지 기반 선택적 서브 빌드 파이프라인 설계로 빌드 속도 60% 단축</li>
                <li>Nginx 리버스 프록시 및 로드 밸런싱 세팅, 무중단 자동 롤링/배포 아키텍처 환경 구축</li>
              </ul>
            </div>
          </div>

          {/* Card 4: Languages & Frontend */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-col">
            <div className="flex items-center gap-2 mb-2.5">
              <Code className="h-4.5 w-4.5 text-blue-600" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Other Tech Skills</h3>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">Go</span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">Python</span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">TypeScript</span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">Vue.js</span>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-xs font-bold rounded">React/Next.js</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300 text-xs font-semibold leading-relaxed">
                <li>Go 및 Python 언어 문법 이해를 바탕으로 한 시스템 스크립트 작성 및 대량 크롤링 구현</li>
                <li>TypeScript 기반의 Vue.js 및 React 프레임워크 핵심 개념 이해 및 프론트 개발 협업 가능</li>
                <li>Git 버전 제어(Branch 전략 설정) 및 다양한 이슈 트래킹 협업 툴(Jira, Notion, Slack) 사용 숙련</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Slide Footer */}
        <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t pt-2 border-slate-200 dark:border-slate-800 font-mono">
          <span>IT Portfolio - Slide 2/6</span>
          <span>Core Technology Stack & Competencies</span>
        </div>
      </div>
    );
  };

  // Slide 3: ANVI (온디바이스 AI 온라인 시험 감독 솔루션 - 1장 압축)
  const AnviSlide = ({ custom }: { custom: Customization }) => {
    
    return (
      <div className="w-full h-full flex flex-col justify-between text-slate-800 dark:text-slate-100">
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              PROJECT 1: ANVI (온디바이스 AI 온라인 시험 감독 솔루션)
            </span>
          </div>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">
            {custom.anviRole}
          </span>
        </div>

        {/* 최상단 요약 */}
        <div className="my-2.5 p-3 bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-md">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
            {custom.anviSummary}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-3.5 flex-1 my-2.5 items-stretch">
          {/* Card 1: 서비스 개요 & 주요 기능 */}
          <div className="col-span-6 flex flex-col p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Briefcase className="h-4 w-4 text-blue-600 shrink-0" />
              <span className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">서비스 개요 및 핵심 기능</span>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                비대면 시험 환경에서 웹캠/카메라로 스마트폰, 이어폰 등 부정행위 유도 객체를 탐지하고 실시간 의심 행동을 분석하여 공정한 평가를 보장하는 온디바이스 솔루션입니다.
              </p>
              <div className="space-y-1">
                <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200">• 주요 기능:</p>
                <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 pl-3.5 list-disc font-medium">
                  <li><strong>실시간 다중 객체 탐지</strong>: 스마트폰, 이어폰, 책 등 1차 감지</li>
                  <li><strong>얼굴 대조 본인 인증</strong>: 신분증과 실시간 얼굴 대조 본인 확인</li>
                  <li><strong>프라이버시 비식별화</strong>: 얼굴 외 주변 환경 실시간 블러 처리</li>
                </ul>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-1">
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold">LiteRT (TFLite)</span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold">Gemma 2B/4B VLM</span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold">YOLO v8</span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold">Android/Kotlin</span>
            </div>
          </div>

          {/* Card 2: 계층형 AI 파이프라인 & 상태 머신 */}
          <div className="col-span-6 flex flex-col p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Cpu className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">계층형 AI 파이프라인 & 상태 머신</span>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <strong>[리소스 제약]</strong> 기기 리소스 제약 하에 고부하 Gemma VLM을 프레임별로 연속 호출 시, 1분 이내 극심한 발열과 배터리 방전으로 기기가 강제 다운되는 결함 발생.
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <strong>[상태 머신 제어]</strong> 매 프레임 연산은 가벼운 YOLO 모델로 1차 고속 스캔하고, 3초 이상 누적 감지되어 조건이 만족된 상태에만 <strong>상태 머신(State Machine)</strong>이 최종 VLM 분석을 가동하도록 제어하여 불필요한 VLM 연산을 완벽히 차단하고 구동 시간을 120배 이상 극대화.
              </p>
            </div>
          </div>

          {/* Card 3: 인프라 제약 및 아키텍처 트레이드오프 */}
          <div className="col-span-6 flex flex-col p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
            <div className="flex items-center gap-1.5 mb-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
              <span className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">인프라 제약 및 아키텍처 트레이드오프</span>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <strong>[클라우드 vs 온디바이스]</strong> 클라우드 기반 VLM(정확도 96%) 호출 시 가장 높은 정밀도를 보장하나, 500명 동시 응시 조건에서 발생하는 월 약 1,500만 원의 GPU 비용 및 개인정보보호법 유출 리스크 수반.
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <strong>[의사결정]</strong> 온디바이스 VLM은 경량화로 인해 정확도가 4%p 낮지만, 3초 통계 검증으로 하락폭을 보완하고 서버 비용 0원 및 개인정보 안전 100%를 달성하는 엣지 아키텍처가 비즈니스 가치 극대화에 가장 타당하다고 판단.
              </p>
            </div>
          </div>

          {/* Card 4: 성능 및 효율성 정량 검증 */}
          <div className="col-span-6 flex flex-col p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Sparkles className="h-4 w-4 text-blue-600 shrink-0" />
              <span className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">성능 및 효율성 정량 검증</span>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 w-full">
                <AnviPerformanceChart />
              </div>
              <p className="text-[11px] text-slate-500 text-center font-bold mt-2">
                배터리 연속 구동 가능 시간 120배 이상 극대화 및 GPU 인프라 서버 비용 0원 달성
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t pt-2 border-slate-200 dark:border-slate-800 font-mono">
          <span>IT Portfolio - Slide 3/6</span>
          <span>ANVI: Cost & Resource Optimization</span>
        </div>
      </div>
    )
  }

  // Slide 4: Donttaz (분산 락 기반 동시성 제어 및 가상 금고 이체 플랫폼 - 1장 압축)
  const DonttazSlide = ({ custom }: { custom: Customization }) => {
    return (
      <div className="w-full h-full flex flex-col justify-between text-slate-800 dark:text-slate-100">
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              PROJECT 2: Donttaz (분산 락 기반 동시성 제어 및 가상 금고 이체 플랫폼)
            </span>
          </div>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">
            {custom.donttazRole}
          </span>
        </div>

        {/* 최상단 요약 */}
        <div className="my-2.5 p-3 bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-md">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
            {custom.donttazSummary}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-3.5 flex-1 my-2.5 items-stretch">
          {/* Card 1: 서비스 개요 및 주요 기능 */}
          <div className="col-span-6 flex flex-col p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Briefcase className="h-4 w-4 text-blue-600 shrink-0" />
              <span className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">서비스 개요 및 핵심 기능</span>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                금융 규제 제약 조건을 우회하며, 유저의 목적별 분산 가상 저축 금고를 무제한 제공하고 정확성 높은 동시 이체 예약을 보장해 주는 핀테크 이체 및 자산 보호 플랫폼입니다.
              </p>
              <div className="space-y-1">
                <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200">• 주요 기능:</p>
                <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 pl-3.5 list-disc font-medium">
                  <li><strong>가상 금고 논리 분할</strong>: 20일 개설 제한 규제를 우회한 논리적 계좌 무제한 획득</li>
                  <li><strong>동시 예약 이체 실행</strong>: 지정 시각 대용량 예약 송금 벌크 트랙킹 처리</li>
                  <li><strong>RabbitMQ 비동기 격리</strong>: 이체 트랜잭션과 알림(FCM, Webhook) 스레드 분리</li>
                </ul>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-1">
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold">Spring Boot</span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold">Redis / Redisson</span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold">RabbitMQ</span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold">MySQL / JPA</span>
            </div>
          </div>

          {/* Card 2: DB 커넥션 보호 (Redis 분산 락) */}
          <div className="col-span-6 flex flex-col p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Database className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">DB 커넥션 보호 & Redis 분산 락</span>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <strong>[데이터 레이스]</strong> 급여일 대량 동시 이체 발생 시 모계좌 잔액의 레이스 컨디션을 방지하기 위해 데이터베이스 레코드 비관적 락(Pessimistic Lock)을 사용할 경우, 대기 트랜잭션의 DB 커넥션 풀 과점으로 WAS가 마비되는 심각한 가용성 병목이 생깁니다.
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <strong>[분산 락 격리]</strong> Redis 메모리 레벨에서 Redisson pub/sub 구조 분산 락을 통해 락 범위를 계좌 단위로 격리하고, 지수 백오프 기반 재시도 구조를 공통 애스펙트(Spring AOP)로 분리해 WAS 병목을 차단하고 100% 무결성을 확보했습니다.
              </p>
            </div>
          </div>

          {/* Card 3: 메시지 격리 & 비즈니스 규제 회피 */}
          <div className="col-span-6 flex flex-col p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
            <div className="flex items-center gap-1.5 mb-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
              <span className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">메시지 격리 & 비즈니스 규제 회피</span>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <strong>[비동기 격리]</strong> 외부 푸시 알림 FCM 및 웹훅 통신 지연이 이체 메인 트랙을 점유하지 않도록, 이체 성공 즉시 DB 커넥션을 반환하고 알림 처리는 RabbitMQ로 발행하여 비동기 격리했습니다. 실패 건은 Manual ACK와 DLQ로 우회해 유실을 방지했습니다.
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <strong>[규제 회피]</strong> 금융권의 20일 다수계좌 개설 제한 규제로 인해 목적별 통장을 개설하기 힘든 문제를 우회하기 위해, 실제 1개의 계좌 하위에 논리적으로 가상 금고(Wish Table)를 무제한 분할 매핑하는 구조를 통해 가입 즉시 목적별 금고 개설을 지원했습니다.
              </p>
            </div>
          </div>

          {/* Card 4: 동시성 처리 성능 검증 */}
          <div className="col-span-6 flex flex-col p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Sparkles className="h-4 w-4 text-blue-600 shrink-0" />
              <span className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">동시성 처리 성능 검증</span>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 w-full">
                <DonttazPerformanceChart />
              </div>
              <p className="text-[11px] text-slate-500 text-center font-bold mt-2">
                동시 이체 요청 피크 타임대 트랜잭션 대기 시간 65% 이상 개선
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t pt-2 border-slate-200 dark:border-slate-800 font-mono">
          <span>IT Portfolio - Slide 4/6</span>
          <span>Donttaz: Transaction & Message Reliability</span>
        </div>
      </div>
    )
  }

  // Slide 5: CONY (선택적 빌드 CI/CD 최적화 및 이미지 폴백 커머스 플랫폼)
  const ConySlide = ({ custom }: { custom: Customization }) => {
    return (
      <div className="w-full h-full flex flex-col justify-between text-slate-800 dark:text-slate-100">
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              PROJECT 3: CONY (기프티콘 안전 거래 관리 플랫폼)
            </span>
          </div>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">
            {custom.conyRole}
          </span>
        </div>

        {/* 최상단 요약 */}
        <div className="my-2.5 p-3 bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-md">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
            {custom.conySummary}
          </p>
        </div>

        <div className="grid grid-cols-12 gap-3.5 flex-1 my-2.5 items-stretch">
          {/* Card 1: 서비스 개요 및 주요 기능 */}
          <div className="col-span-6 flex flex-col p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Briefcase className="h-4 w-4 text-blue-600 shrink-0" />
              <span className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">서비스 개요 및 핵심 기능</span>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-semibold">
                C2C 기반 모바일 기프티콘 이미지의 유효 바코드를 안전하게 자동 스캔 판독하고, 회원 간 직거래 중개 및 에스크로 기반 정산 관리 흐름을 처리하는 커머스 플랫폼입니다.
              </p>
              <div className="space-y-1">
                <p className="text-xs font-extrabold text-slate-800 dark:text-slate-200">• 주요 기능:</p>
                <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 pl-3.5 list-disc font-medium">
                  <li><strong>바코드 이미지 판독</strong>: 업로드된 기프티콘 이미지 고속 자동 분석</li>
                  <li><strong>직거래 매칭 및 안전 정산</strong>: 판매금 에스크로 보호 및 거래 정산 자동화</li>
                  <li><strong>다중 서비스 배포 파이프라인</strong>: MSA 독립 빌드 및 서비스 격리 배포</li>
                </ul>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-1">
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold">Jenkins Pipeline</span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold">Docker Container</span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold">Nginx</span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-mono font-bold">Spring Boot / MySQL</span>
            </div>
          </div>

          {/* Card 2: 선택적 CI/CD 빌드 최적화 */}
          <div className="col-span-6 flex flex-col p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
            <div className="flex items-center gap-1.5 mb-2.5">
              <RefreshCw className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">선택적 CI/CD 빌드 최적화</span>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <strong>[배포 병목]</strong> 기프티콘 거래소는 배포 주기 및 핫픽스 민첩성이 매출에 큰 영향을 미치는 도메인이나, 작은 서비스 코드 수정에도 매번 변경되지 않은 전체 모듈 컨테이너 이미지를 전체 빌드/배포하여 12.5분 이상의 불필요한 배포 대기 시간이 소요되었습니다.
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <strong>[빌드 최적화]</strong> Jenkins 파이프라인에서 Git changeset 스캔 플러그인을 활용해 실제 변경 파일의 디렉토리를 식별하고, 해당 타겟 서비스 모듈만 Docker 빌드 및 배포되도록 분기 파이프라인을 구축하여 CI/CD 소요 시간을 60% 이상 대폭 단축했습니다.
              </p>
            </div>
          </div>

          {/* Card 3: 2단계 이미지 폴백 아키텍처 */}
          <div className="col-span-6 flex flex-col p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
            <div className="flex items-center gap-1.5 mb-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
              <span className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">2단계 이미지 폴백 아키텍처</span>
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <strong>[썸네일 장애]</strong> 기프티콘 판독 지연에 의해 생성되지 않은 썸네일 경로가 `null`로 반환될 때 프론트엔드 UI 화면 깨짐 현상과 상품 구매 페이지의 사용자 즉시 이탈 장벽이 유발되어 큰 매출 손실을 겪었습니다.
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                <strong>[폴백 조회]</strong> 프론트엔드의 방어 코드 작성에 머무르지 않고, JPA Specification을 연동한 백엔드 조회 쿼리 레벨에서 1단계로 썸네일을 스캔한 뒤, 없을 경우 2단계로 업로드 원본(Original) 이미지 경로를 automatic 맵핑 결합해 반환하는 조회 아키텍처를 구현해 실패율을 0%로 해결했습니다.
              </p>
            </div>
          </div>

          {/* Card 4: 빌드 배포 성능 검증 */}
          <div className="col-span-6 flex flex-col p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20">
            <div className="flex items-center gap-1.5 mb-2.5">
              <Sparkles className="h-4 w-4 text-blue-600 shrink-0" />
              <span className="text-sm font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">빌드 배포 성능 검증</span>
            </div>
            <div className="flex-1 flex flex-col">
              <div className="flex-1 w-full">
                <ConyBuildTimeChart />
              </div>
              <p className="text-[11px] text-slate-500 text-center font-bold mt-2">
                Changeset 기반 선택적 빌드를 통해 전체 소요 시간 60% 이상 단축
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t pt-2 border-slate-200 dark:border-slate-800 font-mono">
          <span>IT Portfolio - Slide 5/6</span>
          <span>CONY: Selective CI/CD & Caching Fallback</span>
        </div>
      </div>
    )
  }

  // Slide 6: 기타 이력 및 자격/활동 (Secondary Projects & Certifications)
  const SecondarySlide = ({ custom: _custom }: { custom: Customization }) => {
    return (
      <div className="w-full h-full flex flex-col justify-between text-slate-800 dark:text-slate-100">
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">PROJECTS & CERTIFICATIONS SUMMARY</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground">Other Experience & Qualifications</span>
        </div>

        <div className="grid grid-cols-12 gap-6 my-auto">
          {/* 기타 프로젝트 */}
          <div className="col-span-7 space-y-4">
            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
              <Layers2 className="h-4 w-4 text-blue-600" />
              <h3>기타 프로젝트 경험</h3>
            </div>

            <div className="space-y-3.5">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">SsaveryTime (사내 완전 익명 커뮤니티 플랫폼, 2인)</h4>
                  <span className="text-[10px] text-slate-500 font-mono">2025.11 - 2025.12</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  - <strong>비즈니스 목적</strong>: 사내 익명 보장성 신뢰도를 극대화하여 활발한 소통 환경 구축<br />
                  - <strong>구현 성과</strong>: DB 관리자도 작성자를 역추적할 수 없도록, 식별 해시(Salt+SHA-256) 단방향 해싱 익명 검증 알고리즘을 설계하여 소유권 검증 처리.<br />
                  - <strong>문제 해결</strong>: WAS 포워딩 에러 시 발생하는 403 Forbidden 오류의 원인이 보안 설정이 아닌 DB 볼륨 마운트 스키마 불일치였음을 Security 디버그 로그 활성화를 통해 파악하여 정상 복구.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">Hyperledger Fabric 허가형 데이터 수집 플랫폼 (3인)</h4>
                  <span className="text-[10px] text-slate-500 font-mono">2024.04 - 2024.10</span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  - <strong>비즈니스 목적</strong>: 무분별한 스팸 데이터 축적 방지 및 인가된 노드 간 불변 투명성 확보<br />
                  - <strong>구현 성과</strong>: 백엔드 아키텍처 리드로서, 관계형 데이터베이스(MySQL)와 도큐먼트 DB(CouchDB), 블록체인 원장 상태 기록을 나눈 분리된 <strong>3-Tier 분산 스토리지 아키텍처</strong>를 직접 설계하여 대량 트랜잭션 읽기/쓰기 성능 속도의 병목을 최적화.
                </p>
              </div>
            </div>
          </div>

          {/* 자격 및 교육 활동 */}
          <div className="col-span-5 space-y-4">
            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
              <Award className="h-4 w-4 text-blue-600" />
              <h3>자격 및 활동 요약 (가볍게 요약)</h3>
            </div>

            <div className="space-y-3.5">
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 uppercase">학습 및 활동 (Education)</h4>
                <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1.5 font-medium">
                  <li>
                    <strong>SSAFY 14기 (삼성청년SW아카데미)</strong><br />
                    - Java 전공 트랙 수료 (2025.07 ~ 2026.06)<br />
                    - 총 1,600시간의 프로젝트 중심 실무 협업 학습
                  </li>
                  <li>
                    <strong>부산대학교 정보컴퓨터공학과 졸업</strong><br />
                    - 공학사 학위 취득 (2025.08)
                  </li>
                </ul>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg">
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 uppercase">자격 및 수상 (Certs & Awards)</h4>
                <ul className="text-[11px] text-slate-600 dark:text-slate-400 space-y-1 font-medium">
                  <li className="flex items-center justify-between">
                    <span>• 정보처리기사</span>
                    <span className="text-[10px] text-slate-400">2025.06 취득</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>• SQLD (SQL 개발자)</span>
                    <span className="text-[10px] text-slate-400">2025.04 취득</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span>• SSAFY 공통 프로젝트 우수상</span>
                    <span className="text-[10px] text-slate-400">2026.02 수상</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t pt-2 border-slate-200 dark:border-slate-800 font-mono">
          <span>IT Portfolio - Slide 6/6</span>
          <span>Education & Qualification Final</span>
        </div>
      </div>
    )
  }

  // Master Slide list to map IDs to components and titles
  const ALL_SLIDES_MAP: Record<string, { title: string; category: string; component: (props: { custom: Customization }) => React.JSX.Element }> = {
    cover: { title: "표지 및 프로필 (Cover & Profile)", category: "기본 정보", component: CoverSlide },
    skills: { title: "핵심 기술 및 역량 (Core Skills)", category: "기본 정보", component: SkillsSlide },
    anvi: { title: "ANVI (온디바이스 AI 온라인 시험 감독)", category: "핵심 프로젝트", component: AnviSlide },
    donttaz: { title: "Donttaz (분산 락 동시성 제어 및 이체)", category: "핵심 프로젝트", component: DonttazSlide },
    cony: { title: "CONY (선택적 빌드 CI/CD & 이미지 폴백)", category: "주요 프로젝트", component: ConySlide },
    secondary: { title: "기타 프로젝트 & 학력/자격/활동 요약", category: "기타 사항", component: SecondarySlide },
  }

  return (
    <div className="min-h-screen pt-14 bg-slate-900 text-slate-100 flex flex-col antialiased">
      {/* Dynamic Styling to enforce printing parameters */}
      <style dangerouslySetInnerHTML={{ __html: `
        /* General styles for both screen and print to ensure 100% layout fidelity */
        .slide-wrapper {
          width: 100%;
          position: relative;
          background: transparent;
          overflow: hidden;
          border-radius: 0.75rem;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        }
        .slide-page {
          width: 297mm !important;
          height: 210mm !important;
          padding: 12mm 16mm !important;
          box-sizing: border-box !important;
          position: absolute;
          top: 0;
          left: 0;
          transform-origin: top left;
          background: white !important;
          color: #1e293b !important;
          display: flex !important;
          flex-direction: column !important;
          justify-content: space-between !important;
        }

        /* Force light mode styles on slide pages even if site-wide dark mode is active */
        .dark .slide-page {
          background-color: white !important;
          color: #1e293b !important;
          --background: oklch(0.98 0.001 270) !important;
          --foreground: oklch(0.2 0.02 270) !important;
          --card: oklch(1 0 0) !important;
          --card-foreground: oklch(0.2 0.02 270) !important;
          --muted: oklch(0.92 0.01 0) !important;
          --muted-foreground: oklch(0.5 0.01 0) !important;
          --border: oklch(0.93 0.002 270) !important;
          --input: oklch(0.93 0.002 270) !important;
        }
        .dark .slide-page [class*="dark:text-white"],
        .dark .slide-page [class*="dark:text-slate-100"],
        .dark .slide-page [class*="dark:text-slate-200"],
        .dark .slide-page [class*="dark:text-slate-300"],
        .dark .slide-page [class*="dark:text-slate-400"] {
          color: #1e293b !important;
        }
        .dark .slide-page [class*="dark:text-slate-500"],
        .dark .slide-page [class*="dark:text-slate-600"],
        .dark .slide-page [class*="dark:text-slate-700"] {
          color: #475569 !important;
        }
        .dark .slide-page [class*="dark:text-blue-400"],
        .dark .slide-page [class*="dark:text-blue-300"] {
          color: #2563eb !important;
        }
        .dark .slide-page [class*="dark:text-emerald-400"],
        .dark .slide-page [class*="dark:text-emerald-300"] {
          color: #059669 !important;
        }
        .dark .slide-page [class*="dark:bg-slate-900"],
        .dark .slide-page [class*="dark:bg-slate-800"],
        .dark .slide-page [class*="dark:bg-slate-950"] {
          background-color: #f1f5f9 !important;
          color: #334155 !important;
        }
        .dark .slide-page [class*="dark:bg-blue-950"] {
          background-color: rgba(239, 246, 255, 0.5) !important;
        }
        .dark .slide-page [class*="dark:bg-emerald-950"] {
          background-color: rgba(236, 253, 245, 0.5) !important;
        }
        .dark .slide-page [class*="dark:border-slate-"] {
          border-color: #e2e8f0 !important;
        }
        .dark .slide-page [class*="dark:border-blue-"] {
          border-color: #bfdbfe !important;
        }

        /* Scale up font-sizes inside slide-page to enhance readability and fill the page */
        .slide-page .text-\[9px\] { font-size: 13px !important; line-height: 17px !important; }
        .slide-page .text-\[10px\] { font-size: 14px !important; line-height: 19px !important; }
        .slide-page .text-\[11px\] { font-size: 15px !important; line-height: 21px !important; }
        .slide-page .text-xs { font-size: 16px !important; line-height: 22px !important; }
        .slide-page .text-sm { font-size: 18px !important; line-height: 25px !important; }
        .slide-page .text-base { font-size: 20px !important; line-height: 28px !important; }
        .slide-page .text-lg { font-size: 22px !important; line-height: 30px !important; }
        .slide-page .text-xl { font-size: 25px !important; line-height: 33px !important; }
        .slide-page .text-2xl { font-size: 30px !important; line-height: 38px !important; }
        .slide-page .text-3xl { font-size: 36px !important; line-height: 46px !important; }

        @media print {
          @page {
            size: landscape;
            margin: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          body {
            background: white !important;
            color: black !important;
            margin: 0 !important;
            padding: 0 !important;
          }
          /* Reset parent layout wrappers for printing */
          div.min-h-screen {
            padding-top: 0 !important;
            min-height: auto !important;
            background: transparent !important;
          }
          .slide-container, .slides-preview-container {
            display: block !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            background: transparent !important;
            min-height: auto !important;
          }
          .slide-wrapper {
            height: auto !important;
            overflow: visible !important;
            display: block !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          .slide-page {
            position: relative !important;
            transform: none !important;
            page-break-after: always !important;
            page-break-inside: avoid !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 !important;
          }
          .slide-page:last-child, .slide-page:last-of-type {
            page-break-after: avoid !important;
          }
          /* Fix layout colors during printing to preserve visibility */
          .text-slate-800 { color: #1e293b !important; }
          .text-slate-700 { color: #334155 !important; }
          .text-slate-600 { color: #475569 !important; }
          .text-slate-500 { color: #64748b !important; }
          .bg-slate-50 { background-color: #f8fafc !important; }
          .bg-slate-50\\/50 { background-color: rgba(248, 250, 252, 0.5) !important; }
          .bg-blue-50 { background-color: #eff6ff !important; }
          .bg-blue-50\\/50 { background-color: rgba(239, 246, 255, 0.5) !important; }
          .bg-emerald-50\\/30 { background-color: rgba(236, 253, 245, 0.3) !important; }
          .border-slate-200 { border-color: #e2e8f0 !important; }
          .border-slate-100 { border-color: #f1f5f9 !important; }
          .border-blue-200 { border-color: #bfdbfe !important; }
          .border-emerald-200 { border-color: #a7f3d0 !important; }
          .text-blue-600 { color: #2563eb !important; }
          .text-emerald-600 { color: #059669 !important; }
          .text-emerald-800 { color: #065f46 !important; }
          .text-rose-600 { color: #e11d48 !important; }
          .text-rose-500 { color: #f43f5e !important; }
          .text-amber-500 { color: #d97706 !important; }
        }
      ` }} />

      {/* GNB / Top Control Toolbar (no-print) */}
      <header className="no-print sticky top-14 z-40 w-full bg-slate-950/80 backdrop-blur border-b border-slate-800 px-6 py-3 flex justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-base font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              맞춤 포트폴리오 빌더
            </h1>
            <p className="text-[11px] text-slate-400">
              {currentApp
                ? `${currentApp.company || "(회사명 없음)"} · ${currentApp.position || "(직무 없음)"}`
                : "지원 공고를 추가하고 포트폴리오 내용을 맞춤 편집하세요"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 text-white font-bold text-xs px-3 py-2 rounded-lg border transition-all ${
              saved
                ? "bg-emerald-700 border-emerald-600"
                : "bg-slate-800 border-slate-700 hover:bg-slate-700"
            }`}
          >
            <Check className="h-3.5 w-3.5" />
            {saved ? "저장됨" : "저장"}
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-4 py-2 rounded-lg shadow-md transition-all"
          >
            <Printer className="h-4 w-4" />
            PDF 출력 (Ctrl+P)
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto px-4 py-6 grid grid-cols-12 gap-5 slide-container">

        {/* Left Panel: Job Management + Editor (no-print) */}
        <section className="no-print col-span-12 lg:col-span-4 flex flex-col gap-4">

          {/* Applications List */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-extrabold text-slate-300 uppercase tracking-wider">지원 목록</span>
              <button
                onClick={createNewApplication}
                className="px-2.5 py-1 text-[11px] font-bold bg-blue-600 hover:bg-blue-500 text-white rounded transition"
              >
                + 새 지원
              </button>
            </div>
            {applications.length === 0 ? (
              <div className="px-4 py-6 text-center">
                <p className="text-xs text-slate-500">저장된 지원 내역이 없습니다.</p>
                <button onClick={createNewApplication} className="mt-2 text-xs text-blue-400 hover:text-blue-300 font-bold">
                  첫 지원 만들기 →
                </button>
              </div>
            ) : (
              <div className="max-h-44 overflow-y-auto divide-y divide-slate-800/60">
                {applications.map(app => (
                  <button
                    key={app.id}
                    onClick={() => setCurrentAppId(app.id)}
                    className={`w-full px-4 py-3 text-left flex items-center justify-between hover:bg-slate-900 transition ${
                      currentAppId === app.id ? "bg-slate-900 border-l-2 border-blue-500" : ""
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-200 truncate">{app.company || "(회사명 없음)"}</p>
                      <p className="text-[10px] text-slate-500 truncate">{app.position || "(직무 없음)"} · {new Date(app.createdAt).toLocaleDateString("ko-KR")}</p>
                    </div>
                    <span
                      onClick={(e) => { e.stopPropagation(); deleteApplication(app.id) }}
                      className="ml-2 text-slate-600 hover:text-rose-400 text-sm font-bold shrink-0 cursor-pointer"
                    >×</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Tab Selector */}
          {currentApp && (
            <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col flex-1">
              <div className="flex border-b border-slate-800">
                <button
                  onClick={() => setLeftTab("info")}
                  className={`flex-1 py-2.5 text-xs font-bold transition ${leftTab === "info" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"}`}
                >
                  지원 정보
                </button>
                <button
                  onClick={() => setLeftTab("edit")}
                  className={`flex-1 py-2.5 text-xs font-bold transition ${leftTab === "edit" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-slate-300"}`}
                >
                  내용 편집
                </button>
              </div>

              <div className="p-4 overflow-y-auto flex-1" style={{ maxHeight: "calc(100vh - 340px)" }}>
                {leftTab === "info" ? (
                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">회사명</label>
                      <input
                        value={currentApp.company}
                        onChange={e => updateCurrentApp({ company: e.target.value })}
                        className="w-full mt-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                        placeholder="예: 카카오"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">지원 직무</label>
                      <input
                        value={currentApp.position}
                        onChange={e => updateCurrentApp({ position: e.target.value })}
                        className="w-full mt-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                        placeholder="예: 백엔드 개발자"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase">채용 공고 (참고용)</label>
                      <textarea
                        value={currentApp.jobDescription}
                        onChange={e => updateCurrentApp({ jobDescription: e.target.value })}
                        rows={12}
                        className="w-full mt-1 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 resize-none leading-relaxed"
                        placeholder="공고 내용을 붙여넣기하여 참고하면서 포트폴리오를 편집하세요..."
                      />
                    </div>
                    <div className="pt-2 text-[10px] text-slate-500 leading-relaxed space-y-1 border-t border-slate-800">
                      <p className="font-bold text-slate-400">PDF 저장 안내:</p>
                      <p>1. <strong>Ctrl+P</strong> → 대상: <strong>PDF로 저장</strong></p>
                      <p>2. 레이아웃: <strong>가로(Landscape)</strong></p>
                      <p>3. 여백: <strong>없음</strong>, 배경 그래픽: <strong>체크</strong></p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Slide visibility */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">슬라이드 포함 여부</p>
                      {SLIDE_IDS.map(id => {
                        const meta = ALL_SLIDES_MAP[id]
                        if (!meta) return null
                        const isOn = activeSlides[id] ?? true
                        return (
                          <button
                            key={id}
                            onClick={() => updateCustomization({ activeSlides: { ...activeSlides, [id]: !isOn } })}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-left text-xs transition ${
                              isOn ? "bg-slate-900 border-blue-500/40 text-white" : "bg-slate-950/40 border-slate-800 text-slate-500"
                            }`}
                          >
                            {isOn ? <CheckSquare className="h-3.5 w-3.5 text-blue-400 shrink-0" /> : <Square className="h-3.5 w-3.5 shrink-0" />}
                            <span className="font-semibold truncate">{meta.title}</span>
                          </button>
                        )
                      })}
                    </div>

                    {/* Cover */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider">표지 슬라이드</p>
                      <div>
                        <label className="text-[10px] text-slate-400">포트폴리오 제목</label>
                        <input
                          value={customization.coverTitle}
                          onChange={e => updateCustomization({ coverTitle: e.target.value })}
                          className="w-full mt-0.5 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400">슬로건 (h1)</label>
                        <textarea
                          value={customization.coverSlogan}
                          onChange={e => updateCustomization({ coverSlogan: e.target.value })}
                          rows={2}
                          className="w-full mt-0.5 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400">소개 문단</label>
                        <textarea
                          value={customization.coverIntro}
                          onChange={e => updateCustomization({ coverIntro: e.target.value })}
                          rows={3}
                          className="w-full mt-0.5 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
                        />
                      </div>
                    </div>

                    {/* ANVI */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider">ANVI 프로젝트</p>
                      <div>
                        <label className="text-[10px] text-slate-400">역할 배지</label>
                        <input
                          value={customization.anviRole}
                          onChange={e => updateCustomization({ anviRole: e.target.value })}
                          className="w-full mt-0.5 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400">핵심 요약 (파란 박스)</label>
                        <textarea
                          value={customization.anviSummary}
                          onChange={e => updateCustomization({ anviSummary: e.target.value })}
                          rows={4}
                          className="w-full mt-0.5 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
                        />
                      </div>
                    </div>

                    {/* Donttaz */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider">Donttaz 프로젝트</p>
                      <div>
                        <label className="text-[10px] text-slate-400">역할 배지</label>
                        <input
                          value={customization.donttazRole}
                          onChange={e => updateCustomization({ donttazRole: e.target.value })}
                          className="w-full mt-0.5 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400">핵심 요약 (파란 박스)</label>
                        <textarea
                          value={customization.donttazSummary}
                          onChange={e => updateCustomization({ donttazSummary: e.target.value })}
                          rows={4}
                          className="w-full mt-0.5 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
                        />
                      </div>
                    </div>

                    {/* CONY */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-extrabold text-blue-400 uppercase tracking-wider">CONY 프로젝트</p>
                      <div>
                        <label className="text-[10px] text-slate-400">역할 배지</label>
                        <input
                          value={customization.conyRole}
                          onChange={e => updateCustomization({ conyRole: e.target.value })}
                          className="w-full mt-0.5 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400">핵심 요약 (파란 박스)</label>
                        <textarea
                          value={customization.conySummary}
                          onChange={e => updateCustomization({ conySummary: e.target.value })}
                          rows={4}
                          className="w-full mt-0.5 bg-slate-900 border border-slate-700 rounded px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500 resize-none"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* Right: Slides Preview (printable) */}
        <section
          ref={previewContainerRef}
          className="col-span-12 lg:col-span-8 flex flex-col items-center gap-6 pb-20 slides-preview-container"
        >
          {SLIDE_IDS.map((slideId) => {
            const slideMeta = ALL_SLIDES_MAP[slideId]
            if (!slideMeta) return null
            if (!activeSlides[slideId]) return null

            return (
              <div key={slideId} className="slide-wrapper" style={{ height: `${793.7 * scale}px` }}>
                <div
                  className="slide-page border border-slate-200 dark:border-slate-800"
                  style={{ transform: `scale(${scale})`, pageBreakInside: "avoid" }}
                >
                  {slideMeta.component({ custom: customization })}
                </div>
              </div>
            )
          })}
        </section>
      </main>
    </div>
  )
}
