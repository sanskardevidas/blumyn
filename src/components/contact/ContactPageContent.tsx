"use client";

import { useState } from "react";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { useMessages } from "@/context/MessageContext";

export default function ContactPageContent() {
  const { addMessage } = useMessages();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addMessage({
      fullName,
      email,
      phone,
      message,
    });

    setFullName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setSent(true);

    setTimeout(() => setSent(false), 2500);
  };

  return (
    <section className="relative isolate overflow-hidden bg-[#FFF9FB] py-16 md:py-24">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.92),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.88),transparent_34%),radial-gradient(circle_at_50%_92%,rgba(255,240,201,0.42),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

      <div className="absolute -left-32 top-0 -z-20 h-[28rem] w-[28rem] rounded-full bg-[#FFE2EC] blur-[120px]" />
      <div className="absolute -right-32 bottom-0 -z-20 h-[30rem] w-[30rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

      <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_0.92fr] lg:gap-14">
        <div>
          <div className="mb-5 inline-flex rounded-full border border-white/70 bg-white/65 px-5 py-2 shadow-[0_14px_35px_rgba(122,92,158,0.08)] backdrop-blur-xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E] md:text-sm">
              Contact Blumyn
            </p>
          </div>

          <h1 className="mb-6 text-4xl font-medium leading-tight tracking-[-0.04em] text-[#553268] md:text-6xl">
            We’re here to help you feel supported
          </h1>

          <p className="mb-10 max-w-xl text-base leading-8 text-[#70537C] md:text-lg">
            Reach out for help with products, orders, subscriptions, or
            anything else you need. We want your Blumyn experience to feel easy
            and comforting.
          </p>

          <div className="space-y-5">
            {[
              {
                icon: Mail,
                title: "Email",
                text: "contact@blumyn.shop",
              },
              {
                icon: MessageCircle,
                title: "WhatsApp Support",
                text: "+91 8766589805",
              },
              {
                icon: MapPin,
                title: "Location",
                text: "101-Aai Height, Pargaon, Tarfe Ale,\nJunnar, Pune, Maharashtra – 410504,\nIndia",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/68 p-6 shadow-[0_24px_70px_rgba(91,54,113,0.1)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:bg-white hover:shadow-[0_34px_90px_rgba(91,54,113,0.16)]"
                >
                  <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#F7E7F2] blur-2xl transition-all duration-500 group-hover:bg-[#E8D3F5]" />

                  <div className="relative flex items-start gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
                      <Icon size={24} />
                    </div>

                    <div>
                      <h3 className="mb-2 text-2xl text-[#553268]">
                        {item.title}
                      </h3>

                      <p className="text-sm leading-7 text-[#70537C]">
                        {item.text}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/58 p-7 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl md:p-8">
            <div className="absolute -right-14 -top-14 h-40 w-40 rounded-full bg-[#F7E7F2] blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-32 w-32 rounded-full bg-[#FFEAC7]/40 blur-3xl" />

            <div className="relative">
              <h2 className="mb-2 text-4xl leading-tight text-[#553268]">
                Send a message
              </h2>

              <p className="mb-8 text-sm leading-7 text-[#70537C]">
                We usually reply within a few hours.
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#553268]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-14 w-full rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 px-5 text-sm text-[#70537C] outline-none transition-all duration-300 placeholder:text-[#A58AB6] focus:border-[#B18AD7] focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#553268]">
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-14 w-full rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 px-5 text-sm text-[#70537C] outline-none transition-all duration-300 placeholder:text-[#A58AB6] focus:border-[#B18AD7] focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#553268]">
                    WhatsApp Number
                  </label>

                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter WhatsApp number"
                    className="h-14 w-full rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 px-5 text-sm text-[#70537C] outline-none transition-all duration-300 placeholder:text-[#A58AB6] focus:border-[#B18AD7] focus:bg-white"
                    required
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-[#553268]">
                    Message
                  </label>

                  <textarea
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message here..."
                    className="w-full rounded-[1.5rem] border border-[#E6D6F2] bg-[#FFF8FC]/80 px-5 py-4 text-sm leading-7 text-[#70537C] outline-none transition-all duration-300 placeholder:text-[#A58AB6] focus:border-[#B18AD7] focus:bg-white"
                    required
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-[#6F3E8F] px-6 py-4 text-sm font-semibold text-white shadow-[0_20px_45px_rgba(111,62,143,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#5E347A]"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </div>

                {sent && (
                  <div className="rounded-[1.2rem] border border-[#E6D6F2] bg-[#FFF8FC] px-4 py-3 text-sm font-semibold text-[#70537C]">
                    Your message has been sent successfully.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}