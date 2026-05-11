import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Bill from "@/app/interFaces/billInterface";

const initialState: Bill = {
  id: 0,
  title: "",
  amount: 0.0,
  description: "",
  startDate: "",
  dueDate: "",
  endDate: "",
  lastPayment: "",
  category: "",
  duration: "",
  frenquently: "",
  status: "",
  AutoPay: false,
}

const billSlice = createSlice({
    name: "billSlice",
    initialState,
    reducers: {
        setBillSlice: (state, action: PayloadAction<Bill>) =>{
            return action.payload
        }
    }
})

export const { setBillSlice } = billSlice.actions;
export default billSlice.reducer;