<<<<<<< HEAD
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {

  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
=======
import { configureStore } from "@reduxjs/toolkit";
// заглушка от ошибки
export const store = configureStore({
  reducer: {},
});
>>>>>>> 2b63e31a7da71777bb027e7f68e4a9a4f1e63792
