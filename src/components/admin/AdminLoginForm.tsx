"use client";

import Link from "next/link";
import {
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

export default function AdminLoginForm() {
  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-24">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.92),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.88),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.42),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

      <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
      <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-white/70 bg-white/65 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-sm">
              Blumyn Admin
            </p>
          </div>

          <h1 className="mb-6 text-4xl font-medium leading-tight tracking-[-0.04em] text-[#553268] md:text-6xl">
            Log in to manage the platform
          </h1>

          <p className="max-w-xl text-base leading-8 text-[#70537C] md:text-lg">
            Access your admin workspace to manage products, track orders,
            monitor subscriptions, and control content across the site.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {[
              "Manage products",
              "Track orders",
              "Control website content",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-[1.5rem] border border-white/70 bg-white/68 px-4 py-4 text-sm font-semibold text-[#70537C] shadow-[0_18px_50px_rgba(91,54,113,0.08)] backdrop-blur-xl"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7E7F2] text-[#6F3E8F]">
                  <Sparkles size={18} />
                </div>

                {item}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/58 p-7 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl md:p-10">
            <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#F7E7F2] blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-[#FFEAC7]/40 blur-3xl" />

            <div className="relative">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                <ShieldCheck size={30} />
              </div>

              <h2 className="mb-2 text-4xl leading-tight text-[#553268]">
                Admin Login
              </h2>

              <p className="mb-8 text-sm leading-7 text-[#70537C]">
                Secure access to the Blumyn management system.
              </p>

              <form className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#553268]">
                    Email
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#70537C]"
                    />

                    <input
                      type="email"
                      placeholder="Enter admin email"
                      className="h-14 w-full rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 py-3 pl-11 pr-4 text-sm text-[#70537C] outline-none transition-all duration-300 placeholder:text-[#A58AB6] focus:border-[#B18AD7] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#553268]">
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#70537C]"
                    />

                    <input
                      type="password"
                      placeholder="Enter password"
                      className="h-14 w-full rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 py-3 pl-11 pr-4 text-sm text-[#70537C] outline-none transition-all duration-300 placeholder:text-[#A58AB6] focus:border-[#B18AD7] focus:bg-white"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-[#6F3E8F] px-6 py-4 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
                >
                  <ShieldCheck size={18} />
                  Login to Admin
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-[#70537C]">
                Return to{" "}
                <Link
                  href="/"
                  className="font-semibold text-[#6F3E8F] hover:underline"
                >
                  Blumyn website
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}