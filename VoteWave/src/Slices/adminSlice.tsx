import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AdminState {
  currentAdmin: { firstName: string; secondName: string; email: string } | null;
}

const initialState: AdminState = {
  currentAdmin: null,
};
const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (
      state,
      action: PayloadAction<{
        firstName: string;
        secondName: string;
        email: string;
      }>
    ) => {
      state.currentAdmin = action.payload;
    },
    removeAdmin: (state) => {
      state.currentAdmin = null;
    },
  },
});

export const { setAdmin, removeAdmin } = adminSlice.actions;
export default adminSlice.reducer;
