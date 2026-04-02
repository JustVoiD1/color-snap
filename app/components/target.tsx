'use client'
import { useContext, useEffect } from 'react'
import { ColorContext } from '../context/color-context'
import { HSBColor } from '@/lib/types'
import { hsbToRgb } from '@/lib/tools'
import Counter from './counter'
import { GameContext } from '../context/game-context'

export const generateRandomColor = (): HSBColor => {
    const h = Math.floor(Math.random() * 361)
    const s = Math.floor(Math.random() * 101)
    const b = Math.floor(Math.random() * 101)
    return { h, s, b }
}
const Target = () => {
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
    useEffect(() => {
        const timer = setTimeout(() => {
            setPhase("game")
        }, 5000)
        setTargetColor(prev => generateRandomColor())

        return () => {
            clearTimeout(timer)
            setTargetColor(prev => prev)

        }
    }, [round])

    return (
        <div className={`relative w-4xl h-full text-black text-center rounded-2xl`}
            style={{
                backgroundColor: `rgb(${targetRgb.r}, ${targetRgb.g}, ${targetRgb.b})`,
            }}
        >
            <span className='absolute top-5 left-5 text-lg'>{round}/5</span>
            <Counter duration={5} className='absolute top-2 right-5 w-fit h-fit' />
        </div>
    )
}

export default Target