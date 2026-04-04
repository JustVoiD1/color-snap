import { cn } from "@/lib/utils";
import Link from "next/link";
import PlayButton from "./components/play-button";
export default function Home() {



  return (

    <div className="h-screen flex justify-center items-center bg-neutral-100">
      <div className={cn(
        "flex flex-col py-6 justify-between items-center font-[suisse] h-full md:h-150 w-full md:w-4xl md:rounded-2xl bg-black",
        'shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]'
      )}>
        <h1 className="font-bold text-6xl">ColorSnap</h1>
        <div className="px-10 flex flex-col gap-3 mx-auto">
          <span className="text-2xl transition-colors duration-300 hover:text-cyan-300">5 Rounds</span>
          <span className="text-2xl transition-colors duration-300 hover:text-emerald-300">5 seconds</span>
          <span className="text-2xl transition-colors duration-300 self-end hover:text-fuchsia-300">Recreate Color</span>
          <span className="text-2xl transition-colors duration-300 self-end hover:text-violet-300">Test your color memory</span>

        </div>
        <PlayButton />
      </div>

    </div>
  );
}
