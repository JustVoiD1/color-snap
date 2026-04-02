import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {



  return (

    <div className="min-h-screen flex justify-center items-center bg-neutral-100">
      <Link href={'/play'}>
        <button className={cn(
          "min-w-30 px-5 py-3 bg-black text-white rounded-2xl text-2xl",
          "shadow-[0_3px_10px_rgb(0,0,0,0.2)]",
          "hover:shadow-[0_4px_10px_rgba(8,112,184,0.9)] hover:scale-105",
          "transition-all duration-300"
        )}>Play</button>
      </Link>
    </div>
  );
}
