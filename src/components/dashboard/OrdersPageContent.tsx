"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  PackageCheck,
  ReceiptText,
  Tag,
  Truck,
} from "lucide-react";

import AccountSidebar from "@/components/dashboard/AccountSidebar";
import { supabase } from "@/lib/supabaseClient";

type OrderItem = {
  id: string;
  order_id: string;
  product_name: string;
  product_price: number;
  quantity: number;
  size: string | null;
};

type Address = {
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

type UserOrder = {
  id: string;
  created_at: string;
  status: string;
  subtotal: number;
  discount: number;
  total: number;
  coupon_code: string | null;
  coupon_type: string | null;
  coupon_value: number | null;
  coupon_discount_amount: number | null;
  address: Address | null;
  items: OrderItem[];
};

const statusLabels: Record<string, string> = {
  pending: "Processing",
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

const progressSteps = [
  "pending",
  "confirmed",
  "packed",
  "shipped",
  "out_for_delivery",
  "delivered",
];

export default function OrdersPageContent() {
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (ordersError) throw ordersError;

      if (!ordersData || ordersData.length === 0) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const orderIds = ordersData.map((order) => order.id);
      const addressIds = ordersData
        .map((order) => order.address_id)
        .filter(Boolean);

      const { data: orderItemsData, error: itemsError } = await supabase
        .from("order_items")
        .select("*")
        .in("order_id", orderIds);

      if (itemsError) throw itemsError;

      let addressesData: Address[] = [];

      if (addressIds.length > 0) {
        const { data, error } = await supabase
          .from("addresses")
          .select("*")
          .in("id", addressIds);

        if (error) throw error;
        addressesData = (data || []) as Address[];
      }

      const mergedOrders: UserOrder[] = ordersData.map((order) => ({
        id: order.id,
        created_at: order.created_at,
        status: order.status || "pending",
        subtotal: Number(order.subtotal || 0),
        discount: Number(order.discount || 0),
        total: Number(order.total || 0),
        coupon_code: order.coupon_code || null,
        coupon_type: order.coupon_type || null,
        coupon_value:
          order.coupon_value !== null && order.coupon_value !== undefined
            ? Number(order.coupon_value)
            : null,
        coupon_discount_amount:
          order.coupon_discount_amount !== null &&
          order.coupon_discount_amount !== undefined
            ? Number(order.coupon_discount_amount)
            : null,
        address:
          addressesData.find((address) => address.id === order.address_id) ||
          null,
        items: ((orderItemsData || []) as OrderItem[]).filter(
          (item) => item.order_id === order.id
        ),
      }));

      setOrders(mergedOrders);
    } catch (error: any) {
      console.error("User orders fetch error:", error);
      setErrorMsg(error?.message || "Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-20">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.92),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.88),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.42),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[280px_1fr]">
        <AccountSidebar />

        <div className="space-y-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/58 p-8 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl">
            <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                  <PackageCheck size={26} />
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E]">
                    My Account
                  </p>

                  <h1 className="text-4xl leading-tight text-[#553268]">
                    My Orders
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#70537C]">
                    Track your real Supabase orders and delivery status updated
                    by admin.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={fetchOrders}
                className="w-fit rounded-full border border-[#E6D6F2] bg-white/80 px-5 py-3 text-sm font-semibold text-[#6F3E8F]"
              >
                Refresh Orders
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="rounded-[2rem] border border-red-200 bg-red-50 p-5 text-sm text-red-600">
              {errorMsg}
            </div>
          )}

          {loading ? (
            <div className="rounded-[2rem] border border-white/70 bg-white/68 p-6 text-sm text-[#70537C] shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl">
              Loading orders...
            </div>
          ) : orders.length === 0 ? (
            <div className="rounded-[2rem] border border-white/70 bg-white/68 p-6 text-sm text-[#70537C] shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl">
              No orders yet.
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => {
                const currentStepIndex = progressSteps.indexOf(order.status);

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

                      <span
                        className={`w-fit rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                          statusStyles[order.status] ||
                          "border-[#D4B9E7] bg-white/70 text-[#6F3E8F]"
                        }`}
                      >
                        {statusLabels[order.status] || order.status}
                      </span>
                    </div>

                    <div className="mb-5 grid gap-3 md:grid-cols-3">
                      {progressSteps.map((step, index) => {
                        const active =
                          order.status === "cancelled"
                            ? false
                            : index <= currentStepIndex;

                        return (
                          <div
                            key={step}
                            className={`flex items-center gap-2 rounded-2xl border px-4 py-3 text-xs font-semibold ${
                              active
                                ? "border-green-200 bg-green-50 text-green-700"
                                : "border-[#E6D6F2] bg-[#FFF8FC] text-[#70537C]"
                            }`}
                          >
                            {active ? (
                              <Truck size={15} />
                            ) : (
                              <Clock size={15} />
                            )}
                            {statusLabels[step]}
                          </div>
                        );
                      })}
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
                          No items found.
                        </p>
                      )}
                    </div>

                    {order.address && (
                      <div className="mb-5 rounded-[1.5rem] border border-[#E6D6F2] bg-white/70 p-5">
                        <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#553268]">
                          <MapPin size={15} />
                          Delivery Address
                        </p>

                        <p className="text-sm leading-7 text-[#70537C]">
                          {order.address.full_name}, {order.address.phone}
                          <br />
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
                      </div>
                    )}

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
  );
}