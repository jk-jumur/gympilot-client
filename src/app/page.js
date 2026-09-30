import Banner from "@/components/home/Banner";
import FeaturedClasses from "@/components/home/FeaturedClasses";
import TrustedStats from "@/components/home/TrustedStats";
import MeetTrainers from "@/components/home/MeetTrainers";
import LatestForumPosts from "@/components/home/LatestForumPosts";
import ExploreCategories from "@/components/home/ExploreCategories";
import SuccessStories from "@/components/home/SuccessStories";
import Newsletter from "@/components/home/Newsletter";  



export default function HomePage() {
  return (
    <main>
      <Banner />
      <FeaturedClasses />
      <TrustedStats />
      <MeetTrainers />
      <LatestForumPosts />
      <ExploreCategories />
      <SuccessStories />
      <Newsletter /> 
      </main>      
  );
}