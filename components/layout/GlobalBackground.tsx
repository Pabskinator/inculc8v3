"use client"

import dynamic from "next/dynamic"

const Scene = dynamic(() => import("@/components/canvas/Scene").then((mod) => mod.Scene), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#050505]" />
})

export function GlobalBackground() {
    return (
        <div className="fixed inset-0 z-0">
            <Scene />
        </div>
    )
}
