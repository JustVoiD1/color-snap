'use client'
import { useContext, useEffect, useRef, useState } from 'react'
import { ColorContext } from '../context/color-context'
import { HSBColor } from '@/lib/types'
import { hsbToRgb } from '@/lib/tools'
import Counter from './counter'
import { GameContext } from '../context/game-context'
import { motion, useAnimate } from 'motion/react'
import { getContrastText } from './result-card'
export const generateRandomColor = (): HSBColor => {
    const h = Math.floor(Math.random() * 361)
    const s = Math.floor(Math.random() * 101)
    const b = Math.floor(Math.random() * 101)
    return { h, s, b }
}
const Target = () => {
    const [scope, animate] = useAnimate()
    const [showCounter, setShowCounter] = useState(false)
    const timerRef = useRef<NodeJS.Timeout>(null)
    const startAnimation = async () => {
        if (!scope.current) return

        await animate(scope.current, {
            backgroundColor: "#000"
        }, { duration: 0 })

        await animate(".ready", { opacity: [0, 1, 0], display: ["none", "block", "none"] }, { duration: 1 })
        await animate(".set", { opacity: [0, 1, 0], display: ["none", "block", "none"] }, { duration: 1 })
        animate(".go", { opacity: [0, 1, 0], display: ["none", "block", "none"] }, { duration: 1 })

        // setTargetColor(prev => generateRandomColor())
        const newColor = generateRandomColor()
        setTargetColor(newColor)

        const rgb = hsbToRgb(newColor.h, newColor.s, newColor.b)

        setShowCounter(true)
        await animate(scope.current, {
            backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
        }, { duration: 0.3 })

        timerRef.current = setTimeout(() => {
            setPhase("game")
        }, 5000)





    }
    const gameContext = useContext(GameContext)
    if (!gameContext) {
        throw new Error("Target must be used within ColorProvider")
    }
    const colorContext = useContext(ColorContext)
    if (!colorContext) {
        throw new Error("Target must be used within ColorProvider")
    }
    const { targetColor, setTargetColor } = colorContext

    const { round, setPhase } = gameContext
    const targetRgb = hsbToRgb(targetColor.h, targetColor.s, targetColor.b)
    const targetTextColor = getContrastText(targetRgb.r, targetRgb.g, targetRgb.b)

    useEffect(() => {
        const id = requestAnimationFrame(() => {
            startAnimation()
        })


        return () => {
            cancelAnimationFrame(id)
            if (timerRef.current) {
                clearTimeout(timerRef.current)
            }
            // setTargetColor(prev => prev)

        }
    }, [round])
    return (
        <div ref={scope} className={`relative w-4xl h-full text-black text-center overflow-hidden font-[suisse]`}
        // style={{
        //     backgroundColor: `rgb(${targetRgb.r}, ${targetRgb.g}, ${targetRgb.b})`,
        // }}
        >
            <span className='absolute top-5 left-5 text-lg'
                style={{
                    color: targetTextColor
            }}
            >{round}/5</span>
            <div className="absolute inset-0 h-full mx-auto flex justify-center items-center text-4xl font-bold">
                <motion.div className="ready text-white opacity-0"
                    initial={{
                        opacity: 0,
                        display: "none"
                    }}
                >Ready...
                </motion.div>
                <motion.div
                    initial={{
                        opacity: 0,
                        display: "none"
                    }}
                    className="set text-white opacity-0">Set...</motion.div>
                <motion.div
                    initial={{
                        opacity: 0,
                        display: "none"
                    }}
                    className="go text-white opacity-0 uppercase">Go!</motion.div>

            </div>
            {showCounter && <Counter duration={5} color={targetTextColor} className='absolute top-2 right-5 w-fit h-fit' />}
        </div>
    )
}

export default Target