"use client";
import BillStatusButton from "../buttons/billStatusBtn";
import { useContext, useState, useEffect } from "react"
import { BillContext } from "@/app/context/billContext";

type Prop = {
  name: string;
  installment: number;
};
export default function BillCardHeader({ name, installment }: Prop) {
  const theme = useContext(BillContext)
  const [themeColor, setTheme] = useState("oklch(80.9% 0.105 251.813)")

  useEffect(()=>{

    if(theme.statusTheme == "active"){setTheme("oklch(80.9% 0.105 251.813)")}
    else if(theme.statusTheme == "pause"){setTheme("orange")}
    else if(theme.statusTheme ==  "inactive"){setTheme("grey")}

  }, [theme.statusTheme])

  return (
    <header className="flex flex-col p-0 items-center justify-between [perspective:1000px] transition-all duration-700">
      <div className="flex flex-col w-full">

        {/* price and header */}
        <div className="mb-2 flex flex-row items-start justify-between bg-blue-300 "
        style={{
          background: themeColor,
          borderTopLeftRadius: "6px",
          borderTopRightRadius: "6px"
          }}>
        <h1
          className="text-md text-white font-extrabold rounded-md w-fit h-fit m-2"
        >
          {name.toUpperCase()}
        </h1>
        <h2
          className="text-lg text-white font-extrabold w-fit h-fit  m-2 rounded-md"
        >
          R {installment}
        </h2>
        </div>
      </div>

      <BillStatusButton />
    </header>
  );
}
