import React from 'react'
import { GameProvider } from '../context/game-context'
import Playground from '../components/playground'

const page = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-neutral-100">
      <GameProvider>
        <Playground />
      </GameProvider>

    </div>
  )
}

export default page