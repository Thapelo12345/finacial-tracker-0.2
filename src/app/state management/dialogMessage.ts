import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Message {
    dialogMessage: string;
}

const initialState:Message = {
    dialogMessage: "Dialog Message here",
}

const dialogMessages = createSlice({
    name: "dialogMessage",
    initialState,
    reducers: {
        getMessage: (state, action: PayloadAction<string>) =>{
            state.dialogMessage = action.payload
        }
    }
})

export const { getMessage } = dialogMessages.actions
export default dialogMessages.reducer