"use client";
import BillCard from "./billCard";
import { useSelector } from "react-redux";
import type { RootState } from "../../state management/store";
import type { DataBaseBill } from "@/app/interFaces/billInterface";
import { useState, useEffect } from "react";

export default function BillsContainer() {
  const checkUpdate = useSelector(
    (state: RootState) => state.updateApp.updateApp
  );

  const [bills, setBills] = useState<DataBaseBill[]>([]);

  useEffect(() => {
    const data = sessionStorage.getItem("currentUser");

    if (data) {
      const user = JSON.parse(data);
      setBills(user.recurringBills);
    }
  }, [checkUpdate]);

  return (
    <div className="flex flex-row flex-wrap justify-start w-[90%] h-[80%]">
      {bills.map((bill) => (
        <BillCard
          key={bill.id}
          billId={bill.id}
          title={bill.title}
          amount={bill.amount}
          description={bill.description}
          startDate={bill.startDate}
          dueDate={bill.dueDate}
          endDate={bill.endDate}
          category={bill.category}
          duration={bill.duration}
          frenquently={bill.frenquently}
          billStatus={bill.status}
        />
      ))}
    </div>
  );
}
