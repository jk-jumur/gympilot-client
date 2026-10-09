"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { FaUsers, FaChalkboardTeacher, FaTicketAlt } from "react-icons/fa";
import StatCard from "@/components/dashboard/user/StatCard";
import UserProfileCard from "@/components/dashboard/user/UserProfileCard";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AdminOverview() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    users: 0,
    classes: 0,
    bookings: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, classesRes, bookingsRes] = await Promise.all([
          fetch(`${API}/api/users`, { credentials: "include" }),
          fetch(`${API}/api/classes/admin/all`, { credentials: "include" }),
          fetch(`${API}/api/bookings/all`, { credentials: "include" }),
        ]);

        const usersData = await usersRes.json();
        const classesData = await classesRes.json();
        const bookingsData = await bookingsRes.json();

        setStats({
          users: usersData?.data?.length || 0,
          classes: classesData?.data?.length || 0,
          bookings: bookingsData?.data?.length || 0,
        });
      } catch (err) {
        console.error("Admin overview fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user) fetchStats();
  }, [session]);

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-56 bg-gray-200 animate-pulse rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
        <div className="h-32 bg-gray-200 animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">
          Platform overview and management hub
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          icon={<FaUsers className="text-2xl text-white" />}
          label="Total Users"
          value={stats.users}
          color="bg-blue-500"
        />
        <StatCard
          icon={<FaChalkboardTeacher className="text-2xl text-white" />}
          label="Total Classes"
          value={stats.classes}
          color="bg-indigo-500"
        />
        <StatCard
          icon={<FaTicketAlt className="text-2xl text-white" />}
          label="Total Booked Classes"
          value={stats.bookings}
          color="bg-emerald-500"
        />
      </div>

      {/* Profile */}
      <UserProfileCard user={session?.user} role="Admin" />
    </div>
  );
}