"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useMobile } from "@/hooks/use-mobile"

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
    scrambleSpeed = 50,
    revealSpeed = 50,
    delay = 0
}: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState(text.split("").map(() => "_").join(""))
    const [isComplete, setIsComplete] = useState(false)
    const ref = useRef<HTMLSpanElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const isMobile = useMobile()

    useEffect(() => {
        // Optimization: On mobile/tablet, skip animation entirely
        if (isMobile) {
            setDisplayText(text)
            setIsComplete(true)
            return
        }

        if (!isInView) return

        let frameId: number
        let timeoutId: NodeJS.Timeout

        // Start after delay
        timeoutId = setTimeout(() => {
            let iteration = 0

            // Optimization: Use setInterval instead of RAF to throttle updates
            // Running at ~33fps (30ms) for faster but still throttled updates
            const intervalId = setInterval(() => {
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
                    iteration += 1 / (revealSpeed / scrambleSpeed)
                } else {
                    setDisplayText(text)
                    setIsComplete(true)
                    clearInterval(intervalId)
                }
            }, 30) // 30ms throttle

            // Store interval id to clear if unmounted
            frameId = Number(intervalId)

        }, delay)

        return () => {
            clearTimeout(timeoutId)
            clearInterval(frameId)
        }
    }, [isInView, text, delay, revealSpeed, scrambleSpeed, isMobile])

    return (
        <span ref={ref} className={`${className} inline-block`}>
            {displayText}
            {!isComplete && <span className="animate-pulse text-accent ml-1">_</span>}
        </span>
    )
}
