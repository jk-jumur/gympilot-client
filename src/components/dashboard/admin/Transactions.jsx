"use client";

import { useEffect, useState, useMemo } from "react";
import { toast } from "@/lib/toast";
import {
  HiOutlineCreditCard,
  HiOutlineMagnifyingGlass,
  HiOutlineArrowDownTray,
  HiOutlineChartBar,
  HiOutlineArrowTrendingUp,
  HiOutlineArrowTrendingDown,
  HiOutlineCalendarDays,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from "react-icons/hi2";

const API =  "";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    const fetchTx = async () => {
      try {
        const res = await fetch(`${API}/api/payments/transactions`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load");
        setTransactions(data?.data || []);
      } catch (err) {
        console.error(err);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTx();
  }, []);

  // ═══════════════════════════════════════════════════════
  // STATS
  // ═══════════════════════════════════════════════════════
  const stats = useMemo(() => {
    const totalRevenue = transactions.reduce((s, t) => s + (t.amount || 0), 0);
    const totalCount = transactions.length;
    const avgAmount = totalCount > 0 ? totalRevenue / totalCount : 0;

    const now = new Date();
    const thisMonth = transactions
      .filter((t) => {
        const d = new Date(t.createdAt);
        return (
          d.getMonth() === now.getMonth() &&
          d.getFullYear() === now.getFullYear()
        );
      })
      .reduce((s, t) => s + (t.amount || 0), 0);

    const lastMonth = transactions
      .filter((t) => {
        const d = new Date(t.createdAt);
        const last = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return (
          d.getMonth() === last.getMonth() &&
          d.getFullYear() === last.getFullYear()
        );
      })
      .reduce((s, t) => s + (t.amount || 0), 0);

    const growth =
      lastMonth > 0
        ? ((thisMonth - lastMonth) / lastMonth) * 100
        : thisMonth > 0
        ? 100
        : 0;

    return { totalRevenue, totalCount, avgAmount, thisMonth, growth };
  }, [transactions]);

  // ═══════════════════════════════════════════════════════
  // FILTER + SORT
  // ═══════════════════════════════════════════════════════
  const filteredTransactions = useMemo(() => {
    let result = [...transactions];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (t) =>
          t.userEmail?.toLowerCase().includes(q) ||
          t.transactionId?.toLowerCase().includes(q) ||
          t.className?.toLowerCase().includes(q)
      );
    }

    if (sortBy === "newest") {
      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "highest") {
      result.sort((a, b) => (b.amount || 0) - (a.amount || 0));
    } else if (sortBy === "lowest") {
      result.sort((a, b) => (a.amount || 0) - (b.amount || 0));
    }

    return result;
  }, [transactions, search, sortBy]);

  // ═══════════════════════════════════════════════════════
  // PAGINATION
  // ═══════════════════════════════════════════════════════
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTransactions, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, sortBy]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  // ═══════════════════════════════════════════════════════
  // EXPORT CSV
  // ═══════════════════════════════════════════════════════
  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) {
      toast.error("No transactions to export");
      return;
    }

    const headers = ["User Email", "Amount", "Date", "Transaction ID"];
    const rows = filteredTransactions.map((t) => [
      t.userEmail || "",
      t.amount || 0,
      new Date(t.createdAt).toISOString(),
      t.transactionId || "",
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((r) => r.map((v) => `"${v}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `transactions-${Date.now()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported successfully");
  };

  if (loading) {
    return (
      <div className="p-3 sm:p-4 md:p-6 space-y-5 sm:space-y-6 max-w-7xl mx-auto w-full">
        <div className="h-7 sm:h-8 w-48 sm:w-56 bg-gray-200 animate-pulse rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-28 sm:h-32 bg-gray-200 animate-pulse rounded-2xl"
            />
          ))}
        </div>
        <div className="h-80 sm:h-96 bg-gray-200 animate-pulse rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 space-y-4 sm:space-y-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
            Transactions
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Complete Stripe payment history across the platform
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 transition-all w-full sm:w-auto"
        >
          <HiOutlineArrowDownTray className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Stats Cards — mobile: 1, tablet: 2, desktop: 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {/* Total Revenue */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 p-4 sm:p-5 md:p-6 text-white shadow-xl shadow-emerald-500/20">
          <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full filter blur-3xl" />
          <div className="relative">
            <div className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-xl bg-white/20 backdrop-blur-sm mb-3 sm:mb-4">
              <HiOutlineChartBar className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
            </div>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white/80 mb-1">
              Total Revenue
            </p>
            <p className="text-xl sm:text-2xl md:text-3xl font-black">
              ${stats.totalRevenue.toFixed(2)}
            </p>
            <div className="flex items-center gap-1.5 mt-2 sm:mt-3 flex-wrap">
              {stats.growth >= 0 ? (
                <HiOutlineArrowTrendingUp className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              ) : (
                <HiOutlineArrowTrendingDown className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              )}
              <span className="text-[11px] sm:text-xs font-bold">
                {stats.growth >= 0 ? "+" : ""}
                {stats.growth.toFixed(1)}%
              </span>
              <span className="text-[11px] sm:text-xs text-white/70">
                vs last month
              </span>
            </div>
          </div>
        </div>

        {/* Total Transactions */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition">
          <div className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/25 mb-3 sm:mb-4">
            <HiOutlineCreditCard className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
          </div>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
            Total Transactions
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl font-black text-gray-800">
            {stats.totalCount}
          </p>
          <p className="text-[11px] sm:text-xs text-gray-400 mt-2 sm:mt-3">
            All-time payments
          </p>
        </div>

        {/* Average Amount */}
        <div className="rounded-2xl bg-white border border-gray-200 p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition">
          <div className="inline-flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg shadow-purple-500/25 mb-3 sm:mb-4">
            <HiOutlineChartBar className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-white" />
          </div>
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
            Average Amount
          </p>
          <p className="text-xl sm:text-2xl md:text-3xl font-black text-gray-800">
            ${stats.avgAmount.toFixed(2)}
          </p>
          <p className="text-[11px] sm:text-xs text-gray-400 mt-2 sm:mt-3">
            Per transaction
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <div className="relative flex-1">
          <HiOutlineMagnifyingGlass className="absolute left-3.5 sm:left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by email, transaction ID, or class..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 sm:pl-11 pr-3 sm:pr-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full sm:w-auto px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm font-medium bg-white cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
        </select>
      </div>

      {/* Table / Cards */}
      {paginatedTransactions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 md:p-12 text-center">
          <div className="inline-flex items-center justify-center h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gray-100 mb-3 sm:mb-4">
            <HiOutlineCreditCard className="h-7 w-7 sm:h-8 sm:w-8 text-gray-400" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-1">
            {search ? "No matching transactions" : "No transactions yet"}
          </h3>
          <p className="text-sm text-gray-500">
            {search
              ? "Try a different search term"
              : "Payments will appear here once members book classes"}
          </p>
        </div>
      ) : (
        <>
          {/* 🖥️ DESKTOP TABLE VIEW (lg+) */}
          <div className="hidden lg:block bg-white rounded-2xl border border-gray-200 shadow-sm">
            <div className="overflow-x-auto w-full rounded-2xl">
              <table className="w-full min-w-[800px] table-auto text-left">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">
                      User
                    </th>
                    <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">
                      Amount
                    </th>
                    <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">
                      Class
                    </th>
                    <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">
                      Date
                    </th>
                    <th className="px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap">
                      Txn ID
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {paginatedTransactions.map((t) => (
                    <tr
                      key={t._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-black text-white">
                              {t.userEmail?.charAt(0)?.toUpperCase() || "?"}
                            </span>
                          </div>
                          <span className="text-xs font-medium text-gray-700 truncate max-w-[200px]">
                            {t.userEmail || "Unknown User"}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                          ${(t.amount || 0).toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs text-gray-600 truncate block max-w-[180px]">
                          {t.className || "—"}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <HiOutlineCalendarDays className="h-3.5 w-3.5 shrink-0" />
                          <span>
                            {new Date(t.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-400 mt-0.5 ml-5">
                          {new Date(t.createdAt).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <code className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded font-mono text-gray-600 whitespace-nowrap">
                          {t.transactionId?.slice(0, 10) || "—"}...
                        </code>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 📱 MOBILE & TABLET CARD VIEW (lg-) */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {paginatedTransactions.map((t) => (
              <div
                key={t._id}
                className="bg-white rounded-2xl border border-gray-200 p-3.5 sm:p-4 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shrink-0">
                        <span className="text-xs sm:text-sm font-black text-white">
                          {t.userEmail?.charAt(0)?.toUpperCase() || "?"}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-[11px] sm:text-xs text-gray-800 truncate">
                          {t.userEmail || "Unknown"}
                        </p>
                        <p className="text-[10px] text-gray-500 truncate mt-0.5">
                          {t.className || "Class Payment"}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 inline-flex items-center px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] sm:text-xs font-bold border border-emerald-100">
                      ${(t.amount || 0).toFixed(2)}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5 sm:gap-2 text-[11px] sm:text-xs bg-gray-50 p-2.5 sm:p-3 rounded-lg">
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-gray-500 shrink-0">Date</span>
                      <span className="font-semibold text-gray-700 text-right">
                        {new Date(t.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center gap-2 border-t border-gray-200 pt-1.5 sm:pt-2 mt-0.5 sm:mt-1">
                      <span className="text-gray-500 shrink-0">Txn ID</span>
                      <code className="text-[9px] sm:text-[10px] font-mono text-gray-600 bg-white px-1.5 py-0.5 rounded border border-gray-200 truncate max-w-[60%]">
                        {t.transactionId?.slice(0, 10) || "—"}...
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="border-t border-gray-200 px-1 sm:px-2 md:px-6 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-[11px] sm:text-xs md:text-sm text-gray-500 text-center sm:text-left">
            Showing{" "}
            <span className="font-bold text-gray-700">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}
            </span>{" "}
            to{" "}
            <span className="font-bold text-gray-700">
              {Math.min(
                currentPage * ITEMS_PER_PAGE,
                filteredTransactions.length
              )}
            </span>{" "}
            of{" "}
            <span className="font-bold text-gray-700">
              {filteredTransactions.length}
            </span>
          </p>

          <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 flex-wrap justify-center">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <HiOutlineChevronLeft className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-gray-600" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 ||
                  p === totalPages ||
                  (p >= currentPage - 1 && p <= currentPage + 1)
              )
              .map((p, idx, arr) => (
                <div
                  key={p}
                  className="flex items-center gap-1 sm:gap-1.5 md:gap-2"
                >
                  {idx > 0 && arr[idx - 1] !== p - 1 && (
                    <span className="text-gray-400 text-[10px] sm:text-xs">
                      ...
                    </span>
                  )}
                  <button
                    onClick={() => setCurrentPage(p)}
                    className={`h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-lg text-[11px] sm:text-xs md:text-sm font-semibold transition ${
                      p === currentPage
                        ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/30"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                </div>
              ))}

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <HiOutlineChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 text-gray-600" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}