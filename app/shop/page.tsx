import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Filters from "@/components/shop/Filters";
import ProductGrid from "@/components/shop/ProductGrid";
import ShopHero from "@/components/shop/ShopHero";
import ShopSearchBar from "@/components/shop/ShopSearchBar";
import { ShopFilterProvider } from "@/context/ShopFilterContext";

export default function ShopPage() {
  return (
    <ShopFilterProvider>
      <main className="min-h-screen bg-background">
        <Navbar />
        <ShopHero />

        <section
          id="products"
          className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12"
        >
          <ShopSearchBar />

          <div className="mt-6 grid gap-6 lg:grid-cols-[250px_1fr] lg:gap-10">
            <div className="hidden lg:block">
              <Filters />
            </div>

            <ProductGrid />
          </div>
        </section>

        <Footer />
      </main>
    </ShopFilterProvider>
  );
}