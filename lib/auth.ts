import axios from 'axios';
import { isTokenExpired } from './token';
import {
  clearAuthTokens,
  getAccessToken,
  getRefreshToken,
  setAuthTokens
} from './localstorage';
import { toast } from 'react-toastify';
import { API_ERROR_MESSAGES } from '@/constants/api-error-message';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

// Gắn token vào header mỗi request
api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Xử lý lỗi 401 để tự động refresh token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    const isLoginPage = window.location.pathname === '/login';

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const refresh_token = getRefreshToken();

      if (!refresh_token || isTokenExpired(refresh_token)) {
        if (!isLoginPage) {
          toast.error(API_ERROR_MESSAGES.code401);
          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
        }
        return Promise.reject(error);
      }

      try {
        const { data } = await api.post<{ access_token: string }>('/auth/refresh', { refresh_token });
        setAuthTokens(data.access_token, refresh_token);
        original.headers.Authorization = `Bearer ${data.access_token}`;
        return api(original);
      } catch {
        clearAuthTokens();
        if (!isLoginPage) {
          toast.error(API_ERROR_MESSAGES.code401);
          setTimeout(() => {
            window.location.href = '/login';
          }, 1500);
        }
      }
    }

    return Promise.reject(error);
  }
);

// Xử lý các lỗi khi call API để thông báo lỗi cho người dùng
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    switch (status) {
      case 400:
        toast.error(API_ERROR_MESSAGES.code400);
        break;

      case 401:
        toast.error(API_ERROR_MESSAGES.code401);
        break;

      case 403:
        toast.error(API_ERROR_MESSAGES.code403);
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
        break;

      case 404:
        toast.error(API_ERROR_MESSAGES.code404);
        setTimeout(() => {
          window.location.href = '/';
        }, 3000);
        break;

      case 500:
        toast.error(API_ERROR_MESSAGES.code500);
        break;

      case 502:
        toast.error(API_ERROR_MESSAGES.code502);
        break;

      case 504:
        toast.error(API_ERROR_MESSAGES.code504);
        break;

      default:
        if (!status) {
          toast.error(API_ERROR_MESSAGES.code0);
        }
        break;
    }

    return Promise.reject(error);
  }
);

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export async function login(username: string, password: string): Promise<AuthResponse> {
  const res = await api.post<AuthResponse>('/auth/login', { username, password });
  return res.data;
}

export async function refresh(refresh_token: string): Promise<{ access_token: string }> {
  const res = await api.post<{ access_token: string }>('/auth/refresh', { refresh_token });
  return res.data;
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
  clearAuthTokens();
}

export async function getProfile(): Promise<{
  user_id: number;
  username: string;
  name: string | null;
  role: string;
}> {
  const res = await api.get('/auth/profile');
  return res.data;
}
