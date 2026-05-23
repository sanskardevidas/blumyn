import AdminDashboardContent from "@/components/admin/AdminDashboardContent";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#FFF9FB]">
      <div className="mx-auto max-w-[1600px] px-4 py-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          
          {/* SIDEBAR */}
          <div className="lg:sticky lg:top-4 lg:h-fit">
            <AdminSidebar />
          </div>

          {/* MAIN CONTENT */}
          <section className="overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/58 p-5 shadow-[0_35px_100px_rgba(91,54,113,0.16)] backdrop-blur-2xl sm:p-7">
            <AdminDashboardContent />
          </section>
        </div>
      </div>
    </main>
  );
}