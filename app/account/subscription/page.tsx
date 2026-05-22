import SubscriptionPageContent from "@/components/dashboard/SubscriptionPageContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function SubscriptionPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <SubscriptionPageContent />
      <Footer />
    </main>
  );
}