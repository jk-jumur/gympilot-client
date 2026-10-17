"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


import UserOverview from "@/components/dashboard/user/UserOverview";
import AdminOverview from "@/components/dashboard/admin/AdminOverview";
import TrainerOverview from "@/components/dashboard/trainer/TrainerOverview";

export default function DashboardHomePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();


  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500"></div>
      </div>
    );
  }

  if (!session?.user) return null;

  
  const role = session.user.role?.toLowerCase();

  
  if (role === "admin") return <AdminOverview />;
  if (role === "trainer") return <TrainerOverview />;
  return <UserOverview />;
}