"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="group relative overflow-hidden rounded-full border border-white/70 bg-white/68 px-5 py-2.5 text-sm font-semibold text-[#6F3E8F] shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-[#6F3E8F] hover:bg-[#6F3E8F] hover:text-white hover:shadow-[0_20px_45px_rgba(111,62,143,0.18)]"
    >
      <span className="relative flex items-center gap-2">
        <LogOut size={16} />
        Logout
      </span>
    </button>
  );
}