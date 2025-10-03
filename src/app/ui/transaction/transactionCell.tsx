import Avatar from "../avatar";
import { motion } from "framer-motion";
import { TrashIcon } from "@heroicons/react/20/solid";
import { DeleteTransaction } from "@/app/functions/transactionFunctions/deleteTransaction";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

type Props = {
  Date: string;
  Name: string;
  Description: string;
  Category: string;
  Type: string;
  Amount: number;
  itemId: number;
};

export default function TransactionCell({
  Date,
  Name,
  Description,
  Category,
  Type,
  Amount,
  itemId,
}: Props) {
  useGSAP(() => {
    gsap.fromTo(
      ".transac",
      {
        x: 970,
      },
      {
        x: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: "power4",
      }
    );
  });

  return (
    <motion.li
      className="transac group shadow-md flex flex-row flex-nowrap items-start m-1 md:m-2 w-full p-1 md:p-2"
      whileHover={{
        scale: 1.01,
        boxShadow:
          "0px 10px 10px rgba(0,0,0, 0.7), inset 0px 0px 3px rgba(0, 0, 0, 0.5)",
        backgroundColor: "white",
        borderRadius: "105px",
      }}
      transition={{
        duration: 0.5,
      }}
    >
      <Avatar name={Name} avatar="" />

      <div className="flex flex-col w-full h-full">
        <div className="flex flex-row justify-between">
          <label className="text-black text-sm md:text-md text-start font-semibold">
            {Name}
          </label>
          <label
            className={`${
              Type === "Income" ? "text-green-500" : "text-red-500"
            } text-xs md:text-md text-end font-semibold  `}
          >
            {Type === "Income" ? "+ " : "- "}R {Amount}
          </label>
        </div>

        <div className="flex flex-row justify-between">
          <label className="text-black/50  text-xs text-start">
            {Category}
          </label>
          <label className="text-black/50 text-xs text-end">{Date}</label>
        </div>
      </div>

      <button
        className="m-2 self-end"
        onClick={() => {
          DeleteTransaction({ transactionId: itemId });
        }}
      >
        <TrashIcon className="w-4 md:w-5 h-4 md:h-5 text-red-400 m-2" />
      </button>
      {/* Description tag */}

      <div
        className="bg-[whitesmoke] font-serif hidden group-hover:block left-48 rounded-md top-10 z-10 absolute p-2"
        style={{
          boxShadow:
            "-1px -9px 15px rgba(0, 0, 0, 0.5), 1px 9px 10px rgba(0, 0, 0, 0.5), inset 2px 2px 6px black, inset -2px -2px 6px white",
        }}
      >
        <p className="text-black/50 text-xs font-extrabold p-2">
          {Description}
        </p>
      </div>
    </motion.li>
  );
}
