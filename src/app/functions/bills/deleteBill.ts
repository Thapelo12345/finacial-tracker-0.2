import { db } from "../../../../firebase.config";
import {
  getDocs,
  collection,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import store from "@/app/state management/store";
import { selectDialog } from "@/app/state management/selectDialog";
import { getMessage } from "@/app/state management/dialogMessage";
import { openCloseDialog } from "@/app/state management/openCloseDialog";
import { appUpdated } from "@/app/state management/UpdateAllComponents";

interface Bill {
  id: number;
  title: string;
  description: string;
  amount: number;
  startDate: string;
  dueDate: string;
  endDate: string;
  category: string;
  duration: string;
  frenquently: string;
  status: string;
  autoPay: boolean;
  settledBill: boolean;
  daysLeft: number;
}

export default async function DeleteBill(billId: number) {
  const data = sessionStorage.getItem("currentUser");

  if (data) {
    const crrUser = JSON.parse(data);

    store.dispatch(selectDialog("load"));
    store.dispatch(openCloseDialog());

    const crrBill = crrUser.recurringBills.find(
      (bill: Bill) => bill.id === billId
    );

    try {
      const getDocuments = await getDocs(collection(db, "users"));
      const matchingUser = getDocuments.docs.find(
        (doc) => doc.data().email === crrUser.email
      );

      if (!matchingUser) {
        store.dispatch(getMessage("User credentials not found"));
        store.dispatch(selectDialog("error"));
      } //end of match user if
      else {
        await updateDoc(matchingUser.ref, {
          recurringBills: arrayRemove(crrBill),
        })
          .then(() => {
            crrUser.recurringBills.splice(
              crrUser.recurringBills.indexOf(crrBill),
              1
            );
            sessionStorage.setItem("currentUser", JSON.stringify(crrUser));

            store.dispatch(getMessage("Bill deleted successfully"));
            store.dispatch(selectDialog("confirm"));

            setTimeout(() => {
              store.dispatch(appUpdated());
              store.dispatch(openCloseDialog());
            }, 2000);
          })
          .catch((error) => console.log(error));
      } //end of user match else
    } catch (error) {
      //end of try

      console.log(error);
      store.dispatch(getMessage("Unable to connect to database"));
      store.dispatch(selectDialog("error"));
    } //end of catch
  } //end of data if
  else {
    store.dispatch(getMessage("User credentials not found"));
    store.dispatch(selectDialog("error"));
  }
}
