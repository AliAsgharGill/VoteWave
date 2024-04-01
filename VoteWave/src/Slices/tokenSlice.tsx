import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TokensState } from "../Types/types";

export const deleteAllTokens = createAsyncThunk(
  "clearTokens",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/tokens/`);
      const arrayItems = response.data;
      // for (const item of arrayItems) {
      //     await axios.delete(`http://localhost:3000/tokens/${item.id}`)
      // }
      const deleteRequests = arrayItems.map((item) =>
        axios.delete(`http://localhost:3000/tokens/${item.id}`)
      );
      await Promise.all(deleteRequests);
      return true;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: TokensState = {
  tokens: [],
  loading: false,
  error: null,
  cleared: false,
};

const tokensSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteAllTokens.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAllTokens.fulfilled, (state) => {
        state.loading = false;
        state.cleared = true;
      })
      .addCase(deleteAllTokens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      });
  },
});
export default tokensSlice.reducer;
