import ClassPageClient from "@/components/classes/ClassPageClient";

export const metadata = {
  title: "All Classes",
  description: "Browse all fitness classes — Yoga, Cardio, Weights, Dance, Boxing.",
  alternates: { canonical: "/classes" },
};

export default function AllClassesPage() {
  return <ClassPageClient />;
}