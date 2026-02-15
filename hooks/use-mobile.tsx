
import * as React from "react"

export function useMobile() {
    const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

    React.useEffect(() => {
        const mql = window.matchMedia("(max-width: 1023px)") // Covers mobile and tablet (iPad vertical/horizontal)
        const onChange = () => {
            setIsMobile(window.innerWidth < 1024)
        }
        mql.addEventListener("change", onChange)
        setIsMobile(window.innerWidth < 1024)
        return () => mql.removeEventListener("change", onChange)
    }, [])

    return !!isMobile
}
