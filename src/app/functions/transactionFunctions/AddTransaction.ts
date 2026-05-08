import { GetDate } from "../bills/getcurrentDate";
import { updateDoc, arrayUnion, getDocs, collection } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import { openCloseDialog } from "../../state management/slices/openCloseDialog";
import { getMessage } from "../../state management/slices/dialogMessage";
import { selectDialog } from "../../state management/slices/selectDialog";
import { appUpdated } from "../../state management/slices/UpdateAllComponents";
import store from "../../state management/store";

type Transaction = {
  Name: string;
  Amount: number;
  Category: string;
  Description: string;
  TransactionType: string;
};

export default async function AddTransaction({
  Name,
  Amount,
  Category,
  Description,
  TransactionType,
}: Transaction) {
  if (
    Name !== "" &&
    Category !== "" &&
    TransactionType !== "" &&
    Description !== ""
  ) {
    type TransactObj = {
      name: string;
      amount: number;
      category: string;
      description: string;
      transactionType: string;
      date: string;
    };

    const newTransaction: TransactObj = {
      name: Name,
      amount: Amount,
      category: Category,
      description: Description,
      transactionType: TransactionType,
      date: GetDate(),
    };

    const data = sessionStorage.getItem("currentUser");

    if (data) {
      store.dispatch(selectDialog("load"));
      store.dispatch(openCloseDialog());

      try {
        const currentUser = JSON.parse(data);
        const searchName = currentUser.name;

        // 1. Get all users
        const usersSnapshot = await getDocs(collection(db, "users"));

        // 2. Find matching user locally
        const matchingUser = usersSnapshot.docs.find((doc) => {
          const userData = doc.data();
          return userData.name === searchName;
        });

        if (!matchingUser) {
          store.dispatch(getMessage("No user found!"));
          store.dispatch(selectDialog("error"));
          return false;
        }

        // 3. Update the found user
        await updateDoc(matchingUser.ref, {
          transactions: arrayUnion(newTransaction),
        });

        if (TransactionType === "Income") {
          const currentBalance = currentUser.currentBalance + Amount;
          const income = currentUser.income + Amount;
          const transactionTotal = currentUser.transactionTotal + Amount;
          const transactionTaotalRounded =
            Math.round(transactionTotal * 100) / 100;
          const incomeRounded = Math.round(income * 100) / 100;
          const roundedBalance = Math.round(currentBalance * 100) / 100;

          currentUser.currentBalance = roundedBalance;
          currentUser.income = incomeRounded;
          currentUser.transactionTotal = transactionTaotalRounded;
          currentUser.transactions.push(newTransaction);
          currentUser.date = GetDate();
          sessionStorage.setItem("currentUser", JSON.stringify(currentUser));

          store.dispatch(getMessage("Transaction added successfully!"));
          store.dispatch(selectDialog("confirm"));
          //closing the dialog
          setTimeout(() => {
            store.dispatch(openCloseDialog());
          }, 1500);
          store.dispatch(appUpdated());

          await updateDoc(matchingUser.ref, {
            currentBalance: roundedBalance,
            income: incomeRounded,
            transactionTotal: transactionTaotalRounded,
          });

          return true;
        } else {
          const transactionExpense = currentUser.transactionExpense + Amount;
          const currentBalance = currentUser.currentBalance - Amount;

          const transactionExpenseRounded =
            Math.round(transactionExpense * 100) / 100;
          const roundedBalance = Math.round(currentBalance * 100) / 100;

          currentUser.currentBalance = roundedBalance;
          currentUser.transactionExpense = transactionExpenseRounded;
          currentUser.transactions.push(newTransaction);
          sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
          store.dispatch(getMessage("Transaction added successfully!"));

          store.dispatch(selectDialog("confirm"));
          //closing the dialog
          setTimeout(() => {
            store.dispatch(openCloseDialog());
          }, 1500);
          store.dispatch(appUpdated());

          await updateDoc(matchingUser.ref, {
            currentBalance: roundedBalance,
            transactionExpense: transactionExpenseRounded,
          });
        }
      } catch (error) {
        console.log(error);
      }
    } //end of if
    else {
      alert("No data was found!..");
    }
  } else {
    console.log("Please insert all fields. Category and Type");
    console.log(`here is category : ${Category} and  type: ${TransactionType}`);
  }
} //end of add transaction
