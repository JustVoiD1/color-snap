'use client'
import React, { Activity, useContext, useEffect, useState } from 'react'
import Game from './game'
import Target, { generateRandomColor } from './target'
import Counter from './counter'
import { ColorContext } from '../context/colorContext'

const Playground = () => {
    const [showTarget, setShowTarget] = useState(true)


    const colorContext = useContext(ColorContext)
    if (!colorContext) {
        throw new Error("context must be used within ColorProvider")
    }
    const { setTargetColor } = colorContext

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowTarget(false)
        }, 5000)
        setTargetColor(prev => generateRandomColor())

        return () => {
            clearTimeout(timer)
            setTargetColor(prev => prev)

        }
    }, [])

    return (
        <>
            {showTarget ? <div className='relative h-full'>

                <Activity mode={showTarget ? "visible" : "hidden"}>
                    <Counter duration={5} className='absolute top-2 right-5 w-fit h-fit' />
                    <Target />
                </Activity>
            </div> : <Game />}
        </>
    )
}

export default Playground