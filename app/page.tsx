import WhatsappButton from "@/components/common/WhatsappButton";
import AboutSection from "@/components/home/AboutSection";
import CtaSection from "@/components/home/CtaSection";
import GuidePreview from "@/components/home/GuidePreview";
import Hero from "@/components/home/Hero";
import ProductDemoVideos from "@/components/home/ProductDemoVideos";
import ProductPreview from "@/components/home/ProductPreview";
import SubscriptionSection from "@/components/home/SubscriptionSection";
import VideoTestimonials from "@/components/home/VideoTestimonials";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <ProductPreview />
      <AboutSection />
      <VideoTestimonials />
      <ProductDemoVideos />
      <SubscriptionSection />
      <GuidePreview />
      <CtaSection />
      <Footer />
      <WhatsappButton />
    </main>
  );
}