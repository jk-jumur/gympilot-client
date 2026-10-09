"use client";

import { useEffect, useState } from "react";
import { toast } from "@/lib/toast";
import { HiOutlineUserMinus, HiOutlineSparkles } from "react-icons/hi2";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ManageTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const fetchTrainers = async () => {
    try {
      const res = await fetch(`${API}/api/users/trainers`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load trainers");
      setTrainers(data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  const demoteTrainer = async (id) => {
    if (
      !confirm(
        "Are you sure you want to demote this trainer to a regular user?"
      )
    )
      return;

    setBusyId(id);
    try {
      const res = await fetch(`${API}/api/users/${id}/demote`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");

      setTrainers((prev) => prev.filter((t) => t._id !== id));
      toast.success("Trainer demoted to user");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-4">
        <div className="h-8 w-56 bg-gray-200 animate-pulse rounded-lg" />
        <div className="h-64 bg-gray-200 animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Trainers</h1>
          <p className="text-sm text-gray-500 mt-1">
            View active trainers and demote if needed
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <HiOutlineSparkles className="h-4 w-4" />
          {trainers.length} Active
        </span>
      </div>

      {trainers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          No active trainers yet
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Trainer
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Specialty
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Experience
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {trainers.map((t) => (
                  <tr
                    key={t._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={t.image || "/default-avatar.png"}
                          alt={t.name}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <p className="font-semibold text-sm text-gray-800">
                            {t.name}
                          </p>
                          <p className="text-xs text-gray-500">{t.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                        {t.specialty || "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">
                        {t.experience ? `${t.experience} years` : "—"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => demoteTrainer(t._id)}
                        disabled={busyId === t._id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200 disabled:opacity-40 transition-colors"
                      >
                        <HiOutlineUserMinus className="h-4 w-4" />
                        Demote to User
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}