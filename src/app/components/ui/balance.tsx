import BalanceContainer from "./balanceContainer";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/state_management/store";
import { useState, useEffect } from "react";

export default function Balances() {
  const checkUpdate = useSelector(
    (state: RootState) => state.updateApp.updateApp
  );

  const [currentBalance, setCurrentBalance] = useState(0.0);
  const [income, setIncome] = useState(0.0);
  const [expense, setExpense] = useState(0.0);

  useEffect(() => {
    const data = sessionStorage.getItem("currentUser");

    if (data) {
      const currentUser = JSON.parse(data);
      const currentBalance =
        currentUser.transactionTotal - currentUser.transactionExpense;

      setCurrentBalance(Number(currentBalance.toFixed(2)));
      setIncome(currentUser.income);
      setExpense(currentUser.transactionExpense);
    }
  }, [checkUpdate]);

  return (
    <div className="flex flex-col sm:flex-row w-full">
      <BalanceContainer
        activeClick={false}
        title="current balance"
        amount={currentBalance}
      />
      <BalanceContainer activeClick={false} title="Income" amount={income} />
      <BalanceContainer activeClick={false} title="Expenses" amount={expense} />
    </div>
  );
}
