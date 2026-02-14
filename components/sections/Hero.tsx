"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Terminal, ShieldCheck, Activity } from "lucide-react"
import { useState } from "react"
import { useInteraction } from "@/components/context/InteractionContext"

export function Hero() {
    const { activeNode } = useInteraction()

    return (
        <section className="relative w-full h-screen flex flex-col justify-center overflow-hidden pointer-events-none">
            {/* Background Layer (Now Global) */}

            {/* Content Layer */}
            <div className="relative z-10 container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 h-full items-center pointer-events-none">

                {/* Left Column: Text Content */}
                <div className="flex flex-col items-start text-left pointer-events-none max-w-2xl">

                    {/* Status Line - Dynamic based on interaction */}
                    <div className="pointer-events-auto h-8 mb-8">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeNode ? activeNode.id : "default"}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-4 text-xs font-mono text-primary/60 border border-white/10 px-4 py-2 bg-black/40 backdrop-blur-sm rounded-full inline-flex"
                            >
                                <span className="flex items-center gap-1">
                                    <span className={`w-2 h-2 rounded-full ${activeNode ? "bg-amber-400" : "bg-[#00FF41]"} animate-pulse`} />
                                    {activeNode ? activeNode.id : "SYSTEM ONLINE"}
                                </span>
                                <span className="w-px h-3 bg-white/20" />
                                <span className="flex items-center gap-1 text-white/40 uppercase">
                                    {activeNode ? "Scanning Node Data..." : "SECURE CONNECTION ESTABLISHED"}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Headline */}
                    <div className="pointer-events-auto min-h-[160px] md:min-h-[240px] flex flex-col justify-center">
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter text-balance break-words">
                            <span className="text-white block">INCULC8</span>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={activeNode ? activeNode.id : "default-title"}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-transparent bg-clip-text bg-gradient-to-r from-[#00FF41] via-[#CCFF00] to-[#00FF41] block text-4xl md:text-6xl lg:text-7xl mt-2 break-normal"
                                >
                                    {activeNode ? activeNode.title : "SOLUTIONS"}
                                </motion.span>
                            </AnimatePresence>
                        </h1>
                    </div>

                    {/* Subheadline / Description */}
                    <div className="pointer-events-auto min-h-[100px] mb-10 w-full">
                        <AnimatePresence mode="wait">
                            {activeNode ? (
                                <motion.p
                                    key="node-desc"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-lg md:text-xl text-primary/80 font-light leading-relaxed border-l-2 border-[#00FF41] pl-6 py-2 max-w-xl"
                                >
                                    {activeNode.description}
                                </motion.p>
                            ) : (
                                <motion.p
                                    key="default-desc"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-lg md:text-xl text-primary/80 max-w-xl font-light leading-relaxed text-balance"
                                >
                                    Deploying autonomous web systems and high-fidelity landing pages. Engineered for conversion, verified for performance.
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* CTAs */}
                    <div className="pointer-events-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 items-center"
                        >
                            <Button variant="primary" size="lg" icon={<Terminal size={16} />}>
                                Initiate Handshake
                            </Button>
                            <Button variant="secondary" size="lg" icon={<Activity size={16} />}>
                                View Mission Logs
                            </Button>
                        </motion.div>
                    </div>
                </div>

                {/* Right Column: Interactive Space (Empty but interactable) */}
                <div className="hidden md:block h-full w-full pointer-events-none" />

                {/* Footer Status */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 text-[10px] uppercase tracking-widest text-white/20 font-mono pointer-events-none"
                >
                    <span>Uplink: Encrypted</span>
                    <span>Latency: Nominal</span>
                    <span>Registry: Live</span>
                </motion.div>
            </div>
        </section>
    )
}
