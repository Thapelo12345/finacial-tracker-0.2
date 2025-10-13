"use client";
import { TrashIcon } from "@heroicons/react/20/solid";
import { useGSAP } from "@gsap/react";
import { useState, useEffect } from "react";
import { DaysLeft } from "@/app/functions/bills/billGetnextPayment";
import gsap from "gsap";
import { DataBaseBill } from "@/app/interFaces/billInterface";
import BillCardHeader from "@/app/ui/bills/billCardHeader";
import DeleteBill from "@/app/functions/bills/deleteBill";
import { motion } from "framer-motion";
import BillTables from "./billTables";
import { BillContext, LoadContext } from "@/app/context/billContext";
import BillLoader from "./billCardLoad";
import { getNextPaymentDate } from "@/app/functions/bills/billGetnextPayment";
import { UpdateBill } from "@/app/functions/bills/updateBill";

type Props = {
  billId: number;
  title: string;
  description: string;
  amount: number;
  startDate: string;
  dueDate: string;
  endDate: string;
  category: string;
  duration: string;
  frenquently: string;
  billStatus: string;
};

export default function BillCard({
  billId,
  title,
  amount,
  description,
  startDate,
  dueDate,
  endDate,
  category,
  duration,
  frenquently,
  billStatus,
}: Props) {
  const currentColor = (value: string): string => {
    switch (value) {
      case "active":
        return "lime";
        break;

      case "pause":
        return "orange";
        break;

      case "inactive":
        return "hsl(37 7.7% 30%)";
        break;
      default:
        return "white";
    }
  };

  const [billMessage, setBillMessage] = useState("bill up to date");
  const [billMessageColor, setBillMessageColor] = useState("lime");
  const [status, setStatus] = useState(billStatus);
  const [color, setColor] = useState(currentColor(billStatus));
  const [load, setLoad] = useState(false);

  // strat date - due date - frenqulty
  const nextDueDate = getNextPaymentDate(startDate, dueDate, frenquently);

  function currentBill(): DataBaseBill | null {
    const data = sessionStorage.getItem("currentUser");

    if (data) {
      const user = JSON.parse(data);

      const currentBill = user.recurringBills.find(
        (item: DataBaseBill) => item.id === billId
      );
      return currentBill !== undefined ? currentBill : null;
    }
    return null;
  }

  useEffect(() => {
    setColor(currentColor(status));

    if (load == true) {
      const crrBill = currentBill();

      if (crrBill !== null) {
        crrBill.status = status;
        UpdateBill(crrBill, setLoad);
      }
    } //end of currentBill if
  }, [status]);

  useEffect(() => {
    const days = DaysLeft(nextDueDate);
    const counter = (): number => {
      switch (frenquently) {
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

    if (days <= counter() && days > counter() * 0.5) {
      setBillMessage("Upcoming bill");
      setBillMessageColor("skyblue");
    } else if (days <= counter() * 0.5 && counter() > 0) {
      setBillMessage("bill due");
      setBillMessageColor("red");
    } else {
      setBillMessage("bill up to date");
      setBillMessageColor("lime");
    }
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      ".bill-card",
      {
        scale: 0.1,
        opacity: 0.3,
        duration: 0.9,
        boxShadow: 0,
      },
      {
        scale: 1,
        opacity: 1,
        boxShadow: "1px 7px 10px rgba(0,0,0,0.5)",
        stagger: 0.2,
      }
    );
  });

  return (
    <LoadContext.Provider value={{ load: setLoad }}>
      <BillContext.Provider
        value={{ statusTheme: status, headColor: color, setTheme: setStatus }}
      >
        <motion.div
          className="bill-card relative flex flex-col m-2 w-full sm:max-w-100 p-1 rounded-lg"
          style={{
            backgroundColor: "whitesmoke",
            boxShadow: `1px 1px 5px black`,
          }}
        >
          {load && <BillLoader />}

          <BillCardHeader name={title} installment={amount} />

          <BillTables
            category={category}
            duration={duration}
            dueDate={nextDueDate}
            startDate={startDate}
            frenquently={frenquently}
            endDate={endDate}
          />

          <div
            className={`${
              status === "inactive" ? "hidden" : "block"
            } flex flex-row justify-between`}
          >
            <motion.label
              initial={{
                scale: 0.9,
                boxShadow: "none",
              }}
              animate={{
                scale: 1,
                boxShadow: `1px 9px 20px rgba(0, 0, 0, 0.5)`,
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="text-white text-xs self-center font-extrabold p-2 ml-10 w-fit h-fit rounded-sm"
              style={{
                backgroundColor: billMessageColor,
                boxShadow: `1px 9px 20px rgba(0, 0, 0, 0.5)`,
                textShadow: "1px 1px 1px black",
              }}
            >
              {billMessage.toUpperCase()}
            </motion.label>
          </div>

          {/* descriptio section */}
          <div className="flex flex-col items-center m-2">
            <label className="text-md text-black/30 font-semibold">
              Description
            </label>
            <p
              className="text-sm font-bold bg-black/10 font-serif rounded-md text-white p-2 m-2 "
              style={{
                textShadow: "0px 0px 2px black",
              }}
            >
              {description}
            </p>
          </div>

          <div className="m-2">
            <button onClick={() => DeleteBill(billId)}>
              <TrashIcon className="w-5 h-5 text-red-500" />
            </button>
          </div>
        </motion.div>
      </BillContext.Provider>
    </LoadContext.Provider>
  );
}
