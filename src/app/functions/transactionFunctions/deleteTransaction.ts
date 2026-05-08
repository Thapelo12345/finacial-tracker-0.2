import { db } from "../../../../firebase.config";
import {
  getDocs,
  collection,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import store from "@/app/state management/store";
import { selectDialog } from "@/app/state management/slices/selectDialog";
import { openCloseDialog } from "@/app/state management/slices/openCloseDialog";
import { getMessage } from "@/app/state management/slices/dialogMessage";
import { appUpdated } from "@/app/state management/slices/UpdateAllComponents";

type TransactObj = {
  transactionId: number;
  name: string;
  amount: number;
  category: string;
  description: string;
  transactionType: string;
  date: string;
};

type Props = {
  transactionId: number;
};
export async function DeleteTransaction({ transactionId }: Props) {
  const id: number = transactionId;
  const data = sessionStorage.getItem("currentUser");

  if (data) {
    const user = JSON.parse(data);

    const crrTransaction: TransactObj = user.transactions.find(
      (transaction: TransactObj) => transaction.transactionId === id,
    );

    if (crrTransaction !== undefined) {
      store.dispatch(selectDialog("load"));
      store.dispatch(openCloseDialog());

      if (crrTransaction.transactionType === "Income") {
        const newIncome = user.income - crrTransaction.amount;
        const newTransactionTotal =
          user.transactionTotal - crrTransaction.amount;

        try {
          const getDocuments = await getDocs(collection(db, "users"));
          const matchingUser = getDocuments.docs.find(
            (doc) => doc.data().email === user.email,
          );

          if (!matchingUser) {
            store.dispatch(selectDialog("error"));
            store.dispatch(
              getMessage("Sorry User credentials where not found"),
            );
            store.dispatch(openCloseDialog());
          } else {
            await updateDoc(matchingUser.ref, {
              income: Number(newIncome.toFixed(2)),
              transactionTotal: Number(newTransactionTotal.toFixed(2)),
              transactions: arrayRemove(crrTransaction),
              // arrayRemove
            }).then(() => {
              user.income = Number(newIncome.toFixed(2));
              user.transactionTotal = Number(newTransactionTotal.toFixed(2));

              user.transactions.splice(
                user.transactions.indexOf(crrTransaction),
                1,
              );

              sessionStorage.setItem("currentUser", JSON.stringify(user));

              store.dispatch(appUpdated());
              store.dispatch(getMessage("Transaction deleted successfully"));
              store.dispatch(selectDialog("confirm"));

              setTimeout(() => {
                store.dispatch(openCloseDialog());
              }, 3000);
            });
          }
        } catch (error) {
          console.log(error);
        }
      } //end of traction type if
      else {
        const newTransactionExpense =
          user.transactionExpense - crrTransaction.amount;

        try {
          const getDocuments = await getDocs(collection(db, "users"));
          const matchingUser = getDocuments.docs.find(
            (doc) => doc.data().email === user.email,
          );

          if (!matchingUser) {
            store.dispatch(selectDialog("error"));
            store.dispatch(
              getMessage("Sorry User credentials where not found"),
            );
            store.dispatch(openCloseDialog());
          } else {
            await updateDoc(matchingUser.ref, {
              transactionExpense: Number(newTransactionExpense.toFixed(2)),
              transactions: arrayRemove(crrTransaction),
            })
              .then(() => {
                user.transactionExpense = Number(
                  newTransactionExpense.toFixed(2),
                );
                user.transactions.splice(
                  user.transactions.indexOf(crrTransaction),
                  1,
                );

                sessionStorage.setItem("currentUser", JSON.stringify(user));

                store.dispatch(appUpdated());
                store.dispatch(getMessage("Transaction deleted successfully"));
                store.dispatch(selectDialog("confirm"));

                setTimeout(() => {
                  store.dispatch(openCloseDialog());
                }, 3000);
              })
              .catch(() => console.log("failed to update"));
          }
        } catch (error) {
          console.log(error);
        }
      }
    } //end of find crrTransaction if
    else {
      store.dispatch(selectDialog("error"));
      store.dispatch(getMessage("Sorry User credentials where not found"));
      store.dispatch(openCloseDialog());
    } //end of find crrTransaction if
  } //end of data if
  else {
    store.dispatch(selectDialog("error"));
    store.dispatch(getMessage("User credentials not found"));
    store.dispatch(openCloseDialog());
  } //end of data else
}
