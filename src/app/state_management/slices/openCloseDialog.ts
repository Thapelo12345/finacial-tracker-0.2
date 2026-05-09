import { createSlice } from "@reduxjs/toolkit";

interface toggleDialog {
    openDialog: boolean;
};

const initialState: toggleDialog = {
    openDialog: false,
};

const openDialogSlice = createSlice({
    name: "openDialog",
    initialState,
    reducers: {
        openCloseDialog: (state) => {
            state.openDialog = !state.openDialog
        },
    },
})

export const { openCloseDialog } = openDialogSlice.actions;
export default openDialogSlice.reducer;