"use client";

import {
  Mail,
  MessageCircleMore,
  Trash2,
  UserRound,
} from "lucide-react";

import AdminSidebar from "@/components/admin/AdminSidebar";
import { useMessages } from "@/context/MessageContext";

export default function AdminMessagesContent() {
  const { messages, removeMessage, clearMessages } = useMessages();

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
                  <MessageCircleMore size={26} />
                </div>

                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E]">
                    Admin Panel
                  </p>

                  <h1 className="text-4xl leading-tight text-[#553268]">
                    Messages / Queries
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#70537C]">
                    Manage customer contact form submissions, support requests,
                    and user queries from the Blumyn platform.
                  </p>
                </div>
              </div>

              {messages.length > 0 && (
                <button
                  type="button"
                  onClick={clearMessages}
                  className="flex items-center gap-2 rounded-full border border-[#D4B9E7] bg-white/70 px-5 py-3 text-sm font-semibold text-[#6F3E8F] transition-all duration-300 hover:-translate-y-1 hover:border-[#6F3E8F] hover:bg-[#6F3E8F] hover:text-white"
                >
                  <Trash2 size={16} />
                  Clear All
                </button>
              )}
            </div>
          </div>

          {messages.length === 0 ? (
            <div className="rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F]">
                  <Mail size={22} />
                </div>

                <div>
                  <p className="text-lg font-semibold text-[#553268]">
                    No messages yet
                  </p>

                  <p className="text-sm text-[#70537C]">
                    Contact form submissions will appear here.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_34px_90px_rgba(91,54,113,0.16)]"
                >
                  <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#F7E7F2] blur-2xl transition-all duration-500 group-hover:bg-[#E8D3F5]" />

                  <div className="relative mb-5 flex flex-wrap items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                        <UserRound size={24} />
                      </div>

                      <div>
                        <p className="text-xl font-semibold text-[#553268]">
                          {msg.fullName}
                        </p>

                        <p className="mt-1 text-sm text-[#70537C]">
                          {msg.email}
                        </p>

                        <p className="text-sm text-[#70537C]">
                          {msg.phone}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeMessage(msg.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4B9E7] bg-white/70 text-[#6F3E8F] transition-all duration-300 hover:bg-[#6F3E8F] hover:text-white"
                      aria-label="Remove message"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="relative rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 p-5">
                    <p className="text-sm leading-8 text-[#70537C]">
                      {msg.message}
                    </p>
                  </div>

                  <p className="relative mt-4 text-xs text-[#9B84A8]">
                    {new Date(msg.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}