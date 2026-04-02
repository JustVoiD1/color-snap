'use client'
import { motion, PanInfo, useMotionValue } from 'motion/react'
import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react'
import { ColorContext } from '../context/color-context'
import { hsbToRgb } from '@/lib/tools'
import { cn } from '@/lib/utils'
import { GameContext } from '../context/game-context'

const ColorPicker = () => {
    const hueConstraintRef = useRef<HTMLDivElement>(null)
    const saturationConstraintRef = useRef<HTMLDivElement>(null)
    const BrighnessConstraintRef = useRef<HTMLDivElement>(null)

    const hueY = useMotionValue(0)
    const satY = useMotionValue(0)
    const brightY = useMotionValue(0)



    const gameContext = useContext(GameContext)
    if (!gameContext) throw new Error("Context must be inside Provider")
    const colorContext = useContext(ColorContext)
    if (!colorContext) throw new Error("Context must be inside Provider")
    const { hsb, setHsb } = colorContext

    const { round, phase } = gameContext

    const rgb = hsbToRgb(hsb.h, hsb.s, hsb.b)

    const setHue = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {

        // const height = hueConstraintRef.current?.clientHeight || 1
        // const y = info.point.y - hueConstraintRef.current!.getBoundingClientRect().top

        // const percent = y / height
        // console.log(percent)
        // const hue = percent * 360

        // setHsb(prev => ({ ...prev, h: Math.max(0, Math.min(360, hue)) }))
        const height = hueConstraintRef.current?.clientHeight || 1
        let percent = (hueY.get() / height * 100)
        percent = Math.max(0, Math.min(100, percent))


        const hue = percent * 360 / 100
        setHsb(prev => ({ ...prev, h: Math.max(0, Math.min(360, hue)) }))

    }

    const setSaturation = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        // const y = info.point.y - saturationConstraintRef.current!.getBoundingClientRect().top

        // const percent = y / height * 100
        // const sat = (100 - percent)

        // setHsb(prev => ({ ...prev, s: Math.max(0, Math.min(100, sat)) }))
        const height = saturationConstraintRef.current?.clientHeight || 1
        let percent = satY.get() / height * 100
        percent = Math.max(0, Math.min(100, percent))


        const sat = 100 - percent
        console.log(sat)
        setHsb(prev => ({ ...prev, s: Math.max(0, Math.min(100, sat)) }))
    }

    const setBrighness = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        // const y = info.point.y - BrighnessConstraintRef.current!.getBoundingClientRect().top

        // const percent = y / height * 100
        // const brightness = (100 - percent)
        const height = BrighnessConstraintRef.current?.clientHeight || 1
        let percent = brightY.get() / height * 100
        percent = Math.max(0, Math.min(100, percent))

        const brightness = 100 - percent
        setHsb(prev => ({ ...prev, b: Math.max(0, Math.min(100, brightness)) }))

    }

    useLayoutEffect(() => {
        if(!hueConstraintRef.current) return;
        const hueHeight = hueConstraintRef.current.clientHeight
        hueY.set((hsb.h / 360) * hueHeight)
        console.log(hueY.get())
        
        if(!saturationConstraintRef.current) return;
        const satHeight = saturationConstraintRef.current.clientHeight || 1
        satY.set((1- hsb.s / 100) * satHeight)
        console.log(satY.get())
        
        
        if(!BrighnessConstraintRef.current) return;
        const brightHeight = BrighnessConstraintRef.current.clientHeight || 1
        brightY.set((1- hsb.b / 100) * brightHeight)
        console.log(brightY.get())

    }, [round, hsb])


    return (<div className='flex h-full justify-between items-center'>
        <div ref={hueConstraintRef}
            className={cn(
                "h-full w-8 relative rounded-full overflow-hidden",
                'shadow-[0_4px_4px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]'
            )}
            style={{
                background: `linear-gradient(to bottom, red, yellow, lime, cyan, blue, magenta, red)`
            }}

        >
            <motion.div
                drag="y"
                dragMomentum={false}
                dragConstraints={hueConstraintRef}
                className={cn(
                    "absolute inset-x-0 rounded-full bg-white w-8 h-8 mx-auto cursor-pointer",
                    "shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                )}
                style={{
                    y: hueY
                }}
                onDrag={setHue}

            >

            </motion.div>
        </div>
        <div className={cn(
            "h-full w-8 relative rounded-full overflow-hidden",
            'shadow-[0_4px_4px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]'
        )}
            ref={saturationConstraintRef}
            style={{
                background: `linear-gradient(to bottom, rgb(${rgb.r}, ${rgb.g}, ${rgb.b}), white)`
            }}
        >
            <motion.div
                drag="y"
                dragMomentum={false}
                dragConstraints={saturationConstraintRef}
                className={cn(
                    "absolute inset-x-0 rounded-full bg-white w-8 h-8 mx-auto cursor-pointer",
                    "shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                )}
                style={{
                    y: satY
                }}
                onDrag={setSaturation}

            >

            </motion.div>

        </div>
        <div className={cn(
            "h-full w-8 relative rounded-full overflow-hidden",
            'shadow-[0_4px_4px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]'
        )}
            ref={BrighnessConstraintRef}
            style={{
                background: `linear-gradient(to bottom, rgb(${rgb.r}, ${rgb.g}, ${rgb.b}), black)`

            }}
        >
            <motion.div
                drag="y"
                dragMomentum={false}
                dragConstraints={BrighnessConstraintRef}
                className={cn(
                    "absolute inset-x-0 rounded-full bg-white w-8 h-8 mx-auto cursor-pointer",
                    "shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                )}
                style={{
                    y: brightY
                }}
                onDrag={setBrighness}

            >

            </motion.div>

        </div>
    </div>
    )
}

export default ColorPicker