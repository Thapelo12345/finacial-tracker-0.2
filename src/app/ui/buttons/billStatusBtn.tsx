import { motion } from "framer-motion";
import { useContext } from "react";
import { BillContext, LoadContext } from "@/app/context/billContext";

type status = string[];

const statusArray: status = ["active", "pause", "inactive"];

export default function BillStatusButton() {
  const theme = useContext(BillContext);
  const load = useContext(LoadContext);

  return (
    <motion.div
      className="relative text-white text-sm font-bold p-2 rounded-sm cursor-pointer"
      style={{
        backgroundColor: theme.headColor,
        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.6)",
        textShadow: "0px 0px 1px black",
        WebkitBoxReflect:
          "below 10px linear-gradient(to bottom, rgba(0,0,0, 0.0), rgba(0,0,0,0.4))",
      }}
      whileTap={{
        scale: 1.1,
        rotateY: 360,
      }}
      transition={{
        duration: 0.5,
        repeatType: "reverse",
      }}
      onClick={() => {
        load.load(true);
        const indexPosition = statusArray.indexOf(theme.statusTheme);

        if (indexPosition + 1! < statusArray.length) {
          theme.setTheme(statusArray[indexPosition + 1]);
        } else {
          theme.setTheme(statusArray[0]);
        }
      }}
    >
      {theme.statusTheme.toUpperCase()}
    </motion.div>
  );
}
