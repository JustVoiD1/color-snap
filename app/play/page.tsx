import React from 'react'
import { GameProvider } from '../context/game-context'
import Playground from '../components/playground'

const page = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center bg-neutral-100">
      <GameProvider>
        <Playground className="w-4xl h-full md:h-150 flex justify-center items-center gap-2 md:rounded-2xl overflow-hidden"/>
      </GameProvider>

    </div>
  )
}

export default page