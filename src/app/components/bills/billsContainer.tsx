"use client";
import BillCard from "./billCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../state_management/store";
import Bill from "@/app/interFaces/billInterface";
import { nextPaymentDate } from "@/app/functions/bills/billDates";
import { useState, useEffect, useRef } from "react";

type PROPS ={
  setPaid: (value: number) => void;
  setDue: (value: number) => void;
  setUpcoming: (value: number) => void;
}

export default function BillsContainer({setPaid, setDue, setUpcoming}:PROPS) {
  const checkUpdate = useSelector(
    (state: RootState) => state.updateApp.updateApp,
  );

  const update = useRef(false)
  const [changedBills, setChangeInBills] = useState(false)
  const [bills, setBills] = useState<Bill[]>([])

  useEffect(() => {

    const data = sessionStorage.getItem("currentUser");
    if (!data) return

    const user = JSON.parse(data);

    let paidBills = 0, dueBills = 0, upcomingBills = 0

    user.recurringBills.forEach((bill:Bill)=>{
      if(bill.status == "inactive" || bill.status == "pause") return

      if(bill.AutoPay){
        const due = new Date(bill.dueDate)
        const currentDate = new Date()

        const minutesDifference = due.getTime() - currentDate.getTime();
        const daysLeft = Math.floor(minutesDifference / (1000 * 60 * 60 * 24));

        switch(bill.frenquently){
    
          case "monthly":
            const start = due
            start.setDate(1)
            start.setMonth(start.getMonth() - 1)
            const lastDate = new Date(start.getFullYear(),start.getMonth() + 1,0);
            lastDate.getDate() < due.getDate() ? start.setDate(lastDate.getDate()) : start.setDate(due.getDate())
            bill.lastPayment = start.toISOString().split("T")[0]
            break

          case "weekly":
            const cloneDate = due
            cloneDate.setDate(cloneDate.getDate() - 7)
            if(cloneDate.getTime() > new Date(bill.startDate).getTime()) bill.lastPayment = cloneDate.toISOString().split("T")[0]
            break;

          default:
            break
            return
        }

        if(daysLeft <= 5) upcomingBills += bill.amount
        else paidBills += bill.amount
      }//end of if

      else if(bill.lastPayment !== "No payment" && bill.lastPayment != undefined){
        const currentDate = new Date()
        let nextpayment = new Date(nextPaymentDate(new Date(bill.lastPayment), bill.dueDate, bill.frenquently))

        if(nextpayment < currentDate){
          while(nextpayment < currentDate){

            dueBills += bill.amount
            nextpayment = new Date(nextPaymentDate(nextpayment, bill.dueDate, bill.frenquently))
          }//end of while loop
        }
        else{
          const currentDate = new Date()
          const due = new Date(bill.dueDate)

          const minutesDifference = due.getTime() - currentDate.getTime();
          const daysLeft = Math.floor(minutesDifference / (1000 * 60 * 60 * 24));

          if(daysLeft <= 5) upcomingBills += bill.amount
          else paidBills += bill.amount
        }

      }//end of if
      
      else{
        let nextPayments = new Date(nextPaymentDate(new Date(bill.startDate), bill.dueDate, bill.frenquently))
        
        while(nextPayments < new Date(bill.dueDate) && nextPayments < new Date() && !bill.AutoPay) {
          dueBills += bill.amount
          nextPayments = new Date(nextPaymentDate(nextPayments, bill.dueDate, bill.frenquently))
        }
     
      }//end of else
    })

    setBills(user.recurringBills)
    setPaid(paidBills)
    setDue(dueBills) 
    setUpcoming(upcomingBills)
    
    update.current = !update.current

  }, [checkUpdate, changedBills]);

  return (
    <div className="flex flex-row items-start gap-1 flex-wrap md:justify-start m-1 w-full md:w-[90%] h-[80%] overflow-x-hidden">
      {bills.map((bill) => (
        <BillCard
          key={bill.id}
          id={bill.id}
          title={bill.title}
          amount={bill.amount}
          description={bill.description}
          startDate={bill.startDate}
          dueDate={bill.dueDate}
          endDate={bill.endDate}
          lastPayment={bill.lastPayment ?? "No payment"}
          category={bill.category}
          duration={bill.duration}
          frenquently={bill.frenquently}
          status={bill.status}
          AutoPay={bill.AutoPay}
          billNotification={setChangeInBills}
        />
      ))}
    </div>
  );
}
