"use client";
import DashAvatar from "./dashAvatar";
import DashNav from "./dashNav";
import Settings from "./settings";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/20/solid";
import { SettingsContext } from "@/app/context/settingsContext";
import { useEffect, useState, useContext } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/state_management/store";
import { useRouter } from "next/navigation";
import { SignOut } from "@/app/functions/authFunctions/signOut";

export default function Dash() {
  const navigate = useRouter()

  const checkUpdate = useSelector(
    (state: RootState) => state.updateApp.updateApp
  );
  const settings = useContext(SettingsContext);

  const [username, setUsername] = useState("User not found!");
  const [userAvatar, setAvatar] = useState("");

  useEffect(() => {
    const currentUser = sessionStorage.getItem("currentUser");
    try {
      const user = currentUser ? JSON.parse(currentUser) : null;
      if (user && user.name) {
        setUsername(user.name);
        setAvatar(user.avatar);
      }
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, [checkUpdate]);

  const handleSignOut = ()=>{SignOut(navigate.push)}

  return (
    <header
      className={`relative w-[190px] h-full m-0 rounded-tr-lg rounded-br-lg items-center z-50 overflow-y-auto overflow-x-hidden`}
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.9)",
      }}
    >
      <DashAvatar username={username} avatar={userAvatar} />
      <div
        className="flex duration-400 flex-row m-0 items-center justify-start w-90 h-70"
        style={{
          transform: settings.currentValue
            ? "translateX(-50%)"
            : "translateX(0%)",
        }}
      >
        <DashNav />
        <Settings />
      </div>

      <button 
      className="flex flex-row w-fit absolute bottom-[2%] left-10 text-xs font-semibold text-white p-1 rounded-lg"
      onClick={handleSignOut}
      >
        Sign out
        <ArrowRightStartOnRectangleIcon className="w-4 h-4 text-white ml-4 font-light cursor-pointer" />
      </button>
    </header>
  );
}
