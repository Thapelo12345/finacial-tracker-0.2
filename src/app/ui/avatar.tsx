"use client";
import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../context/settingsContext";

const colors: string[] = [
  "Navy",
  "DarkRed",
  "DarkGreen",
  "Maroon",
  "Purple",
  "Indigo",
  "Teal",
  "Olive",
  "DarkSlateGray",
  "DarkBlue",
  "DarkCyan",
  "DarkMagenta",
  "DarkOliveGreen",
  "DarkSlateBlue",
  "DarkGoldenrod",
  "DarkSlateGrey",
  "DarkKhaki",
  "DarkOrchid",
  "DarkSeaGreen",
  "FireBrick",
  "SaddleBrown",
  "MidnightBlue",
  "Chocolate",
  "DimGray",
  "DarkViolet",
  "Brown",
];

const alphabet: string[] = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

type Props = {
  name: string;
  avatar: string;
};

function getInitials(name: string): string {
  const words = name.trim().split(" ");
  const initials =
    words.length > 1 ? words[0][0] + words[words.length - 1][0] : words[0][0];
  return initials.toUpperCase();
}

export default function Avatar({ name, avatar }: Props) {
  const setting = useContext(SettingsContext);

  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    if (currentPath !== "/home/settings") {
      setCurrentPath(location.pathname);
    }
  }, []);

  return (
    <div
      className={`shadow-lg rounded-full 
          ${
            avatar === ""
              ? "w-10 md:w-[calc(2.5rem-8px)] h-7 md:h-[calc(2.5rem-8px)] border-4 border-white"
              : "w-15 h-15 border-0 overflow-hidden"
          }  
          flex items-center justify-center m-2 cursor-pointer`}
      style={{
        backgroundColor:
          colors[alphabet.indexOf(name[0].toUpperCase()) % colors.length],
      }}
      onClick={() => {
        if (setting.clicked !== "updateImage") {
          setting.setClicked("updateImage");
        } //end of if

        if (!setting.currentValue) {
          setTimeout(() => {
            setting.setSettingsInput(true);
          }, 200);
          setting.closeSettings(!setting.currentValue);
        } //end not currentValue if
        else {
          setting.setSettingsInput(false);
          setTimeout(() => {
            setting.closeSettings(!setting.currentValue);
          }, 200);
        } //end  of current value else
      }}
    >
      {avatar === "" && (
        <h1 className="text-sm md:text-md text-white font-bold">
          {getInitials(name)}
        </h1>
      )}

      {avatar !== "" && (
        <img
          className="text-sm text-center w-full h-full cover"
          src={avatar}
          alt="User"
        ></img>
      )}
    </div>
  );
}
