import AdminMessagesContent from "@/components/admin/AdminMessagesContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function AdminMessagesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AdminMessagesContent />
      <Footer />
    </main>
  );
}