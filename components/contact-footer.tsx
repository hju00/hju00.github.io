import { Mail, Github, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ContactFooter() {
  return (
    <footer className="bg-slate-900 text-slate-100 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">About</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              확장 가능하고 안정적인 백엔드 시스템을 설계하고 구현하는 엔지니어입니다.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#projects" className="text-slate-400 hover:text-primary transition-colors text-sm">
                  Projects
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-slate-400 hover:text-primary transition-colors text-sm">
                  Resume
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <p className="text-slate-400 text-sm mb-4">함께 일할 수 있는 기회를 찾고 있습니다.</p>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" className="hover:text-primary" asChild>
                <a href="hju00forwork@gmail.com" target="_blank" rel="noopener noreferrer">
                  <Mail className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" className="hover:text-primary" asChild>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            </div>
            <p className="text-slate-500 text-sm">© 2025 Backend Engineer Portfolio. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
