"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUserStore } from "../../store/useUser.store";
import { User, ShoppingCart, Bell, LogOutIcon } from "lucide-react";
import { clearAuthTokens } from "@/lib/localstorage";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export default function HeaderComponent() {
  const profile = useUserStore((state) => state.profile);
  const clearProfile = useUserStore((state) => state.clearProfile);
  const router = useRouter();

  const handleLogout = () => {
    clearAuthTokens();
    clearProfile();
    router.push("/");
  };

  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-500 shadow-lg">
      <div className="grid h-16 w-full grid-cols-[1fr_auto] items-center md:grid-cols-[260px_1fr]">
        <Link href="/" className="flex items-center gap-3 px-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-md md:ml-0">
            <Image
              src="/images/next-js.svg"
              alt="Next.js Logo"
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
          </div>

          <span className="text-base font-semibold text-white md:inline-block md:text-lg">
            HL Shop
          </span>
        </Link>

        <div className="flex items-center justify-end gap-3 px-6">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Giỏ hàng"
            className="h-10 w-10 rounded-lg bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 hover:text-white"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Thông báo"
            className="h-10 w-10 rounded-lg bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 hover:text-white"
          >
            <Bell className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={profile ? "Tài khoản" : "Đăng nhập"}
                className="h-10 w-10 rounded-lg bg-white/20 text-white backdrop-blur-sm hover:bg-white/30 hover:text-white"
              >
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="min-w-44 rounded-xl"
            >
              {profile ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="h-4 w-4" />
                      <span>Thông tin tài khoản</span>
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    variant="destructive"
                    className="cursor-pointer"
                  >
                    <LogOutIcon className="h-4 w-4" />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link href="/login" className="cursor-pointer">
                    <User className="h-4 w-4" />
                    <span>Đăng nhập</span>
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}