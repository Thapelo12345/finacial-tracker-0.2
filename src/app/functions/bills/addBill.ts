// import { GetDate } from "./getcurrentDate";
import { GetDate } from "./billDates";
import { db } from "../../../../firebase.config";
import { getDocs, collection, updateDoc, arrayUnion } from "firebase/firestore";
import store from "../../state management/store";
import { selectDialog } from "../../state management/slices/selectDialog";
import { openCloseDialog } from "../../state management/slices/openCloseDialog";
import { getMessage } from "../../state management/slices/dialogMessage";
import { appUpdated } from "../../state management/slices/UpdateAllComponents";
import { setAppLoadingStatus } from "@/app/state management/slices/loadStatus"; 
import Bill from "@/app/interFaces/billInterface";

// This function adds a new bill to the user's recurring bills in the Firestore database. It retrieves the current user's data from session storage, creates a new bill object, and updates the user's document in Firestore with the new bill. It also handles success and error messages using the application's dialog system.
export async function AddBill(
  billTitle: string,
  billDescription: string,
  billAmount: number,
  billStartDate: string,
  billDueDate: string,
  billEndDate: string,
  billCategory: string,
  billDuration: string,
  billFrenquently: string,
  billStatus: string,
) {
  const data = sessionStorage.getItem("currentUser");

  if (!data) {
    alert("No User credentals FOUND! logout and in again please");
    return;
  }

  const crrUser = JSON.parse(data);

  const billId = () => {
    const allIds: number[] = crrUser.recurringBills.map((bill: Bill) => {
      return bill.id;
    });
    console.table(allIds);
    let counter = 0;
    do {
      counter++;
    } while (allIds.indexOf(counter) != -1);
    return counter;
  };

  const newBill: Bill = {
    id: billId(),
    title: billTitle,
    description: billDescription,
    amount: billAmount,
    startDate: billStartDate === "" ? GetDate() : billStartDate,
    dueDate: billDueDate,
    endDate: billEndDate,
    lastPayment: "No payment",
    category: billCategory,
    duration: billDuration,
    frenquently: billFrenquently,
    status: billStatus,
    AutoPay: false,
  };

  store.dispatch(selectDialog("load"));
  store.dispatch(openCloseDialog());

  try {
    if (!navigator.onLine) throw new Error("No internet connection FOUND!...");

    const getDocuments = await getDocs(collection(db, "users"));
    const matchingUser = getDocuments.docs.find(
      (doc) => doc.data().email === crrUser.email,
    );

    if (!matchingUser) throw new Error("User credentials not found");

    if (!navigator.onLine) throw new Error("No internet connection FOUND!...");
    await updateDoc(matchingUser.ref, { recurringBills: arrayUnion(newBill) });

    crrUser.recurringBills.push(newBill);
    sessionStorage.setItem("currentUser", JSON.stringify(crrUser));

    store.dispatch(getMessage("Recurring bill added successfully"));
    store.dispatch(selectDialog("confirm"));
    if (store.getState().appLoadStatus.appLoadingStatus) store.dispatch(setAppLoadingStatus());
    store.dispatch(appUpdated());

    setTimeout(() => {
      store.dispatch(openCloseDialog());
    }, 1500);
  } catch (error: Error | unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    console.log(errorMessage);
    if (store.getState().appLoadStatus.appLoadingStatus) store.dispatch(setAppLoadingStatus());
    store.dispatch(getMessage(errorMessage));
    store.dispatch(selectDialog("error"));
  }
} //end of add bill function
