import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { mockTransactionsData as data } from "../../utils/data";

export interface TransactionProps {
  id: number;
  date: string;
  amount: number;
  description: string;
  status: string;
}

interface TransactionState {
  transactions: TransactionProps[];
  transactionDetails: TransactionProps | null;
  loading: boolean;
  error: string | null;
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
  transactionDetails: null,
  loading: false,
  error: null,
  filter: "all",
  currentPage: 1,
  pageSize: 4,
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      const { payload } = action;
      state.loading = payload;
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
  extraReducers: (builder) => {
    builder
      .addCase(mockGetTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        mockGetTransactions.fulfilled,
        (state, action: PayloadAction<TransactionProps[]>) => {
          state.loading = false;
          state.transactions = action.payload;
        }
      )
      .addCase(mockGetTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong.";
      })
      .addCase(mockGetTransactionDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.transactionDetails = null;
      })
      .addCase(mockGetTransactionDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.transactionDetails = action.payload;
      })
      .addCase(mockGetTransactionDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const mockGetTransactions = createAsyncThunk(
  "transactions/getTransactions",
  async () => {
    try {
      const response = await new Promise<{
        status: number;
        transactions: typeof data;
      }>((resolve) => {
        setTimeout(() => {
          resolve({ status: 200, transactions: data });
        }, 2000);
      });

      return response.transactions;
    } catch (error) {
      throw new Error("Failed to fetch transactions.");
    }
  }
);

export const mockGetTransactionDetails = createAsyncThunk<
  TransactionProps,
  number,
  { rejectValue: string }
>("transactions/getTransaction", async (transactionId, { rejectWithValue }) => {
  try {
    const response = await new Promise<{
      status: number;
      details: TransactionProps | undefined;
    }>((resolve) => {
      setTimeout(() => {
        const details = data.find((item) => item.id === transactionId);
        resolve({ status: 200, details });
      }, 2000);
    });

    if (!response.details) {
      return rejectWithValue("Transaction not found.");
    }

    return response.details;
  } catch (error) {
    return rejectWithValue("Failed to fetch transaction!.");
  }
});

export const {
  setTransactions,
  setFilter,
  setCurrentPage,
  setSortConfig,
  setLoading,
} = transactionSlice.actions;
export default transactionSlice.reducer;
