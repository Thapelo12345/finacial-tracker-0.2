"use client"
import { Exo_2 } from "next/font/google"

type PROPS ={
    title: string;
    amount: number;
    name: string;
    numberOfPayments: number;
    amountColor: string;
}

const exo_2 = Exo_2({})

export default function BillProgressComponent({title, amount, name, numberOfPayments, amountColor}: PROPS){
    return(
        <div className="p-0 m-1">
            <div className="p-1">
                <label className="text-black/40 text-xs pt-1">{title}: </label>
                <h5 className="truncate text-sm"
                style={{color: amountColor}}
                >R {amount}</h5>
            </div>

            <div className="p-1">
                <label className="text-black/40 text-xs pt-1">{name}:</label>
                <h5 className="truncate text-sm">{numberOfPayments}</h5>
            </div>
        </div>
    )
}