import AdminOrdersContent from "@/components/admin/AdminOrdersContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function AdminOrdersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AdminOrdersContent />
      <Footer />
    </main>
  );
}