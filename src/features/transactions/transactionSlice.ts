import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  description: string;
  status: string;
}

interface TransactionState {
  transactions: Transaction[];
  filter: string;
  currentPage: number;
  pageSize: number;
}

const initialState: TransactionState = {
  transactions: [],
  filter: "all",
  currentPage: 1,
  pageSize: 5,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setTransactions, setFilter, setCurrentPage } =
  transactionSlice.actions;
export default transactionSlice.reducer;
