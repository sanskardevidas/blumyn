"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MapPin,
  PackageCheck,
  RefreshCcw,
  Sparkles,
  UserRound,
} from "lucide-react";

const links = [
  {
    label: "Dashboard",
    href: "/account",
    icon: LayoutDashboard,
  },
  {
    label: "My Orders",
    href: "/account/orders",
    icon: PackageCheck,
  },
  {
    label: "My Subscription",
    href: "/account/subscription",
    icon: RefreshCcw,
  },
  {
    label: "Saved Addresses",
    href: "/account/addresses",
    icon: MapPin,
  },
  {
    label: "Profile",
    href: "/account/profile",
    icon: UserRound,
  },
];

export default function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="relative h-fit overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/58 p-5 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl">
      <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#F7E7F2] blur-3xl" />
      <div className="absolute -left-10 bottom-0 h-28 w-28 rounded-full bg-[#FFEAC7]/40 blur-3xl" />

      <div className="relative mb-8 overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 p-5 shadow-[0_18px_50px_rgba(91,54,113,0.08)] backdrop-blur-xl">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <Sparkles size={26} />
        </div>

        <h2 className="text-2xl font-semibold text-[#553268]">
          My Account
        </h2>

        <p className="mt-3 text-sm leading-7 text-[#70537C]">
          Manage your comfort, orders, addresses, and subscription in one
          beautiful place.
        </p>
      </div>

      <nav className="relative space-y-2">
        {links.map((link) => {
          const Icon = link.icon;

          const isActive =
            pathname === link.href ||
            (link.href !== "/account" &&
              pathname.startsWith(link.href));

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative flex items-center gap-3 overflow-hidden rounded-[1.3rem] px-4 py-3.5 text-sm font-semibold transition-all duration-300 ${
                isActive
                  ? "bg-[#6F3E8F] text-white shadow-[0_18px_45px_rgba(111,62,143,0.22)]"
                  : "bg-white/55 text-[#70537C] hover:-translate-y-0.5 hover:bg-white hover:text-[#553268] hover:shadow-[0_16px_40px_rgba(91,54,113,0.10)]"
              }`}
            >
              {!isActive && (
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#F7E7F2] blur-2xl" />
                </div>
              )}

              <div
                className={`relative flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-white/18 text-white"
                    : "bg-[#F7E7F2] text-[#6F3E8F]"
                }`}
              >
                <Icon size={18} />
              </div>

              <span className="relative">{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}