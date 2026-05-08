"use client";
import { useState, useEffect } from "react"
import { Exo_2} from "next/font/google";

 const exo_2 =  Exo_2({
    subsets: ["latin"],
  })

type Prop = {
  title: string;
  inputType: string;
  setValue: (value: number)=> void;
  // amountRef: React.MutableRefObject<number>;
};
export default function LabelInputNumber({ title, inputType, setValue }: Prop) {

  return (
    <div className="flex flex-col items-start w-fit m-2">
      <label
        className={`${exo_2.className} w-full text-black font-serif font-semibold  rounded-tr-lg rounded-br-lg m-2 text-lg p-2`}
      >
        <input
          type={inputType}
          min="0"
          step={0.01}
          placeholder={title}
          onChange={(e) => setValue(Number(e.target.value))}
          className="text-black text-sm bg-white/40 rounded-md w-full p-2 border-0 focus:outline-0"
          style={{
            boxShadow: "inset 2px 2px 5px #BABECC, inset -5px -5px 10px #FFF",
          }}
          required
        ></input>
      </label>
    </div>
  );
}
