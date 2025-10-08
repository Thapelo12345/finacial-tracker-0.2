"use client"
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../state management/store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function ConfirmDialog() {
  const dialogMessage = useSelector(
    (state: RootState) => state.dialogMessage.dialogMessage
  );
  const [message, setMessage] = useState("this is the message");

  useEffect(() => {
    setMessage(dialogMessage);
  }, [dialogMessage]);

  useGSAP(() => {
    gsap.to("#icon1", {
      rotateY: 360,
      yoyo: true,
      repeat: -1,
      delay: 4,
      duration: 1,
    });
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center w-[90%] h-1/2 sm:w-1/2 sm:h-1/2 md:w-1/3 md:h-1/3 border-4 border-green-500 bg-white rounded-lg"
      style={{
        perspective: 1000,
        boxShadow: "1px 1px 20px black, 1px 1px 10px lime, inset 0 0 5px lime",
      }}
    >
      <CheckCircleIcon
        id="icon1"
        className="w-10 h-10 text-green-500 rounded-full"
      />
      <h1 className="text-green-400 text-md font-bold m-2 p-2">{message}!..</h1>
    </div>
  );
}
