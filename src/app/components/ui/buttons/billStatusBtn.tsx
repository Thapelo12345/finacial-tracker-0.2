"use client"

import { motion } from "framer-motion";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { BillContext, LoadContext } from "@/app/context/billContext";
import { updateBillValues } from "@/app/functions/bills/UpdateBillValues";
import { setAppLoadingStatus } from "@/app/state management/slices/loadStatus";

const statusArray: string[]= ["active", "pause", "inactive"];

export default function BillStatusButton() {
  const dispatch = useDispatch()
  const theme = useContext(BillContext);
  const load = useContext(LoadContext);

  return (
    <motion.div
      className="relative text-white text-sm font-bold p-2 rounded-sm cursor-pointer transition-all duration-700"
      style={{
        backgroundColor: theme.headColor,
      }}
      whileHover={{scale:0.9}}
      whileTap={{
        scale: 1.1,
        rotateY: 360,
      }}
      transition={{
        duration: 0.5,
        repeatType: "reverse",
      }}
      onClick={async() => {
        const statusPosition = statusArray.indexOf(theme.statusTheme)
        const newStatus = statusPosition + 1 < 3 ? statusArray[statusPosition + 1] : statusArray[0]

      load.load(true);
      dispatch(setAppLoadingStatus())

      const uplaodResult = await updateBillValues(theme.cardId, "status", newStatus, load.load)

      if(uplaodResult == "Done Upadating?.") theme.setTheme(newStatus)
        else{alert("Failed to update data!...")}

      }}
    >
      {theme.statusTheme.toUpperCase()}
    </motion.div>
  );
}
