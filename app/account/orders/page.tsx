import OrdersPageContent from "@/components/dashboard/OrdersPageContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <OrdersPageContent />
      <Footer />
    </main>
  );
}