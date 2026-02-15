"use client"

import { useState, useEffect } from "react"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Logo } from "@/components/ui/Logo"
import { useLenis } from "@/components/layout/SmoothScroller"
import { useMobile } from "@/hooks/use-mobile"

const navItems = [
    { name: "SYSTEMS", href: "#systems" },
    { name: "PROJECTS", href: "#projects" },
    { name: "METHOD", href: "#method" },
    { name: "INTEL", href: "#intelligence" },
    { name: "SIGNAL", href: "#signal" },
]

export function Navbar() {
    const isMobile = useMobile()

    if (isMobile) {
        return (
            <header className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 pointer-events-none">
                <NavbarContent isMobile={true} />
            </header>
        )
    }

    return <NavbarDesktop />
}

function NavbarDesktop() {
    const [hidden, setHidden] = useState(false)
    const { scrollY } = useScroll()

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0
        if (latest > previous && latest > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    })

    return (
        <motion.header
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 flex justify-center py-6 pointer-events-none"
        >
            <NavbarContent isMobile={false} />
        </motion.header>
    )
}

function NavbarContent({ isMobile }: { isMobile: boolean }) {
    const lenis = useLenis()

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault()
        if (lenis) {
            lenis.scrollTo(href, { duration: 1.5 })
        } else {
            const element = document.querySelector(href)
            element?.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <nav className="pointer-events-auto bg-black/50 backdrop-blur-md border border-white/10 px-6 py-3 rounded-full flex items-center gap-8">
            {/* Logo/Home */}
            <a
                href="#"
                onClick={(e) => handleNavClick(e, '#')}
                className="hover:opacity-80 transition-opacity cursor-pointer"
            >
                <Logo className="w-auto h-8" />
            </a>

            {/* Links */}
            <div className="hidden md:flex items-center gap-6">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        onClick={(e) => handleNavClick(e, item.href)}
                        className="text-xs font-mono text-white/60 hover:text-accent transition-colors tracking-widest relative group cursor-pointer"
                    >
                        <span className="relative z-10">{item.name}</span>
                        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all group-hover:w-full" />
                    </a>
                ))}
            </div>

            {/* Status indicator */}
            <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_var(--accent)]" />
        </nav>
    )
}

// Placeholder export to satisfy linter (will be deleted by replace)
export function NavbarLegacy() {
    return null
}
