"use client";
import BalanceContainer from "@/app/components/ui/balanceContainer";
import PageHeader from "@/app/components/ui/pageHeader";
import BillsContainer from "@/app/components/bills/billsContainer";
import { useDispatch } from "react-redux";
import { onOffSubmit } from "@/app/state_management/slices/openSubmition";
import { settingSelected } from "@/app/state_management/slices/selectSubmit";
import { useState, useEffect, createContext } from "react";
import { useSelector } from "react-redux";
import { getFormType } from "@/app/state_management/slices/billType";
import type { RootState } from "@/app/state_management/store";
import { checkingArrears } from "@/app/functions/bills/billDates";
import Bill from "@/app/interFaces/billInterface";
import AddItemBtn from "@/app/components/ui/buttons/addItemBtn";

 export const updateParent = createContext<{
  update: boolean,
  setUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  } | null>(null)

export default function Bills() {
  const checkUpdate = useSelector((state: RootState) => state.updateApp.updateApp,);
  const dispatch = useDispatch();
  
  const [paidBills, setPaidBills] = useState(0);
  const [dueBills, setDueBills] = useState(0);
  const [upcoming, setUpcoming] = useState(0);

  const addBill = () => {
    dispatch(getFormType("add"));
    dispatch(settingSelected("bills"));
    dispatch(onOffSubmit());
  };

  useEffect(() => {
    const data = sessionStorage.getItem("currentUser");

    if (!data) return;
    const user = JSON.parse(data);

    let dueAmount = 0,
      paidAmount = 0,
      upcomingAmount = 0;

    user.recurringBills.forEach((bill: Bill) => {
      const currentDate = new Date();
      const due = new Date(bill.dueDate);

      if (bill.lastPayment == undefined) return;

      const arrears = checkingArrears(
        bill.amount,
        bill.startDate,
        bill.lastPayment,
        bill.dueDate,
        bill.frenquently,
      );
      if (arrears.arrearsCount != 0) {
        dueAmount += arrears.arrearsAmount;
      } 
      else {
        
        const minutesDifference = due.getTime() - currentDate.getTime()
        const daysLeft = Math.floor(minutesDifference / (1000 * 60 * 60 * 24))
        daysLeft <= 5 ? upcomingAmount += bill.amount : paidAmount += bill.amount

      }//end of else

        setPaidBills(paidAmount)
        setDueBills(dueAmount)
        setUpcoming(upcomingAmount)
    }); //end of each loop
  }, [checkUpdate]);

  return (
    <main className="md:m-2 md:p-4 pb-15 md:pb-4 w-screen h-screen overflow-y-auto">
      <PageHeader title="Recurring Bills" />
      <div className="flex flex-row flex-wrap justify-start">
        <BalanceContainer
          activeClick={false}
          title="Paid Bills"
          amount={paidBills}
        />
        <BalanceContainer
          activeClick={false}
          title="Bills Due"
          amount={dueBills}
        />
        <BalanceContainer
          activeClick={false}
          title="Upcoming Bills"
          amount={upcoming}
        />

        <AddItemBtn tipText="Add a Bill" btnFunction={addBill} />
      </div>

      <div className="flex flex-row w-screen h-auto overflow-y-auto">
        <BillsContainer setPaid={setPaidBills} setDue={setDueBills} setUpcoming={setUpcoming} />
      </div>
    </main>
  );
}
