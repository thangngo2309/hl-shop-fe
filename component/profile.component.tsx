'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { getProfile } from '@/lib/auth';
import { useUserStore } from '@/store/useUser.store';
import Loading from '@/component/loading.component';

const MIN_LOADING_MS = 200;
 
export default function ProfileProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const setProfile = useUserStore((state) => state.setProfile);
  const [isLoading, setIsLoading] = useState(true);
 
  useEffect(() => {
    const handleGetProfile = async () => {
      try {
        const [res] = await Promise.all([
          getProfile(),
          new Promise((resolve) => setTimeout(resolve, MIN_LOADING_MS)),
        ]);
        setProfile(res);
      } catch {
        toast.error('Không thể lấy thông tin profile');
        router.push('/login');
      } finally {
        setIsLoading(false);
      }
    };
 
    handleGetProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 
  if (isLoading) return <Loading />;
 
  return <>{children}</>;
}