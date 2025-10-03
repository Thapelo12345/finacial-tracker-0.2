"use client";
import BalanceContainer from "@/app/ui/balanceContainer";
import PageHeader from "@/app/ui/pageHeader";
import BillsContainer from "@/app/components/bills/billsContainer";
import { useDispatch } from "react-redux";
import { onOffSubmit } from "@/app/state management/openSubmition";
import { settingSelected } from "@/app/state management/selectSubmit";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/state management/store";
import { DaysLeft } from "@/app/functions/bills/billGetnextPayment";
import { getNextPaymentDate } from "@/app/functions/bills/billGetnextPayment";
import { DataBaseBill } from "@/app/interFaces/billInterface";
import AddItemBtn from "@/app/ui/buttons/addItemBtn";

export default function Bills() {
  const checkUpdate = useSelector(
    (state: RootState) => state.updateApp.updateApp
  );
  const dispatch = useDispatch();

  const [paidBills, setPaidBills] = useState(0);
  const [dueBills, setDueBills] = useState(0);
  const [upcoming, setUpcoming] = useState(0);

  const addBill = () => {
    dispatch(settingSelected("bills"));
    dispatch(onOffSubmit());
  };

  useEffect(() => {
    const data = sessionStorage.getItem("currentUser");

    if (data) {
      const user = JSON.parse(data);

      if (user.recurringBills.length !== 0) {
        user.recurringBills.forEach((bill: DataBaseBill) => {
          const countDays = DaysLeft(
            getNextPaymentDate(bill.startDate, bill.dueDate, bill.frenquently)
          );

          const counter = (): number => {
            switch (bill.frenquently) {
              case "weekly":
                return 4;
                break;

              case "monthly":
                return 10;
                break;

              case "yearlty":
                return 20;
                break;

              default:
                return 0;
                break;
            }
          };

          if (countDays <= counter() && countDays > counter() * 0.5) {
            const formatAmount = upcoming + bill.amount;
            setUpcoming(Number(formatAmount.toFixed(2)));
          } else if (countDays <= counter() * 0.5 && counter() > 0) {
            const formatAmount = dueBills + bill.amount;
            setDueBills(Number(formatAmount.toFixed(2)));
          } else {
            const formatAmount = paidBills + bill.amount;
            setPaidBills(Number(formatAmount.toFixed(2)));
          }
        });
      } //end of if array length
      else {
        setPaidBills(0);
        setDueBills(0);
        setUpcoming(0);
      } //end of else array length
    }
  }, [checkUpdate]);

  return (
    <main className="m-2 p-4 pb-15 md:pb-4 w-screen h-screen overflow-y-auto">
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
        <BillsContainer />
      </div>
    </main>
  );
}
