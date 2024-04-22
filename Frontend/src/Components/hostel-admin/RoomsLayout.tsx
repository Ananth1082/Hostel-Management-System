import { useState } from "react";
import H3 from "../Typography/H3";
import H2 from "../Typography/H2";

export default function RoomsLayout() {
  const [floor, setFloor] = useState<number>(1);
  return (
    <>
      <div className="w-[60%] m-auto grid grid-cols-10 gap-2">
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="aspect-[3/2] border-2 col-start-2 col-end-10 row-start-2 row-end-8 grid place-content-center text-center">
          <div className="p-4 border-2 border-black">
            <H2>Main Block</H2>
            <br />
            <H3>{`Floor ${floor}`}</H3>
          </div>
        </div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
        <div className="w-[4rem] m-auto aspect-[3/2] border-2 border-black"></div>
      </div>
      <div className="flex justify-center gap-5 m-auto mt-6 w-[50%]">
        <div
          onClick={() => setFloor(1)}
          className={`cursor-pointer text-center p-2 w-10 aspect-square border-2 ${floor === 1?'bg-black text-white':''}`}
        >
          1
        </div>
        <div
          onClick={() => setFloor(2)}
          className={`cursor-pointer text-center p-2 w-10 aspect-square border-2 ${floor === 2?'bg-black text-white':''}`}
        >
          2
        </div>
        <div
          onClick={() => setFloor(3)}
          className={`cursor-pointer text-center p-2 w-10 aspect-square border-2 ${floor === 3?'bg-black text-white':''}`}
        >
          3
        </div>
        <div
          onClick={() => setFloor(4)}
          className={`cursor-pointer text-center p-2 w-10 aspect-square border-2 ${floor === 4?'bg-black text-white':''}`}
        >
          4
        </div>
      </div>
    </>
  );
}
