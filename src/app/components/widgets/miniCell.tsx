import Avatar from "../ui/avatar";
import { motion } from "framer-motion";

type Props = {
  Date: string;
  Name: string;
  Category: string;
  Type: string;
  Amount: number;
};

export default function MiniCell({
  Date,
  Name,
  Category,
  Type,
  Amount,
}: Props) {
  return (
    <motion.li className="w-[97%] group border-b-2 border-black/5 flex flex-row flex-nowrap items-start m-2 pr-2">
      <Avatar name={Name} avatar="" />

      <div className="flex flex-col w-full h-full">
        <div className="flex flex-row justify-between">
          <label className="text-black text-md text-start font-semibold">
            {Name}
          </label>
          <label
            className={`${
              Type !== "Income" ? "text-red-500" : "text-green-500"
            } text-xs text-end font-semibold  `}
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
    </motion.li>
  );
}
