import { configureStore } from "@reduxjs/toolkit";
import candidatesReducer from "../Slices/CanididateSlice";
const store = configureStore({
  reducer: {
    candidates: candidatesReducer,
  },
});

export default store;
