import { createSlice} from "@reduxjs/toolkit";

interface UserLoginState {
  loggedIn: boolean;
}

const initialState: UserLoginState = {
  loggedIn: false,
};

const loggedInSlice = createSlice({
  name: "userLog",
  initialState,
  reducers: {
    toggleLogIn: (state) => {
      state.loggedIn = !state.loggedIn;
    },
  },
});

export const { toggleLogIn } = loggedInSlice.actions;
export default loggedInSlice.reducer;
