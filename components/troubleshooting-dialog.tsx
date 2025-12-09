"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Terminal } from "lucide-react"

export interface TroubleshootingLog {
  title: string
  date: string
  environment: string
  sections: {
    title: string
    content: React.ReactNode
  }[]
}

export function TroubleshootingDialog({ log }: { log: TroubleshootingLog }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full mt-4 gap-2 border-dashed">
          <BookOpen className="w-4 h-4" />
          Troubleshooting Log
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="destructive" className="rounded-sm">
              Troubleshooting
            </Badge>
            <span className="text-sm text-muted-foreground">{log.date}</span>
          </div>
          <DialogTitle className="text-xl sm:text-2xl leading-tight">
            {log.title}
          </DialogTitle>
          <DialogDescription className="mt-2 text-sm">
            Environment: {log.environment}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto min-h-0 p-6 pt-2">
          <div className="space-y-8 pb-8">
            {log.sections.map((section, index) => (
              <section key={index} className="space-y-3">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-primary">
                  {section.title}
                </h3>
                <div className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 space-y-4">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function CodeBlock({ children, label }: { children: string; label?: string }) {
  return (
    <div className="rounded-md bg-slate-950 border border-slate-800 overflow-hidden my-3">
      {label && (
        <div className="bg-slate-900 px-3 py-1.5 border-b border-slate-800 flex items-center gap-2">
          <Terminal className="w-3 h-3 text-slate-400" />
          <span className="text-xs text-slate-400 font-mono">{label}</span>
        </div>
      )}
      <div className="p-3 overflow-x-auto">
        <pre className="text-xs sm:text-sm font-mono text-slate-50 leading-relaxed">
          {children}
        </pre>
      </div>
    </div>
  )
}
