"use client"

import * as React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility for merging classes
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    variant?: "primary" | "secondary" | "danger" | "ghost" | "outline"
    size?: "sm" | "md" | "lg"
    icon?: React.ReactNode
    children: React.ReactNode
}

const variants = {
    primary: "bg-surface border border-primary/50 text-primary hover:bg-primary/10 hover:border-primary",
    secondary: "bg-transparent border border-white/10 text-white/70 hover:text-white hover:border-white/30",
    danger: "bg-red-500/10 border border-red-500/50 text-red-500 hover:bg-red-500/20",
    ghost: "bg-transparent text-white/60 hover:text-white hover:bg-white/5",
    outline: "bg-transparent border border-accent/20 text-accent hover:bg-accent/10 hover:border-accent/50",
}

const sizes = {
    sm: "h-8 px-4 text-xs tracking-wider",
    md: "h-10 px-6 text-sm tracking-widest",
    lg: "h-12 px-8 text-base tracking-widest",
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", icon, children, ...props }, ref) => {
        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "relative flex items-center justify-center gap-2 overflow-hidden font-mono uppercase transition-colors duration-200",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {/* Corner Accents for specific variants */}
                {(variant === "primary" || variant === "secondary") && (
                    <>
                        <div className="absolute top-0 left-0 w-[2px] h-[2px] bg-current opacity-50" />
                        <div className="absolute top-0 right-0 w-[2px] h-[2px] bg-current opacity-50" />
                        <div className="absolute bottom-0 left-0 w-[2px] h-[2px] bg-current opacity-50" />
                        <div className="absolute bottom-0 right-0 w-[2px] h-[2px] bg-current opacity-50" />
                    </>
                )}

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-current opacity-0 hover:opacity-5 transition-opacity duration-300" />

                {icon && <span className="w-4 h-4">{icon}</span>}
                <span className="z-10">{children}</span>
            </motion.button>
        )
    }
)
Button.displayName = "Button"
