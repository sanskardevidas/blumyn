"use client";

import {
  BarChart3,
  IndianRupee,
  Mail,
  MapPin,
  PackageCheck,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useOrders } from "@/context/OrderContext";
import { useSubscriptions } from "@/context/SubscriptionContext";
import { useMessages } from "@/context/MessageContext";
import { useAddresses } from "@/context/AddressContext";

export default function AdminDashboardContent() {
  const { orders } = useOrders();
  const { subscriptions } = useSubscriptions();
  const { messages } = useMessages();
  const { addresses } = useAddresses();

  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === "Active"
  ).length;

  const monthlyRevenue = orders.reduce((sum, order) => sum + order.total, 0);

  const recentOrders = orders.slice(0, 3);

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: PackageCheck,
    },
    {
      label: "Active Subscriptions",
      value: activeSubscriptions,
      icon: RefreshCcw,
    },
    {
      label: "Saved Addresses",
      value: addresses.length,
      icon: MapPin,
    },
    {
      label: "Revenue",
      value: `₹${monthlyRevenue}`,
      icon: IndianRupee,
    },
  ];

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-20">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.92),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.88),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.42),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

      <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
      <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[280px_1fr]">
        <AdminSidebar />

        <div className="space-y-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/58 p-8 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl">
            <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#F7E7F2] blur-3xl" />

            <div className="relative flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                <BarChart3 size={26} />
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E]">
                  Dashboard Overview
                </p>

                <h1 className="mb-4 text-4xl leading-tight text-[#553268]">
                  Welcome, Admin
                </h1>

                <p className="max-w-2xl text-sm leading-7 text-[#70537C] md:text-base">
                  Here’s a quick view of orders, subscriptions, customers, and
                  platform activity across the Blumyn system.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_34px_90px_rgba(91,54,113,0.16)]"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F7E7F2] blur-2xl transition-all duration-500 group-hover:bg-[#E8D3F5]" />

                  <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                    <Icon size={22} />
                  </div>

                  <p className="relative mb-2 text-sm text-[#70537C]">
                    {stat.label}
                  </p>

                  <h3 className="relative text-3xl font-semibold text-[#553268]">
                    {stat.value}
                  </h3>
                </div>
              );
            })}
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F7E7F2] blur-2xl" />

              <div className="relative mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                  <PackageCheck size={22} />
                </div>

                <h2 className="text-2xl text-[#553268]">Recent Orders</h2>
              </div>

              {recentOrders.length === 0 ? (
                <div className="relative rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-4 text-sm text-[#70537C]">
                  No orders yet.
                </div>
              ) : (
                <div className="relative space-y-4">
                  {recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-4"
                    >
                      <p className="font-semibold text-[#553268]">
                        Order #{order.id}
                      </p>

                      <p className="text-sm text-[#70537C]">
                        {order.status} · ₹{order.total}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl">
              <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F7E7F2] blur-2xl" />

              <div className="relative mb-5 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                  <Sparkles size={22} />
                </div>

                <h2 className="text-2xl text-[#553268]">Quick Summary</h2>
              </div>

              <div className="relative space-y-3 rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-5 text-sm leading-7 text-[#70537C]">
                <p>Total Orders: {orders.length}</p>
                <p>Active Subscriptions: {activeSubscriptions}</p>
                <p>Total Messages: {messages.length}</p>
                <p>Total Revenue: ₹{monthlyRevenue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}