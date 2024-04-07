import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Campaign, CampaignState, UpdatedCampaign } from "../Types/types";
import { message } from "antd";

const apiURL = "http://localhost:3000/campaigns";
// const apiURL = "http://localhost:3000/campaignsManagement";

export const fetchCampaigns = createAsyncThunk(
  "campaigns/fetchCampaigns",
  async () => {
    const response = await axios.get(apiURL);
    return response.data;
  }
);

export const addCampaign = createAsyncThunk(
  "campaigns/addCampaign",
  async (campaign: Campaign) => {
    const response = await axios.post(apiURL, campaign);
    return response.data;
  }
);

export const updateCampaign = createAsyncThunk(
  "campaigns/updateCampaign",
  async (updatedCampaign: UpdatedCampaign) => {
    console.log("updated Campaign:", updatedCampaign.id);

    const response = await axios.put(
      `${apiURL}/${updatedCampaign.id}`,
      updatedCampaign
    );
    return response.data;
  }
);

export const deleteCampaign = createAsyncThunk(
  "campaignas/deleteCampagign",
  async (id: number) => {
    axios.delete(`${apiURL}/${id}`);
    return id;
  }
);

const initialState: CampaignState = {
  list: [],
  status: "idle",
  error: null,
};

const campaignSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(addCampaign.fulfilled, (state, action) => {
        state.list.push(action.payload);
        message.success("Campaign Successfully Added");
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        const updatedCampaign = action.payload;
        const existingCampaignIndex = state.list.findIndex(
          (campaign) => campaign.id === updatedCampaign.id
        );
        if (existingCampaignIndex !== -1) {
          state.list[existingCampaignIndex] = updatedCampaign;
        }
      })
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        const id = action.payload;
        state.list = state.list.filter((campaign) => campaign.id !== id);
      });
  },
});

export default campaignSlice.reducer;

export const campaignSliceActions = {
  ...campaignSlice.actions,
  fetchCampaigns,
  addCampaign,
  updateCampaign,
  deleteCampaign,
};
