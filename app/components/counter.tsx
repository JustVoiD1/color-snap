"use client"

import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { useEffect } from "react"

export default function Counter({ duration, className }: { duration: number, className?: string }) {
    const count = useMotionValue(0)
    const rounded = useTransform(() => Math.round(count.get()))
    const countSeconds = duration * 1000

    useEffect(() => {
        const controls = animate(count, countSeconds, {
            duration: 5,
            ease: "easeIn"
        })
        return () => controls.stop()
    }, [])

    return <motion.pre style={text} className={className}>{rounded}</motion.pre>
}

const text = {
    fontSize: 64,
    color: "white",
}
