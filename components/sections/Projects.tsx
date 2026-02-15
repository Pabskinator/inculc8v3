"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import { useMobile } from "@/hooks/use-mobile"

const projects = [
    {
        code: "PJ-ALPHA",
        name: "CYBER_DYNAMICS",
        type: "Web Application",
        status: "DEPLOYED",
        year: "2025",
        image: "/projects/cyber.png",
        color: "#3B82F6"
    },
    {
        code: "PJ-BETA",
        name: "NEURAL_LINK",
        type: "Marketing Site",
        status: "CLASSIFIED",
        year: "2025",
        image: "/projects/neural.png",
        color: "#8B5CF6"
    },
    {
        code: "PJ-GAMMA",
        name: "VOID_WALKER",
        type: "3D Experience",
        status: "DEPLOYED",
        year: "2024",
        image: "/projects/void.png",
        color: "#F59E0B"
    }
]

export function Projects() {
    const [activeIndex, setActiveIndex] = useState<number | null>(1) // Default to middle card open
    const isMobile = useMobile()

    return (
        <section id="projects" className="py-32 bg-black relative border-t border-white/5 overflow-hidden">

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* Header */}
                <div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-8">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">
                            DEPLOYMENT LOGS
                        </h2>
                        <div className="max-w-md font-mono text-sm text-white/60">
                            Active mission protocols. Select a file to decrypt details.
                        </div>
                    </div>
                </div>

                {/* Expanding Flex Gallery */}
                <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[600px] w-full">
                    {projects.map((project, i) => {
                        const isActive = isMobile ? true : activeIndex === i;

                        return (
                            <motion.div
                                key={i}
                                onHoverStart={() => !isMobile && setActiveIndex(i)}
                                onClick={() => setActiveIndex(i)}
                                layout={!isMobile}
                                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                className={`relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 transition-colors duration-500
                                    ${isActive ? 'lg:flex-[3] flex-[3]' : 'lg:flex-[1] flex-[1]'}
                                    h-[400px] lg:h-auto min-h-[100px]
                                `}
                            >
                                {/* Background Image */}
                                <Image
                                    src={project.image}
                                    alt={project.name}
                                    fill
                                    className={`object-cover transition-transform duration-700 ${isActive ? 'scale-100 opacity-60' : 'scale-110 opacity-30 grayscale'}`}
                                />

                                {/* Gradient Overlays */}
                                <div className={`absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/90 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-80'}`} />
                                <div className="absolute inset-0 bg-black/20" />

                                {/* Content Container */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-between">

                                    {/* Top Status */}
                                    <div className="flex justify-between items-start">
                                        <div className={`px-3 py-1 rounded-full border border-white/10 bg-black/40 backdrop-blur-sm text-[10px] font-mono uppercase tracking-widest transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/40'}`}>
                                            {project.code}
                                        </div>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center border border-white/20 bg-white/5 backdrop-blur-md transition-all duration-300 ${isActive ? 'opacity-100 rotate-45' : 'opacity-0'}`}>
                                            <ArrowUpRight className="w-4 h-4 text-white" />
                                        </div>
                                    </div>

                                    {/* Bottom Info */}
                                    <div className="relative">
                                        {/* Color Indicator Vertical Line */}
                                        <motion.div
                                            className="absolute -left-8 top-0 bottom-0 w-1 rounded-r-full"
                                            style={{ backgroundColor: project.color }}
                                            animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0 }}
                                        />

                                        <h3 className={`font-heading font-bold text-white transition-all duration-500 leading-none mb-2
                                            ${isActive ? 'text-4xl md:text-5xl translate-y-0' : 'text-2xl md:text-3xl text-white/50 translate-y-2'}
                                        `}>
                                            {project.name}
                                        </h3>

                                        <div className={`font-mono text-xs uppercase tracking-widest overflow-hidden transition-all duration-500
                                            ${isActive ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0'}
                                        `}>
                                            <div className="flex items-center gap-6 text-white/60">
                                                <span>{project.type}</span>
                                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                                <span>{project.year}</span>
                                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                                <span style={{ color: project.color }}>{project.status}</span>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                {/* Hover Glow Effect */}
                                {isActive && (
                                    <div
                                        className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30"
                                        style={{
                                            background: `radial-gradient(circle at 50% 50%, ${project.color}, transparent 70%)`
                                        }}
                                    />
                                )}
                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    )
}
