"use client"
import {
  ClipboardIcon,
  CameraIcon,
  TrashIcon,
  LockOpenIcon
} from "@heroicons/react/20/solid";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useContext, useState, useEffect } from "react";
import { SettingsContext } from "@/app/context/settingsContext";

export default function MobileSettings() {
  const settings = useContext(SettingsContext);

  const [active, setActive] = useState("updateImage");

  useGSAP(()=>{
    gsap.from(".mobileSettingsBtn", {
      x: settings.currentValue ? "-500px" : "0px",
      duration: 0.5,
      stagger: 0.3,
    })
  }, [settings.currentValue])

  useEffect(() => {
    if (settings.clicked !== "") {
      setActive(settings.clicked);
    }
  }, [settings.clicked]);

  return (
    <div
      className="bottom-22 left-0 duration-200 absolute w-34 h-40 overflow-hidden"
      style={{
        transform: !settings.currentValue
          ? "translateY(250px)"
          : "translateY(4px)",
      }}
    >
      <nav className="flex flex-col ">
        <button
          className={`mobileSettingsBtn rounded-tr-lg rounded-br-lg
            ${
              active === "updateImage"
                ? "bg-white text-black"
                : "bg-none text-white"
            } border border-white flex flex-row items-center justify-evenly m-2 p-1 w-fit text-xs`}
          onClick={() => settings.setClicked("updateImage")}
        >
          <CameraIcon
            className={`w-4 h-4 mr-1 ${
              active === "updateImage" ? "text-green-400" : "text-white"
            }`}
          />
          Update image
        </button>

        {/* password btn */}
        <button
          className={`mobileSettingsBtn rounded-tr-lg rounded-br-lg
          ${
            active === "password"
              ? "text-black bg-white"
              : "text-white bg-none"
          } border border-white flex flex-row items-center justify-evenly m-2 p-1 w-fit text-xs`}

          onClick={() => settings.setClicked("password")}
        >
          <LockOpenIcon 
            className={`w-4 h-4 mr-1 ${
              active === "password" ? "text-green-400" : "text-white"
            }`}
          />
          password
        </button>
        {/* end of password ntm */}
        <button
          className={`mobileSettingsBtn rounded-tr-lg rounded-br-lg
          ${
            active === "updateName"
              ? "text-black bg-white"
              : "text-white bg-none"
          } border border-white flex flex-row items-center justify-evenly m-2 p-1 w-fit text-xs`}
          onClick={() => settings.setClicked("updateName")}
        >
          <ClipboardIcon
            className={`w-4 h-4 mr-1 ${
              active === "updateName" ? "text-green-400" : "text-white"
            }`}
          />
          Update name
        </button>

        <button
          className={`mobileSettingsBtn rounded-tr-lg rounded-br-lg
          ${
            active === "delete" ? "text-black bg-white" : "text-white bg-none"
          } border border-white flex flex-row items-center justify-evenly m-2 p-1 w-fit text-xs`}
          onClick={() => settings.setClicked("delete")}
        >
          <TrashIcon
            className={`w-4 h-4 mr-1 ${
              active === "delete" ? "text-green-400" : "text-white"
            }`}
          />
          Delete
        </button>
      </nav>
    </div>
  );
}
