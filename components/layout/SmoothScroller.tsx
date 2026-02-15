"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
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
        const lenisInstance = new Lenis({
            duration: 1.0,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            touchMultiplier: 2,
        });

        setLenis(lenisInstance);

        function raf(time: number) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
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
