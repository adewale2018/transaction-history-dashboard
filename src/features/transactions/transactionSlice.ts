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
  sortConfig: {
    key: keyof TransactionProps | null;
    direction: "asc" | "desc" | null;
  };
}

const initialState: TransactionState = {
  transactions: [],
  filter: "all",
  currentPage: 1,
  pageSize: 5,
  sortConfig: { key: "date", direction: "asc" },
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
    setSortConfig: (
      state,
      action: PayloadAction<{
        key: keyof TransactionProps;
        direction: "asc" | "desc";
      }>
    ) => {
      const { payload } = action;
      state.sortConfig = payload;
    },
  },
});

export const { setTransactions, setFilter, setCurrentPage, setSortConfig } =
  transactionSlice.actions;
export default transactionSlice.reducer;
