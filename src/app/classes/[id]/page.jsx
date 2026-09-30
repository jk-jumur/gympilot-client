import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ClassDetailsClient from "@/components/classes/details/ClassDetailsClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`${API_URL}/api/classes/${id}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();

    if (!data.success) return { title: "Class Not Found" };

    return {
      title: data.data.name,
      description: data.data.description?.substring(0, 160),
    };
  } catch {
    return { title: "Class Details" };
  }
}

export default async function ClassDetailsPage({ params }) {
  const { id } = await params;

  // ⭐ Private route — login required
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(`/login?redirect=/classes/${id}`);
  }

  return <ClassDetailsClient id={id} />;
}