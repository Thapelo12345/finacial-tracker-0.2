import { createSlice } from "@reduxjs/toolkit";

const initialState:{ appLoadingStatus: boolean;} = {
    appLoadingStatus: false,
}

const appLoadSLice = createSlice({
    name: "apploading",
    initialState,
    reducers: {
        setAppLoadingStatus: (state) => {
            state.appLoadingStatus = !state.appLoadingStatus;
        }
    }
});

export const { setAppLoadingStatus } = appLoadSLice.actions;
export default appLoadSLice.reducer;