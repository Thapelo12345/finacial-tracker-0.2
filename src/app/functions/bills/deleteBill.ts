import { db } from "../../../../firebase.config";
import {
  getDocs,
  collection,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import store from "@/app/state_management/store";
import { selectDialog } from "@/app/state_management/slices/selectDialog";
import { getMessage } from "@/app/state_management/slices/dialogMessage";
import { openCloseDialog } from "@/app/state_management/slices/openCloseDialog";
import { appUpdated } from "@/app/state_management/slices/UpdateAllComponents";
import { setAppLoadingStatus } from "@/app/state_management/slices/loadStatus";
import Bill from "@/app/interFaces/billInterface";

export default async function DeleteBill(billId: number) {
  const data = sessionStorage.getItem("currentUser");

  if (!data) {
    alert("No user data FOUND")
    return
  }
    const crrUser = JSON.parse(data);

    store.dispatch(selectDialog("load"));
    store.dispatch(openCloseDialog());

    const crrBill = crrUser.recurringBills.find(
      (bill: Bill) => bill.id === billId,
    );

    try {
      if(!navigator.onLine) throw new Error("No stable internet connection!...")

      const getDocuments = await getDocs(collection(db, "users"));
      const matchingUser = getDocuments.docs.find(
        (doc) => doc.data().email === crrUser.email,
      );

      if (!matchingUser) throw new Error("User credentials not found");

      if(!navigator.onLine) throw new Error("No stable internet connection!...")
      await updateDoc(matchingUser.ref, {
        recurringBills: arrayRemove(crrBill),
      });
      crrUser.recurringBills.splice(crrUser.recurringBills.indexOf(crrBill), 1);
      sessionStorage.setItem("currentUser", JSON.stringify(crrUser));

      store.dispatch(getMessage("Bill deleted successfully"));
      store.dispatch(selectDialog("confirm"));
      if (store.getState().appLoadStatus.appLoadingStatus) store.dispatch(setAppLoadingStatus());
      
      setTimeout(() => {
        store.dispatch(openCloseDialog());
        store.dispatch(appUpdated())
      }, 1500);
    
    } catch (error: Error | unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "unknown error occured";
      if (store.getState().appLoadStatus.appLoadingStatus) store.dispatch(setAppLoadingStatus());
      store.dispatch(getMessage(errorMessage));
      store.dispatch(selectDialog("error"));
    } //end of catch
 
}
