"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CircleUserRound, LogIn, Sparkles } from "lucide-react";

import { supabase } from "@/lib/supabaseClient";
import LogoutButton from "@/components/auth/LogoutButton";

type UserInfo = {
  email: string;
} | null;

export default function AuthStatus() {
  const [user, setUser] = useState<UserInfo>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user ? { email: user.email || "" } : null);
      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center gap-3">
        <div className="h-10 w-24 animate-pulse rounded-full bg-[#F3E7F7]" />
        <div className="h-10 w-28 animate-pulse rounded-full bg-[#F3E7F7]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="group relative overflow-hidden rounded-full border border-white/70 bg-white/68 px-5 py-2.5 text-sm font-semibold text-[#6F3E8F] shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_45px_rgba(111,62,143,0.16)]"
        >
          <span className="relative flex items-center gap-2">
            <LogIn size={16} />
            Login
          </span>
        </Link>

        <Link
          href="/register"
          className="group relative overflow-hidden rounded-full bg-[#6F3E8F] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_18px_42px_rgba(111,62,143,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
        >
          <span className="relative flex items-center gap-2">
            <Sparkles size={16} />
            Register
          </span>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className="group relative overflow-hidden rounded-full border border-white/70 bg-white/68 px-4 py-2.5 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl transition-all duration-300 hover:bg-white hover:shadow-[0_20px_45px_rgba(111,62,143,0.16)]">
        <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#F7E7F2] blur-2xl transition-all duration-500 group-hover:bg-[#E8D3F5]" />

        <div className="relative flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F7E7F2] text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
            <CircleUserRound size={18} />
          </div>

          <div className="hidden sm:block">
            <p className="max-w-[180px] truncate text-sm font-medium text-[#70537C]">
              {user.email}
            </p>
          </div>
        </div>
      </div>

      <LogoutButton />
    </div>
  );
}