import OrdersPageContent from "@/components/dashboard/OrdersPageContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function OrdersPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#FFF9FB]">
      <Navbar />

      <section className="relative overflow-hidden py-16 md:py-20">
        {/* BACKGROUND */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(247,231,242,0.95),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(230,214,242,0.75),transparent_32%),linear-gradient(180deg,#FFF9FB_0%,#FFF7FA_45%,#F8F0FF_100%)]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* PAGE HEADER */}
          <div className="mb-10 rounded-[2.5rem] border border-white/70 bg-white/60 p-8 shadow-[0_30px_80px_rgba(91,54,113,0.12)] backdrop-blur-2xl">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#7A5C9E]">
              My Orders
            </p>

            <h1 className="text-4xl leading-tight text-[#553268] md:text-5xl">
              Track your Blumyn orders
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#70537C] md:text-base">
              View your latest purchases, delivery progress, payment details,
              order history, and shipping updates in one place.
            </p>
          </div>

          {/* ORDERS CONTENT */}
          <OrdersPageContent />
        </div>
      </section>

      <Footer />
    </main>
  );
}