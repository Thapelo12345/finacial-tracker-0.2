"use client";
import PageHeader from "@/app/ui/pageHeader";
import BalanceContainer from "@/app/ui/balanceContainer";
import GraphDetails from "@/app/components/budget/graphDetails";
import Piechart from "@/app/components/budget/piechat";
import Barchart from "@/app/components/budget/barchat";
import { db } from "../../../../../firebase.config";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { RootState } from "@/app/state management/store";
import { useDispatch } from "react-redux";
import { onOffSubmit } from "@/app/state management/openSubmition";
import { settingSelected } from "@/app/state management/selectSubmit";
import { appUpdated } from "@/app/state management/UpdateAllComponents";
import { useState, useEffect } from "react";
import AddItemBtn from "@/app/ui/buttons/addItemBtn";
import { BudgetContext } from "@/app/context/budgetContext";
import { openCloseDialog } from "@/app/state management/openCloseDialog";
import { selectDialog } from "@/app/state management/selectDialog";
import { getMessage } from "@/app/state management/dialogMessage";

interface budgetItem {
  budgetExpenseId: number;
  DescriptionTitle: string;
  Amount: number;
  Color: string;
}

export default function Budget() {
  const dispatch = useDispatch();
  const checkUpdate = useSelector(
    (state: RootState) => state.updateApp.updateApp
  );

  const [budgetAmount, setBugdetAmount] = useState(0);
  const [budgetExpense, setBudgetExpense] = useState(0);
  const [budgetSurplus, setBudgetSurplus] = useState(0);
  const [budgetExpenses, setExpense] = useState<budgetItem[]>([]);

  useEffect(() => {
    const data = sessionStorage.getItem("currentUser");

    if (data) {
      const user = JSON.parse(data);

      const surplus = user.budgetAmount - user.budgetExpense

      setBugdetAmount(user.budgetAmount);
      setBudgetExpense(user.budgetExpense);
      setBudgetSurplus(Number(surplus.toFixed(2)));
      setExpense(user.budgetExpenses);
    }
  }, [checkUpdate]);

  const addBudgetExpense = () => {
    dispatch(settingSelected("budget"));
    dispatch(onOffSubmit());
  };

  const updateAmount = async (newAmount: number) => {
    const data = sessionStorage.getItem("currentUser");

    if (data) {
      const user = JSON.parse(data);

      setBugdetAmount(newAmount);

      user.budgetAmount = newAmount;
      const surplus = newAmount - user.budgetExpense;
      user.budgetSurplus = Number(surplus.toFixed(2));
      sessionStorage.setItem("currentUser", JSON.stringify(user));

      try {
        const usersSnapshot = await getDocs(collection(db, "users"));
        const matchingUser = usersSnapshot.docs.find((doc) => {
          const userData = doc.data();
          return userData.email === user.email;
        });

        if (!matchingUser) {
          console.log("User not found!.");
          dispatch(getMessage("User credentials not found"));
          dispatch(selectDialog("error"));
        } else {
          await updateDoc(matchingUser.ref, {
            budgetAmount: newAmount,
            budgetSurplus: Number(surplus.toFixed(2)),
          }).then(() => {
            setTimeout(() => dispatch(openCloseDialog()), 500);
          });
        }
        dispatch(appUpdated());
      } catch (error) {
        //end od try
        console.log(error);
        dispatch(getMessage(`the is an error: ${error}`));
        dispatch(selectDialog("error"));
      } //end of catch
    }
  };

  return (
    <main className="m-2 p-4 pb-15 md:pb-4 w-screen h-screen overflow-y-auto">
      <PageHeader title="Budget" />

      <div className="flex flex-col md:flex-row w-full justify-evenly p-2">
        <BudgetContext.Provider
          value={{ budgetAmount: budgetAmount, updateAmount }}
        >
          <BalanceContainer
            activeClick={true}
            title="Budget Amount"
            amount={budgetAmount}
          />
          <BalanceContainer
            activeClick={false}
            title="Budget Expense"
            amount={budgetExpense}
          />
          <BalanceContainer
            activeClick={false}
            title="Budget Surplus"
            amount={budgetSurplus}
          />
        </BudgetContext.Provider>
      </div>

      <GraphDetails budgetItem={budgetExpenses} />

      <AddItemBtn tipText="Add Expense" btnFunction={addBudgetExpense} />

      <div className="flex flex-col-reverse sm:flex-row w-full h-full md:h-[50%] p-1">
        <Barchart budgetItem={budgetExpenses} />
        <Piechart budgetItem={budgetExpenses} amount={budgetAmount} />
      </div>
    </main>
  );
}
