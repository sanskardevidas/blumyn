import AdminSubscriptionsContent from "@/components/admin/AdminSubscriptionsContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function AdminSubscriptionsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AdminSubscriptionsContent />
      <Footer />
    </main>
  );
}