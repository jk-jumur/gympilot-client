"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "@/lib/toast";

const API = "";
const ITEMS_PER_PAGE = 10;
const STATUS_OPTIONS = ["all", "unread", "read", "replied"];

export default function AdminContactMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selected, setSelected] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // ═══════════ FETCH MESSAGES ═══════════
  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/contact`, {
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to load messages");
        return;
      }

      setMessages(data.data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ═══════════ FILTER + PAGINATE ═══════════
  const filtered = useMemo(() => {
    return messages.filter((m) => {
      const matchesSearch =
        m.name?.toLowerCase().includes(search.toLowerCase()) ||
        m.email?.toLowerCase().includes(search.toLowerCase()) ||
        m.subject?.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || m.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [messages, search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [search, statusFilter]);

  // ═══════════ STATS ═══════════
  const stats = useMemo(
    () => ({
      total: messages.length,
      unread: messages.filter((m) => m.status === "unread").length,
      read: messages.filter((m) => m.status === "read").length,
      replied: messages.filter((m) => m.status === "replied").length,
    }),
    [messages]
  );

  // ═══════════ UPDATE STATUS ═══════════
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/contact/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to update");
        return;
      }

      toast.success(`Marked as ${newStatus}`, { icon: "✅" });
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, status: newStatus } : m))
      );
      if (selected?._id === id) {
        setSelected((s) => ({ ...s, status: newStatus }));
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  // ═══════════ DELETE ═══════════
  const handleDelete = async (id) => {
    if (!confirm("Delete this message permanently?")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`${API_URL}/api/contact/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.error(data.message || "Failed to delete");
        return;
      }

      toast.success("Message deleted", { icon: "🗑️" });
      setMessages((prev) => prev.filter((m) => m._id !== id));
      if (selected?._id === id) setSelected(null);
    } catch (err) {
      toast.error("Network error");
    } finally {
      setDeletingId(null);
    }
  };

  // ═══════════ VIEW (auto-mark read) ═══════════
  const handleView = (msg) => {
    setSelected(msg);
    if (msg.status === "unread") {
      handleUpdateStatus(msg._id, "read");
    }
  };

  // ═══════════ STATUS BADGE ═══════════
  const StatusBadge = ({ status }) => {
    const styles = {
      unread:
        "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
      read:
        "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
      replied:
        "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-800",
    };
    return (
      <span
        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
          styles[status] || styles.unread
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      
      {/* ═══ HEADER ═══ */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#171717] dark:text-white sm:text-3xl">
            Contact Messages
          </h1>
          <p className="mt-1 text-sm text-[#737373] dark:text-[#A0A0A0]">
            Manage inquiries, feedback, and requests from users.
          </p>
        </div>

        <button
          onClick={fetchMessages}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E7E5E4] bg-white px-4 py-2.5 text-sm font-semibold text-[#404040] transition-all hover:border-[#FDBA74] hover:bg-[#FFF7ED] dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#E0E0E0] dark:hover:border-[#3A3A3A] dark:hover:bg-[#1F1F1F]"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Refresh
        </button>
      </div>

      {/* ═══ STATS ═══ */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {[
          { label: "Total", value: stats.total, icon: "📬" },
          { label: "Unread", value: stats.unread, icon: "🔔" },
          { label: "Read", value: stats.read, icon: "📖" },
          { label: "Replied", value: stats.replied, icon: "✅" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#E7E5E4] bg-white p-4 dark:border-[#2A2A2A] dark:bg-[#1A1A1A] sm:p-5"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl">{stat.icon}</span>
              <span className="text-2xl font-extrabold tracking-tight text-[#171717] dark:text-white">
                {stat.value}
              </span>
            </div>
            <div className="mt-2 text-xs font-bold uppercase tracking-wider text-[#737373] dark:text-[#A0A0A0]">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ═══ CONTROLS ═══ */}
      <div className="flex flex-col gap-3 rounded-2xl border border-[#E7E5E4] bg-white p-4 dark:border-[#2A2A2A] dark:bg-[#1A1A1A] sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A3A3A3] dark:text-[#666666]">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or subject..."
            className="w-full rounded-xl border border-[#FED7AA] bg-[#FAFAF9] py-3 pl-10 pr-4 text-sm text-[#171717] placeholder-[#A3A3A3] transition-all focus:border-[#F97316] focus:bg-white focus:outline-none dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-white dark:placeholder-[#666666] dark:focus:border-[#FF4D00]"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto">
          {STATUS_OPTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`whitespace-nowrap rounded-xl px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all ${
                statusFilter === s
                  ? "bg-gradient-to-r from-[#F97316] to-[#F59E0B] text-white shadow-md shadow-orange-500/25"
                  : "border border-[#E7E5E4] bg-white text-[#737373] hover:border-[#FDBA74] hover:text-[#F97316] dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#A0A0A0]"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* ═══ LIST ═══ */}
      <div className="overflow-hidden rounded-2xl border border-[#E7E5E4] bg-white dark:border-[#2A2A2A] dark:bg-[#1A1A1A]">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#F97316] border-t-transparent" />
          </div>
        ) : paginated.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <span className="mb-3 text-5xl">📭</span>
            <h3 className="text-lg font-bold text-[#171717] dark:text-white">
              No messages found
            </h3>
            <p className="mt-1 text-sm text-[#737373] dark:text-[#A0A0A0]">
              {search || statusFilter !== "all"
                ? "Try adjusting your filters."
                : "New contact messages will appear here."}
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table */}
            <div className="hidden lg:block">
              <table className="w-full">
                <thead className="border-b border-[#E7E5E4] bg-[#FAFAF9] dark:border-[#2A2A2A] dark:bg-[#0F0F0F]">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#737373] dark:text-[#A0A0A0]">
                      Sender
                    </th>
                    <th className="px-6 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#737373] dark:text-[#A0A0A0]">
                      Subject
                    </th>
                    <th className="px-6 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#737373] dark:text-[#A0A0A0]">
                      Date
                    </th>
                    <th className="px-6 py-3.5 text-left text-[10px] font-bold uppercase tracking-wider text-[#737373] dark:text-[#A0A0A0]">
                      Status
                    </th>
                    <th className="px-6 py-3.5 text-right text-[10px] font-bold uppercase tracking-wider text-[#737373] dark:text-[#A0A0A0]">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E7E5E4] dark:divide-[#2A2A2A]">
                  {paginated.map((msg) => (
                    <tr
                      key={msg._id}
                      className={`transition-colors hover:bg-[#FFF7ED] dark:hover:bg-[#1F1F1F] ${
                        msg.status === "unread"
                          ? "bg-orange-50/30 dark:bg-orange-900/5"
                          : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="truncate font-semibold text-[#171717] dark:text-white">
                              {msg.name}
                            </span>
                            {msg.status === "unread" && (
                              <span className="h-2 w-2 shrink-0 rounded-full bg-[#F97316]" />
                            )}
                          </div>
                          <div className="truncate text-xs text-[#737373] dark:text-[#A0A0A0]">
                            {msg.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs truncate text-sm text-[#404040] dark:text-[#E0E0E0]">
                          {msg.subject}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs text-[#737373] dark:text-[#A0A0A0]">
                        {new Date(msg.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={msg.status} />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleView(msg)}
                            className="rounded-lg p-2 text-[#737373] transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-[#A0A0A0] dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                            title="View"
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(msg._id)}
                            disabled={deletingId === msg._id}
                            className="rounded-lg p-2 text-[#737373] transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:text-[#A0A0A0] dark:hover:bg-red-900/20 dark:hover:text-red-400"
                            title="Delete"
                          >
                            {deletingId === msg._id ? (
                              <div className="h-4 w-4 animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                            ) : (
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="divide-y divide-[#E7E5E4] lg:hidden dark:divide-[#2A2A2A]">
              {paginated.map((msg) => (
                <div
                  key={msg._id}
                  className={`p-4 transition-colors ${
                    msg.status === "unread"
                      ? "bg-orange-50/30 dark:bg-orange-900/5"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate font-semibold text-[#171717] dark:text-white">
                          {msg.name}
                        </span>
                        {msg.status === "unread" && (
                          <span className="h-2 w-2 shrink-0 rounded-full bg-[#F97316]" />
                        )}
                      </div>
                      <div className="truncate text-xs text-[#737373] dark:text-[#A0A0A0]">
                        {msg.email}
                      </div>
                    </div>
                    <StatusBadge status={msg.status} />
                  </div>

                  <div className="mt-2 text-sm font-medium text-[#404040] dark:text-[#E0E0E0]">
                    {msg.subject}
                  </div>

                  <div className="mt-1 text-xs text-[#A3A3A3] dark:text-[#666666]">
                    {new Date(msg.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => handleView(msg)}
                      className="flex-1 rounded-lg bg-blue-50 px-3 py-2 text-xs font-bold text-blue-600 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleDelete(msg._id)}
                      disabled={deletingId === msg._id}
                      className="flex-1 rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:bg-red-100 disabled:opacity-50 dark:bg-red-900/20 dark:text-red-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ═══ PAGINATION ═══ */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-[#737373] dark:text-[#A0A0A0]">
            Showing{" "}
            <span className="font-semibold text-[#171717] dark:text-white">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            –{" "}
            <span className="font-semibold text-[#171717] dark:text-white">
              {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-[#171717] dark:text-white">
              {filtered.length}
            </span>
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-[#E7E5E4] bg-white px-3 py-2 text-sm font-semibold text-[#404040] transition-all hover:border-[#FDBA74] hover:text-[#F97316] disabled:opacity-40 dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#E0E0E0]"
            >
              ←
            </button>
            <span className="flex items-center px-3 text-sm font-semibold text-[#171717] dark:text-white">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="rounded-lg border border-[#E7E5E4] bg-white px-3 py-2 text-sm font-semibold text-[#404040] transition-all hover:border-[#FDBA74] hover:text-[#F97316] disabled:opacity-40 dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#E0E0E0]"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* ═══ VIEW MODAL ═══ */}
      <AnimatePresence>
        {selected && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[#E7E5E4] bg-white shadow-2xl dark:border-[#2A2A2A] dark:bg-[#1A1A1A]"
            >
              <div className="flex items-start justify-between border-b border-[#E7E5E4] p-5 dark:border-[#2A2A2A] sm:p-6">
                <div className="min-w-0">
                  <div className="mb-2 flex items-center gap-2">
                    <StatusBadge status={selected.status} />
                  </div>
                  <h3 className="text-xl font-extrabold text-[#171717] dark:text-white">
                    {selected.subject}
                  </h3>
                  <p className="mt-1 text-sm text-[#737373] dark:text-[#A0A0A0]">
                    From{" "}
                    <span className="font-semibold text-[#171717] dark:text-white">
                      {selected.name}
                    </span>{" "}
                    ·{" "}
                    <a
                      href={`mailto:${selected.email}`}
                      className="text-[#F97316] hover:underline dark:text-[#FF4D00]"
                    >
                      {selected.email}
                    </a>
                  </p>
                </div>

                <button
                  onClick={() => setSelected(null)}
                  className="shrink-0 rounded-lg p-2 text-[#737373] transition-colors hover:bg-[#FAFAF9] hover:text-[#171717] dark:text-[#A0A0A0] dark:hover:bg-[#2A2A2A]"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-5 sm:p-6">
                <div className="rounded-2xl bg-[#FAFAF9] p-4 text-sm leading-relaxed text-[#404040] dark:bg-[#111111] dark:text-[#E0E0E0] sm:p-5">
                  {selected.message}
                </div>

                <div className="mt-3 text-xs text-[#A3A3A3] dark:text-[#666666]">
                  Received{" "}
                  {new Date(selected.createdAt).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2 border-t border-[#E7E5E4] bg-[#FAFAF9] p-5 dark:border-[#2A2A2A] dark:bg-[#0F0F0F] sm:p-6">
                <a
                  href={`mailto:${selected.email}?subject=Re: ${encodeURIComponent(
                    selected.subject
                  )}`}
                  className="rounded-xl border border-[#E7E5E4] bg-white px-4 py-2.5 text-sm font-semibold text-[#404040] transition-all hover:border-[#FDBA74] hover:bg-[#FFF7ED] dark:border-[#2A2A2A] dark:bg-[#111111] dark:text-[#E0E0E0]"
                >
                  ✉️ Reply
                </a>

                {selected.status !== "replied" && (
                  <button
                    onClick={() => handleUpdateStatus(selected._id, "replied")}
                    className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-100 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-400"
                  >
                    ✅ Mark Replied
                  </button>
                )}

                <button
                  onClick={() => {
                    handleDelete(selected._id);
                    setSelected(null);
                  }}
                  className="rounded-xl bg-red-500 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-red-600"
                >
                  🗑 Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}