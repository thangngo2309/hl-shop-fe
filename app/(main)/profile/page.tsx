'use client';

import { useUserStore } from '@/store/useUser.store';

export default function ProfilePage() {
  const { profile} = useUserStore();

  return (
    <div className="h-screen flex justify-center items-center bg-gray-200">
      <div className="w-80 p-6 rounded-xl bg-white shadow-lg flex flex-col gap-4">
        <h2 className="text-center text-gray-900 font-semibold text-xl">Thông tin người dùng</h2>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500 text-sm">ID</span>
            <span className="text-gray-900 text-sm font-medium">{profile?.user_id}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500 text-sm">Username</span>
            <span className="text-gray-900 text-sm font-medium">{profile?.username}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500 text-sm">Tên</span>
            <span className="text-gray-900 text-sm font-medium">{profile?.name}</span>
          </div>
          <div className="flex justify-between border-b border-gray-100 pb-2">
            <span className="text-gray-500 text-sm">Role</span>
            <span className="text-gray-900 text-sm font-medium">{profile?.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}