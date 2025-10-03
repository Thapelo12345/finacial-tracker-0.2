import { createContext } from "react";

interface budgetContext {
  budgetAmount: number;
  updateAmount: (newAmount: number) => void;
}

export const BudgetContext = createContext<budgetContext>({
  budgetAmount: 0,
  updateAmount: () => {},
});
