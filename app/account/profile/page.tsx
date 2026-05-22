import ProfilePageContent from "@/components/dashboard/ProfilePageContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ProfilePageContent />
      <Footer />
    </main>
  );
}