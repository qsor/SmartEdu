import api from "@/api/instance";
import { setTokens, getRefreshToken } from "@/api/tokenStorage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type AuthUser = { 
  id: string; 
  firstName: string; 
  lastName?: string | null; 
  email?: string | null; 
  avatar?: string; 
};

export type LoginCredentials = { email: string; password: string };
export type RegisterCredentials = { name: string; email: string; password: string };

export type AuthResponse = { 
  user: AuthUser; 
  accessToken: string; 
  refreshToken?: string; 
};

export const loginUser = createAsyncThunk<AuthResponse, LoginCredentials, { rejectValue: string }>(
  "auth/loginUser", async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const accessToken = response.headers['x-new-access-token'] || response.data.accessToken;
      const refreshToken = getRefreshToken() || response.data.refreshToken;
      if (accessToken) setTokens(accessToken, refreshToken || undefined);

      const user = response.data.myself || response.data.user;

      return { user, accessToken, refreshToken };
    } catch (err: any) { 
      return rejectWithValue(err.response?.data?.message || "incorrect email or password"); 
    }
});

export const registerUser = createAsyncThunk<AuthResponse, RegisterCredentials, { rejectValue: string }>(
  "auth/registerUser", async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/register", credentials);
      const accessToken = response.headers['x-new-access-token'] || response.data.accessToken;
      const refreshToken = getRefreshToken() || response.data.refreshToken;
      if (accessToken) setTokens(accessToken, refreshToken || undefined);

      const user = response.data.myself || response.data.user;

      return { user, accessToken, refreshToken };
    } catch (err: any) { 
      return rejectWithValue(err.response?.data?.message || "failed to register"); 
    }
});