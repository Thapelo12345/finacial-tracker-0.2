"use client";
import MobileLinks from "@/app/ui/buttons/mobileLinks";
import { usePathname } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import { SettingsContext } from "@/app/context/settingsContext";
import MobileAvatar from "@/app/ui/mobileAvatar";
import {
  HomeIcon,
  ArrowsUpDownIcon,
  ChartPieIcon,
  DocumentCurrencyDollarIcon,
  ReceiptRefundIcon,
  ChevronDoubleUpIcon,
  ChevronDoubleDownIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/20/solid";
import MobileSettings from "./mobileSettings";
import { SignOut } from "@/app/functions/authFunctions/signOut";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/state management/store";

export default function MobileDash() {
  const navigate = useRouter()
  const settings = useContext(SettingsContext);
   const checkUpdate = useSelector(
    (state: RootState) => state.updateApp.updateApp
  );

  const location = usePathname();
  const currentUrl = location;
  const [currentPage, setCurrentPage] = useState("/");
  const [name , setName] = useState("User not found!")
  const [pic, setPic] = useState("")

  useEffect(() => {
    setCurrentPage(currentUrl);
  }, [currentUrl]);

  useEffect(()=>{
    const data = sessionStorage.getItem("currentUser")
    if(data){
      const user = JSON.parse(data)
      setName(user.name)
      setPic(user.avatar)
    }
  }, [checkUpdate])

  const handleSignOut = ()=>{SignOut(navigate.push)}

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
        <MobileAvatar name={name} avatar={pic} />

        {/* <div className="bg-blue-400 w-8 h-8 absolute left-[40px] bottom-9 rounded-sm z-20"> */}
        {/* </div> */}

        <button
          className="text-white m-1 bg-black/90 p-2 absolute left-0 bottom-9 rounded-sm z-20"
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

        <button
          className="text-white bg-black/90 m-1 p-1 absolute right-0 bottom-9 rounded-sm z-20"
          onClick={handleSignOut}
        >
       <ArrowRightStartOnRectangleIcon className="w-5 h-5"/>
        </button>
      </nav>
    </header>
  );
}
