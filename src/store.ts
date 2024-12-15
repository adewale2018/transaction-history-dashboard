import authReducer from "./features/auth/authSlice";
import { configureStore } from "@reduxjs/toolkit";
import transactionReducer from "./features/transactions/transactionSlice";

export const store = configureStore({
  reducer: {
    transactions: transactionReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
