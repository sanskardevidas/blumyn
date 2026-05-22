"use client";

import {
  CalendarDays,
  Pause,
  RefreshCcw,
  Sparkles,
  XCircle,
} from "lucide-react";

import AccountSidebar from "@/components/dashboard/AccountSidebar";
import { useSubscriptions } from "@/context/SubscriptionContext";

export default function SubscriptionPageContent() {
  const {
    subscriptions,
    pauseSubscription,
    resumeSubscription,
    cancelSubscription,
  } = useSubscriptions();

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
                <RefreshCcw size={26} />
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E]">
                  My Account
                </p>

                <h1 className="text-4xl leading-tight text-[#553268]">
                  My Subscription
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#70537C]">
                  Manage your recurring Blumyn comfort plan, delivery cycle,
                  subscription status, and future deliveries in one place.
                </p>
              </div>
            </div>
          </div>

          {subscriptions.length === 0 ? (
            <div className="rounded-[2rem] border border-white/70 bg-white/68 p-6 text-sm text-[#70537C] shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl">
              No subscriptions yet. Once you subscribe, it will appear here.
            </div>
          ) : (
            <div className="space-y-5">
              {subscriptions.map((sub) => (
                <div
                  key={sub.id}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_34px_90px_rgba(91,54,113,0.16)]"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F7E7F2] blur-2xl transition-all duration-500 group-hover:bg-[#E8D3F5]" />

                  <div className="relative mb-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                        <Sparkles size={22} />
                      </div>

                      <div>
                        <h2 className="text-2xl font-semibold text-[#553268]">
                          {sub.planName}
                        </h2>

                        <p className="mt-2 text-sm text-[#70537C]">
                          {sub.productName} · {sub.frequency}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`w-fit rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${
                        sub.status === "Active"
                          ? "border border-green-200 bg-green-50 text-green-700"
                          : sub.status === "Paused"
                          ? "border border-yellow-200 bg-yellow-50 text-yellow-700"
                          : "border border-red-200 bg-red-50 text-red-700"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </div>

                  <div className="relative mb-5 rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-5">
                    <div className="flex items-center gap-3 text-sm text-[#70537C]">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7E7F2] text-[#6F3E8F]">
                        <CalendarDays size={18} />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-[#A58AB6]">
                          Next Delivery
                        </p>

                        <p className="mt-1 font-semibold text-[#553268]">
                          {new Date(
                            sub.nextDelivery
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex flex-wrap gap-3">
                    {sub.status === "Active" && (
                      <button
                        onClick={() => pauseSubscription(sub.id)}
                        className="flex items-center gap-2 rounded-full bg-[#6F3E8F] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
                      >
                        <Pause size={16} />
                        Pause Plan
                      </button>
                    )}

                    {sub.status === "Paused" && (
                      <button
                        onClick={() => resumeSubscription(sub.id)}
                        className="flex items-center gap-2 rounded-full bg-[#6F3E8F] px-5 py-3 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
                      >
                        <RefreshCcw size={16} />
                        Resume Plan
                      </button>
                    )}

                    {sub.status !== "Cancelled" && (
                      <button
                        onClick={() => cancelSubscription(sub.id)}
                        className="flex items-center gap-2 rounded-full border border-[#D4B9E7] bg-white/70 px-5 py-3 text-sm font-semibold text-[#6F3E8F] transition-all duration-300 hover:-translate-y-1 hover:border-red-400 hover:bg-red-500 hover:text-white"
                      >
                        <XCircle size={16} />
                        Cancel Plan
                      </button>
                    )}
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