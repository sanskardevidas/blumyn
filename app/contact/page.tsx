import ContactPageContent from "@/components/contact/ContactPageContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ContactPageContent />
      <Footer />
    </main>
  );
}