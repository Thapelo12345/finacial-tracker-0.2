import { SettingsContext } from "@/app/context/settingsContext";
import SettingsHeader from "@/app/ui/settingsHeader/header";
import { UserIcon } from "@heroicons/react/16/solid";
import { useContext, useState } from "react";
import { changingPassword } from "@/app/functions/settingsFunctions/changePassword";

export default function ChangePassword() {
  const setting = useContext(SettingsContext);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  return (
    <div className="flex flex-col border-4 border-black/20 items-center w-full h-full bg-[whitesmoke] rounded-sm">
      <SettingsHeader title="change password" />
      <div className="flex items-center justify-center w-1/2">
        <UserIcon className="text-black/20 w-10 md:w-16 h-10 md:h-16" />
      </div>

      <form
        className="flex flex-col w-fit-2 m-2"
        onSubmit={(e) => {
          e.preventDefault();
          changingPassword(oldPassword, newPassword); 
          setting.closeSettings(!setting.currentValue)
        }}
      >
        <input
          className="p-1 m-1 outline-0 rounded-sm text-xs md:text-sm"
          type="password"
          placeholder="current password"
          style={{
            boxShadow: "inset 1px 1px 5px black, inset -1px -1px 5px white",
          }}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        ></input>

        <input
          className="p-1 m-1 outline-0 rounded-sm text-xs md:text-sm"
          type="password"
          placeholder="new password"
          style={{
            boxShadow: "inset 1px 1px 5px black, inset -1px -1px 5px white",
          }}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        ></input>

        <button
          className="p-2 text-white bg-green-400 rounded-md m-2 cursor-pointer"
          style={{
            boxShadow: "inset 5px 1px 5px black, inset -2px 2px 5px grey",
          }}
          type="submit"
        >
          update
        </button>
      </form>
    </div>
  );
}
