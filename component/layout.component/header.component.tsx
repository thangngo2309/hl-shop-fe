"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "../../store/useUser.store";
import { User, ChevronDown } from "lucide-react";
import { clearAuthTokens } from "@/lib/localstorage";

export default function HeaderComponent() {
  const profile = useUserStore((state) => state.profile);
  const clearProfile = useUserStore((state) => state.clearProfile);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    clearAuthTokens();
    clearProfile();
    setMenuOpen(false);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
      <div className="grid h-16 w-full items-center grid-cols-[1fr_auto] md:grid-cols-[260px_1fr]">

        <Link href="/" className="flex items-center gap-3 px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-md">
            <span className="bg-linear-to-br from-indigo-600 to-purple-600 bg-clip-text text-base font-bold text-transparent">
              L
            </span>
          </div>
          <span className="text-base font-semibold text-white md:text-lg">
            HL Shop
          </span>
        </Link>

        <div className="relative flex items-center justify-end px-6">
          <button
            type="button"
            onClick={() => setMenuOpen((value) => !value)}
            className="inline-flex items-center gap-2 rounded-lg bg-white/20 px-3 py-2 text-white backdrop-blur-sm transition-all hover:bg-white/30"
            aria-label={profile ? "Open account menu" : "Open login menu"}
            aria-expanded={menuOpen}
          >
            <User className="h-4 w-4" />
            <span className="hidden text-sm sm:inline">Tài khoản</span>
            <ChevronDown className={`h-4 w-4 transition-transform ${menuOpen ? 'rotate-180' : ''}`} />
          </button>

          {menuOpen && (
            <div className="absolute right-6 top-[calc(100%+0.5rem)] z-50 w-56 overflow-hidden rounded-md bg-gray-800 shadow-xl ring-1 ring-white/10">
              <div className="py-1">
                {profile ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                      onClick={() => setMenuOpen(false)}
                    >
                      Thông tin tài khoản
                    </Link>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/5 hover:text-white"
                    onClick={() => setMenuOpen(false)}
                  >
                    Đăng nhập
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}