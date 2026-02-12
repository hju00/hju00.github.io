"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const NAV_ITEMS = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Timeline", href: "#timeline" },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
        const handleScroll = () => setScrolled(window.scrollY > 50)
        window.addEventListener("scroll", handleScroll)
        handleScroll()
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollTo = (href: string) => {
        setMobileOpen(false)
        const el = document.querySelector(href)
        if (el) {
            el.scrollIntoView({ behavior: "smooth" })
        } else if (href === "#about") {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? "bg-background/80 backdrop-blur-lg border-b border-border/50 shadow-sm"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
                {/* Logo */}
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className={`font-bold text-lg transition-colors ${scrolled
                        ? "text-foreground"
                        : "text-white"
                        }`}
                >
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                        PHJ
                    </span>
                </button>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-1">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.href}
                            onClick={() => scrollTo(item.href)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${scrolled
                                ? "text-muted-foreground hover:text-foreground hover:bg-accent"
                                : "text-slate-300 hover:text-white hover:bg-white/10"
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}

                    {/* Theme Toggle */}
                    {mounted && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`ml-2 rounded-full h-8 w-8 ${scrolled
                                ? "text-muted-foreground hover:text-foreground"
                                : "text-slate-300 hover:text-white hover:bg-white/10"
                                }`}
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            {theme === "dark" ? (
                                <Sun className="h-4 w-4" />
                            ) : (
                                <Moon className="h-4 w-4" />
                            )}
                        </Button>
                    )}
                </div>

                {/* Mobile: Theme Toggle + Hamburger */}
                <div className="flex md:hidden items-center gap-1">
                    {mounted && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className={`rounded-full h-8 w-8 ${scrolled
                                ? "text-muted-foreground hover:text-foreground"
                                : "text-slate-300 hover:text-white hover:bg-white/10"
                                }`}
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            {theme === "dark" ? (
                                <Sun className="h-4 w-4" />
                            ) : (
                                <Moon className="h-4 w-4" />
                            )}
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="icon"
                        className={`rounded-full h-8 w-8 ${scrolled
                            ? "text-muted-foreground hover:text-foreground"
                            : "text-slate-300 hover:text-white hover:bg-white/10"
                            }`}
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border">
                    <div className="px-4 py-3 space-y-1">
                        {NAV_ITEMS.map((item) => (
                            <button
                                key={item.href}
                                onClick={() => scrollTo(item.href)}
                                className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    )
}
