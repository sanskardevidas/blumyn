import AdminUsersContent from "@/components/admin/AdminUsersContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function AdminUsersPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AdminUsersContent />
      <Footer />
    </main>
  );
}