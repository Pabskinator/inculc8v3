"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

const CYPHER_CHARS = "ABCDEF0123456789_!@#$%"

interface ScrambleTextProps {
    text: string
    className?: string
    scrambleSpeed?: number
    revealSpeed?: number
    delay?: number
}

export function ScrambleText({
    text,
    className = "",
    scrambleSpeed = 30,
    revealSpeed = 100,
    delay = 0
}: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState(text.split("").map(() => "_").join(""))
    const [isComplete, setIsComplete] = useState(false)
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    useEffect(() => {
        if (!isInView) return

        let frameId: number
        let timeoutId: NodeJS.Timeout

        // Start after delay
        timeoutId = setTimeout(() => {
            let iteration = 0

            const animate = () => {
                const result = text
                    .split("")
                    .map((char, index) => {
                        if (index < iteration) {
                            return text[index]
                        }
                        return CYPHER_CHARS[Math.floor(Math.random() * CYPHER_CHARS.length)]
                    })
                    .join("")

                setDisplayText(result)

                if (iteration < text.length) {
                    iteration += 1 / (revealSpeed / scrambleSpeed) // Control speed of reveal vs scramble
                    frameId = requestAnimationFrame(animate)
                } else {
                    setDisplayText(text)
                    setIsComplete(true)
                }
            }

            frameId = requestAnimationFrame(animate)
        }, delay)

        return () => {
            clearTimeout(timeoutId)
            cancelAnimationFrame(frameId)
        }
    }, [isInView, text, delay, revealSpeed, scrambleSpeed])

    return (
        <span ref={ref} className={`${className} inline-block`}>
            {displayText}
            {!isComplete && <span className="animate-pulse text-accent ml-1">_</span>}
        </span>
    )
}
