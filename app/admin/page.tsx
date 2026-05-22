import AdminDashboardContent from "@/components/admin/AdminDashboardContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AdminDashboardContent />
      <Footer />
    </main>
  );
}