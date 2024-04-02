import { configureStore } from "@reduxjs/toolkit";
import candidatesReducer from "../Slices/CandidateSlice";
import authReducer from "../Slices/authSlice";
import adminReducer from "../Slices/adminSlice";
import userSlice from "../Slices/userSlice";
import allowedUsersSlice from "../Slices/allowedUsersSlice";
import campaignSlice from "../Slices/campaignSlice";
import tokenSlice from "../Slices/tokenSlice";

const store = configureStore({
  reducer: {
    admin: adminReducer,
    allowedUser: allowedUsersSlice,
    auth: authReducer,
    candidates: candidatesReducer,
    campaigns: campaignSlice,
    token: tokenSlice,
    user: userSlice,
  },
});

export default store;
