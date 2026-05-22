import AdminAnalyticsContent from "@/components/admin/AdminAnalyticsContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function AdminAnalyticsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AdminAnalyticsContent />
      <Footer />
    </main>
  );
}