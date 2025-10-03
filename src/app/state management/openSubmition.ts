import { createSlice } from "@reduxjs/toolkit";

interface openCloseSubmition {
    openToSubmit: boolean;
};

const initialState: openCloseSubmition= {
    openToSubmit: false,
};

const submitSlice = createSlice({
    name: "submitting",
    initialState,
    reducers: {
        onOffSubmit: (state) => {
            state.openToSubmit = !state.openToSubmit
        },
    },
})

export const { onOffSubmit } = submitSlice.actions
export default submitSlice.reducer
