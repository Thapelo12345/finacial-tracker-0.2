// import TransactionCell from "../../components/transactionCell";
import MiniCell from "./miniCell";
import { useState, useEffect } from "react";

// const transactions: {
//   date: string;
//   name: string;
//   description: string;
//   category: string;
//   type: string;
//   amount: number;
// }[] = [
//   {
//     date: '2025-07-10',
//     name: 'Pick n Pay',
//     description: 'Groceries for the week',
//     category: 'Food',
//     type: 'Expense',
//     amount: 780.5,
//   },
//   {
//     date: '2025-07-09',
//     name: 'Salary',
//     description: 'Monthly salary deposit',
//     category: 'Income',
//     type: 'Income',
//     amount: 18500.0,
//   },
//   {
//     date: '2025-07-08',
//     name: 'Uber',
//     description: 'Trip to work',
//     category: 'Transport',
//     type: 'Expense',
//     amount: 95.0,
//   },
//   {
//     date: '2025-07-07',
//     name: 'Netflix',
//     description: 'Monthly subscription',
//     category: 'Entertainment',
//     type: 'Expense',
//     amount: 169.0,
//   },
//   {
//     date: '2025-07-06',
//     name: 'Cash Withdrawal',
//     description: 'ATM withdrawal',
//     category: 'Cash',
//     type: 'Expense',
//     amount: 500.0,
//   },
//   {
//     date: '2025-07-05',
//     name: 'Woolworths',
//     description: 'Clothing purchase',
//     category: 'Shopping',
//     type: 'Expense',
//     amount: 1200.0,
//   },
//   {
//     date: '2025-07-04',
//     name: 'YouTube Premium',
//     description: 'Subscription fee',
//     category: 'Entertainment',
//     type: 'Expense',
//     amount: 72.0,
//   },
//   {
//     date: '2025-07-03',
//     name: 'Electricity Bill',
//     description: 'Prepaid voucher',
//     category: 'Utilities',
//     type: 'Expense',
//     amount: 600.0,
//   },
//   {
//     date: '2025-07-02',
//     name: 'Freelance Work',
//     description: 'Payment from client',
//     category: 'Income',
//     type: 'Income',
//     amount: 3500.0,
//   },
//   {
//     date: '2025-07-01',
//     name: 'KFC',
//     description: 'Dinner with friends and having fun with co leagues',
//     category: 'Food',
//     type: 'Expense',
//     amount: 230.0,
//   },
// ];

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
