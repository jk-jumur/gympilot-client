import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ForumPostDetailsClient from "@/components/forum/details/ForumPostDetailsClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`${API_URL}/api/forum/${id}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();

    if (!data.success) return { title: "Post Not Found" };

    return {
      title: data.data.title,
      description: data.data.description?.substring(0, 160),
      openGraph: {
        title: `${data.data.title} | GymPilot`,
        images: [data.data.image],
      },
    };
  } catch {
    return { title: "Forum Post" };
  }
}

export default async function ForumPostDetailsPage({ params }) {
  const { id } = await params;

  // ⭐ Private route — login required
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(`/login?redirect=/forum/${id}`);
  }

  return <ForumPostDetailsClient id={id} user={session.user} />;
}