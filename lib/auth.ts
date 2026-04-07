import axios from 'axios';
import { isTokenExpired } from './token';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

// Gắn token vào header mỗi request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
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

    //
    if (error.response?.status === 401 && !original._retry) {
      // Đánh dấu đã retry để không lặp nữa
      original._retry = true;

      // Lấy refresh token từ localStorage
      const refresh_token = localStorage.getItem('refresh_token');
      if (!refresh_token) {
        // Nếu không có refresh token, logout và chuyển về trang login
        window.location.href = '/login';
        return Promise.reject(error);
      }

      // Nếu refresh token đã hết hạn, logout và chuyển về trang login
      if (isTokenExpired(refresh_token)) {
        window.location.href = '/login';
        return Promise.reject(error);
      }
      
      try {
        // Gọi API refresh token
        const { data } = await api.post<{ access_token: string }>('/auth/refresh', { refresh_token });
        localStorage.setItem('access_token', data.access_token);
        // Cập nhật header Authorization và retry request gốc
        original.headers.Authorization = `Bearer ${data.access_token}`;
        return api(original);
      } catch {
        localStorage.clear();
        window.location.href = '/login';
      }
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
  return res.data;}

export async function logout(): Promise<void> {
  await api.post('/auth/logout');
}

export async function getProfile(): Promise<{ 
  user_id: number;
  username: string;
  name: string | null;
  role: string;
}>{
  const res = await api.get('/auth/profile');
  return res.data;
}
  