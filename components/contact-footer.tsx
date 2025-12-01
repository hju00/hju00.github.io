import { Mail, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactFooter() {
  return (
    <footer className="bg-slate-950 text-slate-100 py-20 px-4 border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* About */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 view-trigger">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-xs font-bold">P</div>
              About
            </h3>
            <p className="text-slate-400 text-sm leading-7 max-w-xs">
              비즈니스 요구사항을 안정적인 시스템으로 구현하는 백엔드 엔지니어입니다. 
              데이터 무결성과 시스템 확장성을 최우선으로 생각합니다.
            </p>
          </div>

          {/* Quick Links */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 view-trigger">
            <h3 className="text-lg font-bold mb-6 text-white">Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#projects" className="text-slate-400 hover:text-primary transition-all hover:translate-x-1 inline-block text-sm">
                  Projects
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-primary transition-all hover:translate-x-1 inline-block text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-primary transition-all hover:translate-x-1 inline-block text-sm">
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 view-trigger">
            <h3 className="text-lg font-bold mb-6 text-white">Contact</h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <p className="text-slate-400 text-sm font-medium">Open to work</p>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              새로운 도전을 함께할 준비가 되어 있습니다.
              <br />
              언제든 연락 주세요.
            </p>
            <a 
              href="mailto:hju00forwork@gmail.com" 
              className="text-primary hover:text-primary/80 font-medium border-b border-primary/30 hover:border-primary transition-colors"
            >
              hju00forwork@gmail.com
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 animate-in fade-in duration-1000 delay-500 view-trigger">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex gap-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-primary/10 hover:text-primary transition-all hover:scale-110 rounded-full" 
                asChild
              >
                <a href="mailto:hju00forwork@gmail.com" target="_blank" rel="noopener noreferrer">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-primary/10 hover:text-primary transition-all hover:scale-110 rounded-full" 
                asChild
              >
                <a href="https://github.com/hju00" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            </div>
            <p className="text-slate-500 text-sm">© 2025 Park Hyeong Ju. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
