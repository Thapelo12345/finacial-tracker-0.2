import { getDocs, arrayUnion, collection, updateDoc } from "firebase/firestore";
import { db } from "../../../../firebase.config";
import store from "../../state management/store";
import { selectDialog } from "../../state management/selectDialog";
import { openCloseDialog } from "../../state management/openCloseDialog";
import { getMessage } from "../../state management/dialogMessage";
import { appUpdated } from "../../state management/UpdateAllComponents";

interface budgetExpense {
  budgetExpenseId: number;
  DescriptionTitle: string;
  Amount: number;
  Color: string;
}

export async function AddBudgetExpense(
  amount: number,
  title: string,
  color: string
) {
  if (color !== "") {
    const data = sessionStorage.getItem("currentUser");

    if (data) {
      const crrUser = JSON.parse(data);
      const id = crrUser.budgetExpenses.length + 1;

      if (crrUser.budgetAmount >= amount) {
        const newExpense: budgetExpense = {
          budgetExpenseId: id,
          DescriptionTitle: title,
          Amount: amount,
          Color: color,
        };

        const newBudgetExpense = crrUser.budgetExpense + amount;
        const newSurplus = crrUser.budgetAmount - newBudgetExpense;

        if (newSurplus >= 0) {
          const getDocuments = await getDocs(collection(db, "users"));
          const foundUser = getDocuments.docs.find(
            (doc) => doc.data().email === crrUser.email
          );

          if (!foundUser) {
            store.dispatch(selectDialog("error"));
            store.dispatch(getMessage("Sorry User credentials not found"));
            store.dispatch(openCloseDialog());
          } //end of oundUser if
          else {
            store.dispatch(selectDialog("load"));
            store.dispatch(openCloseDialog());

            await updateDoc(foundUser.ref, {
              budgetExpenses: arrayUnion(newExpense),
              budgetExpense: Number(newBudgetExpense.toFixed(2)),
              budgetSurplus: Number(newSurplus.toFixed(2)),
            })
              .then(() => {
                store.dispatch(selectDialog("confirm"));
                store.dispatch(getMessage("Expense added successfully"));
                // store.dispatch(openCloseDialog());
                store.dispatch(appUpdated());

                crrUser.budgetExpenses.push(newExpense);
                crrUser.budgetExpense = Number(newBudgetExpense.toFixed(2));
                crrUser.budgetSurplus = Number(newSurplus.toFixed(2));
                sessionStorage.setItem("currentUser", JSON.stringify(crrUser));
                setTimeout(() => {
                  store.dispatch(openCloseDialog());
                }, 2000);
              })
              .catch(() => {
                store.dispatch(selectDialog("error"));
                store.dispatch(
                  getMessage("Sorry update has Failed, Please Try again")
                );
                // store.dispatch(openCloseDialog());
              });
          } //end of foundUser else
        } //end of surplus if
        else {
          store.dispatch(selectDialog("error"));
          store.dispatch(getMessage("Expense is above availble surplus funds"));
          store.dispatch(openCloseDialog());
        } //end of surplus else
      } //end of if greater than
      else {
        store.dispatch(selectDialog("error"));
        store.dispatch(
          getMessage("An expense cant be more than the budget amount!")
        );
        store.dispatch(openCloseDialog());
      } //end o greater than else
    } //end of data if
  } //end of outer color if
  else {
    store.dispatch(selectDialog("error"));
    store.dispatch(getMessage("You have'nt selected a color value"));
    store.dispatch(openCloseDialog());
  } //end of outer else
}
