import { db } from "../../../../firebase.config";
import {
  getDocs,
  collection,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import Bill from "@/app/interFaces/billInterface";
import store from "@/app/state management/store";
import { getMessage } from "@/app/state management/slices/dialogMessage";
import { selectDialog } from "@/app/state management/slices/selectDialog";
import { openCloseDialog } from "@/app/state management/slices/openCloseDialog";
import { appUpdated } from "@/app/state management/slices/UpdateAllComponents";
import { setAppLoadingStatus } from "@/app/state management/slices/loadStatus";

export async function UpdateBill(
  bill: Bill,
  closeLoad: (value: boolean) => void,
) {
  const data = sessionStorage.getItem("currentUser");

  if (!data) {
    alert("No user data FOUND!..")
    return
  }
    const currentUser = JSON.parse(data);
    const crrBill = currentUser.recurringBills.find(
      (item: Bill) => item.id === bill.id,
    );

    if (crrBill !== undefined) {
      try {

        if(!navigator.onLine) throw new Error("No internet connection!..")
        const getDocuments = await getDocs(collection(db, "users"));
        const matchingUser = getDocuments.docs.find(
          (doc) => doc.data().email === currentUser.email,
        );

        if (!matchingUser) throw new Error("User not FOUND!..")

          if(!navigator.onLine) throw new Error("No internet connection!..")

          await updateDoc(matchingUser.ref, {recurringBills: arrayRemove(crrBill)})
          await updateDoc(matchingUser.ref, {recurringBills: arrayUnion(bill), })
          const pos = currentUser.recurringBills.findIndex((item: Bill) => item.id === bill.id);
          currentUser.recurringBills[pos] = bill;
          sessionStorage.setItem("currentUser", JSON.stringify(currentUser),);
          closeLoad(false);
          if (store.getState().appLoadStatus.appLoadingStatus) store.dispatch(setAppLoadingStatus());

          const delay = setTimeout(()=>{
            store.dispatch(appUpdated())
            clearTimeout(delay)
          }, 1500)
            
      } catch (err : unknown) {
        //end of try
        const errorMessage = err instanceof Error ? err.message : "unknown Firebase error!"
        alert("Failed to update bill");
        store.dispatch(getMessage(errorMessage));
        store.dispatch(selectDialog("error"));
        store.dispatch(openCloseDialog());
        closeLoad(false);
        if (store.getState().appLoadStatus.appLoadingStatus) store.dispatch(setAppLoadingStatus());
      }
    } //end of crrbill if
} //update function
