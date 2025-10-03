import { db } from "../../../../firebase.config";
import {
  getDocs,
  collection,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";
import { DataBaseBill } from "@/app/interFaces/billInterface";

export async function UpdateBill(
  bill: DataBaseBill,
  closeLoad: (value: boolean) => void
) {
  const data = sessionStorage.getItem("currentUser");
  if (data) {
    const currentUser = JSON.parse(data);
    const crrBill = currentUser.recurringBills.find(
      (item: DataBaseBill) => item.id === bill.id
    );

    if (crrBill !== undefined) {
      try {
        const getDocuments = await getDocs(collection(db, "users"));
        const matchingUser = getDocuments.docs.find(
          (doc) => doc.data().email === currentUser.email
        );

        if (matchingUser) {
          await updateDoc(matchingUser.ref, {
            recurringBills: arrayRemove(crrBill),
          })
            .then(() => {
              updateDoc(matchingUser.ref, {
                recurringBills: arrayUnion(bill),
              }).then(() => {
                const pos = currentUser.recurringBills.findIndex(
                  (item: DataBaseBill) => item.id === bill.id
                );
                currentUser.recurringBills[pos] = bill;
                sessionStorage.setItem(
                  "currentUser",
                  JSON.stringify(currentUser)
                );
                closeLoad(false);
              });
            })
            .catch((error) => console.log(error));
        } //end of match user if
      } catch (error) {
        //end of try
        console.log(error);
      }
    } //end of crrbill if
  } //end of if data
} //update function
