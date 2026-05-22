import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const ADMIN_EMAIL = "sanskardevidas@gmail.com";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    redirect("/login");
  }

  const userEmail = user.email?.toLowerCase().trim();
  const adminEmail = ADMIN_EMAIL.toLowerCase().trim();

  if (userEmail !== adminEmail) {
    redirect("/");
  }

  return <>{children}</>;
}