'use client'
import { useContext, useEffect } from "react";

import { ColorContext } from "../context/color-context";

import ColorPicker from "./color-picker"
import { hsbToRgb } from "@/lib/tools";
import { cn } from "@/lib/utils";
import SendIcon from "./icons/send";
import { GameContext } from "../context/game-context";
import { calculateScore } from "@/lib/score";
import { getContrastText } from "./result-card";
import { motion } from "motion/react";
import { generateRandomColor } from "./target";




const Game = () => {
    const gameContext = useContext(GameContext)
    if (!gameContext) {
        throw new Error("Game must be used within ColorProvider")
    }
    const colorContext = useContext(ColorContext)
    if (!colorContext) {
        throw new Error("Game must be used within ColorProvider")
    }

    const { hsb, setHsb, targetColor } = colorContext
    const rgb = hsbToRgb(hsb.h, hsb.s, hsb.b)

    const { round, submitScore } = gameContext
    const handleSubmit = () => {
        const score = calculateScore(hsb, targetColor)
        submitScore(score)
    }
    useEffect(() => {
        const newColor = generateRandomColor()

        requestAnimationFrame(() => {
            setHsb(newColor)
        })
    }, [round])

    return (<div className="h-full w-full flex flex-col justify-center items-center gap-2 overflow-hidden">
        <div className="relative flex flex-1 w-full justify-center items-center gap-5">

            <motion.div className="absolute h-full w-full bg-black flex justify-center items-center"
                initial={{
                    opacity: 1,
                    display: "flex"
                }}
                animate={{
                    opacity: 0,
                    display: "none"
                }}
                transition={{
                    delay: 0.4,
                    duration: 0.4
                }}
            >
                <span className="text-3xl text-white font-[suisse]">Your turn</span>
            </motion.div>

            <div className={cn(
                `w-full h-full flex justify-between items-end text-black text-center`,
                'shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]'
            )}
                style={{
                    backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
                }}
            >

                {/* <ColorPicker className="flex h-full justify-between items-center" /> */}
                <motion.div
                    initial={{
                        opacity: 0,
                        translateX: -50
                    }}
                    animate={{
                        opacity: 1,
                        translateX: 0
                    }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                    className="h-full"
                >
                    <ColorPicker className="flex h-full justify-between items-center" />
                </motion.div>

                {/* <Link href={'/result'} className={cn(
                    "p-2 text-neutral-50 font-light text-3xl rounded-full bg-black",
                    'shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]',
                )}><SendIcon /></Link> */}
                <button type={"submit"}
                    style={{
                        backgroundColor: getContrastText(rgb.r, rgb.g, rgb.b),
                    }}
                    className={cn(
                        "m-5 h-13 aspect-square text-blue-400 flex justify-center items-center font-light text-3xl rounded-full bg-white cursor-pointer",
                        'shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]',
                    )}
                    onClick={handleSubmit}
                ><SendIcon />
                </button>
            </div>
        </div>
    </div>
    )
}

export default Game