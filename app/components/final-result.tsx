'use client'
import React, { useContext } from 'react'
import { GameContext } from '../context/game-context'
import { cn } from '@/lib/utils'
import AnimatedNumber from './animate-number'

const FinalResult = () => {
  const gameContext = useContext(GameContext)

  if (!gameContext) {
    throw new Error("Game must be used within GameProvider")
  }

  const { scores, averageScore, resetGame } = gameContext

  const scoreColor = (score: number) => {
    if (score >= 8) return "#4ADE80"
    if (score >= 6) return "#FBBF24"
    if (score >= 4) return "#FB923C"
    return "#F87171"
  }

  return (
    <div className="font-[suisse] h-full md:h-100 flex flex-col justify-center items-center w-full md:w-3/4 gap-6">

      <div
        className={cn(
          "h-full flex flex-col bg-zinc-800 text-white justify-center items-center w-full overflow-hidden md:rounded-3xl p-10 gap-8",
          "shadow-[0_5px_5px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]"
        )}
      >

        <div className='flex-1 flex flex-col justify-center items-center'>
          {/* Title */}
          <div className="text-4xl font-semibold">
            Final Score
          </div>

          {/* Average Score */}
          <div
            className="text-7xl font-bold"
            style={{ color: scoreColor(averageScore) }}
          >
            <AnimatedNumber delay={1} duration={2} content={Number(averageScore.toFixed(2))} />
            {/* {averageScore.toFixed(2)} */}
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-zinc-200" />

          {/* Round Scores */}
          <div className="flex flex-col gap-4 w-full items-center">

            <div className="text-xl opacity-70">
              Round Scores
            </div>

            <div className="flex gap-4 flex-wrap justify-center">

              {scores.map((score, i) => (
                <div
                  key={i}
                  className="px-4 py-2 rounded-xl bg-neutral-800 border border-neutral-500 text-lg font-medium"
                  style={{ color: scoreColor(score) }}
                >
                  <AnimatedNumber delay={0.5 + i / 5} duration={1} content={Number(score.toFixed(2))} />
                </div>
              ))}

            </div>

          </div>
        </div>

        <div className='w-full flex justify-center md:justify-end items-center'>
          <button
            onClick={resetGame}
            className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 active:scale-95 transition text-white"
          >
            Play Again
          </button>
        </div>

      </div>



    </div>
  )
}

export default FinalResult