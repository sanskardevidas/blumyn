"use client";

import Link from "next/link";
import { useState } from "react";
import { LockKeyhole, LogIn, Mail, Sparkles } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

const ADMIN_EMAIL = "sanskardevidas@gmail.com";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Please enter email and password.");
      return;
    }

    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();

    const { data, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    if (!data.user || !data.session) {
      setError("Login session was not created. Please try again.");
      setLoading(false);
      return;
    }

    await supabase.auth.getSession();

    const userEmail = data.user.email?.toLowerCase().trim();

    if (userEmail === ADMIN_EMAIL.toLowerCase().trim()) {
      window.location.href = "/admin";
      return;
    }

    window.location.href = "/account/orders";
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-24">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.92),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.88),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.42),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-14">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-white/70 bg-white/65 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-sm">
              Welcome Back
            </p>
          </div>

          <h1 className="mb-6 text-4xl font-medium leading-tight tracking-[-0.04em] text-[#553268] md:text-6xl">
            Log in to your Blumyn account
          </h1>

          <p className="max-w-xl text-base leading-8 text-[#70537C] md:text-lg">
            Access your orders, subscriptions, saved addresses, and admin panel
            if you are logging in as admin.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {["Track orders", "Manage subscription", "Admin access"].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-[1.5rem] border border-white/70 bg-white/68 px-4 py-4 text-sm font-semibold text-[#70537C] shadow-[0_18px_50px_rgba(91,54,113,0.08)] backdrop-blur-xl"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F7E7F2] text-[#6F3E8F]">
                    <Sparkles size={18} />
                  </div>
                  {item}
                </div>
              )
            )}
          </div>
        </div>

        <div>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/58 p-7 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl md:p-10">
            <div className="relative">
              <h2 className="mb-2 text-4xl leading-tight text-[#553268]">
                Login
              </h2>

              <p className="mb-8 text-sm leading-7 text-[#70537C]">
                Continue your Blumyn comfort journey.
              </p>

              <form className="space-y-5" onSubmit={handleLogin}>
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
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-[#E7D9EF] bg-white/80 pl-12 pr-4 text-sm text-[#553268] outline-none transition-all duration-300 focus:border-[#7A5C9E]"
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
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-[#E7D9EF] bg-white/80 pl-12 pr-4 text-sm text-[#553268] outline-none transition-all duration-300 focus:border-[#7A5C9E]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <label className="flex items-center gap-2 text-sm text-[#70537C]">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    Remember me
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-sm font-semibold text-[#7A5C9E] hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>

                {error && (
                  <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#7A5C9E] px-6 text-sm font-bold text-white shadow-[0_18px_45px_rgba(122,92,158,0.24)] transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <LogIn size={18} />
                  {loading ? "Logging in..." : "Login"}
                </button>
              </form>

              <p className="mt-7 text-center text-sm text-[#70537C]">
                Don&apos;t have an account?{" "}
                <Link
                  href="/register"
                  className="font-bold text-[#7A5C9E] hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}