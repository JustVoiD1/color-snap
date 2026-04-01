'use client'
import { motion, PanInfo } from 'motion/react'
import React, { useContext, useRef } from 'react'
import { ColorContext } from '../context/colorContext'
import { hsbToRgb } from '@/lib/tools'
import { cn } from '@/lib/utils'

const ColorPicker = () => {
    const hueConstraintRef = useRef<HTMLDivElement>(null)
    const saturationConstraintRef = useRef<HTMLDivElement>(null)
    const BrighnessConstraintRef = useRef<HTMLDivElement>(null)
    const colorContext = useContext(ColorContext)
    if (!colorContext) return
    const { hsb, setHsb } = colorContext

    const rgb = hsbToRgb(hsb.h, hsb.s, hsb.b)

    const setHue = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const height = hueConstraintRef.current?.clientHeight || 1
        const y = info.point.y - hueConstraintRef.current!.getBoundingClientRect().top

        const percent = y / height
        const hue = percent * 360

        setHsb(prev => ({ ...prev, h: Math.max(0, Math.min(360, hue)) }))
    }

    const setSaturation = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const height = saturationConstraintRef.current?.clientHeight || 1
        const y = info.point.y - saturationConstraintRef.current!.getBoundingClientRect().top

        const percent = y / height * 100
        const sat = (100 - percent)

        setHsb(prev => ({ ...prev, s: Math.max(0, Math.min(100, sat)) }))
    }

    const setBrighness = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const height = BrighnessConstraintRef.current?.clientHeight || 1
        const y = info.point.y - BrighnessConstraintRef.current!.getBoundingClientRect().top

        const percent = y / height * 100
        const brightness = (100 - percent)

        setHsb(prev => ({ ...prev, b: Math.max(0, Math.min(100, brightness)) }))
    }


    return (<div className='flex h-full gap-2 justify-between items-center'>
        <div ref={hueConstraintRef}
            className={cn(
                "h-full w-8 relative rounded-full",
                'shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]'
            )}
            style={{
                background: `linear-gradient(to bottom, red, yellow, lime, cyan, blue, magenta, red)`
            }}

        >
            <motion.div
                drag="y"
                dragMomentum={false}
                dragConstraints={hueConstraintRef}
                className="absolute inset-x-0 rounded-full bg-white w-8 h-8 mx-auto cursor-pointer"
                onDrag={setHue}
            >

            </motion.div>
        </div>
        <div className={cn(
            "h-full w-8 relative rounded-full",
            'shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]'
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
                className="absolute inset-x-0 rounded-full bg-white w-8 h-8 mx-auto cursor-pointer"
                onDrag={setSaturation}
            >

            </motion.div>

        </div>
        <div className={cn(
            "h-full w-8 relative rounded-full",
            'shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]'
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
                className="absolute inset-x-0 rounded-full bg-white w-8 h-8 mx-auto cursor-pointer"
                onDrag={setBrighness}
            >

            </motion.div>

        </div>
    </div>
    )
}

export default ColorPicker