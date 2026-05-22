import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ProductBenefits from "@/components/product/ProductBenefits";
import ProductDemoBlock from "@/components/product/ProductDemoBlock";
import ProductDetails from "@/components/product/ProductDetails";
import ProductFaq from "@/components/product/ProductFaq";
import ProductHero from "@/components/product/ProductHero";
import ProductTestimonials from "@/components/product/ProductTestimonials";
import RelatedProducts from "@/components/product/RelatedProducts";

type ProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <ProductHero productId={id} />
      <ProductDetails productId={id} />
      <ProductBenefits />
      <ProductDemoBlock />
      <ProductTestimonials />
      <ProductFaq />
      <RelatedProducts />
      <Footer />
    </main>
  );
}