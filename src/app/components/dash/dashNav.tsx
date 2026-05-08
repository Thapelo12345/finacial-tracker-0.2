"use client";
import LinkBtns from "../ui/buttons/linkBtns";
import {
  HomeIcon,
  ArrowsUpDownIcon,
  ChartPieIcon,
  DocumentCurrencyDollarIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/20/solid";

export default function DashNav() {
  return (
    <nav className="flex flex-col w-1/2">
      <LinkBtns
        pageUrl="/expenseApp/dashBoard/"
        linkText="Overview"
        btnUrl="/expenseApp/dashBoard"
        icon={<HomeIcon />}
      />

      <LinkBtns
        pageUrl="/expenseApp/dashBoard/transaction"
        linkText="Transactions"
        btnUrl="/expenseApp/dashBoard/transaction"
        icon={<ArrowsUpDownIcon />}
      />

      <LinkBtns
        pageUrl="/expenseApp/dashBoard/budget"
        linkText="Budget"
        btnUrl="/expenseApp/dashBoard/budget"
        icon={<ChartPieIcon />}
      />

      <LinkBtns
        pageUrl="/expenseApp/dashBoard/pots"
        linkText="Pots"
        btnUrl="/expenseApp/dashBoard/pots"
        icon={<DocumentCurrencyDollarIcon />}
      />

      <LinkBtns
        pageUrl="/expenseApp/dashBoard/recurringBills"
        linkText="Recurring Bills"
        btnUrl="/expenseApp/dashBoard/recurringBills"
        icon={<ReceiptRefundIcon className="w-5 h-5 mr-2" />}
      />
    </nav>
  );
}
