import GuidePageContent from "@/components/guide/GuidePageContent";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function GuidePage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <GuidePageContent />
      <Footer />
    </main>
  );
}