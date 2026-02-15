"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

export function SmoothScroller({ children }: { children: React.ReactNode }) {
    const [lenis, setLenis] = useState<Lenis | null>(null);
    const pathname = usePathname();

    useEffect(() => {
        if (lenis) {
            lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname, lenis]);

    useEffect(() => {
        // Mobile Optimization: Disable custom smooth scroll on touch devices to use native acceleration
        // We use a broader check to catch tablets
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024;

        if (isTouch) {
            document.documentElement.classList.add('lenis-stopped'); // Helper for CSS if needed
            return;
        }

        const lenisInstance = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });

        setLenis(lenisInstance);

        // GSAP Integration: Use GSAP's ticker for a single unified RAF loop
        // This solves the "multiple RAF loops" performance bottleneck
        function update(time: number, deltaTime: number, frame: number) {
            lenisInstance.raf(time * 1000);
        }

        gsap.ticker.add(update);

        return () => {
            gsap.ticker.remove(update);
            lenisInstance.destroy();
            setLenis(null);
        };
    }, []);

    return (
        <LenisContext.Provider value={lenis}>
            {children}
        </LenisContext.Provider>
    );
}
