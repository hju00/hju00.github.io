"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"

interface ImageViewerDialogProps {
  src: string
  alt: string
}

export function ImageViewerDialog({ src, alt }: ImageViewerDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* The trigger should be the thumbnail itself in project-card */}
        {/* This component just defines the dialog content */}
        <div className="absolute inset-0 cursor-pointer" aria-label={`View full image of ${alt}`}></div>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] md:max-w-5xl p-0 overflow-hidden bg-transparent border-none shadow-none">
        <DialogHeader className="p-4 pb-0 hidden">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <DialogDescription className="sr-only">Full size image of {alt}</DialogDescription>
        </DialogHeader>
        <div className="relative w-full h-[85vh] flex items-center justify-center pointer-events-none">
           {/* Image container needs pointer-events-auto if we add controls later, but for now it's fine */}
          <Image 
            src={src} 
            alt={alt} 
            fill 
            className="object-contain"
            quality={100}
          />
        </div>
        {/* Close button is automatically added by DialogContent, but we might want to style it or add a custom one if background is transparent */}
      </DialogContent>
    </Dialog>
  )
}
