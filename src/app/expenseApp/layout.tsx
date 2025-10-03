"use client"
import store from "../state management/store";
import DialogContainer from "../dialogs/dialogContainer";
import { Provider } from "react-redux";
export default function ExpenseApp(
    {
  children,
}: Readonly<{
  children: React.ReactNode;
}>
){
    return(
        <div
         className="relative z-10 w-screen h-screen"
         >
          <Provider store={store}>
            <DialogContainer />
            { children}
            </Provider>
         </div>
    )
}