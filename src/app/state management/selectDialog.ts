import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface dialog {
    selectedDialog: string
}

const initialState: dialog ={
    selectedDialog: "confirm"
}

const selectDialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    selectDialog: (state, action: PayloadAction<string>) => {
      state.selectedDialog = action.payload;
    },
  },
});

export const { selectDialog } = selectDialogSlice.actions;
export default selectDialogSlice.reducer;