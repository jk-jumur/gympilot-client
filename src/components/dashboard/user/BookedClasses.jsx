"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// ⭐ Same-origin URL — rewrites proxy handle করবে
const API = "";

export default function BookedClasses() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `${API}/api/bookings`,       // = "/api/bookings" → same-origin ✅
          { credentials: "include" }
        );
        const data = await res.json();
        setBookings(data?.data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg" />
        <div className="h-40 bg-gray-200 animate-pulse rounded-xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">My Booked Classes</h1>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-xl border p-10 text-center text-gray-500">
          No booked classes yet.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border">
          <table className="w-full text-left">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="p-4">Class Name</th>
                <th className="p-4">Trainer</th>
                <th className="p-4">Schedule</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-t hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-800">
                    {b.className || "—"}
                  </td>
                 <td className="p-4 text-gray-600">
  {b.trainerName || b.trainer || "—"}
</td>
<td className="p-4 text-gray-600">
  {b.schedule || "—"}
</td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/classes/${b.classId}`}
                      className="inline-block px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}