"use client"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../state management/store";
import Loanding from "./loadingDialog";
import ConfirmDialog from "./confirmationDialog";
import WarningDialog from "./warningDialog";

export default function DialogContainer() {
  const selectDialog = useSelector(
    (state: RootState) => state.selectedDialog.selectedDialog
  );

  const openDialog = useSelector(
    (state: RootState) => state.openDialog.openDialog
  );
  const changeDialog = useSelector(
    (state: RootState) => state.selectedDialog.selectedDialog
    );

  const [showDialog, setShowDialog] = useState(false);
  const [useDialog, setUseDialog] = useState("");

  useEffect(() => {
    setUseDialog(selectDialog);
    setShowDialog(openDialog);
  }, [openDialog, changeDialog]);

  return (
    <div
      className={`${
        showDialog ? "block" : "hidden"
      } absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-black/70 z-40`}
    >
      {useDialog === "load" && <Loanding />}
      {useDialog === "confirm" && <ConfirmDialog />}
      {useDialog === "error" && <WarningDialog />}
    </div>
  );
}
