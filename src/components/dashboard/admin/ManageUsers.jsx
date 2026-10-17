"use client";

import { useEffect, useState, useMemo } from "react";
import { toast } from "@/lib/toast";
import {
  HiOutlineShieldCheck,
  HiOutlineNoSymbol,
  HiOutlineCheckCircle,
  HiOutlineUsers,
  HiOutlineChevronUpDown,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
} from "react-icons/hi2";

const API = "";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  // ⭐ Sorting State
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API}/api/users`, { credentials: "include" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load users");
      setUsers(data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedUsers = useMemo(() => {
    return [...users].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      const aStr = String(aVal || "").toLowerCase();
      const bStr = String(bVal || "").toLowerCase();
      return sortOrder === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [users, sortField, sortOrder]);

  const updateStatus = async (id, currentStatus) => {
    const action = currentStatus === "blocked" ? "unblock" : "block";
    const confirmMsg =
      action === "block"
        ? "Are you sure you want to block this user?"
        : "Unblock this user?";
    if (!confirm(confirmMsg)) return;

    setBusyId(id);
    try {
      const res = await fetch(`${API}/api/users/${id}/${action}`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");

      setUsers((prev) =>
        prev.map((u) =>
          u._id === id
            ? { ...u, status: action === "block" ? "blocked" : "active" }
            : u
        )
      );
      toast.success(action === "block" ? "User blocked" : "User unblocked");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBusyId(null);
    }
  };

  const makeAdmin = async (id) => {
    if (!confirm("Promote this user to Admin?")) return;
    setBusyId(id);
    try {
      const res = await fetch(`${API}/api/users/${id}/make-admin`, {
        method: "PATCH",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Action failed");

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, role: "admin" } : u))
      );
      toast.success("User promoted to Admin");
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

  const roleBadge = (role) => {
    const r = (role || "user").toLowerCase();
    const styles = {
      admin: "bg-red-100 text-red-700",
      trainer: "bg-indigo-100 text-indigo-700",
      user: "bg-blue-100 text-blue-700",
    };
    return (
      <span
        className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
          styles[r] || styles.user
        }`}
      >
        {r}
      </span>
    );
  };

  const statusBadge = (status) => {
    const s = (status || "active").toLowerCase();
    return s === "blocked" ? (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
        Blocked
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider whitespace-nowrap">
        Active
      </span>
    );
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Manage Users
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Block, unblock, or promote users to admin
          </p>
        </div>
        <span className="inline-flex items-center self-start sm:self-auto gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <HiOutlineUsers className="h-4 w-4" />
          {users.length} Total
        </span>
      </div>

      {users.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center text-gray-500">
          No users found
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
                        User <SortIcon field="name" />
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("role")}
                      className="text-left px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors w-[15%]"
                    >
                      <div className="flex items-center">
                        Role <SortIcon field="role" />
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("status")}
                      className="text-left px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors w-[15%]"
                    >
                      <div className="flex items-center">
                        Status <SortIcon field="status" />
                      </div>
                    </th>
                    <th className="text-right px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 w-[40%]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedUsers.map((u) => {
                    const isBlocked = u.status === "blocked";
                    const isAdmin = (u.role || "").toLowerCase() === "admin";
                    return (
                      <tr key={u._id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={u.image || "/default-avatar.png"}
                              alt={u.name}
                              className="w-9 h-9 rounded-full object-cover border border-gray-200 shrink-0"
                            />
                            <div className="min-w-0">
                              <p className="font-semibold text-xs text-gray-800 truncate">
                                {u.name || "Unknown"}
                              </p>
                              <p className="text-[10px] text-gray-500 truncate">
                                {u.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">{roleBadge(u.role)}</td>
                        <td className="px-4 py-4">{statusBadge(u.status)}</td>
                        <td className="px-4 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            {/* Block / Unblock Button */}
                            <button
                              onClick={() => updateStatus(u._id, u.status)}
                              disabled={busyId === u._id || isAdmin}
                              className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed whitespace-nowrap ${
                                isBlocked
                                  ? "bg-emerald-500 hover:bg-emerald-600"
                                  : "bg-red-500 hover:bg-red-600"
                              }`}
                            >
                              {isBlocked ? (
                                <>
                                  <HiOutlineCheckCircle className="h-3.5 w-3.5" /> Unblock
                                </>
                              ) : (
                                <>
                                  <HiOutlineNoSymbol className="h-3.5 w-3.5" /> Block
                                </>
                              )}
                            </button>
                            
                            {/* Make Admin Button */}
                            {!isAdmin && (
                              <button
                                onClick={() => makeAdmin(u._id)}
                                disabled={busyId === u._id}
                                className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-600 text-white text-[11px] font-bold hover:bg-purple-700 transition-colors disabled:opacity-30 whitespace-nowrap"
                              >
                                <HiOutlineShieldCheck className="h-3.5 w-3.5" /> Make Admin
                              </button>
                            )}
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
            {sortedUsers.map((u) => {
              const isBlocked = u.status === "blocked";
              const isAdmin = (u.role || "").toLowerCase() === "admin";
              return (
                <div key={u._id} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                  
                  {/* Card Header */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={u.image || "/default-avatar.png"}
                        alt={u.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-bold text-xs text-gray-800 truncate">
                          {u.name || "Unknown"}
                        </p>
                        <p className="text-[10px] text-gray-500 truncate">
                          {u.email}
                        </p>
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      {roleBadge(u.role)}
                      {statusBadge(u.status)}
                    </div>
                  </div>

                  {/* Card Footer: Actions */}
                  <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => updateStatus(u._id, u.status)}
                      disabled={busyId === u._id || isAdmin}
                      className={`flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs font-bold text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                        isBlocked
                          ? "bg-emerald-500 hover:bg-emerald-600"
                          : "bg-red-500 hover:bg-red-600"
                      }`}
                    >
                      {isBlocked ? (
                        <>
                          <HiOutlineCheckCircle className="h-3.5 w-3.5" /> Unblock
                        </>
                      ) : (
                        <>
                          <HiOutlineNoSymbol className="h-3.5 w-3.5" /> Block
                        </>
                      )}
                    </button>
                    {!isAdmin && (
                      <button
                        onClick={() => makeAdmin(u._id)}
                        disabled={busyId === u._id}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg bg-purple-600 text-white text-xs font-bold hover:bg-purple-700 transition-colors disabled:opacity-30"
                      >
                        <HiOutlineShieldCheck className="h-3.5 w-3.5" /> Make Admin
                      </button>
                    )}
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