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

// Define Preset types
type PresetVersion = "general" | "ai" | "fintech" | "devops"

interface Slide {
  id: string
  title: string
  category: string
  component: (props: { version: PresetVersion }) => React.JSX.Element
}

export default function PdfPortfolio() {
  const [selectedVersion, setSelectedVersion] = useState<PresetVersion>("general")
  const [activeSlides, setActiveSlides] = useState<Record<string, boolean>>({
    cover: true,
    anvi_1: true,
    anvi_2: true,
    donttaz_1: true,
    donttaz_2: true,
    cony: true,
    secondary: true,
    certs: true,
  })
  const [orderedSlideIds, setOrderedSlideIds] = useState<string[]>([
    "cover",
    "anvi_1",
    "anvi_2",
    "donttaz_1",
    "donttaz_2",
    "cony",
    "secondary",
    "certs",
  ])

  const previewContainerRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.8)

  useEffect(() => {
    const handleResize = () => {
      if (previewContainerRef.current) {
        const width = previewContainerRef.current.getBoundingClientRect().width
        // 297mm is 1122.5px. We subtract 4px of padding/spacing to prevent overflow.
        const targetWidth = Math.max(width - 4, 300)
        setScale(targetWidth / 1122.5)
      }
    }

    const observer = new ResizeObserver(() => {
      handleResize()
    })

    if (previewContainerRef.current) {
      observer.observe(previewContainerRef.current)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Sync slide ordering and selection based on selected preset version
  useEffect(() => {
    let order: string[] = []
    let defaultActive: Record<string, boolean> = {
      cover: true,
      anvi_1: true,
      anvi_2: true,
      donttaz_1: true,
      donttaz_2: true,
      cony: true,
      secondary: true,
      certs: true,
    }

    switch (selectedVersion) {
      case "ai":
        order = ["cover", "anvi_1", "anvi_2", "donttaz_1", "cony", "secondary", "certs"]
        // For AI specific company, we exclude donttaz_2 (distributed lock) to keep it concise, or keep it.
        // Let's keep it but put ANVI slides first
        order = ["cover", "anvi_1", "anvi_2", "donttaz_1", "donttaz_2", "cony", "secondary", "certs"]
        break
      case "fintech":
        // Put Donttaz (Fintech Vault) first
        order = ["cover", "donttaz_1", "donttaz_2", "anvi_1", "anvi_2", "cony", "secondary", "certs"]
        break
      case "devops":
        // Put CONY (CI/CD optimized) first
        order = ["cover", "cony", "donttaz_1", "donttaz_2", "anvi_1", "anvi_2", "secondary", "certs"]
        break
      case "general":
      default:
        order = ["cover", "anvi_1", "anvi_2", "donttaz_1", "donttaz_2", "cony", "secondary", "certs"]
        break
    }

    setOrderedSlideIds(order)
    setActiveSlides(defaultActive)
  }, [selectedVersion])

  const toggleSlide = (id: string) => {
    setActiveSlides((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const selectAll = (val: boolean) => {
    const updated = { ...activeSlides }
    Object.keys(updated).forEach((k) => {
      updated[k] = val
    })
    setActiveSlides(updated)
  }

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  // Cover & Profile Slide Component
  const CoverSlide = ({ version }: { version: PresetVersion }) => {
    const getSlogan = () => {
      switch (version) {
        case "ai":
          return "온디바이스 AI 파이프라인 설계 및 AI 실무 협업 강점의 백엔드 엔지니어"
        case "fintech":
          return "고신뢰성 분산 트랜잭션 제어 및 대규모 금융 정합성 강점의 백엔드 개발자"
        case "devops":
          return "지속 통합(CI/CD) 자동화 및 컨테이너 가상화 인프라 최적화 강점의 백엔드 개발자"
        case "general":
        default:
          return "비즈니스 지표 최적화 및 안정적 분산 아키텍처를 설계하는 백엔드 개발자"
      }
    }

    const getFactualIntro = () => {
      switch (version) {
        case "ai":
          return "모바일 기기 내에서 YOLO와 Gemma VLM을 계층 설계하여 서버 GPU 비용을 0원으로 차단하고, AI 개발 프로세스에 Plan-First Workflow를 도입하여 개발 결함률을 낮추고 민첩성을 확보한 신입 백엔드/AI 엔지니어입니다."
        case "fintech":
          return "Redis 분산 락을 통한 메모리 레벨 동시성 격리와 RabbitMQ Manual-ACK/DLQ 메시지 신뢰성 설계를 적용하여, 트래픽 폭주 상황에서도 비즈니스 금융 데이터의 무결성 100%를 보장하는 신입 백엔드 개발자입니다."
        case "devops":
          return "Jenkins 파이프라인 Changeset 변경 스캔 기반 선택적 서브 빌드를 통해 빌드 병목 속도를 60% 단축하고, Nginx 리버스 프록시 및 컨테이너 격리로 무장애 비즈니스 배포 체계를 다진 신입 백엔드/DevOps 엔지니어입니다."
        case "general":
        default:
          return "학부 정보컴퓨터공학 전공 및 SSAFY 14기 1,600시간의 집중 개발 훈련을 거치며, 대용량 트래픽 동시성 이슈 및 배포 인프라 성능 최적화 과정을 트레이드오프 관점에서 해결해 온 신입 백엔드 개발자 박형주입니다."
      }
    }

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
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wide uppercase">신입 백엔드 개발자 포트폴리오</span>
            </div>
            
            <div className="space-y-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {getSlogan()}
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {getFactualIntro()}
              </p>
            </div>

            {/* Fact list (Career & Core Tech focus) */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1">Education & Experience</p>
                <ul className="text-xs text-slate-700 dark:text-slate-300 space-y-1 font-medium">
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    부산대학교 정보컴퓨터공학 전공 (2025.08 졸업)
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
              <Image
                src="/profile.jpg"
                alt="박형주"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">박형주 (Park Hyeong-ju)</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Backend & DevOps Engineer</p>
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
          <span>IT Portfolio - Slide 1/7</span>
          <span>Targeting: {version.toUpperCase()} Focus</span>
        </div>
      </div>
    )
  }

  // Slide 2: ANVI 1 (개요 & AI 실무 활용)
  const Anvi1Slide = () => {
    return (
      <div className="w-full h-full flex flex-col justify-between text-slate-800 dark:text-slate-100">
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">PROJECT 1: ANVI (온디바이스 AI 온라인 시험 감독 솔루션)</span>
          </div>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">Team Lead / AI & Android</span>
        </div>

        {/* 최상단 요약 규칙 적용: 도메인 + 문제 + 해결 + 결과 */}
        <div className="my-3 p-3 bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-md">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
            온라인 시험 감독 서비스 운영 시 발생하는 <strong>극심한 GPU 서버 비용(500명 동시 응시 시 월 1,500만 원 상당) 및 영상 데이터 유출에 따른 개인정보 규정 위반 리스크</strong>를, 
            <strong>YOLO-Gemma VLM 계층형 온디바이스 AI 파이프라인 설계 및 기기 내 본인인증/비식별 블러 처리</strong>를 도입해 
            <strong>서버 추론 비용 0원 달성 및 응시자 개인정보 리스크 원천 차단</strong>으로 극복하여 B2B 상용 계약의 타당성을 입증했습니다.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-5 my-auto">
          {/* 비즈니스적 맥락 & 기술 선택 이유 */}
          <div className="col-span-6 space-y-3.5">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
                <Briefcase className="h-4 w-4 text-blue-600" />
                <h3>비즈니스 배경 및 기술 선정 이유</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                비대면 시험 솔루션의 B2B 상용화 진입 시 가장 큰 진입 장벽은 <strong>개인정보보호법 준수</strong>와 <strong>인프라 GPU 비용 구조</strong>였습니다. 
                중앙 서버로 수험생 방 내부 영상과 신분증 이미지를 전송할 경우 법적 동의 및 유출 위험성이 증대되어 도입 결정이 지연되는 부작용이 있었습니다.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal mt-2">
                따라서 <strong>LiteRT(TFLite) 기반의 Gemma 4 VLM 및 YOLO 모델</strong>을 채택하여 모든 추론을 사용자 디바이스 내로 한정시킴으로써 보안 규제를 충족하고 서버 비용 리스크를 차단했습니다.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
                <Cpu className="h-4 w-4 text-blue-600" />
                <h3>계층형 온디바이스 AI 파이프라인 설계</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                한정된 기기 리소스 상에서 거대 VLM을 연속 실행하면 1분 이내 발열로 기기가 다운됩니다.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal mt-2">
                이에 따라 가벼운 <strong>YOLO 모델로 매 프레임 객체(휴대폰, 이어폰 등) 1차 필터링</strong>을 수행하고, 
                의심 행동 감지 시 <strong>상태 머신(State Machine)을 거쳐 최종 판별에 한해 VLM 정밀 멀티모달 추론</strong>을 호출하도록 계층화했습니다.
              </p>
            </div>
          </div>

          {/* AI 실무 활용: Plan-First Workflow & Logging Hook */}
          <div className="col-span-6 space-y-3.5 bg-slate-50 dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white border-b pb-1.5 border-slate-200 dark:border-slate-800">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <h3>AI 실무적 협업 및 엔지니어링 활용</h3>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">1. Plan-First Workflow & Human Approval Gate</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  AI 어시스턴트 코드 생성 시 발생하기 쉬운 아키텍처 이탈 및 범위 변경 리스크를 사전에 예방하기 위해, 
                  구현 전 AI에게 <strong>먼저 구체적 개발 계획(Plan)을 세우게 한 뒤 개발자가 정합성을 검증하는 승인 게이트(Approval Gate)</strong>를 두어 
                  작업 범위 이탈률을 0%에 가깝게 통제하며 개발 생산성을 높였습니다.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">2. Prompt & Logging Hook을 통한 오추론 분석 환경 구축</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  온디바이스 VLM 모델의 프롬프트 변화에 따른 추론 일관성을 보장하기 위해, 
                  추론 시 입력된 스냅샷의 메타데이터와 Gemma VLM 출력 텍스트를 연동 수집하는 <strong>Logging Hook 모듈</strong>을 기기 내 구축하여 
                  오추론이 발생하는 특정 상황의 재현성 확보 및 신속한 템플릿 디버깅을 가능하게 했습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t pt-2 border-slate-200 dark:border-slate-800 font-mono">
          <span>IT Portfolio - Slide 2/7</span>
          <span>ANVI: Cost & Privacy Optimization</span>
        </div>
      </div>
    )
  }

  // Slide 3: ANVI 2 (한 끗 다른 해결 & 트레이드오프)
  const Anvi2Slide = () => {
    return (
      <div className="w-full h-full flex flex-col justify-between text-slate-800 dark:text-slate-100">
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">PROJECT 1: ANVI (디바이스 리소스 최적화 및 아키텍처 비교 검증)</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground">Technical Deep Dive</span>
        </div>

        <div className="grid grid-cols-12 gap-5 my-auto">
          {/* 핵심 해결 방안 */}
          <div className="col-span-6 space-y-3.5">
            <div className="bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-800 dark:text-emerald-300">
                <Zap className="h-4 w-4 text-emerald-600" />
                <h3>핵심 해결 방안: 상태 머신(State Machine)을 활용한 VLM 호출 빈도 제어</h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                일반적으로 온디바이스 AI의 배터리 과소모를 막기 위해 인공지능 모델 자체의 양자화(Int8 Quantization) 튜닝이나 렌더링 프레임 레이트(FPS)를 깎는 타협안을 택하지만, 이는 탐지 신뢰도의 급격한 저하를 가져옵니다.
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal mt-2">
                저는 모델 성능을 깎는 대신, <strong>바운딩 박스 내 탐지 객체(스마트폰/이어폰 등)의 누적 통계를 통제하는 룰 기반 상태 머신(State Machine)</strong>을 설계했습니다. 
                단순 노이즈 탐지는 VLM 호출로 이어지지 않고, <strong>연속 3초 이상 누적 감지된 시점에만 딱 1회 정밀 VLM 분석을 가동</strong>시킴으로써, 불필요한 고비용 VLM 연산 실행 횟수를 물리적으로 사전에 완벽히 예방했습니다.
              </p>
            </div>
          </div>

          {/* 트레이드오프 & 논리적 의사결정 */}
          <div className="col-span-6 space-y-3">
            <div className="bg-amber-50/30 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/50 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-1.5 text-sm font-bold text-amber-800 dark:text-amber-300">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <h3>인프라 리소스 제약 조건과 아키텍처 트레이드오프</h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                클라우드 기반 VLM(정확도 약 96%)을 호출하면 가장 높은 탐지 정밀도를 보장할 수 있습니다. 
                반면 온디바이스 Gemma VLM은 경량화로 인해 복합 부정행위 탐지 성능이 92% 수준으로 4%p 하락합니다.
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal mt-2">
                하지만 <strong>500명 동시 응시 조건 하에 클라우드 서버 사용 시 발생하는 월 약 1,500만 원의 GPU 청구 비용</strong>과 수험생 영상 유출 시 부과될 수 있는 <strong>법적 징벌적 배상금 리스크</strong>를 방지하기 위해, 온디바이스에서 3초 통계 검증으로 하락된 정확도를 보완하고 <strong>비용 0원 및 프라이버시 100% 안전</strong>을 쟁취하는 엣지 추론 아키텍처가 비즈니스 가치 극대화에 가장 타당하다고 판단했습니다.
              </p>
            </div>

            {/* Before & After 수치 테이블 */}
            <div className="border rounded-lg overflow-hidden border-slate-200 dark:border-slate-800">
              <table className="w-full text-[11px] text-slate-600 dark:text-slate-400">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-3 py-1.5 text-left font-bold">비교 지표</th>
                    <th className="px-3 py-1.5 text-left font-bold text-rose-600">Before (전량 VLM 추론)</th>
                    <th className="px-3 py-1.5 text-left font-bold text-emerald-600">After (계층적 엣지 추론)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 dark:border-slate-900">
                    <td className="px-3 py-1 text-slate-800 dark:text-slate-200 font-bold">분당 VLM 호출 수</td>
                    <td className="px-3 py-1 text-rose-500">1,200회 (연속 호출)</td>
                    <td className="px-3 py-1 text-emerald-500 font-bold">1~2회 (99.8% 절감)</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/30">
                    <td className="px-3 py-1 text-slate-800 dark:text-slate-200 font-bold">기기 연속 작동 시간</td>
                    <td className="px-3 py-1 text-rose-500">1분 미만 (발열 꺼짐)</td>
                    <td className="px-3 py-1 text-emerald-500 font-bold">120분 이상 (무발열 완주)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1 text-slate-800 dark:text-slate-200 font-bold">서버 클라우드 비용</td>
                    <td className="px-3 py-1 text-rose-500">매우 높음 (GPU 인스턴스)</td>
                    <td className="px-3 py-1 text-emerald-500 font-bold">0원 (서버 추론 최소화)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t pt-2 border-slate-200 dark:border-slate-800 font-mono">
          <span>IT Portfolio - Slide 3/7</span>
          <span>ANVI: Engineering Verification</span>
        </div>
      </div>
    )
  }

  // Slide 4: Donttaz 1 (개요 & 비즈니스 가치)
  const Donttaz1Slide = () => {
    return (
      <div className="w-full h-full flex flex-col justify-between text-slate-800 dark:text-slate-100">
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">PROJECT 2: Donttaz (AI 기반 스마트 금고 핀테크 플랫폼)</span>
          </div>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">Team Lead / Backend & DevOps</span>
        </div>

        {/* 최상단 요약 규칙 적용: 도메인 + 문제 + 해결 + 결과 */}
        <div className="my-3 p-3 bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-md">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
            스마트 금고 핀테크 서비스에서 외부 알림 API 지연시간으로 인해 <strong>핵심 비즈니스(거래 입출금) 트랜잭션 스레드가 대량 점유되고 알림 메시지가 누락되던 안정성 결함</strong>을, 
            <strong>RabbitMQ 메시지 큐를 통한 비동기 격리 및 Manual-ACK/DLQ 재시도 복구 인프라 구축</strong>을 통해 해결하여 
            <strong>알림 메시지 유실을 방지하고 피크 타임대 사용자 거래 응답 속도를 방어</strong>함으로써 서비스 신뢰도를 극대화했습니다.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-5 my-auto">
          {/* 비즈니스적 맥락 & 기술 선택 이유 */}
          <div className="col-span-6 space-y-3.5">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
                <Briefcase className="h-4 w-4 text-blue-600" />
                <h3>비즈니스 목적 및 기술 선정 이유</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                핀테크 서비스의 핵심 성공 지표는 <strong>서비스 신뢰도</strong>와 <strong>이탈률(Retention)</strong>입니다. 
                사용자가 이체를 진행했을 때, 외부 푸시 알림(FCM) 발송 속도 지연이나 타사 웹훅(Discord, Mattermost) 통신 병목이 메인 API 서버를 정체시키면, 사용자가 즉시 불안감을 느껴 앱을 이탈하게 됩니다.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal mt-2">
                이를 차단하기 위해 금융 이체 비즈니스 스레드와 알림 스레드를 <strong>RabbitMQ</strong>로 격리하여 비동기로 독립 분리했습니다.
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white">
                <Layers className="h-4 w-4 text-blue-600" />
                <h3>FCM & 웹훅 비동기 격리 및 메시지 보존 인프라</h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal font-medium">
                단순히 비동기로 처리하는 것에 그치지 않고 외부 통신 실패 시에도 알림 유실이 발생하지 않도록, <strong>Manual Acknowledge(수동 승인)</strong>를 활성화했습니다.
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-normal font-medium mt-2">
                네트워크 장애 등으로 실패한 알림들은 지수 백오프 기반으로 3회 자동 재시도하며, 최종 실패 시 <strong>DLQ(Dead Letter Queue)</strong>로 격리 보존시켜 운영 관리자가 사후 대조 복구할 수 있는 안전망을 다졌습니다.
              </p>
            </div>
          </div>

          {/* 단순 기능의 비즈니스 가치화 */}
          <div className="col-span-6 space-y-3.5 bg-slate-50 dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-lg">
            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900 dark:text-white border-b pb-1.5 border-slate-200 dark:border-slate-800">
              <Zap className="h-4 w-4 text-blue-600" />
              <h3>단순 기능 구현의 비즈니스적 재해석</h3>
            </div>
            
            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">OAuth2 기반의 소셜 로그인 구현 및 이탈 방지</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  초기 금융 회원 가입 프로세스의 번거로움을 생략하여 회원 가입 전환율(Conversion Rate)을 높이기 위해 OAuth2 기반 소셜 가입 체계를 구축하였으며, 사용자 권한 및 개인정보 세션을 고속 검증할 수 있도록 설계했습니다.
                </p>
              </div>

              <div className="space-y-1">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">가상 계좌 분할 설계를 통한 금융 규제(20일 가입 제한) 회피</h4>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                  금융감독원의 비대면 단기간 다수계좌 개설 제한(20일 규제) 정책으로 인해 사용자가 가상 금고를 목적별로 늘릴 수 없는 비즈니스 제약이 있었습니다. 
                  이를 해결하고자 <strong>실제 1개의 실명 마스터 계좌 하위에 DB 상에서 논리적으로 구분되는 가상 금고(Wish Table) 구조</strong>를 설계하여 사용자가 가입 즉시 목표 금액에 맞춰 무제한으로 목적별 저축방을 만들어 분산 저축을 시작할 수 있는 최적의 사용자 경험을 구현했습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t pt-2 border-slate-200 dark:border-slate-800 font-mono">
          <span>IT Portfolio - Slide 4/7</span>
          <span>Donttaz: Transactional Reliability</span>
        </div>
      </div>
    )
  }

  // Slide 5: Donttaz 2 (한 끗 다른 해결 & 트레이드오프)
  const Donttaz2Slide = () => {
    return (
      <div className="w-full h-full flex flex-col justify-between text-slate-800 dark:text-slate-100">
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">PROJECT 2: Donttaz (대용량 트래픽 동시성 제어 및 데이터 정합성 설계)</span>
          </div>
          <span className="text-xs font-mono text-muted-foreground">Concurrency Deep Dive</span>
        </div>

        <div className="grid grid-cols-12 gap-5 my-auto">
          {/* 핵심 해결 방안 */}
          <div className="col-span-6 space-y-3.5">
            <div className="bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-800 dark:text-emerald-300">
                <Zap className="h-4 w-4 text-emerald-600" />
                <h3>핵심 해결 방안: DB 커넥션 풀 보호를 위한 Redis 분산 락 격리</h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                급여일 대량 동시 가상 금고 자동 이체 발생 시 모계좌 잔액의 레이스 컨디션을 막기 위해, 흔히 데이터베이스 레코드에 락을 거는 비관적 락(Pessimistic Lock)을 채택합니다.
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal mt-2">
                그러나 비관적 락은 락을 획득하려는 모든 대기 트랜잭션이 <strong>DB Connection Pool</strong>을 점유하고 잠자기 상태가 되어, 동시성 트래픽 폭주 시 WAS의 Connection 부족으로 서버 전체가 마비되는 심각한 비즈니스 장애로 이어집니다.
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal mt-2">
                저는 DB 레벨이 아닌 <strong>Redis 메모리 레벨에서 Redisson 라이브러리를 활용해 유저 고유 계좌 번호로 락 범위를 완벽히 격리</strong>하고, 락 획득 실패 시 <strong>지수 백오프(Exponential Backoff)</strong> 기반 재시도 구조를 공통 애스펙트(Spring AOP)로 분리 구현하여 DB 커넥션 병목을 근본적으로 방지했습니다.
              </p>
            </div>
          </div>

          {/* 트레이드오프 & 논리적 의사결정 */}
          <div className="col-span-6 space-y-3">
            <div className="bg-amber-50/30 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/50 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-1.5 text-sm font-bold text-amber-800 dark:text-amber-300">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <h3>락 메커니즘 선택에 따른 성능과 신뢰성의 트레이드오프</h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                Redis 분산 락 방식은 별도의 인프라를 운영해야 하므로 SPOF(단일 장애점) 발생 위험과 캐시 구축 서버 유지 비용이 추가되는 트레이드오프가 있습니다.
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal mt-2">
                하지만 핀테크 도메인에서 <strong>동시 출금 오류로 인한 잔액 꼬임 현상은 금융 거래의 신뢰성 상실 및 유저 즉시 탈퇴</strong>로 직결되는 중대한 리스크입니다. 
                따라서 단일 장애점 극복을 위한 모니터링 비용 부담을 안더라도, DB 커넥션 풀을 안전하게 유지하고 잔액 정합성 100%를 보장하여 피크타임 거래 성사율을 지키는 Redis 메모리 락 도입이 비즈니스 안정화 측면에서 타당한 결정이었습니다.
              </p>
            </div>

            {/* Before & After 수치 테이블 */}
            <div className="border rounded-lg overflow-hidden border-slate-200 dark:border-slate-800">
              <table className="w-full text-[11px] text-slate-600 dark:text-slate-400">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-3 py-1.5 text-left font-bold">비교 지표</th>
                    <th className="px-3 py-1.5 text-left font-bold text-rose-600">Before (비관적 락)</th>
                    <th className="px-3 py-1.5 text-left font-bold text-emerald-600">After (Redis 분산 락)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 dark:border-slate-900">
                    <td className="px-3 py-1 text-slate-800 dark:text-slate-200 font-bold">500건 동시 자동 이체 속도</td>
                    <td className="px-3 py-1 text-rose-500">8.5초 (Connection Pool 고갈)</td>
                    <td className="px-3 py-1 text-emerald-500 font-bold">1.2초 (85% 속도 단축)</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-900/30">
                    <td className="px-3 py-1 text-slate-800 dark:text-slate-200 font-bold">잔액 정합성 오류 건수</td>
                    <td className="px-3 py-1 text-rose-500">100건 중 12건 정합성 붕괴</td>
                    <td className="px-3 py-1 text-emerald-500 font-bold">0건 (100% 무결성 보장)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1 text-slate-800 dark:text-slate-200 font-bold">알림 메시지 보존율</td>
                    <td className="px-3 py-1 text-rose-500">지연 시 메시지 유실 발생</td>
                    <td className="px-3 py-1 text-emerald-500 font-bold">100% 보존 (Manual ACK/DLQ)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t pt-2 border-slate-200 dark:border-slate-800 font-mono">
          <span>IT Portfolio - Slide 5/7</span>
          <span>Donttaz: Concurrency Verification</span>
        </div>
      </div>
    )
  }

  // Slide 6: CONY (개요 & 한 끗 다른 해결)
  const ConySlide = () => {
    return (
      <div className="w-full h-full flex flex-col justify-between text-slate-800 dark:text-slate-100">
        <div className="flex items-center justify-between border-b pb-3 border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-600" />
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">PROJECT 3: CONY (기프티콘 안전 거래 관리 플랫폼)</span>
          </div>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded">Team Lead / Backend & Infra</span>
        </div>

        {/* 최상단 요약 규칙 적용: 도메인 + 문제 + 해결 + 결과 */}
        <div className="my-3 p-3 bg-blue-50/50 dark:bg-blue-950/20 border-l-4 border-blue-600 rounded-r-md">
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed">
            기프티콘 거래 플랫폼의 마이크로서비스 빌드 지연으로 인해 <strong>협업 시 배포 주기가 12분 이상 소요되어 피드백 반영 및 장애 대응 속도가 저하되던 문제</strong>를, 
            <strong>Jenkins 파이프라인 변경 디렉토리(Changeset) 감지 기반 선택적 서브 빌드 파이프라인 설계</strong>로 극복하여 
            <strong>전체 빌드/배포 속도 60% 단축(12.5분 ➡️ 4.8분)을 달성하고 기능 릴리즈 민첩성을 확보</strong>하여 서비스 경쟁력을 강화했습니다.
          </p>
        </div>

        <div className="grid grid-cols-12 gap-5 my-auto">
          {/* 비즈니스적 맥락 & 빌드 최적화 */}
          <div className="col-span-6 space-y-3">
            <div className="bg-blue-50/30 dark:bg-blue-950/10 border border-blue-200 dark:border-blue-900/50 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-1.5 text-sm font-bold text-blue-800 dark:text-blue-300">
                <Briefcase className="h-4 w-4 text-blue-600" />
                <h3>비즈니스적 빌드 최적화 배경</h3>
              </div>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                기프티콘 이커머스 마켓은 트렌드 대응 및 핫픽스 속도가 매출에 직결되는 분야입니다. 
                작은 기능 변경에도 젠킨스에서 전체 모듈을 빌드하느라 배포 다운타임과 주기 병목이 생겼으며, 이는 전체 개발팀의 작업 대기 시간 낭비로 이어졌습니다.
              </p>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal mt-2">
                따라서 <strong>Changeset 스캔 기반 선택적 CI/CD 파이프라인</strong>을 작성함으로써 변경된 해당 서비스의 컨테이너만 타겟 빌드해 비즈니스 민첩성을 확보했습니다.
              </p>
            </div>
            
            <div className="border rounded-lg overflow-hidden border-slate-200 dark:border-slate-800">
              <table className="w-full text-[11px] text-slate-600 dark:text-slate-400">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-3 py-1 font-bold">비교 항목</th>
                    <th className="px-3 py-1 font-bold text-rose-600">Before</th>
                    <th className="px-3 py-1 font-bold text-emerald-600">After (CI 최적화)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 dark:border-slate-900">
                    <td className="px-3 py-1 text-slate-800 dark:text-slate-200 font-bold">CI/CD 빌드 시간</td>
                    <td className="px-3 py-1 text-rose-500">12분 30초</td>
                    <td className="px-3 py-1 text-emerald-500 font-bold">4분 48초 (61% 단축)</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1 text-slate-800 dark:text-slate-200 font-bold">기프티콘 썸네일 노출도</td>
                    <td className="px-3 py-1 text-rose-500">오류 시 미표시 (14.5% 실패)</td>
                    <td className="px-3 py-1 text-emerald-500 font-bold">100% 노출 보장 (폴백 탑재)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 한 끗 다른 해결: 썸네일 예외 폴백 */}
          <div className="col-span-6 space-y-3 bg-emerald-50/30 dark:bg-emerald-950/10 border border-emerald-200 dark:border-emerald-900/50 p-4 rounded-lg">
            <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-800 dark:text-emerald-300">
              <Zap className="h-4 w-4 text-emerald-600" />
              <h3>한 끗 다른 해결: 사용자 상세 페이지 이탈을 막는 2단계 이미지 폴백</h3>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              사용자가 상품 구매 상세 페이지에 진입할 때, 특정 외부 기프티콘 OCR 판독 과정의 오류로 인해 생성되지 않은 기프티콘 썸네일 경로가 `null`로 반환되는 일이 있었습니다. 
              이로 인해 프론트엔드 UI 렌더링 깨짐 현상이 유발되어 사용자가 상품 상세보기를 실패하고 구매를 포기하는 심각한 비즈니스 이탈 손실이 발생했습니다.
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
              저는 단순 프론트엔드의 null 방어 코드를 넘어, JPA Specification을 연동한 백엔드 조회 쿼리 레벨에서 **1단계로 고속 썸네일 이미지를 스캔하고, 썸네일 데이터가 없을 시 2단계로 업로드 원본(Original) 이미지 경로를 자동으로 결합하여 반환해주는 2단계 동적 이미지 폴백(Fallback) 조회 아키텍처**를 구현했습니다. 
              이를 통해 프론트엔드의 부하를 줄이면서도 기프티콘 노출 실패율을 0%로 통제하여 고객 상세 페이지의 사용자 이탈율을 근본적으로 사전에 방어했습니다.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] text-muted-foreground border-t pt-2 border-slate-200 dark:border-slate-800 font-mono">
          <span>IT Portfolio - Slide 6/7</span>
          <span>CONY: CI/CD & Fallback Architecture</span>
        </div>
      </div>
    )
  }

  // Slide 7: 기타 이력 및 자격/활동 (Secondary Projects & Certifications)
  const SecondarySlide = () => {
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
          <span>IT Portfolio - Slide 7/7</span>
          <span>Education & Qualification Final</span>
        </div>
      </div>
    )
  }

  // Master Slide list to map IDs to components and titles
  const ALL_SLIDES_MAP: Record<string, { title: string; category: string; component: (props: { version: PresetVersion }) => React.JSX.Element }> = {
    cover: { title: "표지 및 프로필 (Cover & Profile)", category: "기본 정보", component: CoverSlide },
    anvi_1: { title: "ANVI 1 (개요, 아키텍처 및 AI 실무)", category: "핵심 프로젝트", component: Anvi1Slide },
    anvi_2: { title: "ANVI 2 (리소스 최적화 및 아키텍처 비교)", category: "핵심 프로젝트", component: Anvi2Slide },
    donttaz_1: { title: "Donttaz 1 (개요, 비동기 격리 및 가상 금고)", category: "핵심 프로젝트", component: Donttaz1Slide },
    donttaz_2: { title: "Donttaz 2 (동시성 제어 및 아키텍처 비교)", category: "핵심 프로젝트", component: Donttaz2Slide },
    cony: { title: "CONY (선택적 빌드 CI/CD & 이미지 폴백)", category: "주요 프로젝트", component: ConySlide },
    secondary: { title: "SsaveryTime & Hyperledger 분산 저장소", category: "기타 프로젝트", component: SecondarySlide },
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
            size: A4 landscape;
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
      <header className="no-print sticky top-14 z-40 w-full bg-slate-950/80 backdrop-blur border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:text-white transition">
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div>
            <h1 className="text-base font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
              PDF Slide Portfolio Builder
            </h1>
            <p className="text-[11px] text-slate-400">
              원하는 기업 프리셋을 선택하고 인쇄할 슬라이드를 실시간 조정하여 PDF로 완벽하게 내보내세요.
            </p>
          </div>
        </div>

        {/* Dynamic Preset Switcher */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-400 mr-1">제출 프리셋:</span>
          {(["general", "ai", "fintech", "devops"] as PresetVersion[]).map((preset) => (
            <button
              key={preset}
              onClick={() => setSelectedVersion(preset)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedVersion === preset
                  ? "bg-blue-600 text-white shadow shadow-blue-500/20 border border-blue-500"
                  : "bg-slate-900 text-slate-300 border border-slate-800 hover:bg-slate-800"
              }`}
            >
              {preset === "general" && "일반 백엔드"}
              {preset === "ai" && "AI & SaaS"}
              {preset === "fintech" && "금융 & 핀테크"}
              {preset === "devops" && "인프라 & DevOps"}
            </button>
          ))}
        </div>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs px-4 py-2.5 rounded-lg shadow-md transition-all hover:-translate-y-0.5"
        >
          <Printer className="h-4 w-4" />
          PDF로 인쇄 / 저장 (Ctrl + P)
        </button>
      </header>

      {/* Main Workspace (Web View) */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 grid grid-cols-12 gap-6 slide-container">
        
        {/* Left Interactive Checklist Configurator Panel (no-print) */}
        <section className="no-print col-span-12 lg:col-span-3 space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-extrabold uppercase text-slate-300 tracking-wider">슬라이드 구성 요소 설정</span>
              <span className="text-[10px] text-slate-500 font-mono">Total {Object.values(activeSlides).filter(Boolean).length} / 7</span>
            </div>

            <div className="flex justify-between gap-2">
              <button
                onClick={() => selectAll(true)}
                className="flex-1 text-[10px] font-bold py-1 px-2 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 text-center"
              >
                전체 선택
              </button>
              <button
                onClick={() => selectAll(false)}
                className="flex-1 text-[10px] font-bold py-1 px-2 rounded bg-slate-900 border border-slate-800 hover:bg-slate-800 text-center text-slate-400"
              >
                전체 해제
              </button>
            </div>

            {/* Checklist Items */}
            <div className="space-y-2">
              {orderedSlideIds.map((slideId, index) => {
                const slideMeta = ALL_SLIDES_MAP[slideId]
                if (!slideMeta) return null
                const isActive = activeSlides[slideId]

                return (
                  <button
                    key={slideId}
                    onClick={() => toggleSlide(slideId)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg border text-left transition-all ${
                      isActive
                        ? "bg-slate-900 border-blue-500/50 hover:bg-slate-900/80 text-white"
                        : "bg-slate-950/40 border-slate-800/80 hover:bg-slate-900/30 text-slate-500"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      {isActive ? (
                        <CheckSquare className="h-4 w-4 text-blue-500 shrink-0" />
                      ) : (
                        <Square className="h-4 w-4 text-slate-700 shrink-0" />
                      )}
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold truncate leading-tight">{slideMeta.title}</p>
                        <p className="text-[9px] text-slate-500 mt-0.5 font-mono">Slide {index + 1}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="pt-2 text-[10px] text-slate-500 leading-relaxed space-y-1">
              <p className="font-bold text-slate-400">💡 PDF 저장 안내:</p>
              <p>1. <strong>[Ctrl + P]</strong> 또는 인쇄 버튼을 누릅니다.</p>
              <p>2. 대상을 <strong>[PDF로 저장]</strong>으로 변경합니다.</p>
              <p>3. 레이아웃을 <strong>[가로 (Landscape)]</strong>로 선택합니다.</p>
              <p>4. 여백을 <strong>[없음 (None)]</strong>으로, 배경 그래픽 체크를 <strong>[선택 (Checked)]</strong>으로 설정합니다.</p>
            </div>
          </div>
        </section>

        {/* Right Slides Page Previewer (printable) */}
        <section 
          ref={previewContainerRef}
          className="col-span-12 lg:col-span-9 flex flex-col items-center gap-6 pb-20 slides-preview-container"
        >
          {orderedSlideIds.map((slideId, index) => {
            const slideMeta = ALL_SLIDES_MAP[slideId]
            if (!slideMeta) return null
            const isActive = activeSlides[slideId]

            // If not active, do not render at all to prevent blank page generation during printing
            if (!isActive) return null

            return (
              <div
                key={slideId}
                className="slide-wrapper"
                style={{
                  height: `${793.7 * scale}px`,
                }}
              >
                <div
                  className="slide-page border border-slate-200 dark:border-slate-800"
                  style={{
                    transform: `scale(${scale})`,
                    pageBreakInside: "avoid",
                  }}
                >
                  {/* Dynamic slide rendering */}
                  {slideMeta.component({ version: selectedVersion })}
                </div>
              </div>
            )
          })}
        </section>
      </main>
    </div>
  )
}
