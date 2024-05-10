import { combineReducers, configureStore } from "@reduxjs/toolkit";
import candidatesReducer from "../Slices/CandidateSlice";
import authReducer from "../Slices/authSlice";
import adminReducer from "../Slices/adminSlice";
import userReducer from "../Slices/userSlice";
import allowedUsersSlice from "../Slices/allowedUsersSlice";
import campaignSlice from "../Slices/campaignSlice";
import tokenSlice from "../Slices/tokenSlice";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  admin: adminReducer,
  allowedUser: allowedUsersSlice,
  auth: authReducer,
  candidates: candidatesReducer,
  campaigns: campaignSlice,
  token: tokenSlice,
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
