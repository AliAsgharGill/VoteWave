import { configureStore } from "@reduxjs/toolkit";
import candidatesReducer from "../Slices/CanididateSlice";
import authReducer from "../Slices/authSlice";
import adminReducer from "../Slices/adminSlice";
import userSlice from "../Slices/userSlice";

const store = configureStore({
  reducer: {
    candidates: candidatesReducer,
    auth: authReducer,
    admin: adminReducer,
    user: userSlice,
  },
});

export default store;
