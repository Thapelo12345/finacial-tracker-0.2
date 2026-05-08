import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FormType  {  formType: string; }
const initialState: FormType = {formType : "add"}

const formTypeSlice = createSlice({
    name: "formType",
    initialState,
    reducers: {
        getFormType: (state, action: PayloadAction<string>)=>{
            state.formType = action.payload 
        }
    }
})

export const { getFormType } = formTypeSlice.actions;
export default formTypeSlice.reducer
