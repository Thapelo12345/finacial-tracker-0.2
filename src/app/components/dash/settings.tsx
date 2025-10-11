"use client";
import {
  WrenchScrewdriverIcon,
  ClipboardIcon,
  CameraIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import { useContext, useState, useEffect } from "react";
import { SettingsContext } from "@/app/context/settingsContext";

export default function Settings() {
  
  const settings = useContext(SettingsContext);
  const [active, setActive] = useState(settings.clicked);

  useEffect(() => {
    setActive(settings.clicked);
  }, [settings.clicked]);

  return (
    <nav className="flex flex-col p-2 w-1/2 h-[74.5%]">
      <h1
        className={`flex flex-row w-[70%] text-sm font-semibold bg-black/30 text-white rounded-tr-lg rounded-br-lg mb-4 p-2`}
      >
        <WrenchScrewdriverIcon className={`w-5 h-5 mr-2 text-white`} />
        Settings
      </h1>

      <button
        className={`flex flex-row text-xs rounded-br-lg rounded-tr-lg duration-200
        ${
          active === "updateImage"
            ? "bg-white text-black"
            : "bg-black/20 text-white"
        }
         m-4 p-2 cursor-pointer`}
        onClick={() => {
          if (settings.clicked !== "updateImage") {
            setTimeout(() => {
              settings.setClicked("updateImage");
            }, 200);
            settings.setSettingsInput(false);
            setTimeout(() => {
              settings.setSettingsInput(true);
            }, 650);
          }
        }}
      >
        <CameraIcon
          className={`w-5 h-5 mr-2 ${
            active === "updateImage" ? "text-green-500" : "text-white"
          }`}
        />
        Update image
      </button>

      <button
        className={`flex flex-row text-xs rounded-br-lg rounded-tr-lg p-2 duration-200
        ${
          active === "updateName"
            ? "text-black bg-white"
            : "text-white bg-black/20"
        }  m-4 cursor-pointer`}
        onClick={() => {
          if (settings.clicked !== "updateName") {
            setTimeout(() => {
              settings.setClicked("updateName");
            }, 200);
            settings.setSettingsInput(false);
            setTimeout(() => {
              settings.setSettingsInput(true);
            }, 650);
          }
        }}
      >
        <ClipboardIcon
          className={`w-5 h-5 mr-2 ${
            active === "updateName" ? "text-green-500" : "text-white"
          }`}
        />
        Update name
      </button>

      <button
        className={`flex flex-row text-xs m-4 p-2 duration-200
        ${
          active === "delete" ? "bg-white text-black" : "text-white bg-black/20"
        } rounded-tr-lg rounded-br-lg cursor-pointer`}
        onClick={() => {
          if (settings.clicked !== "delete") {
            setTimeout(() => {
              settings.setClicked("delete");
            }, 200);
            settings.setSettingsInput(false);
            setTimeout(() => {
              settings.setSettingsInput(true);
            }, 650);
          }
        }}
      >
        <TrashIcon
          className={`w-5 h-5 mr-2 ${
            active === "delete" ? "text-green-500" : "text-white"
          }`}
        />
        Delete Acoount
      </button>
    </nav>
  );
}
