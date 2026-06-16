import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, registerUser, AuthUser } from "./authThunks";

// В интерфейсе строго isLoading
export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean; 
  error: string | null;
}

const getInitialUser = (): AuthUser | null => {
  if (typeof window === "undefined") return null;
  try {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    return null;
  }
};

// В initialState тоже isLoading
const initialState: AuthState = {
  user: getInitialUser(),
  isAuthenticated: typeof window !== "undefined" && !!localStorage.getItem("accessToken"),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("user");
      }
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => { 
        state.isLoading = true;
        state.error = null; 
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        if (typeof window !== "undefined" && action.payload.user) {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Ошибка входа";
      })
      // Register
      .addCase(registerUser.pending, (state) => { 
        state.isLoading = true;
        state.error = null; 
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        if (typeof window !== "undefined" && action.payload.user) {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || "Ошибка регистрации";
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;