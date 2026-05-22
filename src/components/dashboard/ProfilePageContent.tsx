"use client";

import { useEffect, useState } from "react";
import { Mail, Phone, Trash2, UserRound } from "lucide-react";

import AccountSidebar from "@/components/dashboard/AccountSidebar";
import { useProfile } from "@/context/ProfileContext";

export default function ProfilePageContent() {
  const { profile, updateProfile, clearProfile } = useProfile();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    setFullName(profile.fullName || "");
    setEmail(profile.email || "");
    setPhone(profile.phone || "");
  }, [profile]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    updateProfile({
      fullName,
      email,
      phone,
    });

    setSavedMessage("Profile saved successfully.");
    setTimeout(() => setSavedMessage(""), 2000);
  };

  const handleClear = () => {
    clearProfile();
    setFullName("");
    setEmail("");
    setPhone("");
    setSavedMessage("Profile cleared.");
    setTimeout(() => setSavedMessage(""), 2000);
  };

  const inputClass =
    "h-14 w-full rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 py-3 pl-11 pr-4 text-sm text-[#70537C] outline-none transition-all duration-300 placeholder:text-[#A58AB6] focus:border-[#B18AD7] focus:bg-white";

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

            <div className="relative flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                  <UserRound size={26} />
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E]">
                    My Account
                  </p>

                  <h1 className="text-4xl leading-tight text-[#553268]">
                    Profile
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#70537C]">
                    Manage your personal details for a smoother Blumyn shopping,
                    delivery, and subscription experience.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClear}
                className="flex items-center gap-2 rounded-full border border-[#D4B9E7] bg-white/70 px-5 py-3 text-sm font-semibold text-[#6F3E8F] transition-all duration-300 hover:-translate-y-1 hover:border-[#6F3E8F] hover:bg-[#6F3E8F] hover:text-white"
              >
                <Trash2 size={16} />
                Clear Profile
              </button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2.25rem] border border-white/70 bg-white/68 p-6 shadow-[0_30px_90px_rgba(91,54,113,0.12)] backdrop-blur-2xl md:p-8">
            <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#F7E7F2] blur-3xl" />
            <div className="absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-[#FFEAC7]/40 blur-3xl" />

            <form
              onSubmit={handleSave}
              className="relative grid gap-6 md:grid-cols-2"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#553268]">
                  Full Name
                </label>

                <div className="relative">
                  <UserRound
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#70537C]"
                  />

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={inputClass}
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#553268]">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#70537C]"
                  />

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClass}
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full rounded-full bg-[#6F3E8F] px-6 py-4 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A] md:w-auto"
                >
                  Save Changes
                </button>
              </div>

              {savedMessage && (
                <div className="md:col-span-2 rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC] px-4 py-3 text-sm font-semibold text-[#70537C]">
                  {savedMessage}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}