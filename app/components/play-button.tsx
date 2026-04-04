"use client"
import { cn } from '@/lib/utils'
import { motion } from 'motion/react'
import Link from 'next/link'

const PlayButton = () => {
    return (
        <Link href={'/play'}>
            <motion.button
            whileTap={{
                scale: 0.85
            }} className={cn(
                "min-w-30 px-5 py-3 bg-white text-black rounded-2xl text-2xl",
                "shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
                "hover:shadow-[0_4px_10px_rgba(8,112,184,0.9)] hover:bg-[rgb(1,213,255)] hover:scale-105",
                "transition-all duration-300"
            )}>Play</motion.button>
        </Link>
    )
}

export default PlayButton