"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Radio, Fingerprint, Globe, Wifi, Activity, Terminal } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { ScrambleText } from "@/components/ui/ScrambleText"
import { cn } from "@/lib/utils"

export function Signal() {
    const [formState, setFormState] = useState({
        designation: "",
        frequency: "",
        payload: ""
    })
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
    const [transmissionProgress, setTransmissionProgress] = useState(0)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('loading')
        setTransmissionProgress(0)

        // Simulated progress bar while fetching
        const progressInterval = setInterval(() => {
            setTransmissionProgress(prev => Math.min(prev + Math.random() * 10, 90))
        }, 100)

        const formData = new FormData()
        formData.append("access_key", "67d0a537-0c20-47ef-ba77-fdc3b41160f7")
        formData.append("name", formState.designation)
        formData.append("email", formState.frequency)
        formData.append("message", formState.payload)
        formData.append("from_name", "Inculc8 Signal Interface")
        formData.append("subject", `New Signal from ${formState.designation}`)

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })

            const result = await response.json()

            clearInterval(progressInterval)
            setTransmissionProgress(100)

            if (result.success) {
                setTimeout(() => {
                    setStatus('success')
                    setFormState({ designation: "", frequency: "", payload: "" })
                }, 500)
            } else {
                console.error('Web3Forms Error:', result)
                setStatus('error')
            }
        } catch (error) {
            console.error('Submission Error:', error)
            clearInterval(progressInterval)
            setStatus('error')
        }
    }

    return (
        <section id="signal" className="min-h-screen relative flex items-center justify-center py-20 overflow-hidden">

            {/* BACKGROUND: Global Holographic Map */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0),#000)] z-10" />
                {/* Simulated Dot Map - In production this could be a ThreeJS sphere or robust SVG */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vh] h-[120vh] border border-white/5 rounded-full animate-[spin_60s_linear_infinite]">
                    <div className="absolute inset-0 rounded-full border border-dashed border-white/5 opacity-50" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full border border-dotted border-accent/10" />
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-20">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* LEFT: Transmission Log & Brief */}
                    <div className="space-y-12">

                        {/* Status Header */}
                        <div className="flex items-center gap-4 text-xs font-mono text-accent/80 tracking-widest">
                            <div className="flex items-center gap-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                                </span>
                                SIGNAL_STRENGTH_100%
                            </div>
                            <div className="h-px flex-1 bg-gradient-to-r from-accent/50 to-transparent" />
                            <Wifi className="w-4 h-4" />
                        </div>

                        {/* Typing Hook */}
                        <div className="relative pl-6 border-l-2 border-accent/20">
                            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
                                <ScrambleText text="INITIATE" className="text-white" /> <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/20">
                                    TRANSMISSION
                                </span>
                            </h2>
                            <p className="text-lg text-white/60 leading-relaxed font-light max-w-md">
                                Priority Access Channel. We are actively scanning for elite partners ready to deploy advanced digital infrastructure.
                            </p>

                            {/* Decorative visualizer */}
                            <div className="mt-8 flex items-end gap-1 h-8 opacity-50">
                                {[...Array(20)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="w-1 bg-accent"
                                        animate={{ height: ["20%", "100%", "20%"] }}
                                        transition={{
                                            duration: 1,
                                            repeat: Infinity,
                                            delay: i * 0.05,
                                            ease: "easeInOut"
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Encryption Details - Enhanced Hover Effects */}
                        <div className="hidden lg:grid grid-cols-2 gap-4">
                            {[
                                {
                                    icon: Globe,
                                    label: "GLOBAL_REACH",
                                    content: <>LAT: 34.0522 N <br />LON: 118.2437 W</>,
                                    delay: 0
                                },
                                {
                                    icon: Fingerprint,
                                    label: "ENCRYPTION",
                                    content: <>AES-256-GCM <br />KEY_EXCHANGE: ECDH</>,
                                    delay: 0.1
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0.5, y: 10 }}
                                    whileInView={{ opacity: 0.5, y: 0 }} // Start dim
                                    whileHover={{ opacity: 1, scale: 1.02, backgroundColor: "rgba(34, 197, 94, 0.05)" }} // Brighten on hover
                                    transition={{ duration: 0.2 }}
                                    className="p-4 border border-white/10 bg-white/5 rounded backdrop-blur-sm cursor-crosshair group relative overflow-hidden"
                                >
                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite] pointer-events-none" />

                                    <div className="flex items-center gap-2 text-accent mb-2 relative z-10">
                                        <item.icon className="w-4 h-4 group-hover:animate-pulse group-hover:drop-shadow-[0_0_8px_rgba(34,197,94,0.5)] transition-all" />
                                        <span className="text-xs font-mono tracking-wider group-hover:text-white transition-colors">{item.label}</span>
                                    </div>
                                    <div className="text-[10px] font-mono text-white/50 group-hover:text-white/80 transition-colors relative z-10">
                                        {item.content}
                                    </div>

                                    {/* Tech Corners */}
                                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </motion.div>
                            ))}
                        </div>

                    </div>


                    {/* RIGHT: Uplink Console (Form) */}
                    <div className="relative">
                        {/* Frame Decorations */}
                        <div className="absolute -inset-1 bg-gradient-to-b from-accent/20 via-transparent to-accent/20 rounded-lg opacity-50 blur-sm pointer-events-none" />

                        <div className="relative bg-black/80 backdrop-blur-xl border border-white/10 p-1 rounded-lg overflow-hidden min-h-[500px] flex flex-col">
                            {/* Scanline Overlay */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_2px,3px_100%] pointer-events-none" style={{ backgroundSize: "100% 2px, 3px 100%" }} />

                            <div className="relative z-10 bg-black/40 p-8 md:p-10 space-y-8 flex-grow flex flex-col justify-center">

                                <AnimatePresence mode="wait">
                                    {status === 'success' ? (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            className="text-center space-y-6 py-12"
                                        >
                                            <div className="w-20 h-20 rounded-full bg-accent/10 border border-accent/50 flex items-center justify-center mx-auto mb-8 animate-[pulse_3s_infinite]">
                                                <Send className="w-8 h-8 text-accent" />
                                            </div>
                                            <div className="space-y-2">
                                                <h3 className="text-2xl font-heading font-bold text-white tracking-widest">
                                                    UPLINK_ESTABLISHED
                                                </h3>
                                                <p className="font-mono text-xs text-accent uppercase tracking-widest animate-pulse">
                                                    TRANSMISSION SUCCESSFULLY LOGGED
                                                </p>
                                            </div>
                                            <p className="text-white/40 font-light text-sm max-w-xs mx-auto">
                                                Stand by. Inculc8 Operatives will review your payload and initiate contact shortly.
                                            </p>

                                            <Button
                                                variant="outline"
                                                className="mt-8 border-accent/20 hover:bg-accent/10 text-accent font-mono text-xs"
                                                onClick={() => setStatus('idle')}
                                            >
                                                [ INITIATE_NEW_STREAM ]
                                            </Button>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="form"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="space-y-8"
                                        >
                                            {/* Form Header */}
                                            <div className="flex justify-between items-center border-b border-white/10 pb-6">
                                                <div className="flex items-center gap-2 text-accent">
                                                    <Terminal className="w-5 h-5" />
                                                    <span className="font-mono text-sm tracking-wider">UPLINK_CONSOLE_V4</span>
                                                </div>
                                                <div className="flex gap-1">
                                                    <div className="w-2 h-2 rounded-full bg-red-500/50" />
                                                    <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                                                    <div className="w-2 h-2 rounded-full bg-green-500" />
                                                </div>
                                            </div>

                                            <form onSubmit={handleSubmit} className="space-y-6">
                                                <div className="space-y-6">
                                                    <div className="group relative">
                                                        <input
                                                            type="text"
                                                            required
                                                            className="peer w-full bg-white/5 border border-white/10 p-4 pl-12 focus:border-accent text-white outline-none transition-all focus:bg-white/10 disabled:opacity-50"
                                                            placeholder=" "
                                                            value={formState.designation}
                                                            onChange={(e) => setFormState({ ...formState, designation: e.target.value })}
                                                            disabled={status === 'loading'}
                                                        />
                                                        <label className="absolute left-12 top-4 text-white/40 text-sm transition-all peer-focus:-top-3 peer-focus:left-0 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-accent">
                                                            ID / DESIGNATION
                                                        </label>
                                                        <Fingerprint className="absolute left-4 top-4 w-5 h-5 text-white/20 peer-focus:text-accent transition-colors" />
                                                        {/* Focus Corner Accents */}
                                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent opacity-0 peer-focus:opacity-100 transition-opacity" />
                                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent opacity-0 peer-focus:opacity-100 transition-opacity" />
                                                    </div>

                                                    <div className="group relative">
                                                        <input
                                                            type="email"
                                                            required
                                                            className="peer w-full bg-white/5 border border-white/10 p-4 pl-12 focus:border-accent text-white outline-none transition-all focus:bg-white/10 disabled:opacity-50"
                                                            placeholder=" "
                                                            value={formState.frequency}
                                                            onChange={(e) => setFormState({ ...formState, frequency: e.target.value })}
                                                            disabled={status === 'loading'}
                                                        />
                                                        <label className="absolute left-12 top-4 text-white/40 text-sm transition-all peer-focus:-top-3 peer-focus:left-0 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-accent">
                                                            CONTACT FREQUENCY (EMAIL)
                                                        </label>
                                                        <Radio className="absolute left-4 top-4 w-5 h-5 text-white/20 peer-focus:text-accent transition-colors" />
                                                        {/* Focus Corner Accents */}
                                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent opacity-0 peer-focus:opacity-100 transition-opacity" />
                                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent opacity-0 peer-focus:opacity-100 transition-opacity" />
                                                    </div>

                                                    <div className="group relative">
                                                        <textarea
                                                            required
                                                            rows={4}
                                                            className="peer w-full bg-white/5 border border-white/10 p-4 pl-12 focus:border-accent text-white outline-none transition-all focus:bg-white/10 resize-none disabled:opacity-50"
                                                            placeholder=" "
                                                            value={formState.payload}
                                                            onChange={(e) => setFormState({ ...formState, payload: e.target.value })}
                                                            disabled={status === 'loading'}
                                                        />
                                                        <label className="absolute left-12 top-4 text-white/40 text-sm transition-all peer-focus:-top-3 peer-focus:left-0 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-accent">
                                                            MISSION PAYLOAD
                                                        </label>
                                                        <Activity className="absolute left-4 top-4 w-5 h-5 text-white/20 peer-focus:text-accent transition-colors" />
                                                        {/* Focus Corner Accents */}
                                                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-accent opacity-0 peer-focus:opacity-100 transition-opacity" />
                                                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-accent opacity-0 peer-focus:opacity-100 transition-opacity" />
                                                    </div>
                                                </div>

                                                <Button
                                                    variant="primary"
                                                    size="lg"
                                                    className="w-full relative overflow-hidden"
                                                    icon={status !== 'loading' && <Send size={16} />}
                                                    disabled={status === 'loading'}
                                                >
                                                    <span className="relative z-10">
                                                        {status === 'loading' ? `TRANSMITTING... ${Math.floor(transmissionProgress)}%` : "ESTABLISH UPLINK"}
                                                    </span>
                                                    {status === 'loading' && (
                                                        <motion.div
                                                            className="absolute inset-0 bg-white/20"
                                                            initial={{ width: "0%" }}
                                                            animate={{ width: `${transmissionProgress}%` }}
                                                        />
                                                    )}
                                                </Button>

                                                {status === 'error' && (
                                                    <motion.p
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="text-red-500 text-xs font-mono text-center"
                                                    >
                                                        ERROR: TRANSMISSION_FAILED. RETRY_UPLINK.
                                                    </motion.p>
                                                )}
                                            </form>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Console Footer */}
                                <div className="pt-6 border-t border-white/5 flex justify-between text-[10px] font-mono text-white/30">
                                    <div className="flex flex-col gap-1">
                                        <span>STATUS: {status === 'loading' ? 'UPLOADING...' : 'WAITING_FOR_INPUT'}</span>
                                        <span>LATENCY: 12ms</span>
                                    </div>
                                    <div className="text-right flex flex-col gap-1">
                                        <span>SECURE_CONNECTION</span>
                                        <span className="text-accent">VERIFIED</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
