"use client"
import { cn } from "@/lib/utils"
import { animate, motion, useMotionValue, useTransform } from "motion/react"
import { useEffect } from "react"

type AnimatedNumberProps = {
    delay?: number
    duration: number
    content: number
    className?: string
}

export default function AnimatedNumber({
    delay,
    duration,
    content,
    className
}: AnimatedNumberProps) {

    const count = useMotionValue(0)

    // const formatted = useTransform(() => count.get().toFixed(2))
    const formatted = useTransform(() => {
        const value = count.get()
        return Number.isInteger(content) ? Math.round(value).toString() : value.toFixed(2)
    })

    useEffect(() => {
        const controls = animate(count, content, {
            delay,
            duration,
            ease: [0, 0, 0.05, 1]
        })

        return () => controls.stop()
    }, [content, duration, delay])

    return (
        <motion.span className={cn(
            'tabular-nums',
            className
            )}>
            {formatted}
        </motion.span>
    )
}