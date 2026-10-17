"use client";

import { useEffect, useState, useMemo } from "react";
import { toast } from "@/lib/toast";
import {
  HiOutlineEye,
  HiOutlineUserGroup,
  HiOutlineChevronUpDown,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
} from "react-icons/hi2";
import ApplicationDetailsModal from "./ApplicationDetailsModal";

const API = "";

export default function AppliedTrainers() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

  // ⭐ Sorting State
  const [sortField, setSortField] = useState("appliedAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchApplications = async () => {
    try {
      const res = await fetch(`${API}/api/trainer-applications`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load");
      setApplications(data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleAction = (updatedApp) => {
    if (updatedApp.status !== "pending") {
      setApplications((prev) => prev.filter((a) => a._id !== updatedApp._id));
    } else {
      setApplications((prev) =>
        prev.map((a) => (a._id === updatedApp._id ? updatedApp : a))
      );
    }
    setSelectedApp(null);
  };

  // ⭐ Sort Handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // ⭐ Sorted Data Logic
  const sortedApplications = useMemo(() => {
    return [...applications].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === "appliedAt") {
        aVal = new Date(a.appliedAt || a.createdAt).getTime();
        bVal = new Date(b.appliedAt || b.createdAt).getTime();
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      if (sortField === "experience") {
        return sortOrder === "asc"
          ? (aVal || 0) - (bVal || 0)
          : (bVal || 0) - (aVal || 0);
      }

      const aStr = String(aVal || "").toLowerCase();
      const bStr = String(bVal || "").toLowerCase();
      return sortOrder === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [applications, sortField, sortOrder]);

  // ⭐ Sort Icon Component
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
            Applied Trainers
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Review and approve pending trainer applications
          </p>
        </div>
        <span className="inline-flex items-center self-start sm:self-auto gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider">
          {applications.length} Pending
        </span>
      </div>

      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 mb-4">
            <HiOutlineUserGroup className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            No pending applications
          </h3>
          <p className="text-sm text-gray-500">
            Trainer applications will appear here for review
          </p>
        </div>
      ) : (
        <>
          {/* 🖥️ DESKTOP VIEW ONLY (lg:block) */}
          <div className="hidden lg:block bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-max">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th
                      onClick={() => handleSort("userName")}
                      className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        Applicant <SortIcon field="userName" />
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("experience")}
                      className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        Exp <SortIcon field="experience" />
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("specialty")}
                      className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        Specialty <SortIcon field="specialty" />
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("appliedAt")}
                      className="text-left px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        Applied <SortIcon field="appliedAt" />
                      </div>
                    </th>
                    <th className="text-right px-4 py-3 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedApplications.map((app) => (
                    <tr key={app._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={app.userImage || "/default-avatar.png"}
                            alt={app.userName}
                            className="w-8 h-8 rounded-full object-cover border border-gray-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-xs text-gray-800 truncate max-w-[120px] lg:max-w-[180px]">
                              {app.userName || "Unknown"}
                            </p>
                            <p className="text-[10px] text-gray-500 truncate max-w-[120px] lg:max-w-[180px]">
                              {app.userEmail}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                          {app.experience} yrs
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-semibold whitespace-nowrap">
                          {app.specialty}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-[11px] text-gray-500 whitespace-nowrap">
                          {new Date(app.appliedAt || app.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button
                          onClick={() => setSelectedApp(app)}
                          className="inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 text-white text-[11px] font-semibold hover:bg-blue-700 transition-colors shadow-sm whitespace-nowrap"
                        >
                          <HiOutlineEye className="h-3.5 w-3.5" />
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 📱 MOBILE & TABLET VIEW (Cards) - lg:hidden */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {sortedApplications.map((app) => (
              <div
                key={app._id}
                className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={app.userImage || "/default-avatar.png"}
                      alt={app.userName}
                      className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-gray-800 truncate">
                        {app.userName || "Unknown"}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {app.userEmail}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedApp(app)}
                    className="shrink-0 p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                  >
                    <HiOutlineEye className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 p-2.5 rounded-lg">
                    <span className="text-gray-500 block mb-0.5">Experience</span>
                    <span className="font-semibold text-gray-800">{app.experience} years</span>
                  </div>
                  <div className="bg-gray-50 p-2.5 rounded-lg">
                    <span className="text-gray-500 block mb-0.5">Applied</span>
                    <span className="font-semibold text-gray-800">
                      {new Date(app.appliedAt || app.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="bg-gray-50 p-2.5 rounded-lg col-span-2">
                    <span className="text-gray-500 block mb-0.5">Specialty</span>
                    <span className="inline-block px-2.5 py-0.5 mt-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                      {app.specialty}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modal */}
      {selectedApp && (
        <ApplicationDetailsModal
          application={selectedApp}
          onClose={() => setSelectedApp(null)}
          onAction={handleAction}
        />
      )}
    </div>
  );
}