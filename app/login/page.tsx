import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <LoginForm />
      <Footer />
    </main>
  );
}