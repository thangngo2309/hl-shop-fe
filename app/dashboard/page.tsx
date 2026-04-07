'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getProfile } from '@/lib/auth';
import { Button } from '@/component/button.component';
import { useUserStore } from '@/store/useUser.store';


export default function DashboardPage() {
  const router = useRouter();
  const { profile, setProfile, clearProfile } = useUserStore();
  const [error, setError] = useState('');

  // CallBack để tránh việc tạo lại hàm handleGetProfile mỗi khi component re-render
  const handleGetProfile = useCallback(async () => {
    setError('');
    try {
      const res = await getProfile();
      setProfile(res);
    } catch {
      setError('Không thể lấy thông tin profile');
      router.push('/login');
    } finally {
    }
  }, [router, setProfile]);

  useEffect(() => {
    if (!profile) {
      handleGetProfile();
      return;
    }
    // Khi có profile, check role
    if (profile.role !== 'admin') {
      router.push('/profile');
    }
  }, []);

  const handleLogout = () => {
    clearProfile();
    localStorage.clear();
    router.push('/login');
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="w-80 p-6 rounded-xl bg-white shadow-lg flex flex-col gap-4">
        <h2 className="text-center text-gray-900 font-semibold text-xl">Dashboard</h2>

        {profile && (
          <div className="flex flex-col gap-3">
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 text-sm">ID</span>
              <span className="text-gray-900 text-sm font-medium">{profile.user_id}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 text-sm">Username</span>
              <span className="text-gray-900 text-sm font-medium">{profile.username}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 text-sm">Name</span>
              <span className="text-gray-900 text-sm font-medium">{profile.name}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-2">
              <span className="text-gray-500 text-sm">Role</span>
              <span className="text-gray-900 text-sm font-medium">{profile.role}</span>
            </div>
          </div>
        )}

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <Button type="button" variant="danger" onClick={handleLogout}>
          Đăng xuất
        </Button>

      </div>
    </div>
  );
}