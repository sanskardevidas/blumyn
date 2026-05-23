"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Eye,
  MapPin,
  PackageCheck,
  Phone,
  ReceiptText,
  RefreshCcw,
  Search,
  Tag,
  Truck,
  User,
  X,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { supabase } from "@/lib/supabaseClient";

type AdminOrderItem = {
  id: string;
  order_id: string;
  product_id: string | null;
  product_name: string;
  product_price: number;
  quantity: number;
  size: string | null;
};

type AdminAddress = {
  id: string;
  full_name: string;
  phone: string;
  address_line_1: string;
  address_line_2: string | null;
  city: string;
  state: string;
  pincode: string;
  landmark: string | null;
};

type AdminProfile = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
};

type AdminOrder = {
  id: string;
  user_id: string | null;
  address_id: string | null;
  created_at: string;
  status: string;
  subtotal: number;
  discount: number;
  total: number;
  coupon_code: string | null;
  coupon_type: string | null;
  coupon_value: number | null;
  coupon_discount_amount: number | null;
  items: AdminOrderItem[];
  address: AdminAddress | null;
  profile: AdminProfile | null;
};

const orderStatuses = [
  "pending",
  "confirmed",
  "packed",
  "shipped",
  "out_for_delivery",
  "delivered",
  "cancelled",
];

const statusLabels: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  packed: "Packed",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const statusStyles: Record<string, string> = {
  pending: "border-yellow-200 bg-yellow-50 text-yellow-700",
  confirmed: "border-blue-200 bg-blue-50 text-blue-700",
  packed: "border-purple-200 bg-purple-50 text-purple-700",
  shipped: "border-indigo-200 bg-indigo-50 text-indigo-700",
  out_for_delivery: "border-orange-200 bg-orange-50 text-orange-700",
  delivered: "border-green-200 bg-green-50 text-green-700",
  cancelled: "border-red-200 bg-red-50 text-red-700",
};

export default function AdminOrdersContent() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [error, setError] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setError("");

    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      const { data: orderItemsData, error: orderItemsError } = await supabase
        .from("order_items")
        .select("*");

      if (orderItemsError) throw orderItemsError;

      const { data: addressesData, error: addressesError } = await supabase
        .from("addresses")
        .select("*");

      if (addressesError) throw addressesError;

      const { data: profilesData, error: profilesError } = await supabase
        .from("profiles")
        .select("*");

      if (profilesError) throw profilesError;

      const mergedOrders: AdminOrder[] = (ordersData || []).map((order) => {
        const orderItems = (orderItemsData || []).filter(
          (item) => item.order_id === order.id
        );

        const address =
          (addressesData || []).find((addr) => addr.id === order.address_id) ||
          null;

        const profile =
          (profilesData || []).find((profile) => profile.id === order.user_id) ||
          null;

        return {
          id: order.id,
          user_id: order.user_id ?? null,
          address_id: order.address_id ?? null,
          created_at: order.created_at,
          status: order.status ?? "pending",
          subtotal: Number(order.subtotal ?? 0),
          discount: Number(order.discount ?? 0),
          total: Number(order.total ?? 0),
          coupon_code: order.coupon_code ?? null,
          coupon_type: order.coupon_type ?? null,
          coupon_value:
            order.coupon_value !== null && order.coupon_value !== undefined
              ? Number(order.coupon_value)
              : null,
          coupon_discount_amount:
            order.coupon_discount_amount !== null &&
            order.coupon_discount_amount !== undefined
              ? Number(order.coupon_discount_amount)
              : null,
          items: orderItems as AdminOrderItem[],
          address: address as AdminAddress | null,
          profile: profile as AdminProfile | null,
        };
      });

      setOrders(mergedOrders);
    } catch (err: any) {
      console.error("Admin orders fetch error:", err);
      setError(err?.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId: string, status: string) => {
    setUpdatingOrderId(orderId);

    const { error } = await supabase
      .from("orders")
      .update({
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    if (error) {
      alert(error.message);
      setUpdatingOrderId("");
      return;
    }

    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId
          ? {
              ...order,
              status,
            }
          : order
      )
    );

    setSelectedOrder((prev) =>
      prev && prev.id === orderId
        ? {
            ...prev,
            status,
          }
        : prev
    );

    setUpdatingOrderId("");
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const searchText = search.toLowerCase().trim();

      const customerName =
        order.profile?.full_name || order.address?.full_name || "";
      const customerPhone = order.profile?.phone || order.address?.phone || "";
      const customerEmail = order.profile?.email || "";

      const matchesSearch =
        !searchText ||
        order.id.toLowerCase().includes(searchText) ||
        customerName.toLowerCase().includes(searchText) ||
        customerPhone.toLowerCase().includes(searchText) ||
        customerEmail.toLowerCase().includes(searchText);

      const matchesStatus =
        selectedStatus === "all" || order.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, selectedStatus]);

  const stats = {
    total: orders.length,
    pending: orders.filter((order) => order.status === "pending").length,
    shipped: orders.filter((order) => order.status === "shipped").length,
    delivered: orders.filter((order) => order.status === "delivered").length,
    revenue: orders
      .filter((order) => order.status !== "cancelled")
      .reduce((sum, order) => sum + Number(order.total || 0), 0),
  };

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-20">
        <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.92),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.88),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.42),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[280px_1fr]">
          <AdminSidebar />

          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/58 p-8 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl">
              <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                    <PackageCheck size={26} />
                  </div>

                  <div>
                    <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E]">
                      Admin Panel
                    </p>

                    <h1 className="text-4xl leading-tight text-[#553268]">
                      Orders Management
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-7 text-[#70537C]">
                      Track new orders, customer details, delivery address,
                      order items, coupon usage, totals, and fulfillment status.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={fetchOrders}
                  className="flex w-fit items-center gap-2 rounded-full border border-[#E6D6F2] bg-white/80 px-5 py-3 text-sm font-semibold text-[#6F3E8F]"
                >
                  <RefreshCcw size={16} />
                  Refresh
                </button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-5">
              <div className="rounded-[1.5rem] border border-white/70 bg-white/70 p-5 shadow-[0_20px_60px_rgba(91,54,113,0.08)]">
                <p className="text-sm text-[#70537C]">Total Orders</p>
                <h3 className="mt-2 text-3xl font-semibold text-[#553268]">
                  {stats.total}
                </h3>
              </div>

              <div className="rounded-[1.5rem] border border-yellow-200 bg-yellow-50 p-5">
                <p className="text-sm text-yellow-700">Pending</p>
                <h3 className="mt-2 text-3xl font-semibold text-yellow-700">
                  {stats.pending}
                </h3>
              </div>

              <div className="rounded-[1.5rem] border border-indigo-200 bg-indigo-50 p-5">
                <p className="text-sm text-indigo-700">Shipped</p>
                <h3 className="mt-2 text-3xl font-semibold text-indigo-700">
                  {stats.shipped}
                </h3>
              </div>

              <div className="rounded-[1.5rem] border border-green-200 bg-green-50 p-5">
                <p className="text-sm text-green-700">Delivered</p>
                <h3 className="mt-2 text-3xl font-semibold text-green-700">
                  {stats.delivered}
                </h3>
              </div>

              <div className="rounded-[1.5rem] border border-white/70 bg-white/70 p-5 shadow-[0_20px_60px_rgba(91,54,113,0.08)]">
                <p className="text-sm text-[#70537C]">Revenue</p>
                <h3 className="mt-2 text-3xl font-semibold text-[#553268]">
                  ₹{stats.revenue}
                </h3>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/70 bg-white/68 p-5 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl">
              <div className="grid gap-4 md:grid-cols-[1fr_240px]">
                <div className="relative">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#70537C]"
                  />

                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by order id, customer, phone, email..."
                    className="h-13 w-full rounded-full border border-[#E6D6F2] bg-white/80 py-3 pl-12 pr-5 text-sm text-[#70537C] outline-none"
                  />
                </div>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="h-13 rounded-full border border-[#E6D6F2] bg-white/80 px-5 py-3 text-sm font-semibold text-[#70537C] outline-none"
                >
                  <option value="all">All Orders</option>
                  {orderStatuses.map((status) => (
                    <option key={status} value={status}>
                      {statusLabels[status]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div className="rounded-[2rem] border border-red-200 bg-red-50 p-6 text-sm text-red-600">
                {error}
              </div>
            )}

            {loading ? (
              <div className="rounded-[2rem] border border-white/70 bg-white/68 p-6 text-sm text-[#70537C] shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl">
                Loading orders...
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="rounded-[2rem] border border-white/70 bg-white/68 p-6 text-sm text-[#70537C] shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl">
                No orders found. Place a new test order from checkout and then
                refresh this page.
              </div>
            ) : (
              <div className="space-y-5">
                {filteredOrders.map((order) => {
                  const customerName =
                    order.profile?.full_name ||
                    order.address?.full_name ||
                    "Customer";

                  const customerPhone =
                    order.profile?.phone || order.address?.phone || "N/A";

                  const customerEmail = order.profile?.email || "N/A";

                  return (
                    <div
                      key={order.id}
                      className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white"
                    >
                      <div className="relative mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                            <ReceiptText size={22} />
                          </div>

                          <div>
                            <p className="text-xl font-semibold text-[#553268]">
                              Order #{order.id.slice(0, 8)}
                            </p>

                            <p className="mt-1 flex items-center gap-2 text-sm text-[#70537C]">
                              <CalendarDays size={15} />
                              {new Date(order.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          <span
                            className={`w-fit rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                              statusStyles[order.status] ||
                              "border-[#D4B9E7] bg-white/70 text-[#6F3E8F]"
                            }`}
                          >
                            {statusLabels[order.status] || order.status}
                          </span>

                          <select
                            value={order.status}
                            disabled={updatingOrderId === order.id}
                            onChange={(e) =>
                              updateOrderStatus(order.id, e.target.value)
                            }
                            className="rounded-full border border-[#E6D6F2] bg-white px-4 py-2 text-xs font-semibold text-[#6F3E8F] outline-none"
                          >
                            {orderStatuses.map((status) => (
                              <option key={status} value={status}>
                                {statusLabels[status]}
                              </option>
                            ))}
                          </select>

                          <button
                            type="button"
                            onClick={() => setSelectedOrder(order)}
                            className="flex items-center gap-2 rounded-full bg-[#6F3E8F] px-4 py-2 text-xs font-semibold text-white"
                          >
                            <Eye size={15} />
                            View
                          </button>
                        </div>
                      </div>

                      <div className="mb-5 grid gap-4 md:grid-cols-3">
                        <div className="rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-4">
                          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#553268]">
                            <User size={15} />
                            Customer
                          </p>
                          <p className="text-sm text-[#70537C]">
                            {customerName}
                          </p>
                          <p className="text-sm text-[#70537C]">
                            {customerEmail}
                          </p>
                          <p className="text-sm text-[#70537C]">
                            {customerPhone}
                          </p>
                        </div>

                        <div className="rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-4 md:col-span-2">
                          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#553268]">
                            <MapPin size={15} />
                            Delivery Address
                          </p>

                          {order.address ? (
                            <p className="text-sm leading-7 text-[#70537C]">
                              {order.address.address_line_1},{" "}
                              {order.address.address_line_2
                                ? `${order.address.address_line_2}, `
                                : ""}
                              {order.address.city}, {order.address.state} -{" "}
                              {order.address.pincode}
                              {order.address.landmark
                                ? `, Landmark: ${order.address.landmark}`
                                : ""}
                            </p>
                          ) : (
                            <p className="text-sm text-[#70537C]">
                              Address not available
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="relative mb-5 space-y-3 rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-5">
                        {order.items.length > 0 ? (
                          order.items.map((item) => (
                            <div
                              key={`${order.id}-${item.id}`}
                              className="flex items-center justify-between gap-4 text-sm text-[#70537C]"
                            >
                              <span>
                                {item.product_name} × {item.quantity}
                                {item.size ? ` · ${item.size}` : ""}
                              </span>

                              <span className="font-semibold text-[#553268]">
                                ₹{Number(item.product_price) * item.quantity}
                              </span>
                            </div>
                          ))
                        ) : (
                          <p className="text-sm text-[#70537C]">
                            No order items found.
                          </p>
                        )}
                      </div>

                      <div className="relative grid gap-4 rounded-[1.5rem] border border-[#E6D6F2] bg-white/70 p-5 text-sm text-[#70537C] md:grid-cols-2">
                        <p>
                          Subtotal:{" "}
                          <span className="font-semibold text-[#553268]">
                            ₹{order.subtotal}
                          </span>
                        </p>

                        <p>
                          Shipping:{" "}
                          <span className="font-semibold text-[#553268]">
                            ₹50
                          </span>
                        </p>

                        {order.coupon_code ? (
                          <>
                            <p className="flex items-center gap-2">
                              <Tag size={15} />
                              Coupon:{" "}
                              <span className="font-semibold text-[#553268]">
                                {order.coupon_code}
                              </span>
                            </p>

                            <p>
                              Discount:{" "}
                              <span className="font-semibold text-green-600">
                                -₹{order.coupon_discount_amount ?? 0}
                              </span>
                            </p>
                          </>
                        ) : (
                          <p>No coupon used</p>
                        )}

                        <p className="text-base font-semibold text-[#6F3E8F] md:text-right">
                          Final Total: ₹{order.total}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2B1E35]/60 px-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[2rem] border border-white/70 bg-white p-6 shadow-[0_35px_100px_rgba(43,30,53,0.25)]">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E]">
                  Order Details
                </p>
                <h2 className="text-3xl text-[#553268]">
                  #{selectedOrder.id}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-full border border-[#E6D6F2] p-2 text-[#6F3E8F]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6 grid gap-4 md:grid-cols-2">
              {orderStatuses.map((status, index) => {
                const currentIndex = orderStatuses.indexOf(
                  selectedOrder.status
                );
                const active = index <= currentIndex;

                return (
                  <div
                    key={status}
                    className={`flex items-center gap-3 rounded-2xl border p-4 ${
                      active
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-[#E6D6F2] bg-[#FFF8FC] text-[#70537C]"
                    }`}
                  >
                    {active ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <Clock size={18} />
                    )}
                    <span className="text-sm font-semibold">
                      {statusLabels[status]}
                    </span>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() =>
                updateOrderStatus(selectedOrder.id, "delivered")
              }
              className="mb-4 flex w-full items-center justify-center gap-2 rounded-full bg-green-600 px-5 py-3 text-sm font-semibold text-white"
            >
              <CheckCircle2 size={18} />
              Mark as Delivered
            </button>

            <button
              type="button"
              onClick={() => updateOrderStatus(selectedOrder.id, "shipped")}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[#6F3E8F] px-5 py-3 text-sm font-semibold text-white"
            >
              <Truck size={18} />
              Mark as Shipped
            </button>
          </div>
        </div>
      )}
    </>
  );
}