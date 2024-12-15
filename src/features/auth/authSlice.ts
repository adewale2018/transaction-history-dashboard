import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface MockLoginProps {
  email: string;
  password: string;
}

export type MockLoginRes = {
  status: number;
  token?: string;
  message?: string;
};

interface AuthState {
  email: string;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  email: "",
  loading: false,
  error: null,
};

export const mockLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }: MockLoginProps): Promise<MockLoginRes> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(!email) {
          reject("Email is required!")
        }
        if(!password) {
          reject("Password is required!")
        }
        if (email === "admin@gmail.com" && password === "admin") {
          resolve({ status: 200, token: "mock-jwt-token" });
        } else {
          reject("Invalid credentials");
        }
      }, 2000);
    });
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout() {
      localStorage.clear();
    },
    setEmail: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.email = payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      const { payload } = action;
      state.error = payload;
    },
  },
});

export const { logout, setEmail } = authSlice.actions;
export default authSlice.reducer;
