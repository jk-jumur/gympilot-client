"use client";

import { useEffect, useState, useMemo } from "react";
import { toast } from "@/lib/toast";
import {
  HiOutlineUserMinus,
  HiOutlineSparkles,
  HiOutlineChevronUpDown,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
  HiOutlineUser,
} from "react-icons/hi2";

const API = "";

export default function ManageTrainers() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  // ⭐ Sorting State
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedTrainers = useMemo(() => {
    return [...trainers].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal || "").toLowerCase();
      const bStr = String(bVal || "").toLowerCase();
      return sortOrder === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [trainers, sortField, sortOrder]);

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

  const SortIcon = ({ field }) => {
    if (sortField !== field) {
      return <HiOutlineChevronUpDown className="h-3.5 w-3.5 text-gray-400 ml-1" />;
    }
    return sortOrder === "asc" ? (
      <HiOutlineChevronUp className="h-3.5 w-3.5 text-orange-500 ml-1" />
    ) : (
      <HiOutlineChevronDown className="h-3.5 w-3.5 text-orange-500 ml-1" />
    );
  };

  if (loading) {
    return (
      <div className="p-4 sm:p-6 space-y-4 max-w-7xl mx-auto w-full">
        <div className="h-8 w-56 bg-gray-200 animate-pulse rounded-lg" />
        <div className="h-64 bg-gray-200 animate-pulse rounded-xl" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Manage Trainers
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            View active trainers and demote if needed
          </p>
        </div>
        <span className="inline-flex items-center self-start sm:self-auto gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <HiOutlineSparkles className="h-4 w-4" />
          {trainers.length} Active
        </span>
      </div>

      {trainers.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center text-gray-500">
          No active trainers yet
        </div>
      ) : (
        <>
          {/* 🖥️ DESKTOP VIEW ONLY (lg:block) */}
          <div className="hidden lg:block bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-full table-fixed">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th
                      onClick={() => handleSort("name")}
                      className="text-left px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors w-[40%]"
                    >
                      <div className="flex items-center">
                        Trainer <SortIcon field="name" />
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("specialty")}
                      className="text-left px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors w-[20%]"
                    >
                      <div className="flex items-center">
                        Specialty <SortIcon field="specialty" />
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("experience")}
                      className="text-left px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors w-[20%]"
                    >
                      <div className="flex items-center">
                        Experience <SortIcon field="experience" />
                      </div>
                    </th>
                    <th className="text-right px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 w-[20%]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedTrainers.map((t) => (
                    <tr key={t._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={t.image || "/default-avatar.png"}
                            alt={t.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-xs text-gray-800 truncate">
                              {t.name}
                            </p>
                            <p className="text-[10px] text-gray-500 truncate">
                              {t.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-semibold truncate max-w-full">
                          {t.specialty || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs text-gray-700">
                          {t.experience ? `${t.experience} yrs` : "—"}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button
                          onClick={() => demoteTrainer(t._id)}
                          disabled={busyId === t._id}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-50 text-red-600 text-[11px] font-semibold hover:bg-red-100 disabled:opacity-40 transition-colors"
                        >
                          <HiOutlineUserMinus className="h-3.5 w-3.5" />
                          Demote
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 📱 MOBILE & TABLET VIEW (Cards) */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {sortedTrainers.map((t) => (
              <div
                key={t._id}
                className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm"
              >
                {/* Card Header: Avatar & Info */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={t.image || "/default-avatar.png"}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover border border-gray-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-gray-800 truncate">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {t.email}
                    </p>
                  </div>
                </div>

                {/* Card Body: Details */}
                <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                  <div className="bg-gray-50 p-2.5 rounded-lg">
                    <span className="text-gray-500 block mb-0.5">Specialty</span>
                    <span className="inline-block px-2 py-0.5 mt-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold truncate max-w-full">
                      {t.specialty || "—"}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-2.5 rounded-lg">
                    <span className="text-gray-500 block mb-0.5">Experience</span>
                    <span className="font-semibold text-gray-800">
                      {t.experience ? `${t.experience} years` : "—"}
                    </span>
                  </div>
                </div>

                {/* Card Footer: Action */}
                <div className="pt-3 border-t border-gray-100">
                  <button
                    onClick={() => demoteTrainer(t._id)}
                    disabled={busyId === t._id}
                    className="w-full inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 disabled:opacity-50 transition-colors"
                  >
                    <HiOutlineUserMinus className="h-4 w-4" />
                    Demote to User
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}