"use client"

import { motion, MotionValue, useTransform, useMotionValue } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

export function CyberGrid({ scrollYProgress }: { scrollYProgress?: MotionValue<number> }) {
    const isMobile = useMobile()
    // Default motion value if none provided
    const defaultMotion = useMotionValue(0)
    const scroll = scrollYProgress || defaultMotion

    // OPTIMIZED PERF: Removed dynamic rotateX to prevent constant re-rasterization
    // 1. Grid moves significantly
    const gridY = useTransform(scroll, [0, 1], ["-20%", "20%"])

    // 2. Scale "zooms out" reveals the grid (Cheaper than perspective change)
    const gridScale = useTransform(scroll, [0, 1], [1.5, 1])

    // 3. Background Opacity for fade in/out
    const gridOpacity = useTransform(scroll, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

    // 4. Floating ceiling moves in OPPOSITE direction for depth
    const ceilingY = useTransform(scroll, [0, 1], ["0%", "-40%"])

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-[#050505]">

            {/* 1. Base Moving Grid (Floor) - Hardware Accelerated */}
            <motion.div
                style={{ y: gridY, rotateX: 60, scale: gridScale, opacity: gridOpacity }}
                className="absolute inset-[-50%] origin-top will-change-transform"
            >
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(0, 255, 65, 0.1) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 255, 65, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px',
                        transform: 'perspective(500px)',
                    }}
                />
            </motion.div>

            {/* 2. Floating "Data" Grid (Ceiling) - FASTER MOVEMENT */}
            <motion.div
                style={{ y: ceilingY, rotateX: 45, opacity: 0.15 }}
                className="absolute inset-[-50%] will-change-transform"
            >
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `radial-gradient(circle, rgba(0, 255, 65, 0.2) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px',
                        transform: 'perspective(500px) rotate(180deg)', // Inverted ceiling
                    }}
                />
            </motion.div>

            {/* 3. Scanning Laser Line */}
            <motion.div
                animate={{ top: ["0%", "100%"], opacity: [0, 1, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00FF41] to-transparent shadow-[0_0_20px_rgba(0,255,65,0.5)] z-10"
            />

            {/* 4. Ambient "Searchlight" Beam - DISABLED ON MOBILE */}
            {!isMobile && (
                <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150vmax] h-[150vmax] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(0,255,65,0.05)_20deg,transparent_40deg)] opacity-40 pointer-events-none mix-blend-screen"
                />
            )}

            {/* 5. Vignette & Fog for depth */}
            <div className="absolute inset-0 bg-radial-gradient(circle at center, transparent 0%, #050505 90%) pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505] pointer-events-none" />
        </div>
    )
}
