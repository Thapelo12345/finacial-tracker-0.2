import { createContext } from "react";

interface billContext {
  cardId: number
  statusTheme: string;
  headColor: string;
  setTheme: (theme: string) => void;
}


export const BillContext = createContext<billContext>({
  cardId: 0,
  statusTheme: "active",
  headColor: "120,100%,90%",
  setTheme: () => {},
});

interface LoadingContext {
  load: (value: boolean) => void;
}

export const LoadContext = createContext<LoadingContext>({
  load: () => {},
});
