import { motion } from "framer-motion";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { useContext, useState } from "react";
import { BudgetContext } from "@/app/context/budgetContext";
import { useDispatch } from "react-redux";
import { selectDialog } from "../state_management/slices/selectDialog";
import { openCloseDialog } from "../state_management/slices/openCloseDialog";

type Props = {
  currentBalance: number;
  closing: () => void;
};

export default function BalanceInput({ currentBalance, closing }: Props) {
  const dispatch = useDispatch();
  const update = useContext(BudgetContext);

  const [finalAmount, setFinalAmount] = useState(update.budgetAmount);

  return (
    <div className="w-full m-2 flex flex-col items-center justify-center mb-0 p-1 overflow-hidden">
      <input
        className="p-1 m-1 w-full text-xs bg-[whitesmoke] rounded-sm focus:outline-0 overflow-hidden"
        style={{
          boxShadow:
            "inset 2px 2px 2px hsl(2, 3%, 70%), inset -2px -2px 4px rgba(255, 255, 255, 0.5",
        }}
        type="number"
        placeholder={currentBalance.toString()}
        required
        onChange={(e) => {
          const crrValue: number = Number(e.target.value);
          setFinalAmount(crrValue);
        }}
      ></input>

      <motion.button
        className="p-0"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          type: "tween",
          ease: "linear",
        }}
        onClick={() => {
          dispatch(selectDialog("load"));
          dispatch(openCloseDialog());
          update.updateAmount(finalAmount);
          closing();
        }}
      >
        <ArrowPathIcon className="w-4 h-4 text-green-500 m-2" />
      </motion.button>
    </div>
  );
}
