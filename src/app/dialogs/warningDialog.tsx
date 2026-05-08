import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../state management/store";
import { useDispatch } from "react-redux";
import { openCloseDialog } from "../state management/slices/openCloseDialog";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function WarningDialog() {
  const dispatch = useDispatch();
  const errorMessage = useSelector(
    (state: RootState) => state.dialogMessage.dialogMessage,
  );
  const [message, setMessage] = useState("This is the Error Message");

  useEffect(() => {
    setMessage(errorMessage);
  }, [errorMessage]);

  useGSAP(() => {
    gsap.to("#icon", {
      scale: 1.7,
      yoyo: true,
      duration: 1.5,
      repeat: -1,
    });

    gsap.to("#error", {
      scale: 0.98,
      boxShadow: "0px 1px 4px red, 0px 1px 1px black, inset 1px 0 1px red",
      yoyo: true,
      duration: 0.5,
      repeat: -1,
    });
  }, []);

  return (
    <div
      id="error"
      className="flex flex-col items-center justify-center w-fit h-fit sm:w-1/2 sm:h-1/2 md:w-1/3 md:h-1/3 border-4 border-red-600 bg-white rounded-2xl"
      style={{
        boxShadow:
          "0px 10px 60px red, 1px 5px 40px black, inset 1px 0 10px red",
      }}
    >
      <ExclamationTriangleIcon
        id="icon"
        className="text-yellow-400 w-10 h-10 m-2"
      />

      <h1 className="text-md font-semibold text-red-500 m-2 p-2">
        {message}!...
      </h1>
      <button
        className="text-black font-semibold text-lg p-1 rounded-md"
        onClick={() => dispatch(openCloseDialog())}
      >
        Close
      </button>
    </div>
  );
}
