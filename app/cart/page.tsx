import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CartItems from "@/components/cart/CartItems";
import CartSummary from "@/components/cart/CartSummary";

export default function CartPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-10 text-4xl text-accent">Your Cart</h1>

          <div className="grid gap-10 md:grid-cols-[1.3fr_0.7fr]">
            <CartItems />
            <CartSummary />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}