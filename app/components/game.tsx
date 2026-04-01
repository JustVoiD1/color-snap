'use client'
import { useContext } from "react";

import { ColorContext } from "../context/colorContext";

import ColorPicker from "./color-picker"
import { hsbToRgb } from "@/lib/tools";
import Link from "next/link";
import { cn } from "@/lib/utils";





const Game = () => {
    const colorContext = useContext(ColorContext)
    if (!colorContext) {
        throw new Error("Game must be used within ColorProvider")
    }

    const { hsb } = colorContext
    const rgb = hsbToRgb(hsb.h, hsb.s, hsb.b)


    return (<div className="h-full w-full flex flex-col justify-center items-center gap-2">
        <div className="flex flex-1 justify-center items-center gap-5">

            <ColorPicker />

            <div className={cn(
                `w-4xl h-full text-black text-center rounded-2xl`,
                'shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]'
            )}
                style={{
                    backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                }}
            >
            </div>
        </div>
        <Link href={'/result'} className="bg-neutral-700 px-4 py-3 text-neutral-50 font-light text-3xl rounded-xl ">Submit</Link>
    </div>
    )
}

export default Game