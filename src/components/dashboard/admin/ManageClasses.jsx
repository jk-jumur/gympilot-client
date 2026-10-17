"use client";

import { useEffect, useState, useMemo } from "react";
import { toast } from "@/lib/toast";
import {
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineTrash,
  HiOutlineAcademicCap,
  HiOutlineChevronUpDown,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
} from "react-icons/hi2";

const API = "";

export default function ManageClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  // ⭐ Sorting State
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

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

  // ⭐ Sort Handler
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // ⭐ Sorted Data
  const sortedClasses = useMemo(() => {
    const sorted = [...classes].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === "name") {
        aVal = a.name || a.className || "";
        bVal = b.name || b.className || "";
      }
      if (sortField === "trainer") {
        aVal = a.trainer || a.trainerName || "";
        bVal = b.trainer || b.trainerName || "";
      }

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal || "").toLowerCase();
      const bStr = String(bVal || "").toLowerCase();
      return sortOrder === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });

    return sorted;
  }, [classes, sortField, sortOrder]);

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
    if (
      !confirm(
        "Are you sure you want to DELETE this class? This cannot be undone."
      )
    )
      return;
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

  const statusBadge = (status) => {
    const s = (status || "pending").toLowerCase();
    const styles = {
      approved: "bg-emerald-100 text-emerald-700",
      rejected: "bg-red-100 text-red-700",
      pending: "bg-amber-100 text-amber-700",
    };
    return (
      <span
        className={`inline-block px-2.5 py-1 rounded-full text-[10px] lg:text-[11px] font-bold uppercase tracking-wider ${
          styles[s] || styles.pending
        }`}
      >
        {s}
      </span>
    );
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Manage Classes
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Approve, reject, or delete classes submitted by trainers
          </p>
        </div>
        <span className="inline-flex items-center self-start sm:self-auto gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <HiOutlineAcademicCap className="h-4 w-4" />
          {classes.length} Total
        </span>
      </div>

      {classes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center text-gray-500">
          No classes submitted yet
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
                      className="text-left px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors w-[30%]"
                    >
                      <div className="flex items-center">
                        Class <SortIcon field="name" />
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("trainer")}
                      className="text-left px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors w-[18%]"
                    >
                      <div className="flex items-center">
                        Trainer <SortIcon field="trainer" />
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("category")}
                      className="text-left px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors w-[14%]"
                    >
                      <div className="flex items-center">
                        Category <SortIcon field="category" />
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("price")}
                      className="text-left px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors w-[10%]"
                    >
                      <div className="flex items-center">
                        Price <SortIcon field="price" />
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("status")}
                      className="text-left px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors w-[12%]"
                    >
                      <div className="flex items-center">
                        Status <SortIcon field="status" />
                      </div>
                    </th>
                    <th className="text-right px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 w-[16%]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedClasses.map((c) => {
                    const s = (c.status || "").toLowerCase();
                    const isApproved = s === "approved";
                    const isRejected = s === "rejected";
                    return (
                      <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={c.image || "/placeholder.jpg"}
                              alt={c.name || c.className}
                              className="w-10 h-10 rounded-lg object-cover border border-gray-200 shrink-0"
                            />
                            <p className="font-semibold text-xs text-gray-800 truncate">
                              {c.name || c.className}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-xs text-gray-700 truncate block">
                            {c.trainer || c.trainerName || "—"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-block px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-semibold truncate max-w-full">
                            {c.category}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-xs font-semibold text-gray-700">
                            ${c.price}
                          </span>
                        </td>
                        <td className="px-4 py-4">{statusBadge(c.status)}</td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex justify-end gap-1.5">
                            {!isApproved && (
                              <button
                                onClick={() => updateStatus(c._id, "approve")}
                                disabled={busyId === c._id}
                                className="inline-flex items-center justify-center p-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 disabled:opacity-40 transition-colors"
                                title="Approve"
                              >
                                <HiOutlineCheckCircle className="h-4 w-4" />
                              </button>
                            )}
                            {!isRejected && (
                              <button
                                onClick={() => updateStatus(c._id, "reject")}
                                disabled={busyId === c._id}
                                className="inline-flex items-center justify-center p-1.5 rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 disabled:opacity-40 transition-colors"
                                title="Reject"
                              >
                                <HiOutlineXCircle className="h-4 w-4" />
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(c._id)}
                              disabled={busyId === c._id}
                              className="inline-flex items-center justify-center p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-40 transition-colors"
                              title="Delete"
                            >
                              <HiOutlineTrash className="h-4 w-4" />
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

          {/* 📱 MOBILE & TABLET VIEW (Cards) */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {sortedClasses.map((c) => {
              const s = (c.status || "").toLowerCase();
              const isApproved = s === "approved";
              const isRejected = s === "rejected";
              return (
                <div key={c._id} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={c.image || "/placeholder.jpg"}
                      alt={c.name || c.className}
                      className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-sm text-gray-800 truncate">{c.name || c.className}</p>
                      <p className="text-xs text-gray-500 truncate">{c.trainer || c.trainerName || "No Trainer"}</p>
                    </div>
                    <div className="shrink-0">{statusBadge(c.status)}</div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                    <div className="bg-gray-50 p-2.5 rounded-lg">
                      <span className="text-gray-500 block mb-0.5">Category</span>
                      <span className="font-semibold text-indigo-600 truncate block">{c.category}</span>
                    </div>
                    <div className="bg-gray-50 p-2.5 rounded-lg">
                      <span className="text-gray-500 block mb-0.5">Price</span>
                      <span className="font-bold text-gray-800">${c.price}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100">
                    {!isApproved && (
                      <button
                        onClick={() => updateStatus(c._id, "approve")}
                        disabled={busyId === c._id}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-xs font-bold hover:bg-emerald-100 disabled:opacity-50 transition-colors"
                      >
                        <HiOutlineCheckCircle className="h-4 w-4" /> Approve
                      </button>
                    )}
                    {!isRejected && (
                      <button
                        onClick={() => updateStatus(c._id, "reject")}
                        disabled={busyId === c._id}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg bg-amber-50 text-amber-700 text-xs font-bold hover:bg-amber-100 disabled:opacity-50 transition-colors"
                      >
                        <HiOutlineXCircle className="h-4 w-4" /> Reject
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(c._id)}
                      disabled={busyId === c._id}
                      className="inline-flex items-center justify-center p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 transition-colors"
                    >
                      <HiOutlineTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}