import Link from "next/link";
import { Mail, MapPin, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-white/70 bg-[#FFF9FB]">
      <div className="absolute inset-0 -z-30 bg-[radial-gradient(circle_at_14%_8%,rgba(255,226,236,0.85),transparent_34%),radial-gradient(circle_at_86%_18%,rgba(226,208,245,0.82),transparent_34%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_50%,#F8F0FF_100%)]" />

      <div className="absolute -left-32 top-0 -z-20 h-[24rem] w-[24rem] rounded-full bg-[#FFE2EC] blur-[120px]" />

      <div className="absolute -right-32 bottom-0 -z-20 h-[26rem] w-[26rem] rounded-full bg-[#DEC8F5] blur-[130px]" />

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 md:py-14">
        <div className="rounded-[2rem] border border-white/70 bg-white/58 p-5 shadow-[0_35px_100px_rgba(91,54,113,0.14)] backdrop-blur-2xl md:rounded-[2.5rem] md:p-8">
          <div className="grid gap-5 md:grid-cols-4 md:gap-10">
            <div>
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F7E7F2] text-[#6F3E8F] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] md:mb-4 md:h-14 md:w-14">
                <Sparkles size={24} />
              </div>

              <h3 className="mb-2 text-3xl font-semibold text-[#553268] md:mb-3">
                Blumyn
              </h3>

              <p className="max-w-xs text-sm leading-6 text-[#70537C] md:leading-7">
                Comfort, care, and confidence — always with you.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 md:contents">
              <div>
                <h4 className="mb-3 text-lg font-semibold text-[#553268] md:mb-4">
                  About
                </h4>

                <div className="space-y-2 text-sm text-[#70537C] md:space-y-3">
                  <Link
                    href="/"
                    className="block transition hover:text-[#6F3E8F]"
                  >
                    Our Story
                  </Link>

                  <Link
                    href="/shop"
                    className="block transition hover:text-[#6F3E8F]"
                  >
                    Shop
                  </Link>

                  <Link
                    href="/guide"
                    className="block transition hover:text-[#6F3E8F]"
                  >
                    Guide
                  </Link>
                </div>
              </div>

              <div>
                <h4 className="mb-3 text-lg font-semibold text-[#553268] md:mb-4">
                  Support
                </h4>

                <div className="space-y-2 text-sm text-[#70537C] md:space-y-3">
                  <Link
                    href="/contact"
                    className="block transition hover:text-[#6F3E8F]"
                  >
                    Contact
                  </Link>

                  <Link
                    href="/"
                    className="block transition hover:text-[#6F3E8F]"
                  >
                    Shipping
                  </Link>

                  <Link
                    href="/"
                    className="block transition hover:text-[#6F3E8F]"
                  >
                    Privacy
                  </Link>

                  <Link
                    href="/"
                    className="block transition hover:text-[#6F3E8F]"
                  >
                    Refund
                  </Link>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-3 text-lg font-semibold text-[#553268] md:mb-4">
                Contact
              </h4>

              <div className="flex items-center justify-between gap-4">
                <div className="space-y-2 text-sm text-[#70537C] md:space-y-3">
                  <div className="flex items-center gap-2">
                    <Mail size={15} className="text-[#6F3E8F]" />
                    <span>contact@blumyn.com</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-[#6F3E8F]" />
                    <span>Pune, Maharashtra</span>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4B9E7] bg-white/70 text-sm font-semibold text-[#6F3E8F] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6F3E8F] hover:text-white"
                    aria-label="Instagram"
                  >
                    IG
                  </a>

                  <a
                    href="mailto:contact@blumyn.com"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4B9E7] bg-white/70 text-[#6F3E8F] transition-all duration-300 hover:-translate-y-1 hover:bg-[#6F3E8F] hover:text-white"
                    aria-label="Email"
                  >
                    <Mail size={17} />
                  </a>
                </div>
              </div>
            </div>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-and-conditions">Terms & Conditions</Link>
            <Link href="/refund-policy">Refund Policy</Link>
            <Link href="/shipping-policy">Shipping Policy</Link>
            <Link href="/return-policy">Return Policy</Link>

          </div>

          <div className="mt-6 border-t border-[#E6D6F2] pt-4 text-center text-sm text-[#70537C] md:mt-9 md:pt-6">
            © 2026 Blumyn. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}