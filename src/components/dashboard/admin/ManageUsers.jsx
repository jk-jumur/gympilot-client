"use client";

import { useEffect, useState } from "react";
import { toast } from "@/lib/toast";
import {
  HiOutlineShieldCheck,
  HiOutlineNoSymbol,
  HiOutlineCheckCircle,
  HiOutlineUsers,
} from "react-icons/hi2";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

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
      toast.success(
        action === "block" ? "User blocked" : "User unblocked"
      );
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

  if (loading) {
    return (
      <div className="p-6 space-y-4">
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
        className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
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
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider">
        Blocked
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
        Active
      </span>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
          <p className="text-sm text-gray-500 mt-1">
            Block, unblock, or promote users to admin
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider">
          <HiOutlineUsers className="h-4 w-4" />
          {users.length} Total
        </span>
      </div>

      {users.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          No users found
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    User
                  </th>
                  <th className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Role
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
                {users.map((u) => {
                  const isBlocked = u.status === "blocked";
                  const isAdmin = (u.role || "").toLowerCase() === "admin";
                  return (
                    <tr
                      key={u._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={u.image || "/default-avatar.png"}
                            alt={u.name}
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                          />
                          <div>
                            <p className="font-semibold text-sm text-gray-800">
                              {u.name || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-500">{u.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">{roleBadge(u.role)}</td>
                      <td className="px-6 py-4">{statusBadge(u.status)}</td>
                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => updateStatus(u._id, u.status)}
                            disabled={busyId === u._id || isAdmin}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                              isBlocked
                                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                : "bg-red-100 text-red-700 hover:bg-red-200"
                            }`}
                          >
                            {isBlocked ? (
                              <>
                                <HiOutlineCheckCircle className="h-4 w-4" />
                                Unblock
                              </>
                            ) : (
                              <>
                                <HiOutlineNoSymbol className="h-4 w-4" />
                                Block
                              </>
                            )}
                          </button>
                          {!isAdmin && (
                            <button
                              onClick={() => makeAdmin(u._id)}
                              disabled={busyId === u._id}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-purple-100 text-purple-700 text-xs font-semibold hover:bg-purple-200 transition-colors disabled:opacity-40"
                            >
                              <HiOutlineShieldCheck className="h-4 w-4" />
                              Make Admin
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
      )}
    </div>
  );
}