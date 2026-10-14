import AboutHero from "@/components/about/AboutHero";
import Ecosystem from "@/components/about/Ecosystem";
import ProblemsSolved from "@/components/about/ProblemsSolved";
// import PlatformFeatures from "@/components/about/PlatformFeatures";
// import HowItWorks from "@/components/about/HowItWorks";
// import TechStack from "@/components/about/TechStack";
// import WhyDifferent from "@/components/about/WhyDifferent";
// import OpenSource from "@/components/about/OpenSource";
// import GetStarted from "@/components/about/GetStarted";

export const metadata = {
  title: "About GymPilot — The Complete Fitness Ecosystem",
  description:
    "GymPilot is a full-stack fitness management platform connecting members, trainers, and admins with role-based dashboards, Stripe payments, and a thriving community.",
};

export default function AboutPage() {
  return (
    <main className="w-full">
      <AboutHero />
      <Ecosystem />
      <ProblemsSolved />
      {/* <PlatformFeatures />
      <HowItWorks />
      <TechStack />
      <WhyDifferent />
      <OpenSource />
      <GetStarted /> */}
    </main>
  );
}