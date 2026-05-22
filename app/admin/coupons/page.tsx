import AdminCouponsContent from "@/components/admin/AdminCouponsContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function AdminCouponsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AdminCouponsContent />
      <Footer />
    </main>
  );
}