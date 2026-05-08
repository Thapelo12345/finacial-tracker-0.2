import { Exo_2 } from "next/font/google"
import { useState, useEffect } from "react"

const exo_2 = Exo_2({
  subsets: ['latin'],
})

type PROPS = {
    arrears: number;
    arrearsAmount: number;
}

export default function ArrearsComponent({arrears, arrearsAmount}:PROPS){

    return(
        <div className="flex flex-col items-start mx-2">
            <label className={`${exo_2.className} text-red-500 font-semibold text-xs`}>Arrears: <span className="text-blue-300">{arrears}</span></label>
            <label className={`${exo_2.className} text-red-500 font-semibold text-xs`}>Arrears amount: <span className="text-blue-300">R {arrearsAmount}<span className="text-red-500">+</span></span></label>

        </div>
    )
}