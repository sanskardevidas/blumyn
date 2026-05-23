"use client";

import { useEffect, useState } from "react";
import {
  BarChart3,
  IndianRupee,
  Mail,
  MapPin,
  PackageCheck,
  RefreshCcw,
  Sparkles,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type Order = {
  id: string;
  total: number;
  status: string;
  created_at: string;
};

export default function AdminDashboardContent() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [messagesCount, setMessagesCount] = useState(0);
  const [addressesCount, setAddressesCount] = useState(0);
  const [subscriptionsCount, setSubscriptionsCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);

      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("id,total,status,created_at")
        .order("created_at", { ascending: false });

      if (ordersError) {
        console.error("Admin orders fetch error:", ordersError);
      }

      const { count: messagesTotal } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true });

      const { count: addressesTotal } = await supabase
        .from("addresses")
        .select("*", { count: "exact", head: true });

      const { count: subscriptionsTotal } = await supabase
        .from("subscriptions")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

      setOrders((ordersData || []) as Order[]);
      setMessagesCount(messagesTotal || 0);
      setAddressesCount(addressesTotal || 0);
      setSubscriptionsCount(subscriptionsTotal || 0);
      setLoading(false);
    };

    fetchAdminData();
  }, []);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total || 0),
    0
  );

  const recentOrders = orders.slice(0, 3);

  const stats = [
    {
      label: "Total Orders",
      value: loading ? "..." : orders.length,
      icon: PackageCheck,
    },
    {
      label: "Active Subscriptions",
      value: loading ? "..." : subscriptionsCount,
      icon: RefreshCcw,
    },
    {
      label: "Saved Addresses",
      value: loading ? "..." : addressesCount,
      icon: MapPin,
    },
    {
      label: "Revenue",
      value: loading ? "..." : `₹${totalRevenue}`,
      icon: IndianRupee,
    },
  ];

  return (
    <section className="relative overflow-hidden">
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
                Here’s a real-time view of orders, subscriptions, customers, and
                revenue from Supabase.
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
                className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl"
              >
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
            <div className="relative mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                <PackageCheck size={22} />
              </div>

              <h2 className="text-2xl text-[#553268]">Recent Orders</h2>
            </div>

            {loading ? (
              <div className="rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-4 text-sm text-[#70537C]">
                Loading orders...
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-4 text-sm text-[#70537C]">
                No orders found in Supabase.
              </div>
            ) : (
              <div className="space-y-4">
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
            <div className="relative mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                <Sparkles size={22} />
              </div>

              <h2 className="text-2xl text-[#553268]">Quick Summary</h2>
            </div>

            <div className="space-y-3 rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-5 text-sm leading-7 text-[#70537C]">
              <p>Total Orders: {orders.length}</p>
              <p>Active Subscriptions: {subscriptionsCount}</p>
              <p>Total Messages: {messagesCount}</p>
              <p>Total Revenue: ₹{totalRevenue}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}