import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
