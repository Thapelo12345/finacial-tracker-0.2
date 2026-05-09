"use client";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/20/solid";
import { useGSAP } from "@gsap/react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Bill from "@/app/interFaces/billInterface";
import BillProgressPaymentComponent from "./billprogressPayment";
import BillCardHeader from "@/app/components/ui/bills/billCardHeader";
import DeleteBill from "@/app/functions/bills/deleteBill";
import AutoPayComponent from "../ui/bills/billAutoPay";
import { motion } from "framer-motion";
import BillTables from "./billTables";
import { BillContext, LoadContext } from "@/app/context/billContext";
import BillLoader from "./billCardLoad";
import {
  getNextDueDate,
  nextPaymentDate,
  checkingArrears,
} from "@/app/functions/bills/billDates";
import { useDispatch, useSelector } from "react-redux";
import { onOffSubmit } from "@/app/state management/slices/openSubmition";
import { setBillSlice } from "@/app/state management/slices/bill";
import { settingSelected } from "@/app/state management/slices/selectSubmit";
import { UpdateBill } from "@/app/functions/bills/updateBill";
import { updateBillValues } from "@/app/functions/bills/UpdateBillValues";
import { getFormType } from "@/app/state management/slices/billType";
import { setAppLoadingStatus } from "@/app/state management/slices/loadStatus";
import type { RootState } from "@/app/state management/store";
import ArrearsComponent from "./arrearsComponent";

type PROPS = Bill & { billNotification: (value: boolean) => void };

export default function BillCard({
  id,
  title,
  amount,
  description,
  startDate,
  dueDate,
  endDate,
  lastPayment,
  category,
  duration,
  frenquently,
  status,
  AutoPay,
  billNotification,
}: PROPS) {
  function currentTextColor(value: string): string {
    switch (value) {
      case "active":
        return "lime";
      case "pause":
        return "orange";
      case "inactive":
        return "grey";
      default:
        return "white";
    }
  }

  function selectThemeColor(statusValue: string) {
    if (statusValue == "active") return "oklch(80.9% 0.105 251.813)";
    else if (statusValue == "pause") return "orange";
    else if (statusValue == "inactive") return "gray";
  }

  const dispatch = useDispatch();
  const billLoading = useSelector(
    (state: RootState) => state.billLoader.billLoad,
  );
  const currentBillId = useSelector((state: RootState) => state.bill.id);
  const appUpdate = useSelector(
    (state: RootState) => state.updateApp.updateApp,
  );

  const billChangedTo = useRef(false);

  const [billMessage, setBillMessage] = useState("bill up to date");
  const [statusColor, setStatusColor] = useState(selectThemeColor(status));
  const [autopay, setAutoPay] = useState(AutoPay);
  const [billMessageColor, setBillMessageColor] = useState("lime");
  const [lastpaymentDate, setLastPaymentDate] = useState<string>(
    lastPayment == undefined ? "No payment" : lastPayment,
  );
  const [billStatus, setStatus] = useState(status);
  const [textColor, setColor] = useState(currentTextColor(billStatus));
  const [load, setLoad] = useState(false);
  const [arrears, setArrears] = useState<{
    arrearsCount: number;
    arrearsAmount: number;
  }>(checkingArrears(amount, startDate, lastpaymentDate, dueDate, frenquently));
  const nextDueDate = getNextDueDate(startDate, dueDate, frenquently);

  function currentBill(): Bill | null {
    const data = sessionStorage.getItem("currentUser");

    if (data) {
      const user = JSON.parse(data);

      const currentBill = user.recurringBills.find(
        (item: Bill) => item.id === id,
      );
      return currentBill !== undefined ? currentBill : null;
    }
    return null;
  }

  useEffect(() => {
    if (autopay) {
      const due = new Date(dueDate);
      const clone = due;

      switch (frenquently) {
        case "yearly":
          clone.setFullYear(clone.getFullYear() - 1);
          break;

        case "monthly":
          clone.setDate(1);
          clone.setMonth(clone.getMonth() - 1);
          const lastDate = new Date(
            clone.getFullYear(),
            clone.getMonth() + 1,
            0,
          ).getDate();
          clone.setDate(due.getDate() >= lastDate ? lastDate : due.getDate());
          break;

        case "weekly":
          clone.setDate(clone.getDate() - 7);
          break;

        default:
          return;
          break;
      }

      const formatedDate = clone.toISOString().split("T")[0];
      if (lastpaymentDate == formatedDate) return;

      updateBillValues(id, "lastpayment", formatedDate, setLoad);
      if (lastPayment != lastpaymentDate) setLastPaymentDate(formatedDate);
    } //end of auto pay
    setArrears(
      checkingArrears(amount, startDate, lastpaymentDate, dueDate, frenquently),
    );
  }, [appUpdate, autopay]);

  useEffect(() => {
    setColor(currentTextColor(billStatus));
    setStatusColor(selectThemeColor(billStatus));

    if (load == true) {
      const crrBill = currentBill();

      if (crrBill !== null) {
        crrBill.status = status;
        UpdateBill(crrBill, setLoad);
      }
    } //end of currentBill if

    const currentDate = new Date();
    const due = new Date(dueDate);

    if (arrears.arrearsCount !== 0) {
      setBillMessage("bill due");
      setBillMessageColor("red");
    } else {
      const minutesDifference = due.getTime() - currentDate.getTime();
      const daysLeft = Math.floor(minutesDifference / (1000 * 60 * 60 * 24));

      if (daysLeft <= 5) {
        setBillMessage("Upcoming bill");
        setBillMessageColor("skyblue");
      } else {
        setBillMessage("bill up to date");
        setBillMessageColor("lime");
      }
    }
  }, [status, arrears, load]);

  useEffect(() => {if (currentBillId == id) setLoad(billLoading);}, [billLoading]);

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
      },
    );
  });

  return (
    <LoadContext.Provider value={{ load: setLoad }}>
      <BillContext.Provider
        value={{
          cardId: id,
          statusTheme: status,
          headColor: textColor,
          setTheme: setStatus,
        }}
      >
        <motion.div
          className="bill-card"
          style={{
            backgroundColor: "whitesmoke",
            boxShadow: `1px 1px 5px black`,
          }}
        >
          {load && <BillLoader />}

          <BillCardHeader name={title} installment={amount} />

          <div className="bill-main">
            {/* descriptio section */}
            <div className="flex flex-col items-center m-2">
              <label
                className=" text-blue-300 rounded-md text-md p-1 font-semibold"
                style={{
                  textShadow:
                    "0.5px 0.5px 0.5px white, -0.5px -0.5px 0.1px white",
                }}
              >
                Description
              </label>
              <p className="text-sm text-black/40 rounded-md p-2 m-2 ">
                {description}
              </p>
            </div>

            <BillTables
              category={category}
              duration={duration}
              dueDate={nextDueDate}
              startDate={startDate}
              frenquently={frenquently}
              endDate={endDate}
              lastPayment={lastpaymentDate}
            />

            <AutoPayComponent
              status={status}
              autoPay={autopay}
              bill_id={id}
              setAutopay={setAutoPay}
              setLoading={setLoad}
            />

            {duration !== "continously" && (
              <BillProgressPaymentComponent
                lastpayment={lastpaymentDate}
                startdate={startDate}
                dueDate={dueDate}
                endDate={endDate}
                amount={amount}
                frequantly={frenquently}
              />
            )}

            <div
              className={`${status === "inactive" ? "hidden" : "block"} flex flex-row items-start justify-evenly m-3`}
            >
              <label
                className=" text-xs font-bold p-2 w-fit h-fit rounded-sm"
                style={{ color: billMessageColor }}
              >
                {billMessage.toUpperCase()}
              </label>

              {arrears.arrearsCount !== 0 && !autopay && (
                <ArrearsComponent
                  arrears={arrears.arrearsCount}
                  arrearsAmount={arrears.arrearsAmount}
                />
              )}
            </div>
          </div>

          <div className="flex flex-row items-start justify-between">
            <button
              className="text-xs text-white m-2 p-2 w-fit rounded-md cursor-pointer"
              style={{ background: statusColor }}
              onClick={async () => {
                if (arrears.arrearsCount == 0) return;
                const paymentBeforeDueDate = new Date(dueDate);

                switch (frenquently) {
                  case "yearly":
                    paymentBeforeDueDate.setFullYear(
                      paymentBeforeDueDate.getFullYear() - 1,
                    );
                    break;

                  case "nonthly":
                    paymentBeforeDueDate.setDate(1);
                    paymentBeforeDueDate.setMonth(
                      paymentBeforeDueDate.getMonth() - 1,
                    );
                    break;

                  case "weekly":
                    paymentBeforeDueDate.setDate(
                      paymentBeforeDueDate.getDate() - 7,
                    );
                    break;

                  default:
                    break;
                }

                let setDayDate = paymentBeforeDueDate.getDate();

                if (frenquently == "monthly") {
                  // getting last daye date
                  const lastDate = new Date(
                    paymentBeforeDueDate.getFullYear(),
                    paymentBeforeDueDate.getMonth() + 1,
                    0,
                  ).getDate();
                  const targetDueDate = new Date(dueDate).getDate();

                  if (lastDate < targetDueDate) setDayDate = lastDate;
                }

                const data = sessionStorage.getItem("currentUser");
                if (!data) {
                  alert("No use data FOUND!");
                  return;
                }

                const formatedDate = `${paymentBeforeDueDate.getFullYear()}-${String(paymentBeforeDueDate.getMonth()).padStart(2, "0")}-${String(setDayDate).padStart(2, "0")}`;
                const currentBill = JSON.parse(data).recurringBills.find(
                  (bill: Bill) => bill.id === id,
                );
                currentBill.lastPayment = formatedDate;

                try {
                  setLoad(true);
                  dispatch(setAppLoadingStatus())

                  await UpdateBill(currentBill, setLoad);
                  setLastPaymentDate(formatedDate);
                  setArrears({ arrearsCount: 0, arrearsAmount: 0.0 });
                } catch (err: Error | unknown) {
                  const errorMessage =
                    err instanceof Error
                      ? err.message
                      : "unknown firebase ERROR!...";
                  setLoad(false);
                  dispatch(setAppLoadingStatus())
                  alert(errorMessage);
                }
                
              }}
            >
              Clear Arrears
            </button>

            <button
              className="text-xs m-2 p-2 text-white rounded-md cursor-pointer w-fit"
              style={{ background: statusColor }}
              onClick={async () => {

                if (arrears.arrearsCount == 0) return;

                const startHere = new Date(
                  (lastpaymentDate != "No payment" &&
                    lastpaymentDate != undefined)
                    ? lastpaymentDate
                    : startDate,
                );
                const newPayment = nextPaymentDate(
                  startHere,
                  dueDate,
                  frenquently,
                );

                if (new Date(newPayment) < new Date(dueDate)) {
                  setLoad(true);
                  dispatch(setAppLoadingStatus())
                  const updateResult = await updateBillValues(
                    id,
                    "lastpayment",
                    newPayment,
                    setLoad,
                  );
                  if (updateResult == "Failed to update") {
                    alert("failed to update!.");
                    return;
                  }
                  setLastPaymentDate(newPayment);
                } 
              }}
            >
              Accout payed
            </button>
          </div>

          <div className="flex flex-row items-start justify-between m-2">
            <button
              className=" cursor-pointer"
              onClick={async () => {
                try {
                  await DeleteBill(id);

                  billChangedTo.current = !billChangedTo.current;
                  billNotification(billChangedTo.current);
                  
                } catch (err: Error | unknown) {
                  const errorMessage =
                    err instanceof Error
                      ? err.message
                      : "unknown firebase ERROR!...";
                  alert(errorMessage);
                }
              }}
            >
              <TrashIcon className="w-5 h-5 text-red-500" />
            </button>

            <button
              className="cursor-pointer"
              onClick={() => {
                dispatch(settingSelected("bills"));
                dispatch(getFormType("edit"));
                dispatch(onOffSubmit());

                dispatch(
                  setBillSlice({
                    id: id,
                    title: title,
                    amount: amount,
                    description: description,
                    startDate: startDate,
                    dueDate: dueDate,
                    endDate: endDate,
                    category: category,
                    duration: duration,
                    frenquently: frenquently,
                    lastPayment: lastpaymentDate,
                    AutoPay: autopay,
                    status: status,
                  }),
                );
              }}
            >
              <PencilSquareIcon className="w-5 h-5 text-green-400" />
            </button>
          </div>
        </motion.div>
      </BillContext.Provider>
    </LoadContext.Provider>
  );
}
