import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
=======
import authReducer from './slices/authSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
>>>>>>> 1bded25c28a543483de75bb0802b7bd14ef7ec84
