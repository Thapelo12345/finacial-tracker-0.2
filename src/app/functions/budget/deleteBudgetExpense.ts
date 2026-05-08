import { db } from "../../../../firebase.config";
import {
  getDocs,
  collection,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import store from "../../state management/store";
import { selectDialog } from "../../state management/slices/selectDialog";
import { getMessage } from "../../state management/slices/dialogMessage";
import { openCloseDialog } from "../../state management/slices/openCloseDialog";
import { appUpdated } from "../../state management/slices/UpdateAllComponents";

interface BudgetExpense {
  budgetExpenseId: number;
  DescriptionTitle: string;
  Amount: number;
  Color: string;
}

export async function deleteBudgetExpense(expenseId: number) {
  const data = sessionStorage.getItem("currentUser");

  if (data) {
    const crrUser = JSON.parse(data);
    const crrExpense: BudgetExpense = crrUser.budgetExpenses.find(
      (expense: BudgetExpense) => expense.budgetExpenseId === expenseId,
    );

    const newExpense = crrUser.budgetExpense - crrExpense.Amount;
    const newSurplus = crrUser.budgetAmount - newExpense;

    try {
      const getDocument = await getDocs(collection(db, "users"));
      const matchingUser = getDocument.docs.find((doc) => {
        const userData = doc.data();
        return userData.email === crrUser.email;
      });

      if (!matchingUser) {
        store.dispatch(selectDialog("error"));
        store.dispatch(getMessage("User Credentials not found"));
        store.dispatch(openCloseDialog());
      } //end of matchingUser if
      else {
        store.dispatch(selectDialog("load"));
        store.dispatch(openCloseDialog());

        await updateDoc(matchingUser.ref, {
          budgetExpense: Number(newExpense.toFixed(2)),
          budgetSurplus: Number(newSurplus.toFixed(2)),
          budgetExpenses: arrayRemove(crrExpense),
        })
          .then(() => {
            crrUser.budgetExpenses.splice(
              crrUser.budgetExpenses.indexOf(crrExpense),
              1,
            );
            crrUser.budgetExpense = Number(newExpense.toFixed(2));
            crrUser.budgetSurplus = Number(newSurplus.toFixed(2));
            sessionStorage.setItem("currentUser", JSON.stringify(crrUser));

            store.dispatch(getMessage("Expense deleted successfully"));
            store.dispatch(selectDialog("confirm"));
            store.dispatch(appUpdated());

            setTimeout(() => {
              store.dispatch(openCloseDialog());
            }, 3000);
          })
          .catch(() => alert("error Updating data base!!.."));
      } //end of matching user else
    } catch (error) {
      //end of try

      console.log(error);

      store.dispatch(selectDialog("error"));
      store.dispatch(getMessage("Failed to update data"));
      store.dispatch(openCloseDialog());
    } //end of catch
  } //end of data if
}
