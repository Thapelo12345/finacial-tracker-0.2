
import MiniCell from "./miniCell";
import { useState, useEffect } from "react";

interface Transaction {
  date: string;
  name: string;
  description: string;
  category: string;
  transactionType: string;
  amount: number;
}

export default function MiniTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const data = sessionStorage.getItem("currentUser");

    if (data) {
      const user = JSON.parse(data);
      setTransactions(user.transactions || []);
    }
    else{
      setTransactions([]);
    }
  }, []);

  return (
    <div className="w-full h-full overflow-x-hidden overflow-y-auto">
      <ul className="w-full h-full">
        {transactions.map((transaction) => (
          <MiniCell
            key={transaction.date + transaction.name}
            Date={transaction.date}
            Name={transaction.name}
            Category={transaction.category}
            Type={transaction.transactionType}
            Amount={transaction.amount}
          />
        ))}
      </ul>
    </div>
  );
}
