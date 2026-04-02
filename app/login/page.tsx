'use client';

import { useState } from 'react';
import { login, refresh } from '@/lib/auth';
import { isTokenExpired } from '@/lib/token';

export default function LoginPage() {
  const [username, setUsername] = useState(''); // Thêm state cho username
  const [password, setPassword] = useState(''); // Thêm state cho password
  const [loading, setLoading] = useState(false); // Thêm state cho loading
  const [error, setError] = useState('');  // Thêm state cho error
  const [success, setSuccess] = useState(false);  // Thêm state cho success

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {    
      const data = await login(username, password);
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('refresh_token', data.refresh_token);

      console.log('Access token expired:', isTokenExpired(data.access_token));
      console.log('Refresh token expired:', isTokenExpired(data.refresh_token));

      console.log(data);
      setSuccess(true);

    } catch {
      setError('Sai username hoặc password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Đăng nhập</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        {success && <p style={styles.success}>Đăng nhập thành công!</p>}
        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const styles: any = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#e5e7eb',
  },
  form: {
    width: '320px',
    padding: '24px',
    borderRadius: '10px',
    background: '#ffffff',
    boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  title: {
    textAlign: 'center',
    marginBottom: '10px',
    color: '#111827',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #9ca3af',
    color: '#111827',
    outline: 'none',
  },
  button: {
    padding: '10px',
    borderRadius: '6px',
    border: 'none',
    background: '#1d4ed8',
    color: '#ffffff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  success: {
    color: '#16a34a',
    fontSize: '14px',
    textAlign: 'center',
  },
  error: {
    color: '#dc2626',
    fontSize: '14px',
    textAlign: 'center',
  },
};