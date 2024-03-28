import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Candidate } from "../Types/types";
import axios from "axios";

list: Candidate[];
interface CandidatesState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CandidatesState = {
  list: [],
  status: 'idle',
  error:null
};

export const fetchCandidates = createAsyncThunk(
  'candidates/fetchCandidates',
  async ()=>{
    const response = await axios.get('http://localhost:3000/candidates')
    return response.data
  }
)
const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
});

export default candidatesSlice.reducer;
