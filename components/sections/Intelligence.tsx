"use client"

import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ArrowUpRight, FileText, Lock, ShieldAlert, Cpu, Database, Activity, ScanLine } from "lucide-react"
import { ScrambleText } from "@/components/ui/ScrambleText"
import { cn } from "@/lib/utils"

const articles = [
    {
        id: "INTEL-094",
        category: "DESIGN_SYSTEMS",
        title: "Atomic Design in 3D Environments",
        date: "2025.02.10",
        readTime: "4 MIN",
        access: "PUBLIC",
        icon: Cpu,
        excerpt: "Adapting granular component architecture for spatial computing and WebGL contexts."
    },
    {
        id: "INTEL-095",
        category: "AUTOMATION",
        title: "Scaling n8n Workflows for Enterprise",
        date: "2025.02.12",
        readTime: "6 MIN",
        access: "RESTRICTED",
        icon: Database,
        excerpt: "Strategies for handling high-throughput webhooks and error boundaries in low-code pipelines."
    },
    {
        id: "INTEL-096",
        category: "SECURITY",
        title: "Next.js Middleware Hardening Patterns",
        date: "2026.01.05",
        readTime: "8 MIN",
        access: "PUBLIC",
        icon: ShieldAlert,
        excerpt: "Advanced edge authentication techniques and bot mitigation strategies for public endpoints."
    }
]

export function Intelligence() {
    return (
        <section id="intelligence" className="relative py-32 min-h-screen flex flex-col justify-center overflow-hidden">

            {/* BACKGROUND: Tactical Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* HEADER: HUD Style */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
                    <div className="relative">
                        {/* Decorative HUD Lines */}
                        <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-accent/50 to-transparent hidden md:block" />
                        <div className="absolute -top-8 left-0 w-32 h-[1px] bg-gradient-to-r from-accent/50 to-transparent" />

                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-2 h-2 bg-accent animate-pulse" />
                            <span className="font-mono text-xs text-accent tracking-widest">SYSTEM_STATUS: ONLINE</span>
                        </div>

                        <h2 className="text-5xl md:text-7xl font-heading font-bold tracking-tighter text-white">
                            <span className="block mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
                                INTELLIGENCE
                            </span>
                        </h2>
                        <div className="h-1 w-full bg-accent/20 mt-2 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-accent"
                                initial={{ x: "-100%" }}
                                whileInView={{ x: "0%" }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                            />
                        </div>
                    </div>

                    <div className="md:text-right max-w-md">
                        <p className="font-mono text-sm text-white/40 leading-relaxed mb-4">
                            // ENCRYPTED_FIELD_REPORTS<br />
                            // ACCESS_LEVEL: CLEARANCE_REQ
                        </p>
                        <ScrambleText
                            text="Latest tactical insights and operational methodologies declassified for public review."
                            className="text-white/60"
                        />
                    </div>
                </div>

                {/* GRID: Holographic Cards */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, i) => (
                        <IntelCard key={article.id} article={article} index={i} />
                    ))}
                </div>

            </div>
        </section>
    )
}

function IntelCard({ article, index }: { article: any, index: number }) {
    const isRestricted = article.access === "RESTRICTED"
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-50px" })

    return (
        <motion.article
            ref={ref}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={cn(
                "group relative h-[400px] flex flex-col justify-between overflow-hidden cursor-pointer",
                "bg-black/40 backdrop-blur-md border transition-all duration-500",
                isRestricted
                    ? "border-red-500/20 hover:border-red-500/50 hover:bg-red-950/10"
                    : "border-white/10 hover:border-accent/50 hover:bg-accent/5"
            )}
        >
            {/* SCANLINE EFFECT: Moves down on hover */}
            <div className={cn(
                "absolute top-0 left-0 w-full h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20",
                isRestricted ? "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]" : "bg-accent shadow-[0_0_15px_rgba(34,197,94,0.8)]",
                "group-hover:animate-scan-vertical"
            )} />

            {/* CARD TOP: Metadata */}
            <div className="p-8 relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className={cn(
                        "font-mono text-[10px] px-2 py-1 border rounded tracking-wider flex items-center gap-2",
                        isRestricted ? "text-red-400 border-red-500/30 bg-red-500/10" : "text-accent border-accent/30 bg-accent/10"
                    )}>
                        {isRestricted ? <Lock className="w-3 h-3" /> : <article.icon className="w-3 h-3" />}
                        {article.id}
                    </div>
                    <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className={cn(
                                "w-1 h-1 rounded-full",
                                isRestricted ? "bg-red-500/30" : "bg-white/20"
                            )} />
                        ))}
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 leading-tight group-hover:translate-x-1 transition-transform duration-300">
                    {article.title}
                </h3>

                <p className="text-sm text-white/50 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {article.excerpt}
                </p>
            </div>

            {/* CARD BOTTOM: Actions */}
            <div className={cn(
                "p-6 border-t relative z-10 flex items-center justify-between font-mono text-xs",
                isRestricted ? "border-red-500/20 bg-red-950/20" : "border-white/5 bg-white/5"
            )}>
                <span className="text-white/40">{article.date}</span>
                <span className={cn(
                    "flex items-center gap-2 transition-colors",
                    isRestricted ? "text-red-500" : "text-accent group-hover:text-white"
                )}>
                    {isRestricted ? (
                        <>
                            <span className="animate-pulse">ACCESS_DENIED</span>
                            <Lock className="w-3 h-3" />
                        </>
                    ) : (
                        <>
                            READ_FILE
                            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-[2px] group-hover:-translate-y-[2px] transition-transform" />
                        </>
                    )}
                </span>
            </div>

            {/* Background Decoration */}
            <div className="absolute bottom-0 right-0 p-8 opacity-5 grayscale group-hover:grayscale-0 transition-all duration-500 pointer-events-none">
                <article.icon className={cn("w-32 h-32", isRestricted ? "text-red-500" : "text-accent")} />
            </div>

        </motion.article>
    )
}
