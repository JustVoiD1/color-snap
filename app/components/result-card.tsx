'use client'
import React, { useContext, useEffect } from 'react'
import { ColorContext } from '../context/color-context'
import { hsbToRgb } from '@/lib/tools'
import { calculateScore } from '@/lib/score'
import { cn } from '@/lib/utils'
import { GameContext } from '../context/game-context'
import NextIcon from './icons/next'
import AnimatedNumber from './animate-number'

export const getContrastText = (r: number, g: number, b: number) => {
    const luminance =
        (0.299 * r + 0.587 * g + 0.114 * b) / 255

    return luminance > 0.5 ? "#000000" : "#ffffff"
}

const ResultCard = () => {
    const gameContext = useContext(GameContext)
    if (!gameContext) {
        throw new Error("context must be used within ColorProvider")
    }
    const colorContext = useContext(ColorContext)
    if (!colorContext) {
        throw new Error("Game must be used within ColorProvider")
    }

    const { round, moveNext } = gameContext

    const { targetColor, hsb } = colorContext
    const rgb = hsbToRgb(hsb.h, hsb.s, hsb.b)
    const targetRgb = hsbToRgb(targetColor.h, targetColor.s, targetColor.b)

    const score = calculateScore(hsb, targetColor)


    const scoreColor = (score: number) => {
        if (score >= 8) return "#4ADE80";
        if (score >= 6) return "#FBBF24";
        if (score >= 4) return "#FB923C";
        return "#F87171";

    }

    const textColor = getContrastText(rgb.r, rgb.g, rgb.b)
    const targetTextColor = getContrastText(targetRgb.r, targetRgb.g, targetRgb.b)





    return (<div className={'font-[suisse] h-full md:h-100 flex flex-col justify-center items-center w-full md:w-3/4 md:rounded-3xl overflow-hidden gap-5'}>
        <div className={cn(
            'h-full flex flex-col justify-center items-center w-full overflow-hidden',
            'shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]'
        )}>
            <div className='relative flex-1 w-full'
                style={{
                    backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                }}

            >
                <div className="absolute top-4 left-5 text-lg mix-blend-difference text-shadow-lg">{round}/5</div>
                <div className='absolute p-4 top-3 right-3 w-fit text-5xl mx-auto'>
                    <span className='text-shadow-sm'
                    style={{
                        color: textColor
                    }}
                    >Score: </span>
                    <span className='text-6xl'
                        style={{
                            color: textColor
                        }}
                    >
                        <AnimatedNumber content={score} duration={1.5}/>
                    </span>
                </div>
                <span className='absolute bottom-4 left-4 text-4xl text-shadow-lg'
                    style={{
                        color: textColor
                    }}
                >HSB {hsb.h.toFixed(0)} {hsb.s.toFixed(0)} {hsb.b.toFixed(0)}</span>
            </div>
            <div className='relative flex-1 w-full'
                style={{
                    backgroundColor: `rgb(${targetRgb.r}, ${targetRgb.g}, ${targetRgb.b})`,
                }}
            >
                <span className='absolute bottom-4 left-4 text-4xl text-shadow-lg'
                    style={{
                        color: targetTextColor
                    }}
                >HSB {targetColor.h.toFixed(0)} {targetColor.s.toFixed(0)} {targetColor.b.toFixed(0)}</span>
                <button
                    onClick={moveNext}
                    className='absolute p-4 bottom-4 right-3 rounded-full cursor-pointer'
                    style={{
                        color: textColor,
                        backgroundColor: textColor === "#000000" ? "#ffffff" : "#000000"
                    }}
                    ><NextIcon /></button>
            </div>
        </div>

    </div>
    )
}

export default ResultCard