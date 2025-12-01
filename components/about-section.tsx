"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, GraduationCap, Mail, Github } from "lucide-react"
import Image from "next/image"

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Profile Image & Quick Info */}
          <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700 view-trigger">
            <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-primary/20 shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500">
              {/* Replace with your actual image path */}
              <Image
                src="/profile.jpg" 
                alt="Profile"
                fill
                className="object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <Card className="p-6 bg-card border-slate-200 dark:border-slate-800">
              <h3 className="text-2xl font-bold mb-1 text-center">박형주</h3>
              <p className="text-primary text-center font-medium mb-6">Backend Engineer</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span className="text-sm">Seoul, South Korea</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <a href="mailto:hju00forwork@gmail.com" className="text-sm hover:text-primary transition-colors">
                    hju00forwork@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-600 dark:text-slate-400">
                  <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0">
                    <Github className="h-4 w-4" />
                  </div>
                  <a href="https://github.com/hju00" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary transition-colors">
                    github.com/hju00
                  </a>
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column: Bio & Education */}
          <div className="md:col-span-7 lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 view-trigger">
            
            <div>
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-3xl font-bold text-foreground">About Me</h2>
                <div className="h-1.5 flex-1 bg-gradient-to-r from-primary/50 to-transparent rounded-full" />
              </div>
              
              <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
                <p>
                  안녕하세요, <strong className="text-foreground">신뢰할 수 있는 백엔드 시스템</strong>을 설계하는 개발자 박형주입니다.
                </p>
                <p>
                  단순히 기능이 동작하는 것을 넘어, <span className="bg-primary/10 text-primary px-1 rounded">데이터 무결성</span>과 <span className="bg-primary/10 text-primary px-1 rounded">시스템 안정성</span>을 최우선으로 고려합니다. 
                  Java와 Spring Boot를 주력으로 사용하며, 대용량 트래픽 처리를 위한 아키텍처 설계에 깊은 관심을 가지고 있습니다.
                </p>
                <p>
                  비즈니스 요구사항을 명확히 분석하고, 이를 기술적으로 풀어내는 과정에서 즐거움을 느낍니다. 
                  팀원들과의 원활한 소통을 중요하게 생각하며, 함께 성장하는 개발 문화를 지향합니다.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Education
              </h3>
              
              <div className="space-y-4">
                {/* Education Item 1 */}
                <div className="group relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 hover:border-primary transition-colors">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-background border-2 border-slate-400 group-hover:border-primary transition-colors" />
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-lg">Samsung Software Academy for Youth (SSAFY)</h4>
                    <Badge variant="secondary" className="text-xs">Java 전공</Badge>
                  </div>
                  <p className="text-sm text-slate-500 mb-2 flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" /> 2025.07 - 2026.06
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    현재 진행 중
                  </p>
                </div>

                {/* Education Item 2 */}
                <div className="group relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 hover:border-primary transition-colors">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-background border-2 border-slate-400 group-hover:border-primary transition-colors" />
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-lg">부산대학교</h4>
                    <Badge variant="secondary" className="text-xs">전기컴퓨터공학부 정보컴퓨터공학과 전공</Badge>
                  </div>
                  <p className="text-sm text-slate-500 mb-2 flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" /> 2019.03 - 2025.08
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    컴퓨터 공학 전반을 학습하며 정보 보안 및 네트워크 분야를 중점적으로 학습 (학점 3.09/4.5)
                  </p>
                </div>

                {/* Education Item 3 */}
                <div className="group relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 hover:border-primary transition-colors">
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-background border-2 border-slate-400 group-hover:border-primary transition-colors" />
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h4 className="font-bold text-lg">광주서석고등학교</h4>
                    <Badge variant="secondary" className="text-xs">이과 (자연계열)</Badge>
                  </div>
                  <p className="text-sm text-slate-500 mb-2 flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" /> 2016.03 - 2019.02
                  </p>
                  <p className="text-slate-600 dark:text-slate-400">
                    성실한 학교 생활
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
