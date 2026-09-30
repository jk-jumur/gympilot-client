import ClassDetailsClient from "@/components/classes/details/ClassDetailsClient";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ⭐ Next.js 15: params is a Promise
export async function generateMetadata({ params }) {
  try {
    const { id } = await params;  // ⭐ await করুন

    const res = await fetch(`${API_URL}/api/classes/${id}`, {
      next: { revalidate: 60 },
    });
    const data = await res.json();

    if (!data.success) {
      return { title: "Class Not Found" };
    }

    const cls = data.data;
    return {
      title: cls.name,
      description:
        cls.description?.substring(0, 160) ||
        `Join ${cls.name} with ${cls.trainer} at GymPilot.`,
      openGraph: {
        title: `${cls.name} | GymPilot`,
        description: cls.description?.substring(0, 160),
        images: [cls.image],
      },
    };
  } catch {
    return { title: "Class Details" };
  }
}

// ⭐ async + await params
export default async function ClassDetailsPage({ params }) {
  const { id } = await params;  // ⭐ await করুন

  return <ClassDetailsClient id={id} />;
}