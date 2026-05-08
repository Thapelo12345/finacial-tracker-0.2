"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/state management/store";
import { appUpdated } from "@/app/state management/slices/UpdateAllComponents";
import SelectDashBoard from "@/app/components/dash/selectDashBoard";
import { SettingsContext } from "@/app/context/settingsContext";
import SubmitContainer from "@/app/components/submitForms/submitContainer";
import SettingsContainer from "@/app/dialogs/settingsContainer";

export default function DashLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dispatch = useDispatch();
  const checkUpdate = useSelector(
    (state: RootState) => state.updateApp.updateApp,
  );
  const [openSettings, setOpenSettings] = useState(false);
  const [clickedBtn, setClickedBtn] = useState("");
  const [openInput, setOpenInput] = useState(false);

  useEffect(() => {
    if (checkUpdate === true) {
      dispatch(appUpdated());
    }
  }, [checkUpdate]);

  return (
    <main className="flex flex-row w-screen h-screen overflow-hidden">
      <SettingsContext.Provider
        value={{
          clicked: clickedBtn,
          currentValue: openSettings,
          settingsInput: openInput,
          setClicked: setClickedBtn,
          closeSettings: setOpenSettings,
          setSettingsInput: setOpenInput,
        }}
      >
        {/* <DialogContainer /> */}
        <div className="relative flex flex-row bg-red-100/5 w-full h-full overflow-hidden m-0 p-0">
          <SelectDashBoard />
          <SubmitContainer />
          <SettingsContainer />
          {children}
        </div>
      </SettingsContext.Provider>
    </main>
  );
}
