'use client'
import { ColorContextType, HSBColor } from "@/lib/types";
import { createContext, useState } from "react";
import { generateRandomColor } from "../components/target";

export const ColorContext = createContext<ColorContextType | undefined>(undefined)
export function ColorProvider({ children }: {
    children: React.ReactNode
}) {

    const [targetColor, setTargetColor] = useState<HSBColor>({
        h: 0,
        s: 0,
        b: 0
    })

    const [hsb, setHsb] = useState({
        h: 0,
        s: 100,
        b: 100
    })




    return <ColorContext.Provider value={{
        hsb,
        setHsb,
        targetColor,
        setTargetColor
    }}>
        {children}

    </ColorContext.Provider>


}