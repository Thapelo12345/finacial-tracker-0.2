"use client";
import PageHeader from "@/app/ui/pageHeader";
import TransactionTable from "@/app/components/transaction/transactionTable";
import BalanceContainer from "@/app/ui/balanceContainer";
import AddItemBtn from "@/app/ui/buttons/addItemBtn";
import { useDispatch } from "react-redux";
import { onOffSubmit } from "@/app/state management/openSubmition";
import { settingSelected } from "@/app/state management/selectSubmit";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/state management/store";
import { useState, useEffect } from "react";

export default function Transactions() {
  const dispatch = useDispatch();

  const checkUpdate = useSelector(
    (state: RootState) => state.updateApp.updateApp
  );
  const [transactionSurplus, setTransactionSurplus] = useState(0);
  const [totalAmount, setAmount] = useState(0);
  const [totalExpense, setExpense] = useState(0);

  useEffect(() => {
    const data = sessionStorage.getItem("currentUser");

    if (data) {
      const currentUser = JSON.parse(data);
      setAmount(currentUser.transactionTotal);
      setExpense(currentUser.transactionExpense);

      const surplus =
        currentUser.transactionTotal - currentUser.transactionExpense;
      setTransactionSurplus(Number(surplus.toFixed(2)));
    }
  }, [checkUpdate]);

  const addTransaction = () => {
    dispatch(settingSelected("transaction"));
    dispatch(onOffSubmit());
  };

  return (
    <main className="flex flex-col w-screen h-screen m-2 p-4 pb-15 md:pb-4overflow-y-auto">
      <PageHeader title="Transactions" />

      <div className="flex flex-col sm:flex-row justify-items-start w-full">
        <BalanceContainer
          activeClick={false}
          title="Total Income"
          amount={totalAmount}
        />
        <BalanceContainer
          activeClick={false}
          title="Tota Expense"
          amount={totalExpense}
        />
        <BalanceContainer
          activeClick={false}
          title="Surplus"
          amount={transactionSurplus}
        />

        <AddItemBtn tipText="Add a Transaction" btnFunction={addTransaction} />
      </div>

      <TransactionTable />
    </main>
  );
}
