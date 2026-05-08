"use client";
import { Exo_2} from "next/font/google";

 const exo_2 =  Exo_2({
    subsets: ["latin"],
  })

type dateInputs = {
  title: string;
  state: string;
  setValue: (value: string) => void;
};
export default function DateInput({ title, state, setValue }: dateInputs) {
  return (
    <div className="flex flex-row items-start w-full p-4">
      <label className={`${exo_2.className} text-center text-black/50 text-sm font-semibold font-serif mt-2 ml-4`}>
        {title}
      </label>

      <input
        value={state}
        type="date"
        onChange={(e) => setValue(e.target.value)}
        className={`${exo_2.className} text-black text-sm bg-white/40 rounded-md ml-4 p-2 border-0 focus:outline-0 focus:shadow-lg focus:shadow-black`}
        style={{
          boxShadow: "inset 2px 2px 5px #BABECC, inset -5px -5px 10px #FFF",
        }}
        required
      ></input>
    </div>
  );
}
