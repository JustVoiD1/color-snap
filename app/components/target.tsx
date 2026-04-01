'use client'
import { useContext, useEffect } from 'react'
import { ColorContext } from '../context/colorContext'
import { HSBColor } from '@/lib/types'
import { hsbToRgb } from '@/lib/tools'

export const generateRandomColor = (): HSBColor => {
    const h = Math.floor(Math.random() * 361)
    const s = Math.floor(Math.random() * 101)
    const b = Math.floor(Math.random() * 101)
    return { h, s, b }
}
const Target = () => {
    const colorContext = useContext(ColorContext)
    if (!colorContext) {
        throw new Error("Target must be used within ColorProvider")
    }

    const { targetColor } = colorContext
    const targetRgb = hsbToRgb(targetColor.h, targetColor.s, targetColor.b)

    return (
        <div className={`w-4xl h-full text-black text-center rounded-2xl`}
            style={{
                backgroundColor: `rgb(${targetRgb.r}, ${targetRgb.g}, ${targetRgb.b})`,
            }}
        >
        </div>
    )
}

export default Target