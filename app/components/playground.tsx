'use client'
import React, { Activity, useContext, useEffect, useState } from 'react'
import Game from './game'
import Target from './target'
import { ColorContext } from '../context/color-context'
import { GameContext } from '../context/game-context'
import RoundResult from './round-result'
import FinalResult from './final-result'

const Playground = ({ className }: { className?: string }) => {


    const gameContext = useContext(GameContext)
    if (!gameContext) {
        throw new Error("context must be used within ColorProvider")
    }
    const colorContext = useContext(ColorContext)
    if (!colorContext) {
        throw new Error("context must be used within ColorProvider")
    }
    const { phase, round } = gameContext



    return (
        <div className={className}>


            <Activity mode={phase === 'target' ? "visible" : "hidden"}>
                <Target key={round} />
            </Activity>
            <Activity mode={phase === 'game' ? "visible" : "hidden"}>
                <Game key={round} />
            </Activity>
            <Activity mode={phase === 'roundResult' ? "visible" : "hidden"}>
                <RoundResult key={round} />
            </Activity>
            <Activity mode={phase === 'finalResult' ? "visible" : "hidden"}>
                <FinalResult />
            </Activity>

        </div>
    )
}

export default Playground
