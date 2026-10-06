import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMeService } from "@/features/auth/services/auth.service";
import Navbar from "@/components/Navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  try {
    await getMeService(token);
  } catch (error) {
    console.error("Authentication failed:", error);
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
