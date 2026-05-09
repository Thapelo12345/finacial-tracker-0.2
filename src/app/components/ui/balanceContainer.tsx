import { useGSAP } from "@gsap/react";
import { useState, useEffect } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/state_management/store";
import BalanceInput from "../balanceInput";

type Props = {
  activeClick: boolean;
  title: string;
  amount: number;
  actOnClick?: () => void; // Optional click handler
};

export default function BalanceContainer({
  activeClick,
  title,
  amount,
  actOnClick,
}: Props) {
  const checkUpdate = useSelector(
    (state: RootState) => state.updateApp.updateApp
  );
  const [activateInput, setActivateInput] = useState(false);
  const [currentBalance, setCurrentBalance] = useState(0);

  useGSAP(() => {
    gsap.fromTo(
      ".main-header",
      {
        scale: 0.1,
      },
      {
        scale: 1,
        duration: 0.6,
        ease: "spring(1, 0.5, 0, 1)",
        stagger: 0.2,
      }
    );
  });

  useEffect(() => {
    const data = sessionStorage.getItem("currentUser");

    if (data) {
      const currentUser = JSON.parse(data);
      setCurrentBalance(currentUser.currentBalance);
    }
  }, [checkUpdate]);

  return (
    <motion.div
      className="main-header overflow-x-hidden shadow-md transition-all duration-100 ease-in-out group flex flex-col items-center bg-white w-1/2 sm:w-1/3 md:w-1/6 m-2 p-2 md:p-4 rounded-[10px]"
      {...(!activateInput && {
        whileHover: {
          scale: 1,
          zIndex: 10,
          boxShadow: "1px 9px 20px rgba(0,0,0,0.7)",
          backgroundColor: "rgba(0,0,0,0.8)",
        },
      })}
      style={{ cursor: actOnClick ? "pointer" : "default" }}
      onClick={() => {
        if (activeClick && !activateInput) {
          setActivateInput(true);
        }
      }}
    >
      <h4
        className={`
        ${amount >= 0 ? "text-black" : "text-red-600"}
        group-hover:text-white text-xs font-light`}
      >
        {title}
      </h4>
      {!activateInput && (
        <h2
          className={`group-hover:text-white
          ${amount >= 0 ? "text-black" : "text-red-600"}
          font-medium text-lg truncate`}
        >
          R {amount}
        </h2>
      )}

      {activateInput && (
        <BalanceInput
          currentBalance={currentBalance}
          closing={() => setActivateInput(false)}
        />
      )}
    </motion.div>
  );
}
