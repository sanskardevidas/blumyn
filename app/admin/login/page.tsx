import AdminLoginForm from "@/components/admin/AdminLoginForm";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function AdminLoginPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AdminLoginForm />
      <Footer />
    </main>
  );
}