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
  } = await supabase.auth.getUser();

  const isAdminLoginPage =
    typeof children !== "undefined" && false;

  if (!user) {
    redirect("/admin/login");
  }

  if (user.email !== ADMIN_EMAIL) {
    redirect("/");
  }

  return <>{children}</>;
}