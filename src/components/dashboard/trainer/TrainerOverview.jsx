"use client";

import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import StatCard from "@/components/dashboard/user/StatCard";
import UserProfileCard from "@/components/dashboard/user/UserProfileCard";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function TrainerOverview() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({ classes: 0, students: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API}/api/classes/trainer/my`, {
          credentials: "include",
        });
        const data = await res.json();
        const classes = data?.data || [];

        const totalStudents = classes.reduce(
          (sum, c) => sum + (c.enrolledCount || 0),
          0
        );

        setStats({ classes: classes.length, students: totalStudents });
      } catch (err) {
        console.error("Trainer overview error:", err);
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
      <h1 className="text-2xl font-bold text-gray-800">Trainer Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          icon={<FaChalkboardTeacher className="text-2xl text-white" />}
          label="Total Classes Created"
          value={stats.classes}
          color="bg-indigo-500"
        />
        <StatCard
          icon={<FaUsers className="text-2xl text-white" />}
          label="Total Students Enrolled"
          value={stats.students}
          color="bg-emerald-500"
        />
      </div>

      <UserProfileCard user={session?.user} role="Trainer" />
    </div>
  );
}