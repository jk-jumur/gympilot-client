"use client";

import { useEffect, useState } from "react";
import { toast } from "@/lib/toast";
import { HiOutlineEye, HiOutlineUserGroup } from "react-icons/hi2";
import ApplicationDetailsModal from "./ApplicationDetailsModal";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function AppliedTrainers() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);

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
    // ✅ If approved or rejected, remove from pending list
    if (updatedApp.status !== "pending") {
      setApplications((prev) => prev.filter((a) => a._id !== updatedApp._id));
    } else {
      setApplications((prev) =>
        prev.map((a) => (a._id === updatedApp._id ? updatedApp : a))
      );
    }
    setSelectedApp(null);
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
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Applied Trainers
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Review and approve pending trainer applications
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-wider">
          {applications.length} Pending
        </span>
      </div>

      {/* Empty state */}
      {applications.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
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
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Applicant
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Experience
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Specialty
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Applied
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {applications.map((app) => (
                  <tr
                    key={app._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={app.userImage || "/default-avatar.png"}
                          alt={app.userName}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <div>
                          <p className="font-semibold text-sm text-gray-800">
                            {app.userName || "Unknown"}
                          </p>
                          <p className="text-xs text-gray-500">
                            {app.userEmail}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-700">
                        {app.experience} years
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                        {app.specialty}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">
                        {new Date(app.appliedAt || app.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                      >
                        <HiOutlineEye className="h-4 w-4" />
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
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