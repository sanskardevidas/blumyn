"use client";

import {
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  RefreshCcw,
  UserRound,
} from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { useAddresses } from "@/context/AddressContext";
import { useProfile } from "@/context/ProfileContext";
import { useOrders } from "@/context/OrderContext";
import { useSubscriptions } from "@/context/SubscriptionContext";

export default function AdminUsersContent() {
  const { addresses } = useAddresses();
  const { profile } = useProfile();
  const { orders } = useOrders();
  const { subscriptions } = useSubscriptions();

  const hasProfile =
    profile.fullName.trim() ||
    profile.email.trim() ||
    profile.phone.trim();

  const activeSubscription = subscriptions.find(
    (sub) => sub.status === "Active"
  );

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
                <UserRound size={26} />
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E]">
                  Admin Panel
                </p>

                <h1 className="text-4xl leading-tight text-[#553268]">
                  Users / Customers
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-7 text-[#70537C]">
                  Manage customer profile information, saved addresses, orders,
                  and subscription activity across the Blumyn platform.
                </p>
              </div>
            </div>
          </div>

          {!hasProfile && addresses.length === 0 ? (
            <div className="rounded-[2rem] border border-white/70 bg-white/68 p-6 text-sm text-[#70537C] shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl">
              No customer data yet. Profile and address data will appear here.
            </div>
          ) : (
            <div className="space-y-5">
              <div className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_34px_90px_rgba(91,54,113,0.16)]">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F7E7F2] blur-2xl transition-all duration-500 group-hover:bg-[#E8D3F5]" />

                <div className="relative mb-6 flex items-start gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                    <UserRound size={24} />
                  </div>

                  <div>
                    <h2 className="text-2xl font-semibold text-[#553268]">
                      {profile.fullName ||
                        addresses[0]?.fullName ||
                        "Customer"}
                    </h2>

                    <p className="mt-1 text-sm text-[#70537C]">
                      Premium Blumyn Customer
                    </p>
                  </div>
                </div>

                <div className="relative grid gap-5 md:grid-cols-2">
                  <div className="space-y-4 rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-[#6F3E8F]">
                        <Mail size={18} />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#9A84A6]">
                          Email
                        </p>

                        <p className="mt-1 text-sm font-medium text-[#553268]">
                          {profile.email || "No email saved"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-[#6F3E8F]">
                        <Phone size={18} />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#9A84A6]">
                          Phone
                        </p>

                        <p className="mt-1 text-sm font-medium text-[#553268]">
                          {profile.phone ||
                            addresses[0]?.phone ||
                            "No phone saved"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-[#6F3E8F]">
                        <MapPin size={18} />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#9A84A6]">
                          Saved Addresses
                        </p>

                        <p className="mt-1 text-sm font-medium text-[#553268]">
                          {addresses.length}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 rounded-[1.5rem] border border-[#E6D6F2] bg-white/70 p-5">
                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-[#6F3E8F]">
                        <PackageCheck size={18} />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#9A84A6]">
                          Orders
                        </p>

                        <p className="mt-1 text-sm font-medium text-[#553268]">
                          {orders.length} Orders Placed
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="mt-1 text-[#6F3E8F]">
                        <RefreshCcw size={18} />
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-[0.18em] text-[#9A84A6]">
                          Subscription
                        </p>

                        <p className="mt-1 text-sm font-medium text-[#553268]">
                          {activeSubscription
                            ? activeSubscription.status
                            : "None"}
                        </p>
                      </div>
                    </div>

                    {activeSubscription && (
                      <div className="rounded-[1.2rem] border border-[#DCCBE8] bg-[#F7ECFF] p-4">
                        <p className="text-xs uppercase tracking-[0.18em] text-[#9A84A6]">
                          Active Plan
                        </p>

                        <p className="mt-2 text-sm font-semibold text-[#553268]">
                          {activeSubscription.planName}
                        </p>

                        <p className="mt-1 text-sm text-[#70537C]">
                          {activeSubscription.frequency}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}