import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { AllowedUser, AllowedUserState } from "../Types/types";

const apiURL = "http://localhost:3000/allowedUsers";

export const fetchAllowedUsers = createAsyncThunk(
  "allowedUsers/fetchAllowedUsers",
  async () => {
    const response = await axios.get(apiURL);
    return response.data;
  }
);

export const addAllowedUser = createAsyncThunk(
  "allowedUsers/addAllowedUser",
  async (user: AllowedUser) => {
    const response = await axios.post(apiURL, user);
    return response.data;
  }
);

const initialState: AllowedUserState = {
  list: [],
  status: "idle",
  error: null,
};

const allowedUserSlice = createSlice({
  name: "allowedUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllowedUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllowedUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchAllowedUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(addAllowedUser.fulfilled, (state, action) => {
        // state.list.push(action.payload);
        state.list = [...state.list, action.payload];
      });
  },
});

export default allowedUserSlice.reducer;

export const allowedUserSliceActions = {
  ...allowedUserSlice.actions,
  fetchAllowedUsers,
  addAllowedUser,
};
