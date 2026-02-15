"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useVelocity } from "framer-motion"
import { Rocket, Search, Layout, Zap, Shield, Send, ArrowDown } from "lucide-react"
import { ScrambleText } from "@/components/ui/ScrambleText"
import { cn } from "@/lib/utils"
import { useMobile } from "@/hooks/use-mobile"

const protocols = [
    {
        id: "01",
        title: "DISCOVERY_PHASE",
        content: "Deep analysis of operational requirements. We map the terrain before deployment. Identification of key performance indicators and conversion targets.",
        icon: Search
    },
    {
        id: "02",
        title: "ARCHITECTURE_DESIGN",
        content: "Drafting the blueprints. Selection of optimal tech stack and component architecture. Ensuring scalability and maintainability.",
        icon: Layout
    },
    {
        id: "03",
        title: "DEVELOPMENT_SPRINTS",
        content: "Execution of code modules. Iterative build process with continuous integration. Rigorous testing of UI systems and automation workflows.",
        icon: Zap
    },
    {
        id: "04",
        title: "QA_HARDENING",
        content: "Stress testing and security auditing. Accessibility verification (WCAG). Performance profiling to ensure sub-second load times.",
        icon: Shield
    },
    {
        id: "05",
        title: "DEPLOYMENT_LAUNCH",
        content: "Global CDN distribution. DNS propagation. Post-launch monitoring and analytics integration. Handover of mission control.",
        icon: Send
    }
]

export function Method() {
    const containerRef = useRef<HTMLDivElement>(null)
    // REMOVED: useState for rocketRotation and isBoosting (caused re-renders)
    // REMOVED: boostTimeoutRef

    // Global scroll for direction/velocity detection
    const { scrollY } = useScroll()
    const scrollVelocity = useVelocity(scrollY)
    const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })

    // Section progress for positioning
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    })

    // 1. Velocity-driven Rotation
    // Map velocity to rotation: negative (up) -> 0, positive (down) -> 180
    const isMobile = useMobile()

    const rocketRotation = useTransform(smoothVelocity, (latest) => {
        if (isMobile) return 180 // Static down on mobile
        if (Math.abs(latest) < 5) return 90 // Neutral/Side when idle? Or keep last? 
        // Actually, just mapping direction is safer.
        return (latest < 0 ? 0 : 180) as number
    })
    // Smooth the rotation so it snaps but not instantly jittery
    const smoothRotation = useSpring(rocketRotation, { stiffness: 200, damping: 30 })


    // 2. Velocity-driven Boost Intensity
    // Map absolute velocity to opacity/scale
    const boostOpacity = useTransform(smoothVelocity, [-1000, -50, 0, 50, 1000], [1, 0, 0, 0, 1])
    const boostScale = useTransform(smoothVelocity, [-1000, 0, 1000], [1.2, 0.8, 1.2])


    // Rocket remains in sticky viewport, moving from 50vh to 80vh
    const rocketTop = useTransform(scrollYProgress, [0, 1], ["50vh", "80vh"])
    const rocketSpring = useSpring(rocketTop, { stiffness: 50, damping: 20, restDelta: 0.001 })

    // Fill the document-based line as we scroll
    const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

    return (
        <section ref={containerRef} id="method" className="relative min-h-[400vh] z-20">

            {/* 1. DOCUMENT LAYER - The Path and Destination (Scrolls with page) */}
            <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none z-0">

                {/* Starfield Background Layer (Transparent) */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100%_10vh]" />

                {/* The Physical Path Line */}
                {/* Starts 50vh from top, Ends 20vh from bottom */}
                <div className="absolute left-1/2 -translate-x-1/2 top-[50vh] bottom-[20vh] w-[1px] bg-white/10">

                    {/* START MARKER */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-accent/20 animate-ping opacity-50" />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-accent bg-black" />

                    {/* END MARKER - Destination Planet */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-16 h-16 rounded-full border border-white/10 bg-black/50 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.1)] overflow-visible">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent rounded-full" />
                        <div className="w-8 h-8 rounded-full border border-accent/40 bg-accent/10 flex items-center justify-center animate-pulse">
                            <div className="w-3 h-3 rounded-full bg-accent" />
                        </div>

                        {/* Label */}
                        <div className="absolute top-full mt-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 backdrop-blur-md whitespace-nowrap">
                            <span className="text-[10px] font-mono text-accent uppercase tracking-widest flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                LZ_SECURE
                            </span>
                        </div>
                    </div>

                    {/* FILLING LINE (Document based fill) */}
                    <motion.div
                        className="absolute top-0 w-full bg-accent origin-top"
                        style={{ height: fillHeight }}
                    />
                </div>
            </div>


            {/* 2. STICKY LAYER - The Rocket (Stays in viewport) */}
            <div className="sticky top-0 h-screen w-full pointer-events-none z-10 overflow-hidden">
                <div className="relative w-full h-full flex justify-center">
                    {/* Rocket Cursor */}
                    <motion.div
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                        style={{ top: rocketSpring, left: "50%" }}
                    >
                        {/* Rocket Container - Now Animates Rotation via Style */}
                        <motion.div
                            style={{ rotate: smoothRotation }}
                            className="relative p-3 rounded-full border border-white/10 bg-black/80 backdrop-blur-md shadow-[0_0_30px_rgba(34,197,94,0.3)]"
                        >
                            {/* Static -45deg rotation to correct icon orientation */}
                            <Rocket className="w-6 h-6 text-accent fill-accent/20 -rotate-45 relative z-10" />

                            {/* ENHANCED THRUSTERS (Afterburner Fire Effect) - Driven by Velocity Opacity */}
                            {/* ENHANCED THRUSTERS (Afterburner Fire Effect) - Driven by Velocity Opacity */}
                            {/* Disabled on Mobile for performance */}
                            {!isMobile && (
                                <motion.div
                                    style={{ opacity: boostOpacity }}
                                    className="absolute top-[80%] left-1/2 -translate-x-1/2 pointer-events-none origin-top mix-blend-screen flex flex-col items-center"
                                >

                                    {/* 1. Inner Core (White Hot) */}
                                    <div
                                        className="w-2 bg-white rounded-full blur-[2px] z-20 h-2"
                                        style={{ animation: 'flame-flicker 0.1s linear infinite' }}
                                    />

                                    {/* 2. Middle Flame (Yellow/Orange) */}
                                    <motion.div
                                        className="absolute top-2 w-4 bg-gradient-to-b from-yellow-300 to-orange-500 rounded-full blur-[4px] z-10 h-8"
                                        style={{ animation: 'flame-flicker 0.15s linear infinite', scaleX: boostScale }}
                                    />

                                    {/* 3. Outer Plasma (Green Accent + Smoke) */}
                                    <div
                                        className="absolute top-4 w-8 bg-gradient-to-b from-accent to-transparent rounded-full blur-[8px] z-0 h-12 opacity-30"
                                        style={{ animation: 'flame-flicker 0.2s linear infinite' }}
                                    />
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Scanning Line - Desktop Only */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[1px] bg-accent/20 hidden md:block" />
                    </motion.div>
                </div>
            </div>


            {/* 3. CONTENT LAYER - Scrolling Protocol Cards */}
            <div className="relative w-full z-20 container mx-auto px-4 -mt-[100vh] pb-[50vh] pointer-events-none">

                {/* Intro Title */}
                <div className="text-center pt-[20vh] mb-[30vh] relative z-30 pointer-events-auto">
                    <h2 className="text-5xl md:text-8xl font-heading font-bold mb-6 tracking-tighter">
                        <span className="text-white block">MISSION</span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/20">TRAJECTORY</span>
                    </h2>
                    <p className="font-mono text-sm text-white/40 uppercase tracking-widest flex items-center justify-center gap-2 mt-8">
                        Scroll to Initiate Descent Sequence <ArrowDown className="w-4 h-4 animate-bounce" />
                    </p>
                </div>

                {/* Protocol Nodes */}
                <div className="space-y-[40vh] pointer-events-auto">
                    {protocols.map((p, i) => (
                        <ProtocolNode key={p.id} protocol={p} index={i} />
                    ))}
                </div>

                {/* Extra spacer at bottom */}
                <div className="h-[20vh]" />
            </div>

        </section>
    )
}

function ProtocolNode({ protocol, index }: { protocol: any, index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, -50])
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 1, 1, 0.9])

    const isEven = index % 2 === 0

    return (
        <motion.div
            ref={ref}
            style={{ opacity, scale, y }}
            className={`flex flex-col md:flex-row items-center justify-between w-full ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-0`}
        >
            {/* Content Card */}
            <div className={`w-full md:w-5/12 ${isEven ? 'text-right' : 'text-left'}`}>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-10 rounded-3xl relative group hover:border-accent/40 transition-colors duration-500 hover:bg-white/[0.07] overflow-hidden">

                    {/* Connection dot */}
                    <div className={`hidden md:block absolute top-1/2 w-3 h-3 rounded-full bg-accent z-10 ${isEven ? '-right-[1.5rem] translate-x-3' : '-left-[1.5rem] -translate-x-3'}`} />

                    <div className={`flex items-center gap-4 mb-6 ${isEven ? 'justify-end' : 'justify-start'}`}>
                        {isEven ? (
                            <>
                                <div className="font-mono text-xs text-accent px-2 py-1 rounded bg-accent/10 border border-accent/20">Step {protocol.id}</div>
                                <protocol.icon className="w-6 h-6 text-white" />
                            </>
                        ) : (
                            <>
                                <protocol.icon className="w-6 h-6 text-white" />
                                <div className="font-mono text-xs text-accent px-2 py-1 rounded bg-accent/10 border border-accent/20">Step {protocol.id}</div>
                            </>
                        )}
                    </div>

                    <h3 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4 leading-none break-words">
                        <ScrambleText text={protocol.title} revealSpeed={40} scrambleSpeed={50} />
                    </h3>

                    <p className="text-white/60 leading-relaxed font-light text-sm md:text-base break-words">
                        {protocol.content}
                    </p>
                </div>
            </div>

            <div className="w-0 md:w-2/12" />
            <div className="w-full md:w-5/12 hidden md:block" />

        </motion.div>
    )
}
