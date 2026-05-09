"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setAppLoadingStatus } from "@/app/state_management/slices/loadStatus";
import { updateBillValues } from "@/app/functions/bills/UpdateBillValues";

type PROP = {
  status: string;
  autoPay: boolean;
  bill_id: number;
  setAutopay: (value: boolean) => void;
  setLoading: (value: boolean) => void;
};
export default function AutoPayComponent({
  status,
  autoPay,
  bill_id,
  setAutopay,
  setLoading,
}: PROP) {

  const dispatch = useDispatch()
  const [clicked, setClicked] = useState(autoPay);

  return (
    <div className="flex flex-row items-start justify-between w-30 p-1"
    style={{pointerEvents: status == "inactive" ? "none" : "auto"}}
    >
      <div
        className="outline-3 outline-black/30 w-[40px] h-[20px]  overflow-hidden rounded-lg p-0"
        onClick={async () => {
          const oppositeAutoPay = !autoPay;
          setLoading(true);
          dispatch(setAppLoadingStatus())
          const updateResult = await updateBillValues(
            bill_id,
            "autopay",
            oppositeAutoPay,
            setLoading,
          );

          if (updateResult == "Done Upadating?.") {
            setClicked(oppositeAutoPay);
            setAutopay(oppositeAutoPay);
          } else {
            alert("failed to set AutoPay!.");
          }
        }}
      >
        <button
          className="relative w-full h-full cursor-pointer transition-all duration-700"
          style={{ background: clicked ? "lime" : "gray" }}
        >
          <div
            className="absolute flex items-center justify-center top-[10%] bg-[whitesmoke] w-[18px] h-[80%] rounded-full transition-all duration-300"
            style={{ left: clicked ? "5%" : "50%" }}
          >
            <span className="text-[7.5px] text-black/60 font-bold transition-all duration-300">
              {clicked ? "ON" : "OFF"}
            </span>
          </div>
        </button>
      </div>
      <label className="text-xs my-auto text-black/40">Autopay</label>
    </div>
  );
}
