"use client";

import { useEffect, useState } from "react";
import { toast } from "@/lib/toast";
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineTrash,
  HiOutlineAcademicCap,
} from "react-icons/hi2";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ManageClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  const fetchClasses = async () => {
    try {
      const res = await fetch(`${API}/api/classes/admin/all`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load classes");
      setClasses(data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const updateStatus = async (id, action) => {
    if (!confirm(`Are you sure you want to ${action} this class?`)) return;
    setBusyId(id);
    try {
      const res = await fetch(`${API}/api/classes/${id}/${action}`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");

      setClasses((prev) =>
        prev.map((c) =>
          c._id === id
            ? { ...c, status: action === "approve" ? "approved" : "rejected" }
            : c
        )
      );
      toast.success(`Class ${action}d`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to DELETE this class? This cannot be undone.")) return;
    setBusyId(id);
    try {
      const res = await fetch(`${API}/api/classes/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setClasses((prev) => prev.filter((c) => c._id !== id));
      toast.success("Class deleted");
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

  const statusBadge = (status) => {
    const s = (status || "pending").toLowerCase();
    const styles = {
      approved: "bg-emerald-100 text-emerald-700",
      rejected: "bg-red-100 text-red-700",
      pending: "bg-amber-100 text-amber-700",
    };
    return (
      <span
        className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
          styles[s] || styles.pending
        }`}
      >
        {s}
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Classes</h1>
          <p className="text-sm text-gray-500 mt-1">
            Approve, reject, or delete classes submitted by trainers
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <HiOutlineAcademicCap className="h-4 w-4" />
          {classes.length} Total
        </span>
      </div>

      {classes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          No classes submitted yet
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Class
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Trainer
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Category
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Price
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Status
                  </th>
                  <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {classes.map((c) => {
                  const s = (c.status || "").toLowerCase();
                  const isApproved = s === "approved";
                  const isRejected = s === "rejected";
                  return (
                    <tr
                      key={c._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={c.image || "/placeholder.jpg"}
                            alt={c.name || c.className}
                            className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                          />
                          <p className="font-semibold text-sm text-gray-800">
                            {c.name || c.className}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">
                          {c.trainer || c.trainerName || "—"}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-block px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                          {c.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-700">
                          ${c.price}
                        </span>
                      </td>
                      <td className="px-6 py-4">{statusBadge(c.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          {!isApproved && (
                            <button
                              onClick={() => updateStatus(c._id, "approve")}
                              disabled={busyId === c._id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-semibold hover:bg-emerald-200 disabled:opacity-40 transition-colors"
                            >
                              <HiOutlineCheckCircle className="h-4 w-4" />
                              Approve
                            </button>
                          )}
                          {!isRejected && (
                            <button
                              onClick={() => updateStatus(c._id, "reject")}
                              disabled={busyId === c._id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-100 text-amber-700 text-xs font-semibold hover:bg-amber-200 disabled:opacity-40 transition-colors"
                            >
                              <HiOutlineXCircle className="h-4 w-4" />
                              Reject
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(c._id)}
                            disabled={busyId === c._id}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200 disabled:opacity-40 transition-colors"
                          >
                            <HiOutlineTrash className="h-4 w-4" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}