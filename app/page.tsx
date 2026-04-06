import { cn } from "@/lib/utils";
import Link from "next/link";
import PlayButton from "./components/play-button";
import HeroSpan from "./components/herospan";
export default function Home() {



  return (

    <div className="h-screen flex justify-center items-center bg-neutral-100">
      <div className={cn(
        "flex flex-col py-6 justify-between items-center font-[suisse] h-full md:h-150 w-full md:w-4xl md:rounded-2xl bg-black",
        'shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]'
      )}>
        {/* <h1 className="font-bold text-6xl">ColorSnap</h1> */}
        <h1 
        className="font-bold text-6xl bg-linear-to-r from-pink-500 via-yellow-200 to-pink-500 bg-size-[200%_200%] bg-clip-text text-transparent animate-gradient">
          ColorSnap
        </h1>
        <div className="px-10 flex flex-col gap-3 mx-auto">
          
          <HeroSpan to="right" content="5 Rounds" className="text-2xl transition-colors duration-300 hover:text-cyan-300"/>
          <HeroSpan delay={0.1} to="right" content="5 seconds" className="text-2xl transition-colors duration-300 hover:text-emerald-300"/>
          <HeroSpan delay={0.15} to="left" content="Recreate Color" className="text-2xl transition-colors duration-300 self-end hover:text-fuchsia-300"/>
          <HeroSpan delay={0.2} to="left" content="Test your color memory" className="text-2xl transition-colors duration-300 self-end hover:text-violet-300"/> 

        </div>
        <PlayButton />
      </div>

    </div>
  );
}
