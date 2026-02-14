"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUp, Rocket } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLenis } from "@/components/layout/SmoothScroller"

export function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const lenis = useLenis()

    // Toggle visibility based on scroll position - optimized
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        window.addEventListener("scroll", toggleVisibility, { passive: true })
        return () => window.removeEventListener("scroll", toggleVisibility)
    }, [])

    const scrollToTop = (e: React.MouseEvent) => {
        e.preventDefault()
        if (lenis) {
            lenis.scrollTo(0, { immediate: false, duration: 1.5 }) // Smooth Lenis scroll
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
    }

    const buttonVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.8 },
        visible: { opacity: 1, y: 0, scale: 1 }
    }

    return (
        <motion.button
            type="button"
            variants={buttonVariants}
            initial="hidden"
            animate={isVisible ? "visible" : "hidden"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsVisible(true) && setIsHovered(true)} // Keep visible on hover just in case
            onHoverEnd={() => setIsHovered(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={scrollToTop}
            className={cn(
                "fixed bottom-8 right-8 z-50 group flex items-center justify-center transition-none",
                isVisible ? "pointer-events-auto" : "pointer-events-none"
            )}
            aria-label="Scroll to top"
        >
            {/* Rotating HUD Ring */}
            <div className="absolute inset-0 rounded-full border border-accent/20 border-dashed animate-[spin_10s_linear_infinite] pointer-events-none" />
            <div className="absolute inset-0 rounded-full border border-transparent border-t-accent/60 rotate-45 pointer-events-none" />

            {/* Main Button Body */}
            <div className={cn(
                "relative flex items-center justify-center w-12 h-12 rounded-full",
                "bg-black/80 backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(34,197,94,0.2)]",
                "transition-colors duration-300 group-hover:border-accent/50 group-hover:bg-accent/10 pointer-events-none"
            )}>

                {/* Inner Pulse Effect */}
                <div className="absolute inset-0 rounded-full bg-accent/5 animate-ping opacity-0 group-hover:opacity-30 duration-1000" />

                {/* Icon Transition */}
                <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden rounded-full">
                    {/* Arrow (Default -> Exit Up) */}
                    <motion.div
                        animate={{ y: isHovered ? "-150%" : "0%" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <ArrowUp className="w-5 h-5 text-white/80" />
                    </motion.div>

                    {/* Rocket (Enter from Bottom -> Visible) */}
                    <motion.div
                        initial={{ y: "150%" }}
                        animate={{ y: isHovered ? "0%" : "150%" }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <Rocket className="w-5 h-5 text-accent fill-accent/20 -rotate-45" />
                    </motion.div>
                </div>
            </div>

            {/* Tooltip / Label */}
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
                className="absolute right-full mr-4 px-3 py-1 rounded bg-black/90 border border-white/10 text-xs font-mono text-accent whitespace-nowrap pointer-events-none"
            >
                <span className="flex items-center gap-2">
                    [ INITIATE_ASCENT ]
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                </span>
            </motion.div>

        </motion.button>
    )
}
