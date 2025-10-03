import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface submitting{
    selectedSubmit: string;
}

const initialState:submitting={
    selectedSubmit:"transaction",
}

const submittedSlice = createSlice({
    name: "submitted",
    initialState,
    reducers: {
        settingSelected: (state, action: PayloadAction<string>)=>{
            state.selectedSubmit = action.payload
        }
    }
})

export const { settingSelected } = submittedSlice.actions
export default submittedSlice.reducer