import ForumPageClient from "@/components/forum/ForumPageClient";

export const metadata = {
  title: "Community Forum",
  description:
    "Read fitness tips, stories, and discussions from our community. Share your journey with fellow fitness enthusiasts.",
  alternates: { canonical: "/forum" },
  openGraph: {
    title: "Community Forum | GymPilot",
    description: "Read fitness tips and discussions from our community.",
    url: "/forum",
  },
};

export default function ForumPage() {
  return <ForumPageClient />;
}