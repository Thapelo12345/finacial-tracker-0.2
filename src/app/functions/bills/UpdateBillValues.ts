import { db } from "../../../../firebase.config";
import {
  query,
  where,
  getDocs,
  collection,
  arrayRemove,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import Bill from "@/app/interFaces/billInterface";
import store from "@/app/state_management/store";
import { setAppLoadingStatus } from "@/app/state_management/slices/loadStatus";
import { appUpdated } from "@/app/state_management/slices/UpdateAllComponents";

export async function updateBillValues(
  bill_id: number,
  bill_part: string,
  billNewValue: boolean | string,
  cloudLoad: (value: boolean) => void,
) {
  const data = sessionStorage.getItem("currentUser");

  const firebaseUser = async () => {
    const queryUser = query(
      collection(db, "users"),
      where("email", "==", user.email),
    );
    const userDocument = await getDocs(queryUser);

    if (userDocument.empty) throw new Error("User not found in database!");
    const matchingUser = userDocument.docs[0];

    if (!matchingUser) throw new Error("No user FOUND!");
    return matchingUser;
  };

  if (!data) {
    alert("No user data FOUND!");
    return;
  }

  const user = JSON.parse(data);
  const bill_to_be_updated = user.recurringBills.find(
    (bill: Bill) => bill.id == bill_id,
  );
  const billPosition = user.recurringBills.indexOf(bill_to_be_updated);

  const closeLoading = () => {
    const delay = setTimeout(() => {
      cloudLoad(false);
      if (store.getState().appLoadStatus.appLoadingStatus)
        store.dispatch(setAppLoadingStatus());
      store.dispatch(appUpdated());

      clearTimeout(delay);
    }, 1000);
  };
  try {
    if (!navigator.onLine) throw new Error("No internet connection!.");
    let onlineData = await firebaseUser();

    switch (bill_part) {
      case "autopay":
        bill_to_be_updated.AutoPay = billNewValue;
        break;

      case "lastpayment":
        bill_to_be_updated.lastPayment = billNewValue;
        break;

      case "status":
        bill_to_be_updated.status = billNewValue;
        break;

      default:
        return;
    } //end of switch

    if (!onlineData.data()) throw new Error("No data FOUND!");

    do {
      if (!navigator.onLine) throw new Error("No internet connection!.");

      await updateDoc(onlineData.ref, {
        recurringBills: arrayRemove(
          onlineData
            .data()
            .recurringBills.find((bill: Bill) => bill.id == bill_id),
        ),
      });
      onlineData = await firebaseUser();

      if (!onlineData.data()) throw new Error("No Data FOUND!");
    } while (
      onlineData
        .data()
        .recurringBills.find((bill: Bill) => bill.id == bill_id) != undefined
    );

    if (!navigator.onLine) throw new Error("No internet connection!.");
    await updateDoc(onlineData.ref, {
      recurringBills: arrayUnion(bill_to_be_updated),
    });
    user.recurringBills[billPosition] = bill_to_be_updated;
    sessionStorage.setItem("currentUser", JSON.stringify(user));

    closeLoading();
    return "Done Upadating?.";
  } catch (err: unknown) {
    //end of try

    const errorMessage =
      err instanceof Error ? err.message : "An unknown firebase error!";

    console.log(`Error:\n ${errorMessage}`);
    closeLoading();
    return "Failed to update";
  }
} //end of edit bill
