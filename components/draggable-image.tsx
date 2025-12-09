"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

export function DraggableImage({ src, alt }: { src: string; alt: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault() // Prevent default image drag behavior
    setIsDragging(true)
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const newX = e.clientX - startPos.x
    const newY = e.clientY - startPos.y
    setPosition({ x: newX, y: newY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  return (
    <div 
      ref={containerRef}
      className={`relative w-full h-48 overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-border ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      <div 
        className="absolute min-w-full min-h-full"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          transition: isDragging ? "none" : "transform 0.1s ease-out",
        }}
      >
        {/* We use a regular img tag here or Next.js Image with unoptimized to ensure it renders at full size if needed, 
            but usually Next.js Image with object-cover is tricky for 'pan & zoom' effect without fixed dimensions.
            Here we simply render the image large enough to be dragged. */}
        <Image 
          src={src} 
          alt={alt} 
          // We don't use 'fill' here because we want the image to potentially be larger than the container
          // But to keep it simple, we'll start with 'object-cover' logic but allowing offset.
          // Actually, to simulate "large image being dragged", we should probably set width/height to auto or 100% 
          // and let the user pan it. 
          // However, if the image is SMALLER than the container, dragging is weird. 
          // Let's assume the image is meant to be 'cover' but user wants to adjust the crop.
          width={800} // Arbitrary large width to ensure high quality
          height={600}
          className="max-w-none pointer-events-none select-none" // Prevent browser native drag
          draggable={false}
          style={{
             width: "110%", // Slightly larger than container to allow some movement initially
             height: "auto",
             objectFit: "cover" 
          }}
        />
      </div>
      
      {/* Visual Hint Overlay */}
      <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        Drag to view
      </div>
    </div>
  )
}
