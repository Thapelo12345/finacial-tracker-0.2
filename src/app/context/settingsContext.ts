"use client";

import { createContext } from "react";

interface settings {
  clicked: string;
  currentValue: boolean;
  settingsInput: boolean;
  setClicked: (value: string) => void;
  closeSettings: (value: boolean) => void;
  setSettingsInput: (value: boolean) => void;
}

export const SettingsContext = createContext<settings>({
  clicked: "updateImage",
  currentValue: false,
  settingsInput: false,
  setClicked: () => {},
  closeSettings: () => {},
  setSettingsInput: () => {},
});
