"use client";
import BillStatusButton from "../buttons/billStatusBtn";

type Prop = {
  name: string;
  installment: number;
};
export default function BillCardHeader({ name, installment }: Prop) {
  return (
    <header className="flex flex-row items-center justify-between [perspective:1000px] p-2">
      <div className="flex flex-col w-full">
        <h1
          className="text-md text-center text-white bg-black/10 font-extrabold p-2 m-2 rounded-md w-[90%] h-fit "
          style={{
            textShadow: "0px 0px 1px black",
            WebkitBoxReflect:
              "below 5px linear-gradient(to bottom, rgba(0,0,0, 0.0), rgba(0,0,0,0.4))",
          }}
        >
          {name.toUpperCase()}
        </h1>
        <h2
          className="text-lg text-white bg-black/10 font-extrabold w-fit h-fit p-2 m-2 rounded-md"
          style={{
            boxShadow: "1px -2px 5px rgba(0, 0, 0, 0.7)",
            textShadow: "0px 0px 1px black",
            WebkitTextStrokeColor: "black",
            WebkitTextStrokeWidth: "0.3px",
          }}
        >
          R {installment}
        </h2>
      </div>

      <BillStatusButton />
    </header>
  );
}
