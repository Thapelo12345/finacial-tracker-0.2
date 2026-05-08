"use client"
import { useState, useEffect } from "react"
import BillProgressComponent from "../ui/bills/billProgress";

type PROPS = {
  lastpayment: string;
  startdate: string;
  dueDate: string;
  endDate: string;
  amount: number;
  frequantly: string;

}
export default function BillProgressPaymentComponent({lastpayment, startdate, dueDate, endDate, amount, frequantly }:PROPS) {

const [amountPayed, setAmountPayed] = useState(0.0)
const [amountToBePayed, setAmountToBePayed] = useState(0.0)
const [paymentsMade, setPaymentsMade] = useState(0)
const [paymentsToBeMade, setPaymentsToBeMade] = useState(0)

useEffect(()=>{

let amountTopay = 0.0, amountpayed = 0.0, paymentMade = 0, paymentToBeMade = 0
const currentDate = new Date()
const start = new Date(startdate)
const end = new Date(endDate)
const due = new Date(dueDate)

while(start < end){

switch(frequantly){
  case "yearly":
    start.setFullYear(start.getFullYear() + 1)
    break;

  case "monthly":
    start.setDate(1)
    start.setMonth(start.getMonth() + 1)
    break

  case "weekly":
    start.setDate(start.getDate() + 7)
    break;
    
  default:
    return
    break
}//end of switch

//if it was monthly that means date was reseted to the first day of the month
//so will have to find due date set the date correctly
if(frequantly == "monthly"){
const lastDayDate = new Date(start.getFullYear(), start.getMonth() + 1, 0);
due.getDate() > lastDayDate.getDate() ? start.setDate(lastDayDate.getDate()) : start.setDate(due.getDate())
}//end of if

if(lastpayment != "No payment" && new Date(lastpayment) < due){
  if(start <= new Date(lastpayment) || (new Date(lastpayment) > start && new Date(lastpayment) < currentDate)){
    amountpayed += amount
    paymentMade++
  }//end of else if

  else{
    amountTopay += amount
    paymentToBeMade++
  }
}
else{
    amountTopay += amount
    paymentToBeMade++
}

}//end of while
setAmountPayed(Number(amountpayed.toFixed(2)))
setPaymentsMade(paymentMade)
setAmountToBePayed(Number(amountTopay.toFixed(2)))
setPaymentsToBeMade(paymentToBeMade)

}, [lastpayment])

  return (
  <div className="flex flex-col items-center p-1 mx-1 w-full">
<h1 className="text-blue-300 m-2">Payment progress</h1>
<div className="flex flex-col items-start md:items-center-safe justify-between bg-white rounded-lg  md:flex-row w-full">
<BillProgressComponent title="Amount Payed" name="Payments made" amount={amountPayed} numberOfPayments={paymentsMade} amountColor={"lime"} /> 
<BillProgressComponent title="Amount To Be Payed" name="Payments Left" amount={amountToBePayed} numberOfPayments={paymentsToBeMade} amountColor={"royalblue"} />
</div>
  </div>
);
}