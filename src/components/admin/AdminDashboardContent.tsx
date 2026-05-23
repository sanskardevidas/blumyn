"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  BarChart3,
  Clock,
  IndianRupee,
  Mail,
  MapPin,
  PackageCheck,
  RefreshCcw,
  ShoppingBag,
  Sparkles,
  Truck,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

type AdminOrder = {
  id: string;
  total: number;
  subtotal: number;
  discount: number;
  status: string;
  created_at: string;
  coupon_code: string | null;
  user_id: string | null;
  address_id: string | null;
};

type AdminProfile = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
};

type AdminAddress = {
  id: string;
  full_name: string;
  phone: string;
  city: string;
  state: string;
  pincode: string;
};

type DashboardOrder = AdminOrder & {
  profile: AdminProfile | null;
  address: AdminAddress | null;
};

const statusLabel: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  packed: "Packed",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const statusClass: Record<string, string> = {
  pending: "border-yellow-200 bg-yellow-50 text-yellow-700",
  confirmed: "border-blue-200 bg-blue-50 text-blue-700",
  packed: "border-purple-200 bg-purple-50 text-purple-700",
  shipped: "border-indigo-200 bg-indigo-50 text-indigo-700",
  out_for_delivery: "border-orange-200 bg-orange-50 text-orange-700",
  delivered: "border-green-200 bg-green-50 text-green-700",
  cancelled: "border-red-200 bg-red-50 text-red-700",
};

export default function AdminDashboardContent() {
  const [orders, setOrders] = useState<DashboardOrder[]>([]);
  const [messagesCount, setMessagesCount] = useState(0);
  const [addressesCount, setAddressesCount] = useState(0);
  const [subscriptionsCount, setSubscriptionsCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [customersCount, setCustomersCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchAdminData = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select(
          "id,total,subtotal,discount,status,created_at,coupon_code,user_id,address_id"
        )
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("id,full_name,email,phone");

      if (profilesError) throw profilesError;

      const { data: addressesData, error: addressesError } = await supabase
        .from("addresses")
        .select("id,full_name,phone,city,state,pincode");

      if (addressesError) throw addressesError;

      const { count: messagesTotal } = await supabase
        .from("messages")
        .select("*", { count: "exact", head: true });

      const { count: subscriptionsTotal } = await supabase
        .from("subscriptions")
        .select("*", { count: "exact", head: true })
        .eq("status", "active");

      const { count: productsTotal } = await supabase
        .from("products")
        .select("*", { count: "exact", head: true });

      const mergedOrders: DashboardOrder[] = (ordersData || []).map(
        (order: any) => {
          const profile =
            (profilesData || []).find((item: any) => item.id === order.user_id) ||
            null;

          const address =
            (addressesData || []).find(
              (item: any) => item.id === order.address_id
            ) || null;

          return {
            id: order.id,
            total: Number(order.total || 0),
            subtotal: Number(order.subtotal || 0),
            discount: Number(order.discount || 0),
            status: order.status || "pending",
            created_at: order.created_at,
            coupon_code: order.coupon_code || null,
            user_id: order.user_id || null,
            address_id: order.address_id || null,
            profile,
            address,
          };
        }
      );

      setOrders(mergedOrders);
      setMessagesCount(messagesTotal || 0);
      setSubscriptionsCount(subscriptionsTotal || 0);
      setProductsCount(productsTotal || 0);
      setAddressesCount((addressesData || []).length);
      setCustomersCount((profilesData || []).length);
    } catch (error: any) {
      console.error("Admin dashboard fetch error:", error);
      setErrorMsg(error?.message || "Failed to load admin dashboard data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const dashboardData = useMemo(() => {
    const validOrders = orders.filter((order) => order.status !== "cancelled");

    const totalRevenue = validOrders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

    const pendingOrders = orders.filter(
      (order) => order.status === "pending"
    ).length;

    const shippedOrders = orders.filter(
      (order) =>
        order.status === "shipped" || order.status === "out_for_delivery"
    ).length;

    const deliveredOrders = orders.filter(
      (order) => order.status === "delivered"
    ).length;

    const recentOrders = orders.slice(0, 5);

    return {
      totalRevenue,
      pendingOrders,
      shippedOrders,
      deliveredOrders,
      recentOrders,
    };
  }, [orders]);

  const stats = [
    {
      label: "Total Orders",
      value: loading ? "..." : orders.length,
      icon: PackageCheck,
      href: "/admin/orders",
    },
    {
      label: "Pending Orders",
      value: loading ? "..." : dashboardData.pendingOrders,
      icon: Clock,
      href: "/admin/orders",
    },
    {
      label: "Shipped Orders",
      value: loading ? "..." : dashboardData.shippedOrders,
      icon: Truck,
      href: "/admin/orders",
    },
    {
      label: "Revenue",
      value: loading ? "..." : `₹${dashboardData.totalRevenue}`,
      icon: IndianRupee,
      href: "/admin/analytics",
    },
    {
      label: "Active Subscriptions",
      value: loading ? "..." : subscriptionsCount,
      icon: RefreshCcw,
      href: "/admin/subscriptions",
    },
    {
      label: "Products",
      value: loading ? "..." : productsCount,
      icon: ShoppingBag,
      href: "/admin/products",
    },
    {
      label: "Customers",
      value: loading ? "..." : customersCount,
      icon: MapPin,
      href: "/admin/users",
    },
    {
      label: "Messages",
      value: loading ? "..." : messagesCount,
      icon: Mail,
      href: "/admin/messages",
    },
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="space-y-8">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/58 p-8 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl">
          <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#F7E7F2] blur-3xl" />

          <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div className="flex items-start gap-4">
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
                  Real-time business control panel for orders, revenue,
                  subscriptions, products, customers, and fulfillment.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={fetchAdminData}
              className="flex w-fit items-center gap-2 rounded-full border border-[#E6D6F2] bg-white/80 px-5 py-3 text-sm font-semibold text-[#6F3E8F]"
            >
              <RefreshCcw size={16} />
              Refresh
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="flex items-start gap-3 rounded-[2rem] border border-red-200 bg-red-50 p-5 text-sm text-red-600">
            <AlertCircle size={18} />
            <p>{errorMsg}</p>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <Link
                key={stat.label}
                href={stat.href}
                className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white"
              >
                <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#F7E7F2] opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

                <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                  <Icon size={22} />
                </div>

                <p className="relative mb-2 text-sm text-[#70537C]">
                  {stat.label}
                </p>

                <h3 className="relative text-3xl font-semibold text-[#553268]">
                  {stat.value}
                </h3>
              </Link>
            );
          })}
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl">
            <div className="relative mb-5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                  <PackageCheck size={22} />
                </div>

                <h2 className="text-2xl text-[#553268]">New / Recent Orders</h2>
              </div>

              <Link
                href="/admin/orders"
                className="rounded-full border border-[#E6D6F2] bg-white/80 px-4 py-2 text-xs font-semibold text-[#6F3E8F]"
              >
                Manage Orders
              </Link>
            </div>

            {loading ? (
              <div className="rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-4 text-sm text-[#70537C]">
                Loading orders...
              </div>
            ) : dashboardData.recentOrders.length === 0 ? (
              <div className="rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-4 text-sm text-[#70537C]">
                No Supabase orders found. Place a new checkout order and then
                refresh this dashboard.
              </div>
            ) : (
              <div className="space-y-4">
                {dashboardData.recentOrders.map((order) => {
                  const customerName =
                    order.profile?.full_name ||
                    order.address?.full_name ||
                    "Customer";

                  const customerPhone =
                    order.profile?.phone || order.address?.phone || "N/A";

                  return (
                    <div
                      key={order.id}
                      className="rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-4"
                    >
                      <div className="mb-3 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                        <div>
                          <p className="font-semibold text-[#553268]">
                            Order #{order.id.slice(0, 8)}
                          </p>

                          <p className="mt-1 text-sm text-[#70537C]">
                            {customerName} · {customerPhone}
                          </p>

                          <p className="mt-1 text-xs text-[#70537C]">
                            {new Date(order.created_at).toLocaleString()}
                          </p>
                        </div>

                        <span
                          className={`w-fit rounded-full border px-3 py-1.5 text-xs font-semibold ${
                            statusClass[order.status] ||
                            "border-[#E6D6F2] bg-white text-[#6F3E8F]"
                          }`}
                        >
                          {statusLabel[order.status] || order.status}
                        </span>
                      </div>

                      <div className="flex items-center justify-between border-t border-[#E6D6F2] pt-3 text-sm">
                        <span className="text-[#70537C]">
                          Coupon: {order.coupon_code || "None"}
                        </span>

                        <span className="font-semibold text-[#553268]">
                          ₹{order.total}
                        </span>
                      </div>
                    </div>
                  );
                })}
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
              <p>Pending Orders: {dashboardData.pendingOrders}</p>
              <p>Shipped / Out for Delivery: {dashboardData.shippedOrders}</p>
              <p>Delivered Orders: {dashboardData.deliveredOrders}</p>
              <p>Active Subscriptions: {subscriptionsCount}</p>
              <p>Total Messages: {messagesCount}</p>
              <p>Total Revenue: ₹{dashboardData.totalRevenue}</p>
            </div>

            <div className="mt-5 grid gap-3">
              <Link
                href="/admin/orders"
                className="rounded-full bg-[#6F3E8F] px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Open Orders
              </Link>

              <Link
                href="/admin/products"
                className="rounded-full border border-[#E6D6F2] bg-white/80 px-5 py-3 text-center text-sm font-semibold text-[#6F3E8F]"
              >
                Manage Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}