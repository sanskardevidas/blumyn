"use client";

import { useState } from "react";
import {
  BadgePercent,
  Plus,
  Trash2,
  TicketPercent,
  X,
} from "lucide-react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useCoupons } from "@/context/CouponContext";

export default function AdminCouponsContent() {
  const { coupons, addCoupon, deleteCoupon, clearCoupons } = useCoupons();

  const [code, setCode] = useState("");
  const [type, setType] = useState<"percentage" | "flat">("percentage");
  const [value, setValue] = useState("");
  const [active, setActive] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addCoupon({
      code,
      type,
      value: Number(value),
      active,
    });

    setCode("");
    setType("percentage");
    setValue("");
    setActive(true);
    setShowForm(false);
  };

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

            <div className="relative flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                  <TicketPercent size={26} />
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E]">
                    Admin Panel
                  </p>

                  <h1 className="text-4xl leading-tight text-[#553268]">
                    Coupons
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#70537C]">
                    Create, manage, activate, and remove discount coupons for
                    Blumyn orders.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm((prev) => !prev)}
                  className="flex items-center gap-2 rounded-full bg-[#6F3E8F] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
                >
                  {showForm ? <X size={17} /> : <Plus size={17} />}
                  {showForm ? "Close Form" : "Add Coupon"}
                </button>

                {coupons.length > 0 && (
                  <button
                    type="button"
                    onClick={clearCoupons}
                    className="flex items-center gap-2 rounded-full border border-[#D4B9E7] bg-white/70 px-5 py-3 text-sm font-semibold text-[#6F3E8F] transition-all duration-300 hover:-translate-y-1 hover:border-[#6F3E8F] hover:bg-[#6F3E8F] hover:text-white"
                  >
                    <Trash2 size={16} />
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="grid gap-5 rounded-[2.25rem] border border-white/70 bg-white/68 p-6 shadow-[0_30px_90px_rgba(91,54,113,0.12)] backdrop-blur-2xl md:grid-cols-2"
            >
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                placeholder="Coupon Code"
                className="h-14 rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 px-5 text-sm text-[#70537C] outline-none transition-all duration-300 placeholder:text-[#A58AB6] focus:border-[#B18AD7] focus:bg-white"
                required
              />

              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value as "percentage" | "flat")
                }
                className="h-14 rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 px-5 text-sm text-[#70537C] outline-none transition-all duration-300 focus:border-[#B18AD7] focus:bg-white"
              >
                <option value="percentage">Percentage</option>
                <option value="flat">Flat</option>
              </select>

              <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={
                  type === "percentage" ? "Discount %" : "Flat Discount"
                }
                className="h-14 rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 px-5 text-sm text-[#70537C] outline-none transition-all duration-300 placeholder:text-[#A58AB6] focus:border-[#B18AD7] focus:bg-white"
                required
              />

              <label className="flex h-14 items-center gap-3 rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 px-5 text-sm font-semibold text-[#70537C]">
                <input
                  type="checkbox"
                  checked={active}
                  onChange={(e) => setActive(e.target.checked)}
                  className="accent-[#6F3E8F]"
                />
                Active
              </label>

              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="rounded-full bg-[#6F3E8F] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
                >
                  Save Coupon
                </button>
              </div>
            </form>
          )}

          {coupons.length === 0 ? (
            <div className="rounded-[2rem] border border-white/70 bg-white/68 p-6 text-sm text-[#70537C] shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl">
              No coupons available.
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {coupons.map((coupon) => (
                <div
                  key={coupon.id}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_34px_90px_rgba(91,54,113,0.16)]"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F7E7F2] blur-2xl transition-all duration-500 group-hover:bg-[#E8D3F5]" />

                  <div className="relative mb-5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                        <BadgePercent size={22} />
                      </div>

                      <div>
                        <p className="text-2xl font-semibold text-[#553268]">
                          {coupon.code}
                        </p>

                        <p className="text-xs text-[#70537C]">
                          {coupon.active ? "Active" : "Inactive"}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => deleteCoupon(coupon.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4B9E7] bg-white/70 text-[#6F3E8F] transition-all duration-300 hover:bg-[#6F3E8F] hover:text-white"
                      aria-label="Delete coupon"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="relative space-y-3 rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-4 text-sm text-[#70537C]">
                    <p>
                      Type:{" "}
                      <span className="font-semibold text-[#553268]">
                        {coupon.type === "percentage" ? "Percentage" : "Flat"}
                      </span>
                    </p>

                    <p>
                      Value:{" "}
                      <span className="font-semibold text-[#553268]">
                        {coupon.value}
                      </span>
                    </p>

                    <p>
                      Status:{" "}
                      <span className="font-semibold text-[#553268]">
                        {coupon.active ? "Active" : "Inactive"}
                      </span>
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