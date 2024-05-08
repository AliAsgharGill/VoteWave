import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface signupData {
  name: string;
  email: string;
  password: string;
}

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (signupData: signupData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/users",
        signupData
      );
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(error.response.data);
    }
  }
);

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  error: string | null;
}
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
      });
  },
});

export default authSlice.reducer;
