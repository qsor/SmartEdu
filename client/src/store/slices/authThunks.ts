import api from "@/api/instance";
import { setTokens } from "@/api/tokenStorage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type AuthUser = {
  id: number;
  name: string;
  email: string;
  avatar?: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  user: AuthUser;
  accessToken: string;
  refreshToken?: string;
};

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginCredentials,
  { rejectValue: string }
>("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    // mock if need
    // await new Promise((resolve) => setTimeout(resolve, 500));
    // return {
    //   user: {
    //     id: 1,
    //     name: credentials.email.split("@")[0],
    //     email: credentials.email,
    //     avatar: "",
    //   },
    //   token: "mock-token",
    // };

    const response = await api.post<AuthResponse>("/auth/login", credentials);

    setTokens(response.data.accessToken, response.data.refreshToken);

    return response.data;
  } catch {
    return rejectWithValue("incorrect email or password");
  }
});

export const registerUser = createAsyncThunk<
  AuthResponse,
  RegisterCredentials,
  { rejectValue: string }
>("auth/registerUser", async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post<AuthResponse>(
      "/auth/register",
      credentials,
    );

    setTokens(response.data.accessToken, response.data.refreshToken);

    return response.data;
  } catch {
    return rejectWithValue("failed to register");
  }
});
