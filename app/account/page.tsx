import AccountDashboard from "@/components/dashboard/AccountDashboard";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AccountDashboard />
      <Footer />
    </main>
  );
}