import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { RefreshResponse } from "./types";
import {
  clearAuth,
  getAccessToken,
  getRefreshToken,
  setTokens,
} from "./tokenStorage";

type RetryRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

export const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const refreshToken = getRefreshToken();

      if (!refreshToken) {
        throw new Error("Refresh token not found");
      }

      const { data } = await axios.post<RefreshResponse>("/api/auth/refresh", {
        refreshToken,
      });

      setTokens(data.accessToken, data.refreshToken);

      originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

      return api(originalRequest);
    } catch (refError) {
      clearAuth();

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }

      return Promise.reject(refError);
    }
  },
);

export default api;
