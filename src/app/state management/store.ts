import { configureStore } from "@reduxjs/toolkit";
import loggedInReducer from "./userLogIn";
import openDialogReducer from "./openCloseDialog";
import dialogMessageReducer from "./dialogMessage";
import selectdailogReducer from './selectDialog'
import submitReducer from './openSubmition'
import selectedSubmitReducer from './selectSubmit'
import updateAPpReducer from './UpdateAllComponents'

const store = configureStore({
  reducer: {
    updateApp: updateAPpReducer,
    selectedSubmittion: selectedSubmitReducer, 
    submit: submitReducer,
    loggedIn: loggedInReducer,
    openDialog: openDialogReducer,
    dialogMessage: dialogMessageReducer,
    selectedDialog: selectdailogReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
