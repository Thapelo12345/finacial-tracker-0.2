"use client";
import MobileLinks from "@/app/ui/buttons/mobileLinks";
import { usePathname } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { SettingsContext } from "@/app/context/settingsContext";
import {
  HomeIcon,
  ArrowsUpDownIcon,
  ChartPieIcon,
  DocumentCurrencyDollarIcon,
  ReceiptRefundIcon,
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/20/solid";
import MobileSettings from "./mobileSettings";

export default function MobileDash() {
  const settings = useContext(SettingsContext);

  const location = usePathname();
  const currentUrl = location;
  const [currentPage, setCurrentPage] = useState("/");

  useEffect(() => {
    setCurrentPage(currentUrl);
  }, [currentUrl]);

  return (
    <header
      className={`fixed z-50 bottom-0 left-0 bg-[rgb(13,13,13)] flex flex-row justify-evenly w-full rounded-none h-auto ${
        currentPage === "/" ? "hidden" : "block"
      }`}
    >
      <nav className="w-full flex flex-row justify-evenly items-start">
        <MobileLinks
          pageUrl="/expenseApp/dashBoard"
          toolTip={"Overview"}
          btnUrl="/expenseApp/dashBoard"
          icon={<HomeIcon />}
        />

        <MobileLinks
          pageUrl="/expenseApp/dashBoard/transaction"
          toolTip={"Transactions"}
          btnUrl="/expenseApp/dashBoard/transaction"
          icon={<ArrowsUpDownIcon />}
        />

        <MobileLinks
          pageUrl="/expenseApp/dashBoard/budget"
          toolTip={"Budgets"}
          btnUrl="/expenseApp/dashBoard/budget"
          icon={<ChartPieIcon />}
        />

        <MobileLinks
          pageUrl="/expenseApp/dashBoard/pots"
          toolTip={"Pots"}
          btnUrl="/expenseApp/dashBoard/pots"
          icon={<DocumentCurrencyDollarIcon />}
        />

        <MobileLinks
          pageUrl="/expenseApp/dashBoard/recurringBills"
          toolTip={"Bills"}
          btnUrl="/expenseApp/dashBoard/recurringBills"
          icon={<ReceiptRefundIcon />}
        />

        <MobileSettings />

        <button
          className="text-white m-1 bg-black/90 p-2 absolute left-0 bottom-13 rounded-sm z-20"
          onClick={() => {
            settings.setSettingsInput(!settings.settingsInput);
            settings.setClicked("updateImage");
            settings.closeSettings(!settings.currentValue);
          }}
        >
          {!settings.currentValue && (
            <ChevronDoubleUpIcon className="font-semibold w-4 h-4" />
          )}
          {settings.currentValue && (
            <ChevronDoubleDownIcon className="font-semibold w-4 h-4" />
          )}
        </button>
      </nav>
    </header>
  );
}
