"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { toast } from "@/lib/toast";
import {
  HiOutlineTrash,
  HiOutlineChatBubbleLeftRight,
  HiOutlineChevronUpDown,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
  HiOutlineEye,
} from "react-icons/hi2";

const API = "";

export default function ManagePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);

  // ⭐ Sorting State
  const [sortField, setSortField] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API}/api/forum?limit=100`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to load posts");
      setPosts(data?.data || []);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      // Special handling for createdAt (Date comparison)
      if (sortField === "createdAt") {
        aVal = new Date(aVal).getTime();
        bVal = new Date(bVal).getTime();
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal || "").toLowerCase();
      const bStr = String(bVal || "").toLowerCase();
      return sortOrder === "asc"
        ? aStr.localeCompare(bStr)
        : bStr.localeCompare(aStr);
    });
  }, [posts, sortField, sortOrder]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this post? This cannot be undone.")) return;
    setBusyId(id);
    try {
      const res = await fetch(`${API}/api/forum/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Delete failed");

      setPosts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Post deleted");
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
            Manage Posts
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Moderate and remove inappropriate forum posts
          </p>
        </div>
        <span className="inline-flex items-center self-start sm:self-auto gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <HiOutlineChatBubbleLeftRight className="h-4 w-4" />
          {posts.length} Posts
        </span>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center text-gray-500">
          No forum posts yet
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
                      onClick={() => handleSort("title")}
                      className="text-left px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors w-[45%]"
                    >
                      <div className="flex items-center">
                        Post <SortIcon field="title" />
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("author")}
                      className="text-left px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors w-[20%]"
                    >
                      <div className="flex items-center">
                        Author <SortIcon field="author" />
                      </div>
                    </th>
                    <th
                      onClick={() => handleSort("createdAt")}
                      className="text-left px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors w-[20%]"
                    >
                      <div className="flex items-center">
                        Date <SortIcon field="createdAt" />
                      </div>
                    </th>
                    <th className="text-right px-4 py-4 text-[11px] font-bold uppercase tracking-wider text-gray-500 w-[15%]">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedPosts.map((p) => (
                    <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image || "/placeholder.jpg"}
                            alt={p.title}
                            className="w-10 h-10 rounded-lg object-cover border border-gray-200 shrink-0"
                          />
                          <div className="min-w-0">
                            <p className="font-semibold text-xs text-gray-800 truncate">
                              {p.title}
                            </p>
                            <p className="text-[10px] text-gray-500 truncate">
                              {p.excerpt || p.description?.slice(0, 60)}...
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs text-gray-700 truncate block">
                          {p.author || "Unknown"}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-xs text-gray-500">
                          {new Date(p.createdAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex justify-end gap-1.5">
                          <Link
                            href={`/forum/${p._id}`}
                            className="inline-flex items-center justify-center p-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                            title="View Post"
                          >
                            <HiOutlineEye className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDelete(p._id)}
                            disabled={busyId === p._id}
                            className="inline-flex items-center justify-center p-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-40 transition-colors"
                            title="Delete"
                          >
                            <HiOutlineTrash className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* 📱 MOBILE & TABLET VIEW (Cards) */}
          <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {sortedPosts.map((p) => (
              <div key={p._id} className="bg-white rounded-2xl border border-gray-200 p-4 shadow-sm">
                
                {/* Card Header: Image & Title */}
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={p.image || "/placeholder.jpg"}
                    alt={p.title}
                    className="w-12 h-12 rounded-lg object-cover border border-gray-200 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-sm text-gray-800 line-clamp-2">{p.title}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{p.author || "Unknown"}</p>
                  </div>
                </div>

                {/* Card Body: Date */}
                <div className="bg-gray-50 p-2.5 rounded-lg text-xs mb-4">
                  <span className="text-gray-500 block mb-0.5">Published Date</span>
                  <span className="font-semibold text-gray-800">
                    {new Date(p.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                {/* Card Footer: Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                  <Link
                    href={`/forum/${p._id}`}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg bg-gray-100 text-gray-700 text-xs font-bold hover:bg-gray-200 transition-colors"
                  >
                    <HiOutlineEye className="h-4 w-4" /> View
                  </Link>
                  <button
                    onClick={() => handleDelete(p._id)}
                    disabled={busyId === p._id}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg bg-red-50 text-red-600 text-xs font-bold hover:bg-red-100 disabled:opacity-50 transition-colors"
                  >
                    <HiOutlineTrash className="h-4 w-4" /> Delete
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