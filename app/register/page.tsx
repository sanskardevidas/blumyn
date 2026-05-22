import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <RegisterForm />
      <Footer />
    </main>
  );
}