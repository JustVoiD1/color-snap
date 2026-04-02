"use client"

import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { useEffect } from "react"

export default function Counter({ duration, className }: { duration: number, className?: string }) {
    const count = useMotionValue(0)
    const formatted = useTransform(() => count.get().toFixed(2))

    useEffect(() => {
        const controls = animate(count, duration, {
            duration: duration,
            ease: [0.95, 0, 1, 1]
        })
        return () => controls.stop()
    }, [duration])

    return <motion.pre style={text} className={className}>{formatted}</motion.pre>
}

const text = {
    fontSize: 64,
    color: "white",
}
