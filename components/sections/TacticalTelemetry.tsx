"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight, Cpu, Network } from "lucide-react"
import { ScrambleText } from "@/components/ui/ScrambleText"
import { CyberGrid } from "@/components/ui/CyberGrid"

export function TacticalTelemetry() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    // Parallax effects for content
    const yText = useTransform(scrollYProgress, [0, 1], [50, -50])
    const yCards = useTransform(scrollYProgress, [0, 1], [150, -150])

    return (
        <section ref={containerRef} className="relative min-h-screen w-full bg-[#050505] overflow-hidden flex items-center py-20 border-t border-white/5">

            <CyberGrid scrollYProgress={scrollYProgress} />

            <div className="container mx-auto px-4 md:px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* Left Column: Text */}
                <motion.div style={{ y: yText }} className="flex flex-col space-y-8 will-change-transform">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-[#00FF41] animate-pulse" />
                        <span className="text-[#00FF41] font-mono text-xs tracking-widest uppercase">
                            Operational_Asset_Class
                        </span>
                    </div>

                    <div className="flex flex-col">
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter text-white leading-[0.9]">
                            TACTICAL
                        </h2>
                        <div className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter h-[1.1em] md:h-[0.9em] flex items-center overflow-hidden">
                            <ScrambleText
                                text="TELEMETRY"
                                className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] via-[#CCFF00] to-[#00FF41] leading-[0.9]"
                                scrambleSpeed={25}
                                revealSpeed={100}
                                delay={200}
                            />
                        </div>
                    </div>

                    <div className="flex items-start gap-4 border-l-2 border-[#00FF41]/50 pl-6 max-w-md backdrop-blur-sm bg-black/20 py-4 pr-4 rounded-r-md">
                        <p className="text-primary/80 font-light text-sm leading-relaxed">
                            WE DON'T JUST BUILD INTERFACES. <br />
                            WE DESIGN WEAPONIZED CONVERSION ENGINES.
                        </p>
                    </div>
                </motion.div>

                {/* Right Column: Cards */}
                <motion.div style={{ y: yCards }} className="flex flex-col gap-6 will-change-transform">
                    <Card
                        id="01"
                        icon={<Cpu className="text-[#00FF41]" />}
                        title="AUTONOMOUS WEB SYSTEMS"
                        description="Zero-latency digital flagships engineered for total sector dominance. High-fidelity interfaces with integrated AI logic."
                        tags={["SECTOR_ALPHA", "PREDICTIVE_UX", "FORCE_MULTIPLIER"]}
                    />
                    <Card
                        id="02"
                        icon={<Network className="text-[#00FF41]" />}
                        title="OPERATIONAL AUTOMATION"
                        description="Kill operational friction. We architect self-healing telemetry pipelines that route mission-critical data in real-time."
                        tags={["NODE_SYNC", "ASYNC_PROTOCOL", "ZERO_FRICTION"]}
                    />
                </motion.div>

            </div>
        </section>
    )
}

function Card({ id, icon, title, description, tags }: { id: string, icon: React.ReactNode, title: string, description: string, tags: string[] }) {
    return (
        <div className="group relative bg-[#0A0A0A]/60 backdrop-blur-xl border border-white/5 p-8 hover:border-[#00FF41]/50 transition-all duration-500 overflow-hidden">

            {/* Tactical Corners */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#00FF41]/30 group-hover:border-[#00FF41] transition-colors duration-300" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#00FF41]/30 group-hover:border-[#00FF41] transition-colors duration-300" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#00FF41]/30 group-hover:border-[#00FF41] transition-colors duration-300" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#00FF41]/30 group-hover:border-[#00FF41] transition-colors duration-300" />

            {/* Hover Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#00FF41]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
                <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight className="text-[#00FF41]" />
                </div>

                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-[#00FF41]/10 rounded-sm border border-[#00FF41]/20 group-hover:scale-110 transition-transform duration-300">
                        {icon}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[#00FF41] font-mono text-[10px] tracking-wider">SYSTEM_NODE_{id}</span>
                        <div className="h-px w-full bg-gradient-to-r from-[#00FF41]/50 to-transparent mt-1" />
                    </div>
                </div>

                <h3 className="text-2xl font-heading font-bold text-white mb-4 group-hover:text-[#00FF41] transition-colors duration-300">{title}</h3>
                <p className="text-primary/60 text-sm leading-relaxed mb-6 max-w-sm font-light">{description}</p>

                <div className="flex gap-2 flex-wrap">
                    {tags.map((tag, i) => (
                        <span key={i} className="text-[10px] uppercase font-mono text-[#00FF41]/70 border border-[#00FF41]/10 bg-[#00FF41]/5 px-2 py-1 rounded-none hover:bg-[#00FF41]/10 transition-colors cursor-default">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
