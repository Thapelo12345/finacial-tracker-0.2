import TransactionCell from "@/app/components/ui/transaction/transactionCell";
import type { RootState } from "@/app/state management/store";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

interface Transaction {
  date: string;
  name: string;
  description: string;
  category: string;
  transactionType: string;
  amount: number;
  transactionId: number;
}

export default function TransactionTable() {
  const checkUpdate = useSelector(
    (state: RootState) => state.updateApp.updateApp
  );
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const data = sessionStorage.getItem("currentUser");

    if (data) {
      const user = JSON.parse(data);
      setTransactions(user.transactions || []);
    } else {
      setTransactions([]);
    }
  }, [checkUpdate]);

  return (
    <div className="w-[99%] h-[87%] overflow-y-auto overflow-x-hidden p-0 md:p-2">
      <ul className="w-full h-full pr-2 pt-4">
        {transactions.map((transaction, index) => (
          <TransactionCell
            key={`${transaction.date}-${transaction.name}-${index}`}
            Date={transaction.date}
            Name={transaction.name}
            Description={transaction.description}
            Category={transaction.category}
            Type={transaction.transactionType}
            Amount={transaction.amount}
            itemId={transaction.transactionId}
          />
        ))}
      </ul>
    </div>
  );
}
