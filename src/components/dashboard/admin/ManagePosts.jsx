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
      return <HiOutlineChevronUpDown className="h-3.5 w-3.5 text-gray-400" />;
    }
    return sortOrder === "asc" ? (
      <HiOutlineChevronUp className="h-3.5 w-3.5 text-orange-500" />
    ) : (
      <HiOutlineChevronDown className="h-3.5 w-3.5 text-orange-500" />
    );
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Manage Posts</h1>
          <p className="text-sm text-gray-500 mt-1">
            Moderate and remove inappropriate forum posts
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider">
          <HiOutlineChatBubbleLeftRight className="h-4 w-4" />
          {posts.length} Posts
        </span>
      </div>

      {posts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center text-gray-500">
          No forum posts yet
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  {/* ⭐ Post (Title) */}
                  <th
                    onClick={() => handleSort("title")}
                    className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      Post
                      <SortIcon field="title" />
                    </div>
                  </th>

                  {/* ⭐ Author */}
                  <th
                    onClick={() => handleSort("author")}
                    className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      Author
                      <SortIcon field="author" />
                    </div>
                  </th>

                  {/* ⭐ Date */}
                  <th
                    onClick={() => handleSort("createdAt")}
                    className="text-left px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 cursor-pointer select-none hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center gap-1.5">
                      Date
                      <SortIcon field="createdAt" />
                    </div>
                  </th>

                  <th className="text-right px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedPosts.map((p) => (
                  <tr
                    key={p._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image || "/placeholder.jpg"}
                          alt={p.title}
                          className="w-12 h-12 rounded-lg object-cover border border-gray-200"
                        />
                        <div>
                          <p className="font-semibold text-sm text-gray-800 line-clamp-1">
                            {p.title}
                          </p>
                          <p className="text-xs text-gray-500 line-clamp-1">
                            {p.excerpt || p.description?.slice(0, 60)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">
                        {p.author || "Unknown"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500">
                        {new Date(p.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/forum/${p._id}`}
                          className="inline-block px-3 py-1.5 rounded-lg bg-gray-100 text-gray-700 text-xs font-semibold hover:bg-gray-200 transition-colors"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(p._id)}
                          disabled={busyId === p._id}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200 disabled:opacity-40 transition-colors"
                        >
                          <HiOutlineTrash className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}