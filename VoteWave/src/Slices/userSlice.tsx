import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  currentUser: { firstName: string; secondName: string; email: string } | null;
}

const initialState: userState = {
  currentUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ firstName: string; secondName: string; email: string }>
    ) => {
      state.currentUser = action.payload;
    },
    removeUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
