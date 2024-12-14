import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface TransactionProps {
  id: number;
  date: string;
  amount: number;
  description: string;
  status: string;
}

interface TransactionState {
  transactions: TransactionProps[];
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
    setTransactions: (state, action: PayloadAction<TransactionProps[]>) => {
      const { payload } = action;
      state.transactions = payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.filter = payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      const { payload } = action;
      state.currentPage = payload;
    },
  },
});

export const { setTransactions, setFilter, setCurrentPage } =
  transactionSlice.actions;
export default transactionSlice.reducer;
