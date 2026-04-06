'use client'
import { cn } from '@/lib/utils';
import { motion } from 'motion/react'
import React from 'react'
const HeroSpan = ({ content, to, className, delay = 0
}: {
    content: string,
    to: "left" | "right",
    className?: string,
    delay?: number
}) => {
    const initialY = 40

    return (
        <motion.span
            initial={{ opacity: 0, y: initialY, filter: "blur(20px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
                duration: 0.7,
                ease: "easeInOut",
                delay
            }}
            className={cn("block", className)}
        >
            {content}
        </motion.span>
    );
};

export default HeroSpan