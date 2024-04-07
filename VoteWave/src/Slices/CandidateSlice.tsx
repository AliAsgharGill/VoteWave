import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Candidate, CandidatesState } from "../Types/types";
import axios from "axios";

const initialState: CandidatesState = {
  list: [],
  status: "idle",
  error: null,
};

export const fetchCandidates = createAsyncThunk(
  "candidates/fetchCandidates",
  async () => {
    const response = await axios.get("http://localhost:3000/candidates");
    return response.data;
  }
);

export const addCandidate = createAsyncThunk(
  "candidates/addCandidate",
  async (newCandidate: Candidate) => {
    const response = await axios.post(
      "http://localhost:3000/candidates",
      newCandidate
    );
    return response.data;
  }
);

export const updateCandidate = createAsyncThunk(
  "candidates/updateCandidate",
  async (updatedCandidate: Candidate) => {
    const response = await axios.put(
      `http://localhost:3000/candidates/${updatedCandidate.id}`
    );
    return response.data;
  }
);

export const updateCandidateVotes = createAsyncThunk(
  "candidates/updateCandidateVotes",
  async (participant: Candidate) => {
    const response = await axios.patch(
      `http://localhost:3000/candidates/${participant.id}`,
      { votes: participant.votes + 1 }
    );
    return response.data;
  }
);

export const deleteCandidate = createAsyncThunk(
  "candidates/deleteCandidate",
  async (id: number) => {
    await axios.delete(`http://localhost:3000/candidates/${id}`);
    return id;
  }
);

const candidatesSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCandidates.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred.";
      })
      .addCase(addCandidate.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateCandidate.fulfilled, (state, action) => {
        const updatedCandidate = action.payload;
        const existingCandidateIndex = state.list.findIndex(
          (candidate) => candidate.id === updatedCandidate.id
        );
        if (existingCandidateIndex !== -1) {
          state.list[existingCandidateIndex] = updatedCandidate;
        }
      })
      .addCase(updateCandidateVotes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCandidateVotes.fulfilled, (state, action) => {
        state.status = "idle";
        state.list = state.list.map((candidate) =>
          candidate.id === action.payload.id
            ? { ...candidate, votes: action.payload.votes }
            : candidate
        );
      })
      .addCase(updateCandidateVotes.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message || null;
        console.log("update vote rejected Done");
      })
      .addCase(deleteCandidate.fulfilled, (state, action) => {
        const id = action.payload;
        state.list.filter((candidate) => candidate.id !== id);
      });
  },
});

export default candidatesSlice.reducer;

export const candidatesSliceAction = {
  ...candidatesSlice.actions,
  fetchCandidates,
  addCandidate,
  updateCandidate,
  deleteCandidate,
  updateCandidateVotes,
};
