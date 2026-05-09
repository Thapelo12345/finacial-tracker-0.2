import { createSlice } from "@reduxjs/toolkit";

type UpdateAppState = {
    updateApp: boolean;
}

const initialState: UpdateAppState = {
    updateApp: false,
}

const updateAppSlice = createSlice({
    name: "updateApp",
    initialState,
    reducers: {
        appUpdated: (state) => {
            state.updateApp = !state.updateApp;
        }
    }
});

export const { appUpdated } = updateAppSlice.actions;
export default updateAppSlice.reducer;