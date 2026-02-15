"use client"

import { useEffect, useState } from "react"

export function SceneFallback() {
    return (
        <div className="absolute inset-0 z-0 bg-[#050505] overflow-hidden">
            {/* Static Background Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1a1a1a] via-[#050505] to-[#050505] opacity-40" />

            {/* CSS Stars - Lightweight standard CSS animation/positioning */}
            <div className="stars-fallback absolute inset-0 opacity-50">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute bg-white rounded-full animate-pulse"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: Math.random() > 0.5 ? '2px' : '1px',
                            height: Math.random() > 0.5 ? '2px' : '1px',
                            opacity: Math.random() * 0.5 + 0.1,
                            animationDuration: `${Math.random() * 3 + 2}s`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Grid Overlay - Simple CSS Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] opacity-30 pointer-events-none" />

            {/* Accent Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/5 blur-[100px] rounded-full pointer-events-none" />
        </div>
    )
}
