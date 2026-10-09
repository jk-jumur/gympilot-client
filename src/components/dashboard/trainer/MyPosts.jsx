"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "@/lib/toast";
import { FaTrash } from "react-icons/fa";

const API = process.env.NEXT_PUBLIC_API_URL;

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch(`${API}/api/forum/my`, {
        credentials: "include",
      });
      const data = await res.json();
      setPosts(data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this post?")) return;
    try {
      const res = await fetch(`${API}/api/forum/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Post deleted");
      setPosts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="h-8 w-48 bg-gray-200 animate-pulse rounded-lg" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-gray-200 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">My Forum Posts</h1>

      {posts.length === 0 ? (
        <div className="bg-white rounded-xl border p-10 text-center text-gray-500">
          No posts yet. Share your knowledge!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col hover:shadow-md transition"
            >
              <img
                src={post.image || "/placeholder.jpg"}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {post.description}
                  </p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link
                    href={`/forum/${post._id}`}
                    className="flex-1 text-center px-3 py-1.5 text-sm bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="px-3 py-1.5 text-sm bg-red-100 text-red-600 rounded-lg hover:bg-red-200 flex items-center gap-1 transition"
                  >
                    <FaTrash size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}