"use client"

import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, PerspectiveCamera, Stars, Grid, Sparkles, Line } from "@react-three/drei"
import { useMemo, useRef, useState, forwardRef, createRef, useEffect } from "react"
import * as THREE from "three"
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing"
import { useInView } from "framer-motion"

import { useInteraction } from "@/components/context/InteractionContext"
import { SceneFallback } from "./SceneFallback"

export type NodeData = {
    id: string
    title: string
    description: string
    position: [number, number, number]
}

export function Scene({ onNodeHover }: { onNodeHover?: (node: NodeData) => void }) {
    const { setActiveNode } = useInteraction()
    // const containerRef = useRef(null) // Removed
    // const isInView = useInView(containerRef, { margin: "100px" }) // Pause when 100px out of view // Removed

    // Generate nodes and refs in the same memo so they are stable
    const { nodes, nodeRefs } = useMemo(() => {
        const temp: NodeData[] = []
        const refs: React.RefObject<THREE.Mesh | null>[] = []

        const data = [
            { id: "SYS_01", title: "HIGH PERFORMANCE", description: "Zero-latency rendering with Next.js & Turbopack." },
            { id: "SYS_02", title: "CONVERSION READY", description: "Psychologically optimized layouts for maximum engagement." },
            { id: "SYS_03", title: "SECURE ARCHITECTURE", description: "Enterprise-grade encryption and data protection protocols." },
            { id: "SYS_04", title: "GLOBAL CDN", description: "Edge-deployed assets for millisecond load times worldwide." },
            { id: "SYS_05", title: "SEO DOMINANCE", description: "Semantic HTML5 structure engineered for search visibility." },
            { id: "SYS_06", title: "FLUID ANIMATION", description: "60FPS interactions powered by GSAP and React Three Fiber." },
            { id: "SYS_07", title: "SCALABLE BACKEND", description: "Serverless infrastructure that grows with your traffic." },
            { id: "SYS_08", title: "MODULAR DESIGN", description: "Component-driven architecture for rapid iteration." },
            { id: "SYS_09", title: "ANALYTICS INTEGRATED", description: "Real-time user behavior tracking and insights." },
            { id: "SYS_10", title: "ACCESSIBILITY FIRST", description: "WCAG 2.1 compliant interface for universal access." }
        ]

        for (let i = 0; i < 20; i++) {
            const item = data[i % data.length]
            temp.push({
                ...item,
                position: [
                    (Math.random() * 10) + 1,
                    (Math.random() - 0.5) * 8,
                    (Math.random() - 0.5) * 6 - 2
                ] as [number, number, number]
            })
            refs.push(createRef<THREE.Mesh>())
        }
        return { nodes: temp, nodeRefs: refs }
    }, [])

    const [isMobile, setIsMobile] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
        const checkMobile = () => {
            // Mobile/Tablet check: 1024px to cover iPads/Pro usage.
            // Also check for touch capability to be sure we aren't nuking desktop windows that are just resized small?
            // Actually, for performance, if it's small, kill the 3D scene regardless of input device.
            setIsMobile(window.innerWidth < 1024)
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    if (!mounted) return null

    // NUCLEAR OPTION: Mobile Fallback
    // If mobile, DO NOT MOUNT CANVAS. Return lightweight DOM fallback.
    if (isMobile) {
        return <SceneFallback />
    }

    return (
        <div className="absolute inset-0 z-0">
            {/* Pausing Logic: frameloop="never" when off-screen to stop RAF loop */}
            <Canvas
                dpr={[1, 1.5]}
                performance={{ min: 0.5 }}
                frameloop="always"
            >
                <PerspectiveCamera makeDefault position={[0, 0, 15]} fov={50} />

                <color attach="background" args={["#050505"]} />

                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00FF41" />

                {/* Dynamic Rotating Universe */}
                <StarField />

                {/* Network Layer + Floor Grid - Restricts to Hero Section via Scroll Logic */}
                <HeroSceneGroup
                    nodes={nodes}
                    nodeRefs={nodeRefs}
                    onNodeHover={(node) => {
                        setActiveNode(node)
                        onNodeHover?.(node)
                    }}
                />

                <EffectComposer>
                    <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} height={300} intensity={0.5} />
                    <Vignette eskil={false} offset={0.1} darkness={1.1} />
                </EffectComposer>
            </Canvas>
        </div>
    )
}

function StarField() {
    const ref = useRef<THREE.Group>(null)
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y -= delta * 0.005 // Very slow constant rotation
            ref.current.rotation.x -= delta * 0.002
        }
    })
    return (
        <group ref={ref}>
            <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={2} />
        </group>
    )
}

function HeroSceneGroup({ nodes, nodeRefs, onNodeHover }: { nodes: NodeData[], nodeRefs: React.RefObject<THREE.Mesh | null>[], onNodeHover?: (node: NodeData) => void }) {
    const groupRef = useRef<THREE.Group>(null)
    const { viewport, size } = useThree()

    useFrame(() => {
        if (!groupRef.current) return

        const scrollY = window.scrollY
        const ratio = viewport.height / size.height

        // Move entire group (Grid + Network) UP as we scroll DOWN
        groupRef.current.position.y = scrollY * ratio * 0.5

        const heroHeight = window.innerHeight
        // Just visibility toggle here. The parent component handles the loop stopping.
        groupRef.current.visible = scrollY < heroHeight * 1.5
    })

    return (
        <group ref={groupRef}>
            {/* Immersive Background Grid - Now part of Hero Scroll Group */}
            <Grid
                position={[0, -2, 0]}
                args={[50, 50]}
                cellSize={1}
                cellThickness={0.5}
                cellColor="#1a1a1a"
                sectionSize={5}
                sectionThickness={1}
                sectionColor="#333"
                fadeDistance={30}
                fadeStrength={1}
                infiniteGrid
            />

            {nodes.map((node, i) => (
                <NetworkNode
                    key={i}
                    ref={nodeRefs[i]}
                    data={node}
                    onHover={onNodeHover}
                    isAccent={i % 3 === 0}
                />
            ))}

            {/* Render live connections using a single efficient component */}
            <NetworkConnections
                nodeRefs={nodeRefs}
                count={nodes.length}
            />
        </group>
    )
}

// Optimized component that draws ALL lines in a single geometry to reduce draw calls
function NetworkConnections({ nodeRefs, count }: { nodeRefs: React.RefObject<THREE.Mesh | null>[], count: number }) {
    const linesGeometryRef = useRef<THREE.BufferGeometry>(null)

    // Throttling Ref
    const frameCount = useRef(0)

    // We need 2 points per line, and (count - 1) lines
    const lineCount = count - 1
    const particleCount = lineCount * 2

    // Pre-allocate position array
    const positions = useMemo(() => new Float32Array(particleCount * 3), [particleCount])

    // Temporary vector to avoid GC
    const tempVec = useMemo(() => new THREE.Vector3(), [])

    useFrame(() => {
        if (!linesGeometryRef.current) return

        // OPTIMIZATION (E): Loop Throttling & Off-screen Pausing
        // 1. Hard Stop: If scrolled past hero, do nothing.
        if (window.scrollY > window.innerHeight * 1.2) return

        // 2. Throttling: Only update every 3rd frame to save CPU
        frameCount.current++
        if (frameCount.current % 3 !== 0) return

        let validPoints = 0

        // Update positions based on current node positions
        for (let i = 0; i < lineCount; i++) {
            const startNode = nodeRefs[i].current
            const endNode = nodeRefs[i + 1].current

            if (startNode && endNode) {
                // Point 1
                startNode.getWorldPosition(tempVec)
                positions[i * 6] = tempVec.x
                positions[i * 6 + 1] = tempVec.y
                positions[i * 6 + 2] = tempVec.z

                // Point 2
                endNode.getWorldPosition(tempVec)
                positions[i * 6 + 3] = tempVec.x
                positions[i * 6 + 4] = tempVec.y
                positions[i * 6 + 5] = tempVec.z

                validPoints++
            }
        }

        // Mark as needing update
        linesGeometryRef.current.attributes.position.needsUpdate = true
    })

    return (
        <lineSegments>
            <bufferGeometry ref={linesGeometryRef}>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <lineBasicMaterial color="#ffffff" transparent opacity={0.1} linewidth={1} />
        </lineSegments>
    )
}

// ForwardRef to expose the internal mesh to the parent Scene
const NetworkNode = forwardRef<THREE.Mesh, { data: NodeData, onHover?: (n: NodeData) => void, isAccent: boolean }>(({ data, onHover, isAccent }, ref) => {
    // We expect ref to be provided from parent. In a real app we might merge refs.
    const [hovered, setHover] = useState(false)
    const color = isAccent ? "#00FF41" : "#D4D4D4"

    useFrame((state) => {
        // Optimization: Stop animating if off-screen
        if (window.scrollY > window.innerHeight * 1.2) return

        // Access current via the forwarded ref if needed for animation logic inside
        const mesh = (ref as React.MutableRefObject<THREE.Mesh>)?.current
        if (!mesh) return

        mesh.rotation.x += 0.01
        mesh.rotation.y += 0.01

        const targetScale = hovered ? 1.8 : 1 // Larger hover effect
        mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1)
    })

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <mesh
                ref={ref}
                position={data.position}
                onPointerOver={(e) => {
                    e.stopPropagation() // Prevent overlapping triggers
                    setHover(true)
                    document.body.style.cursor = "pointer"
                    onHover?.(data)
                }}
                onPointerOut={() => {
                    setHover(false)
                    document.body.style.cursor = "auto"
                }}
            >
                <octahedronGeometry args={[0.5, 0]} />
                <meshStandardMaterial
                    color={hovered ? "#ffffff" : color}
                    emissive={hovered ? "#ffffff" : color}
                    emissiveIntensity={hovered ? 2 : 0.5}
                    wireframe={true}
                />
            </mesh>
        </Float>
    )
})
NetworkNode.displayName = "NetworkNode"
