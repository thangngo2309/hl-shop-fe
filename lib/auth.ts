import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Content-Type': 'application/json' },
});

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