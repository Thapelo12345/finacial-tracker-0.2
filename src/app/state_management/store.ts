import { configureStore } from "@reduxjs/toolkit";
import loggedInReducer from "./slices/userLogIn";
import openDialogReducer from "./slices/openCloseDialog";
import dialogMessageReducer from "./slices/dialogMessage";
import selectdailogReducer from "./slices/selectDialog";
import submitReducer from "./slices/openSubmition";
import selectedSubmitReducer from "./slices/selectSubmit";
import updateAPpReducer from "./slices/UpdateAllComponents";
import formTypeReducer from "./slices/billType";
import billReducer from "./slices/bill"
import billLoad from "./slices/billLoader"
import appLoadStatusReducer from "./slices/loadStatus"

const store = configureStore({
  reducer: {
    updateApp: updateAPpReducer,
    selectedSubmittion: selectedSubmitReducer,
    submit: submitReducer,
    loggedIn: loggedInReducer,
    openDialog: openDialogReducer,
    dialogMessage: dialogMessageReducer,
    selectedDialog: selectdailogReducer,
    formtype: formTypeReducer,
    bill: billReducer,
    billLoader: billLoad,
    appLoadStatus: appLoadStatusReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
