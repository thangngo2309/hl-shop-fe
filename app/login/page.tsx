'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';
import { isTokenExpired } from '@/lib/token';

type LoginForm = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await login(data.username, data.password);
      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('refresh_token', res.refresh_token);

      // console.log('Access token expired:', isTokenExpired(res.access_token));
      // console.log('Refresh token expired:', isTokenExpired(res.refresh_token));

      router.push('/profile');
    } catch {
      setError('root', { message: 'Sai username hoặc password' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md p-8">
        <h1 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Đăng nhập
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Username</label>
            <input
              {...register('username', {
                required: 'Username không được để trống',
                minLength: { value: 3, message: 'Username tối thiểu 3 ký tự' },
              })}
              placeholder="Nhập username"
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {errors.username && (
              <p className="text-red-500 text-xs">{errors.username.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              {...register('password', {
                required: 'Password không được để trống',
                minLength: { value: 6, message: 'Password tối thiểu 6 ký tự' },
              })}
              type="password"
              placeholder="Nhập password"
              className="px-3 py-2 rounded-lg border border-gray-300 text-gray-900 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {isSubmitSuccessful && (
            <p className="text-green-600 text-sm text-center">Đăng nhập thành công!</p>
          )}
          {errors.root && (
            <p className="text-red-500 text-sm text-center">{errors.root.message}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 py-2.5 rounded-lg bg-blue-700 text-white font-semibold hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
      </div>
    </div>
  );
}