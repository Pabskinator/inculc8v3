"use client"

import { Github, Twitter, Linkedin, Activity, Globe } from "lucide-react"
import { Logo } from "@/components/ui/Logo"

export function Footer() {
    return (
        <footer className="relative bg-black py-12 md:py-20 border-t border-white/5 overflow-hidden">

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_at_top,black_40%,transparent_70%)] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid md:grid-cols-4 gap-12 mb-16">

                    {/* BRAND COL */}
                    <div className="col-span-1 md:col-span-2 space-y-6">
                        <div className="flex items-center gap-2">
                            <Logo className="scale-90 origin-left" />
                        </div>
                        <p className="text-white/40 font-light max-w-sm leading-relaxed text-sm">
                            Advancing digital infrastructure through autonomous systems and high-fidelity interfaces. Deployment ready for global operations.
                        </p>
                        <div className="flex items-center gap-2 text-[10px] font-mono text-accent/60 bg-accent/5 self-start px-2 py-1 rounded border border-accent/10 inline-flex">
                            <Activity className="w-3 h-3" />
                            SYSTEMS_OPTIMIZED
                        </div>
                    </div>

                    {/* LINKS COL 1 */}
                    <div className="space-y-4">
                        <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest">SITEMAP</h4>
                        <ul className="space-y-2 text-sm text-white/60 font-light">
                            <li><a href="#hero" className="hover:text-accent transition-colors">Main Console</a></li>
                            <li><a href="#systems" className="hover:text-accent transition-colors">Systems</a></li>
                            <li><a href="#projects" className="hover:text-accent transition-colors">Deployments</a></li>
                            <li><a href="#method" className="hover:text-accent transition-colors">Methodology</a></li>
                            <li><a href="#intelligence" className="hover:text-accent transition-colors">Intelligence</a></li>
                        </ul>
                    </div>

                    {/* LINKS COL 2 (SOCIAL) */}
                    <div className="space-y-4">
                        <h4 className="font-mono text-xs text-white/40 uppercase tracking-widest">CONNECT</h4>
                        <div className="flex flex-col gap-2">
                            <a href="#" className="flex items-center gap-3 text-sm text-white/60 hover:text-white group transition-colors p-2 -ml-2 rounded hover:bg-white/5">
                                <Twitter className="w-4 h-4 group-hover:text-accent transition-colors" />
                                <span>X / Twitter</span>
                            </a>
                            <a href="#" className="flex items-center gap-3 text-sm text-white/60 hover:text-white group transition-colors p-2 -ml-2 rounded hover:bg-white/5">
                                <Github className="w-4 h-4 group-hover:text-accent transition-colors" />
                                <span>GitHub</span>
                            </a>
                            <a href="#" className="flex items-center gap-3 text-sm text-white/60 hover:text-white group transition-colors p-2 -ml-2 rounded hover:bg-white/5">
                                <Linkedin className="w-4 h-4 group-hover:text-accent transition-colors" />
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>

                </div>

                {/* BOTTOM BAR */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-mono text-white/20">
                    <div className="flex items-center gap-4">
                        <span>© 2026 INCULC8 SOLUTIONS LLC</span>
                        <span className="hidden md:inline">|</span>
                        <span>ALL RIGHTS RESERVED</span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="flex items-center gap-2">
                            <Globe className="w-3 h-3" />
                            GLOBAL_NODE: NY_01
                        </span>
                        <span>PRIVACY_PROTOCOL_V2</span>
                    </div>
                </div>

            </div>
        </footer>
    )
}
