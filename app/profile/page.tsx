'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/lib/auth';

interface Profile {
  sub: number;
  username: string;
  name?: string;
  iat: number;
  exp: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetProfile = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await getProfile();
      setProfile(data);
    } catch {
      setError('Không thể lấy thông tin profile');
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="w-80 p-6 rounded-xl bg-white shadow-lg flex flex-col gap-4">
        <h2 className="text-center text-gray-900 font-semibold text-xl">Profile</h2>

        {profile && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 text-sm">ID</span>
              <span className="text-gray-900 text-sm font-medium">{profile.sub}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 text-sm">Username</span>
              <span className="text-gray-900 text-sm font-medium">{profile.username}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 text-sm">Name</span>
              <span className="text-gray-900 text-sm font-medium">{profile.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">Token hết hạn</span>
              <span className="text-gray-900 text-sm font-medium">
                {new Date(profile.exp * 1000).toLocaleTimeString()}
              </span>
            </div>
          </div>
        )}

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <button
          onClick={handleGetProfile}
          disabled={loading}
          className="py-2.5 rounded-md border-none bg-blue-700 text-white font-bold cursor-pointer hover:bg-blue-800 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Đang tải...' : 'Get Profile'}
        </button>

        <button
          onClick={handleLogout}
          className="py-2.5 rounded-md border-none bg-red-600 text-white font-bold cursor-pointer hover:bg-red-700 transition-colors"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}