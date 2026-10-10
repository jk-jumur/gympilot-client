
import Banner from "@/components/home/Banner";
import TrustedStats from "@/components/home/TrustedStats";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedClasses from "@/components/home/FeaturedClasses";
import ExploreCategories from "@/components/home/ExploreCategories";
import MeetTrainers from "@/components/home/MeetTrainers";
import LatestForumPosts from "@/components/home/LatestForumPosts";
import SuccessStories from "@/components/home/SuccessStories";
import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <main className="w-full">
      <Banner />
      <TrustedStats />
      <WhyChooseUs />
      <FeaturedClasses />
      <ExploreCategories />
      <MeetTrainers />
      <LatestForumPosts />
      <SuccessStories />
      <Newsletter />
    </main>
  );
}