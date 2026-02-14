"use client"

import { createContext, useContext, useState, ReactNode } from "react"

// Define the NodeData type here or import it if better, but for context it helps to be self contained or import shared.
// For now, I'll import from Scene to ensure type consistency, or redefine if Scene exports it.
// Scene exports NodeData.
import { NodeData } from "@/components/canvas/Scene"

interface InteractionContextType {
    activeNode: NodeData | null
    setActiveNode: (node: NodeData | null) => void
}

const InteractionContext = createContext<InteractionContextType | undefined>(undefined)

export function InteractionProvider({ children }: { children: ReactNode }) {
    const [activeNode, setActiveNode] = useState<NodeData | null>(null)

    return (
        <InteractionContext.Provider value={{ activeNode, setActiveNode }}>
            {children}
        </InteractionContext.Provider>
    )
}

export function useInteraction() {
    const context = useContext(InteractionContext)
    if (context === undefined) {
        throw new Error("useInteraction must be used within an InteractionProvider")
    }
    return context
}
