import AdminProductsContent from "@/components/admin/AdminProductsContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function AdminProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AdminProductsContent />
      <Footer />
    </main>
  );
}