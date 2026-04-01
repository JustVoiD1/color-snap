import Playground from "./components/playground";

export default function Home() {



  return (

    <div className="min-h-screen w-full flex justify-center items-center bg-neutral-100">
      <div className="max-w-4xl  h-[600px] flex justify-center items-center gap-2">
        <Playground />
      </div>
    </div>
  );
}
