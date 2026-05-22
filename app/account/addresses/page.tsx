import AddressesPageContent from "@/components/dashboard/AddressesPageContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function AddressesPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <AddressesPageContent />
      <Footer />
    </main>
  );
}