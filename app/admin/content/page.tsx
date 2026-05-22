import AdminContentManagement from "@/components/admin/AdminContentManagement";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function AdminContentPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AdminContentManagement />
      <Footer />
    </main>
  );
}