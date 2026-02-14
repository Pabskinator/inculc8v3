import { cn } from "@/lib/utils"

interface LogoProps {
    className?: string
    mono?: boolean
}

export function Logo({ className, mono = false }: LogoProps) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            {/* The Mark: Octagon with Central Pillar (I8) */}
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 text-accent"
            >
                {/* Outer Octagon Frame */}
                <path
                    d="M30 10 L70 10 L90 30 L90 70 L70 90 L30 90 L10 70 L10 30 L30 10 Z"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="opacity-100"
                />

                {/* Inner Pilla/Slit (The 'I') */}
                <rect x="42" y="25" width="16" height="50" fill="currentColor" />

                {/* Tactical Cutouts */}
                <rect x="0" y="45" width="10" height="10" fill="black" />
                <rect x="90" y="45" width="10" height="10" fill="black" />
            </svg>

            {/* Text Lockup */}
            {!mono && (
                <span className="font-heading font-bold text-white tracking-widest text-lg">
                    INCULC<span className="text-accent">8</span>
                </span>
            )}
        </div>
    )
}
