"use client";

import { useEffect, useState } from "react";
import {
  CalendarDays,
  PackageCheck,
  ReceiptText,
  Tag,
} from "lucide-react";

import AccountSidebar from "@/components/dashboard/AccountSidebar";
import { supabase } from "@/lib/supabaseClient";

export default function OrdersPageContent() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: ordersData } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!ordersData) {
        setLoading(false);
        return;
      }

      const finalOrders = [];

      for (const order of ordersData) {
        const { data: items } = await supabase
          .from("order_items")
          .select("*")
          .eq("order_id", order.id);

        finalOrders.push({
          ...order,
          items: items || [],
        });
      }

      setOrders(finalOrders);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-20">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.92),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.88),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.42),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

      <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
      <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[280px_1fr]">
        <AccountSidebar />

        <div className="space-y-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/58 p-8 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl">
            <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#F7E7F2] blur-3xl" />

            <div className="relative flex items-start gap-4">
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
                  Track your Blumyn orders, product items, discounts, delivery
                  charges, and payment totals.
                </p>
              </div>
            </div>
          </div>

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
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_34px_90px_rgba(91,54,113,0.16)]"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F7E7F2] blur-2xl transition-all duration-500 group-hover:bg-[#E8D3F5]" />

                  <div className="relative mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                        <ReceiptText size={22} />
                      </div>

                      <div>
                        <p className="text-xl font-semibold text-[#553268]">
                          Order #{order.id}
                        </p>

                        <p className="mt-1 flex items-center gap-2 text-sm text-[#70537C]">
                          <CalendarDays size={15} />
                          {new Date(order.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <span className="w-fit rounded-full border border-[#D4B9E7] bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#6F3E8F]">
                      {order.status}
                    </span>
                  </div>

                  <div className="relative mb-5 space-y-3 rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-5">
                    {order.items.map((item: any) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 text-sm text-[#70537C]"
                      >
                        <span>
                          {item.product_name} × {item.quantity}
                        </span>

                        <span className="font-semibold text-[#553268]">
                          ₹{item.product_price * item.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="relative grid gap-4 rounded-[1.5rem] border border-[#E6D6F2] bg-white/70 p-5 text-sm text-[#70537C] md:grid-cols-2">
                    <p>
                      Subtotal:{" "}
                      <span className="font-semibold text-[#553268]">
                        ₹{order.subtotal}
                      </span>
                    </p>

                    {order.coupon_code && (
                      <p className="flex items-center gap-2">
                        <Tag size={15} />
                        Coupon:{" "}
                        <span className="font-semibold text-[#553268]">
                          {order.coupon_code}
                        </span>
                      </p>
                    )}

                    <p>
                      Discount:{" "}
                      <span className="font-semibold text-green-600">
                        -₹{order.discount}
                      </span>
                    </p>

                    <p>
                      Shipping:{" "}
                      <span className="font-semibold text-[#553268]">
                        ₹{order.shipping}
                      </span>
                    </p>

                    <p className="text-base font-semibold text-[#6F3E8F] md:col-span-2">
                      Total: ₹{order.total}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}