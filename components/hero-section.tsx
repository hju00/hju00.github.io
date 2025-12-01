"use client"

import { Button } from "@/components/ui/button"
import { Github, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 py-20 overflow-hidden bg-slate-950">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] -z-10" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <Badge variant="secondary" className="px-4 py-1.5 text-sm font-medium rounded-full border-primary/20 bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
            Backend Engineer
          </Badge>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 text-white tracking-tight leading-tight [word-break:keep-all] animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          신뢰를 설계하는 <br className="hidden md:block" />
          백엔드 엔지니어,{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
            박형주
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto [word-break:keep-all] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
          Java 웹 개발의 기본기부터 대용량 분산 시스템 설계까지.
          <br className="hidden md:block" />
          견고하고 확장 가능한 솔루션을 구축합니다.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-500">
          <Button
            size="lg"
            className="h-12 px-8 text-base font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/25 transition-all hover:scale-105"
            onClick={() => {
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            View Projects <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="h-12 px-8 text-base border-slate-500 text-slate-100 bg-slate-900/50 hover:bg-slate-800 hover:text-white hover:border-white transition-all hover:scale-105" 
            asChild
          >
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
