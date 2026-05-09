import { createSlice } from "@reduxjs/toolkit";
import { setBillSlice } from "./bill";

interface BillLoader  {
    billLoad: boolean;
}

const initialState = {billLoad: false}

const billLoadSlice = createSlice({
    name: "billLoader",
    initialState,
    reducers: {
        setBillLoader: (state) =>{state.billLoad = !state.billLoad}
    }
})

export const { setBillLoader } = billLoadSlice.actions
export default billLoadSlice.reducer;