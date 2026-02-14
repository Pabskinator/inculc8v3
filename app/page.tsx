import { Hero } from "@/components/sections/Hero"
import { Navbar } from "@/components/layout/Navbar"
import { Systems } from "@/components/sections/Systems"
import { Projects } from "@/components/sections/Projects"
import { Signal } from "@/components/sections/Signal"
import { Method } from "@/components/sections/Method"
import { Intelligence } from "@/components/sections/Intelligence"

import { TacticalTelemetry } from "@/components/sections/TacticalTelemetry"
import { GlobalBackground } from "@/components/layout/GlobalBackground"
import { Footer } from "@/components/layout/Footer"

import { InteractionProvider } from "@/components/context/InteractionContext"

import { ScrollToTop } from "@/components/ui/ScrollToTop"

export default function Home() {
  return (
    <InteractionProvider>
      <main className="flex min-h-screen flex-col bg-[#050505] selection:bg-accent/30 relative">
        <Navbar />

        {/* Global 3D Background */}
        <GlobalBackground />

        <div className="relative z-10 w-full pointer-events-none">
          <Hero />
          <div className="pointer-events-auto w-full">
            <TacticalTelemetry />
            <Systems />
            <Projects />
            <Method />
            <Intelligence />
            <Signal />
            <Footer />
          </div>
        </div>

        {/* Ascent Module */}
        <ScrollToTop />
      </main>
    </InteractionProvider>
  )
}
