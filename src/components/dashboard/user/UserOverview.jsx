"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { FaBook, FaHeart } from "react-icons/fa";
import StatCard from "./StatCard";
import UserProfileCard from "./UserProfileCard";
import TrainerStatusCard from "./TrainerStatusCard";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function UserOverview() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({ bookings: 0, favorites: 0 });
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bookRes, favRes, appRes] = await Promise.all([
          fetch(`${API}/api/bookings`, { credentials: "include" }),         
          fetch(`${API}/api/favorites`, { credentials: "include" }),        
          fetch(`${API}/api/trainer-applications/me`, { credentials: "include" }),
        ]);

        const bookings = await bookRes.json();
        const favorites = await favRes.json();
        const app = await appRes.json();

        setStats({
          bookings: bookings?.data?.length || 0,
          favorites: favorites?.data?.length || 0,
        });
        setApplication(app?.data || null);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) fetchData();
  }, [session]);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-24 bg-gray-200 animate-pulse rounded-xl" />
          <div className="h-24 bg-gray-200 animate-pulse rounded-xl" />
        </div>
        <div className="h-32 bg-gray-200 animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          icon={<FaBook className="text-2xl text-white" />}
          label="Total Booked Classes"
          value={stats.bookings}
          color="bg-blue-500"
        />
        <StatCard
          icon={<FaHeart className="text-2xl text-white" />}
          label="Total Favorites"
          value={stats.favorites}
          color="bg-pink-500"
        />
      </div>

      <UserProfileCard user={session?.user} role="User" />
      <TrainerStatusCard application={application} />
    </div>
  );
}