import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import {
  clearAuth, getAccessToken, getRefreshToken, setTokens,
} from "./tokenStorage";
import instance from './instance';

type RetryRequestConfig = InternalAxiosRequestConfig & { _retry?: boolean; };

export const enrollCourse = async (courseId: string) => {
  const response = await instance.post(`/courses/${courseId}/enroll`);
  return response.data;
};

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true, //  Отправляем Cookie
});

// читаем новый access token из заголовка каждого ответа
api.interceptors.response.use((response) => {
  const newAccessToken = response.headers['x-new-access-token'];
  if (newAccessToken) {
    const refreshToken = getRefreshToken();
    setTokens(newAccessToken, refreshToken || undefined);
  }
  return response;
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = getAccessToken();
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// обработка 418 и silent refresh через Cookie
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as RetryRequestConfig | undefined;

    if (error.response?.status !== 418 || !originalRequest || originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    try {
      const { headers } = await axios.post("/api/auth/refresh", {}, { withCredentials: true });
      const newAccessToken = headers['x-new-access-token'];

      if (newAccessToken) {
        setTokens(newAccessToken, getRefreshToken() || undefined);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    } catch (refError) {
      clearAuth();
      if (window.location.pathname !== "/login") window.location.href = "/login";
      return Promise.reject(refError);
    }
  },
);

export default api;