'use client'
import { createContext, useState } from "react"

type Phase = "target" | "game" | "roundResult" | "finalResult"

type GameContextType = {
    round: number
    phase: Phase
    setRound: React.Dispatch<React.SetStateAction<number>>
    setPhase: React.Dispatch<React.SetStateAction<Phase>>
    scores: number[]
    setScores: React.Dispatch<React.SetStateAction<number[]>>
    submitScore: (score: number) => void
    averageScore: number
    moveNext: () => void
    resetGame: () => void
}

export const GameContext = createContext<GameContextType | null>(null)


export function GameProvider({ children }: { children: React.ReactNode }) {
    const TOTAL_ROUNDS = 5

    const [round, setRound] = useState(1)
    const [phase, setPhase] = useState<Phase>("target")
    const [scores, setScores] = useState<number[]>([])

    const submitScore = (score: number) => {

        setScores(prev => [...prev, score])
        setPhase("roundResult")

    }

    const moveNext = () => {
        setRound(r => r + 1)
        if (round >= TOTAL_ROUNDS) {
            setPhase("finalResult")
        }
        else setPhase("target")
    }

    const resetGame = () => {
        setRound(1)
        setScores([])
        setPhase("target")
    }

    const averageScore =
        scores.length === 0
            ? 0
            : scores.reduce((a, b) => a + b, 0) / scores.length

    return (
        <GameContext.Provider
            value={{
                round,
                setRound,
                phase,
                setPhase,
                scores,
                setScores,
                submitScore,
                averageScore,
                moveNext,
                resetGame
            }}
        >
            {children}
        </GameContext.Provider>
    )
}


