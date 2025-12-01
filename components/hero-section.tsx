"use client"

import { Button } from "@/components/ui/button"
import { Github } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="mb-8 inline-block">
          <div className="h-16 w-16 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
            <div className="h-8 w-8 rounded bg-primary/30" />
          </div>
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white text-pretty leading-tight">
          신뢰를 설계하는 백엔드 엔지니어, <span className="text-primary"> 박형주</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-300 mb-8 text-pretty leading-relaxed max-w-2xl mx-auto">
          Java 웹 개발의 기본기부터 분산 시스템 아키텍처 설계까지.
        </p>

        <p className="text-slate-400 mb-12 max-w-xl mx-auto text-lg">
          시스템 설계와 데이터 무결성을 중심으로 확장 가능한 솔루션을 구축합니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={() => {
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            View Projects
          </Button>
          <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/5 bg-transparent" asChild>
            <a href="https://github.com/hju00" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              GitHub Profile
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
