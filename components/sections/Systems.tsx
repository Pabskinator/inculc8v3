"use client"

import { motion } from "framer-motion"
import { Monitor, Cpu, Network, ArrowRight, Activity, Database, Lock } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

const modules = [
    {
        id: "01",
        label: "LEAD VELOCITY",
        value: "842",
        unit: "leads/mo",
        sub: "Real-time sync active",
        color: "#3B82F6", // Blue
        chartColor: "bg-blue-500",
        bars: [40, 60, 45, 80, 55, 90, 70, 85, 60, 75]
    },
    {
        id: "02",
        label: "CONVERSION LIFT",
        value: "+14.2",
        unit: "%",
        sub: "A/B Delta Optimal",
        color: "#8B5CF6", // Purple
        chartColor: "bg-purple-500",
        bars: [20, 35, 30, 50, 45, 60, 55, 70, 65, 80]
    },
    {
        id: "03",
        label: "SYSTEM UPTIME",
        value: "99.99",
        unit: "%",
        sub: "Edge-Global Active",
        color: "#10B981", // Emerald
        chartColor: "bg-emerald-500",
        bars: [95, 98, 96, 99, 97, 100, 98, 99, 97, 100]
    },
    {
        id: "04",
        label: "OPEX SAVED",
        value: "$4.2K",
        unit: "rescued",
        sub: "ROI Maximized",
        color: "#F59E0B", // Amber
        chartColor: "bg-amber-500",
        bars: [30, 45, 40, 55, 50, 65, 60, 75, 70, 85]
    }
]

export function Systems() {
    const isMobile = useMobile()

    return (
        <section id="systems" className="relative py-32 w-full bg-transparent overflow-hidden border-t border-white/5">

            <div className="container mx-auto px-4 md:px-6 relative z-10">

                {/* Main Window Container */}
                <div className={`relative w-full bg-[#0A0A0A]/60 ${isMobile ? 'backdrop-blur-md' : 'backdrop-blur-2xl'} border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl`}>

                    {/* Window Controls & Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 relative z-20">
                        {/* Traffic Lights */}
                        <div className="flex gap-3">
                            <div className="w-3 h-3 rounded-full bg-white/20" />
                            <div className="w-3 h-3 rounded-full bg-white/10" />
                            <div className="w-3 h-3 rounded-full bg-white/10" />
                        </div>

                        {/* Status Lines */}
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-3">
                                <span className="font-mono text-white/20 text-xs tracking-[0.2em] uppercase">SIG_INT_RECEPTION_STABLE</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                                <span className="font-mono text-blue-500 text-xs tracking-widest uppercase">LIVE_TELEMETRY_TX</span>
                            </div>
                        </div>
                    </div>

                    {/* Background Watermark */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 w-full pointer-events-none select-none flex justify-center items-center">
                        <span className="text-[10vw] md:text-[120px] font-heading font-black text-white/[0.02] tracking-tighter whitespace-nowrap">
                            NEURAL SIGNAL
                        </span>
                    </div>

                    {/* Reference Grid Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {modules.map((mod, i) => (
                            <div
                                key={mod.id}
                                className="group relative h-[400px] flex flex-col justify-between bg-[#0A0A0A]/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-white/20 transition-colors duration-500 hover:shadow-lg hover:shadow-[0_0_30px_-10px_rgba(0,0,0,0.5)]"
                                style={{
                                    boxShadow: `0 0 0 1px ${mod.color}05` // Subtle colored border hint
                                }}
                            >
                                {/* Top Gradient Glow */}
                                <div
                                    className="absolute top-0 left-0 right-0 h-[1px] opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: `linear-gradient(90deg, transparent, ${mod.color}, transparent)` }}
                                />
                                <div
                                    className="absolute top-0 left-0 right-0 h-32 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                                    style={{ background: `linear-gradient(180deg, ${mod.color}, transparent)` }}
                                />

                                <div className="p-6 relative z-10 flex-grow flex flex-col">
                                    {/* Header Label */}
                                    <div className="font-mono text-white/40 text-[10px] uppercase tracking-widest mb-4">
                                        {mod.label}
                                    </div>

                                    {/* Main Metric */}
                                    <div className="mb-2">
                                        <span className="text-5xl font-heading font-bold text-white tracking-tighter">
                                            {mod.value}
                                        </span>
                                        <span className="text-sm font-mono text-white/40 ml-2">
                                            {mod.unit}
                                        </span>
                                    </div>

                                    {/* Subtitle */}
                                    <div className="text-xs font-mono" style={{ color: mod.color }}>
                                        {mod.sub}
                                    </div>
                                </div>

                                {/* Live Bar Chart Area */}
                                <div className="relative h-24 mt-auto px-6 pb-6 flex items-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity duration-500">
                                    {(isMobile ? mod.bars.slice(0, 6) : mod.bars).map((height, idx) => (
                                        <Bar key={idx} height={height} color={mod.chartColor} index={idx} />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}

function Bar({ height, color, index }: { height: number, color: string, index: number }) {
    // CSS-driven animation (Deterministic to fix hydration mismatch)
    const duration = 1.5 + (index % 5) * 0.2;
    const delay = (index % 10) * 0.1;

    return (
        <div
            className={`w-full rounded-sm ${color}`}
            style={{
                height: `${height}%`,
                animationName: "equalizer",
                animationDuration: `${duration}s`,
                animationTimingFunction: "ease-in-out",
                animationIterationCount: "infinite",
                animationDelay: `${delay}s`
            }}
        />
    )
}
